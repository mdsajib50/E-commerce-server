const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5001;
// middelware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.}:<password>@cluster0.bx3l1s2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


async function run (){
    try{
        // const productCollection = client.db("laptopdb").collection("products");
        console.log(productCollection)
        app.get('/products', async(req, res)=>{
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
    }
    finally{

    }
}
run().catch(err => console.log(err))
app.get('/', (req, res)=>{
    res.send('E-commerce Server is running')
});

app.listen(port,() =>{
    console.log('Server is running port', port)
})