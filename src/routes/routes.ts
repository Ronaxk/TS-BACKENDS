import express, { Request, Response } from "express";
import { homeDetail } from "../controllers/users";
const router = express.Router();

router.get("/home", homeDetail);

export { router };
