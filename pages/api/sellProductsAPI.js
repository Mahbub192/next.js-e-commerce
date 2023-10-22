import { connectToDatabase } from "./mongo";

async function sellProductsAPI(req, res) {
    try {
      // Connect to the database
      const client = await connectToDatabase();
      const db = client.db("myShopdb");
      const SellProduct = db.collection('sellProducts');
  
      if (req.method === "POST") {
        const product = req.body;
        // Retrieve all products from the database
        const result = await SellProduct.insertOne(product);
  
        // Respond with the retrieved products and a success status
        res.status(200).json({ message: "Success", status: 200, data: result });
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
  