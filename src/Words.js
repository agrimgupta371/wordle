import wordBank from './wordle-bank.txt'
export const boardDefault = [
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""]
];

export const generateWordSet = async () => {
    let wordSet;
    let todaysWord;
    await fetch(wordBank)
        .then((response) => response.text())
        .then((result) => {
            const wordArray = result.split("\n");
            const randomIndex = Math.floor(Math.random() * wordArray.length);
            todaysWord = wordArray[randomIndex];
            wordSet = new Set(wordArray);
    });
    return {wordSet, todaysWord};
};