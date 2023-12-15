import User from '../model/User.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({
            username,
            password: password
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ response: 'Internal server error: ' + err.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(401).json('Wrong user name');
        }

        if (user.password !== password) {
            res.status(401).json('Wrong password');
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SEC,
            { expiresIn: '1d' }
        );

        const { password: _, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json({ response: 'Internal server error: ' + err.message });
    }
};
