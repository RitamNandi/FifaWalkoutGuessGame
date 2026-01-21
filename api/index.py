from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import random
import uuid
from fastapi.middleware.cors import CORSMiddleware
from vercel.functions import RuntimeCache

class GuessRequest(BaseModel):
    game_id: str
    guess: str
    guess_count: int

df = pd.read_csv('top_N_players_features_id.csv')
MAX_NUMBER_GUESSES = 4

app = FastAPI()
cache = RuntimeCache()
# uvicorn index:app --reload
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ritamnandi.github.io", "http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/players")
def get_players():
    return df['Name'].tolist()

@app.post("/start-game")
def start_game():
    RNG = random.randint(0, 199)
    player = df.iloc[RNG].to_dict()
    answer = player["Name"]

    game_id = str(uuid.uuid4()) # ID for this specific game session
    cache.set(game_id, answer, {"ttl": 3600})

    return {
        "game_id": game_id,
        "clues": {
            "Nation": player["Nation"],
            "Team": player["Team"],
            "Position": player["Position"]
        },
        "player_id" : player["player_id"]
    }

@app.post("/guess")
def guess(request: GuessRequest):
    game_id = request.game_id
    guess = request.guess
    guess_count = request.guess_count
    answer = cache.get(game_id)

    if answer is None:
        raise HTTPException(status_code=404, detail="Game session not found")
    
    if guess.lower() in answer.lower() and len(guess) >= 3:
        return {"correct": True, "answer": answer}
    
    if guess_count >= MAX_NUMBER_GUESSES - 1:
        return {"correct": False, "answer": answer}

    return {"correct": False}
