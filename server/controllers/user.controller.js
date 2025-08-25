import pool from "../database/database.js";

const getUser = async (req, res) => {
    const { id } = req.params

    console.log("📢 [BACKEND] getUser API hit with ID:", id);

    try {
        const userDetails = await pool.query(
            "SELECT * from users WHERE id = $1", [id]
        )

        if (userDetails.rowCount === 0) {
            return res
                .status(404)
                .json({ message: "No user found" })
        } else {
            return res
                .status(200)
                .json({ 
                    meesage: "User Detaild fetched successfully",
                    data: userDetails.rows[0]
                })
                
        }

    } catch (error) {
        return res
            .status(500)
            .json({ message: "Intenal server error" })
    }
}

export { getUser }