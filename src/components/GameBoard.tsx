import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { Trophy, RotateCcw } from 'lucide-react';
import Confetti from 'react-confetti';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const CARD_COUNT_OPTIONS = [6, 8, 10, 12, 16, 20, 26];

interface Card {
  id: number;
  letter: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function GameBoard() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [pairCount, setPairCount] = useState(8);
  const [gameStarted, setGameStarted] = useState(false);

  const initializeGame = () => {
    const selectedLetters = [...LETTERS]
      .sort(() => Math.random() - 0.5)
      .slice(0, pairCount);

    const shuffledCards = [...selectedLetters, ...selectedLetters]
      .sort(() => Math.random() - 0.5)
      .map((letter, index) => ({
        id: index,
        letter,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameComplete(false);
    setGameStarted(false);
  };

  useEffect(() => {
    initializeGame();
  }, [pairCount]);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleCardClick = (cardId: number) => {
    if (
      flippedCards.length === 2 ||
      cards[cardId].isFlipped ||
      cards[cardId].isMatched
    ) {
      return;
    }

    if (!gameStarted) {
      setGameStarted(true);
    }

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [firstCard, secondCard] = newFlippedCards;

      if (cards[firstCard].letter === cards[secondCard].letter) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstCard].isMatched = true;
          matchedCards[secondCard].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setShowConfetti(true);
          setMatches(prev => {
            const newMatches = prev + 1;
            if (newMatches === pairCount) {
              setGameComplete(true);
            }
            return newMatches;
          });
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstCard].isFlipped = false;
          resetCards[secondCard].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const getGridClass = () => {
    const totalCards = pairCount * 2;
    if (totalCards <= 12) return 'grid-cols-4';
    if (totalCards <= 20) return 'grid-cols-5';
    return 'grid-cols-6';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-pink-100 to-blue-100 p-8">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          colors={['#FF6B6B', '#4ECDC4', '#FFD93D', '#95E1D3', '#FF8B94']}
        />
      )}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-pink-600" style={{ fontFamily: 'Bangers' }}>
              Alphabet Memory
            </h1>
            <p className="text-lg text-blue-600 font-medium">
              Find all {pairCount} letter pairs to win! 🌟
            </p>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-8 items-center justify-center sm:justify-end">
            <div className="flex items-center gap-3">
              <label htmlFor="pairCount" className="text-lg text-blue-600 font-medium">
                Pairs:
              </label>
              <select
                id="pairCount"
                value={pairCount}
                onChange={(e) => setPairCount(Number(e.target.value))}
                disabled={gameStarted}
                className={`bg-white border-2 border-pink-400 rounded-lg px-3 py-1 text-pink-600 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                  gameStarted ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {CARD_COUNT_OPTIONS.map(count => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-center bg-white p-3 rounded-lg border-2 border-blue-400">
              <p className="text-lg text-blue-600 font-medium">Moves 🎮</p>
              <p className="text-2xl font-bold text-pink-600">{moves}</p>
            </div>
            <div className="text-center bg-white p-3 rounded-lg border-2 border-pink-400">
              <p className="text-lg text-pink-600 font-medium">Matches ⭐</p>
              <p className="text-2xl font-bold text-blue-600">{matches}</p>
            </div>
            <button
              onClick={initializeGame}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg hover:from-pink-600 hover:to-blue-600 transition-all transform hover:scale-105 font-medium text-lg shadow-lg"
            >
              <RotateCcw size={24} />
              Play Again!
            </button>
          </div>
        </div>

        {gameComplete ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-xl border-4 border-yellow-400">
            <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-pink-600 mb-4" style={{ fontFamily: 'Bangers' }}>
              Woohoo! You Did It! 🎉
            </h2>
            <p className="text-2xl text-blue-600 mb-6">
              Amazing job! You found all pairs in {moves} moves!
            </p>
            <button
              onClick={initializeGame}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg hover:from-pink-600 hover:to-blue-600 transition-all transform hover:scale-105 font-medium text-xl shadow-lg"
            >
              Play Again! 🎮
            </button>
          </div>
        ) : (
          <div className={`${getGridClass()} gap-4 grid justify-items-center bg-white p-8 rounded-2xl shadow-xl border-4 border-blue-400 w-full`}>
            {cards.map(card => (
              <Card
                key={card.id}
                letter={card.letter}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={() => handleCardClick(card.id)}
              />
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
}