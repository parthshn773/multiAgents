from backend.rag.vectorstore import vectorstore
from backend.rag.reranker import rerank


def retrieve_context(query: str):

    docs = vectorstore.similarity_search(
        query,
        k=10
    )

    reranked = rerank(query, docs)

    context = "\n".join([
        d.page_content for d in reranked
    ])

    return context