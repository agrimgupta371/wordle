import './App.css';
import Board from './components/Board';
import KeyBoard from './components/KeyBoard';
import { createContext, useEffect, useState } from 'react';
import { boardDefault, generateWordSet } from './Words';
import GameOver from './components/GameOver';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});
  const [correctWord, setCorrectWord] = useState("");

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord.toUpperCase());
    });
  }, []);

  const onSelectLetter = (keyVal) => {
    if(currAttempt.letterPos > 4) return;
      const newBoard = [...board];
      newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
      setBoard(newBoard);
      setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})
  }

  const onEnter = () => {
    if(currAttempt.letterPos !== 5) return;

    const currWord = board[currAttempt.attempt].join("");
    
    if(wordSet.has(currWord.toLowerCase())){
      setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0});
    }
    else{
      alert("Word Not Found");
    }

    if(currWord === correctWord){
      setGameOver({gameOver: true, guessedWord: true});
      return;
    }

    if(currAttempt.attempt === 5){
      setGameOver({gameOver: true, guessedWord: false});
    }

  }

  const onDelete = () => {
    if(currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos-1] = "";
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1})
  }

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{ 
        board, 
        setBoard, 
        currAttempt, 
        setCurrAttempt, 
        onSelectLetter, 
        onDelete, 
        onEnter, 
        correctWord, 
        disabledLetters, 
        setDisabledLetters,
        gameOver,
        setGameOver
      }}>
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <KeyBoard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
