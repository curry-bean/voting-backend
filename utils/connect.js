import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.info("successful connection to mongodb.com");
  } catch (err) {
    console.error(
      `Database not connected, internal server error occured:${err.message}`
    );
  }
}

export default connect;
