import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongo";

async function sellProductsAPI(req, res) {
  try {
    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db("myShopdb");
    const SellProduct = db.collection("sellProducts");

    if (req.method === "POST") {
      const product = req.body;
      // Retrieve all products from the database
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      product.date = formattedDate;

      const result = await SellProduct.insertOne(product);

      // Respond with the retrieved products and a success status
      res.status(200).json({ message: "Success", status: 200, data: result });
    } 
    if (req.method === "GET") {
      if (req.query.email) {
        const email = req.query.email;
        const allProduct = await SellProduct.find({ email: email }).toArray();
        res
          .status(200)
          .json({ message: "Success", status: 200, data: allProduct });
      } else {
        const allProduct = await SellProduct.find().toArray();
        // console.log(allProduct);
        res
          .status(200)
          .json({ message: "Success", status: 200, data: allProduct });
      }

      // console.log(allProduct)
    } 
    if (req.method === "PATCH") {
      const { id, status } = req.body;      // Update the status for the product with the given ID
     const updateOne = {
      $set : {
        status : status,
      }
     } 
      const result = await SellProduct.updateOne({ _id: new ObjectId(id) }, updateOne);
      res.status(200).json({ message: "Status updated successfully" , data: result});
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

export default sellProductsAPI;
