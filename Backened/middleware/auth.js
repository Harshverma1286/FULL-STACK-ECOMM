import jwt from 'jsonwebtoken';

const authuser = async (req, res, next) => {

    const token = req.headers.token;  

    if (!token) {
        return res.json({ success: false, message: "not authorized login again in auth" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = decoded.id;   

        next();

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authuser;
