# backend/agents/human_agent.py


def requires_human(query: str):

    risky = [
        "financial approval",
        "terminate employee",
        "legal"
    ]

    for item in risky:
        if item in query.lower():
            return True

    return False