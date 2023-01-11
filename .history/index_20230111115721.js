const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001
// middelware
app.use(cors());
app.use(express.json());
// .GLz@Mv6S_Zn7EV

app.get('/', (req, res)=>{
    res.send('E-commerce Server is running')
});

app.listen(port,() =>{
    console.log('Server is running port', port)
})