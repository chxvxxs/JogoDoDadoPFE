"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const DiceGame = () => {
  const [round, setRound] = useState(1);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player1Roll, setPlayer1Roll] = useState(null);
  const [player2Roll, setPlayer2Roll] = useState(null);
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const rollDice = () => Math.floor(Math.random() * 6) + 1;

  const handleRoll = () => {
    if (turn === 1) {
      const roll = rollDice();
      setPlayer1Roll(roll);
      setPlayer2Roll(null); // Reseta o valor do dado do jogador 2
      setTurn(2);
    } else {
      const p2Roll = rollDice();
      setPlayer2Roll(p2Roll);
      setTimeout(() => determineRoundWinner(player1Roll, p2Roll), 100);
    }
  };

  const determineRoundWinner = (p1Roll, p2Roll) => {
    if (p1Roll > p2Roll) {
      setPlayer1Score((prev) => prev + 1);
    } else if (p2Roll > p1Roll) {
      setPlayer2Score((prev) => prev + 1);
    }

    const nextRound = round + 1;
    if ((nextRound > 5 && player1Score !== player2Score) || player1Score === 3 || player2Score === 3) {
      determineGameWinner();
    } else {
      setRound(nextRound);
      setTurn(1);
    }
  };

  const determineGameWinner = () => {
    let gameWinner = "";
    if (player1Score > player2Score) {
      gameWinner = "Jogador 1 venceu! 🎉";
    } else if (player2Score > player1Score) {
      gameWinner = "Jogador 2 venceu! 🎉";
    }
    setWinner(gameWinner);
    setIsGameOver(true);
  };

  const resetGame = () => {
    setRound(1);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setPlayer1Roll(null);
    setPlayer2Roll(null);
    setTurn(1);
    setWinner(null);
    setIsGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white p-6 font-sans">
      <h1 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400 animate-pulse">
        Jogo de Dados 🎲
      </h1>

      <div className="flex gap-8 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/10">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-pink-400">Jogador 1</h2>
          <div className="mt-4 p-8 border-2 border-pink-400/30 rounded-xl text-4xl font-bold bg-pink-400/10 animate-bounce">
            {player1Roll !== null ? player1Roll : "?"}
          </div>
          <Button
            onClick={handleRoll}
            disabled={turn !== 1}
            className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Rolar Dado
          </Button>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-yellow-400">Jogador 2</h2>
          <div className="mt-4 p-8 border-2 border-yellow-400/30 rounded-xl text-4xl font-bold bg-yellow-400/10 animate-bounce">
            {player2Roll !== null ? player2Roll : "?"}
          </div>
          <Button
            onClick={handleRoll}
            disabled={turn !== 2}
            className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Rolar Dado
          </Button>
        </div>
      </div>

      <h2 className="mt-8 text-3xl font-semibold text-gray-200">
        Placar: <span className="text-pink-400">{player1Score}</span> x{" "}
        <span className="text-yellow-400">{player2Score}</span>
      </h2>

      <Dialog open={isGameOver} onOpenChange={resetGame}>
        <DialogContent className="bg-white/10 text-black backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/10 text-center">
          <DialogTitle className="text-4xl font-bold text-black bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">
            {winner}
          </DialogTitle>
          <Button
            onClick={resetGame}
            className="mt-6 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Jogar Novamente
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiceGame;
