import pool from "../database/database.js";
import cloudinary from "../config/cloudinary.config.js";
// import { v2 as cloudinary } from "cloudinary";
import Stream from "stream";

const getUser = async (req, res) => {
  const { id } = req.params;

  console.log("📢 [BACKEND] getUser API hit with ID:", id);

  try {
    const userDetails = await pool.query(
      "SELECT id, name, email, image_url as image from users WHERE id = $1",
      [id],
    );

    if (userDetails.rowCount === 0) {
      return res.status(404).json({ message: "No user found" });
    } else {
      return res.status(200).json({
        meesage: "User Detaild fetched successfully",
        data: userDetails.rows[0],
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Intenal server error" });
  }
};

const editUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const name = req.body.name;

    let imageUrl = null;

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile_pictures" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        Stream.Readable.from(req.file.buffer).pipe(stream);
      });

      imageUrl = uploadResult.secure_url;
    }

    const updateQuery = await pool.query(
      `UPDATE users
       SET name = $1, image_url = COALESCE($2, image_url)
       WHERE id = $3
       RETURNING *`,
      [name, imageUrl, id],
    );

    return res.status(200).json({
      success: true,
      data: updateQuery.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Update failed" });
  }
};

const addTransaction = async (req, res) => {
  const { type, description, date, amount, category_name } = req.body;
  const { id } = req.params;
  if (!type || !description || !date || !amount) {
    return res
      .status(400)
      .json({ message: "Fill the required details", success: false });
  }

  try {
    const result = await pool.query(
      `INSERT INTO add_transaction 
   (user_id, type, date, amount, description, category_name) 
   VALUES ($1, $2, $3, $4, $5, $6) 
   RETURNING *`,
      [id, type, date, amount, description || null, category_name || null],
    );

    console.log(result.rows[0]);

    return res.status(201).json({
      success: true,
      message: "Transaction added successfully",
      transaction: result.rows[0],
    });
  } catch (error) {
    console.error("Error inserting transaction:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getTransactions = async (req, res) => {
  const { id } = req.params;

  try {
    const findtransaction = await pool.query(
      "SELECT id, type, category_name, amount, description, date from add_transaction where user_id = $1",
      [id],
    );

    if (findtransaction.rowCount === 0) {
      console.log("No transaction found for this id");
      return res
        .status(404)
        .json({ success: false, message: "No Transaction found" });
    }

    const transactions = findtransaction.rows;

    return res.status(200).json({
      success: true,
      message: "Transactions fetched Successfully",
      transaction: transactions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const balance = async (req, res) => {
  const { id } = req.params; // user_id

  try {
    const result = await pool.query(
      `SELECT 
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS total_income,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS total_expense
      FROM add_transaction WHERE user_id = $1`,
      [id],
    );

    const { total_income, total_expense } = result.rows[0];
    const total_balance = total_income - total_expense;

    return res.status(200).json({
      success: true,
      message: "your total balance",
      total_balance,
      total_income,
      total_expense,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteQuery = await pool.query(
      "DELETE FROM add_transaction where id = $1",
      [id],
    );

    if (deleteQuery.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No transaction found for this id" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: true, message: "Internal Server Error" });
  }
};
const editTransaction = async (req, res) => {
  const { id } = req.params;

  const query = await pool.query("SELECT ");
};
export {
  getUser,
  addTransaction,
  getTransactions,
  balance,
  deleteTransaction,
  editUserInfo,
};
