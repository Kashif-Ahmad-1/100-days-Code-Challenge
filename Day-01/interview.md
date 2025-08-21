Welcome to Day 1 of your interview prep! It's great to have you here. Today, we'll dive into some fundamental concepts in JavaScript and Node.js. Don't worry, we'll start with the basics and gradually ramp up the difficulty. Think of this as a friendly discussion to gauge your understanding.

Let's begin!

---

### **Question 1: Basic**

1.  **Main Question**: Can you explain the key differences between `var`, `let`, and `const` in JavaScript?
2.  **Answer**:
    *   **`var`**: Function-scoped and hoisted. Variables declared with `var` are accessible throughout the function they are declared in, regardless of block scope. They are also "hoisted" to the top of their function or global scope, meaning you can use them before they are declared (though their value will be `undefined` until the declaration is reached).
    *   **`let`**: Block-scoped and not hoisted (in the sense that they are in a "temporal dead zone"). `let` limits the variable's scope to the block (e.g., inside `if` statements, `for` loops, or curly braces `{}`) where it is declared. You cannot access a `let` variable before its declaration in code.
    *   **`const`**: Block-scoped and not hoisted, similar to `let`. The main difference is that `const` declares a constant, meaning its value cannot be reassigned after initialization. However, for objects and arrays declared with `const`, their *properties* or *elements* can still be modified.
3.  **Follow-up Questions**:
    *   Which keyword would you typically use for loop counters, and why?
    *   What happens if you try to reassign a `const` variable?
    *   Can you declare a `const` variable without initializing it?
4.  **Follow-up Answers**:
    *   For loop counters, `let` is typically used because it provides block-scoping. This ensures that the loop counter variable is confined to the loop's scope, preventing unintended side effects or conflicts with variables outside the loop.
    *   If you try to reassign a `const` variable, JavaScript will throw a `TypeError` because `const` values cannot be reassigned.
    *   No, you cannot declare a `const` variable without initializing it. It must be assigned a value at the time of declaration, otherwise, it will result in a `SyntaxError`.
5.  **Code Example(s)**:

    ```javascript
    // var example
    function varScope() {
        if (true) {
            var x = 10;
        }
        console.log(x); // Output: 10 (var is function-scoped)
    }
    varScope();

    // let/const example
    function letConstScope() {
        if (true) {
            let y = 20;
            const z = 30;
            // z = 31; // This would throw a TypeError
            console.log(y, z); // Output: 20 30
        }
        // console.log(y); // This would throw a ReferenceError (y is not defined)
        // console.log(z); // This would throw a ReferenceError (z is not defined)
    }
    letConstScope();
    ```

---

### **Question 2: Basic**

1.  **Main Question**: What are the primitive data types in JavaScript?
2.  **Answer**: Primitive data types are basic, immutable values. In JavaScript, there are seven primitive data types:
    *   `string`: Represents text (e.g., `'hello'`, `"world"`).
    *   `number`: Represents both integers and floating-point numbers (e.g., `10`, `3.14`).
    *   `boolean`: Represents a logical entity (`true` or `false`).
    *   `undefined`: Represents a variable that has been declared but not yet assigned a value.
    *   `null`: Represents the intentional absence of any object value. It's a primitive value.
    *   `symbol`: (ES6) Represents a unique identifier. Used for unique object property keys.
    *   `bigint`: (ES2020) Represents integers with arbitrary precision (larger than `2^53 - 1`).
3.  **Follow-up Questions**:
    *   Is `null` an object? Explain `typeof null`.
    *   What is the difference between `undefined` and `null`?
    *   Can you give an example where `symbol` would be useful?
4.  **Follow-up Answers**:
    *   No, `null` is not an object. The `typeof null` returning `'object'` is a long-standing bug in JavaScript that has been maintained for backward compatibility. Conceptually, `null` is a primitive value representing the intentional absence of a value.
    *   `undefined` means a variable has been declared but not assigned a value, or a function argument that was not provided. `null` is an assignment value, meaning it can be assigned to a variable as a representation of "no value" or "empty."
    *   `Symbol` is useful for creating unique property keys in objects to avoid naming collisions, especially when extending objects with properties that might conflict with existing or future properties. For example, a third-party library might add a property to an object using a `Symbol` to ensure it doesn't overwrite any existing string-named properties.
5.  **Code Example(s)**:

    ```javascript
    console.log(typeof "hello");    // string
    console.log(typeof 123);        // number
    console.log(typeof true);       // boolean
    console.log(typeof undefined);  // undefined
    console.log(typeof null);       // object (historical bug)
    console.log(typeof Symbol('id')); // symbol
    console.log(typeof 10n);        // bigint
    ```

---

### **Question 3: Basic**

1.  **Main Question**: Explain the difference between `==` (loose equality) and `===` (strict equality) in JavaScript.
2.  **Answer**:
    *   **`==` (Loose Equality)**: Compares two values for equality *after* performing type coercion. This means if the two values are of different types, JavaScript will try to convert one or both values to a common type before making the comparison. This can lead to unexpected results.
    *   **`===` (Strict Equality)**: Compares two values for equality *without* performing any type coercion. It returns `true` only if both the value *and* the type are the same. This is generally recommended for predictable comparisons.
3.  **Follow-up Questions**:
    *   When might `==` be useful, if ever?
    *   What is the result of `null == undefined` and `null === undefined`? Why?
    *   How does `NaN` behave with both `==` and `===`?
4.  **Follow-up Answers**:
    *   While generally discouraged due to its unpredictable nature, `==` can sometimes be used for quick checks where type coercion is explicitly desired, such as checking if a variable is `null` or `undefined` (`value == null` will return true for both `null` and `undefined`). However, for most cases, strict equality is safer.
    *   `null == undefined` is `true` because `==` performs type coercion, and they are considered loosely equal. `null === undefined` is `false` because their types are different (`null` is `null`, `undefined` is `undefined`).
    *   `NaN` (Not-a-Number) is unique because it is not equal to itself using either `==` or `===`. `NaN == NaN` is `false`, and `NaN === NaN` is also `false`. To check if a value is `NaN`, you should use `isNaN()` or `Number.isNaN()`.
5.  **Code Example(s)**:

    ```javascript
    console.log(5 == '5');   // true (type coercion: string '5' becomes number 5)
    console.log(5 === '5');  // false (different types: number vs string)

    console.log(null == undefined); // true
    console.log(null === undefined); // false

    console.log(0 == false); // true
    console.log(0 === false); // false

    console.log(NaN == NaN); // false
    console.log(NaN === NaN); // false
    ```

---

### **Question 4: Basic**

1.  **Main Question**: How do you declare a function in JavaScript? Provide at least two common ways.
2.  **Answer**: There are several common ways to declare functions in JavaScript:
    *   **Function Declaration**: The traditional way, where you use the `function` keyword followed by the function name, parameters, and body. These are hoisted.
    *   **Function Expression**: Assigning an anonymous or named function to a variable. These are not hoisted in the same way; the variable declaration is hoisted, but the function assignment itself is not.
    *   **Arrow Function (ES6)**: A more concise syntax for writing function expressions. They have lexical `this` binding and are often used for shorter, non-method functions.
3.  **Follow-up Questions**:
    *   What is function hoisting? How does it apply to function declarations vs. function expressions?
    *   When would you choose an arrow function over a regular function expression?
    *   Can you have a named function expression? What's the benefit?
4.  **Follow-up Answers**:
    *   **Function Hoisting**: Function declarations are hoisted to the top of their scope, meaning you can call them before they are declared in the code. Function expressions (and arrow functions) are not hoisted in the same way; their variable declaration is hoisted, but the function definition itself is not, so you cannot call them before the line where they are assigned.
    *   Arrow functions are generally preferred for shorter, single-expression functions, or when you need to preserve the `this` context from the surrounding lexical scope (e.g., inside callback functions for array methods or event handlers).
    *   Yes, you can have a named function expression (e.g., `const myFunc = function myFuncName() {}`). The benefit is that the `myFuncName` name is available within the function's own scope for recursion or for clearer debugging stack traces.
5.  **Code Example(s)**:

    ```javascript
    // 1. Function Declaration
    function greet(name) {
        return `Hello, ${name}!`;
    }
    console.log(greet('Alice')); // Output: Hello, Alice!

    // 2. Function Expression
    const sayHi = function(name) {
        return `Hi, ${name}!`;
    };
    console.log(sayHi('Bob')); // Output: Hi, Bob!

    // 3. Arrow Function
    const farewell = (name) => `Goodbye, ${name}!`;
    console.log(farewell('Charlie')); // Output: Goodbye, Charlie!
    ```

---

### **Question 5: Basic**

1.  **Main Question**: What is "scope" in JavaScript, and what are the main types of scope?
2.  **Answer**: Scope defines the accessibility of variables, functions, and objects in some particular part of your code. It determines where in your program a variable or function can be used or referenced. The main types of scope are:
    *   **Global Scope**: Variables declared outside of any function or block. They are accessible from anywhere in the JavaScript code.
    *   **Function (Local) Scope**: Variables declared inside a function. They are only accessible within that function.
    *   **Block Scope (ES6 `let`/`const`)**: Variables declared with `let` or `const` inside a block (e.g., `if` statements, `for` loops, or any pair of `{}`) are only accessible within that block.
3.  **Follow-up Questions**:
    *   Why is it generally considered bad practice to use too many global variables?
    *   Can a variable declared in an inner function access variables from its outer function?
    *   What is lexical scope?
4.  **Follow-up Answers**:
    *   Too many global variables can lead to naming collisions, making code harder to maintain and debug, especially in large applications or when integrating with third-party libraries. They also increase the risk of unintended side effects.
    *   Yes, a variable declared in an inner function can access variables from its outer (enclosing) function's scope. This is a fundamental concept related to closures.
    *   Lexical scope (or static scope) means that the scope of a variable is determined at the time of writing the code (lexical analysis), not at runtime. This means that a function's access to variables from its outer scope is fixed by where it is defined in the code, not by where it is called.
5.  **Code Example(s)**:

    ```javascript
    // Global Scope
    const globalVar = "I'm global";

    function outerFunction() {
        // Function Scope (outerFunction's scope)
        const outerVar = "I'm in outerFunction";

        if (true) {
            // Block Scope
            let blockVar = "I'm in a block";
            console.log(globalVar);  // Accessible
            console.log(outerVar);   // Accessible
            console.log(blockVar);   // Accessible
        }
        // console.log(blockVar); // ReferenceError: blockVar is not defined

        function innerFunction() {
            // Function Scope (innerFunction's scope)
            const innerVar = "I'm in innerFunction";
            console.log(globalVar);  // Accessible
            console.log(outerVar);   // Accessible (due to lexical scope)
            console.log(innerVar);   // Accessible
        }
        innerFunction();
    }
    outerFunction();
    // console.log(outerVar); // ReferenceError: outerVar is not defined
    ```

---

### **Question 6: Basic**

1.  **Main Question**: What is "hoisting" in JavaScript? Provide an example for variables and functions.
2.  **Answer**: Hoisting is a JavaScript mechanism where variable and function declarations are moved to the top of their containing scope during the compilation phase, *before* code execution.
    *   **Variable Hoisting (`var`)**: Only the declaration is hoisted, not the initialization. Variables declared with `var` are initialized with `undefined` when hoisted.
    *   **Function Hoisting**: Entire function declarations are hoisted, meaning you can call a function declared this way before its actual definition in the code. Function expressions and arrow functions are not hoisted in the same manner.
3.  **Follow-up Questions**:
    *   Does `let` or `const` hoisting behave differently from `var`?
    *   What is the "Temporal Dead Zone" (TDZ) in relation to hoisting?
    *   Why is understanding hoisting important for writing predictable code?
4.  **Follow-up Answers**:
    *   `let` and `const` declarations are also hoisted, but they are not initialized with `undefined`. Instead, they remain in a "Temporal Dead Zone" (TDZ) until their declaration is actually executed. Accessing them before their declaration results in a `ReferenceError`.
    *   The "Temporal Dead Zone" (TDZ) is the period between the start of a block and the declaration of `let` or `const` variables within that block. During this time, the variables cannot be accessed, even though they are technically hoisted.
    *   Understanding hoisting is crucial to avoid unexpected `undefined` values or `ReferenceError`s. It helps write more predictable and maintainable code by encouraging declarations at the top of their scope or using `let`/`const` which enforce declaration before use.
5.  **Code Example(s)**:

    ```javascript
    // Variable Hoisting with var
    console.log(myVar); // Output: undefined (declaration is hoisted)
    var myVar = 10;
    console.log(myVar); // Output: 10

    // Function Hoisting
    sayHello(); // Output: Hello! (entire function is hoisted)
    function sayHello() {
        console.log("Hello!");
    }

    // Example with let/const (TDZ)
    // console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
    let myLet = 20;
    console.log(myLet); // Output: 20
    ```

---

### **Question 7: Basic**

1.  **Main Question**: How do you add, remove, and modify elements in a JavaScript array? Provide common methods.
2.  **Answer**:
    *   **Adding Elements**:
        *   `push()`: Adds one or more elements to the *end* of an array and returns the new length.
        *   `unshift()`: Adds one or more elements to the *beginning* of an array and returns the new length.
    *   **Removing Elements**:
        *   `pop()`: Removes the *last* element from an array and returns that element.
        *   `shift()`: Removes the *first* element from an array and returns that element.
        *   `splice()`: A versatile method that can add, remove, or replace elements at any position.
    *   **Modifying Elements**:
        *   Direct Assignment: Access an element by its index and assign a new value (e.g., `arr[index] = newValue`).
        *   `splice()`: Can also be used to replace elements by specifying 0 for elements to delete and providing new elements.
3.  **Follow-up Questions**:
    *   Which of these methods modify the original array in place?
    *   How would you add an element at a specific index without removing existing elements using `splice()`?
    *   What is the difference between `splice()` and `slice()`?
4.  **Follow-up Answers**:
    *   `push()`, `unshift()`, `pop()`, `shift()`, and `splice()` all modify the original array in place.
    *   To add an element at a specific index without removing existing elements using `splice()`, you'd set the `deleteCount` argument to `0`. For example, `arr.splice(index, 0, newElement)`.
    *   `splice()` modifies the original array by adding/removing/replacing elements and returns the removed elements. `slice()` creates a *new* array containing a shallow copy of a portion of the original array, without modifying the original.
5.  **Code Example(s)**:

    ```javascript
    let fruits = ['apple', 'banana', 'cherry'];

    // Add
    fruits.push('date');      // ['apple', 'banana', 'cherry', 'date']
    fruits.unshift('apricot'); // ['apricot', 'apple', 'banana', 'cherry', 'date']
    console.log("After adding:", fruits);

    // Modify
    fruits[2] = 'blueberry'; // ['apricot', 'apple', 'blueberry', 'cherry', 'date']
    console.log("After modifying:", fruits);

    // Remove
    let lastFruit = fruits.pop();    // 'date', fruits is now ['apricot', 'apple', 'blueberry', 'cherry']
    let firstFruit = fruits.shift(); // 'apricot', fruits is now ['apple', 'blueberry', 'cherry']
    console.log("After removing:", fruits);

    // Using splice
    fruits.splice(1, 1, 'grape', 'kiwi'); // At index 1, remove 1 element ('blueberry'), add 'grape', 'kiwi'
    // fruits is now ['apple', 'grape', 'kiwi', 'cherry']
    console.log("After splice:", fruits);
    ```

---

### **Question 8: Intermediate**

1.  **Main Question**: Explain the concept of `this` in JavaScript. How does its value typically change depending on how a function is called?
2.  **Answer**: `this` is a special keyword in JavaScript that refers to the context in which a function is executed. Its value is determined dynamically at runtime, based on how the function is called.
    *   **Global Context**: In the global scope (outside any function), `this` refers to the global object (`window` in browsers, `global` in Node.js).
    *   **Method Call**: When a function is called as a method of an object (e.g., `obj.method()`), `this` refers to the object that owns the method (`obj`).
    *   **Simple Function Call**: When a function is called as a standalone function (not as a method, e.g., `func()`), `this` refers to the global object in non-strict mode, and `undefined` in strict mode.
    *   **Constructor Call**: When a function is used as a constructor with the `new` keyword (e.g., `new MyObject()`), `this` refers to the newly created instance of the object.
    *   **Explicit Binding (`call`, `apply`, `bind`)**: You can explicitly set the value of `this` using these methods.
    *   **Arrow Functions**: Arrow functions do not have their own `this` binding. They lexically inherit `this` from their enclosing scope.
3.  **Follow-up Questions**:
    *   How does `this` behave inside an arrow function compared to a regular function?
    *   What is strict mode, and how does it affect `this`?
    *   Can you predict the value of `this` in a nested function call?
4.  **Follow-up Answers**:
    *   Inside an arrow function, `this` is determined by the surrounding lexical (enclosing) scope and cannot be changed by `call`, `apply`, or `bind`. In contrast, a regular function's `this` is dynamically bound based on how it's called.
    *   Strict mode (`'use strict';`) is a way to opt into a restricted variant of JavaScript. In strict mode, if a function is called as a standalone function (not a method), `this` will be `undefined` instead of the global object. It also prevents accidental global variable creation and throws errors for certain unsafe actions.
    *   In a nested regular function call, if the inner function is called as a simple function (not a method of an object), its `this` will default to the global object (or `undefined` in strict mode), *not* the `this` of the outer function. This is a common source of confusion, which arrow functions help to solve.
5.  **Code Example(s)**:

    ```javascript
    // Global context
    console.log(this === global); // In Node.js: true

    // Method call
    const myObject = {
        name: 'John',
        greet: function() {
            console.log(`Hello, my name is ${this.name}`);
        }
    };
    myObject.greet(); // Output: Hello, my name is John (this is myObject)

    // Simple function call (in Node.js, non-strict mode)
    const greetFunc = myObject.greet;
    // greetFunc(); // Output: Hello, my name is undefined (this is global/undefined)

    // Arrow function (lexical this)
    const anotherObject = {
        name: 'Jane',
        greetArrow: () => {
            console.log(`Hello, my name is ${this.name}`);
        }
    };
    anotherObject.greetArrow(); // Output: Hello, my name is undefined (this is global/undefined, as arrow func inherits from global scope here)

    // Corrected arrow function usage for 'this'
    const yetAnotherObject = {
        name: 'Peter',
        sayLater: function() {
            setTimeout(() => {
                console.log(`Hello, my name is ${this.name}`); // 'this' here refers to 'yetAnotherObject'
            }, 100);
        }
    };
    yetAnotherObject.sayLater(); // Output: Hello, my name is Peter (after 100ms)
    ```

---

### **Question 9: Intermediate**

1.  **Main Question**: What are arrow functions (`=>`) in ES6, and what are their primary advantages and disadvantages compared to traditional function expressions?
2.  **Answer**: Arrow functions provide a more concise syntax for writing function expressions.
    *   **Advantages**:
        *   **Concise Syntax**: Shorter to write, especially for single-expression functions.
        *   **Lexical `this` Binding**: They do not have their own `this` context. Instead, `this` is inherited from the enclosing (lexical) scope. This solves common `this` binding issues in callbacks and nested functions.
        *   **No `arguments` object**: They do not have their own `arguments` object, but you can use rest parameters (`...args`) instead.
        *   **Cannot be used as constructors**: They cannot be called with `new`.
    *   **Disadvantages**:
        *   **No `this` binding**: This can be a disadvantage when you *need* a dynamic `this` (e.g., in object methods that need to refer to the object itself, or event handlers that need to refer to the element).
        *   **No `arguments` object**: If you need access to the `arguments` object, you'd have to use a regular function or convert `arguments` to a rest parameter.
        *   **Cannot be used as constructors**: You cannot use `new` with arrow functions.
        *   **Lack of `prototype` property**: They don't have a `prototype` property, so they can't be used to create methods on a prototype chain.
3.  **Follow-up Questions**:
    *   When would an arrow function be a poor choice for an object method?
    *   Can you use `yield` inside an arrow function?
    *   How would you pass multiple arguments to an arrow function if it doesn't have an `arguments` object?
4.  **Follow-up Answers**:
    *   An arrow function would be a poor choice for an object method if that method needs to access the object's properties using `this`. Because arrow functions lexically bind `this`, `this` would refer to the surrounding scope (often the global object or `undefined` in strict mode), not the object itself.
    *   No, you cannot use the `yield` keyword inside an arrow function. This means arrow functions cannot be used as generator functions.
    *   You would use rest parameters (`...args`) to collect multiple arguments into an array. For example: `const sum = (...numbers) => numbers.reduce((acc, num) => acc + num, 0);`
5.  **Code Example(s)**:

    ```javascript
    // Concise syntax
    const add = (a, b) => a + b;
    console.log(add(2, 3)); // Output: 5

    // Lexical this binding
    function Counter() {
        this.count = 0;
        // Regular function would have 'this' point to setTimeout's caller (global/undefined)
        // Arrow function preserves 'this' from Counter's scope
        setTimeout(() => {
            this.count++;
            console.log(this.count); // Correctly increments Counter's count
        }, 1000);
    }
    const myCounter = new Counter(); // Output: 1 (after 1 second)

    // Bad example for object method
    const user = {
        name: 'Alice',
        greet: () => {
            console.log(`Hello, ${this.name}`); // 'this' refers to global object
        }
    };
    user.greet(); // Output: Hello, undefined (in Node.js) or Hello, [window.name] (in browser)
    ```

---

### **Question 10: Intermediate**

1.  **Main Question**: What are callback functions in JavaScript? Provide a simple example of their use.
2.  **Answer**: A callback function is a function passed as an argument to another function, which is then executed inside the outer function at a later point in time. Callbacks are a fundamental concept for asynchronous programming in JavaScript, but they are also used in synchronous contexts (e.g., array methods like `map`, `filter`).
3.  **Follow-up Questions**:
    *   What is "callback hell" or the "pyramid of doom," and how can it be avoided?
    *   Can a callback function be synchronous? Provide an example.
    *   How do event listeners commonly use callbacks?
4.  **Follow-up Answers**:
    *   "Callback hell" is a situation in asynchronous JavaScript where multiple nested callbacks make the code difficult to read, understand, and maintain. It's often characterized by deeply indented code. It can be avoided using Promises, `async/await`, or named functions for better modularity.
    *   Yes, a callback function can be synchronous. For example, array methods like `forEach`, `map`, or `filter` take synchronous callback functions that are executed immediately for each element.
    *   Event listeners (e.g., for click events, data received) are a classic example of asynchronous callbacks. When an event occurs, the registered callback function is executed. The main program flow doesn't wait for the event; it continues execution, and the callback is invoked when the event happens.
5.  **Code Example(s)**:

    ```javascript
    // Synchronous callback example (Array.forEach)
    const numbers = [1, 2, 3];
    numbers.forEach(function(number) {
        console.log(number * 2); // Output: 2, 4, 6
    });

    // Asynchronous callback example (setTimeout)
    function fetchData(callback) {
        console.log("Fetching data...");
        setTimeout(function() {
            const data = "Some data from server";
            console.log("Data fetched!");
            