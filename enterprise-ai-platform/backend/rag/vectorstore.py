
from langchain_chroma import Chroma
from backend.models.embeddings import embeddings

vectorstore = Chroma(
    persist_directory="./chroma_db",
    embedding_function=embeddings
)