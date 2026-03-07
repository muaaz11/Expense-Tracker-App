import {
  getUser,
  addTransaction,
  getTransactions,
  balance,
  deleteTransaction
} from "../controllers/user.controller.js";
import { Router } from "express";
import { authorization } from "../middlewares/authorization.js";

const router = Router();

router.route("/getUser/:id").get(getUser);
router.route("/add_transaction/:id").post(addTransaction);
router.route("/getTransactions/:id").get(getTransactions);
router.route("/balance/:id").get(balance);
router.route("/deleteTransaction/:id").delete(deleteTransaction)

export default router;
