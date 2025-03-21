import google.generativeai as genai
from config import API_KEY

# Configure the API key
genai.configure(api_key=API_KEY)

# Load the Gemini model
model = genai.GenerativeModel("gemini-1.5-pro")

def correct_sign_language(sentence):
    """
    Translates a sign language sequence into a grammatically correct English sentence using the Gemini API.
    
    Args:
        sentence (str): The input sign language sequence.
    
    Returns:
        str: The corrected English sentence or an error message.
    """
    if not sentence or not isinstance(sentence, str):
        return "Error: Input sentence is empty or invalid."
    
    try:
        # Define the prompt for the Gemini model
        prompt = (
            "You are a language correction assistant specialized in translating Sign Language sequences into grammatically correct English sentences.\n"
            "Convert the following Sign Language sentence into correct English:\n"
            "Just give me correct sentence no explanation needed:\n"
            f"Sign Language: {sentence}\n"
            "English Sentence:"
        )
        
        # Generate the response using the Gemini model
        response = model.generate_content(prompt)
        
        # Return the generated text if successful
        if response and hasattr(response, "text"):
            return response.text.strip()
        else:
            return "Error: No response generated from the model."
    
    except Exception as e:
        # Log the exception for debugging
        print(f"Error in correct_sign_language: {str(e)}")
        return f"Error: Failed to generate sentence. Details: {str(e)}"