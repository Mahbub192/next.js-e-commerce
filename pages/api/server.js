import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongo";

async function allProduct(req, res) {
  const id = req.query.id;

  try {
    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db("myShopdb");
    const itemCollection = db.collection("products");

    if (req.method === "GET") {
      if (id) {
        const objectId = new ObjectId(id);
        const data = await itemCollection.findOne({ _id: objectId });

        // Respond with the retrieved products and a success status
        res.status(200).json({ message: "Success", status: 200, data: data });
      } else {
        // Retrieve all products from the database
        const items = await itemCollection.find({}).toArray();

        // Respond with the retrieved products and a success status
        res.status(200).json({ message: "Success", status: 200, data: items });
      }
    } else if (req.method === "PATCH") {
      const review = req.body;
      const productId = new ObjectId(req.body.productId);
      console.log(productId)

      // Use the $push operator to add the review to the findProduct.review array
      const updateResult = await itemCollection.updateOne(
        { _id: productId },
        { $push: { "review": review } }
      );

      console.log(updateResult)

      if (updateResult.modifiedCount === 1) {
        // Review added successfully
        res.status(200).json({ message: "Review added successfully", status: 200 });
      } else {
        // Review addition failed
        res.status(500).json({
          message: "Failed to add the review",
          status: 500,
        });
      }
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

export default allProduct;
