import pymongo
import time
import PyPDF2
import requests
import json
import tempfile
import os

# MongoDB connection settings
MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "edu-hub"
DATAS_COLLECTION_NAME = "datas"
LLM_COLLECTION_NAME = "llm"

# API endpoint for the summarization service
SUMMARIZATION_API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAarxwx2-hGxae8qKlvoJLmW0ggWrwqHqo"

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page_num in range(len(reader.pages)):
            text += reader.pages[page_num].extract_text()
    return text

# Function to download PDF from URL
def download_pdf_from_url(url):
    response = requests.get(url)
    if response.status_code == 200:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(response.content)
            return temp_file.name
    else:
        return None

# Function to upload document to summarization service
def upload_document_to_summarization(pdf_text):
    # Define the request payload
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": pdf_text
                    }
                ]
            }
        ]
    }

    # Define request headers
    headers = {
        "Content-Type": "application/json"
    }

    # Make the POST request to the summarization service
    response = requests.post(SUMMARIZATION_API_ENDPOINT, json=payload, headers=headers)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the JSON response
        response_data = json.loads(response.content)

        # Extract the summarized paragraph from the response
        if "candidates" in response_data and response_data["candidates"]:
            summarized_text = response_data["candidates"][0]["content"]["parts"][0]["text"]
            return summarized_text
        else:
            return "No summarized paragraph found in the response."
    else:
        return "Error:", response.text

# Connect to MongoDB
client = pymongo.MongoClient(MONGO_URI)
db = client[DB_NAME]
datas_collection = db[DATAS_COLLECTION_NAME]
llm_collection = db[LLM_COLLECTION_NAME]

# Function to handle document insertion in datas collection
def handle_insertion(document):
    document_link = document.get("document_link")
    if document_link:
        # Download PDF from URL
        pdf_path = download_pdf_from_url(document_link)
        if pdf_path:
            # Extract text from downloaded PDF
            pdf_text = extract_text_from_pdf(pdf_path)

            # Upload document to summarization service
            summarized_text = upload_document_to_summarization(pdf_text)

            # Save the summarized text into the llm collection along with _id from datas collection
            llm_collection.insert_one({"_id": document["_id"], "document_link": document_link, "summarized_text": summarized_text})
            
            # Clean up temporary PDF file
            os.remove(pdf_path)
        else:
            print(f"Failed to download PDF from URL: {document_link}")

# Polling loop
while True:
    # Query for new documents
    new_documents = datas_collection.find({"document_link": {"$exists": True}})

    # Process new documents
    for document in new_documents:
        handle_insertion(document)

    # Wait for a specified interval before polling again (e.g., every 5 seconds)
    time.sleep(5)
