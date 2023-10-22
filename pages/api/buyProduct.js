import { connectToDatabase } from "./mongo";

async function buyProduct(req, res) {
  try {
    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db("myShopdb");
    const BuyProduct = db.collection("buyProducts");

    if (req.method === "POST") {
      const product = req.body;
      // Retrieve all products from the database
      const result = await BuyProduct.insertOne(product);

      // Respond with the retrieved products and a success status
      res.status(200).json({ message: "Success", status: 200, data: result });
    } else if (req.method === "GET") {
      const email = req.query.email;
      const query = { email: email };
      const items = await BuyProduct.find(query).toArray();
    //   console.log(21, items);
      res.status(200).json({
        message: "Find the User",
        status: 200,
        data: items,
      });
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

export default buyProduct;
