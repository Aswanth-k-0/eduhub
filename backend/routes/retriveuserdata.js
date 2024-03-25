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
    // console.log("val=",tagValue)
    const filter = {
        $or: tagValue.map(value => ({ tag: new RegExp(value.trimStart(), 'i') }))
    };
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
    // const uniqueColleges = await collection.distinct('college');
    return uniqueTags;
    } catch (error) {
        console.error("Error querying collection:", error);
    }
}
async function retrieveLatest() {
    try {
    const db = mongoose.connection.getClient(); // Access the MongoClient instance
    const collectionName = 'data'; // Specify the collection name
    const collection = db.db().collection(collectionName);// Access the collection
    const pipeline = [
        { $sort: { dateField: -1 } }, // Sort by dateField in descending order (-1)
        { $limit: 10 } // Limit the result to the latest 5 documents
    ];

    // Execute the aggregation pipeline
    const latestValues = await collection.aggregate(pipeline).toArray();
    return latestValues
    } catch (error) {
        console.error("Error querying collection:", error);
    }
}

async function retrieveScholarship(){
    try {
        const db = mongoose.connection.getClient(); // Access the MongoClient instance
        const collectionName = 'scholarship'; // Specify the collection name
        const collection = db.db().collection(collectionName);// Access the collection
        const pipeline = [
            { $sort: { dateField: -1 } }, // Sort by dateField in descending order (-1)
            { $limit: 30 }
        ];
    
        // Execute the aggregation pipeline
        const latestValues = await collection.aggregate(pipeline).toArray();
        return latestValues
        } catch (error) {
            console.error("Error querying collection:", error);
        }
}
export {retrieveUser,retrieveData,retrievelist,retrieveLatest,retrieveScholarship};
