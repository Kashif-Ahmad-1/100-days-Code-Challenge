Welcome to Day 7 of your interview prep! It's great to see your dedication to the '100 Days of Code' challenge. Let's start with some fundamentals to build a strong base.

---

### Question 1: Basic

1.  **Main Question**: Can you explain the key differences between `var`, `let`, and `const` in JavaScript?

2.  **Answer**:
    *   **`var`**: Declares a function-scoped or globally-scoped variable. Variables declared with `var` are hoisted to the top of their scope and can be re-declared and re-assigned.
    *   **`let`**: Declares a block-scoped local variable. Variables declared with `let` are also hoisted, but they are in a "temporal dead zone" until their declaration is processed, meaning you cannot access them before they are declared. They can be re-assigned but not re-declared in the same scope.
    *   **`const`**: Declares a block-scoped local variable whose value cannot be re-assigned after initialization. Like `let`, it's also hoisted into a temporal dead zone. For primitive values, `const` makes the value immutable. For objects or arrays, it makes the *reference* immutable, meaning you can still modify the properties of the object or elements of the array.

3.  **Follow-up Questions**:
    *   What is "hoisting" in the context of `var`, `let`, and `const`?
    *   When would you typically choose `const` over `let` or `var`?
    *   Can you redeclare a `let` variable in an inner block scope?

4.  **Follow-up Answers**:
    *   **Hoisting**: Hoisting is a JavaScript mechanism where variable and function declarations are moved to the top of their containing scope during the compilation phase. For `var`, both declaration and initialization (to `undefined`) are hoisted. For `let` and `const`, only the declaration is hoisted, but they are not initialized, leading to the "temporal dead zone" if accessed before their actual declaration line.
    *   **When to choose `const`**: You should choose `const` when you declare a variable whose value is not expected to change throughout its lifecycle. This improves code readability and helps prevent accidental re-assignment bugs. If the value needs to change, then `let` is appropriate. `var` is generally discouraged in modern JavaScript.
    *   **Redeclaring `let` in inner block**: Yes, you can redeclare a `let` variable in an inner block scope. This creates a new variable local to that inner block, effectively "shadowing" the outer variable.

5.  **Code Example(s)**:

    ```javascript
    // var example
    console.log(myVar); // undefined (hoisted)
    var myVar = "Hello";
    console.log(myVar); // Hello
    var myVar = "World"; // Re-declaration allowed
    console.log(myVar); // World

    // let example
    // console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization (temporal dead zone)
    let myLet = "Hello";
    console.log(myLet); // Hello
    myLet = "World"; // Re-assignment allowed
    // let myLet = "Again"; // SyntaxError: Identifier 'myLet' has already been declared

    // const example
    const myConst = "Hello";
    // myConst = "World"; // TypeError: Assignment to constant variable.
    const myObject = { name: "Alice" };
    myObject.name = "Bob"; // Allowed: modifying object property, not reassigning the reference
    console.log(myObject); // { name: 'Bob' }

    // Block scoping with let/const
    let outerVar = "I'm outside";
    if (true) {
      let outerVar = "I'm inside the block"; // This is a new 'outerVar' specific to this block
      console.log(outerVar); // I'm inside the block
    }
    console.log(outerVar); // I'm outside (the outer one is unaffected)
    ```

---

### Question 2: Basic

1.  **Main Question**: What are the two main categories of data types in JavaScript, and what is the fundamental difference between how they are stored and accessed?

2.  **Answer**:
    The two main categories are **Primitive data types** and **Reference data types**.
    *   **Primitive data types** (e.g., `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) store their actual values directly in the memory location where the variable resides. When a primitive variable is assigned to another, a copy of the value is made.
    *   **Reference data types** (e.g., `object`, `array`, `function`) do not store the actual value directly. Instead, they store a *reference* (memory address) to where the actual object or array is stored in memory (on the heap). When a reference variable is assigned to another, only the reference (memory address) is copied, meaning both variables point to the same underlying object in memory.

3.  **Follow-up Questions**:
    *   Give an example of how copying a primitive type differs from copying a reference type.
    *   Why is understanding this distinction important for avoiding unexpected behavior in JavaScript?
    *   Is `null` a primitive or reference type, and why does `typeof null` return 'object'?

4.  **Follow-up Answers**:
    *   **Example of copying**:
        ```javascript
        // Primitive copy
        let a = 10;
        let b = a; // b gets a copy of 10
        b = 20;
        console.log(a); // 10 (a is unaffected)

        // Reference copy
        let obj1 = { value: 10 };
        let obj2 = obj1; // obj2 gets a copy of the reference to the same object
        obj2.value = 20;
        console.log(obj1.value); // 20 (obj1 is affected because both point to the same object)
        ```
    *   **Importance**: This distinction is crucial for understanding how data is manipulated. If you don't grasp it, you might accidentally modify an object through one variable when you intended to only modify it through another, leading to hard-to-debug side effects. It's fundamental to understanding object mutation and function arguments.
    *   **`null`**: `null` is a primitive data type. The fact that `typeof null` returns 'object' is a long-standing bug in JavaScript that dates back to the very first implementation and has been maintained for backward compatibility.

5.  **Code Example(s)**: (See follow-up answers for examples)

---

### Question 3: Basic

1.  **Main Question**: Explain the concept of "hoisting" in JavaScript. Provide an example where hoisting affects variable and function declarations differently.

2.  **Answer**:
    Hoisting is a JavaScript mechanism where variable and function declarations are conceptually moved to the top of their containing scope (either global or function scope) during the compilation phase, *before* the code is executed.
    *   **Variable Hoisting (`var`)**: Only the declaration is hoisted, not the assignment. Variables declared with `var` are initialized with `undefined` when hoisted.
    *   **Function Hoisting**: Function *declarations* are fully hoisted, meaning both the function name and its definition are moved to the top. This allows you to call a function before it's declared in the code. Function *expressions* (e.g., `const myFunction = function() {}`) are treated like variable hoisting and are not fully hoisted.

3.  **Follow-up Questions**:
    *   What is the "temporal dead zone" and how does it relate to hoisting with `let` and `const`?
    *   Can you explain why function expressions are not fully hoisted like function declarations?
    *   How does hoisting impact the order in which you can define and use variables and functions in your code?

4.  **Follow-up Answers**:
    *   **Temporal Dead Zone (TDZ)**: The TDZ is a period of time during which `let` and `const` variables exist but cannot be accessed. It starts from the beginning of the block scope until the variable's declaration is executed. During this time, accessing the variable will result in a `ReferenceError`, unlike `var` which would return `undefined`. This mechanism helps catch potential bugs where variables are used before they are properly initialized.
    *   **Function Expressions vs. Declarations**: Function declarations are parsed and added to the execution context before any code runs, making them available everywhere in their scope. Function expressions, however, are assigned to a variable, and thus follow the hoisting rules of variables (`var`, `let`, or `const`). If it's a `var` function expression, the variable is hoisted as `undefined`; if `let`/`const`, it's in the TDZ. The function definition itself is not available until that line of code is executed.
    *   **Impact on Order**: Hoisting allows you to call function declarations before their actual definition in the code. For `var` variables, you can access them before their declaration, but their value will be `undefined` until the assignment line is reached. For `let` and `const`, you *must* declare them before you access them, or you'll get a `ReferenceError`. This encourages a more structured coding style where variables are declared close to their first use.

5.  **Code Example(s)**:

    ```javascript
    // Variable Hoisting (with var)
    console.log(car); // undefined (declaration hoisted, assignment not)
    var car = "Honda";
    console.log(car); // Honda

    // Function Hoisting
    sayHello(); // "Hello from a hoisted function!"
    function sayHello() {
      console.log("Hello from a hoisted function!");
    }

    // Function Expression (not fully hoisted)
    // sayGoodbye(); // TypeError: sayGoodbye is not a function (if using var)
    // sayGoodbye(); // ReferenceError: Cannot access 'sayGoodbye' before initialization (if using let/const)
    const sayGoodbye = function() {
      console.log("Goodbye!");
    };
    sayGoodbye(); // Goodbye! (after declaration)
    ```

---

### Question 4: Basic

1.  **Main Question**: Explain the difference between the `==` (loose equality) and `===` (strict equality) operators in JavaScript. When would you prefer to use one over the other?

2.  **Answer**:
    *   **`==` (Loose Equality)**: Compares two values for equality after performing type coercion if their types are different. This means JavaScript might convert one or both values to a common type before making the comparison.
    *   **`===` (Strict Equality)**: Compares two values for equality without performing any type coercion. If the values have different types, the comparison will always return `false`. If they have the same type, it compares their values.

3.  **Follow-up Questions**:
    *   Provide an example where `==` returns `true` but `===` returns `false`.
    *   Why is it generally recommended to use `===` over `==` in most cases?
    *   Are there any specific scenarios where using `==` might be acceptable or even preferred?

4.  **Follow-up Answers**:
    *   **Example**:
        ```javascript
        console.log(5 == '5');   // true (string '5' is coerced to number 5)
        console.log(5 === '5');  // false (different types: number vs string)

        console.log(null == undefined); // true
        console.log(null === undefined); // false
        ```
    *   **Recommendation for `===`**: It's generally recommended to use `===` because it prevents unexpected type coercion behavior, making your code more predictable and less prone to bugs. It enforces stricter type checking, which leads to more robust and easier-to-debug code.
    *   **Scenarios for `==`**: While `===` is preferred, `==` can be acceptable or even slightly more concise in specific, well-understood scenarios. A common example is checking for `null` or `undefined` values simultaneously: `myVar == null` will return `true` if `myVar` is either `null` or `undefined`. This is shorthand for `myVar === null || myVar === undefined`. However, even in this case, being explicit with `===` is often clearer.

5.  **Code Example(s)**: (See follow-up answers for examples)

---

### Question 5: Intermediate

1.  **Main Question**: What is "scope" in JavaScript? Explain the concepts of Global Scope, Function Scope, and Block Scope.

2.  **Answer**:
    **Scope** in JavaScript determines the accessibility of variables, functions, and objects in some part of your code. It dictates where you can reference a variable or function that has been defined.

    *   **Global Scope**: Variables declared outside of any function or block are in the global scope. They can be accessed from anywhere in the JavaScript code, including inside functions and blocks.
    *   **Function Scope**: Variables declared with `var` inside a function are function-scoped. They are only accessible within that function and cannot be accessed from outside of it. Each function creates its own new scope.
    *   **Block Scope**: Variables declared with `let` and `const` inside a block (any code enclosed in curly braces `{}` like `if` statements, `for` loops, or simple blocks) are block-scoped. They are only accessible within that specific block.

3.  **Follow-up Questions**:
    *   How does the concept of "lexical scope" relate to nested functions in JavaScript?
    *   What happens if you declare a variable inside a function without using `var`, `let`, or `const`?
    *   Why is it generally considered good practice to avoid polluting the global scope?

4.  **Follow-up Answers**:
    *   **Lexical Scope**: Lexical scope (or static scope) means that the scope of a variable is defined by its position in the source code at the time of writing, not at runtime. In nested functions, an inner function has access to variables defined in its own scope, its outer (enclosing) function's scope, and the global scope. This is fundamental to closures.
    *   **Undeclared Variables**: If you declare a variable inside a function without `var`, `let`, or `const` (e.g., `x = 10;`), it automatically becomes a global variable. This is a common source of bugs and is highly discouraged, especially in strict mode, where it will throw a `ReferenceError`.
    *   **Avoiding Global Scope Pollution**: Polluting the global scope can lead to naming conflicts with other scripts or libraries, making debugging difficult and potentially overwriting important variables. It also makes your code less modular and harder to maintain. Using `let` and `const` for block-scoping and encapsulating code within functions helps minimize global variable usage.

5.  **Code Example(s)**:

    ```javascript
    // Global Scope
    const globalVar = "I'm global";

    function outerFunction() {
      // Function Scope (for var)
      var functionVar = "I'm function-scoped";
      console.log(globalVar); // Accessible

      if (true) {
        // Block Scope (for let/const)
        let blockLet = "I'm block-scoped (let)";
        const blockConst = "I'm block-scoped (const)";
        console.log(functionVar); // Accessible (within outerFunction's scope)
        console.log(blockLet); // Accessible
        console.log(blockConst); // Accessible
      }

      // console.log(blockLet); // ReferenceError: blockLet is not defined (outside its block)
    }

    outerFunction();
    // console.log(functionVar); // ReferenceError: functionVar is not defined (outside its function)
    console.log(globalVar); // Accessible
    ```

---

### Question 6: Intermediate

1.  **Main Question**: What are Arrow Functions in JavaScript? List at least three key differences between arrow functions and regular function declarations/expressions.

2.  **Answer**:
    Arrow functions (`=>`) are a more concise way to write function expressions introduced in ES6. They have a shorter syntax and, crucially, do not bind their own `this` value.

    Key Differences:
    1.  **Syntax**: Arrow functions have a more compact syntax, especially for single-expression functions.
    2.  **`this` Binding**: Arrow functions do not have their own `this` context. Instead, `this` inside an arrow function refers to the `this` value of the enclosing lexical (parent) scope. Regular functions, on the other hand, determine their `this` value based on how they are called (e.g., method call, function call, constructor call).
    3.  **`arguments` Object**: Arrow functions do not have their own `arguments` object. If you need access to arguments, you'd typically use rest parameters (`...args`). Regular functions have a local `arguments` object.
    4.  **Constructor**: Arrow functions cannot be used as constructors (i.e., they cannot be called with `new`). Attempting to do so will throw an error. Regular functions can be used as constructors.
    5.  **`super` Keyword**: Arrow functions do not have `super`. Regular functions do.
    6.  **`yield` Keyword**: Arrow functions cannot be used as generators (they cannot use `yield`).

3.  **Follow-up Questions**:
    *   Provide a code example demonstrating how `this` behaves differently in an arrow function versus a regular function within an object method.
    *   When would an arrow function be a good choice, and when might a regular function be more appropriate?
    *   Can you concisely write a single-line arrow function that immediately returns a value?

4.  **Follow-up Answers**:
    *   **`this` behavior example**:
        ```javascript
        const person = {
          name: 'Alice',
          regularGreet: function() {
            // 'this' refers to 'person' object
            setTimeout(function() {
              console.log(`Regular: Hello, my name is ${this.name}`); // 'this' is window/undefined in strict mode
            }, 100);
          },
          arrowGreet: function() {
            // 'this' refers to 'person' object
            setTimeout(() => {
              console.log(`Arrow: Hello, my name is ${this.name}`); // 'this' is lexically bound to 'person'
            }, 100);
          }
        };

        person.regularGreet(); // Output: Regular: Hello, my name is (or error in strict mode)
        person.arrowGreet();   // Output: Arrow: Hello, my name is Alice
        ```
    *   **When to choose**: Arrow functions are excellent for callbacks, especially in array methods (like `map`, `filter`, `reduce`) or asynchronous operations (like `setTimeout`, Promises), where preserving the `this` context of the surrounding code is desirable. Regular functions are more appropriate for object methods (where `this` should refer to the object itself), constructors, or when you need the `arguments` object.
    *   **Single-line arrow function**:
        ```javascript
        const add = (a, b) => a + b;
        console.log(add(2, 3)); // 5

        const getObject = (id, name) => ({ id, name }); // Parentheses needed for object literal
        console.log(getObject(1, 'Test')); // { id: 1, name: 'Test' }
        ```

5.  **Code Example(s)**: (See follow-up answers for examples)

---

### Question 7: Intermediate

1.  **Main Question**: Explain the concept of the `this` keyword in JavaScript. How is its value determined?

2.  **Answer**:
    The `this` keyword in JavaScript is a special keyword that refers to the context in which a function is executed. Its value is not fixed but is determined dynamically based on *how* the function is called.

    Here are the main ways `this` is determined:
    1.  **Global Context**: In the global scope (outside any function), `this` refers to the global object (`window` in browsers, `global` in Node.js). In strict mode, it's `undefined`.
    2.  **Method Call**: When a function is called as a method of an object (e.g., `obj.method()`), `this` refers to the object itself (`obj`).
    3.  **Function Call (Standalone)**: When a function is called directly, not as a method (e.g., `myFunction()`), `this` refers to the global object (`window`/`global`). In strict mode, `this` is `undefined`.
    4.  **Constructor Call**: When a function is used as a constructor with the `new` keyword (e.g., `new MyObject()`), `this` refers to the newly created instance of the object.
    5.  **Explicit Binding**: Using `call()`, `apply()`, or `bind()` methods, you can explicitly set the value of `this` for a function.
    6.  **Arrow Functions**: Arrow functions do not have their own `this` context. Instead, `this` inside an arrow function lexically inherits `this` from its parent scope (the scope in which the arrow function was defined).

3.  **Follow-up Questions**:
    *   How can `call()`, `apply()`, and `bind()` explicitly set the `this` context? What's the main difference between `call()` and `apply()`?
    *   Why is the dynamic nature of `this` often a source of confusion for new JavaScript developers?
    *   In a browser environment, if you have a simple function `function showThis() { console.log(this); }` and call it directly `showThis();`, what would `this` refer to (assuming non-strict mode)?

4.  **Follow-up Answers**:
    *   **`call()`, `apply()`, `bind()`**: These methods allow you to explicitly define the `this` context for a function.
        *   `call(thisArg, arg1, arg2, ...)`: Invokes the function immediately, setting `this` to `thisArg` and taking arguments individually.
        *   `apply(thisArg, [argsArray])`: Invokes the function immediately, setting `this` to `thisArg` and taking arguments as an array.
        *   `bind(thisArg, arg1, arg2, ...)`: Returns a *new function* with `this` permanently bound to `thisArg` (and optionally pre-set arguments). It does not invoke the function immediately.
        The main difference between `call()` and `apply()` is how they accept arguments: `call()` takes them as a comma-separated list, while `apply()` takes them as an array.
    *   **Source of Confusion**: The dynamic nature of `this` is confusing because its value changes based on the *invocation* context, not just where the function is defined. Developers often expect `this` to behave like `self` or `this` in other object-oriented languages, where it consistently refers to the instance of the class.
    *   **`showThis()` in browser**: In a non-strict browser environment, when `showThis()` is called directly, `this` would refer to the global `window` object.

5.  **Code Example(s)**:

    ```javascript
    // Global context
    console.log(this === window); // true (in browser)

    const user = {
      name: 'John',
      greet: function() {
        console.log(`Hello, ${this.name}`); // 'this' refers to 'user'
      }
    };
    user.greet(); // Hello, John (Method call)

    const standaloneGreet = user.greet;
    // standaloneGreet(); // Hello, undefined (or TypeError in strict mode) - 'this' is window/undefined

    // Constructor call
    function Person(name) {
      this.name = name;
    }
    const person1 = new Person('Alice');
    console.log(person1.name); // Alice ('this' refers to the new instance)

    // Explicit binding with call()
    function introduce(age) {
      console.log(`My name is ${this.name} and I am ${age} years old.`);
    }
    const anotherUser = { name: 'Bob' };
    introduce.call(anotherUser, 30); // My name is Bob and I am 30 years old.
    ```

---

### Question 8: Hard/Advanced

1.  **Main Question**: Briefly explain the concept of the Event Loop in Node.js. Why is it fundamental to Node.js's non-blocking I/O model?

2.  **Answer**:
    The **Event Loop** is a core part of Node.js's runtime environment that enables its non-blocking, asynchronous I/O operations. Node.js is single-threaded for its JavaScript execution, meaning it can only execute one piece of JavaScript code at a time. The Event Loop allows it to handle many concurrent operations without blocking this single thread.

    It works by continuously checking two main things:
    1.  **Call Stack**: Where synchronous JavaScript code is executed.
    2.  **Callback Queue (or Message Queue)**: Where asynchronous operations (like file I/O, network requests, timers) place their results (callbacks) once they are complete.

    When the Call Stack is empty (meaning all synchronous code has finished executing), the Event Loop takes the first callback from the Callback Queue and pushes it onto the Call Stack for execution. This cycle allows Node.js to offload long-running operations to the underlying system (C++ threads, OS kernel) and process other JavaScript code while waiting for those operations to complete. Once complete, their callbacks are queued, and the Event Loop processes them when the main thread is free.

3.  **Follow-up Questions**:
    *   What happens if a synchronous operation takes a very long time in Node.js? How does the Event Loop handle this?
    *   Name at least two common scenarios where you would encounter asynchronous operations that rely on the Event Loop in Node.js.
    *   What is the role of the "microtask queue" (e.g., for Promises) in relation to the main callback queue in the Event Loop?

4.  **Follow-up Answers**:
    *   **Long synchronous operation**: If a synchronous operation takes a very long time (e.g., a complex calculation or an infinite loop), it will block the entire single thread. The Event Loop will not be able to pull any callbacks from the queue, meaning the application will become unresponsive, unable to process I/O events, timers, or network requests until that synchronous operation completes. This is known as "blocking the event loop" and is highly undesirable.
    *   **Common asynchronous scenarios**:
        1.  **File System Operations**: Reading from or writing to files (e.g., `fs.readFile()`, `fs.writeFile()`).
        2.  **Network Requests**: Making HTTP requests (e.g., using `http.get()`, `axios`), or handling incoming requests in a web server.
        3.  **Timers**: `setTimeout()`, `setInterval()`.
        4.  **Database Queries**: Interacting with databases.
    *   **Microtask Queue**: The Event Loop has a priority queue called the "microtask queue" (or "job queue") which holds callbacks from Promises (`.then()`, `.catch()`, `.finally()`) and `process.nextTick()`. Microtasks are processed *before* the Event Loop moves to the next macrotask (callbacks from `setTimeout`, I/O, etc.) in the main callback queue. This means that all pending microtasks are executed immediately after the current script finishes and before the next cycle of the Event Loop starts.

5.  **Code Example(s)**:

    ```javascript
    // Example of non-blocking I/O with Event Loop
    console.log('Start');

    // Asynchronous operation (offloaded)
    setTimeout(() => {
      console.log('Timer callback executed');
    }, 0); // Even with 0ms, it goes to the queue

    // Another asynchronous operation
    const fs = require('fs');
    fs.readFile('./example.txt', 'utf8', (err, data) => {
      if (err) throw err;
      console.log('File read callback executed:', data);
    });

    console.log('End'); // This runs before the callbacks, demonstrating non-blocking

    // Expected (approximate) output:
    // Start
    // End
    // Timer callback executed
    // File read callback executed: (content of example.txt)
    // (Note: File read might finish before or after timer depending on system)
    ```
    *(To run this, create an `example.txt` file in the same directory with some content like "Hello Node!")*

---

### Question 9: Hard/Advanced

1.  **Main Question**: How do you handle errors in synchronous and asynchronous JavaScript code? Explain the use of `try...catch` and discuss its limitations with asynchronous operations.

2.  **Answer**:
    *   **Synchronous Error Handling**: For synchronous code, JavaScript provides the `try...catch` statement.
        *   The `try` block contains the code that might throw an error.
        *   If an error occurs within the `try` block, execution immediately jumps to the `catch` block.
        *   The `catch` block receives the error object as an argument, allowing you to handle or log the error.
        *   An optional `finally` block can be included, whose code always executes, regardless of whether an error occurred or not.

    *   **Asynchronous Error Handling and `try...catch` Limitations**: `try...catch` **does not directly catch errors from asynchronous operations** that are initiated within the `try` block but whose errors occur *later* in the Event Loop, outside the original synchronous execution context. This is because the `try...catch` block finishes executing before the asynchronous operation's callback is invoked.

    For asynchronous operations, specific mechanisms are needed:
    *   **Callbacks**: Errors are typically passed as the first argument to the callback function (`err, data`).
    *   **Promises**: Errors are handled using `.catch()` method or the second argument of `.then()`. Unhandled promise rejections can be caught globally (e.g., `process.on('unhandledRejection')` in Node.js, `window.addEventListener('unhandledrejection')` in browsers).
    *   **`async/await`**: This syntax makes asynchronous code look synchronous, allowing `try...catch` to work directly with `await` expressions. If an `await`ed Promise rejects, it throws an error that can be caught by a surrounding `try...catch` block.

3.  **Follow-up Questions**:
