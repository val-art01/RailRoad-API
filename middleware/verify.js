import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(" ")[1]
        
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) res.status(403).json('Token is not valid')
            req.user = user
            next()
        })
    } else {
        return res.status(401).json("You are not authenticated!")
    }
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role=="admin") {
            next()
        } else {
            res.status(403).json("You are not allowed to do that!") 
        }
    })
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res , () =>{
        try {

        // Vérifier si l'utilisateur est un admin
        const isAdmin = verifyAdmin

        // Vérifier si l'utilisateur est un employé
        const isEmployee = verifyWorker

        // Vérifier si l'utilisateur a le même ID que celui spécifié dans la route
        const isSameUserId = req.params.id === req.user.id

        // Vérifier si l'utilisateur peut accéder aux informations d'un autre utilisateur
        const canAccessUserInfo = isAdmin || isEmployee || isSameUserId;

        // Vérifier les différentes contraintes
        if (req.method === 'GET' && !canAccessUserInfo) {
            res.status(403).json({ error: "Permission denied" });
        } else if (req.method === 'PUT' && !(isSameUserId || isAdmin)) {
            res.status(403).json({ error: "Permission denied" });
        } else if (req.method === 'DELETE' && !isSameUserId) {
            res.status(403).json({ error: "Permission denied" });
        } else {
            next(); // Autoriser l'accès à la route
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})
}

const verifyAdmin  = (req, res,) => {
        if (req.user.role=="admin") {
            res.true
        } else {
            res.False
        }
}

const verifyWorker  = (req, res,) => {
    if (req.user.role=="worker") {
        res.true
    } else {
        res.False
    }
}

export {
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
}
