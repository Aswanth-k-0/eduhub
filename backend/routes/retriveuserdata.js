// retrieveDocuments.js
import mongoose from "mongoose";

async function retrieveUser() {
    try {
    const db = mongoose.connection.getClient(); // Access the MongoClient instance
    const collectionName = 'user'; // Specify the collection name
    const collection = db.db().collection(collectionName); // Access the collection

   
        const documents = await collection.find({}).toArray();
        console.log("Documents in collection:", documents[0]["id"]);
        return documents;
    } catch (error) {
        console.error("Error querying collection:", error);
    }
}

async function retrieveData(tagValue) {
    try {
    const db = mongoose.connection.getClient(); // Access the MongoClient instance
    const collectionName = 'data'; // Specify the collection name
    const collection = db.db().collection(collectionName);// Access the collection
    const filter = { tag: { $in: tagValue.map(value => new RegExp(value, 'i')) } };
    const documents = await collection.find(filter).toArray();
    return documents;
    } catch (error) {
        console.error("Error querying collection:", error);
    }
}
async function retrievelist() {
    try {
    const db = mongoose.connection.getClient(); // Access the MongoClient instance
    const collectionName = 'data'; // Specify the collection name
    const collection = db.db().collection(collectionName);// Access the collection
    const uniqueTags = await collection.distinct('tag');
    const uniqueColleges = await collection.distinct('college');
    return uniqueTags,uniqueColleges;
    } catch (error) {
        console.error("Error querying collection:", error);
    }
}
export {retrieveUser,retrieveData,retrievelist};
