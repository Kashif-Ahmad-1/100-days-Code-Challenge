Welcome to Day 11 of your interview prep! We've covered a good range of fundamentals so far. Today, let's dive a bit deeper into some core JavaScript concepts and touch upon a few Node.js specifics. Ready?

---

### 1. Main Question: Explain the concept of explicit type conversion (type casting) in JavaScript. Provide examples of converting a string to a number and a number to a string.

**Answer**:
Explicit type conversion, also known as type casting, is when a programmer intentionally converts a value from one data type to another using built-in functions or operators. This is in contrast to implicit type coercion, where JavaScript automatically converts types. Explicit conversion gives you direct control over the type transformation process.

**Follow-up Questions**:
1.  What are some common methods for explicit type conversion in JavaScript?
2.  What happens if you try to convert a non-numeric string (e.g., "hello") to a number using `Number()` or `parseInt()`?
3.  Why is explicit type conversion often preferred over relying on implicit coercion?

**Follow-up Answers**:
1.  Common methods for explicit type conversion include:
    *   To Number: `Number()`, `parseInt()`, `parseFloat()`, unary plus (`+`).
    *   To String: `String()`, `toString()`, string concatenation (`"" + value`).
    *   To Boolean: `Boolean()`, double negation (`!!`).
2.  If you try to convert a non-numeric string like `"hello"` to a number:
    *   `Number("hello")` will result in `NaN` (Not-a-Number).
    *   `parseInt("hello")` will also result in `NaN` because it cannot parse an integer from the beginning of the string. `parseInt("123hello")` would return `123`.
3.  Explicit type conversion is often preferred because it makes the code's intent clear and predictable. Relying on implicit coercion can sometimes lead to unexpected behavior and subtle bugs, as the rules for coercion can be complex and not always intuitive. It improves code readability and maintainability.

**Code Example(s)**:

```javascript
// Converting a string to a number
let strNum = "123";
let num1 = Number(strNum);      // Using Number() constructor
let num2 = parseInt(strNum);    // Using parseInt()
let num3 = +strNum;             // Using unary plus operator

console.log(num1, typeof num1); // Output: 123 'number'
console.log(num2, typeof num2); // Output: 123 'number'
console.log(num3, typeof num3); // Output: 123 'number'

// Converting a number to a string
let myNumber = 456;
let str1 = String(myNumber);    // Using String() constructor
let str2 = myNumber.toString(); // Using toString() method
let str3 = myNumber + "";       // Using string concatenation

console.log(str1, typeof str1); // Output: 456 'string'
console.log(str2, typeof str2); // Output: 456 'string'
console.log(str3, typeof str3); // Output: 456 'string'
```

---

### 2. Main Question: What is the `arguments` object in JavaScript functions, and how is it typically used?

**Answer**:
The `arguments` object is a local variable available within all non-arrow functions. It's an array-like object (not a true array) that contains all the arguments passed to that function, regardless of whether they were explicitly declared in the function's parameter list. It allows a function to be called with more arguments than it formally declared.

**Follow-up Questions**:
1.  Why is the `arguments` object considered "array-like" but not a true array? What are the implications of this?
2.  Can the `arguments` object be used in arrow functions? Why or why not?
3.  What is the modern ES6 alternative to using the `arguments` object for handling an indefinite number of arguments?

**Follow-up Answers**:
1.  It's array-like because it has a `length` property and you can access individual arguments using bracket notation (e.g., `arguments[0]`). However, it doesn't have array methods like `forEach()`, `map()`, `pop()`, etc. To use array methods, you'd typically convert it to a real array using `Array.from(arguments)` or the spread operator `[...arguments]`.
2.  No, the `arguments` object is not available in arrow functions. Arrow functions do not have their own `this` binding, `super`, `new.target`, or `arguments` object. They inherit these from their enclosing lexical scope.
3.  The modern ES6 alternative is the rest parameter syntax (`...args`). This creates a *real* array of arguments, making it more convenient and explicit than the `arguments` object.

**Code Example(s)**:

```javascript
function sumAll() {
  let total = 0;
  // arguments object is array-like, can be iterated with a for loop
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

console.log(sumAll(1, 2, 3));        // Output: 6
console.log(sumAll(10, 20, 30, 40)); // Output: 100

// Converting arguments to a real array to use array methods
function logAndSum() {
  const argsArray = Array.from(arguments); // Convert to array
  console.log("Arguments:", argsArray);
  const sum = argsArray.reduce((acc, curr) => acc + curr, 0);
  return sum;
}

console.log(logAndSum(5, 5, 5)); // Output: Arguments: [5, 5, 5] \n 15
```

---

### 3. Main Question: Explain the purpose and usage of `JSON.stringify()` and `JSON.parse()` methods in JavaScript.

**Answer**:
`JSON` (JavaScript Object Notation) is a lightweight data-interchange format.
*   `JSON.stringify()`: This method converts a JavaScript value (object or array) into a JSON string. This is crucial when sending data to a web server, storing data in web storage (like `localStorage`), or exchanging data between different systems, as JSON is a universally accepted text format.
*   `JSON.parse()`: This method parses a JSON string, constructing the JavaScript value or object described by the string. This is used when receiving JSON data from a server or retrieving data from `localStorage` to convert it back into a usable JavaScript object.

**Follow-up Questions**:
1.  What types of JavaScript values can `JSON.stringify()` successfully convert? Are there any limitations or values it cannot stringify?
2.  What happens if the string passed to `JSON.parse()` is not valid JSON?
3.  Can you explain a common use case for these methods in web development?

**Follow-up Answers**:
1.  `JSON.stringify()` can successfully convert primitive values (strings, numbers, booleans, `null`), plain objects, and arrays. It cannot stringify functions, `undefined`, `Symbol` values, or circular references. When it encounters these, they are either skipped (for object properties) or converted to `null` (for array elements).
2.  If the string passed to `JSON.parse()` is not valid JSON, it will throw a `SyntaxError`. This is why it's often used within a `try...catch` block when parsing external or user-provided data.
3.  A very common use case is storing and retrieving complex data in `localStorage`. `localStorage` can only store strings, so you `JSON.stringify()` your JavaScript objects/arrays before saving them, and `JSON.parse()` them back into objects/arrays when retrieving them.

**Code Example(s)**:

```javascript
// Example 1: Using JSON.stringify() to convert an object to a JSON string
const user = {
  name: "Alice",
  age: 30,
  isAdmin: false,
  roles: ["admin", "editor"],
  address: {
    city: "New York",
    zip: "10001"
  }
};

const jsonString = JSON.stringify(user);
console.log(jsonString);
// Output: {"name":"Alice","age":30,"isAdmin":false,"roles":["admin","editor"],"address":{"city":"New York","zip":"10001"}}
console.log(typeof jsonString); // Output: string

// Example 2: Using JSON.parse() to convert a JSON string back to a JavaScript object
const receivedJson = '{"product":"Laptop","price":1200,"available":true}';
const productObject = JSON.parse(receivedJson);
console.log(productObject);
// Output: { product: 'Laptop', price: 1200, available: true }
console.log(typeof productObject); // Output: object

// Example with a value that cannot be stringified
const dataWithFunction = {
  id: 1,
  greet: function() { console.log("Hello"); }
};
const stringifiedWithFunction = JSON.stringify(dataWithFunction);
console.log(stringifiedWithFunction); // Output: {"id":1} (function was skipped)
```

---

### 4. Main Question: Describe the purpose of `Object.keys()`, `Object.values()`, and `Object.entries()` methods in JavaScript.

**Answer**:
These are static methods of the global `Object` constructor that provide ways to iterate over the properties of an object:
*   `Object.keys(obj)`: Returns an array of a given object's own enumerable property names (keys).
*   `Object.values(obj)`: Returns an array of a given object's own enumerable property values.
*   `Object.entries(obj)`: Returns an array of a given object's own enumerable string-keyed property `[key, value]` pairs.

They are useful for iterating over object data, transforming objects, or performing operations on specific parts (keys, values, or both).

**Follow-up Questions**:
1.  What does "enumerable property" mean in the context of these methods?
2.  How would you use `Object.entries()` with a `for...of` loop to iterate over an object's properties?
3.  If you have an object and want to create a new object where all values are uppercase, which method would you likely combine with `Array.prototype.reduce()`?

**Follow-up Answers**:
1.  An "enumerable property" is a property that can be iterated over by methods like `for...in` loops or `Object.keys()`, `Object.values()`, `Object.entries()`. Most properties created in JavaScript are enumerable by default, but some built-in properties or properties defined with `Object.defineProperty()` might be non-enumerable.
2.  You would use `Object.entries()` with a `for...of` loop like this:
    ```javascript
    const myObject = { a: 1, b: 2 };
    for (const [key, value] of Object.entries(myObject)) {
      console.log(`${key}: ${value}`);
    }
    // Output:
    // a: 1
    // b: 2
    ```
3.  You would likely combine `Object.entries()` to get key-value pairs, then use `Array.prototype.reduce()` to build a new object. `Object.fromEntries()` (ES2019) would also be very useful here to convert the processed array of entries back into an object.

**Code Example(s)**:

```javascript
const car = {
  make: "Toyota",
  model: "Camry",
  year: 2020,
  color: "blue"
};

// Object.keys()
const keys = Object.keys(car);
console.log("Keys:", keys); // Output: Keys: [ 'make', 'model', 'year', 'color' ]

// Object.values()
const values = Object.values(car);
console.log("Values:", values); // Output: Values: [ 'Toyota', 'Camry', 2020, 'blue' ]

// Object.entries()
const entries = Object.entries(car);
console.log("Entries:", entries);
// Output: Entries: [ [ 'make', 'Toyota' ], [ 'model', 'Camry' ], [ 'year', 2020 ], [ 'color', 'blue' ] ]

// Example: Iterating with Object.entries()
for (const [key, value] of Object.entries(car)) {
  console.log(`The ${key} of the car is ${value}.`);
}
/* Output:
The make of the car is Toyota.
The model of the car is Camry.
The year of the car is 2020.
The color of the car is blue.
*/
```

---

### 5. Main Question: Explain the purpose and differences between `call()`, `apply()`, and `bind()` methods in JavaScript.

**Answer**:
`call()`, `apply()`, and `bind()` are methods available on all JavaScript functions (they are methods of `Function.prototype`). Their primary purpose is to control the `this` context within a function, and to pass arguments to that function.

*   `call(thisArg, arg1, arg2, ...)`: Invokes the function immediately with a specified `this` value and arguments provided individually.
*   `apply(thisArg, [argsArray])`: Invokes the function immediately with a specified `this` value and arguments provided as an array (or array-like object).
*   `bind(thisArg, arg1, arg2, ...)`: Returns a *new* function with a specified `this` context and optionally pre-set arguments. It does *not* invoke the function immediately.

**Follow-up Questions**:
1.  When would you choose `call()` over `apply()`, or vice-versa?
2.  Provide a scenario where `bind()` would be particularly useful.
3.  How do these methods relate to the concept of function borrowing?

**Follow-up Answers**:
1.  You would choose `call()` when you know the number of arguments and can pass them individually. You would choose `apply()` when you have an array of arguments or an unknown number of arguments (e.g., from the `arguments` object or a dynamic list).
2.  `bind()` is particularly useful in event handling or when dealing with callbacks where the `this` context needs to be preserved. For example, when passing an object method as an event listener, `bind()` can ensure `this` inside the method refers to the object, not the event target. It's also used for partial function application (currying).
3.  These methods facilitate "function borrowing," where you can use a method from one object on another object. For example, `Array.prototype.slice.call(arguments)` allows an array method (`slice`) to be used on an array-like object (`arguments`), effectively converting it into a true array.

**Code Example(s)**:

```javascript
const person = {
  name: "Alice",
  greet: function(greeting, punctuation) {
    console.log(`${greeting}, my name is ${this.name}${punctuation}`);
  }
};

const anotherPerson = {
  name: "Bob"
};

// Using call(): arguments passed individually
person.greet.call(anotherPerson, "Hello", "!"); // Output: Hello, my name is Bob!

// Using apply(): arguments passed as an array
person.greet.apply(anotherPerson, ["Hi", "."]); // Output: Hi, my name is Bob.

// Using bind(): returns a new function, doesn't execute immediately
const greetBob = person.greet.bind(anotherPerson, "Bonjour");
greetBob("!"); // Output: Bonjour, my name is Bob!

// Example of bind in an event listener context (conceptual)
/*
const button = document.getElementById('myButton');
const handler = {
  message: 'Button clicked!',
  handleClick: function() {
    console.log(this.message); // 'this' refers to 'handler' object
  }
};
// Without bind, 'this' in handleClick would refer to the button element
button.addEventListener('click', handler.handleClick.bind(handler));
*/
```

---

### 6. Main Question: Describe the purpose of JavaScript's `Set` and `Map` objects. When would you use a `Set` over an `Array`, and a `Map` over a plain `Object`?

**Answer**:
`Set` and `Map` are new built-in object types introduced in ES6 for storing collections of data.

*   **`Set`**: A collection of unique values. Each value can only occur once in a `Set`. It's useful for storing lists where duplicate items are not allowed, or for quickly removing duplicates from an existing array.
*   **`Map`**: A collection of key-value pairs where keys can be of any data type (unlike plain objects, where keys must be strings or Symbols). It's useful when you need to store data with non-string keys, or when the order of insertion matters (Maps maintain insertion order).

**When to use `Set` over `Array`**:
*   When you need to store a collection of unique items and automatically handle duplicates.
*   When you need to quickly check for the presence of an item (`set.has()`).
*   When the order of items is not strictly critical for access (though Set does maintain insertion order).

**When to use `Map` over plain `Object`**:
*   When you need keys that are not strings or Symbols (e.g., an object as a key).
*   When you need to preserve the insertion order of key-value pairs.
*   When you frequently add or remove key-value pairs.
*   When you need to iterate over key-value pairs easily (`map.forEach()`, `map.entries()`).
*   When performance for frequent additions/deletions or large numbers of items is a concern (Maps can be more performant for these scenarios).

**Follow-up Questions**:
1.  How do you add and remove elements from a `Set`? How do you check if an element exists?
2.  What is the main advantage of using an object as a key in a `Map`?
3.  Can `Set` and `Map` store `null` or `undefined` as values/keys?

**Follow-up Answers**:
1.  To add elements to a `Set`, use `set.add(value)`. To remove elements, use `set.delete(value)`. To check if an element exists, use `set.has(value)`.
2.  The main advantage is that `Map` uses strict equality (`===`) to compare keys. This means you can use actual object references as keys, and a `Map` will distinguish between two different object instances, even if they have identical content. Plain objects convert all keys to strings.
3.  Yes, `Set` can store `null` and `undefined` as values. `Map` can store `null` and `undefined` as both keys and values.

**Code Example(s)**:

```javascript
// Example 1: Using Set for unique values
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = new Set(numbers);
console.log("Unique numbers:", [...uniqueNumbers]); // Output: Unique numbers: [ 1, 2, 3, 4, 5 ]

uniqueNumbers.add(6);
console.log("After adding 6:", uniqueNumbers.has(6)); // Output: After adding 6: true
uniqueNumbers.delete(2);
console.log("After deleting 2:", uniqueNumbers); // Output: Set(4) { 1, 3, 4, 5, 6 }

// Example 2: Using Map for custom keys and ordered data
const user1 = { id: 1 };
const user2 = { id: 2 };

const userRoles = new Map();
userRoles.set(user1, "Admin");
userRoles.set(user2, "Editor");
userRoles.set("guest", "Viewer"); // String key also works

console.log("Role of user1:", userRoles.get(user1)); // Output: Role of user1: Admin
console.log("Role of guest:", userRoles.get("guest")); // Output: Role of guest: Viewer

userRoles.forEach((role, user) => {
  console.log(`${typeof user === 'object' ? `User ${user.id}` : user} has role: ${role}`);
});
/* Output:
User 1 has role: Admin
User 2 has role: Editor
guest has role: Viewer
*/
```

---

### 7. Main Question: What is recursion in JavaScript, and when might you use it? Provide a simple example.

**Answer**:
Recursion is a programming technique where a function calls itself directly or indirectly to solve a problem. It's often used when a problem can be broken down into smaller, self-similar sub-problems. A recursive function must have a "base case" – a condition under which the function stops calling itself to prevent infinite loops.

You might use recursion when:
*   Dealing with hierarchical or tree-like data structures (e.g., traversing a DOM tree, file system navigation).
*   Solving problems that can be defined in terms of themselves (e.g., factorial calculation, Fibonacci sequence, traversing nested objects).
*   Certain algorithms are naturally expressed recursively (e.g., quicksort, mergesort, depth-first search).

**Follow-up Questions**:
1.  What is the most critical component of a recursive function to prevent an infinite loop?
2.  What is "stack overflow" in the context of recursion, and why does it happen?
3.  Can every recursive function be rewritten iteratively? If so, what are the trade-offs?

**Follow-up Answers**:
1.  The most critical component is the "base case." This is the condition that tells the function when to stop recursing and start returning values, ensuring the function eventually terminates.
2.  "Stack overflow" occurs when a recursive function calls itself too many times without reaching a base case, causing the call stack to exceed its maximum size. Each function call adds a new frame to the call stack; too many frames lead to an overflow.
3.  Yes, theoretically, every recursive function can be rewritten iteratively using loops and potentially a stack data structure to manage state. The trade-offs are often readability (recursive solutions can be more elegant for certain problems) versus performance and memory usage (iterative solutions might be more efficient in terms of stack space and sometimes speed).

**Code Example(s)**:

```javascript
// Example 1: Calculating factorial using recursion
function factorial(n) {
  // Base case: if n is 0 or 1, factorial is 1
  if (n === 0 || n === 1) {
    return 1;
  }
  // Recursive step: n * factorial of (n-1)
  return n * factorial(n - 1);
}

console.log("Factorial of 5:", factorial(5)); // Output: Factorial of 5: 120 (5 * 4 * 3 * 2 * 1)
console.log("Factorial of 0:", factorial(0)); // Output: Factorial of 0: 1

// Example 2: Summing elements in a nested array
function sumNestedArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      sum += sumNestedArray(arr[i]); // Recursive call for nested arrays
    } else {
      sum += arr[i];
    }
  }
  return sum;
}

const nestedArr = [1, [2, 3], 4, [5, [6, 7]]];
console.log("Sum of nested array:", sumNestedArray(nestedArr)); // Output: Sum of nested array: 28
```

---

### 8. Main Question: What is event delegation in JavaScript, and what are its benefits? Provide an example.

**Answer**:
Event delegation is a technique where you attach a single event listener to a common parent element, rather than attaching individual event listeners to multiple child elements. When an event (like a click) occurs on a child element, it "bubbles up" to its parent, where the single listener catches it. The listener then uses `event.target` to identify which specific child element triggered the event and responds accordingly.

**Benefits**:
1.  **Performance**: Reduces the number of event listeners, which saves memory and improves performance, especially with many dynamic or frequently changing elements.
2.  **Dynamic Elements**: Automatically handles events for elements that are added to the DOM after the initial page load, without needing to attach new listeners.
3.  **Simpler Code**: Leads to cleaner, more concise, and easier-to-manage code, as you only need to manage one listener.

**Follow-up Questions**:
1.  What is "event bubbling," and how is it fundamental to event delegation?
2.  Are there any scenarios where event delegation might not be the best approach?
3.  How does `event.target` differ from `this` (or `event.currentTarget`) in an event delegation scenario?

**Follow-up Answers**:
1.  Event bubbling is the process where an event, when triggered on an element, first executes on that element, then on its immediate parent, then its grandparent, and so on, up the DOM tree to the `document` object. Event delegation relies on this bubbling phase to allow a single listener on a parent to capture events originating from its descendants.
2.  Event delegation might not be ideal if:
    *   The parent element has many events that need to be handled differently, leading to complex conditional logic within the single listener.
    *   You need to stop the event propagation very early, before it reaches the delegated parent (though `event.stopPropagation()` can be used).
    *   The event does not bubble (e.g., `focus`, `blur` by default).
3.  In an event listener:
    *   `event.target`: Refers to the *actual element* on which the event *originally occurred* (the deepest element in the DOM tree).
    *   `this` (or `event.currentTarget`): Refers to the