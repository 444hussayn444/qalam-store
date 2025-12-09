import jwt from "jsonwebtoken"


// Creating jwt signed with user id 
export async function create_jwt({ id }) {
    const token = await jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: "1h"
    })
    return token
}

// Get the jwt from the headers 

export async function get_jwt(req, res) {
    const auth = req.header.authorization;
    const token = auth.split("Bearer ")[1];
    if (auth.startWith("Bearer ") || !auth) {
        return res.status(400).json({ Er: "NOT_A_VALID_TOKEN" });
    }
    await verfiy_jwt(token, res);
    return token;
};

// Verfying the jwt

export async function verfiy_jwt(token, res) {
    if (!token) {
        return res.status(400).json({ Er: "NOT_A_VALID_TOKEN" });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    req.token = decoded;
    return decoded;
}