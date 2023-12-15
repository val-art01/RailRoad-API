import express from 'express'
import User from '../models/User.js'

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch(err) {
        console.error('Error getting users', err)
        res.status(500).json({ response: 'Internal server error' })
    }
};

// Get a specific user by ID
export const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json(user)
    } catch(err) {
        console.error('Error getting user', err)
        res.status(500).json({ response: 'Internal server error' })
    }
};

// Update a user
export const updateUser = async (req, res) => {
    const { id } = req.params
    const { username, email, password } = req.body

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email, password },
            { new: true }
        )

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json(updatedUser)
    } catch (err) {
        console.error('Error updating user', err)
        res.status(500).json({ response: 'Internal server error' })
    }
}

// Sets or cancels administrator status for a user.
export const setAdmin  = async (req, res) => {
    const { id }  = req.params
    const { role } = req.body

    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        user.role = role
        await user.save()
        res.status(200).json(user)
    } catch(err) {
        console.error('Error updating user', err)
        res.status(500).json({ response: 'Internal server error' })
    }
}

// Sets or cancels worker status for a user.
export const setWorker  = async (req, res) => {
    const { id }  = req.params
    const { role } = req.body

    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        user.role = role
        await user.save()
        res.status(200).json(user)
    } catch(err) {
        console.error('Error updating user', err)
        res.status(500).json({ response: 'Internal server error' })
    }
}

//  Delete a user by ID.
export const deleteUser  = async (req, res) => {
    const { id }  = req.params

    try {
        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json({ message: 'User deleted successfully'})
    } catch(err) {
        console.error('Error deleting user', err)
        res.status(500).json({ response: 'Internal server error' })
    }
}



