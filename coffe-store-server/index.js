const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.34iymlr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const coffesCollection = client.db("coffeDB").collection("coffes");
    const usersCollection = client.db("coffeDB").collection("users");

    app.post('/coffes', async(req, res)=>{
        const newCoffe = req.body;
        console.log(newCoffe);
        const result = await coffesCollection.insertOne(newCoffe);
        res.send(result);
    })

    app.post('/users', async(req, res)=> {
      const newUser = req.body;
      // console.log(newUser);
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });

    app.get('/users', async(req, res)=> {
      const result = await usersCollection.find().toArray();
      res.send(result);
    })

    app.get('/coffes', async(req, res)=>{
        const result = await coffesCollection.find().toArray();
        res.send(result);
    })

    app.get('/coffes/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await coffesCollection.findOne(query)
        res.send(result);
    })

    app.patch('/users', async(req, res)=> {
      const {email, lastSignInTime} = req.body;
      const query = {email: email}
      const updatedDoc = {
        $set: {
          lastSignInTime: lastSignInTime
        }
      }
      const result = await usersCollection.updateOne(query, updatedDoc);
      res.send(result);
    })

    app.put('/coffes/:id', async(req, res)=>{
      const id = req.params.id;
      const newCoffe = req.body;
      const query = {_id: new ObjectId(id)};
      const option = {upsert: true};
      const updatedDoc = {
        $set:newCoffe
      }
      const result = await coffesCollection.updateOne(query, updatedDoc, option);
      res.send(result);
    })

    app.delete('/users/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    })

    app.delete('/coffes/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await coffesCollection.deleteOne(query);
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send("The Coffe is Getting Hot...");
})

app.listen(port, ()=>{
    console.log(`Server is Running on Port ${port}`);
})