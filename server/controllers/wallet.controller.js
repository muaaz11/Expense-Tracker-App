import pool from "../database/database.js";
import cloudinary from "../config/cloudinary.config.js";
import Stream from "stream";

const addWallet = async (req, res) => {
  try {
    const { id } = req.params;
    const { wallet_name, amount } = req.body;

    let imageUrl = null;

    if (!wallet_name) {
      return res
        .status(400)
        .json({ success: false, message: "name is required" });
    }

    const walletExist = `SELECT * from wallets where wallet_name = $1 AND user_id = $2`;
    const result = await pool.query(walletExist, [wallet_name, id]);

    if (result.rowCount > 0) {
      return res.status(409).json({
        success: false,
        message: "wallet with this name already exist",
      });
    }

    const uploadWalletPicture = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "wallet_pictures",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      Stream.Readable.from(req.file.buffer).pipe(stream);
    });

    imageUrl = uploadWalletPicture.secure_url;

    const query = await pool.query(
      `INSERT INTO wallets (user_id, wallet_name, wallet_image, amount, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id, wallet_name, imageUrl, amount || 0, new Date()],
    );

    if (query.rowCount > 0) {
      return res.status(200).json({
        success: true,
        message: "Wallet added successfully",
        data: query.rows[0],
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getWallets = async (req, res) => {
  try {
    const { id } = req.params;

    const query = "SELECT * from wallets where user_id = $1";
    const result = await pool.query(query, [id]);

    if (result.rowCount > 0) {
      const wallets = result.rows;
      return res.status(200).json({ success: true, wallets: wallets });
    } else {
      return res
        .status(409)
        .json({ success: true, message: "No result found for this id" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const updateWallet = async (req, res) => {
  try {
    const { id } = req.params;
    const { wallet_name, amount } = req.body;

    let wallet_image = null;

    if (!id) {
      return res.status(409).json({ success: false, message: "Need id" });
    }

    const walletCheck = await pool.query(
      `SELECT * FROM wallets WHERE id = $1`,
      [id]
    );

    if (walletCheck.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Wallet not found with id: " + id,
      });
    }

    if (req.file) {
      const updateWalletPicture = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "wallet_pictures",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );

        Stream.Readable.from(req.file.buffer).pipe(stream);
      });

      wallet_image = updateWalletPicture.secure_url;
    }

    const updateWalletQuery = await pool.query(
      `UPDATE wallets SET wallet_name = COALESCE($1, wallet_name), amount = COALESCE($2, amount), wallet_image = COALESCE($3, wallet_image) WHERE id = $4 RETURNING *`,
      [wallet_name || null, amount || null, wallet_image, id],
    );

    if (updateWalletQuery.rowCount > 0) {
      return res.status(200).json({
        success: true,
        message: "Wallet updated",
        updatedWallet: updateWalletQuery.rows[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Failed to update wallet",
      });
    }
  } catch (error) {
    console.log("Error updating wallet:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error", error: error.message });
  }
};

const deleteWallet = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteWalletQuery = await pool.query(
      `DELETE FROM wallets where id = $1`,
      [id],
    );

    if (deleteWalletQuery.rowCount === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No wallet found for this id" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: true, message: "Internal Server Error" });
  }
};

export { addWallet, getWallets, updateWallet, deleteWallet };
