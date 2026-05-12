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
  const { type, wallet_id, description, date, amount, category_name } =
    req.body;
  const { id } = req.params;

  if (!type || !date || !amount || !wallet_id) {
    return res
      .status(400)
      .json({ success: false, message: "Fill the required details" });
  }

  try {
    const walletResult = await pool.query(
      `SELECT * FROM wallets WHERE id = $1 AND user_id = $2`,
      [wallet_id, id],
    );

    if (walletResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Wallet not found" });
    }

    const selectedWallet = walletResult.rows[0];

    if (type === "expense") {
      if (Number(selectedWallet.amount) < Number(amount)) {
        return res.status(400).json({
          success: false,
          message: "Insufficient balance in selected wallet",
        });
      }

      await pool.query(
        `UPDATE wallets 
         SET 
           amount = amount - $1,
           total_expense = COALESCE(total_expense, 0) + $1
         WHERE id = $2`,
        [amount, wallet_id],
      );

      const result = await pool.query(
        `INSERT INTO add_transaction (user_id, wallet_id, type, date, amount, description, category_name)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [
          id,
          wallet_id,
          type,
          date,
          amount,
          description || null,
          category_name || null,
        ],
      );

      return res.status(201).json({
        success: true,
        message: "Expense added successfully",
        transaction: result.rows[0],
      });
    }

    if (type === "income") {
      await pool.query(
        `UPDATE wallets 
         SET 
           amount = amount + $1,
           total_income = COALESCE(total_income, 0) + $1
         WHERE id = $2`,
        [amount, wallet_id],
      );

      const result = await pool.query(
        `INSERT INTO add_transaction (user_id, wallet_id, type, date, amount, description, category_name)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [
          id,
          wallet_id,
          type,
          date,
          amount,
          description || null,
          category_name || null,
        ],
      );

      return res.status(201).json({
        success: true,
        message: "Income added successfully",
        transaction: result.rows[0],
      });
    }

    return res
      .status(400)
      .json({ success: false, message: "Invalid transaction type" });
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
      "SELECT id, type, category_name, amount, description, date, wallet_id from add_transaction where user_id = $1 ORDER BY date desc",
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

const updateTransaction = async (req, res) => {
  const { type, wallet_id, description, date, amount, category_name } =
    req.body;
  const { id, user_id } = req.params;

  if (!type || !date || !amount || !wallet_id) {
    return res
      .status(400)
      .json({ success: false, message: "Fill the required details" });
  }

  try {
    const walletResult = await pool.query(
      `SELECT * FROM wallets WHERE id = $1 AND user_id = $2`,
      [wallet_id, user_id],
    );

    if (walletResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Wallet not found" });
    }

    const selectedWallet = walletResult.rows[0];

    if (type === "expense") {
      if (Number(selectedWallet.amount) < Number(amount)) {
        return res.status(400).json({
          success: false,
          message: "Insufficient balance in selected wallet",
        });
      }

      await pool.query(
        `UPDATE wallets 
         SET 
           amount = amount - $1,
           total_expense = COALESCE(total_expense, 0) + $1
         WHERE id = $2`,
        [amount, wallet_id],
      );

      const result = await pool.query(
        `UPDATE add_transaction 
   SET wallet_id = $1, type = $2, date = $3, amount = $4, description = $5, category_name = $6 
   WHERE id = $7
   RETURNING *`, // ← add this
        [
          wallet_id,
          type,
          date,
          amount,
          description || null,
          category_name || null,
          id,
        ],
      );
      return res.status(201).json({
        success: true,
        message: "Expenses updated successfully",
        transaction: result.rows[0],
      });
    }

    if (type === "income") {
      await pool.query(
        `UPDATE wallets 
         SET 
           amount = amount + $1,
           total_income = COALESCE(total_income, 0) + $1
         WHERE id = $2`,
        [amount, wallet_id],
      );

      const result = await pool.query(
        `UPDATE add_transaction 
   SET wallet_id = $1, type = $2, date = $3, amount = $4, description = $5, category_name = $6 
   WHERE id = $7
   RETURNING *`,
        [
          wallet_id,
          type,
          date,
          amount,
          description || null,
          category_name || null,
          id,
        ],
      );

      return res.status(201).json({
        success: true,
        message: "Income updated successfully",
        transaction: result.rows[0],
      });
    }

    return res
      .status(400)
      .json({ success: false, message: "Invalid transaction type" });
  } catch (error) {
    console.error("Error inserting transaction:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export {
  getUser,
  addTransaction,
  getTransactions,
  balance,
  deleteTransaction,
  editUserInfo,
  updateTransaction,
};
