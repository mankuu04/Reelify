import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  throw new Error("mongodb uri missing!!");
}

// ab yha pe hum check krenge ki kya hamare pass connection already hai jo ki node
// environment mey global mey hota hai

let cached = global.mongoose;
//yeh line check karti hai ki kya global scope me pehle se koi mongoose connection store hai. Iska fayda yeh hai ki jab app development mode mein baar baar reload hoti hai, toh hum pehle se banaya hua connection use kar sakte hain instead of naya connection create karne ke.
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true, //Agar connection mein thodi der ho, toh commands ko temporarily store kar leta hai.
      //Iska matlab hai agar database se connection establish hone se pehle koi query/command run karni ho, toh un commands ko buffer (queue) kar diya jayega
      maxPoolSize: 10,
    };
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
