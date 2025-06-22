import express from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "../controllers/book.controller";

const bookRoutes = express.Router();

bookRoutes.post("/", createBook);
bookRoutes.get("/", getBooks);
bookRoutes.get("/:bookId", getBookById);
bookRoutes.put("/:bookId", updateBook);
bookRoutes.delete("/:bookId", deleteBook);

export default bookRoutes;
