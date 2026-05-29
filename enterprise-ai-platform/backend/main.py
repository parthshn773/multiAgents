from fastapi import FastAPI
from pydantic import BaseModel

from backend.graph.workflow import app as graph_app

app = FastAPI()


class ChatRequest(BaseModel):
    question: str


@app.post("/chat")
def chat(req: ChatRequest):

    result = graph_app.invoke({
        "question": req.question
    })

    return result