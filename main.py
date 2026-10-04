from chat import get_response
from persona import PERSONA


def main():
    messages = [
        {
            "role": "system",
            "content": PERSONA
        }
    ]

    print("Mai is online.")
    print("Type 'bye' to exit.\n")

    while True:
        user_input = input("You: ")

        if user_input.lower() == "bye":
            print("Mai: Byee ❤️")
            break

        if not user_input.strip():
            continue

        messages.append({
            "role": "user",
            "content": user_input
        })

        try:
            reply = (get_response(messages) or "").strip() or "hmm ok, anyway. say something else"

            print(f"Mai: {reply}\n")

            messages.append({
                "role": "assistant",
                "content": reply
            })

        except Exception as e:
            print(f"\nError: {e}\n")


if __name__ == "__main__":
    main()