const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI || !mongoURI.trim()) {
    throw new Error("Missing MONGO_URI: MongoDB connection string is required before the server can start.");
  }

  try {
    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    const message = error && error.message ? error.message : "Unknown MongoDB error";
    let classifiedMessage = `Unknown MongoDB error: ${message}`;

    if (/authentication failed|bad auth|auth failed/i.test(message)) {
      classifiedMessage = `Authentication failed: ${message}`;
    } else if (/getaddrinfo|ENOTFOUND|EAI_AGAIN|network|dns/i.test(message)) {
      classifiedMessage = `Network/DNS issue: ${message}`;
    } else if (/missing MONGO_URI/i.test(message)) {
      classifiedMessage = `Missing MONGO_URI: ${message}`;
    }

    console.error(classifiedMessage);
    process.exit(1);
  }
};

module.exports = connectDB;