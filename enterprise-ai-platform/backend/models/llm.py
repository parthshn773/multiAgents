
from langchain_ollama import ChatOllama

llm = ChatOllama(
    model="qwen2.5:14b",
    temperature=0
)