const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion} = require('mongodb');
const app = express();
const port = process.env.PORT || 5001
// middelware
app.use(cors());
app.use(express.json());
// 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bx3l1s2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
        const productCollection = client.db("laptopdb").collection("products");
        app.get('/products', async(req, res)=>{
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.
        })
    }
    finally{

    }
}

app.get('/', (req, res)=>{
    res.send('E-commerce Server is running')
});

app.listen(port,() =>{
    console.log('Server is running port', port)
})