import { connectToDatabase } from "./mongo";

async function categories(req, res) {

  try {
    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db("myShopdb");
    const categoryCollection = db.collection("categories");

    if (req.method === "GET") {
        const categories=await categoryCollection.find({}).toArray();
        res.send({message:"success",status:200,data:categories})

   console.log(data);
    }


    
  } 
  
  
  catch (error) {
    // Handle any errors and log them
    console.error(error);

    
  }
}

export default categories;
