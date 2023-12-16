import express from 'express'
import {getAllUsers, getUserById, updateUser, setAdmin, setWorker, deleteUser} from './../controllers/userController.js'
import { verifyTokenAndAdmin , verifyTokenAndAuthorization} from './../middleware/verify.js'

const router = express.Router()

// Get all users
router.get('/', verifyTokenAndAdmin, getAllUsers);

// Get a specific user by ID
router.get('/:id', verifyTokenAndAuthorization, getUserById);

// Update a user
router.put('/:id', verifyTokenAndAuthorization, updateUser);

// Set or unset a user as admin
router.put('/:id/admin', verifyTokenAndAdmin, setAdmin);

// Set or unset a user as worker
router.put('/:id/user', setWorker);

// Delete a user by id
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);

export default router
