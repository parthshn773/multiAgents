memory_store = []


def save_memory(question, answer):
    memory_store.append({
        "question": question,
        "answer": answer
    })


def get_recent_memory():
    return memory_store[-5:]