
BLOCKED = [
    "ignore previous instructions",
    "system prompt",
    "delete database"
]


def validate_input(text: str):

    lower = text.lower()

    for item in BLOCKED:
        if item in lower:
            raise Exception("Prompt Injection Detected")

    return text