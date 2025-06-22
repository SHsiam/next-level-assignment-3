// import { Borrow } from "../models/borrow.model";
// import { Book } from "../models/book.model";

// export const borrowBookService = async (payload: {
//   book: string;
//   quantity: number;
//   dueDate: string;
// }) => {
//   const { book: bookId, quantity, dueDate } = payload;

//   // Find the book
//   const book = await Book.findById(bookId);
//   if (!book) {
//     throw new Error("Book not found");
//   }

//   if (book.copies < quantity) {
//     throw new Error("Not enough copies available");
//   }

//   // Create borrow record
//   const borrowRecord = await Borrow.create({
//     book: bookId,
//     quantity,
//     dueDate,
//   });

//   // Update book copies
//   book.copies -= quantity;
//   await book.save();

//   // Update book availability
//   await Book.updateAvailability(bookId);

//   return borrowRecord;
// };

// export const getBorrowedSummaryService = async () => {
//   const result = await Borrow.aggregate([
//     {
//       $group: {
//         _id: "$book",
//         totalQuantity: { $sum: "$quantity" },
//       },
//     },
//     {
//       $lookup: {
//         from: "books",
//         localField: "_id",
//         foreignField: "_id",
//         as: "book",
//       },
//     },
//     {
//       $unwind: "$book",
//     },
//     {
//       $project: {
//         book: {
//           title: "$book.title",
//           isbn: "$book.isbn",
//         },
//         totalQuantity: 1,
//       },
//     },
//   ]);

//   return result;
// };
