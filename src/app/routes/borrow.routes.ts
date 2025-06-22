import express from "express";
import { borrowBook, borrowedSummary } from "../controllers/borrow.controller";

const borrowRoutes = express.Router();

borrowRoutes.post("/", borrowBook);
borrowRoutes.get("/", borrowedSummary);

export default borrowRoutes;
