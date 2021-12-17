import express from "express";
import UserRouter from "./user.router";
const router = express.Router();
router.use("/notify", UserRouter)
export default router;