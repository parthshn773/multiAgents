from typing import TypedDict, List, Optional

class AgentState(TypedDict):
    question: str
    route: str
    documents: List[str]
    retrieved_context: str
    tool_result: str
    final_answer: str
    needs_human: bool
    memory_context: str