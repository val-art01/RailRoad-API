import express from 'express'
import * as userController from './../controllers/userController.js';
import { verifyTokenAndAdmin , verifyTokenAndAuthorization} from './../middleware/verify.js'

const router = express.Router()

// Get all users
router.get('/', verifyTokenAndAdmin, userController.getAllUsers);

// Get a specific user by ID
router.get('/:id', verifyTokenAndAuthorization, userController.getUserById);

// Update a user
router.put('/:id', verifyTokenAndAuthorization, userController.updateUser);

// Set or unset a user as admin
router.put('/:id/admin', userController.setAdmin);

// Set or unset a user as worker
router.put('/:id/worker', userController.setWorker);

// Delete a user by id
router.delete('/:id', verifyTokenAndAuthorization, userController.deleteUser);

export default router
