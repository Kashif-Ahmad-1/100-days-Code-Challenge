Welcome to Day 2 of your interview prep! It's great to have you here. Today, we'll continue our deep dive into JavaScript and Node.js, building upon the foundational concepts we discussed yesterday. We'll explore some more advanced JavaScript features and start touching on Node.js specifics.

Don't worry, we'll maintain a friendly and supportive atmosphere. Think of this as another opportunity to showcase your understanding and learn along the way.

Let's begin!

---

### **Question 1: Basic**

1.  **Main Question**: What are Template Literals (also known as Template Strings) in ES6, and what are their primary advantages over traditional string concatenation?
2.  **Answer**: Template Literals are a new way to define strings in JavaScript, introduced in ES6 (ECMAScript 2015). They are enclosed by backticks (`` ` ``) instead of single or double quotes.
    *   **Interpolation**: They allow for easy embedding of expressions (variables, function calls, arithmetic) directly within the string using the `${expression}` syntax.
    *   **Multi-line Strings**: They can span multiple lines without needing special characters like `\n`.
    *   **Tagged Templates**: A more advanced feature allowing a function to parse the template literal, giving fine-grained control over how the string is constructed.
3.  **Follow-up Questions**:
    *   Can you embed any JavaScript expression inside `${}` within a template literal?
    *   What happens if you try to use single or double quotes for a template literal?
    *   What is a "tagged template" and how might it be used?
4.  **Follow-up Answers**:
    *   Yes, you can embed any valid JavaScript expression, including variables, function calls, arithmetic operations, and even conditional (ternary) operators.
    *   If you use single or double quotes, it will be treated as a regular string literal, and the special features of template literals (like interpolation or multi-line support) will not work. For example, `${}` would be treated as literal characters.
    *   A tagged template is a function called with a template literal. The function receives the string parts as its first argument (an array of strings), and then the values of the interpolated expressions as subsequent arguments. This can be used for things like automatic escaping of HTML, internationalization, or specialized string parsing.
5.  **Code Example(s)**:

    ```javascript
    // Interpolation
    const name = "Alice";
    const age = 30;
    const greeting = `Hello, ${name}! You are ${age} years old.`;
    console.log(greeting); // Output: Hello, Alice! You are 30 years old.

    // Multi-line string
    const multiLine = `This is the first line.
    This is the second line.
        This is indented.`;
    console.log(multiLine);
    ```

---

### **Question 2: Basic**

1.  **Main Question**: Explain Destructuring Assignment in JavaScript. Provide examples for both array and object destructuring.
2.  **Answer**: Destructuring assignment is an ES6 feature that allows you to unpack values from arrays or properties from objects into distinct variables. It provides a more concise and readable way to extract data.
    *   **Array Destructuring**: Extracts values from an array by matching variables to elements based on their position.
    *   **Object Destructuring**: Extracts properties from an object by matching variables to property names.
3.  **Follow-up Questions**:
    *   Can you assign default values during destructuring? Provide an example.
    *   How would you skip elements when destructuring an array?
    *   What is the benefit of using destructuring in function parameters?
4.  **Follow-up Answers**:
    *   Yes, you can assign default values. If the extracted value is `undefined`, the default value will be used. Example: `const { name, age = 25 } = person;`
    *   To skip elements when destructuring an array, you can simply leave a comma placeholder. Example: `const [first, , third] = [1, 2, 3];` (skips the second element).
    *   Using destructuring in function parameters makes the function signature clearer about what properties or elements it expects from an object or array, and it allows for direct access to those values without needing to use dot notation repeatedly inside the function body. It also enables setting default values for parameters concisely.
5.  **Code Example(s)**:

    ```javascript
    // Array Destructuring
    const colors = ['red', 'green', 'blue'];
    const [firstColor, secondColor] = colors;
    console.log(firstColor);  // Output: red
    console.log(secondColor); // Output: green

    // Object Destructuring
    const user = {
        id: 1,
        username: 'coder123',
        email: 'coder@example.com'
    };
    const { username, email } = user;
    console.log(username); // Output: coder123
    console.log(email);    // Output: coder@example.com
    ```

---

### **Question 3: Basic**

1.  **Main Question**: What is the Spread Operator (`...`) in JavaScript, and what are its common use cases?
2.  **Answer**: The Spread Operator (`...`) is an ES6 feature that allows an iterable (like an array or a string) to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) or key-value pairs (for object literals) are expected. It essentially "spreads" the elements of an iterable.
    *   **Copying Arrays/Objects**: Creates a shallow copy.
    *   **Concatenating/Merging Arrays/Objects**: Combines multiple arrays or objects.
    *   **Passing arguments to functions**: Expands an array into individual arguments.
3.  **Follow-up Questions**:
    *   How does the spread operator differ from array `slice()` for copying arrays?
    *   What kind of copy (shallow vs. deep) does the spread operator perform for objects and arrays?
    *   Can the spread operator be used for strings? If so, what's the result?
4.  **Follow-up Answers**:
    *   Both `spread` and `slice()` create shallow copies of arrays. The spread operator is generally more concise and versatile as it can also be used for objects and in function arguments.
    *   The spread operator performs a **shallow copy**. This means that if the array or object contains nested objects or arrays, those nested structures are still referenced by memory, not copied. Changes to nested structures in the copy will affect the original.
    *   Yes, the spread operator can be used for strings. It will spread the string into individual characters. For example, `[...'hello']` would result in `['h', 'e', 'l', 'l', 'o']`.
5.  **Code Example(s)**:

    ```javascript
    // Copying and Merging Arrays
    const arr1 = [1, 2, 3];
    const arr2 = [...arr1, 4, 5]; // Copy arr1 and add more elements
    console.log(arr2); // Output: [1, 2, 3, 4, 5]

    // Merging Objects
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, d: 4 };
    const mergedObj = { ...obj1, ...obj2 };
    console.log(mergedObj); // Output: { a: 1, b: 2, c: 3, d: 4 }

    // Passing arguments to a function
    function sum(a, b, c) {
        return a + b + c;
    }
    const numbers = [1, 2, 3];
    console.log(sum(...numbers)); // Output: 6
    ```

---

### **Question 4: Basic**

1.  **Main Question**: What are Rest Parameters (`...`) in JavaScript, and how do they differ from the Spread Operator?
2.  **Answer**: Rest Parameters (`...`) are an ES6 feature that allows a function to accept an indefinite number of arguments as an array. They collect all remaining arguments into a single array.
    The key difference from the Spread Operator is their context of use:
    *   **Rest Parameters**: Used in **function definitions** to collect multiple arguments into an array.
    *   **Spread Operator**: Used in **function calls**, array literals, or object literals to expand an iterable into individual elements/arguments/properties.
3.  **Follow-up Questions**:
    *   Can a function have multiple rest parameters? Why or why not?
    *   Where must the rest parameter be placed in a function's parameter list?
    *   How do rest parameters provide a more modern alternative to the `arguments` object?
4.  **Follow-up Answers**:
    *   No, a function can only have one rest parameter. It must be the last parameter in the list because it collects "all remaining" arguments. If there were multiple, it would be ambiguous which arguments each rest parameter should collect.
    *   The rest parameter must always be the last parameter in a function's parameter list.
    *   Rest parameters provide a modern and often preferred alternative to the deprecated `arguments` object because they give you a real array (not an array-like object), allowing you to use array methods directly on it. They also only capture the arguments that aren't explicitly defined as named parameters, making function signatures clearer.
5.  **Code Example(s)**:

    ```javascript
    // Rest Parameters in a function definition
    function sumAll(firstNum, ...remainingNums) {
        let total = firstNum;
        for (const num of remainingNums) {
            total += num;
        }
        return total;
    }

    console.log(sumAll(1, 2, 3, 4)); // Output: 10 (1 is firstNum, [2,3,4] is remainingNums)
    console.log(sumAll(5));         // Output: 5 (5 is firstNum, [] is remainingNums)

    // Example showing difference between Rest and Spread
    const numbers = [10, 20, 30];

    // Spread: expands array into individual arguments
    console.log(Math.max(...numbers)); // Output: 30

    // Rest: collects individual arguments into an array
    function logArgs(...args) {
        console.log(args);
    }
    logArgs(1, 'hello', true); // Output: [1, 'hello', true]
    ```

---

### **Question 5: Basic**

1.  **Main Question**: How do you handle errors in JavaScript using `try...catch` blocks? Provide a simple example.
2.  **Answer**: The `try...catch` statement is used for error handling in JavaScript. It allows you to test a block of code for errors and handle them gracefully without crashing the program.
    *   The `try` block contains the code that might throw an error.
    *   If an error occurs within the `try` block, execution jumps to the `catch` block.
    *   The `catch` block receives the error object as an argument, allowing you to inspect and respond to the error.
    *   An optional `finally` block can be added, which will execute regardless of whether an error occurred or not (e.g., for cleanup).
3.  **Follow-up Questions**:
    *   What type of errors can `try...catch` handle? Are there any it cannot?
    *   When would you use a `finally` block?
    *   How would you intentionally throw a custom error in JavaScript?
4.  **Follow-up Answers**:
    *   `try...catch` can handle runtime errors (exceptions) that occur synchronously within the `try` block. It cannot directly catch syntax errors (which prevent the script from running at all) or asynchronous errors (like those inside a `setTimeout` or a Promise's rejected state, unless specifically handled with `.catch()` for Promises or nested `try...catch` for async functions).
    *   A `finally` block is used when you have code that *must* be executed, regardless of whether an error occurred or not. Common use cases include closing file handles, releasing network connections, or cleaning up resources.
    *   You can intentionally throw a custom error using the `throw` statement, followed by an error object (e.g., `throw new Error('Something went wrong!');` or `throw 'My custom string error';`).
5.  **Code Example(s)**:

    ```javascript
    function divide(a, b) {
        try {
            if (b === 0) {
                throw new Error("Division by zero is not allowed.");
            }
            return a / b;
        } catch (error) {
            console.error("An error occurred:", error.message);
            return null; // Indicate failure
        } finally {
            console.log("Division attempt finished.");
        }
    }

    console.log(divide(10, 2)); // Output: 5, then "Division attempt finished."
    console.log(divide(10, 0)); // Output: "An error occurred: Division by zero is not allowed.", then "Division attempt finished.", then null
    ```

---

### **Question 6: Basic**

1.  **Main Question**: What are the fundamental differences between JavaScript running in a web browser and JavaScript running in Node.js?
2.  **Answer**: While both environments execute JavaScript, they differ significantly in their runtime environments and available APIs:
    *   **Runtime Environment**:
        *   **Browser JS**: Runs in the browser's JavaScript engine (e.g., V8 in Chrome, SpiderMonkey in Firefox). It interacts with the DOM, browser events, and browser-specific APIs (e.g., `window`, `document`, `localStorage`).
        *   **Node.js**: Runs in the Node.js runtime, which also uses the V8 engine, but outside the browser. It interacts with the operating system, file system, network, and Node.js-specific APIs (e.g., `fs`, `http`, `path`, `process`).
    *   **Global Objects**:
        *   **Browser JS**: Global object is `window`.
        *   **Node.js**: Global object is `global`.
    *   **Modules**:
        *   **Browser JS**: Traditionally used `<script>` tags, now supports ES Modules (`import`/`export`).
        *   **Node.js**: Primarily uses CommonJS modules (`require`/`module.exports`), with increasing support for ES Modules.
    *   **Purpose**:
        *   **Browser JS**: Primarily for client-side interactivity, UI manipulation, and consuming web APIs.
        *   **Node.js**: Primarily for server-side development, command-line tools, backend APIs, and handling I/O operations.
3.  **Follow-up Questions**:
    *   Can you use `document.getElementById()` in Node.js? Why or why not?
    *   What is the role of the V8 engine in both environments?
    *   How does Node.js handle I/O operations differently from a typical browser-based JavaScript application?
4.  **Follow-up Answers**:
    *   No, you cannot use `document.getElementById()` in Node.js because `document` is part of the Browser Object Model (BOM) and Document Object Model (DOM), which are specific to web browsers and do not exist in the Node.js runtime.
    *   The V8 engine is Google's open-source JavaScript engine that compiles JavaScript into machine code. Its role in both environments is to parse and execute JavaScript code efficiently. Node.js leverages V8's speed and non-blocking I/O model for server-side operations, while browsers use it for client-side script execution.
    *   Node.js handles I/O operations (like file system access or network requests) using a non-blocking, event-driven architecture, primarily through an event loop and libuv (a C++ library). This allows Node.js to perform I/O operations concurrently without blocking the main thread. Browser-based JS also uses an event loop for asynchronous operations, but its I/O is typically limited to network requests (Fetch API, XMLHttpRequest) and user interaction, not direct file system access.
5.  **Code Example(s)**:

    ```javascript
    // Browser-specific code (will error in Node.js)
    // console.log(window);
    // document.body.style.backgroundColor = 'blue';

    // Node.js-specific code (will error in browser without a bundler)
    // const fs = require('fs');
    // fs.readFile('./myfile.txt', 'utf8', (err, data) => {
    //     if (err) throw err;
    //     console.log(data);
    // });
    ```

---

### **Question 7: Basic**

1.  **Main Question**: What is NPM (Node Package Manager), and what is the purpose of the `package.json` file in a Node.js project?
2.  **Answer**:
    *   **NPM (Node Package Manager)**: It's the default package manager for Node.js. It serves two main purposes:
        1.  **Software Registry**: A vast online repository of open-source Node.js packages (libraries, frameworks, tools).
        2.  **Command-Line Utility**: A tool that helps developers install, manage, and publish Node.js packages.
    *   **`package.json`**: This file is a manifest for a Node.js project. It's a JSON file that lives in the root directory of your project and contains metadata about the project and its dependencies.
        *   It defines project properties like `name`, `version`, `description`, `author`, `license`.
        *   It lists project dependencies (`dependencies` for production, `devDependencies` for development).
        *   It defines scripts that can be run using `npm run <script-name>`.
        *   It specifies the main entry point of the application (`main`).
3.  **Follow-up Questions**:
    *   What is the difference between `dependencies` and `devDependencies` in `package.json`?
    *   How would you install a package and save it as a development dependency?
    *   What happens when you run `npm install` in a project that already has a `package.json` file?
4.  **Follow-up Answers**:
    *   `dependencies` are packages required for the application to run in a production environment (e.g., Express.js, React). `devDependencies` are packages only needed during development or testing (e.g., testing frameworks like Jest, build tools like Webpack, linters like ESLint).
    *   You would use the command `npm install <package-name> --save-dev` or `npm install <package-name> -D`.
    *   When you run `npm install` without any arguments in a directory containing a `package.json` file, NPM reads the file and installs all the `dependencies` and `devDependencies` listed in it into the `node_modules` folder, ensuring all project requirements are met.
5.  **Code Example(s)**:

    ```json
    // Example package.json snippet
    {
      "name": "my-node-app",
      "version": "1.0.0",
      "description": "A simple Node.js application.",
      "main": "index.js",
      "scripts": {
        "start": "node index.js",
        "test": "jest"
      },
      "dependencies": {
        "express": "^4.18.2",
        "lodash": "^4.17.21"
      },
      "devDependencies": {
        "jest": "^29.7.0",
        "nodemon": "^3.0.1"
      },
      "author": "Your Name",
      "license": "MIT"
    }
    ```

---

### **Question 8: Intermediate**

1.  **Main Question**: Explain the concept of "closures" in JavaScript. How do they work, and what are some common use cases?
2.  **Answer**: A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In simpler terms, a closure gives you access to an outer function's scope from an inner function.
    *   **How it works**: When an inner function is defined within an outer function, the inner function "remembers" the environment in which it was created. Even if the outer function has finished executing and its scope would normally be destroyed, the closure keeps that scope alive for the inner function to access.
    *   **Use Cases**:
        *   **Data Privacy/Encapsulation**: Creating private variables or methods.
        *   **Currying/Partial Application**: Creating specialized functions.
        *   **Maintaining State**: In event handlers or asynchronous operations.
        *   **Module Pattern**: Creating self-contained modules.
3.  **Follow-up Questions**:
    *   Can a closure access variables from its outer scope even after the outer function has returned?
    *   What is a potential pitfall or common mistake when using closures in loops?
    *   How are closures related to the concept of lexical scope?
4.  **Follow-up Answers**:
    *   Yes, this is the core characteristic of a closure. The inner function retains a reference to the outer function's scope, allowing it to access and manipulate variables from that scope even after the outer function has completed execution.
    *   A common pitfall is when closures are created inside loops using `var`. Because `var` is function-scoped (or global) and hoisted, all closures created in the loop will share the *same* reference to the loop variable's final value, leading to unexpected results. Using `let` or `const` (which are block-scoped) or creating a new scope for each iteration can solve this.
    *   Closures are fundamentally built upon lexical scope. Lexical scope means that the scope of a variable is determined by its position in the source code (where it's written), not by where it's called. A closure "closes over" its lexical environment, meaning it remembers the variables and arguments that were in scope when it was defined.
5.  **Code Example(s)**:

    ```javascript
    // Example 1: Data Privacy / Counter
    function createCounter() {
        let count = 0; // 'count' is a private variable due to closure
        return {
            increment: function() {
                count++;
                return count;
            },
            decrement: function() {
                count--;
                return count;
            },
            getCount: function() {
                return count;
            }
        };
    }

    const counter = createCounter();
    console.log(counter.increment()); // Output: 1
    console.log(counter.increment()); // Output: 2
    console.log(counter.getCount());  // Output: 2

    // Example 2: Closure in a loop (correct way with let)
    function createFunctions() {
        const result = [];
        for (let i = 0; i < 3; i++) { // Using let ensures each iteration has its own 'i'
            result.push(function() {
                console.log(i);
            });
        }
        return result;
    }
    const funcs = createFunctions();
    funcs[0](); // Output: 0
    funcs[1](); // Output: 1
    funcs[2](); // Output: 2
    ```

---

### **Question 9: Intermediate**

1.  **Main Question**: Explain the concept of the "prototype chain" in JavaScript. How does JavaScript achieve inheritance using prototypes?
2.  **Answer**: In JavaScript, objects can inherit properties and methods from other objects through a mechanism called the "prototype chain." Every JavaScript object has an internal `[[Prototype]]` property (accessible via `__proto__` or `Object.getPrototypeOf()`) that points to another object, which is its prototype.
    *   **How it works**: When you try to access a property or method on an object, JavaScript first checks if the property exists directly on that object. If not, it looks for the property on the object's prototype. If still not found, it continues up the prototype chain until it either finds the property or reaches `null` (the end of the chain).
    *   **Inheritance**: This chain allows objects to inherit properties and methods from their ancestors, mimicking classical inheritance without explicit classes (though ES6 `class` syntax is syntactic sugar over prototypes).
3.  **Follow-up Questions**:
    *   What is the `Object.prototype` and where does it sit in the prototype chain?
    *   How does `instanceof` operator relate to the prototype chain?
    *   Can you modify an object's prototype after it's been created? What are the implications?
4.  **Follow-up Answers**:
    *   `Object.prototype` is the base prototype for all objects in JavaScript. It sits at the very end of most prototype chains (just before `null`). It contains common methods like `toString()`, `hasOwnProperty()`, `isPrototypeOf()`, etc.
    *   The `instanceof` operator checks if an object's prototype chain contains the `prototype` property of a constructor. For example, `myObject instanceof MyConstructor` returns `true` if `MyConstructor.prototype` exists anywhere in `myObject`'s prototype chain.
    *   Yes, you can modify an object's prototype using `Object.setPrototypeOf()` or by directly modifying the `__proto__` property (though `__proto__` is generally discouraged for performance reasons and `Object.setPrototypeOf()` is preferred). Modifying a prototype affects all objects that inherit from it, which can have significant and sometimes unintended side effects on existing instances and future instances.
5.  **Code Example(s)**:

    ```javascript
    // Example 1: Basic prototype chain
    const animal = {
        eats: true,
        walk() {
            console.log("Animal walks.");
        }
    };

    const rabbit = {
        jumps: true,
        __proto__: animal // rabbit inherits from animal
    };

    const longEar = {
        earLength: 10,
        __proto__: rabbit // longEar inherits from rabbit, which inherits from animal
    };

    console.log(longEar.eats); // Output: true (inherited from animal)
    longEar.walk();            // Output: Animal walks. (inherited from animal)
    console.log(longEar.jumps); // Output: true (inherited from rabbit)

    // Example 2: Using Object.create
    const personPrototype = {
        greet() {
            console.log(`Hello, my name is ${this.name}`);
        }
    };

    const john = Object.create(personPrototype);
    john.name = "John";
    john.greet(); // Output: Hello, my name is John
    ```

---

### **Question 