import {
  getUser,
  addTransaction,
  getTransactions,
} from "../controllers/user.controller.js";
import { Router } from "express";
import { authorization } from "../middlewares/authorization.js";

const router = Router();

router.route("/getUser/:id").get(getUser);
router.route("/add_transaction/:id").post(addTransaction);
router.route("/getTransactions/:id").get(getTransactions);

export default router;
