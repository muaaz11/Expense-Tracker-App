import Router from 'express'
import upload from '../config/multer.config'

const router = Router()

router.route("/addWallet/:id").post(upload.single("image"))