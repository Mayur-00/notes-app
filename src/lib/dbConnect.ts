import mongoose from "mongoose";

const dbUri = process.env.DB_URI!;

if (!dbUri) {
  throw new Error("Provide DB Connection String or URI");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDb() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opt = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000, // Add timeout
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose
      .connect(dbUri, opt)
      .then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;

    console.log("Database connected successfully"); // Optional logging
    return cached.conn;
  } catch (error: any) {
    cached.promise = null;
    throw error;
  }
}
