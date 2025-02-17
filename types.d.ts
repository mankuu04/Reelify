import { Connection } from "mongoose";

declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}
// conn: jo actual MongoDB connection store karega (ya null hoga agar connection nahi hai).
// promise: jo connection banane ka promise store karega (ya null hoga agar abhi promise initialize nahi hua).
export {};
