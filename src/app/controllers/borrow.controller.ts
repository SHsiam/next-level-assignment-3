import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const borrowBook: any = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    if (book.copies < quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Not enough copies available" });
    }

    // Create borrow
    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });

    book.copies -= quantity;
    await book.save();

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to borrow book", error });
  }
};

export const borrowedSummary = async (_req: Request, res: Response) => {
  try {
    const borrows = await Borrow.find().populate("book", "title isbn");

    const summaryMap = new Map<
      string,
      { book: { title: string; isbn: string }; totalQuantity: number }
    >();

    borrows.forEach((borrow) => {
      const book = borrow.book as any;

      // ✅ Check if book exists
      if (!book || !book._id) {
        console.warn("Skipping borrow with missing book:", borrow);
        return;
      }

      const key = book._id.toString();

      if (!summaryMap.has(key)) {
        summaryMap.set(key, {
          book: {
            title: book.title,
            isbn: book.isbn,
          },
          totalQuantity: 0,
        });
      }

      summaryMap.get(key)!.totalQuantity += borrow.quantity;
    });

    const summary = Array.from(summaryMap.values());

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to generate summary",
      error,
    });
  }
};
