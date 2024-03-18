import requests
import PyPDF2

# Define your together.ai API endpoint
TOGETHER_AI_API_ENDPOINT = "https://api.together.ai/v1/"

# Define your API key
API_KEY = "4f858ecf49b3add5122e1a592b81a4dc38b14be79b6f3d706fa7ed9c43166986s"

# Function to summarize text using together.ai API
# Function to summarize text using together.ai API
# Function to summarize text using together.ai API
def summarize_text(text):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    # Limit text length to avoid potential issues
    text = text[:10]  # Adjust the length as needed
    data = {
        "text": text,
        "num_sentences": 3  # Adjust the number of sentences in the summary as per your requirement
    }
    print("Sending request to together.ai API...")
    response = requests.post(TOGETHER_AI_API_ENDPOINT + "summarize", json=data, headers=headers)
    try:
        response.raise_for_status()
        print("Received response from together.ai API.")
        summary = response.json().get("summary")
        if summary:
            return summary
        else:
            print("Failed to parse response. Summary not found.")
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error occurred: {e}")
    except requests.exceptions.RequestException as e:
        print(f"Request error occurred: {e}")
    return None


# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page_num in range(len(reader.pages)):
            text += reader.pages[page_num].extract_text()
    return text

def summarize_pdf(pdf_path):
    text = extract_text_from_pdf(pdf_path)
    if text:
        print("Text extracted from PDF:")
        print(text)
        summary = summarize_text(text)
        if summary:
            print("Summary:")
            print(summary)
        else:
            print("Failed to summarize PDF.")
    else:
        print("Failed to extract text from PDF.")

# Example usage
if __name__ == "__main__":
    pdf_path = "example.pdf"  # Replace with the path to your PDF file
    summarize_pdf(pdf_path)