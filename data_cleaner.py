# source venv/bin/activate
import pandas as pd
import unicodedata

def normalize_names(name):
    # Need to do this because of names like Hakan Çalhanoğlu
    normalized_name = unicodedata.normalize('NFKD', name).encode('ASCII', 'ignore').decode('ASCII')
    return normalized_name.lower()

number_of_players = 100 # Constant for number of players in the game

features = ['Name', 'Nation', 'Team', 'Position']
df = pd.read_csv('fc_26_players_stats.csv', nrows = number_of_players, usecols=features)
df['lowercase_name'] = df['Name'].apply(normalize_names)
df.to_csv("top_N_players_features.csv", index=True)