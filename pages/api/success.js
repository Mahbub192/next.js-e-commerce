import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongo";
import { NextResponse } from "next";


async function success(req, res) {
  try {
    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db("myShopdb");
    const itemCollection = db.collection("products");

    if (req.method === "POST") {
      const tranId = req.query.id; // Access the dynamic parameter
      console.log(15, tranId);
      return NextResponse.redirect(new URL('http://localhost:3000', req.url));

      // You can also use res.writeHead and res.end to perform the redirect
      // res.writeHead(302, { Location: 'http://localhost:3000' });
      // res.end();
    }
  } catch (error) {
    // Handle any errors and log them
    console.error(error);

    // Respond with an error message and status in case of an error
    res.status(500).json({
      message: "Internal server error",
      status: 500,
      error: error.message,
    });
  }
}

export default success;


