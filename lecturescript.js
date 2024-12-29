// NOTES
// WORKING WITH ARRAYS
// How and when to use arrays while building a visual banking app type project.

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
// FOREACH WITH SETS AND MAPS
