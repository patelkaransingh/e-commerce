import mongoose from "mongoose";

declare global {
  var mongooseConnectionPromise: Promise<typeof mongoose> | undefined;
}

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("please define mongo db uri");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  let connectionPromise = globalThis.mongooseConnectionPromise;
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(uri);
    globalThis.mongooseConnectionPromise = connectionPromise;
  }

  try {
    return await connectionPromise;
  } catch (error) {
    console.error("MongoDB Connection Error!", error);
    throw error;
  } finally {
    if (globalThis.mongooseConnectionPromise === connectionPromise) {
      globalThis.mongooseConnectionPromise = undefined;
    }
  }
}
