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
    <div className="min-h-screen w-full bg-[#121212] flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md space-y-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center tracking-tight text-white">
          Guess the top 200 FIFA player
        </h1>
        {clues ? (
          <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-xl w-full border border-gray-800 text-white">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-800 pb-2">
              Player info
            </h2>
            <div className="space-y-3">
              <p className="flex justify-between">
                <span className="text-gray-400">Nation:</span> 
                <span>{clues.Nation}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Club:</span> 
                <span>{clues.Team}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Position:</span> 
                <span>{clues.Position}</span>
              </p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-800 text-sm text-gray-500 font-medium flex justify-between">
              <span>Guesses</span>
              <span className={status === "won" ? "text-green-500" : (guessCount >= MAX_GUESSES - 1 ? "text-red-500" : "text-blue-400")}>
                {guessCount} / {MAX_GUESSES}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 animate-pulse">Loading player data...</div>
        )}

        {status === "ongoing" && (
          <Autocomplete onGuess={makeGuess} />
        )}

        {status !== "ongoing" && (
          <div className={`mt-6 p-6 rounded-2xl text-center w-full max-w-md shadow-2xl transition-all transform animate-in fade-in zoom-in duration-300 ${
            status === "won" 
              ? "bg-green-100 text-green-900 border-2 border-green-500" 
              : "bg-red-100 text-red-900 border-2 border-red-500"
          }`}>
            <h2 className="text-2xl font-bold mb-2">
              {status === "won" ? "Correct!" : "Game Over"}
            </h2>
            
            <p className="text-lg">
              The player was: <span className="font-extrabold block text-xl mt-1">{correctAnswer}</span>
            </p>
            
            <button 
              onClick={initGame}
              className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;