import express  from "express";

import { Request, Response } from "express";  
import pool from "../db/db";  

import asyncHandler from "../middleware/asyncHandler"; 

const router = express.Router();  

export const createItem = asyncHandler(async (req:Request, res: Response) => {
    const { title, description, status, priority } = req.body;  
    try {  
        const result = await pool.query(  
            'INSERT INTO todo_list (title, description, status, priority) VALUES ($1, $2, $3, $4) RETURNING *',  
            [title, description, status || 'pending', priority || 1]  
        );  
        res.status(201).json(result.rows[0]);  
    } catch (error) {  
        console.error(error);  
        res.status(500).json({ error: 'Internal Server Error' });  
    }  
});
export const getAllTasks = asyncHandler(async (req: Request, res:Response) => {
    try {  
        const result = await pool.query('SELECT * FROM todo_list');  
        res.status(200).json(result.rows);  
    } catch (error) {  
        console.error(error);  
        res.status(500).json({ error: 'Internal Server Error' });  
    } 
});
export const getTaskById = asyncHandler(async (req:Request, res: Response) => {
    const { id } = req.params;  
    try {  
        const result = await pool.query('SELECT * FROM todo_list WHERE id = $1', [id]);  
        if (result.rows.length === 0) {  
            return res.status(404).json({ error: 'Todo not found' });  
        }  
        res.status(200).json(result.rows[0]);  
    } catch (error) {  
        console.error(error);  
        res.status(500).json({ error: 'Internal Server Error' });  
    }  
});
export const updateTasks = asyncHandler(async (req:Request, res:Response) => {
    const { id } = req.params;  
    const { title, description, status, priority } = req.body;  

    try {  
        const result = await pool.query(  
            'UPDATE todo_list SET title = $1, description = $2, status = $3, priority = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',  
            [title, description, status, priority, id]  
        );  

        if (result.rows.length === 0) {  
            return res.status(404).json({ error: 'Todo not found' });  
        }  
        res.status(200).json(result.rows[0]);  
    } catch (error) {  
        console.error(error);  
        res.status(500).json({ error: 'Internal Server Error' });  
    } 
});
export const deleteTasks = asyncHandler(async (req:Request, res:Response) => {
    const { id } = req.params;  
    try {  
        const result = await pool.query('DELETE FROM todo_list WHERE id = $1 RETURNING *', [id]);  
        if (result.rows.length === 0) {  
            return res.status(404).json({ error: 'Todo not found' });  
        }  
        res.status(204).send();  
    } catch (error) {  
        console.error(error);  
        res.status(500).json({ error: 'Internal Server Error' });  
    } 
});



  

