// 1. Deposit some money.
// 2. Determine the number of lines to bet on.
// 3. Collect a bet Amount.
// 4. Spin the Slot Machine.
// 5. Check if User Won/lose.
// 6. Give the user their Winning.
// 7. Play Again.




function spin() {
  const reels = document.querySelectorAll('.reel');

  reels.forEach((reel) => {
      const randomRotation = Math.floor(Math.random() * 360);
      reel.style.transition = 'transform 3s ease-out';
      reel.style.transform = `rotateX(${randomRotation}deg)`;
  });

  setTimeout(() => {
      reels.forEach((reel) => {
          reel.style.transition = 'none';
          reel.style.transform = 'rotateX(0deg)';
      });
  }, 3000);
}



// 1. Deposit Some Money

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  "A": 2,
  "B": 4,
  "C": 6,
  "D": 8
};

const SYMBOLS_VALUES = {
  "A": 5,
  "B": 4,
  "C": 3,
  "D": 2
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a Deposit Amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) { 
        console.log("Invalid Deposit Amount, pls Try Again.");
    } else {
       return numberDepositAmount;
    }
  }
};

// 2.Determine number of lines to Bet.

const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter a number of lines to bet on (1-3): ");
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) { 
        console.log("Invalid Number of Lines, pls Try Again.");
    } else {
       return numberOfLines;
    }
  }

}

// 3. collect a Bet Amount.

const getBet = (balance, lines) => {
   while (true) {
    const bet = prompt("Enter a Bet per Line: ");
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
        console.log("Invalid Bet, pls Try Again.");
    } else {
       return numberBet;
    }
  }

};

// 4. Spin the Slot Machine.

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT )) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  
   const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = []

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);

    }
  }

  return rows
}

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol
      if (i != row.length - 1) {
        rowString += " | "
      }
    }
    console.log(rowString);

    
  }
}

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOLS_VALUES[symbols[0]];
    }
  }

  return winnings
}
const game = () => {
   let balance = deposit();

   while (true) {
    console.log("You Have a balance of $" + balance)
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines)
    balance += winnings
    console.log("You Won, $" + winnings.toString());

    if (balance <= 0) {
      console.log("You run Out of money");
      break;
    }

    const playAgain = prompt("Do You Want paly Again (Yes/No)?");

    if (playAgain != "Yes") break;

   };
  }; 

game();


