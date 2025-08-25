import { getUser } from "../controllers/user.controller.js";
import {Router} from 'express'
import { app } from "../app.js";

const router = Router()

router.route('/getUser/:id').get(getUser)

export default router