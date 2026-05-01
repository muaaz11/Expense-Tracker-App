import {
  getUser,
  addTransaction,
  getTransactions,
  balance,
  deleteTransaction,
  editUserInfo,
  updateTransaction
} from "../controllers/user.controller.js";
import upload from "../config/multer.config.js";
import { Router } from "express";
import { authorization } from "../middlewares/authorization.js";

const router = Router();

router.route("/getUser/:id").get(getUser);
router.route("/add_transaction/:id").post(addTransaction);
router.route("/updateTransaction/:id/:user_id").put(updateTransaction);
router.route("/deleteTransaction/:id").delete(deleteTransaction)
router.route("/getTransactions/:id").get(getTransactions);
router.route("/balance/:id").get(balance);
router.route("/updateUserData/:id").put(upload.single("image_url"),editUserInfo)

export default router;
