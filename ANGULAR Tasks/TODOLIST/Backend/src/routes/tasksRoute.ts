import express  from "express";
import { Request, Response, NextFunction } from "express";
import { createItem, deleteTasks, getAllTasks,getTaskById, updateTasks } from "../controllers/listController";

const router = express.Router();

router.post("/",  createItem)
router.get("/:id",  getTaskById)
router.get("/",  getAllTasks)
router.put("/:id",  updateTasks)
router.delete("/:id",  deleteTasks)

export default router