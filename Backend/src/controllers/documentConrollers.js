const Collaborator = require("../modles/colaborator");
const Content = require("../modles/content");
const Document = require("../modles/document");
const { nanoid } = require("nanoid");
const mongoose = require("mongoose");

exports.getDocument = async (req, res, next) => {
    try {
        const { id } = req.params;
        const idObject = new mongoose.Types.ObjectId(id);
        const userId = new mongoose.Types.ObjectId(req.user.id);
        const document = await Document.aggregate([
            {
                $match: { _id: idObject },
            },
            {
                $lookup: {
                    from: "contents",
                    localField: "_id",
                    foreignField: "document_id",
                    as: "content",
                },
            },
            {
                $unwind: "$content",
            },
            {
                $lookup: {
                    from: "collaborators",
                    localField: "_id",
                    foreignField: "document_id",
                    as: "collaborators",
                },
            },
            {
                $addFields: {
                    collaborator: {
                        $first: {
                            $filter: {
                                input: "$collaborators",
                                as: "collab",
                                cond: { $eq: ["$$collab.user_id", userId] }, // match logged-in user
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    document_code: 1,
                    yjs_state: "$content.yjs_state",
                    plain_text: "$content.plain_text",
                    role: "$collaborator.role",
                },
            },
        ]);
        if (document.length === 0 || !document)
            res.status(404).json({ message: "document not found" });
        res.status(201).json({ document: document[0] });
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "Internal error ocurred!" });
    }
};

exports.postCreateDocument = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { title } = req.body;
        const documentCode = nanoid(8);

        const newDocument = new Document({
            owner_id: userId,
            title,
            document_code: documentCode,
        });
        await newDocument.save();

        const newCollaborator = new Collaborator({
            document_id: newDocument._id,
            user_id: userId,
            role: "owner",
        });
        await newCollaborator.save();

        const newContent = new Content({
            document_id: newDocument._id,
            plain_text: "",
            yjs_state: null,
        });
        await newContent.save();

        res
            .status(201)
            .json({ message: "document created!", userId, title, documentCode });
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "Internal error ocurred!" });
    }
};

exports.postJoinDocument = async (req, res, next) => {
    try {
        const { documentCode } = req.body;
        const userId = req.user.id;
        const doc = await Document.findOne({ document_code: documentCode });
        const existingUser = await Collaborator.findOne({
            user_id: userId,
            document_id: doc._id,
        });
        if (existingUser) {
            return res.status(401).json({ message: "already joined!" });
        }

        const newCollaborator = new Collaborator({
            document_id: doc._id,
            user_id: userId,
            role: "editor",
        });
        await newCollaborator.save();

        res.status(201).json({ message: "user joined!", newCollaborator });
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "Internal error ocurred!" });
    }
};
