'use strict';

console.log(`Project code.`);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// We are using objects and arrays in this app instead of maps as in real-world applications most data comes in from APIs in these formats.

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  alias: 'js',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  alias: 'jd',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  alias: 'stw',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  alias: 'ss',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Michael McCann',
  alias: 'mm',
  movements: [800, 1650, -710, 990, -10],
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

// Checks to see if the typedo in username corresponds to an account, then runs the pinCheck() function to see if the PIN number mathces, before granting access.

function logInCheck(user, pin) {
  for (const account of accounts) {
    // Checks to see if the username corresponds to the account.owner or the account.alias
    if (user === account.owner || user === account.alias) {
      console.log(`That username corresponds to ${account.owner}`);
      const checkResult = pinCheck(account, pin);
      if (checkResult === true) {
        containerApp.style.opacity = 1;
      } else {
        break;
      }
      console.log(checkResult);
      populateMovements(account.movements);
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

// We can create a HTML element to be added using a template string to hold the code
function populateMovements(movements) {
  // This expression clears all of the HTML out of the element to make it empty, we set the container to an empty string, which results in no content
  containerMovements.innerHTML = '';

  // 'innerHTML' is similar to textContent, the difference is that textContext simply returns the text itself, but innerHTML returns everything including the HTML

  // Iterate through the movements and add their amount and index number to some HTML in a string literal along with types and times etc.
  movements.forEach(function (amount, index) {
    const type = amount > 0 ? 'deposit' : 'withdrawal';
    const time = `NOW`;

    // Create the HTML that we need in a string literal
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__date">${time}</div>
    <div class="movements__value">${amount}€</div>
    </div>`;

    // Add the above HTML to the element
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

// This code prevents the log in button from refreshing the page on click, which is a button inside a form's default behaviour. This was causing issues, so I have disabled it.
document;
btnLogin.addEventListener('click', event => event.preventDefault());

btnLogin.addEventListener('click', clickLogIn);

const eurToUsd = 1.1;

// To change an amount in EUR to USD
// Whatever we return from the callback function is placed into the new array at the same position as the value we are iterating over. The original array is not altered at all, but a new array is generated.

// As an arrow function.
const movementsUSD = movements.map(move => move * eurToUsd);

// As a more explicit function expression.
// cosnt movementsUSD = movements.map(function(move) {
//   return move * eurToUsd;
// });

// If we choose to use an arrow function it can make it harder to see that we are using a function to do something. It might be better to make the code more explicit to acheive better readability.

console.log(movements);
console.log(movementsUSD);

// We could also do this easily with a for of loop like this.
const newArr = [];
for (const move of movements) {
  newArr.push(move * eurToUsd);
}

console.log(newArr);

// In the map method we use a function to solve our problem, but when using for of loops we are explicitly doing everything. Functional programming is more in vogue and more modern so it is usually better and simpler to use a callback function inside a method.

// We can also loop over the movements array and a more descriptive array using the template literal we used before.

// It is completely okay to have multiple return statements in the same piece of code, as long as only one of them can be executed at any one time.

// Any code that has a field that could be more than one option, such as 'type' in this case could be calculated a lot more simply by using a ternary operator.

// It might be a nice idea to simplify a callback function to an arrow function if it is possible as it will reduce the length and complexity of the code by a significant amount.
const movementsDescriptions = movements.map(
  (move, index, arr) =>
    `Movement ${index + 1}: You ${
      move > 0 ? 'deposited' : 'withdrew'
    } ${Math.abs(move)}`
);

console.log(movementsDescriptions);

// If we do someting within a function that we can instantly see in the console etc. it is called a side effect. Functions can either generate side effects or not and sometimes they might be neccesasary or not.
