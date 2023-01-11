const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001;
// middelware
app.use(cors());
app.use(express.json());

async function run (){
    try{
        const productCollection = client.db("laptopdb").collection("products");
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