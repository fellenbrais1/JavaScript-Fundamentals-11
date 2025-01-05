'use strict';

console.log(`Project code.`);

/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// START OF CODE

/////////////////////////////////////////////////
// DATA

const account1 = {
  id: 'account1',
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  baseCurrency: '€',
};

const account2 = {
  id: 'account2',
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  baseCurrency: '$',
};

const account3 = {
  id: 'account3',
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  baseCurrency: '£',
};

// Test of no negative values at all
const account4 = {
  id: 'account4',
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  baseCurrency: '$',
};

const account5 = {
  id: 'account5',
  owner: 'Michael McCann',
  movements: [800, 1650, -710, 990, -10],
  interestRate: 2.5,
  pin: 5555,
  baseCurrency: '£',
};

// Test of no positive values at all
const account6 = {
  id: 'account6',
  owner: 'James Raynor',
  movements: [-8, -160, -10, -300, -15],
  interestRate: 1.5,
  pin: 6666,
  baseCurrency: '£',
};

// Test of 0 balance
const account7 = {
  id: 'account7',
  owner: 'Sarah Kerrigan',
  movements: [-800, 800],
  interestRate: 1.5,
  pin: 7777,
  baseCurrency: '$',
};

// Test of decimal amounts in movements
const account8 = {
  id: 'account8',
  owner: 'Arcturus Mengsk',
  movements: [-100.5, 80030.75, 2450.99, 881.18, -1043.68],
  interestRate: 1.5,
  pin: 8888,
  baseCurrency: '$',
};

// Test of completely empty movements array
const account9 = {
  id: 'account9',
  owner: 'Samir Duran',
  movements: [],
  interestRate: 1.5,
  pin: 9999,
  baseCurrency: '$',
};

let accounts = [
  account1,
  account2,
  account3,
  account4,
  account5,
  account6,
  account7,
  account8,
  account9,
];

/////////////////////////////////////////////////
// ELEMENTS

const labelWelcome = document.querySelector('.welcome');
const labelBalance = document.querySelector('.balance');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// BASE VARIABLES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// Used to dictate error messages based on being logged in or not
let loggedIn = false;
let activeAccount = null;

// Used with the timers to enable resets
let intervalId;

/////////////////////////////////////////////////
// FUNCTIONS IN ROUGH ORDER OF CALL

// Programatically generates usernames for each account based on the first letters of each name in their owner property
// Called automatically()
function createUsernames(accounts) {
  accounts.forEach(
    account =>
      (account.username = account.owner
        .toLowerCase()
        .split(' ')
        .map(current => current.slice(0, 1))
        .join(''))
  );
}

// Gathers the values inside the input fields for login and then calls the logInCheck() function
// Run when login button is clicked via event handler
function clickLogIn() {
  // To reset any timers
  timerCountdown('reset');

  const usernameInput = inputLoginUsername.value;
  let pinInput = Number(inputLoginPin.value);
  if (usernameInput === '' || pinInput === 0) {
    logOut('incomplete');
    return;
  }
  logInCheck(usernameInput, pinInput);
}

// Checks to see if the typed in username corresponds to an account, then runs the pinCheck() function to see if the PIN number mathces, before granting access
// Called by clickLogIn()
function logInCheck(user, pin) {
  let lowercaseUser = user.toLowerCase();

  const matchAccount = accounts.find(
    account => account.username === lowercaseUser
  );
  console.log(matchAccount);
  if (matchAccount !== undefined) {
    const checkResult = pinCheck(matchAccount, pin);
    if (checkResult === false) {
      logOut('invalidPIN');
      return;
    }
    logInController(matchAccount);
    return;
  } else {
    logOut('nomatch');
    return;
  }
}

// Ccheck that the PIN number is correct on a user log-in attempt
// Called by logInCheck()
function pinCheck(account, pin) {
  if (pin === account.pin) {
    return true;
  } else {
    return false;
  }
}

// Manages calling of page set-up functions after login
// Called by logInCheck()
function logInController(account) {
  alert(`Welcome ${account.owner}!`);
  containerApp.style.opacity = 1;
  // Set the loggedIn flag to true
  loggedIn = true;
  // Retrieve the object for the currently active account and assign it
  activeAccount = setActiveAccount(account);
  // Populate page fields with relevant data
  populateWelcome(account.owner);
  populateMovements(account.movements, account.baseCurrency);
  populateBalance(account.movements, account.baseCurrency);
  populateTotals(account.movements, account.interestRate, account.baseCurrency);
  timerCountdown();

  // Clear details from the login fields
  clearInputFields();
}

// Retreives the object for the currently active account and assigns it to a variable to be used in other functions
// Called by logInController()
function setActiveAccount(account) {
  const setAccount = account;
  return setAccount;
}

// Updates contents of the pages welcome field
// Called by logInController()
function populateWelcome(owner) {
  labelWelcome.textContent = `Welcome, ${owner}!`;
}

// Creates an HTML element to be populate the table of deposits and withdrawals on the page
// Called by logInController()
function populateMovements(movements, baseCurrency) {
  // This expression clears all HTML out of the element to make it empty
  containerMovements.innerHTML = '';

  // Iterate through the movements and add their amount and index number to some HTML in a string literal along with types and times etc.
  movements.forEach(function (amount, index) {
    const type = amount > 0 ? 'deposit' : 'withdrawal';
    const time = generateTimestamp();

    const currencyString = formatCurrencyString(amount, baseCurrency);
    // Create the HTML that we need in a string literal
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__date">${time}</div>
    <div class="movements__value">${currencyString}</div>
    </div>`;

    // Add the above HTML to the element
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

// Populates the balance fields of the page
// Called by logInController()
function populateBalance(movements, baseCurrency) {
  let balanceTotal;
  if (movements.length === 0) {
    balanceTotal = 0.0;
  } else {
    balanceTotal = movements.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });
  }

  const time = generateTimestamp();
  const currencyString = formatCurrencyString(balanceTotal, baseCurrency);

  const balanceHTML = `<div>
      <p class="balance__label">Current balance</p>
      <p class="balance__date">
        As of <span class="date">${time}</span>
      </p>
      </div>
        <p class="balance__value">${currencyString}</p>
      </div>`;

  labelBalance.innerHTML = balanceHTML;
}

// Formats the currency strings when amounts need to be displayed, based on the baseCurrency of the account
// Called by populateMovements(), populateBalance(), populateTotals(), accountTransfer(), requestLoan()
function formatCurrencyString(amount, baseCurrency, additional = null) {
  // Math.abs() returns an unsigned integer we can use if we need to
  let unsignedAmount = Math.abs(amount);
  let currencyString;

  switch (baseCurrency) {
    case '$':
      if (amount < 0) {
        if (additional === 'nosign') {
          currencyString = `$${unsignedAmount.toFixed(2)}`;
        } else {
          currencyString = `-$${unsignedAmount.toFixed(2)}`;
        }
      } else {
        currencyString = `$${unsignedAmount.toFixed(2)}`;
      }
      break;
    case '£':
      if (amount < 0) {
        if (additional === 'nosign') {
          currencyString = `$${unsignedAmount.toFixed(2)}`;
        } else {
          currencyString = `-£${unsignedAmount.toFixed(2)}`;
        }
      } else {
        currencyString = `£${unsignedAmount.toFixed(2)}`;
      }
      break;
    case '€':
      if (additional === 'nosign') {
        currencyString = `${unsignedAmount.toFixed(2)}€`;
      } else {
        currencyString = `${unsignedAmount.toFixed(2)}€`;
      }
      break;
    default:
      break;
  }
  return currencyString;
}

// Calculates totals and updates the HTML of fields at the bottom of the page
// Called by logInController()
function populateTotals(movements, interest, baseCurrency) {
  // Calculate the total amount incoming
  const depositsArr = movements.filter(move => move > 0);
  let inTotal = depositsArr;

  // Error handling in the case of no positive movements in the array
  if (depositsArr.length === 0) {
    inTotal = 0.0;
  } else {
    inTotal = inTotal.reduce((acc, value) => acc + value).toFixed(2);
  }

  // Calculate the total amount outgoing
  let outTotal = movements.filter(move => move < 0);

  // Error handling in the case of no negative movements in the array
  if (outTotal.length === 0) {
    outTotal = 0.0;
  } else {
    outTotal = outTotal.reduce((acc, value) => acc + value).toFixed(2);
  }

  let interestTotal = calculateInterest(depositsArr, interest);

  // Update the HTML content with these totals
  labelSumIn.textContent = formatCurrencyString(inTotal, baseCurrency);
  labelSumOut.textContent = formatCurrencyString(
    outTotal,
    baseCurrency,
    'nosign'
  );
  labelSumInterest.textContent = formatCurrencyString(
    interestTotal,
    baseCurrency
  );
}

// Calculates and interest total summed from all deposits that accrue over over 1.00 in calculated interest
// Called by populateTotals()
function calculateInterest(deposits, interestRate) {
  let interestAmounts = deposits
    .map(deposit => {
      const interest = deposit * (interestRate / 100);
      return interest;
    })
    .filter(amount => amount > 1);

  if (interestAmounts.length === 0) {
    interestAmounts = 0.0;
  } else {
    interestAmounts = interestAmounts
      .reduce((acc, amount) => acc + amount)
      .toFixed(2);
  }

  return interestAmounts;
}

// Generates a current timestamp when invoked
// Called by populateBalance()
function generateTimestamp() {
  const time = Date.now();

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'UTC',
  };

  const formattedTimeString = new Intl.DateTimeFormat('en-UK', options).format(
    time
  );

  return formattedTimeString;
}

// Resets the welcome message in case something goes wrong
// Called by logInCheck(), clickLogIn()
function resetWelcome() {
  setTimeout(() => {
    labelWelcome.textContent = 'Log in to get started';
  }, 1000);
}

// Creates a 5 minute timed session for the user on login, will log the user out when the timer expires
// Called by clickLogIn(), logInController(), logOut()
function timerCountdown(clear = false) {
  // Clears any existing timer if the function is called with a 'reset' command as an argument
  if (clear) {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    return;
  }

  // If a timer is already running and has not been cancelled, do nothing in case this function gets called again - for safety only
  if (intervalId) {
    return;
  }

  let timerInSeconds = 300;

  intervalId = setInterval(() => {
    timerInSeconds--;
    labelTimer.textContent = countdownFormatter(timerInSeconds);

    // Trigger a logout event in the case of timer expiry
    if (timerInSeconds === 0) {
      clearInterval(intervalId);
      logOut('expired');
    }
  }, 1000);
}

// Formats the timerInSeconds value into a minutes and seconds timer
// Called by timerCountdown()
function countdownFormatter(timerInSeconds) {
  const minutes = Math.floor(timerInSeconds / 60);
  const remainingSeconds = timerInSeconds % 60;

  // This formatting is needed to prevent the timer display from displaying two digits for the minutes value
  const formattedMinutes = minutes === 0 ? '0' : minutes.toString();

  return `${formattedMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Clears all input fields on the page
// Called by logInController(), accountTransfer(), requestLoan(), logOut()
function clearInputFields() {
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  inputLoanAmount.value = '';
  inputCloseUsername.value = '';
  inputClosePin.value = '';
}

// Calls the accountTransfer function with the activeAccount as an argument
// Called by eventHandler on the 'Transfer money' button
function accountTransferInit() {
  accountTransfer(activeAccount);
}

// TODO
// ALLOW TRANSFERS THAT CAN PUSH A BALANCE INTO NEGATIVE?
// MAKE CHANGES PERSISTENT BETWEEN SESSIONS

// Allows transfer of funds between accounts when supplying valid usernames and amounts, causes balance, movements, and totals to be recaluclated. Cannoy transfer more than you have
// Called by accountTransferInit()
function accountTransfer(activeAccount) {
  // Captures the values from the form's fields
  const address = inputTransferTo.value;
  const amount = Number(inputTransferAmount.value);

  if (address === activeAccount.username) {
    alert(`Please specify a different account from your own to transfer to.`);
    clearInputFields();
    return;
  }

  // Calculates the activeAccount's current balance to avoid illegal transfers
  const activeAccountBalance = calculateActiveBalance(activeAccount);

  const currencyStringAmount = formatCurrencyString(
    amount,
    activeAccount.baseCurrency
  );

  const currencyStringBalance = formatCurrencyString(
    activeAccountBalance,
    activeAccount.baseCurrency
  );

  console.log(currencyStringAmount);
  console.log(currencyStringBalance);

  // Detects if the transfer is of a legal amount or not
  if (amount > activeAccountBalance) {
    alert(
      `Cannot move specified amount as it exceeds the active account's balance. ${currencyStringAmount} / ${currencyStringBalance}`
    );
    clearInputFields();
    return;
  }

  // Checks if both values needed have been specified or not
  if (address !== '' && amount !== 0) {
    // Finds the object for the specified sendToAccount
    const sendToAccount = findAccount(address.toLowerCase());

    // Checks if a valid account was found to send to
    if (sendToAccount) {
      const moneyOut = amount - amount * 2;
      activeAccount.movements.push(moneyOut);

      const sentMoney = amount;
      sendToAccount.movements.push(sentMoney);
      alert(
        `Transfer successful! ${currencyStringAmount} moved to account '${address}'`
      );

      // Recalculate balance, movements, and totals
      populateBalance(activeAccount.movements, activeAccount.baseCurrency);
      populateMovements(activeAccount.movements, activeAccount.baseCurrency);
      populateTotals(
        activeAccount.movements,
        activeAccount.interestRate,
        activeAccount.baseCurrency
      );
      clearInputFields();
      return;
    } else {
      alert(
        `Transfer account specified ('${address}'} not found, cancelling process.`
      );
      clearInputFields();
      return;
    }
  } else {
    alert(
      `Please enter an account username to send funds to, and the amount to send.`
    );
    clearInputFields();
    return;
  }
}

// Finds the account a user wants to transfer funds to and returns that accounts object
// Called by accountTransfer()
function findAccount(username) {
  const matchAccount = accounts.find(account => account.username === username);
  console.log(matchAccount);
  if (matchAccount !== undefined) {
    return matchAccount;
  } else {
    return;
  }
}

// Calculates and returns the balance of the activeAccount when needed
// Called by accountTransfer(), requestLoan()
function calculateActiveBalance(activeAccount) {
  let activeAccountBalance;

  if (activeAccount.movements.length === 0) {
    activeAccountBalance = 0.0;
  } else {
    activeAccountBalance = activeAccount.movements.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      }
    );
  }
  return activeAccountBalance;
}

// Calls requestLoan() with the activeAccount as an argument
// Called by an eventHandler on the 'Request loan' button
function requestLoanInit() {
  requestLoan(activeAccount);
}

// Allows a user to request a loan for a specified amount, then adding the amount to their balance and recalculating balance, movements, and totals. Negative loans are not allowed
function requestLoan(activeAccount) {
  // Captures the amount from the relevant field
  const amount = Number(inputLoanAmount.value);

  // Fails if the amount is 0 or has no number specified by the user
  if (amount === 0) {
    alert('Please specify an amount you would like to request a loan for.');
    clearInputFields();
    return;
  }

  // Allows processing of loan and relevant procedures of the amount is more than 0 and the user's balance has at least 10% of the loan's value as a deposit
  if (amount > 0) {
    const depositNeeded = amount / 10;
    const activeAccountBalance = calculateActiveBalance(activeAccount);
    if (activeAccountBalance >= depositNeeded) {
      setTimeout(() => {
        const currencyString = formatCurrencyString(
          amount,
          activeAccount.baseCurrency
        );
        alert(`Loan of ${currencyString} approved!`);
        activeAccount.movements.push(amount);
        populateBalance(activeAccount.movements, activeAccount.baseCurrency);
        populateMovements(activeAccount.movements, activeAccount.baseCurrency);
        populateTotals(
          activeAccount.movements,
          activeAccount.interestRate,
          activeAccount.baseCurrency
        );
        clearInputFields();
      }, 2000);
      return;
    } else {
      setTimeout(() => {
        const currencyStringAmount = formatCurrencyString(
          amount,
          activeAccount.baseCurrency
        );
        const currencyStringDeposit = formatCurrencyString(
          depositNeeded,
          activeAccount.baseCurrency
        );
        alert(
          `Loan of ${currencyStringAmount} declined! Your account must have a balance equal to, or over 10% of the loan amount (${currencyStringDeposit}).`
        );
        clearInputFields();
      }, 2000);
      return;
    }
  } else {
    // Fails if an amount less than 0 is specified
    alert(`You cannot request a negative loan!`);
    clearInputFields();
    return;
  }
}

// Calls closeAccount() with the username and pin specified, as well as the currently activeAccount's object
// Called by eventHandler on the 'Close account' button
function closeAccountInit() {
  const username = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);
  closeAccount(username, pin, activeAccount);
}

// Allows a user to close their account when re-confirming their username and PIN, will fail if credentials are not correct or trying to close a different account
// Called by closeAccountInit()
function closeAccount(username, pin, activeAccount) {
  const accountToClose = findAccount(username);

  if (username === '' || pin === 0) {
    alert(`Please enter both username and PIN to proceed.`);
    clearInputFields();
    return;
  }

  if (accountToClose) {
    if (accountToClose === activeAccount) {
      const checkResult = pinCheck(activeAccount, pin);
      if (checkResult === false) {
        alert('Wrong PIN specified, cancelling process.');
        clearInputFields();
        return;
      } else {
        accounts = modifyAccountsArray(accountToClose);
        logOut('closeaccount');
        return;
      }
    } else {
      alert('You can only close your own account, cancelling process.');
      clearInputFields();
      return;
    }
  } else {
    alert(`No account found to close, cancelling process.`);
    clearInputFields();
    return;
  }
}

// Deletes an account from the accounts array when an account is closed
// Called by closeAccount()
function modifyAccountsArray(accountToClose) {
  const newAccounts = accounts.filter(
    current => current.username !== accountToClose.username
  );
  return newAccounts;
}

// Allows user to sort their movements into similar groupings of positive and then negative amounts
// Called by eventHandler on the 'Sort' button
function sortMovementsInit() {
  sortMovements(activeAccount);
}

// TODO
// NEED TO ALLOW SORTING WITHOUT DISTURBING NUMBERING SCHEME
// NEED TO ADD SUPPORT FOR DIFFERENT TYPES OF SORTS

// Sorts user movements into positive and then negative groupings
// Called by sortMovementsInit()
function sortMovements(activeAccount) {
  // This expression clears all HTML out of the element to make it empty
  containerMovements.innerHTML = '';

  const sortedMovements = activeAccount.movements.sort((a, b) => {
    if (a < 0 && b >= 0) {
      return -1;
    } else if (a >= 0 && b < 0) {
      return 1;
    } else {
      return 0;
    }
  });

  // Iterate through the movements and add their amount and index number to some HTML in a string literal along with types and times etc.
  sortedMovements.forEach(function (amount, index) {
    const type = amount > 0 ? 'deposit' : 'withdrawal';
    const time = generateTimestamp();

    const currencyString = formatCurrencyString(
      amount,
      activeAccount.baseCurrency
    );
    // Create the HTML that we need in a string literal
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
      <div class="movements__date">${time}</div>
      <div class="movements__value">${currencyString}</div>
      </div>`;

    // Add the above HTML to the element
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

// Logs the user out when their session timer has expired and handles logout operations
// Called by clickLogIn(), logInCheck(), timerCountdown(), closeAccount()
function logOut(reason) {
  containerApp.style.opacity = 0;
  activeAccount = null;
  resetWelcome();
  timerCountdown('reset');
  clearInputFields();
  let alertMessage;
  switch (reason) {
    case 'expired':
      alertMessage =
        'You have been logged out automatically - Session expired.';
      break;
    case 'invalidPIN':
      if (loggedIn) {
        alertMessage =
          'You have been logged out automatically - Invalid credentials.';
        break;
      } else {
        alertMessage = `Please check your credentials and try again - Invalid credentials.`;
        break;
      }
    case 'incomplete':
      if (loggedIn) {
        alertMessage =
          'You have been logged out automatically - Incomplete credentials.';
        break;
      } else {
        alertMessage =
          'Please enter both username and PIN - Incomplete credentials.';
        break;
      }
    case 'nomatch':
      if (loggedIn) {
        alertMessage = `You have been logged out automatically - Non-existant username.`;
        break;
      } else {
        alertMessage = `That username does not correspond to any user on record - Non-existant username.`;
        break;
      }
    case 'closeaccount':
      alertMessage = `This account has been closed and you will be logged out - Account closed`;
      break;
    default:
      break;
  }
  // Set the loggedIn flag to false
  loggedIn = false;
  setTimeout(() => {
    alert(alertMessage);
  }, 1000);
}

/////////////////////////////////////////////////
// AUTOMATICALLY RUNNING CODE

createUsernames(accounts);

/////////////////////////////////////////////////
// EVENT HANDLERS

// This code prevents the log in button from refreshing the page on click, which is a button inside a form's default behaviour. This was causing issues, so I have disabled it
btnLogin.addEventListener('click', event => event.preventDefault());
btnLogin.addEventListener('click', clickLogIn);

// The same for the 'Transfer money' button
btnTransfer.addEventListener('click', event => event.preventDefault());
btnTransfer.addEventListener('click', accountTransferInit);

// And for the 'Request loan' button
btnLoan.addEventListener('click', event => event.preventDefault());
btnLoan.addEventListener('click', requestLoanInit);

// And for the 'Close account button'
btnClose.addEventListener('click', event => event.preventDefault());
btnClose.addEventListener('click', closeAccountInit);

// And finally, the 'Sort' button
btnSort.addEventListener('click', event => event.preventDefault());
btnSort.addEventListener('click', sortMovementsInit);

/////////////////////////////////////////////////
// EXPERIMENTAL CODE SNIPPETS

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Converting EURO to USD.
const eurToUsd = 1.1;

const movementsUSD = movements.map(move => move * eurToUsd);

const movementsDescriptions = movements.map(
  (move, index, arr) =>
    `Movement ${index + 1}: You ${
      move > 0 ? 'deposited' : 'withdrew'
    } ${Math.abs(move)}`
);

function createNewAccount() {
  const owner = prompt(
    'Enter at least your first and last names separated by a space.'
  );
  const movements = [];
  const interestRate = 1.5;
  const pin = Number(prompt(`Please enter your 4 digit PIN number.`));
  const baseCurrency = '$';

  const accountNumbers = accounts.map(account =>
    parseInt(account.id.replace('account', ''))
  );

  const highestNumber = Math.max(...accountNumbers);

  const nextAccountId = `account${highestNumber + 1}`;

  const protoAccount = {
    id: nextAccountId,
    owner: owner,
    movements: movements,
    interestRate: interestRate, // %
    pin: pin,
    baseCurrency: baseCurrency,
  };

  const accountVariableName = `account${highestNumber + 1}`;
  eval(`const ${accountVariableName} = protoAccount;`);

  accounts.push(protoAccount);
  createUsernames(accounts);

  return protoAccount;
}

// createNewAccount();

/////////////////////////////////////////////////
// END OF CODE
