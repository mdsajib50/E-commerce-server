const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5001;
// middelware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bx3l1s2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run (){
    try{
        const productCollection = client.db("laptopdb").collection("products");
        const userCollection = client.db("laptopdb").collection("users");
        const bookingCollection = client.db("laptopdb").collection("bookings");
        // console.log(productCollection)

        app.post('/jwt', (req, res)=>{
            const user = req.body
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn:'7d'})
            res.send({token})
            
          });

        app.get('/products', async(req, res)=>{
            const query = {};
            const cursor = productCollection.find(query).limit(3);
            const products = await cursor.toArray();
            res.send(products);
        });
        app.get('/all-products', async(req, res)=>{
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        app.get('/product-category/:category', async(req, res)=>{
            const category =req.params.category;
            console.log('category:',category)
            const query ={category:category}
            const products =await productCollection.find(query);
            res.send(products)
        });

        app.get('/myproduct', async(req, res)=>{
          let query ={};
          if (req.query.email) {
            query = {
              email: req.query.email
            }
          }
          
          const cursor = productCollection.find(query);
          const products = await cursor.toArray()
          
          res.send(products)
      })
        app.post('/product', async(req, res)=>{
            const product = req.body;
            const result = productCollection.insertOne(product)
            res.send(result)
        });
        app.delete('/products/:id', async(req, res)=>{

        })
        // user API

        app.get('/users', async(req, res)=>{
            const query ={}
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users)
        })
        app.post('/user', async(req, res)=>{
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result)

        });
        app.delete('/user/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result)
        });
        // booking api
        app.post('/booking', async(req, res)=>{
            const booking = req.body;
            const  result = await bookingCollection.insertOne(booking);
            res.send(result)
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