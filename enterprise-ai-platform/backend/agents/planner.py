from backend.models.llm import llm

ROUTE_PROMPT = """
You are a router.

Decide:

- rag
- tool
- direct
- human

Question: {question}

Return only one word.
"""


def decide_route(question: str):

    result = llm.invoke(
        ROUTE_PROMPT.format(
            question=question
        )
    )

    return result.content.strip()