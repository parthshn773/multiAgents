
from presidio_analyzer import AnalyzerEngine

analyzer = AnalyzerEngine()


def detect_pii(text: str):
    results = analyzer.analyze(
        text=text,
        language='en'
    )

    return results