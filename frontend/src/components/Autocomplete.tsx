import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { getPlayers } from '../services/app';

interface AutocompleteProps {
    onGuess: (name: string) => void;
    disabled?: boolean;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({ onGuess, disabled }) => {
    const [query, setQuery] = useState("");
    const [allPlayers, setAllPlayers] = useState<string[]>([]);
    const [results, setResults] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    const fuseRef = useRef<Fuse<string> | null>(null); // ref so it doesn't re-render

    useEffect(() => {
        getPlayers().then(data => {
            setAllPlayers(data);
            fuseRef.current = new Fuse(allPlayers, {
                threshold: 0.4, // match sens
            });
        });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);

        if (fuseRef.current && val.length > 1) {
            const searchResults = fuseRef.current.search(val);
            setResults(searchResults.map(r => r.item).slice(0, 5)); // limit to top 5 results
            setShowSuggestions(true);
        } else {
            setResults([]);
        }
    };

    const selectPlayer = (name: string) => {
        setQuery("");
        setResults([]);
        setShowSuggestions(false);
        onGuess(name);
    };

    return (
        <div className="relative w-full max-w-md">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                disabled={disabled}
                placeholder="Enter player name..."
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
            />

            {showSuggestions && results.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                    {results.map((name) => (
                        <li
                            key={name}
                            onClick={() => selectPlayer(name)}
                            className="p-3 cursor-pointer hover:bg-blue-50 border-b last:border-none"
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};