import pool from "../database/database.js";

const getUser = async (req, res) => {
  const { id } = req.params;

  console.log("📢 [BACKEND] getUser API hit with ID:", id);

  try {
    const userDetails = await pool.query("SELECT * from users WHERE id = $1", [
      id,
    ]);

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

const addTransaction = async (req, res) => {
  const { type, category_id, description, date, amount } = req.body;
  const { id } = req.params; // ye user_id hoga

  if (!type || !description || !date || !amount) {
    return res
      .status(400)
      .json({ message: "Fill the required details", success: false });
  }

  try {
    const result = await pool.query(
      `INSERT INTO add_transaction 
       (user_id, type, category_id, date, amount, description) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [id, type, category_id, date, amount, description || null]
    );

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
      "SELECT type, category_id, amount, description from add_transaction where user_id = $1",
      [id]
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

export { getUser, addTransaction, getTransactions };
