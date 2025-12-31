import random
import pandas as pd

df = pd.read_csv('top_N_players_features.csv')

RNG = random.randint(0, 99)
player = df.iloc[RNG].to_dict()
answer = player["Name"]
lower_answer = player["lowercase_name"]

print("Nation: " + player["Nation"])
print("Club: " + player["Team"])
print("Position: " + player["Position"])

while True:
    guess = input("Enter guess for player: ")
    if guess.lower() in lower_answer:
        print("\033[92m(Correct): " + answer + "\033[0m")
        break
    else:
        print("\033[91m(Try again)\033[0m")