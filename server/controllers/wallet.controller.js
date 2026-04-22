import { pool } from "pg";
import cloudinary from "../config/cloudinary.config";
import Stream from "stream";

const addWallet = async (req, res) => {
  try {
    const { id } = req.params;
    const { walletName } = req.body;

    let imageUrl = null;

    if (!walletName || req.file) {
      return res
        .status(400)
        .json({ succes: false, message: "name nad image are required" });
    }

    const uploadWalletPicture = await Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "wallet_picures",
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
      "INSER INTO wallets(user_id, walletName, image) VALUES ($1, $2, $3) RETURNING *",
      [id, walletName, imageUrl],
    );

    if (query.succes) {
      return res
        .status(200)
        .json({ succes: true, message: "Wallet added successfully" });
    }

    return res
      .status(400)
      .json({ succes: false, message: "Wallet added failed" });
  } catch (error) {
    return res
      .status(500)
      .json({ succes: false, message: "Internal Server Error" });
  }
};


export {addWallet}