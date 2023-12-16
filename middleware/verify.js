import jwt from 'jsonwebtoken'

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
        if (req.user.role==="admin") {
            next()
        } else {
            res.status(403).json("You are not allowed to do that!") 
        }
    })
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res , () =>{
        try {
            // Check if the user is an admin
            const isAdmin = req.user.role === 'admin';
            // Check if the user is an employee
            const isEmployee = req.user.role === 'customer';
            // Check if the user has the same ID as the one specified in the route
            const isSameUserId = req.params.id === req.user.id;
            // Check if the user can access another user's information
            const canAccessUserInfo = (isAdmin || isEmployee) && isSameUserId;
            // Check various constraints
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

export {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
}
