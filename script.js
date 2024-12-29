'use strict';

console.log(`Project code.`);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// We are using objects and arrays in this app instead of maps as in real-world applications most data comes in from APIs in these formats.

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Michael McCann',
  movements: [800, 1650, 710, 990, 10],
  interestRate: 2.5,
  pin: 5585,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
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
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Breaks apart the username specified by the user and checks to see if the letters match up to an account, then runs the pinCheck() function to see if the PIN number mathces, before granting access.

// This only currently works for usernames of 2 characters in length, this needs to be addressed as some users have more than 2 names.

function logInCheck(user, pin) {
  // Gets the letters of the username and destructures them into 2 variables
  const [userString1, userString2] = [...user];

  for (const account of accounts) {
    let correctName1,
      correctName2 = false;

    const splitName = account.owner.toLowerCase().split(' ');

    if (splitName[0].toLowerCase().startsWith(userString1)) {
      correctName1 = true;
    }

    if (splitName[1].startsWith(userString2)) {
      correctName2 = true;
    }

    if (correctName1 === true && correctName2 === true) {
      console.log(`That username corresponds to ${account.owner}`);
      const checkResult = pinCheck(account, pin);
      if (checkResult === true) {
        containerApp.style.opacity = 1;
      }
      console.log(checkResult);
      break;
    } else {
      console.log(`That username does not correspond to any user on record.`);
      continue;
    }
  }
}

// A function to check that the PIN number is correct on a user log-in attempt.
function pinCheck(account, pin) {
  console.log(`Now checking PIN number...`);
  if (pin === account.pin) {
    console.log(`PIN correct, welcome ${account.owner}!`);
    return true;
  } else {
    console.log(`PIN is not correct, access denied!`);
    return false;
  }
}

// Run when the login button is clicked, it gathers the values inside the input fields and then calls the logInCheck() function.
function clickLogIn() {
  const usernameInput = document.querySelector('.login__input--user').value;
  let pinInput = Number(document.querySelector('.login__input--pin').value);
  if (usernameInput === '' || pinInput === 0) {
    alert('Please enter both username and PIN.');
    return;
  }
  logInCheck(usernameInput, pinInput);
}

// This code prevents the log in button from refreshing the page on click, which is a button inside a form's default behaviour. This was causing issues, so I have disabled it.
document;
btnLogin.addEventListener('click', event => event.preventDefault());

btnLogin.addEventListener('click', clickLogIn);
