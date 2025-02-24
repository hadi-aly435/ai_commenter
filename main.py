from fastapi import FastAPI # type: ignore
import openai # type: ignore
from textblob import TextBlob # type: ignore

app = FastAPI()

# Set your OpenAI API key
openai.api_key = "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"

@app.post("/generate_comment/")
async def generate_comment(post_description: str, style: str = "casual"):
    # Perform sentiment analysis
    sentiment = TextBlob(post_description).sentiment.polarity

    # Define comment styles
    style_prompts = {
        "casual": "Make it friendly and engaging.",
        "professional": "Make it formal and insightful.",
        "funny": "Make it humorous and witty."
    }

    # Generate AI-based comment
    prompt = f"Post: {post_description}\nSentiment: {sentiment}\nStyle: {style_prompts.get(style, 'casual')}\nSuggested Comment:"
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": prompt}]
    )

    return {"comment": response["choices"][0]["message"]["content"]}

# Run the FastAPI server
# Run this command in terminal: uvicorn main:app --reload
