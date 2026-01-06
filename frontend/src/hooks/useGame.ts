import { useState } from "react";
import { startGame, submitGuess } from "../services/app";

type GameStatus = "ongoing" | "won" | "lost";

export function useGame() {
    const [gameId, setGameId] = useState<string | null>(null);
    const [clues, setClues] = useState<any>(null);
    const [guessCount, setGuessCount] = useState<number>(0);
    const [status, setStatus] = useState<GameStatus>("ongoing");
    const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

    const MAX_GUESSES = 4;
    
    const initGame = async () => {
        const data = await startGame();
        setGameId(data.game_id);
        setClues(data.clues);
        setGuessCount(0);
        setStatus("ongoing");
        setCorrectAnswer(null);
    };

    const makeGuess = async (guess: string) => {
        if (!gameId || status !== "ongoing") {
            return;
        }

        const result = await submitGuess(gameId, guess, guessCount);
        if (result.correct) {
            setStatus("won");
            setCorrectAnswer(result.answer);
        } else {
            const nextCount = guessCount + 1;
            setGuessCount(nextCount);
            
            if (nextCount >= MAX_GUESSES) {
                setCorrectAnswer(result.answer);
                setStatus("lost");
            }
        }
    };

    return { 
        gameId, 
        clues, 
        guessCount, 
        status, 
        correctAnswer, 
        initGame, 
        makeGuess,
        MAX_GUESSES 
    };

}