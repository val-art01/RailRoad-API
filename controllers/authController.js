import User from './../models/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import crypto from 'crypto' 

export const registerUser = async (req, res) => {
    const { pseudo, email, password } = req.body;

    try {
        // Generate a value for the 'iv' field
        const ivValue = crypto.randomBytes(16).toString('hex');
        const hashedPassword = await bcrypt.hash(password, 10); // bcrypt pour le hachage
        const newUser = new User({
            pseudo,
            email,
            password: hashedPassword,
            iv: ivValue
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ response: 'Internal server error: ' + err.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json('Wrong user name');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
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
        return res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json({ response: 'Internal server error: ' + err.message });
    }
};
