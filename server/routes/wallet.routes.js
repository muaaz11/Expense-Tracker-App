import Router from 'express'
import upload from '../config/multer.config.js'
import { addWallet, deleteWallet, getWallets, updateWallet } from '../controllers/wallet.controller.js'

const router = Router()

router.route("/addWallet/:id").post(upload.single("wallet_image"), addWallet)
router.route("/fetchWallets/:id").get(getWallets)
router.route("/updateWallet/:id").put(upload.single("wallet_image"), updateWallet)
router.route("/deleteWallet/:id").delete(deleteWallet)

export default router