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
  return unifiedArr;
}

const unifiedDogAges = checkDogAges(correctedDogAgesJulia, dogAgesKate);

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

// We can use the '.reduce()' method to boil down the values in an array into any result, it does not only have to be the sum of everything inside the array. For example, we could use it to find the largest value in the array.

// We can use the accumulator as a holder for our maximum value as seen in the block below. We set the maximumValue accumulator to an intial value of 0 in the argument after the curly braces.

const maximum = movements2.reduce(function (maximumValue, value) {
  if (value > maximumValue) {
    maximumValue = value;
  }
  console.log(`Value is ${value}`);
  console.log(`Maximum is ${maximumValue}`);
  return maximumValue;
}, 0);

console.log(`Computed maximum is: ${maximum}`); // 3000

// We can basically use '.reduce()' to perform any operation we want, the important thing is that the '.reduce()' method will take in an array and then boil it down to just one value.

// .reduce() is a very useful method but can be a little difficult to use. Basically, we have to think what we want the accumulator and value arguments to do in our logic and then we should be able to use them in a correct manner.

// NOTES
// CHALLENGE 2
// Going back to the study of dogs ages. Converting the dogs ages to human years, removing dos under 18, and then calculating the average human age for an array.

function calcAverageHumanAge(dogAges) {
  // Use the '.map()' method to generate a new Array with dog ages converted to human ages
  const humanAges = dogAges
    .map(dog => {
      dog <= 2 ? (dog = 2 * dog) : (dog = 16 + 4 * dog);
      return dog;
    })
    // Use the '.filter()' method to exclude all dogs under 18 human years old
    .filter(current => current >= 18);

  console.log(humanAges);

  // Use the '.reduce()' method to sum up all of the ages and then divide by the arrays.length to get the average
  const averageAdultDogAge =
    humanAges.reduce((acc, age) => (acc += age)) / humanAges.length;

  // We could also divide the values in an array by the arr.length directly within the method, leveraging the fact that we do have access to the whole array as the 4th argument of the .reduce() method. We have to specify an inital value of 0 to the accumulator for this to work, as otherwise it will use the first value in the array to do this and this will result in a potentially incorrect result.

  // This second example is a possibility, but it universally panned as being needlessly hard to read.
  // const averageAdultDogAge = humanAges.reduce(
  //   (acc, age, i, arr) => acc + age / arr.length,
  //   0
  // );

  return averageAdultDogAge;
}

const testData1 = [5, 2, 4, 1, 15, 8, 3];
const testData2 = [16, 6, 10, 5, 6, 1, 4];

console.log(calcAverageHumanAge(unifiedDogAges)); // 44
console.log(calcAverageHumanAge(testData1)); // 44
console.log(calcAverageHumanAge(testData2)); // 47.33...

// NOTES
// THE MAGIC OF CHAINING METHODS

// By chaining methods together we can perform a lot of transformations all at once, this can be an extremely efficient way of writing code as it does not generate a load of variables that we need to keep track of. This is a sort of pipeline that processes our data in the manner of our choosing.
const totalDepositsUSD = movements2
  .filter(mov => mov > 0)
  .map((move, i, arr) => {
    console.log(arr);
    return move * eurToUsd;
  })
  .reduce((acc, move, i, arr) => {
    console.log(arr);
    return acc + move;
  });

console.log(totalDepositsUSD.toFixed(2));

// There can be reasability issues in some cases with chaining, so add notes if people might need clarification.

// It can also be difficult to locate problems in the chain, so we can build the chain piece by piece with testing, or build in console.log statements every so often that we can use for debugging purposes in the case of a problem.

// As these metods all get access to the whole array being iterated over, we can use this to log the array at certain points in the chain. It looks a little messy as done above, as it prints the array for every iteration of the method, but it can do the job in terms of debugging.

// Be careful of which array we are actually looking at when we logging the arrays in this manner.

// I applied chaining of methods in the populateTotals() function in the script.js, look at this function if you need an example of how it works.

// I have now had to break up the chaining a little in the populateTotals() function. Before, amounts would not be properly generated if a movements array had no positives or no negatives as the '.reduce()' method will crash if it tries to iterate over an empty array. The lesson here is that chaining arrays is useful but not always appropriate. Sometimes error handling demands we break things into chunks where potential errors can be handled.

// Also, a huge number of methods chained together can create significant performance issues. If we generate too many new arrays then the stack has to hold a lot of them all at once, and this can lead to stack overflow if handled poorly. We should try to compress all of functionality a chain has to do in as few methods as possible.

// We should always try to make the code as efficient as possible, and try to avoid chaining methods that mutate the original array, as this can introduce bugs that can be ferociously difficult to hunt down.

// NOTES
// CHALLENGE 3
// Rewriting the code from challenge 2 into one arrow function that makes use of chaining

// Here calculating the average values directly in the .reduce() method is the only way to do this if we wanted everything to be done by the same arrow function.
const calcAverageHumanAge2 = ages =>
  ages
    .map(age => (age <= 2 ? (age = 2 * age) : (age = 16 + age * 4)))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => (acc += age / arr.length), 0);

// It might be more logical to break up the chain a little, but its not too hard to read if you know what all of the methods are doing.

console.log(calcAverageHumanAge2(unifiedDogAges)); // 44
console.log(calcAverageHumanAge2(testData1)); // 44
console.log(calcAverageHumanAge2(testData2)); // 47.33...

// NOTES
// THE FIND METHOD

// The .find() method can be used to retrieve one element from an array based on a condition. This could be used to rewrite the login prodedure for the login for the app.

// .find() also loops over an array and retrieves an element based on the condition specified. The .find() method will not return a new array, just the first element in the array where the condition returns true.

const firstWithdrawal = movements2.find(move => move < 0);
console.log(movements2);
console.log(firstWithdrawal); // -400

// '.filter()' returns all of the elements that match the condition but .'.find()' only returns the first element that matches the condition. Also, '.filter()' returns a new array and '.filter()' only returns one value.

const firstDeposit = movements2.find(move => move > 0);
console.log(movements2);
console.log(firstDeposit);

// I have updated the logInCheck() function in the app to use the .find() method instead of using a for of loop that I was using before.

// NOTES
// IMPLEMENTING LOGIN

// In the case of a form's enter button, it automatically creates a click event when activated which is intended to send data server-side as default. In this particular application that doesn't work for us, as we want to run a function from the click event instead.

// As discovered earlier, a button press in a form automatically refreshes the page as its default behaviour, so we need to add an eventHandler that stops any default behaviour from being carried out. (If we need to, sometimes this behaviour is appropriate.)

// btnLogin.addEventListener('click', event => event.preventDefault());
// btnLogin.addEventListener('click', clickLogIn);

// However, as an alternative we can simply change the default behaviour of the form submit button by specifying the 'onsubmit' property of the form element. Here, we can specifiy code to be run on the the submit event, like so.

{
  /* <form class="login" onsubmit="clickLogIn();">
      <input
        type="text"
        placeholder="user"
        class="login__input login__input--user"
      />
      <!-- In practice, use type="password" -->
      <input
        type="text"
        placeholder="PIN"
        maxlength="4"
        class="login__input login__input--pin"
      />
      <button class="login__btn">&rarr;</button>
    </form> */
}

// In this case, the clickLogIn() function has been bound to the 'onsubmit' property of the form, that means when the submit button is clicked this code will be run instead of the default operation. This is now the behaviour we want, and it is simpler to add one line of code here, than to write two eventHanlder statements as before, one to disable the default behaviour, and on to then add a new eventHandler that we want.

// If we want to remove the focus from an HTML element we can call it (having first assigned it to a variable) with .blur()

// btnClose.blur();

// NOTES
// IMPLEMENTING TRANSFERS

// To change a positive value into a negative one we can simply use this syntax:

// const moneyOut = -amount;

// This is a lot simpler than:

// const moneyOut = amount - (amount * 2);

// We always need to think about how our code could be refactored in order to prevent repeating the same code. A prime example in my code would be the 'populate' functions. All three are always called together and with very similar arguments. They could be refactored into one function that can be called whenever it is needed.

// NOTES
// THE FINDINDEX METHOD

// '.findIndex()' is almost the same as the '.find()' method but instead of returning the found element, it instead returns the index of the element.

// This could be very useful in conjunction with the .splice() method as a way to remove a specific element from an array. We could first find the index of the desired element using '.findIndex()' and then delete it using '.splice()'

// In my code for the app, I opted to use the .filter() method to remove an element from an array, as it fit my specific situation well, but using '.findIndex()' and '.splice()' might also be a good solution.

const indexOfElement = movements2.findIndex(current => current === -130);
console.log(indexOfElement); // 5

// The '.findIndex()' method also needs a callback function to be specified with the format above, we can add some condition to pick out the property or value to match against.

console.log(movements2); // [200, 450, -400, 3000, -650, -130, 70, 1300]
movements2.splice(indexOfElement, 1);
console.log(movements2); // [200, 450, -400, 3000, -650, 70, 1300]

// Values to use for testing
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
  baseCurrency: '$',
};

const accounts2 = [account1, account2, account3];
console.log(accounts2);

// For '.findIndex()' the condition we specify in the callback function can be anything, as long as it returns either a true or a false value.

const indexOfJessica = accounts2.findIndex(
  current => current.owner === 'Jessica Davis'
);
console.log(indexOfJessica); // 1

// When the condition specified returns true it will pull the index value of the first element that casues it to be true. This means that if multiple elements evalutate to true, we will only be able to get the index of the first one to do so, unless we program a system around this, such as moving that element to a new array and then continuing to iterate through the original until done, etc.

const indexOfDollar = accounts2.findIndex(
  current => current.baseCurrency === '$'
);
console.log(indexOfDollar); // 1 - Even though both index 1 and 2 have the baseCurrency set to '$'

// The .findIndex() method also gets access to the current index number of the iteration and the entire array to be iterated over as well. We can access these as arguments in order, but rarely need to.

console.log(
  accounts2.findIndex((current, i, arr) => current.id === 'account3')
); // 2

// The '.find()' and '.findIndex()' methods were added in ES6 so won't work in super old browsers, but this isn't really an issue we need to worry about very often nowadays.

// NOTES
// THE NEW FINDLAST AND FINDLASTINDEX METHODS

// .FINDLAST()
// The '.findLast()' method returns the last instance of the specified condition detected when iterating through an array. We can use it in conjunction with 'find()' to capture the first and last instances in an array, but to capture more we would have to program this in.

// '.findLast()' basically iterates through an array backwards and returns the first element that makes the specified condition evaluate to true.

// We could acheive the same effect but reversing the order of the array using '.reverse()' and then using '.find()' on it as well, '.findLast()' simply allows us to do this without the step of reversing the array and is more convenient.

// In this example, the condition will always evaluate to true, thus returning the last element in the array to us.
const lastElement = movements2.findLast(current => current);
console.log(lastElement); // 1300

// Or we can set a more specific condition.
const lastElementWithDollar = accounts2.findLast(
  current => current.baseCurrency === '$'
);
console.log(lastElementWithDollar); // Account 3 (Steven Thomas Williams)

// .LASTINDEXOF()
// The 'lastIndexOf()' method works exactly the same, but returns the index of the last element in the array to make the condition specified evaluate to true. Like '.findLast()', it iterates through the array backwards.

const lastElementIndex = movements2.findLastIndex(current => current);
console.log(lastElementIndex); // 6

const lastIndexOfDollar = accounts2.findLastIndex(
  current => current.baseCurrency === '$'
);
console.log(lastIndexOfDollar); // 2

// We could use a combination of these two methods to do something like capture the last large movement an account made and print how many movements ago this was made.

const lastLargeMovementIndex = movements2.findLastIndex(
  current => current > 2000
); // 3
const movementAmount = movements2[lastLargeMovementIndex]; // 3000
const numberOfMovementsAgo = movements2.length - lastLargeMovementIndex; // 4

const messageString = `Your last large movement (${movementAmount}) was ${
  numberOfMovementsAgo - 1
} movements ago.`;

console.log(messageString); // Your last large movment (3000) was 3 movements ago.

// I got bored, so here is a puerile example of practicing with the findIndex and findLastIndex methods on arrays.
const standardToiletLog = [];

function poop(toiletLog) {
  console.log(`You take a poop!`);
  toiletLog.push('poop');
}

function pee(toiletLog) {
  console.log(`You take a pee!`);
  toiletLog.push('pee');
}

poop(standardToiletLog);
pee(standardToiletLog);
poop(standardToiletLog);
poop(standardToiletLog);
pee(standardToiletLog);

console.log(standardToiletLog);

function lastToiletVisits(toiletLog) {
  const lastPoop = toiletLog.findLastIndex(current => current === 'poop');
  const lastPee = toiletLog.findLastIndex(current => current === 'pee');
  console.log(
    `You last pooped ${
      toiletLog.length - lastPoop - 1
    } toilet visits ago, and last peed ${
      toiletLog.length - lastPee - 1
    } toilet visits ago. Well done!`
  );
}

function firstToiletVisits(toiletLog) {
  const firstPoop = toiletLog.findIndex(current => current === 'poop');
  const firstPee = toiletLog.findIndex(current => current === 'pee');
  console.log(
    `You first pooped ${
      toiletLog.length - firstPoop - 1
    } toilet visits ago, and first peed ${
      toiletLog.length - firstPee - 1
    } toilet visits ago. Well done!`
  );
}

firstToiletVisits(standardToiletLog);
lastToiletVisits(standardToiletLog);

const michaelToiletLog = [];
const ayakoToiletLog = [];

poop(michaelToiletLog);
poop(michaelToiletLog);
poop(michaelToiletLog);

pee(michaelToiletLog);

console.log(michaelToiletLog);

firstToiletVisits(michaelToiletLog);
lastToiletVisits(michaelToiletLog);

pee(ayakoToiletLog);
poop(ayakoToiletLog);
pee(ayakoToiletLog);

console.log(ayakoToiletLog);

firstToiletVisits(ayakoToiletLog);
lastToiletVisits(ayakoToiletLog);

// NOTES
// SOME AND EVERY

// .SOME()
// The '.some()' method is used to determine whether an array contains any elements that cause the specified condition to evaluate to true. It is similar to the '.includes()' method but with a major difference.

// The '.includes()' method can only test for equality, so if we wanted to see if a specific value exists in the array it would be fine. For more complex operations it may not be enough.
console.log(movements2.includes(-400)); // true

// However, if we wanted to test for a condition, that is where the '.some()' method comes into play. For example, we could use it to determine whether any positive movements exist in the array like this.
const anyDeposits = movements2.some(current => current > 0); // true
console.log(anyDeposits);

// Or we could check if there are any movements with a value above 5000
const anyHugeDeposits = movements2.some(current => current > 5000);
console.log(anyHugeDeposits); // false

// Think of '.some()' more like 'any' as this is what it is doing. It returns true if any elements in the array meet the specified category.

// .EVERY()
// The .every() method tells us whether all elements in an array cause a specified condition to evaluate to true or not. For example, we could test to see if every element is not equal to undefined as below.

const everyDepositDefined = movements2.every(current => current !== undefined);
console.log(everyDepositDefined); // true

const everyDepositPositive = movements2.every(current => current > 0);
console.log(everyDepositPositive); // false

// When programming the logic of our programs, it is better to have a single configurable function that we can use in other functions and methods. For example, we could set up a logical operator that determines whether things are true or false that can be fed into other functions. If we need to make any changes to our logic, we only really need to change things in this one place.

// NOTES
// FLAT AND FLATMAP
// These are new methods introduced in ES2019 so they won't work on super old browsers.

// .FLAT()
// The '.flat()' method allows us to flatten an array containing nested arrays into one array. We could have a combination of loose values and values within arrays inside an array. This method extracts all of the values and places them into the array on the surface level as distinct values.

// For example, this nested array could be flattened.
const arr3 = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr3.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]

// This method can be useful for just getting at the values inside a nested array without having to navigate the nesting. It works well with arrays where elements are not too deeply nested.

// For arrays where elements are more deeply nested, we get some strange results.
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); // [Array(2), 3, 4, Array(2), 7, 8]

// With a deeply nested array, the .flat() method tries its best, but usually cannot flatten all of the nested arrays values as seen below. Values are flattened, but we still get the deeply nested arrays in the output.

// This is because the default depth that the .flat() method runs to is 1, meaning that it will flatten things up to 1 level deep. For more deeply nested arrays, we can change this argument to another number
console.log(arrDeep.flat(2)); // [1, 2, 3, 4, 5, 6, 7, 8]

// This can allow us to flatten more deeply nested arrays easily.

// For example, the bank might want to do something like calculate the total balance of all of the movements of all customers. We could first create a new array of all the movements of the accounts using the '.map()' method
let totalBalance = accounts2.map(current => current.movements);
console.log(totalBalance);

// Then, we could flatten this array of arrays into one flat array of values using the '.flat()' method.
totalBalance = totalBalance.flat();
console.log(totalBalance);

// Then we would apply our calculation to reach a total using the '.reduce()' method.
totalBalance = totalBalance.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
console.log(totalBalance); // 15570

// .FLATMAP()
// To do the above a bit more efficiently, creating a map and then flattening it, there is now a method that combines both operations, '.flatMap()'

// This is essentially exactly the same as .map() but adds a flattening step to the end of the process. It only goes one nesting level deep, and this is something we cannot change.

// When dealing with more deeply nested arrays, we still need to use the '.flat()' method with the needed depth specified.

const totalBalance2 = accounts2.flatMap(current => current.movements);
console.log(totalBalance2);

// Honestly, it doesn't save much time from writing something like this below, but it is nice to have.
const totalBalance3 = accounts2.map(current => current.movements).flat();
console.log(totalBalance3);

// NOTES
// CHALLENGE 4
// Further analysis of dogs test data.

const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmation',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

// 1. Store the average weight of a Husky.
const huskyWeight = breeds.find(
  current => current.breed === 'Husky'
).averageWeight;
console.log(huskyWeight); // 26

// 2. Find the only breed of dog that likes both running and fetch as activities.
const dogBothActivities = breeds.find(
  current =>
    current.activities.includes('running') &&
    current.activities.includes('fetch')
);
console.log(dogBothActivities.breed); // Dalmation

// 3. Create an array containing all activities the dogs like.
const allActivities = breeds.flatMap(current => current.activities);
console.log(allActivities); // ['fetch', 'swimming', 'running', 'fetch', 'agility', 'swimming', 'fetch', 'digging', 'fetch', 'running', 'agility', 'swimming', 'sleeping', 'agility', 'fetch']

// 4. Create an array of all unique activities the dogs like.
const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities); // ['fetch', 'swimming', 'running', 'agility', 'digging', 'sleeping']

// 5. Find the activities dogs like to do as well as swimming.
const swimmingAdjacent = [
  ...new Set(
    breeds
      .filter(current => current.activities.includes('swimming'))
      .flatMap(current => current.activities)
      .filter(current => current !== 'swimming')
  ),
];
console.log(swimmingAdjacent); // ['fetch', 'running', 'agility']

// 6. Calculate if all breeds of dogs have an average weight of 10kg or more and log true or false
const allBreedsOver10kg = breeds.every(current => current.averageWeight >= 10);
console.log(allBreedsOver10kg); // true

// 7. Calculate if there are any breeds that are 'Active', that is doing 3 or more activities
const anyDogsActive = breeds.some(current => current.activities.length > 2);
console.log(anyDogsActive); // true

// BONUS. What is the average weight of the heaviest breed of dog that likes to fetch?
let heaviestFetcher = breeds.find(
  current =>
    current.averageWeight ===
    Math.max(
      ...breeds
        .filter(current => current.activities.includes('fetch'))
        .map(current => current.averageWeight)
    )
).breed;
console.log(heaviestFetcher); // German Shepherd

// NOTES
// SORTING ARRAYS

// We will often need to sort arrays in order to display data correctly etc. Sorting using the .sort() method will mutate the original array. Sorting will occur in numerical or alphabetical order, but the .'sort()' method does the sorting based on strings, so sorting numbers might not result in the results we expect.

// Sort converts everything to strings before it does the sorting, then it converts things back to what they were before.

// In the below example, it is easy to sort this array into alphabetical order. As the original array is mutated, we have to be very careful when using this method. It might be safer to create a shallow copy to work with.
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners); // ['Jonas', 'Zach', 'Adam', 'Martha']
console.log(owners.sort()); // ['Adam', 'Jonas', 'Martha', 'Zach']

// Sorting an array of numbers might result in an unexpected result. In fact, this result does make sense if we were dealing with the strings of each element, but it doesn't match up to our expectations of sorting numbers.
console.log(movements2); // [200, 450, -400, 3000, -650, 70, 1300]
console.log(movements2.sort()); // [-400, -650, 1300, 200, 3000, 450, 70]

// In order to fix this, we can pass a callback function into the '.sort()' method to tell it what to do. This callback function takes two arguements, which can be called anything, but represent the currentValue and the nextValue of the array.

// If the callback function returns less than 0, a will be placed before b, if it returns a positive value b will be placed before a

// return < 0: A before B (keep order)
// return > 0: B before A (switch order)

// This sort method would sort things in ascending order. The numbers specified as returns can be any number, what matters is whether this number is positive or negative.
movements2.sort((a, b) => {
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
});

// With this sort function, we get the result we expected.
console.log(movements2); // [-650, -400, 70, 200, 450, 1300, 3000]

// To change the order from ascending to descending, we would just switch the return statements around

movements2.sort((a, b) => {
  if (a > b) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
});
console.log(movements2); // [3000, 1300, 450, 200, 70, -400, -650]

// If an array has elements that hold the same value, nothing will happen to that element in relation to that other same value, therefore, they will be sorted into the same relative position in the array.
const movements3 = [-400, -650, 1300, 70, 200, 3000, 450, 70];
movements3.sort((a, b) => {
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
});
console.log(movements3); // [-650, -400, 70, 70, 200. 450, 1300, 3000]

// We can improve things dramatically by subtracting a from b, if a is greater than b, it will return a positive number, if b is greater than a, it will return a negative number. This allows us to write a much simpler version of the '.sort()' methods callback function.

// Ascending order
movements2.sort((a, b) => a - b);
console.log(movements2); // [-650, -400, 70, 200, 450, 1300, 3000]

// Descending order
movements2.sort((a, b) => b - a);
console.log(movements2); // [3000, 1300, 450, 200, 70, -400, -650]

// If we have a mixed array, we probably shouldn't use the '.sort()' method as it wouldn't work properly, and there isn't usually any point in doing so anyway.

// NOTES
// ARRAY GROUPING
