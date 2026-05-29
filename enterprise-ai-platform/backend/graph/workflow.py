
# backend/graph/workflow.py

from langgraph.graph import (
    StateGraph,
    START,
    END
)

from backend.graph.state import AgentState
from backend.agents.planner import decide_route
from backend.agents.retrieval_agent import retrieve_context
from backend.models.llm import llm


# Create workflow
workflow = StateGraph(AgentState)


# ---------------------------
# Planner Node
# ---------------------------

def planner_node(state):

    route = decide_route(
        state["question"]
    )

    state["route"] = route

    return state


# ---------------------------
# RAG Node
# ---------------------------

def rag_node(state):

    context = retrieve_context(
        state["question"]
    )

    prompt = f"""
    Context:
    {context}

    Question:
    {state['question']}
    """

    result = llm.invoke(prompt)

    state["final_answer"] = result.content

    return state


# ---------------------------
# Direct LLM Node
# ---------------------------

def direct_node(state):

    result = llm.invoke(
        state["question"]
    )

    state["final_answer"] = result.content

    return state


# ---------------------------
# Add Nodes
# ---------------------------

workflow.add_node(
    "planner",
    planner_node
)

workflow.add_node(
    "rag",
    rag_node
)

workflow.add_node(
    "direct",
    direct_node
)


# ---------------------------
# Graph Routing Logic
# ---------------------------

def route_decision(state):

    if state["route"] == "rag":
        return "rag"

    return "direct"


# ---------------------------
# Graph Edges
# ---------------------------

# Entry point
workflow.add_edge(
    START,
    "planner"
)

# Conditional routing
workflow.add_conditional_edges(
    "planner",
    route_decision
)

# End states
workflow.add_edge(
    "rag",
    END
)

workflow.add_edge(
    "direct",
    END
)


# ---------------------------
# Compile Graph
# ---------------------------

app = workflow.compile()

