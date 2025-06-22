import { Schema, model } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

bookSchema.pre("save", function (next) {
  this.available = this.copies > 0;
  next();
});

bookSchema.statics.updateAvailability = async function (id: string) {
  const book = await this.findById(id);
  if (book) {
    book.available = book.copies > 0;
    await book.save();
  }
};

export const Book = model<IBook>("Book", bookSchema);
