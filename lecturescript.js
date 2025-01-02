// NOTES
// WORKING WITH ARRAYS
// How and when to use arrays while building a visual banking app type project.

// We are using objects and arrays in this app instead of maps as in real-world applications most data comes in from APIs in these formats.

console.log(`Lecture script notes and code.`);

// NOTES
// SIMPLE ARRAY METHODS
// Arrays have methods that allow us to manipulate array objects in different ways. These built in methods are functions that are attached to all arrays created in JavaScript based on prototypal inheritance.

const testArray = ['a', 'b', 'c', 'd', 'e'];

// SLICE
// The '.slice()' method allows us to take a slice from an array, which builds a new array containing that slice without altering the original.
// We can set a start and an end position of the slice.
console.log(testArray.slice(2)); // ['c', 'd', 'e']
console.log(testArray.slice(2, 3)); // ['c']

// We can mix this with other methods called on the array like 'array.indexOf(element)' to customize our starting and ending values for the slice.
console.log(testArray.slice(0, testArray.indexOf('d'))); // ['a', 'b', 'c']

// Negative indexes can also be used in place of positive ones. We can even mix postive and negative index values if we want to.
console.log(testArray.slice(-2)); // ['d', 'e']

// '.slice()' works the same on arrays than with strings. Nice and easy.

// We can use the .slice() method to create a shallow copy of an array. In addition, we can use the spread operator to do this as in a previous module. Which method we choose is up to us and it doesn't really matter which one we use.

console.log(testArray.slice());
console.log([...testArray]);

// SPLICE
// This method works in almost the same way as .slice() but it DOES actually mutate the original array. This method takes the part we specify and moves this into a new array, removing it from the original, we can see this in operation in the example below.

// Checking the orignial array before using '.splice()'
console.log(testArray); // ['a', 'b', 'c', 'd', 'e']
// Using '.splice()' and saving the spliced part of the original array to another variable.
const splicedPartOfArray = testArray.splice(0, 3); // ['a', 'b', 'c']
// Logging the original array again, we can see that it now only includes the last two elements.
console.log(testArray); // ['d', 'e']
// Logging the new array created by '.splice()', it contains the first three values of the original array that were spliced out.
console.log(splicedPartOfArray); // ['a', 'b', 'c']

// We can use negative index values etc., exactly the same as the '.slice()' method. However, there is a big difference, the first value we specify for this method is the position to start the splice, the second value is the number of elements we want to splice out. So, a value of 3 will splice out 3 elements from the array, not finish as index positioon 3. We can see this above, as with '.slice()' arguments of 0, 3 should get 4 values, whereas with '.splice()' it has only gotten 3 of them.

// REVERSE
// Simply reverses the order of elements in an array.

const testArray2 = ['j', 'i', 'h', 'g', 'f'];
console.log(testArray2); // ['j', 'i', 'h', 'g', 'f']
console.log(testArray2.reverse()); // ['f', 'g', 'h', 'i', 'j']
console.log(testArray2); // ['f', 'g', 'h', 'i', 'j']
// The reverse method does actually mutate the original array, so we probably want to create a shallow copy of an array to play with, instead of accidentally messing with the original array.

// CONCAT
// This method concatenates two arrays togehter into one array, it does this by just smashing the second array onto the end of the first, without changing the order of the elements in either array to do so. This does not mutate either of the concatenated arrays.

const letters = testArray.concat(testArray2);
console.log(letters); // ['d', 'e', 'f', 'g', 'h', 'i', 'j']
console.log(testArray);
console.log(testArray2);

// We can concatenate more than one array together at once by specifying them as a set of CSV within the parentheses.
const smallArray = ['hello', 'my', 'love'];
const lettersAndWords = testArray.concat(testArray2, smallArray);
console.log(lettersAndWords); // ['d', 'e', 'f', 'g', 'h', 'i', 'j', 'hello', 'my', 'love']

// We can also do this by using the spread operator.
console.log([...testArray, ...testArray2]); // ['d', 'e', 'f', 'g', 'h', 'i', 'j']

// JOIN
// This allows us to join the elements of an array into one string, by joining them with a chosen separator or nothing. This works much the same as it does with strings.

console.log(letters.join(' - '));

// We have already ecountered '.push()', 'unshift()', 'pop()', '.shift()', 'indexOf()', and '.includes()' which we have used before in previous modules.

// Check the mdn documents if we forget about a method or if we need to check up on how a method works and if it mutates the original array or not.

// NOTES
// THE NEW AT METHOD

// Added in ES2022, the .at() method allows us to pull out an element from an array from its index number specified within the parentheses.

const arr = [23, 11, 64];

// This is the traditional way we would do this.
console.log(arr[0]); // 23

// We can do exactly the same with the '.at()' method, just with slightly different syntax.
console.log(arr.at(0)); // 23

// This allows us to replace the bracket notation with this method if we want to. However, there is also another particularity of this method that makes it more useful than using bracket notation.

// This is how we would traditionally extract the last element of an array without knowing how long the array is.
console.log(arr[arr.length - 1]); // 64

// We could also do this by making a shallow copy of the array using .slice() and grabbing only the last element.
console.log(arr.slice(-1)); // 64

// The new .at() method makes this easy, as we can also use negative index numbers with it, instead of having to specify an index value of length - 1.
console.log(arr.at(-1)); //64

// It really depends whether we want to use the .at() method or not. It can be easier to use and looks more modern. It is also useful for chaining methods as we cna easily chain it with other methods, which we might not be able to easily do with the more traditional methods.

// The '.at()' method also works with strings.

console.log('Michael'.at(3)); // h
console.log('Michael'.at(-1)); // l

// NOTES
// LOOPING ARRAYS: FOREACH
// The '.forEach()' method allows us to iterate through an array.

const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];

// We could of course loop through an array by using a for of loop like so.
console.log(`===============================`);
console.log(`---- for of loop ----`);
for (const movement of movements2) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

// But it may be easier to do this using the .forEach() method.
console.log(`===============================`);
console.log(`---- forEach ----`);
movements2.forEach(movement => {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
});

// The '.forEach()' method requires a callback function specified within its parentheses, which technically makes it a higer-order function.
// We need to define the following syntax for the '.forEach()' method:
// array.forEach(element => {})
// This example is using an arrow function but it can be a more explicit function definition as well.
// array.forEach(function (element) {})

// We can call the iterable value anything, it does not have to be 'element' although that is standard.
// For each element in the array, the callback function will be invoked, using the current element of the array as an argument.

// If we wanted to access a counter variable using a for of loop we could destructure both the index number and the value from array.entries(). This can be very useful for our outputs to make them understandable.
console.log(`===============================`);
console.log(`---- for of loop ----`);
for (const [i, movement] of movements2.entries()) {
  if (movement > 0) {
    console.log(`${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

// The forEach method actually passes in three values for each iteration step through an array. It passes in the value to be iterated with, as well as its index value, and also the whole array that is being iterated over. That means we can grab the index value from the function and use it.

// However, the order of arguments here is very important, as the element is always passed in first, followed by the index value of the element, then the whole array.

// This means that it can be easier to get the index value of an element when using the '.forEach()' method.
console.log(`===============================`);
console.log(`---- forEach ----`);
movements2.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(`${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
});

// Pay attention to the order of arguments as they are different between a for of loop using .entries() and the forEach method. in the for of loop with .entries, the index number is the first argument, wherease with forEach it is the second argument.

// When should you use each type of iteration?
// We cannot break out of a forEach loop, it always loops over the whole array and there is nothing we can do about it, Statements like break and continue have no effect on it. Therefore, if we might need to stop iterating through a loop early, a for of loop is a better choice, but if we need to iterate through an entire array easily, the forEach liip might be the better choice.

// NOTES
// FOREACH WITH MAPS AND SETS
// We can also use forEach with maps and sets.

// MAPS
const currencies2 = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

console.log(`===========================`);

// A map feed three arguments into forEach as well, but in this case they are the value, its key, and the whole map to be iterated over. We can access any of these properties easily within the forEach logic.
currencies2.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// SETS
const currenciesUnique = new Set(['USD', 'GDP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

console.log(`========================`);

// For sets, things work a little differently, the forEach has the same signature in terms of parameters as using forEach with a map, however, a set does not have keys or index values, so actually the first and second arguments are the same as one another.

// We can see in the forEach below that the values of value and key are the same as one another, so we may as well call the second argument the same as the first. These are called 'throwaway variables' in programming.

currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// This was done so as not to confuse programmers with another different signature, but just keep this in mind, as it is unlikely we will need to do this with sets anyway.

// NOTES
// PROJECT: BANKIST APP
// Using the application demo at bankist.netlify.app

// Please take a look at the code in script.js to see the progress made on the app in this section - adding a log in function.

// NOTES
// CREATING DOM ELEMENTS
// Manipulating the DOM through various different techniques and with the '.forEach()' method.

console.log(`========================`);

// In order to add html to a webpage, we can first create the HTML using a string literal. This allows us to add dynamic elements to the HTML based on our needs. The below example is how we might do it.

// const html = `<div class="movements__row">
//     <div class="movements__type movements__type--${type}">${
//   index + 1
// } ${type}</div>
//     <div class="movements__date">${time}</div>
//     <div class="movements__value">${amount}€</div>
//     </div>`;

// Once our HTML is created, we can choose which container or other element we want to add it to. To do this we can use the '.insertAdjacentHTML()' method. This method takes two arguments, the first being the position we want to insert the HTML in the element, these are:

// 'beforebegin' - inserts the content before the element itself.
// 'afterbegin' - inserts the content at the beginning of the element's content.
// 'beforeend' - inserts the content at the end of the element's content.
// 'afterend' - inserts the content after the element itself.

// When using any of these position statements they must be within quotation marks to work.

// The second argument is the string that we want to insert, we could insert the string literal we made earlier to do this.

// containerMovements.insertAdjacentHTML('afterbegin', html);

// Sometimes we might want to clear an HTML element of its content before we add other stuff to it (or for a variety of other reasons). We can do this by setting the innnerHTML property of an element to an empty string, like so.

// containerMovements.innerHTML = '';

// 'innerHTML' is similar to textContent, the difference is that textContext simply returns the text itself, but innerHTML returns everything including the HTML

// NOTES
// CHALLENGE 1
// Create a function that takes in arrays of dog ages and then tells us whether the dog is a puppy or an adult.

console.log('=====================');

const dogAgesJulia = [3, 5, 8, 1, 1, 2, 4, 12, 15, 3];
const dogAgesKate = [3, 4, 6, 1, 1, 1, 4, 1, 11, 13];

console.log(dogAgesJulia);
console.log(dogAgesKate);

// Julia really fucked up man. Like, she really fucked up. The first and last two dogs of her survey were actually cats, the dumb idiot. We create a shallow copy of the array with the erroneous pets omitted. I have made the function below dynamic in that it could accept any array of dog ages, so it doesn't really make sense to do this within the function.
const correctedDogAgesJulia = dogAgesJulia.slice(1, -2);
console.log(correctedDogAgesJulia);

// We could have also removed the erroneous ages with a series of '.splice()' methods as well.

function checkDogAges(arr1, arr2) {
  const unifiedArr = arr1.concat(arr2);
  console.log(unifiedArr);
  unifiedArr.forEach(function (dog, index) {
    if (dog >= 3) {
      console.log(`Dog ${index + 1} is an adult and is ${dog} years old. 🦮`);
    } else {
      console.log(`Dog ${index + 1} is a puppy and is ${dog} years old. 🐶`);
    }
  });
}

checkDogAges(correctedDogAgesJulia, dogAgesKate);

// NOTES
// DATA TRANSFORMATIONS: MAP, FILTER, REDUCE
// These are imnportant array methods that we use when creating new arrays and transforming data coming from other arrays.

// MAP
// A method that can be used to loop over arrays, it is similar to the forEach method from before, but map creates a new array based on the array iterated over.
// This allows us to, for example, multiply all elements in a array by two and put these elements into a new array.
// Map is so called because it maps the elements in one array directly to a new array.

const mapArr = [3, 1, 4, 3, 2];
console.log(mapArr);

const newMapArr = mapArr.map(current => current * 2);
console.log(newMapArr);

// FILTER
// Used to filter for elements in the original array that satisfy a particular condition. We specify a test and then all elements that pass are mapped into a new array. Other elements will get filtered out and not be included in the new array.

const filterArr = [3, 1, 4, 3, 2];
console.log(filterArr);

const newFilterArr = filterArr.filter(current => current > 2);
console.log(newFilterArr);

// REDUCE
// We use this to boil down all of the elements in an array into one result. For example, we could add up all values in an array and add each the values onto an accumulator. We can then return the final value at the end. This is also known as the snowball effect, as things will add into one value at the end.

const reduceArr = [3, 1, 4, 3, 2];
console.log(reduceArr);

const reduceArrTotal = reduceArr.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
});

console.log(reduceArrTotal);

// All of these methods work a little like forEach, in that they take a callback function as an argument. This can sometimes be an arrow function, but other times needs to be a function definition if more complex. Like forEach, the element named inside the callback function can be called anything, but 'current' is the standard.

// Reduce is a bit more complicated in that it can accept up to four arguments. These are the accumulator, the current value, the current index, and the whole array to be iterated over. We usually only have to specify the first two to do something like adding all values together.

// NOTES
// THE MAP METHOD
// Remember that unlike forEach, map will give us a new array with the code expressed in the callback function applied to it.

// Code for this section is in the project script.

const eurToUsd = 1.1;

// To change an amount in EUR to USD
// Whatever we return from the callback function is placed into the new array at the same position as the value we are iterating over. The original array is not altered at all, but a new array is generated.

// As an arrow function.
const movements2USD = movements2.map(move => move * eurToUsd);

// As a more explicit function expression.
// cosnt movementsUSD = movements.map(function(move) {
//   return move * eurToUsd;
// });

// If we choose to use an arrow function it can make it harder to see that we are using a function to do something. It might be better to make the code more explicit to acheive better readability.

console.log(movements2);
console.log(movements2USD);

// We could also do this easily with a for of loop like this.
const newArr = [];
for (const move of movements2) {
  newArr.push(move * eurToUsd);
}

console.log(newArr);

// In the map method we use a function to solve our problem, but when using for of loops we are explicitly doing everything. Functional programming is more in vogue and more modern so it is usually better and simpler to use a callback function inside a method.

// We can also loop over the movements array and a more descriptive array using the template literal we used before.

// It is completely okay to have multiple return statements in the same piece of code, as long as only one of them can be executed at any one time.

// Any code that has a field that could be more than one option, such as 'type' in this case could be calculated a lot more simply by using a ternary operator.

// It might be a nice idea to simplify a callback function to an arrow function if it is possible as it will reduce the length and complexity of the code by a significant amount.
const movementsDescriptions = movements2.map(
  (move, index, arr) =>
    `Movement ${index + 1}: You ${
      move > 0 ? 'deposited' : 'withdrew'
    } ${Math.abs(move)}`
);

console.log(movementsDescriptions);

// If we do someting within a function that we can instantly see in the console etc. it is called a side effect. Functions can either generate side effects or not and sometimes they might be neccesasary or not.

// NOTES
// COMPUTING USERNAMES
// It would be easier to generate the user's alias programmatically, instead of typing in an 'alias' property manually.

// Code for this section will be in the script.js file in the 'CreatAliases()' function.

// In this section I also added log in field behaviour in the case of incorrect inputs and other things related to logging in.

// NOTES
// THE FILTER METHOD

// I wrote this code to filter out certain transactions from the movements array (positive and negative) and then chained that to a reduce method to generate a total.

// function populateTotals(movements, interest, baseCurrency) {
//   // Calculate the total amount incoming
//   const inTotal = movements
//     .filter(move => move > 0)
//     .reduce((acc, value) => acc + value);

//   // Calculate the total amount outgoing
//   const outTotal = movements
//     .filter(move => move < 0)
//     .reduce((acc, value) => acc + value);

//   // Calculate the amount of interest
//   const interestTotal =
//     movements.reduce(
//       (accumulator, currentValue) => accumulator + currentValue
//     ) *
//     (interest / 100);

//   // Update the HTML content with these totals
//   labelSumIn.textContent = `${inTotal}${baseCurrency}`;
//   labelSumOut.textContent = `${outTotal}${baseCurrency}`;
//   labelSumInterest.textContent = `${interestTotal}${baseCurrency}`;
// }

// It is easier to do this using the '.filter()' and '.reduce()' methods as they can easily be chained together, we could not do this so easily by using multiple for of blocks.

// NOTES
// THE REDUCE METHOD

// See the code above to see an example of using the '.reduce()' method on an array.

// When using the '.reduce()' method take note that the first argument is always the accumulator, followed by the current value. These are usually the only values we need to access when using the '.reduce()' method. The other two arguments following can be the current index value, and then the total array to be iterated over.

// There is also another argument we can feed into the .reduce() method, which is the inital value of the accumulator. We can specify this at the end of the statement after the curly braces and before the closing parentheses as seen below.

// The intial value of the accumulator is set to 0, this is the default value, so even if this extra argument is not specified this would still happen.
const testBalance = movements2.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration: ${i}: ${acc}`);
  return acc + cur;
}, 0);
console.log(testBalance);

// In this case the initial value of accumulator will start at 100 using the extra argument at the end of the logic.
const testBalance2 = movements2.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration: ${i}: ${acc}`);
  return acc + cur;
}, 100);
console.log(testBalance2);

// If we tried to do the same thing with a for of loop, the accumulator would have to be a variable created externally that we would set up manually.
let balance2 = 0;
for (const move of movements2) balance2 += move;
console.log(balance2);

// As we don't need to go to the trouble of setting up an external accumulator, using the '.reduce()' method can be a lot easier than using for of loops.

// NOTES
