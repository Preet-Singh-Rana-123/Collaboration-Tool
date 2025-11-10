const User = require("../modles/user");
const Document = require("../modles/content");
const Collaborator = require("../modles/colaborator");
const { default: mongoose } = require("mongoose");


exports.getDocument = async (req, res, next) => {
    try {
        const { userId } = req.query;

        const result = await Collaborator.aggregate([
            {
                $match: { user_id: new mongoose.Types.ObjectId(userId) },
            },
            {
                $lookup: {
                    from: "documents",
                    localField: "document_id",
                    foreignField: "_id",
                    as: "document",
                },
            },
            {
                $unwind: "$document",
            },
            {
                $project: {
                    _id: 0,
                    document_id: "$document_id",
                    title: "$document.title",
                    role: 1,
                },
            },
        ]);

        res.status(201).json(result);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "Internal error ocurred!" });
    }
};
