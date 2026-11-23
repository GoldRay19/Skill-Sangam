import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export async function connectDatabase() {
  let memoryServer;
  const uri = process.env.MONGO_URI;
  if (uri) {
    await mongoose.connect(uri);
    return { memoryServer: null, uri };
  }

  memoryServer = await MongoMemoryServer.create();
  const memoryUri = memoryServer.getUri();
  await mongoose.connect(memoryUri);
  console.warn("MONGO_URI is not set; using an in-memory MongoDB instance.");
  return { memoryServer, uri: memoryUri };
}

export async function closeDatabase(memoryServer) {
  await mongoose.disconnect();
  if (memoryServer) await memoryServer.stop();
}
