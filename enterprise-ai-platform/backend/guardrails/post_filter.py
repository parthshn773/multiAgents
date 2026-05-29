def validate_output(output: str):

    banned = [
        "password",
        "secret_key"
    ]

    for item in banned:
        if item in output.lower():
            raise Exception("Sensitive Data Leak")

    return output