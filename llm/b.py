import requests
import PyPDF2
import json

# Define the API endpoint
API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAarxwx2-hGxae8qKlvoJLmW0ggWrwqHqo"

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page_num in range(len(reader.pages)):
            text += reader.pages[page_num].extract_text()
    return text

# Define the path to the PDF file
pdf_path = "example.pdf"  # Replace with the path to your PDF file

# Extract text from the PDF
pdf_text = extract_text_from_pdf(pdf_path)

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

# Make the POST request
response = requests.post(API_ENDPOINT, json=payload, headers=headers)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response
    response_data = json.loads(response.content)

    # Extract the summarized paragraph from the response
    if "candidates" in response_data and response_data["candidates"]:
        summarized_text = response_data["candidates"][0]["content"]["parts"][0]["text"]
        print(summarized_text)
    else:
        print("No summarized paragraph found in the response.")
else:
    print("Error:", response.text)
