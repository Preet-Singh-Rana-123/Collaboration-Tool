const { default: mongoose } = require("mongoose");
const User = require("../modles/user");

exports.getUser = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res
                .status(401)
                .json({ message: "Unauthorized - no user ID found" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const { name, password, avtarUrl } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { name, password, avtar_url: avtarUrl } },
            { new: true },
        );
        res.status(201).json({ updatedUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
};
