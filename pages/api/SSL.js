import { connectToDatabase } from "./mongo";
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'abc6533a6603e965'
const store_passwd = 'abc6533a6603e965@ssl'
const is_live = false //true for live, false for sandbox

async function SSL(req, res) {
  try {
    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db("myShopdb");
    const BuyProduct = db.collection("buyProducts");

    if (req.method === "POST") {
      const product = req.body;

      const data = {
        total_amount: product.price,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: 'http://localhost:3030/success',
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
      // Retrieve all products from the database
    //   const result = await BuyProduct.insertOne(product);

    //   // Respond with the retrieved products and a success status
    //   res.status(200).json({ message: "Success", status: 200, data: result });
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

export default SSL;
