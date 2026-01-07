import { useEffect } from 'react';
import { useGame } from './hooks/useGame';
import { Autocomplete } from './components/Autocomplete';

function App() {
  const { 
    clues, 
    guessCount, 
    status, 
    correctAnswer, 
    initGame, 
    makeGuess, 
    MAX_GUESSES 
  } = useGame();

  useEffect(() => {
    initGame();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Guess the top 200 FIFA player</h1>

      {clues ? (
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mb-6 border-t-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Player info</h2>
          <div className="space-y-2">
            <p><strong>Nation:</strong> {clues.Nation}</p>
            <p><strong>Club:</strong> {clues.Team}</p>
            <p><strong>Position:</strong> {clues.Position}</p>
          </div>
          <div className="mt-4 text-sm text-gray-500 font-medium">
            Guesses: <span className={guessCount >= MAX_GUESSES - 1 ? "text-red-500" : ""}>
              {guessCount} / {MAX_GUESSES}
            </span>
          </div>
        </div>
      ) : (
        <p>Loading clues...</p>
      )}

      {status === "ongoing" && (
        <Autocomplete onGuess={makeGuess} />
      )}

      {status !== "ongoing" && (
        <div className={`mt-6 p-6 rounded-lg text-center w-full max-w-md ${
          status === "won" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          <h2 className="text-2xl font-bold mb-2">
            {status === "won" ? "Correct!" : "Game Over"}
          </h2>
          <p className="text-lg">The player was: <strong>{correctAnswer || "debugging showing answer after max guesses"}</strong></p>
          
          <button 
            onClick={initGame}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;