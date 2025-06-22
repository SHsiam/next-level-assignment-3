import express, { Application } from "express";
import bookRoutes from "./app/routes/book.routes";
import { errorHandler } from "./app/middlewares/errorHandler";
import borrowRoutes from "./app/routes/borrow.routes";
import cors from "cors";

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use("/books", bookRoutes);
app.use("/borrow", borrowRoutes);

app.use(errorHandler); // global error handler

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

export default app;
