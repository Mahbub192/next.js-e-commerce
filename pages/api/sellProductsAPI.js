import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongo";

// Define an asynchronous function to handle selling products via API
async function sellProductsAPI(req, res) {
  try {
    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db("myShopdb");
    const SellProduct = db.collection("sellProducts");
    const itemCollection = db.collection("products");

    if (req.method === "POST") {
      // Handle POST request to add or update a product
      const product = req.body;
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      product.date = formattedDate;

      if (req.body.id) {
        // Update an existing product by ID
        const updateOne = {
          $set: {
            // Update various product properties
            date: formattedDate,
            email: req.body.email,
            productOwnerName: req.body.productOwnerName,
            shopName: req.body.shopName,
            title: req.body.title,
            location: req.body.location,
            category: req.body.category,
            sub_category: req.body.sub_category,
            phoneNumber: req.body.phoneNumber,
            images: req.body.images,
            description: req.body.description,
            status: req.body.status,
            stock: req.body.stock,
          },
        };
        const result = await SellProduct.updateOne(
          { _id: new ObjectId(req.body.id) },
          updateOne
        );
        res.status(200).json({ message: "Success update Product", status: 200, data: result });
      } else {
        // Insert a new product into the database
        const result = await SellProduct.insertOne(product);
        res.status(200).json({ message: "Success", status: 200, data: result });
      }
    } else if (req.method === "GET") {
      // Handle GET request to retrieve products
      if (req.query.email) {
        const email = req.query.email;
        const allProduct = await SellProduct.find({ email: email }).toArray();
        res.status(200).json({ message: "Success", status: 200, data: allProduct });
      } else {
        const allProduct = await SellProduct.find().toArray();
        res.status(200).json({ message: "Success", status: 200, data: allProduct });
      }
    } else if (req.method === "PATCH") {
      // Handle PATCH request to update product status or comment
      if (req.body.status) {
        // Update the status of a product
        const { id, status } = req.body;
        const updateOne = {
          $set: {
            status: status,
          },
        };
        const result = await SellProduct.updateOne(
          { _id: new ObjectId(id) },
          updateOne
        );

        res.status(200).json({ message: "Status updated successfully", data: result });

        // Insert the updated product into the item collection
        const findProduct = await SellProduct.findOne({
          _id: new ObjectId(id),
        });
        await itemCollection.insertOne(findProduct);
      } else if (req.body.comment) {
        // Update the comment of a product
        const { id, comment } = req.body;
        const updateOne = {
          $set: {
            comment: comment,
          },
        };
        const result = await SellProduct.updateOne(
          { _id: new ObjectId(id) },
          updateOne
        );

        res.status(200).json({ message: "Comment updated successfully", data: result });
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

export default sellProductsAPI;
