import { connectToDatabase } from "./mongo";

const bcrypt = require("bcrypt");

export default async function userAccountCreate(req, res) {
  try {
    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db("myShopdb");
    const userCollection = db.collection("userCreates");

    if (req.method === "GET") {
      const { email } = req.query;
      // console.log(email)
      if (email) {
        const query = { email: email };
        const user = await userCollection.findOne(query);

        res.status(200).json({
          message: "Find the User",
          status: 200,
          data: user,
        });
      }else{
        const users = await userCollection.find({}).toArray();

      // Respond with the retrieved user data and a success status
      res.status(200).json({
        message: "Successfully received all user data",
        status: 200,
        data: users,
      });
      }
    } else if (req.method === "POST") {
      // Handle POST request to create a new user
      const user = req.body;

      // Hash the user's password for security
      if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      }

      // Check if the user with the same email already exists
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);

      if (existingUser) {
        // User with the same email already exists
        return res
          .status(409)
          .json({ message: "User already exists", status: 409 });
      }

      // Save the user's personal information in the database
      const result = await userCollection.insertOne(user);

      // Respond with a success message and status
      res.status(200).json({
        message: "Data inserted into the database successfully",
        status: 200,
        data: result,
      });
    } else if (req.method === "PATCH") {
      const user = req.body;
      // console.log(user)
      const query = { email: user.email };
      const updateDoc = {
        $set: {
          name: req.body.name,
          phoneNumber: req.body.phoneNumber,
          gender: req.body.gender,
          location: req.body.location,
          message: req.body.message,
        },
      };

      const result = await userCollection.updateOne(query, updateDoc);
      // console.log(result);

      // Respond with the retrieved user data and a success status
      res.status(200).json({
        message: "Successfully received all user data",
        status: 200,
        data: result,
      });
    } 
    // else if (req.method === "GET") {
    //   // Handle GET request to retrieve all users from the database
    //   const users = await userCollection.find({}).toArray();

    //   // Respond with the retrieved user data and a success status
    //   res.status(200).json({
    //     message: "Successfully received all user data",
    //     status: 200,
    //     data: users,
    //   });
    // }
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
