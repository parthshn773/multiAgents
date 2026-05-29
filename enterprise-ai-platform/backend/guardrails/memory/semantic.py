from backend.rag.vectorstore import vectorstore


def save_semantic_memory(text):
    vectorstore.add_texts([text])