# This is my original CLI based game, not the web app backend code

import random
import pandas as pd

df = pd.read_csv('top_N_players_features.csv')

RNG = random.randint(0, 199)
player = df.iloc[RNG].to_dict()
answer = player["Name"]
lower_answer = player["lowercase_name"]

print("Nation: " + player["Nation"])
print("Club: " + player["Team"])
print("Position: " + player["Position"])

MAX_NUMBER_GUESSES = 4

for i in range (1, MAX_NUMBER_GUESSES + 1):
    guess = input("Enter guess for player: ")
    if guess.lower() in lower_answer and len(guess) >= 3:
        print("\033[92m(Correct): " + answer + "\033[0m")
        break
    else:
        if i < MAX_NUMBER_GUESSES:
            print(f"\033[91m(Try again) {str(i)}/{str(MAX_NUMBER_GUESSES)} guesses used\033[0m")
        else:
            # they got the final guess wrong
            print(f"\033[91m{answer}\033[0m")