import pool from "../database/database.js";
import bcrypt from 'bcrypt'

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.test(emailRegex)
}

const register = async(req, res) => {
    const {name, email, password} = req.body;

    if(!validateEmail){
        return res
        .status(400)
        .json({success: false, message: "Invalid email format"});
    };

    try {
        const emailExist = "SELECT * from users where email = $1";
        const result = await pool.query(emailExist, [email]);

        if(result.rowCount > 0){
            return res
            .status(409)
            .json({success: false, message: "User already exist with this email"});
        };

        const hashPassword = await bcrypt.hash(password, 10);

        const signupQuery = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";
        await pool.query(signupQuery, [
            name,
            email,
            hashPassword
        ]);

        return res
        .status(200)
        .json({success: true, message: "User Registered Successfully"});

    } catch (error) {
        console.log("Server error", error);
        return res
        .status(500)
            .json({ success: false, message: "Server Error" });
        
    };
};

// const login = (req, res) => {

// }

export { register }