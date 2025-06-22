import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;
const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://mongoose:mongoose@cluster0.jvbgqui.mongodb.net/advanced-note-app?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
