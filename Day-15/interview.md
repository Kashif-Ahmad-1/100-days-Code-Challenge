Welcome to Day 15 of your interview prep! Let's start with some fundamentals and gradually move to more intricate concepts. Take your time, think through the questions, and feel free to elaborate.

---

### Question 1: Basic

1.  **Main Question**: Explain the purpose of `JSON.stringify()` and `JSON.parse()` in JavaScript. When would you use each?
2.  **Answer**:
    *   `JSON.stringify()` converts a JavaScript value (usually an object or array) into a JSON (JavaScript Object Notation) string. This is commonly used when sending data to a web server, storing data in web storage (like `localStorage`), or for debugging to get a string representation of an object.
    *   `JSON.parse()` converts a JSON string back into a JavaScript value (object, array, string, number, boolean, or null). This is used when receiving data from a web server or retrieving data from web storage.
3.  **Follow-up Questions**:
    *   What happens if you try to `JSON.stringify()` a function or `undefined` value?
    *   Can `JSON.parse()` throw an error? If so, when?
    *   Why is JSON a popular data interchange format?
4.  **Follow-up Answers**:
    *   `JSON.stringify()` will omit functions, `undefined`, and `Symbol` values when they are properties of an object. If a function or `undefined` is the value being stringified on its own (not as a property), it will return `undefined`.
    *   Yes, `JSON.parse()` can throw a `SyntaxError` if the input string is not valid JSON. For example, if it contains trailing commas, unquoted keys, or invalid characters.
    *   JSON is popular because it is human-readable, lightweight, and easily parsable by machines. It's language-independent, making it ideal for data exchange between different programming languages and systems.
5.  **Code Example(s)**:

    ```javascript
    const user = {
        name: "Alice",
        age: 30,
        isAdmin: false,
        greet: () => console.log("Hello!") // This will be omitted
    };

    // Stringify
    const jsonString = JSON.stringify(user);
    console.log(jsonString); // Output: {"name":"Alice","age":30,"isAdmin":false}

    // Parse
    const parsedUser = JSON.parse(jsonString);
    console.log(parsedUser.name); // Output: Alice

    // Example of JSON.parse() error
    try {
        JSON.parse('{ "name": "Bob", }'); // Invalid JSON (trailing comma)
    } catch (e) {
        console.error("Parse error:", e.message); // Output: Parse error: Unexpected token } in JSON at position 18
    }
    ```

### Question 2: Basic

1.  **Main Question**: What is the purpose of the `package.json` file in a Node.js project? Name a few key fields you would typically find in it.
2.  **Answer**: The `package.json` file is a manifest file for a Node.js project. It contains metadata about the project, such as its name, version, description, main entry point, and, most importantly, a list of its dependencies. It's crucial for managing project metadata, dependencies, and scripts.
3.  **Follow-up Questions**:
    *   What's the difference between `dependencies` and `devDependencies`?
    *   How do `npm install` and `npm ci` differ in how they use `package.json` and `package-lock.json`?
    *   What is the `scripts` field used for?
4.  **Follow-up Answers**:
    *   `dependencies` are packages required for the application to run in production. `devDependencies` are packages only needed for development and testing (e.g., testing frameworks, build tools, linters).
    *   `npm install` installs dependencies based on `package.json` and updates `package-lock.json`. `npm ci` (clean install) installs dependencies strictly based on `package-lock.json`, ensuring consistent builds, and will fail if `package.json` and `package-lock.json` are out of sync. It's often preferred in CI/CD environments.
    *   The `scripts` field defines command-line scripts that can be run using `npm run <script-name>`. Common examples include `start`, `test`, `build`, etc.
5.  **Code Example(s)**:

    ```json
    {
      "name": "my-node-app",
      "version": "1.0.0",
      "description": "A simple Node.js application",
      "main": "index.js",
      "scripts": {
        "start": "node index.js",
        "test": "jest",
        "dev": "nodemon index.js"
      },
      "keywords": ["node", "express"],
      "author": "Your Name",
      "license": "MIT",
      "dependencies": {
        "express": "^4.17.1"
      },
      "devDependencies": {
        "jest": "^27.0.6",
        "nodemon": "^2.0.12"
      }
    }
    ```

### Question 3: Basic

1.  **Main Question**: Describe the difference between a primitive value and an object in JavaScript, focusing on how they are handled in terms of mutability and assignment.
2.  **Answer**:
    *   **Primitive Values** (e.g., numbers, strings, booleans, `null`, `undefined`, `Symbol`, `BigInt`) are immutable. When you assign a primitive variable to another, a copy of the value is made. Changes to one variable do not affect the other.
    *   **Objects** (e.g., plain objects, arrays, functions, dates) are mutable. When you assign an object variable to another, you are copying a *reference* to the same object in memory, not the object itself. Therefore, changes made through one variable will be visible through the other, as they both point to the same underlying data.
3.  **Follow-up Questions**:
    *   How can you create a *deep copy* of an object in JavaScript?
    *   Are strings primitive or object types, and why does this matter for string manipulation?
    *   What does it mean for a primitive value to be "immutable"?
4.  **Follow-up Answers**:
    *   To create a deep copy of an object, you can use `JSON.parse(JSON.stringify(obj))` (with limitations like losing functions, dates, etc.) or more robust libraries like Lodash's `_.cloneDeep()`. Manually, you'd recursively copy all nested objects and arrays.
    *   Strings are primitive types in JavaScript. This means that string methods (like `toUpperCase()`, `slice()`) do not modify the original string but return a *new* string. The original string remains unchanged.
    *   "Immutable" means that once a primitive value is created, it cannot be changed. If you perform an operation that seems to change a primitive (e.g., `let x = 5; x = 10;`), you are not changing the original `5`; you are simply assigning a *new* value (`10`) to the variable `x`.
5.  **Code Example(s)**:

    ```javascript
    // Primitive Example
    let a = 10;
    let b = a; // b gets a copy of the value 10
    b = 20;
    console.log(a); // Output: 10 (a is unaffected)
    console.log(b); // Output: 20

    // Object Example
    let obj1 = { value: 10 };
    let obj2 = obj1; // obj2 gets a reference to the same object as obj1
    obj2.value = 20;
    console.log(obj1.value); // Output: 20 (obj1 is affected because they point to the same object)
    console.log(obj2.value); // Output: 20
    ```

### Question 4: Basic

1.  **Main Question**: Explain the difference between `console.log()` and `console.error()` in Node.js (or browser). When would you choose to use `console.error()`?
2.  **Answer**:
    *   `console.log()` is used for general purpose logging of information, variables, or debug messages. By default, it outputs to the standard output stream (`stdout`).
    *   `console.error()` is specifically designed for logging error messages. By default, it outputs to the standard error stream (`stderr`).
    *   You would choose `console.error()` when reporting an error condition, a warning, or anything that indicates a problem in your application's execution. This distinction is important for tools that process logs, as they can differentiate between normal output and error messages.
3.  **Follow-up Questions**:
    *   Why is directing errors to `stderr` important in a production environment?
    *   Are there other `console` methods you might use for debugging?
    *   Does `console.error()` stop the execution of your program?
4.  **Follow-up Answers**:
    *   In production, log management systems or monitoring tools often differentiate between `stdout` and `stderr`. Directing errors to `stderr` allows these tools to easily filter, collect, and alert on actual error conditions, separating them from regular application output.
    *   Yes, other useful `console` methods include `console.warn()` for warnings, `console.info()` for informational messages, `console.debug()` for detailed debug messages, `console.table()` for displaying tabular data, and `console.time()`/`console.timeEnd()` for measuring execution time.
    *   No, `console.error()` itself does not stop the execution of your program. It merely logs a message to the error stream. Program execution continues unless an unhandled error or exception occurs elsewhere.
5.  **Code Example(s)**:

    ```javascript
    function divide(a, b) {
        if (b === 0) {
            console.error("Error: Division by zero is not allowed.");
            return NaN;
        }
        console.log(`Result of ${a} / ${b}:`);
        return a / b;
    }

    console.log(divide(10, 2)); // Logs "Result of 10 / 2:" to stdout, then 5
    console.log(divide(10, 0)); // Logs "Error: Division by zero is not allowed." to stderr, then NaN
    ```

### Question 5: Intermediate

1.  **Main Question**: What are `Set` and `Map` in JavaScript? Describe a practical use case for each.
2.  **Answer**:
    *   **`Set`**: A `Set` is a collection of unique values. It allows you to store any type of value, whether primitive or object. Duplicate values are automatically ignored.
        *   **Use Case**: Removing duplicate elements from an array.
    *   **`Map`**: A `Map` is a collection of key-value pairs where keys can be of any data type (unlike plain objects where keys are implicitly strings or symbols). It maintains the insertion order of elements.
        *   **Use Case**: Storing a collection of data where keys are not strings (e.g., DOM elements as keys, or objects as keys) or when insertion order needs to be preserved.
3.  **Follow-up Questions**:
    *   How do you add and remove elements from a `Set`?
    *   What's the difference in iterating over a `Map` versus a plain JavaScript object?
    *   Can you store `null` or `undefined` as values or keys in a `Set` or `Map`?
4.  **Follow-up Answers**:
    *   To add: `mySet.add(value)`. To remove: `mySet.delete(value)`. You can also check for existence with `mySet.has(value)` and clear all elements with `mySet.clear()`.
    *   `Map` objects are directly iterable using `for...of` loops, and they maintain insertion order. You can iterate over `[key, value]` pairs using `map.entries()`, keys using `map.keys()`, or values using `map.values()`. Plain objects require methods like `Object.keys()`, `Object.values()`, or `Object.entries()` to iterate, and their key order is not guaranteed (though modern JS engines generally preserve insertion order for string/symbol keys).
    *   Yes, both `Set` and `Map` can store `null` and `undefined` as values. `Map` can also use `null` and `undefined` as keys.
5.  **Code Example(s)**:

    ```javascript
    // Set Example: Removing duplicates
    const numbers = [1, 2, 3, 2, 4, 1, 5];
    const uniqueNumbers = new Set(numbers);
    console.log([...uniqueNumbers]); // Output: [1, 2, 3, 4, 5]

    // Map Example: Storing user data with user IDs (numbers) as keys
    const userMap = new Map();
    userMap.set(101, { name: "Alice", email: "alice@example.com" });
    userMap.set(102, { name: "Bob", email: "bob@example.com" });
    console.log(userMap.get(101)); // Output: { name: 'Alice', email: 'alice@example.com' }

    // Iterating over a Map
    for (const [id, userData] of userMap) {
        console.log(`User ID: ${id}, Name: ${userData.name}`);
    }
    // Output:
    // User ID: 101, Name: Alice
    // User ID: 102, Name: Bob
    ```

### Question 6: Intermediate

1.  **Main Question**: Explain the difference between synchronous and asynchronous operations in JavaScript. Provide an example of each.
2.  **Answer**:
    *   **Synchronous Operations**: These operations execute one after another in a blocking manner. Each operation must complete before the next one starts. If a synchronous operation takes a long time, it will block the entire execution thread, making the application unresponsive.
    *   **Asynchronous Operations**: These operations run in the background without blocking the main execution thread. The JavaScript engine can continue processing other tasks while the asynchronous operation completes. Once the asynchronous operation is finished, it typically notifies the main thread (e.g., via a callback, Promise resolution, or async/await) so that its result can be handled.
3.  **Follow-up Questions**:
    *   Why is asynchronous programming crucial for Node.js?
    *   What are some common asynchronous patterns in modern JavaScript?
    *   Can you make a synchronous operation asynchronous?
4.  **Follow-up Answers**:
    *   Asynchronous programming is fundamental to Node.js because it allows Node.js to handle many concurrent operations (like I/O requests, database queries, network calls) efficiently without blocking the single-threaded event loop. This enables Node.js to be highly scalable and performant for I/O-bound tasks.
    *   Common asynchronous patterns include Callbacks (older), Promises (modern standard), and `async`/`await` (syntactic sugar over Promises, making asynchronous code look synchronous).
    *   You cannot inherently make a truly synchronous operation asynchronous, as its blocking nature is inherent to its design. However, you can *wrap* a synchronous operation within an asynchronous construct (like a Promise or `setTimeout`) to defer its execution or handle its result asynchronously, but the underlying synchronous work still blocks the thread for its duration. In Node.js, for CPU-bound synchronous tasks, you might use Worker Threads to offload them from the main thread.
5.  **Code Example(s)**:

    ```javascript
    // Synchronous Example
    console.log("Start synchronous operation.");
    function multiply(a, b) {
        let result = a * b; // This calculation happens immediately and blocks until done
        return result;
    }
    const syncResult = multiply(5, 10);
    console.log("Synchronous result:", syncResult);
    console.log("End synchronous operation.");

    // Asynchronous Example
    console.log("Start asynchronous operation.");
    setTimeout(() => {
        console.log("Asynchronous operation completed after 2 seconds.");
    }, 2000); // This function runs after 2 seconds, but doesn't block
    console.log("This line runs immediately, before the async operation completes.");
    console.log("End of script execution (main thread continues).");
    ```

### Question 7: Intermediate

1.  **Main Question**: In Node.js, what are `__dirname` and `__filename`? When are they useful?
2.  **Answer**:
    *   `__dirname`: This global variable holds the absolute path to the directory where the currently executing script is located.
    *   `__filename`: This global variable holds the absolute path to the currently executing script file itself (including the file name).
    *   They are useful for constructing absolute file paths, especially when your application might be run from different working directories. This ensures that file lookups (e.g., reading configuration files, templates, or assets) are always relative to the script's location, making your application more robust and portable.
3.  **Follow-up Questions**:
    *   Why are `__dirname` and `__filename` often preferred over `process.cwd()` for path resolution?
    *   Are `__dirname` and `__filename` available in ES Modules (`import`/`export`)? If not, how do you get similar information?
    *   Can these values change during the execution of a script?
4.  **Follow-up Answers**:
    *   `process.cwd()` returns the current working directory from which the Node.js process was launched. This can vary depending on where the user executes the command. `__dirname` and `__filename`, however, always refer to the location of the script itself, providing a stable and reliable base for resolving relative paths within your project structure.
    *   No, `__dirname` and `__filename` are CommonJS-specific globals and are not directly available in ES Modules. In ES Modules, you can get similar information using `import.meta.url`. You would then use Node.js's `url` module (`fileURLToPath`) and `path` module (`dirname`) to derive the directory and filename.
    *   No, the values of `__dirname` and `__filename` are determined at the time the module is loaded and remain constant throughout the script's execution.
5.  **Code Example(s)**:

    ```javascript
    // Assume this file is located at /home/user/my-project/src/app.js

    console.log('Current directory (from script location):', __dirname);
    // Expected output: /home/user/my-project/src

    console.log('Current file path:', __filename);
    // Expected output: /home/user/my-project/src/app.js

    // Example of using __dirname to read a file relative to the script
    const path = require('path');
    const fs = require('fs');

    const configFilePath = path.join(__dirname, '..', 'config.json');
    // This will correctly point to /home/user/my-project/config.json
    console.log('Constructed config path:', configFilePath);

    // Example of reading a file (synchronously for simplicity)
    try {
        const configContent = fs.readFileSync(configFilePath, 'utf8');
        console.log('Config content:', configContent.substring(0, 20) + '...'); // show first 20 chars
    } catch (error) {
        console.error('Error reading config file:', error.message);
    }
    ```

### Question 8: Hard/Advanced

1.  **Main Question**: Explain the concept of recursion in JavaScript. Provide a simple example of a recursive function. What are the potential drawbacks?
2.  **Answer**:
    *   **Recursion** is a programming technique where a function calls itself directly or indirectly to solve a problem. It's often used when a problem can be broken down into smaller, self-similar subproblems. A recursive function must have a **base case** (a condition that stops the recursion) and a **recursive step** (where the function calls itself with a modified input).
3.  **Follow-up Questions**:
    *   What is a "stack overflow" error in the context of recursion?
    *   When might an iterative solution be preferred over a recursive one?
    *   How can you optimize recursive functions in JavaScript to prevent common issues?
4.  **Follow-up Answers**:
    *   A "stack overflow" error occurs when a recursive function calls itself too many times without reaching a base case, leading to the call stack exceeding its maximum limit. Each function call adds a new frame to the call stack, and too many frames exhaust the available memory.
    *   An iterative solution is often preferred when performance is critical, or when dealing with very deep recursion that might lead to stack overflows. Iterative solutions generally consume less memory (no call stack buildup) and can sometimes be more performant, though recursive solutions can be more elegant and readable for certain problems.
    *   You can optimize recursive functions using techniques like **memoization** (caching results of expensive function calls to avoid recalculating them) or **tail call optimization (TCO)**. While TCO is part of the ES6 specification, JavaScript engines don't widely implement it for general recursion, so it's not a reliable optimization in practice unless specifically targeting environments that support it. For deep recursion in Node.js, converting to an iterative approach or using Worker Threads might be necessary.
5.  **Code Example(s)**:

    ```javascript
    // Recursive function to calculate factorial
    function factorial(n) {
        // Base case: if n is 0 or 1, factorial is 1
        if (n === 0 || n === 1) {
            return 1;
        }
        // Recursive step: n * factorial(n - 1)
        return n * factorial(n - 1);
    }

    console.log("Factorial of 5:", factorial(5)); // Output: 120 (5 * 4 * 3 * 2 * 1)
    console.log("Factorial of 0:", factorial(0)); // Output: 1

    // Example of potential stack overflow (don't run with large numbers in production)
    // console.log(factorial(100000)); // This would likely cause a stack overflow
    ```

### Question 9: Hard/Advanced

1.  **Main Question**: Describe what an Event Emitter is in Node.js. How does it facilitate an event-driven architecture? Provide a simple code example.
2.  **Answer**:
    *   The `EventEmitter` is a core module in Node.js that allows you to work with events. It's a fundamental building block for Node.js's event-driven, non-blocking architecture. It provides methods to `emit` named events and `on` (or `addListener`) to register listener functions that will be called when a specific event is emitted.
    *   It facilitates an event-driven architecture by implementing the **Observer design pattern (or Publish/Subscribe pattern)**. This decouples different parts of an application: an "emitter" object publishes events, and various "listeners" subscribe to these events without the emitter needing to know anything about the listeners. This promotes modularity, flexibility, and scalability, as components can react to events without direct dependencies.
3.  **Follow-up Questions**:
    *   What is the difference between `emitter.on()` and `emitter.once()`?
    *   How do you remove event listeners from an `EventEmitter`?
    *   Can an `EventEmitter` emit an event synchronously or asynchronously?
4.  **Follow-up Answers**:
    *   `emitter.on(eventName, listener)` registers a listener that will be called *every time* the specified `eventName` is emitted. `emitter.once(eventName, listener)` registers a listener that will be called *only once* when the `eventName` is emitted, and then it's automatically removed.
    *   You can remove specific event listeners using `emitter.removeListener(eventName, listenerFunction)` (you need a reference to the original function). To remove all listeners for a specific event, use `emitter.removeAllListeners(eventName)`. To remove all listeners for all events, use `emitter.removeAllListeners()`.
    *   By default, `EventEmitter` emits events **synchronously**. All listeners for an event are called in the order they were registered, blocking the execution until all listeners complete. If you need asynchronous behavior (e.g., to prevent blocking the event loop for long-running listeners), you would explicitly make the listener function asynchronous (e.g., using `process.nextTick` or `setImmediate`).
5.  **Code Example(s)**:

    ```javascript
    const EventEmitter = require('events');

    // Create a new instance of EventEmitter
    class MyLogger extends EventEmitter {
        log(message) {
            console.log(`Log: ${message}`);
            this.emit('messageLogged', message, Date.now()); // Emit an event
        }

        error(err) {
            console.error(`Error: ${err}`);
            this.emit('error', err); // Emit an error event
        }
    }

    const logger = new MyLogger();

    // Register a listener for 'messageLogged' event
    logger.on('messageLogged', (msg, timestamp) => {
        console.log(`Listener 1: Message "${msg}" logged at ${new Date(timestamp).toLocaleTimeString()}`);
    });

    // Register another listener for 'messageLogged' event
    logger.on('messageLogged', (msg) => {
        console.log(`Listener 2: Acknowledged message: ${msg.toUpperCase()}`);
    });

    // Register a listener that only fires once for 'error' event
    logger.once('error', (err) => {
        console.log(`First and only error caught: ${err}`);
    });

    // Emit events
    logger.log('User logged in');
    logger.log('Data saved successfully');
    logger.error('Database connection failed!');
    logger.error('Another error (this listener won't fire)'); // The 'once' listener won't catch this
    ```

### Question 10: Hard/Advanced

1.  **Main Question**: Explain the purpose and usage of the `Object.freeze()` and `Object.seal()` methods in JavaScript. How do they differ?
2.  **Answer**:
    *   **`Object.freeze(obj)`**: Makes an object immutable. It prevents new properties from being added to it, existing properties from being removed, existing properties from being changed, and the prototype from being changed. The object becomes truly read-only at the top level.
    *   **`Object.seal(obj)`**: Seals an object, preventing new properties from being added to it and existing properties from being removed. However, existing properties *can* still be changed (their values can be updated). The prototype also cannot be changed.
3.  **Follow-up Questions**:
    *   Do `Object.freeze()` and `Object.seal()` perform deep freezing/sealing?
    *   What are the return values of `Object.isFrozen()` and `Object.isSealed()`?