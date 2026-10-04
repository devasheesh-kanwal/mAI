from chat import get_response
from persona import PERSONA


def main():
    messages = [
        {
            "role": "system",
            "content": PERSONA
        }
    ]

    print("Mia is online.")
    print("Type 'byeee' to exit.\n")

    try:
        opener = get_response(messages) or "hey, you there?"
        print(f"Mia: {opener}\n")
        messages.append({"role": "assistant", "content": opener})
    except Exception as e:
        print(f"\nError: {e}\n")

    while True:
        user_input = input("You: ")

        if user_input.lower() == "byeee":
            print("Mia: Byeee ❤️")
            break

        if not user_input.strip():
            continue

        messages.append({
            "role": "user",
            "content": user_input
        })

        try:
            reply = get_response(messages)

            print(f"Mia: {reply}\n")

            messages.append({
                "role": "assistant",
                "content": reply
            })

        except Exception as e:
            print(f"\nError: {e}\n")


if __name__ == "__main__":
    main()