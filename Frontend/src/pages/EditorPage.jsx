import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import * as Y from "yjs";

import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { TextStyle, TextStyleKit } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { useDispatch } from "react-redux";
import { fetchDocument } from "../redux/documentSlice";
import { useParams } from "react-router-dom";
import { Awareness } from "y-protocols/awareness.js";

function Toolbar({ editor }) {
    const editorState = useEditorState({
        editor,
        selector: (ctx) => ({
            isBold: ctx.editor.isActive("bold"),
            isItalic: ctx.editor.isActive("italic"),
            isUnderline: ctx.editor.isActive("underline"),
            isStrike: ctx.editor.isActive("strike"),
            isHighlight: ctx.editor.isActive("highlight"),
            isBulletList: ctx.editor.isActive("bulletList"),
            isOrderedList: ctx.editor.isActive("orderedList"),
            isBlockquote: ctx.editor.isActive("blockquote"),
            isCodeBlock: ctx.editor.isActive("codeBlock"),
            canUndo: ctx.editor.can().chain().undo().run(),
            canRedo: ctx.editor.can().chain().redo().run(),
        }),
    });

    if (!editor) return null;

    const button = (label, onClick, isActive = false, disabled = false) => (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-3 py-1 text-sm rounded-md transition font-medium ${isActive
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                } disabled:opacity-40`}
        >
            {label}
        </button>
    );

    const handleColorChange = (e) => {
        const color = e.target.value;
        editor.chain().focus().setColor(color).run();
    };

    return (
        <div className="flex flex-wrap items-center gap-2 border-b border-indigo-200 pb-3 mb-4">
            {/* Text Formatting */}
            {button(
                "B",
                () => editor.chain().focus().toggleBold().run(),
                editorState.isBold,
            )}
            {button(
                "I",
                () => editor.chain().focus().toggleItalic().run(),
                editorState.isItalic,
            )}
            {button(
                "U",
                () => editor.chain().focus().toggleUnderline().run(),
                editorState.isUnderline,
            )}
            {button(
                "S",
                () => editor.chain().focus().toggleStrike().run(),
                editorState.isStrike,
            )}
            {button(
                "🖍",
                () => editor.chain().focus().toggleHighlight().run(),
                editorState.isHighlight,
            )}

            {/* Text Color */}
            <input
                type="color"
                onInput={handleColorChange}
                title="Text color"
                className="h-8 w-8 rounded cursor-pointer border border-indigo-300 bg-transparent"
            />

            {/* Lists & Blocks */}
            {button(
                "• List",
                () => editor.chain().focus().toggleBulletList().run(),
                editorState.isBulletList,
            )}
            {button(
                "1. List",
                () => editor.chain().focus().toggleOrderedList().run(),
                editorState.isOrderedList,
            )}
            {button(
                "❝ Quote",
                () => editor.chain().focus().toggleBlockquote().run(),
                editorState.isBlockquote,
            )}
            {button(
                "</> Code",
                () => editor.chain().focus().toggleCodeBlock().run(),
                editorState.isCodeBlock,
            )}

            {/* Undo / Redo */}
            {button(
                "↶ Undo",
                () => editor.chain().focus().undo().run(),
                false,
                !editorState.canUndo,
            )}
            {button(
                "↷ Redo",
                () => editor.chain().focus().redo().run(),
                false,
                !editorState.canRedo,
            )}

            {/* Clear */}
            {button("✖ Clear", () =>
                editor.chain().focus().unsetAllMarks().clearNodes().run(),
            )}
        </div>
    );
}

const EditorPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const doc_content = useSelector((state) => state.document);
    const { title, loading, yjs_state, role, document_code } = doc_content;

    const [ydoc] = useState(() => new Y.Doc());
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (id) dispatch(fetchDocument(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (!id) return;

        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        newSocket.emit("join-document", id);

        // When server sends current doc
        newSocket.on("document-state", (update) => {
            const binary = new Uint8Array(update);
            Y.applyUpdate(ydoc, binary);
        });

        // Apply remote updates
        newSocket.on("update", (update) => {
            const binary = new Uint8Array(update);
            Y.applyUpdate(ydoc, binary);
        });

        // Send local updates
        ydoc.on("update", (update) => {
            newSocket.emit("update", update);
        });

        return () => newSocket.disconnect();
    }, [id]);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ history: false }),
            Collaboration.configure({ document: ydoc }),
            Highlight,
            Color,
            TextStyleKit,
            TextStyle,
        ],
        content: yjs_state || "",
        editable: true,
    });

    if (loading || !editor) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-600">
                Loading document...
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6 flex flex-col items-center">
                {/* Header */}
                <header className="flex justify-between items-center w-full max-w-5xl mb-6">
                    <h1 className="text-3xl font-bold text-indigo-700">{title}</h1>
                    {role === "owner" ? (
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-lg border border-indigo-200">
                                Code: {document_code}
                            </span>
                        </div>
                    ) : null}
                </header>

                {/* Editor */}
                <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6 border border-indigo-200">
                    {editor && <Toolbar editor={editor} />}
                    <EditorContent
                        editor={editor}
                        className="prose prose-indigo max-w-none min-h-[500px] focus:outline-none"
                    />
                </div>
            </div>
        </>
    );
};

export default EditorPage;
