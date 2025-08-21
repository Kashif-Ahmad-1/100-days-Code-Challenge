Welcome to Day 3 of your interview prep! It's great to have you here. We've covered a lot of ground in the past two days, focusing on core JavaScript concepts and the fundamental differences between browser and Node.js environments.

Today, we'll continue our deep dive, exploring more advanced JavaScript features, delving deeper into Node.js specifics, and touching upon some architectural and best-practice considerations. Remember, this is a discussion to understand your depth of knowledge.

Let's begin!

---

### **Question 1: Basic**

1.  **Main Question**: What is a JavaScript Promise, and why were Promises introduced? Provide a basic example of how to create and consume a Promise.
2.  **Answer**: A Promise is an object representing the eventual completion or failure of an asynchronous operation. It acts as a placeholder for a value that is not yet available but will be resolved at some point in the future (or rejected if an error occurs).
    Promises were introduced in ES6 (ECMAScript 2015) to manage asynchronous operations more cleanly and avoid "callback hell" or the "pyramid of doom," which often results from deeply nested callback functions. They provide a more structured and readable way to handle asynchronous code.
3.  **Follow-up Questions**:
    *   What are the three states a Promise can be in?
    *   What is the purpose of `.then()` and `.catch()` methods on a Promise?
    *   Can a Promise be resolved or rejected more than once?
4.  **Follow-up Answers**:
    *   A Promise can be in one of three states:
        *   **Pending**: Initial state, neither fulfilled nor rejected.
        *   **Fulfilled (or Resolved)**: Meaning that the operation completed successfully.
        *   **Rejected**: Meaning that the operation failed.
    *   `.then()` is used to register a callback function that will be executed when the Promise is successfully fulfilled. It can take two arguments: one for success and one for failure (though `.catch()` is generally preferred for errors). `.catch()` is a shorthand for `.then(null, rejectionHandler)` and is used to register a callback function that will be executed when the Promise is rejected, providing a cleaner way to handle errors.
    *   No, a Promise can only settle (resolve or reject) once. Once it transitions from `pending` to either `fulfilled` or `rejected`, its state becomes immutable, and any further attempts to resolve or reject it will be ignored.
5.  **Code Example(s)**:

    ```javascript
    // Creating a Promise
    const myPromise = new Promise((resolve, reject) => {
        const success = true; // Simulate an async operation result
        setTimeout(() => {
            if (success) {
                resolve("Data fetched successfully!");
            } else {
                reject("Failed to fetch data.");
            }
        }, 1000);
    });

    // Consuming a Promise
    myPromise
        .then((message) => {
            console.log("Success:", message);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    console.log("Promise initiated..."); // This will log first
    ```

---

### **Question 2: Basic**

1.  **Main Question**: Explain the purpose of the `async` and `await` keywords in JavaScript. How do they simplify asynchronous code?
2.  **Answer**: `async` and `await` are syntactic sugar built on top of Promises, introduced in ES2017 (ES8), designed to make asynchronous code look and behave more like synchronous code, making it easier to read and write.
    *   The `async` keyword is used to declare an asynchronous function. An `async` function implicitly returns a Promise. If the function returns a non-Promise value, it's wrapped in a resolved Promise.
    *   The `await` keyword can only be used inside an `async` function. It pauses the execution of the `async` function until the Promise it's waiting for settles (either resolves or rejects). If the Promise resolves, `await` returns its resolved value. If it rejects, `await` throws the rejected value as an error, which can then be caught using `try...catch`.
3.  **Follow-up Questions**:
    *   What happens if you use `await` outside an `async` function?
    *   How do you handle errors when using `async/await`?
    *   Can `async/await` completely replace Promises, or are they complementary?
4.  **Follow-up Answers**:
    *   Using `await` outside an `async` function will result in a `SyntaxError`. `await` can only be used within `async` functions (or at the top level of JavaScript modules, as of ES2022).
    *   Errors with `async/await` are handled using standard `try...catch` blocks. If an `await`ed Promise rejects, it throws an error that can be caught by a surrounding `try...catch` block.
    *   `async/await` doesn't replace Promises; rather, it builds on top of them. `async` functions always return Promises, and `await` expressions always wait for Promises. They are complementary, with `async/await` providing a more ergonomic syntax for consuming Promises.
5.  **Code Example(s)**:

    ```javascript
    function fetchUser() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ id: 1, name: 'Alice' });
            }, 1000);
        });
    }

    async function getUserData() {
        console.log("Fetching user...");
        try {
            const user = await fetchUser(); // Pause execution until fetchUser Promise resolves
            console.log("User data:", user);
            return user;
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error; // Re-throw to propagate the error
        }
    }

    getUserData();
    console.log("Operation started..."); // This logs before user data
    ```

---

### **Question 3: Basic**

1.  **Main Question**: What are ES Modules (`import`/`export`) in JavaScript, and why are they preferred over older module patterns like CommonJS (`require`/`module.exports`) for front-end development?
2.  **Answer**: ES Modules (ECMAScript Modules), introduced in ES6, provide a standardized way to organize JavaScript code into reusable units. They use `import` to bring in functionality from other modules and `export` to make functionality available.
    While Node.js traditionally used CommonJS, ES Modules are preferred for front-end development because:
    *   **Standardization**: They are an official part of the JavaScript language specification, supported natively by modern browsers.
    *   **Static Analysis**: Imports and exports are resolved at compile time (or parse time), allowing for better static analysis, tree-shaking (removing unused code), and optimized bundling.
    *   **Asynchronous Loading**: ES Modules are designed to be loaded asynchronously, which is crucial for performance in web browsers.
    *   **Clearer Syntax**: The `import`/`export` syntax is generally considered more declarative and readable.
3.  **Follow-up Questions**:
    *   What is the difference between named exports and default exports?
    *   Can ES Modules be used in Node.js? If so, how?
    *   What is "tree-shaking" and how does it relate to ES Modules?
4.  **Follow-up Answers**:
    *   **Named Exports**: Allow you to export multiple values from a module by their names (e.g., `export const foo = ...; export function bar() { ... }`). When importing, you must use the exact names (e.g., `import { foo, bar } from './myModule';`).
    *   **Default Exports**: Allows you to export a single "main" value from a module (e.g., `export default myValue;`). When importing, you can give it any name you want (e.g., `import MyValue from './myModule';`). A module can have only one default export.
    *   Yes, ES Modules can be used in Node.js. You can enable them by setting `"type": "module"` in your `package.json` file, or by using the `.mjs` file extension for your module files.
    *   "Tree-shaking" (or dead code elimination) is a build optimization process that removes unused code from your final JavaScript bundle. It works effectively with ES Modules because their static nature allows bundlers (like Webpack or Rollup) to determine exactly which exports are being used and which are not, thus excluding the unused code.
5.  **Code Example(s)**:

    ```javascript
    // myModule.js
    export const PI = 3.14; // Named export
    export function sum(a, b) { // Named export
        return a + b;
    }
    const subtract = (a, b) => a - b;
    export default subtract; // Default export

    // main.js
    import { PI, sum } from './myModule.js';
    import mySubtractFunction from './myModule.js'; // Can name it anything

    console.log(PI); // Output: 3.14
    console.log(sum(5, 3)); // Output: 8
    console.log(mySubtractFunction(10, 4)); // Output: 6
    ```

---

### **Question 4: Basic**

1.  **Main Question**: What is JSON (JavaScript Object Notation), and why is it so widely used for data exchange in web applications?
2.  **Answer**: JSON (JavaScript Object Notation) is a lightweight data-interchange format. It's a text-based format that is completely language-independent but uses conventions that are familiar to programmers of the C-family of languages (including JavaScript).
    It's widely used for data exchange in web applications because:
    *   **Human-readable**: It's easy for humans to read and write.
    *   **Machine-parseable**: It's easy for machines to parse and generate.
    *   **Lightweight**: Its syntax is minimal, making it efficient for data transfer.
    *   **Language-agnostic**: While derived from JavaScript, it's a universal format that can be used with almost any programming language.
    *   **Direct mapping to objects/arrays**: Its structure directly maps to JavaScript objects and arrays, making parsing and serialization straightforward in JavaScript environments.
3.  **Follow-up Questions**:
    *   What are the basic data types supported in JSON?
    *   What is the difference between `JSON.parse()` and `JSON.stringify()`?
    *   Can JSON directly store JavaScript functions or `Date` objects?
4.  **Follow-up Answers**:
    *   JSON supports the following basic data types: strings, numbers, booleans (`true`/`false`), `null`, objects (key-value pairs), and arrays.
    *   `JSON.parse()` takes a JSON string as input and converts it into a JavaScript object or value. `JSON.stringify()` takes a JavaScript object or value as input and converts it into a JSON string.
    *   No, JSON cannot directly store JavaScript functions or `Date` objects. When `JSON.stringify()` encounters a function, `undefined`, or a Symbol, it will either omit it or convert it to `null`. `Date` objects are converted to ISO 8601 strings when stringified.
5.  **Code Example(s)**:

    ```javascript
    // JavaScript Object
    const user = {
        name: "Jane Doe",
        age: 28,
        isAdmin: false,
        courses: ["JS", "Node", "React"]
    };

    // Convert JavaScript object to JSON string
    const jsonString = JSON.stringify(user);
    console.log("JSON String:", jsonString);
    // Output: {"name":"Jane Doe","age":28,"isAdmin":false,"courses":["JS","Node","React"]}

    // Convert JSON string back to JavaScript object
    const parsedObject = JSON.parse(jsonString);
    console.log("Parsed Object:", parsedObject);
    // Output: { name: 'Jane Doe', age: 28, isAdmin: false, courses: [ 'JS', 'Node', 'React' ] }
    ```

---

### **Question 5: Basic**

1.  **Main Question**: Explain the fundamental difference between synchronous and asynchronous operations in JavaScript. Why is asynchronous programming crucial for web and Node.js applications?
2.  **Answer**:
    *   **Synchronous Operations**: Execute sequentially, one after another. Each operation must complete before the next one starts. If a synchronous operation takes a long time, it will "block" the execution of the rest of the code, making the application unresponsive.
    *   **Asynchronous Operations**: Execute independently and in parallel with the main program flow. They initiate a task (like fetching data from a server or reading a file) and then immediately return control to the main program. When the task completes, a callback function (or Promise resolution) is executed.
    Asynchronous programming is crucial because:
    *   **Non-blocking UI (Web)**: In browsers, long-running synchronous tasks would freeze the user interface, leading to a poor user experience. Asynchronous operations ensure the UI remains responsive.
    *   **Scalability (Node.js)**: Node.js is single-threaded. If I/O operations (like network requests or database queries) were synchronous, the server would be blocked waiting for each operation to complete, severely limiting its ability to handle multiple concurrent requests. Asynchronous I/O allows Node.js to handle many requests efficiently without blocking the main thread.
3.  **Follow-up Questions**:
    *   Can you give an example of a built-in JavaScript function that is synchronous and one that is asynchronous?
    *   What mechanism does JavaScript use to handle asynchronous operations?
    *   If you have two asynchronous operations, how can you ensure one runs only after the other completes?
4.  **Follow-up Answers**:
    *   **Synchronous**: `alert()`, `prompt()`, `console.log()`, array methods like `map()`, `filter()`, `JSON.parse()`.
    *   **Asynchronous**: `setTimeout()`, `setInterval()`, `fetch()`, `XMLHttpRequest`, Node.js `fs.readFile()`.
    *   JavaScript uses the **Event Loop** (along with the Call Stack, Web APIs/Node.js C++ APIs, and Callback Queue/Microtask Queue) to manage asynchronous operations.
    *   You can ensure sequential execution of asynchronous operations using:
        *   **Callbacks**: Nesting them (though this can lead to callback hell).
        *   **Promises**: Chaining `.then()` calls.
        *   **`async/await`**: Using `await` to pause execution until a Promise resolves.
5.  **Code Example(s)**:

    ```javascript
    // Synchronous example
    console.log("Start sync operation.");
    for (let i = 0; i < 1000000000; i++) {
        // Simulate a heavy synchronous task
    }
    console.log("End sync operation."); // This logs after the loop finishes

    // Asynchronous example
    console.log("Start async operation.");
    setTimeout(() => {
        console.log("Async operation completed after 1 second.");
    }, 1000);
    console.log("End async operation (this logs before the timeout).");
    ```

---

### **Question 6: Basic**

1.  **Main Question**: How do you create and manipulate objects in JavaScript? List at least three common ways to create objects.
2.  **Answer**: JavaScript objects are collections of key-value pairs (properties) and functions (methods).
    Common ways to create objects:
    1.  **Object Literal Syntax**: The simplest and most common way.
        ```javascript
        const myObject = {
            key1: 'value1',
            method1: function() { /* ... */ }
        };
        ```
    2.  **`new Object()` Constructor**: Less common than literal, but equivalent.
        ```javascript
        const myObject = new Object();
        myObject.key1 = 'value1';
        myObject.method1 = function() { /* ... */ };
        ```
    3.  **Constructor Functions**: Used to create multiple objects of the same "type" with shared properties and methods.
        ```javascript
        function Person(name, age) {
            this.name = name;
            this.age = age;
            this.greet = function() {
                console.log(`Hello, my name is ${this.name}`);
            };
        }
        const john = new Person('John', 30);
        ```
    4.  **ES6 Classes**: Syntactic sugar over constructor functions and prototypes.
        ```javascript
        class Car {
            constructor(make, model) {
                this.make = make;
                this.model = model;
            }
            start() {
                console.log(`${this.make} ${this.model} started.`);
            }
        }
        const myCar = new Car('Toyota', 'Camry');
        ```
    5.  **`Object.create()`**: Creates a new object, using an existing object as the prototype of the newly created object.
        ```javascript
        const proto = { value: 10 };
        const obj = Object.create(proto);
        console.log(obj.value); // 10
        ```
    **Manipulation**:
    *   **Add/Modify Property**: `obj.newProp = 'value';` or `obj['anotherProp'] = 'value';`
    *   **Access Property**: `obj.propName` or `obj['propName']`
    *   **Delete Property**: `delete obj.propName;`
3.  **Follow-up Questions**:
    *   What is the main advantage of using constructor functions or ES6 classes over object literals for creating multiple similar objects?
    *   How does property access using dot notation (`obj.prop`) differ from bracket notation (`obj['prop']`)?
    *   When would you use `Object.create()`?
4.  **Follow-up Answers**:
    *   The main advantage is reusability and consistency. They allow you to define a blueprint for objects, ensuring all instances have the same structure and methods, and facilitate inheritance through the prototype chain. Object literals are good for single, unique objects.
    *   Dot notation is used when the property name is a fixed, valid JavaScript identifier. Bracket notation is used when the property name is dynamic (e.g., stored in a variable) or contains special characters (like spaces or hyphens) that are not valid in dot notation.
    *   `Object.create()` is useful when you want to create an object with a specific prototype object, allowing for explicit control over the prototype chain. It's often used for classical inheritance patterns or when you want to create a truly empty object without `Object.prototype` in its chain (`Object.create(null)`).
5.  **Code Example(s)**:

    ```javascript
    // Object Literal
    const book = {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925,
        getSummary: function() {
            return `${this.title} by ${this.author} (${this.year})`;
        }
    };
    console.log(book.getSummary());

    // ES6 Class
    class Vehicle {
        constructor(type) {
            this.type = type;
        }
        drive() {
            console.log(`Driving the ${this.type}.`);
        }
    }
    const myBike = new Vehicle('bicycle');
    myBike.drive();
    ```

---

### **Question 7: Basic**

1.  **Main Question**: What is type coercion in JavaScript? Provide examples of both implicit and explicit type coercion.
2.  **Answer**: Type coercion is the automatic or implicit conversion of values from one data type to another (e.g., number to string, string to boolean). JavaScript is a loosely typed language, and it often performs type coercion when operations involve values of different types.
    *   **Implicit Coercion**: JavaScript automatically converts types without explicit instruction from the developer. This often happens with equality operators (`==`), logical operators, and arithmetic operations.
    *   **Explicit Coercion**: The developer intentionally converts types using built-in functions or methods (e.g., `Number()`, `String()`, `Boolean()`, `parseInt()`).
3.  **Follow-up Questions**:
    *   Why is implicit coercion sometimes considered a "gotcha" in JavaScript?
    *   What is the result of `[] + {}` and `{}` + `[]` in JavaScript, and why?
    *   How can you explicitly convert a string to a number, and vice-versa?
4.  **Follow-up Answers**:
    *   Implicit coercion can lead to unexpected and hard-to-debug behavior because JavaScript's rules for coercion can be complex and non-obvious. For example, `0 == false` is true, `'1' == 1` is true, but `[] == ![]` is also true. This unpredictability is why strict equality (`===`) is generally preferred.
    *   `[] + {}` results in the string `"[object Object]"`. When `+` operator is used with an array and an object, both are converted to primitive values. `[]` becomes `""` and `{}` becomes `"[object Object]"`, then concatenated.
    *   `{}` + `[]` is more complex. In a browser's console, if `{}` is at the start of a line, it's often parsed as a block statement, not an object literal, so it's ignored. The expression then becomes `+[]`, which coerces `[]` to `0`. If wrapped in parentheses `({} + [])`, it would result in `"[object Object]"`. In Node.js, `{}` is always parsed as an object literal, so it results in `"[object Object]"`. This highlights the "gotcha" nature.
    *   **String to Number**: `Number('123')`, `parseInt('123')`, `parseFloat('3.14')`, or using the unary plus operator `+'123'`.
    *   **Number to String**: `String(123)`, `(123).toString()`, or using string concatenation `'' + 123`.
5.  **Code Example(s)**:

    ```javascript
    // Implicit Coercion
    console.log(5 + '5');      // "55" (number 5 coerced to string "5", then concatenated)
    console.log(true + 1);     // 2 (boolean true coerced to number 1)
    console.log('10' / '2');   // 5 (strings "10" and "2" coerced to numbers, then division)
    console.log(null == undefined); // true (loosely equal)
    console.log(0 == false);   // true (loosely equal)

    // Explicit Coercion
    console.log(Number('123'));    // 123
    console.log(String(456));      // "456"
    console.log(Boolean(0));       // false
    console.log(Boolean('hello')); // true
    ```

---

### **Question 8: Intermediate**

1.  **Main Question**: Explain the `call()`, `apply()`, and `bind()` methods in JavaScript. How do they relate to the `this` keyword?
2.  **Answer**: `call()`, `apply()`, and `bind()` are methods available on all JavaScript functions (as functions are objects). Their primary purpose is to explicitly control the value of the `this` keyword inside a function, allowing you to set the context of execution.
    *   **`call()`**: Invokes the function immediately with a specified `this` context and arguments passed individually.
        `func.call(thisArg, arg1, arg2, ...)`
    *   **`apply()`**: Invokes the function immediately with a specified `this` context and arguments passed as an array (or array-like object).
        `func.apply(thisArg, [argsArray])`
    *   **`bind()`**: Returns a *new function* (a "bound function") with the `this` context permanently bound to a specified value, and optionally, initial arguments. The function is *not* invoked immediately.
        `func.bind(thisArg, arg1, arg2, ...)`
3.  **Follow-up Questions**:
    *   When would you typically choose `call()` over `apply()`, and vice versa?
    *   Why is `bind()` particularly useful in event handling or when passing functions as callbacks?
    *   Can `call()`, `apply()`, or `bind()` be used with arrow functions to change their `this` context?
4.  **Follow-up Answers**:
    *   You'd choose `call()` when you know the arguments beforehand and can pass them individually. You'd choose `apply()` when you have the arguments in an array or an array-like object (e.g., `arguments` object) and want to pass them all at once.
    *   `bind()` is useful in event handling or callbacks because it allows you to create a new function with a fixed `this` context without immediately executing it. This ensures that when the event fires or the callback is invoked later, `this` will correctly refer to the intended object, rather than the global object or `undefined` (in strict mode).
    *   No, `call()`, `apply()`, or `bind()` cannot change the `this` context of an arrow function. Arrow functions have lexical `this` binding, meaning their `this` value is determined by their surrounding scope at the time of definition, and it cannot be overridden by these methods.
5.  **Code Example(s)**:

    ```javascript
    const person = {
        name: 'Alice',
        greet: function(city, country) {
            console.log(`Hello, my name is ${this.name} from ${city}, ${country}.`);
        }
    };

    const anotherPerson = {
        name: 'Bob'
    };

    // Using call() - arguments passed individually
    person.greet.call(anotherPerson, 'New York', 'USA'); // Output: Hello, my name is Bob from New York, USA.

    // Using apply() - arguments passed as an array
    const args = ['London', 'UK'];
    person.greet.apply(anotherPerson, args); // Output: Hello, my name is Bob from London, UK.

    // Using bind() - returns a new function
    const boundGreet = person.greet.bind(anotherPerson, 'Paris', 'France');
    boundGreet(); // Output: Hello, my name is Bob from Paris, France.
    ```

---

### **Question 9: Intermediate**

1.  **Main Question**: Explain what the Node.js Event Loop is and how it enables Node.js to handle concurrency with a single-threaded model.
2.  **Answer**: The Node.js Event Loop is the core mechanism that allows Node.js to perform non-blocking I/O operations despite being single-threaded. It continuously checks for tasks in the Call Stack, and if the Call Stack is empty, it processes events from the Callback Queue.
    **How it works**:
    1.  **Call Stack**: Executes synchronous code.
    2.  **Node.js APIs (libuv)**: When an asynchronous operation (like a file read or network request) is encountered, it's offloaded to Node.js's underlying C++ APIs (powered by libuv, which uses a thread pool for heavy I/O).
    3.  **Callback Queue (Task Queue)**: Once an asynchronous operation completes, its associated callback function is placed into the Callback Queue.
    4.  **Event Loop**: The Event Loop's job is to constantly monitor the Call Stack. If the Call Stack is empty, it takes the first callback from the Callback Queue and pushes it onto the Call Stack for execution.
    This continuous cycle allows Node.js to initiate many I/O operations without waiting for each to complete, keeping the single main thread free to handle other requests, thus achieving high concurrency.
3.  **Follow-up Questions**:
    *   Name the different phases of the Node.js Event Loop and briefly describe their purpose.
    *   What is the difference between `process.nextTick()` and `setImmediate()` in relation to the Event Loop?
    *   How does the Node.js Event Loop differ from the browser's Event Loop?
4.  **Follow-up Answers**:
    *   The Node.js Event Loop has several phases:
        *   **timers**: Executes `setTimeout()` and `setInterval()` callbacks.
        *   **pending callbacks**: Executes I/O callbacks deferred to the next loop iteration.
        *   **idle, prepare**: Internal to Node