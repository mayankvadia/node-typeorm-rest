import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();


router.post("/me", async (_req, res) => {
  const controller = new UserController();
  if(Object.keys(_req.body).length > 0){
    const response = await controller.sendNotification(_req.body);
    return res.send(response);
  }else{
    return res.status(400).send()
  }
});

export default router