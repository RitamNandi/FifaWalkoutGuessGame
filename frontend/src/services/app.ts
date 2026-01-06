// service layer
const BASE_URL = "http://localhost:8000";

export const startGame = async () => {
    const response = await fetch(`${BASE_URL}/start-game`, {
        method: 'POST'
    });
    return response.json();
}

export const submitGuess = async (gameId: string, guess: string) => {
    const response = await fetch(`${BASE_URL}/guess`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({game_id: gameId, guess: guess}),
    });
    return response.json();
}