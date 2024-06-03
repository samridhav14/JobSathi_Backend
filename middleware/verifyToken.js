const User = require("../models/User");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        // we use split to get the token from the header which is in the format "Bearer token value" so we split it and get the token value only 
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(403).json("Token is not valid!");
        }
        req.user = user;
        next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
    };
const verifyAndAuthorization = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are restricted from perfoming this operation");
        }
    });
}
const verifyAndAdmin = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
}
const verifyTokenAndAgent = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAgent || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are restricted from perfoming this operation");
        }
    });
};

module.exports = {verifyToken, verifyAndAuthorization , verifyAndAdmin};
