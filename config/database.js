const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URL;

if (!uri) {
  console.error("Missing MONGODB_URI environment variable");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectToMongoDB = async () => {
  try {
    await client.connect();
    await client.db("Airbean").command({ ping: 1 });
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

module.exports = { connectToMongoDB, client };
