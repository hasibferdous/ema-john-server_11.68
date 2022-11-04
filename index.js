const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
//const { query } = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5001;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ambheuq.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        
        const productCollection = client.db('emaJohn').collection('products')

        app.get('/products', async(req, res)=>{
            const query = {}
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
            //console.log(products);
        })
    } 
    finally{


    }
}
run().catch(err => console.error(err))


app.get('/', (req,res)=>{
    res.send('ema john is running');
})
app.listen(port, () =>{
    console.log(`ema john running on: ${port}`)
})