// service layer
const BASE_URL = "http://localhost:8000";

export interface GameInitResponse {
    game_id: string;
    clues: {
        Nation: string;
        Team: string;
        Position: string;
    };
}

export const startGame = async (): Promise<GameInitResponse> => {
    const response = await fetch(`${BASE_URL}/start-game`, { method: 'POST' });
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

export const getPlayers = async (): Promise<string[]> => {
    const response = await fetch(`${BASE_URL}/players`);
    return response.json();
}