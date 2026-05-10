from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import ollama
import os


load_dotenv()

app = FastAPI()

APP_NAME = os.getenv("APP_NAME", "BPM Expert Assistant")


class chatRequest(BaseModel):
    message:str


class chatResponse(BaseModel):
    reply: str
    app:str


@app.get("/health")
async def health():
    return {"status":"ok"}


@app.post("/chat")
async def chat(req: chatRequest):
    if not req.message.strip():
       raise HTTPException(404,"Please enter something")
    
    response= ollama.chat(model= "llama3.2",
                          messages= [
                              {"role": "System", "content": f"You are admin assistant for {APP_NAME} specialising in BPM automation"},
                              {"role": "User", "content":req.message}
                          ]  )
    
    return chatResponse(
        reply=response["message"]["content"],
        app= APP_NAME
    )



