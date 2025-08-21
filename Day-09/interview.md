Welcome to Day 9 of your interview prep! Let's start with some fundamentals and then move into more advanced concepts.

---

### Question 1 (Basic)

1.  **Main Question**: Explain what destructuring assignment is in JavaScript and provide examples for both array and object destructuring.
2.  **Answer**:
    Destructuring assignment is a special syntax introduced in ES6 that allows you to unpack values from arrays or properties from objects into distinct variables. It provides a more concise and readable way to extract data.

    *   **Array Destructuring**: Unpacks values from an array based on their position.
    *   **Object Destructuring**: Unpacks properties from an object based on their property names.
3.  **Follow-up Questions**:
    *   Can you use destructuring to assign default values if a property or array element is `undefined`?
    *   How would you swap the values of two variables using array destructuring?
    *   Can you use destructuring for nested objects or arrays?
4.  **Follow-up Answers**:
    *   Yes, you can assign default values. If the source value is `undefined`, the default value will be used. For example: `const { name = 'Guest' } = user;` or `const [first, second = 0] = myArray;`.
    *   You can swap values concisely: `[a, b] = [b, a];`.
    *   Yes, destructuring supports nested structures, allowing you to extract values from deeply nested objects or arrays in a single line.
5.  **Code Example(s)**:

    ```javascript
    // Array Destructuring
    const colors = ['red', 'green', 'blue'];
    const [firstColor, secondColor, thirdColor] = colors;
    console.log(firstColor);  // Output: red

    // Object Destructuring
    const person = {
        name: 'Alice',
        age: 30,
        city: 'New York'
    };
    const { name, age } = person;
    console.log(name);    // Output: Alice
    console.log(age);     // Output: 30
    ```

---

### Question 2 (Basic)

1.  **Main Question**: What are Template Literals in JavaScript, and what advantages do they offer over traditional string concatenation?
2.  **Answer**:
    Template Literals (also known as template strings) are a feature introduced in ES6 that allow for easier string creation and manipulation. They are enclosed by backticks (`` ` ``) instead of single or double quotes. Their primary advantages are:

    *   **String Interpolation**: Allows embedding expressions directly within the string using `${expression}`.
    *   **Multi-line Strings**: Can span multiple lines without needing `\n` or concatenation.
    *   **Tagged Templates**: A more advanced feature that allows parsing template literals with a function.
3.  **Follow-up Questions**:
    *   Can you embed any JavaScript expression inside `${}` within a template literal?
    *   What happens if you try to use a traditional string (single or double quotes) across multiple lines without a newline character?
    *   Briefly explain what Tagged Templates are used for.
4.  **Follow-up Answers**:
    *   Yes, any valid JavaScript expression can be embedded, including variable names, arithmetic operations, function calls, etc.
    *   It will result in a `SyntaxError: Invalid or unexpected token`. Traditional strings must be on a single line or use `\n` for new lines.
    *   Tagged Templates allow you to parse a template literal with a function. The function receives an array of string parts and the values of the interpolated expressions. This is useful for tasks like safely escaping strings, internationalization (i18n), or creating domain-specific languages.
5.  **Code Example(s)**:

    ```javascript
    const name = 'Bob';
    const item = 'laptop';
    const price = 1200;

    // Traditional concatenation
    const oldMessage = "Hello, " + name + "! Your " + item + " costs $" + price + ".";
    console.log(oldMessage);

    // Using Template Literals
    const newMessage = `Hello, ${name}! Your ${item} costs $${price}.
    Thank you for your purchase!`; // Multi-line string
    console.log(newMessage);
    ```

---

### Question 3 (Basic)

1.  **Main Question**: Explain the difference between the `null` and `undefined` data types in JavaScript. When might you encounter each?
2.  **Answer**:
    Both `null` and `undefined` represent the absence of a meaningful value, but they convey different intentions:

    *   `**undefined**`: Indicates that a variable has been declared but has not yet been assigned a value. It's often the default value for uninitialized variables, function parameters that weren't provided, or non-existent object properties. It means "value not defined."
    *   `**null**`: Represents the intentional absence of any object value. It's a primitive value that you explicitly assign to a variable to signify "no value" or "empty." It means "no object."

    While `null == undefined` evaluates to `true` (loose equality), `null === undefined` evaluates to `false` (strict equality), highlighting their distinct types.
3.  **Follow-up Questions**:
    *   What is the `typeof` operator's return value for `null` and `undefined`?
    *   Are `null` and `undefined` considered "falsy" values in JavaScript?
    *   Can you think of a scenario where explicitly setting a variable to `null` would be beneficial?
4.  **Follow-up Answers**:
    *   `typeof undefined` returns `'undefined'`. `typeof null` unexpectedly returns `'object'` (this is a long-standing bug in JavaScript that was never fixed for backward compatibility).
    *   Yes, both `null` and `undefined` are among the six explicitly "falsy" values in JavaScript (along with `0`, `""`, `NaN`, and `false`).
    *   Setting a variable to `null` can be beneficial for garbage collection. If you have a variable holding a reference to a large object that is no longer needed, assigning `null` to that variable can help the garbage collector reclaim the memory associated with that object sooner, especially in long-running applications or when dealing with large data structures.
5.  **Code Example(s)**:

    ```javascript
    // Undefined examples
    let myVariable;
    console.log(myVariable); // Output: undefined

    function greet(name) {
        console.log(`Hello, ${name}!`);
    }
    greet(); // Output: Hello, undefined! (name is undefined)

    const obj = {};
    console.log(obj.nonExistentProperty); // Output: undefined

    // Null example
    let data = null;
    console.log(data); // Output: null

    // Comparison
    console.log(null == undefined); // Output: true
    console.log(null === undefined); // Output: false
    ```

---

### Question 4 (Basic)

1.  **Main Question**: Describe the purpose of the spread (`...`) syntax and the rest (`...`) parameters in JavaScript. Provide an example for each.
2.  **Answer**:
    Both the spread syntax and rest parameters use the same `...` notation, but they serve different purposes based on where they are used:

    *   **Spread Syntax**: Used to expand an iterable (like an array or string) into individual elements, or to expand an object into key-value pairs. It's useful for creating new arrays/objects, passing arguments to functions, or shallow copying.
    *   **Rest Parameters**: Used in function definitions to collect an indefinite number of arguments into an array. It allows a function to accept a variable number of arguments as an array.
3.  **Follow-up Questions**:
    *   What is the main difference in *where* spread syntax and rest parameters are used?
    *   Can you use the spread syntax to perform a deep copy of an array of objects? Why or why not?
    *   Can a function have multiple rest parameters?
4.  **Follow-up Answers**:
    *   Spread syntax is used when *calling* a function or *creating* an array/object literal (on the right-hand side of an assignment or as arguments). Rest parameters are used in a function's *parameter list* (on the left-hand side of a function definition).
    *   No, the spread syntax performs a shallow copy. If the array contains objects, only the references to those objects are copied, not the objects themselves. Modifying a nested object in the copied array would also modify it in the original.
    *   No, a function can only have one rest parameter, and it must be the last parameter in the function definition.
5.  **Code Example(s)**:

    ```javascript
    // Spread Syntax Example
    const arr1 = [1, 2, 3];
    const arr2 = [...arr1, 4, 5]; // Spreading arr1 into arr2
    console.log(arr2); // Output: [1, 2, 3, 4, 5]

    const obj1 = { a: 1, b: 2 };
    const obj2 = { ...obj1, c: 3 }; // Spreading obj1 into obj2
    console.log(obj2); // Output: { a: 1, b: 2, c: 3 }

    // Rest Parameters Example
    function sumAll(...numbers) { // numbers is a rest parameter
        return numbers.reduce((total, num) => total + num, 0);
    }
    console.log(sumAll(1, 2, 3)); // Output: 6
    console.log(sumAll(10, 20, 30, 40)); // Output: 100
    ```

---

### Question 5 (Intermediate)

1.  **Main Question**: Explain the purpose of the `Array.prototype.filter()` method. How does it differ from `Array.prototype.map()` and `Array.prototype.forEach()`?
2.  **Answer**:
    `Array.prototype.filter()` is a higher-order array method that creates a **new array** containing all elements from the original array that satisfy a provided test function. The test function returns `true` for elements to be included and `false` for elements to be excluded.

    *   **`filter()` vs `map()`**: `filter()` returns a *subset* of the original array's elements, while `map()` returns a *new array of the same length* with each element transformed by the callback function.
    *   **`filter()` vs `forEach()`**: `filter()` returns a *new array* based on a condition, whereas `forEach()` iterates over the array elements and *does not return anything* (implicitly `undefined`). `forEach()` is typically used for side effects, like logging or modifying external state.
3.  **Follow-up Questions**:
    *   What happens if no elements in the original array satisfy the condition provided to `filter()`?
    *   Does `filter()` modify the original array?
    *   Can you chain `filter()` with other array methods like `map()` or `reduce()`?
4.  **Follow-up Answers**:
    *   If no elements satisfy the condition, `filter()` will return an empty array (`[]`).
    *   No, `filter()` (like `map()` and `reduce()`) is a non-mutating method. It always returns a new array, leaving the original array unchanged.
    *   Yes, `filter()` returns a new array, which means you can chain other array methods directly onto its result, such as `myArray.filter(...).map(...).reduce(...)`.
5.  **Code Example(s)**:

    ```javascript
    const numbers = [1, 2, 3, 4, 5, 6];

    // Using filter() to get even numbers
    const evenNumbers = numbers.filter(num => num % 2 === 0);
    console.log(evenNumbers); // Output: [2, 4, 6]
    console.log(numbers);     // Output: [1, 2, 3, 4, 5, 6] (original array unchanged)

    // Compare with map() and forEach()
    const doubledNumbers = numbers.map(num => num * 2);
    console.log(doubledNumbers); // Output: [2, 4, 6, 8, 10, 12]

    numbers.forEach(num => console.log(`Number: ${num}`)); // No return value, just side effect
    ```

---

### Question 6 (Intermediate)

1.  **Main Question**: Discuss the differences between CommonJS modules (used primarily in Node.js) and ES Modules (ESM, used in modern browsers and increasingly in Node.js). Focus on their syntax and how they handle imports/exports.
2.  **Answer**:
    **CommonJS Modules** (e.g., in Node.js by default):
    *   **Syntax**: Uses `require()` for importing and `module.exports` or `exports` for exporting.
    *   **Loading**: Synchronous loading. When you `require()` a module, it's loaded and executed immediately.
    *   **Nature**: Modules are loaded as objects, and exports are copies of the values, not live bindings.
    *   **Usage**: Predominantly used in Node.js applications.

    **ES Modules (ESM)** (e.g., in browsers, Node.js with `.mjs` or `"type": "module"` in `package.json`):
    *   **Syntax**: Uses `import` for importing and `export` for exporting.
    *   **Loading**: Asynchronous loading. The module graph is built before execution.
    *   **Nature**: Exports are live bindings (references) to the original variables, not copies.
    *   **Usage**: Standard for web browsers, gaining traction in Node.js. Supports static analysis.
3.  **Follow-up Questions**:
    *   Can you mix CommonJS and ES Modules in the same Node.js project? What are the considerations?
    *   What is the benefit of ES Modules having "live bindings" for exports?
    *   Why is the synchronous loading of CommonJS a potential issue for browser environments?
4.  **Follow-up Answers**:
    *   Yes, Node.js has interoperability features. An ESM module can `import` a CommonJS module, but a CommonJS module cannot directly `require()` an ESM module (though dynamic `import()` can be used). Considerations involve file extensions (`.mjs` for ESM, `.cjs` for CommonJS) and the `"type": "module"` field in `package.json`.
    *   Live bindings mean that if an exported variable's value changes in the exporting module, that change is reflected in the importing module. This is useful for things like constants, shared state, or ensuring consistency across modules.
    *   Synchronous loading would block the main thread of the browser, leading to a frozen UI and poor user experience, especially if modules are large or require network requests. Asynchronous loading allows the browser to continue rendering while modules are fetched and parsed.
5.  **Code Example(s)**:

    ```javascript
    // CommonJS (e.g., in Node.js file: myModule.js)
    // --- myModule.js ---
    const PI = 3.14159;
    function add(a, b) {
        return a + b;
    }
    module.exports = { PI, add };

    // --- app.js ---
    const { PI, add } = require('./myModule');
    console.log(PI); // 3.14159
    console.log(add(2, 3)); // 5

    // ES Modules (e.g., in Node.js with "type": "module" or browser JS file: myESModule.mjs)
    // --- myESModule.mjs ---
    export const GREETING = 'Hello, ESM!';
    export function multiply(a, b) {
        return a * b;
    }

    // --- app.mjs ---
    import { GREETING, multiply } from './myESModule.mjs';
    console.log(GREETING); // Hello, ESM!
    console.log(multiply(4, 5)); // 20
    ```

---

### Question 7 (Intermediate)

1.  **Main Question**: What is "Strict Mode" in JavaScript, and why would you use `'use strict'`? List at least three specific changes or restrictions it introduces.
2.  **Answer**:
    Strict Mode is a way to opt into a restricted variant of JavaScript. It eliminates some JavaScript silent errors by changing them to throw errors, fixes mistakes that make it difficult for JavaScript engines to perform optimizations, and prohibits some syntax likely to be defined in future versions of ECMAScript. You enable it by placing the string literal `'use strict'` at the beginning of a script or a function.

    **Three changes/restrictions it introduces:**
    1.  **Eliminates "sloppy mode" global variables**: Variables must be explicitly declared (with `var`, `let`, or `const`). Assigning to an undeclared variable will throw a `ReferenceError`.
    2.  **Disallows `with` statement**: The `with` statement is forbidden due to performance and security implications.
    3.  **Disallows deletion of undeletable properties**: Attempting to delete a non-configurable property (like `Object.prototype`) will throw a `TypeError`.
    4.  **`this` value in functions**: In non-strict mode, `this` inside a function called without an explicit context (e.g., `myFunction()`) defaults to the global object (`window` in browsers, `global` in Node.js). In strict mode, `this` will be `undefined`.
    5.  **Disallows duplicate parameter names**: Functions with multiple parameters of the same name will throw a `SyntaxError`.
3.  **Follow-up Questions**:
    *   Can strict mode be applied to only a portion of a JavaScript file, or does it affect the entire file?
    *   Does strict mode affect how `eval()` behaves?
    *   Is strict mode generally recommended for modern JavaScript development?
4.  **Follow-up Answers**:
    *   Strict mode can be applied to an entire script file (by placing `'use strict'` at the very top) or to individual functions (by placing it at the top of the function body). If applied to a function, only that function's code operates in strict mode.
    *   Yes, `eval()` behaves differently in strict mode. Variables and function declarations inside `eval()`'s strict-mode code are not created in the surrounding scope, which helps prevent name collisions and makes code more predictable.
    *   Yes, it is highly recommended. Modern JavaScript frameworks and libraries often enforce or implicitly operate in strict mode. It leads to more robust, secure, and performant code by catching common errors early and making JavaScript behavior more predictable.
5.  **Code Example(s)**:

    ```javascript
    // Example 1: Undeclared variable (will throw error in strict mode)
    function strictFunction() {
        'use strict';
        // myVar = 10; // This line would throw a ReferenceError in strict mode
        // console.log(myVar);
    }
    // strictFunction();

    // Example 2: 'this' in strict vs non-strict
    function showThis() {
        console.log(this);
    }

    function showThisStrict() {
        'use strict';
        console.log(this);
    }

    showThis();         // Output: <global object like Window or global>
    showThisStrict();   // Output: undefined
    ```

---

### Question 8 (Hard/Advanced)

1.  **Main Question**: Explain the concept of Promises in JavaScript. How do they help manage asynchronous operations more effectively than traditional callbacks, and what are their three possible states?
2.  **Answer**:
    A Promise in JavaScript is an object representing the eventual completion or failure of an asynchronous operation and its resulting value. It acts as a placeholder for a value that is not yet known. Promises provide a more structured and readable way to handle asynchronous code compared to nested callbacks (callback hell).

    **How they help**:
    *   **Avoids Callback Hell**: Promises allow chaining `.then()` calls, creating a linear flow for sequential asynchronous operations, which is much more readable than deeply nested callbacks.
    *   **Error Handling**: Promises provide a unified error-handling mechanism via `.catch()` or the second argument of `.then()`, allowing errors from any part of the chain to be caught at a single point.
    *   **Composability**: Promises can be easily combined using methods like `Promise.all()` or `Promise.race()` to manage multiple asynchronous operations concurrently.

    **Three possible states of a Promise**:
    1.  **Pending**: Initial state, neither fulfilled nor rejected. The asynchronous operation is still in progress.
    2.  **Fulfilled (or Resolved)**: The operation completed successfully, and the promise has a resulting value.
    3.  **Rejected**: The operation failed, and the promise has a reason for the failure (an error object).
    A promise can only transition from `pending` to either `fulfilled` or `rejected` once, and then it becomes immutable (settled).
3.  **Follow-up Questions**:
    *   What is the purpose of `Promise.resolve()` and `Promise.reject()`?
    *   Can a promise be settled multiple times, and if so, what happens?
    *   How do you propagate values or errors through a Promise chain?
4.  **Follow-up Answers**:
    *   `Promise.resolve(value)` returns a Promise object that is resolved with the given `value`. It's useful for creating an already-resolved promise. `Promise.reject(reason)` returns a Promise object that is rejected with the given `reason`. Both are useful for converting non-Promise values into Promises or for testing.
    *   No, a promise can only be settled once (either fulfilled or rejected). Once settled, its state becomes immutable, and any subsequent attempts to resolve or reject it will be ignored.
    *   Values are propagated through the chain by returning them from the `.then()` callback. The returned value (or a promise) becomes the resolved value for the next `.then()` in the chain. Errors are propagated by throwing an error inside a `.then()` callback or by returning a rejected promise, which is then caught by the nearest `.catch()` handler.
5.  **Code Example(s)**:

    ```javascript
    // Creating and using a Promise
    const fetchData = new Promise((resolve, reject) => {
        const success = true; // Simulate async operation success/failure
        setTimeout(() => {
            if (success) {
                resolve('Data fetched successfully!');
            } else {
                reject('Error fetching data.');
            }
        }, 1000);
    });

    fetchData
        .then(message => {
            console.log(message); // Output: Data fetched successfully!
            return 'Processing complete.'; // Pass value to next .then
        })
        .then(nextMessage => {
            console.log(nextMessage); // Output: Processing complete.
        })
        .catch(error => {
            console.error('Caught an error:', error);
        });

    // Example of a rejected promise
    const alwaysFails = Promise.reject(new Error('Something went wrong!'));
    alwaysFails.catch(err => console.error('Caught by alwaysFails:', err.message));
    ```

---

### Question 9 (Hard/Advanced)

1.  **Main Question**: Explain the difference between `Promise.all()` and `Promise.race()`. When would you use one over the other?
2.  **Answer**:
    Both `Promise.all()` and `Promise.race()` are static methods on the `Promise` object that take an iterable (like an array) of Promises as input and return a single Promise.

    *   **`Promise.all()`**:
        *   **Purpose**: Waits for *all* the input promises to settle (either fulfill or reject).
        *   **Resolution**: If all input promises fulfill, the `Promise.all()` promise fulfills with an array of their fulfilled values, in the same order as the input promises.
        *   **Rejection**: If *any* of the input promises reject, the `Promise.all()` promise immediately rejects with the reason of the *first* promise that rejected.
        *   **Use Case**: When you need to perform multiple independent asynchronous operations and wait for all of them to complete successfully before proceeding (e.g., loading multiple resources for a page).

    *   **`Promise.race()`**:
        *   **Purpose**: Waits for *any* of the input promises to settle (either fulfill or reject).
        *   **Resolution/Rejection**: The `Promise.race()` promise settles (fulfills or rejects) with the value or reason of the *first* promise in the iterable that settles.
        *   **Use Case**: When you need to perform multiple asynchronous operations and you only care about the result of the one that finishes first (e.g., fetching data from multiple sources and using the fastest response, or implementing a timeout for a promise).
3.  **Follow-up Questions**:
    *   What happens if the iterable passed to `Promise.all()` or `Promise.race()` is empty?
    *   Does `Promise.all()` stop executing other promises if one of them rejects?
    *   Are there other similar `Promise` combinator methods, and what are they used for?
4.  **Follow-up Answers**:
    *   If an empty iterable is passed to `Promise.all()`, it immediately returns a fulfilled promise with an empty array `[]`. If an empty iterable is passed to `Promise.race()`, it returns a promise that will forever remain pending (it will never settle).
    *   No, `Promise.all()` does not stop the execution of other promises if one of them rejects. All promises in the iterable will continue to run to completion, but `Promise.all()` itself will settle (reject) as soon as the first promise rejects.
    *   Yes, `Promise.any()` (ES2021) waits for the first promise to fulfill, ignoring rejections until all promises have rejected. `Promise.allSettled()` (ES2020) waits for all promises to settle (either fulfill or reject) and returns an array of objects describing the outcome of each promise.
5.  **Code Example(s)**:

    ```javascript
    const p1 = new Promise(resolve => setTimeout(() => resolve('P1 resolved'), 100));
    const p2 = new Promise((_, reject) => setTimeout(() => reject('P2 rejected'), 50));
    const p3 = new Promise(resolve => setTimeout(() => resolve('P3 resolved'), 200));

    // Promise.all() example
    Promise.all([p1, p3])
        .then(results => console.log('All resolved:', results)) // Output: All resolved: ['P1 resolved', 'P3 resolved']
        .catch(error => console.error('All rejected:', error));

    Promise.all([p1, p2, p3])
        .then(results => console.log('All resolved (with rejection):', results))
        .catch(error => console.error('All rejected (with rejection):', error)); // Output: All rejected (with rejection): P2 rejected

    // Promise.race() example
    Promise.race([p1, p2, p3])
        .then(result => console.log('Race winner:', result))
        .catch(error => console.error('Race loser:', error)); // Output: Race loser: P2 rejected (because p2 rejected first)
    ```

---

### Question 10 (Hard/Advanced)

1.  **Main Question**: In Node.js, what is the `process` object, and what are some of its key properties or methods that developers commonly interact with?
2.  **Answer**:
    The `process` object is a global object in Node.js (meaning it's available everywhere without needing to `require` it) that provides information about, and control over,