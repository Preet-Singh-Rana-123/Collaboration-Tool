const User = require("../modles/user");
const jwt = require("jsonwebtoken");

exports.postRegister = async (req, res, next) => {
    try {
        const { name, email, password, avtarUrl } = req.body;
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(400).json({ message: "User already existed!" });
        }

        const newUser = new User({ name, email, password, avtarUrl });
        await newUser.save();
        res.status(201).json({ message: "User registerd successfully" });
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "Internal error ocurred!" });
    }
};

exports.postLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "user not existed!" });
        }
        if (password !== user.password) {
            return res.status(403).json({ message: "incorrect password!" });
        }

        const token = jwt.sign(
            { id: user._id.toString(), email, name: user.name },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRE_TIME },
        );

        res.status(201).json({ message: "user loggedIn", token });
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "Internal error ocurred!" });
    }
};
