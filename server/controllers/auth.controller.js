import pool from "../database/database.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!validateEmail(email)) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid email format" });
    };

    try {
        const emailExist = "SELECT * from users WHERE email = $1";
        const result = await pool.query(emailExist, [email]);

        if (result.rowCount > 0) {
            return res
                .status(409)
                .json({ success: false, message: "User already exist with this email" });
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
            .json({ success: true, message: "User Registered Successfully" });

    } catch (error) {
        console.log("Server error", error);
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });

    };
};

const login = async (req, res) => {     
    const { email, password } = req.body

    console.log("Login clicked");
    

    if (!validateEmail(email)) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid email format" })
    }

    try {
        const user = await pool.query(
            "SELECT email, password FROM users WHERE email = $1", [email]
        )

        if (user.rows.length === 0) {
            return res
                .status(404).json({ success: false, message: "User not found" })
        }

        // compare password with the hashedpassword stored in DB

        const validPass = await bcrypt.compare(password, user.rows[0].password);

        if (!validPass) {
            return res
                .status(401)
                .json({ success: false, message: "Incorrect password" })
        }

        const token = jwt.sign(
            {
                id: user.rows[0].id,
                email: user.rows[0].email,
            },

            process.env.JWT_SECRET_KEY
        )

        return res
        .status(200)
        .json({
            success: true, 
            message: "Login successfully",
            token,
            id: user.rows[0].id,
            email: user.rows[0].email
        });

    } catch (error) {

        console.log(error);
        
        return res
        .status(500)
        .json({ success: false, message: "Internal Server error"})
    }


}

// const refreshToken = async (req, res) => {
//     const token = req.headers.authorization?.split(" ")[1]

//     if(!token){
//         return res
//         .status(401)
//         .json({message: "Token required"})
//     }

//     try {
//         const decoded =jwt.verify(token, JWT_SECRET_KEY)

//         const newToken = jwt.sign({
//             user: decoded.id

//         })
//     } catch (error) {
        
//     }
// }


export { register, login }