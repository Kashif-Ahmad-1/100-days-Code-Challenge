Welcome to Day 5 of your interview prep! It's great to have you here. We've covered a lot of ground in the past four days, building a solid foundation in both JavaScript and Node.js.

Today, we'll continue our deep dive, exploring more advanced JavaScript features, delving deeper into Node.js specifics, and touching upon some architectural and best-practice considerations. Remember, this is a discussion to understand your depth of knowledge.

Let's begin!

---

### **Question 1: Basic**

1.  **Main Question**: What are `Set` and `Map` objects in JavaScript, and when would you choose to use one over a plain object or array?
2.  **Answer**:
    *   **`Set`**: A `Set` is a collection of unique values. Each value can only occur once in a `Set`. It's useful when you need to store a list of items and ensure no duplicates, or quickly check for the presence of an item.
    *   **`Map`**: A `Map` is a collection of key-value pairs where the keys can be of any data type (unlike plain objects, where keys are typically strings or Symbols). It maintains the insertion order of its elements. It's useful when you need to store data as key-value pairs and the keys are not necessarily strings, or when you need to iterate over the keys in insertion order.
    **When to choose them**:
    *   **`Set` over Array**: If you need to store unique items and quickly check for existence or remove duplicates from an existing array.
    *   **`Map` over Object**: If you need to use non-string keys (e.g., objects, functions), if the order of key-value pairs matters, or if you frequently add/remove key-value pairs and need better performance for large collections. Plain objects are better for simple structured data where keys are known strings.
3.  **Follow-up Questions**:
    *   How do you add elements to a `Set` and a `Map`?
    *   Can you iterate over `Set` and `Map` objects? If so, how?
    *   What is the difference between `Map` and `WeakMap`?
4.  **Follow-up Answers**:
    *   For `Set`, use `mySet.add(value)`. For `Map`, use `myMap.set(key, value)`.
    *   Yes, both `Set` and `Map` are iterable. You can use a `for...of` loop directly on them: `for (const item of mySet) { ... }` or `for (const [key, value] of myMap) { ... }`. They also have `forEach` methods and methods like `keys()`, `values()`, and `entries()`.
    *   `WeakMap` and `WeakSet` are similar to `Map` and `Set` but hold "weak" references to their keys (for `WeakMap`) or values (for `WeakSet`). This means if there are no other references to the key/value object, it can be garbage collected, preventing memory leaks. `WeakMap` keys must be objects (not primitives). They are not iterable and do not have a `size` property. They are primarily used for associating data with objects without preventing those objects from being garbage collected.
5.  **Code Example(s)**:

    ```javascript
    // Set Example
    const uniqueNumbers = new Set();
    uniqueNumbers.add(1);
    uniqueNumbers.add(2);
    uniqueNumbers.add(1); // Ignored, as 1 is already present
    console.log(uniqueNumbers); // Set { 1, 2 }
    console.log(uniqueNumbers.has(2)); // true

    const numbersArray = [1, 2, 2, 3, 4, 4, 5];
    const uniqueFromArray = [...new Set(numbersArray)]; // Remove duplicates
    console.log(uniqueFromArray); // [1, 2, 3, 4, 5]

    // Map Example
    const userRoles = new Map();
    userRoles.set('alice', 'admin');
    userRoles.set('bob', 'editor');
    const userObj = { id: 123 };
    userRoles.set(userObj, 'guest'); // Key can be an object

    console.log(userRoles.get('alice')); // admin
    console.log(userRoles.get(userObj)); // guest
    console.log(userRoles.size); // 3

    for (const [key, value] of userRoles) {
        console.log(`${key}: ${value}`);
    }
    ```

---

### **Question 2: Basic**

1.  **Main Question**: Explain the `Symbol` primitive data type in JavaScript. What is its primary purpose and how is it used?
2.  **Answer**: `Symbol` is a primitive data type introduced in ES6 (ES2015). A `Symbol` value represents a unique and immutable identifier.
    *   **Primary Purpose**: Its main purpose is to create unique object property keys that won't clash with other properties, even those with the same string name. This is particularly useful when extending objects with private-like properties or when third-party libraries add properties to objects without risking name collisions.
    *   **Usage**: You create a Symbol by calling `Symbol()` with an optional description string (for debugging purposes).
3.  **Follow-up Questions**:
    *   Can two Symbols created with the same description be strictly equal (`===`)?
    *   How do you access a property of an object whose key is a Symbol?
    *   Can Symbols be iterated over using `for...in` or `Object.keys()`?
4.  **Follow-up Answers**:
    *   No. Each time `Symbol()` is called, it returns a new, unique Symbol value, even if the description string is identical. So, `Symbol('foo') === Symbol('foo')` will always be `false`.
    *   You access Symbol-keyed properties using bracket notation, not dot notation. For example, `myObject[mySymbolKey]`.
    *   No. Symbols are non-enumerable by default, meaning they are ignored by `for...in` loops, `Object.keys()`, `Object.values()`, and `Object.entries()`. You can retrieve Symbol properties using `Object.getOwnPropertySymbols(obj)`.
5.  **Code Example(s)**:

    ```javascript
    const id1 = Symbol('id');
    const id2 = Symbol('id');

    console.log(id1 === id2); // false (always unique)

    const user = {
        name: 'John',
        [id1]: 123, // Use Symbol as a key
        [id2]: 456
    };

    console.log(user.name);    // John
    console.log(user[id1]);    // 123
    console.log(user[id2]);    // 456

    // Symbols are not enumerated by standard loops
    for (let key in user) {
        console.log(key); // Only 'name' will be logged
    }

    // To get Symbol properties
    console.log(Object.getOwnPropertySymbols(user)); // [ Symbol(id), Symbol(id) ]
    ```

---

### **Question 3: Basic**

1.  **Main Question**: What is the `global` object in Node.js, and how does it compare to the `window` object in a web browser environment?
2.  **Answer**:
    *   The `global` object in Node.js is the global namespace for Node.js environments. It's similar in concept to the `window` object in browsers, providing access to globally available variables, functions, and objects. Any variable declared without `var`, `let`, or `const` (in non-strict mode) becomes a property of `global`.
    *   **Comparison to `window`**:
        *   **Environment**: `global` is specific to Node.js (server-side/runtime), while `window` is specific to web browsers (client-side).
        *   **APIs**: `window` provides browser-specific APIs (DOM manipulation, `localStorage`, `XMLHttpRequest`, `alert`, `document`, `navigator`). `global` provides Node.js-specific APIs (`process`, `Buffer`, `setTimeout`, `console`, `__dirname`, `__filename`).
        *   **Scope**: In Node.js, each module has its own separate scope, so variables declared with `var`, `let`, or `const` at the top level of a module are *not* added to the `global` object, unlike in browser scripts where global variables are added to `window`.
3.  **Follow-up Questions**:
    *   Can you directly access `global` properties without explicitly writing `global.`?
    *   Name a few important properties or methods available on the `global` object in Node.js.
    *   Why is it generally discouraged to pollute the `global` object?
4.  **Follow-up Answers**:
    *   Yes, similar to `window` in browsers, properties of the `global` object can be accessed directly without the `global.` prefix (e.g., `console.log` is actually `global.console.log`, `setTimeout` is `global.setTimeout`).
    *   Important properties/methods include: `process`, `Buffer`, `console`, `setTimeout`, `setInterval`, `setImmediate`, `clearTimeout`, `clearInterval`, `clearImmediate`, `__dirname`, `__filename`, `require`, `module`, `exports`.
    *   Polluting the `global` object (creating global variables) is discouraged because it can lead to naming collisions, make code harder to debug and maintain, and reduce modularity, especially in larger applications or when integrating third-party libraries. It breaks encapsulation and can lead to unexpected side effects.
5.  **Code Example(s)**:

    ```javascript
    // In Node.js environment:

    // Accessing global properties directly
    console.log('Hello from global console!');
    setTimeout(() => {
        console.log('This is a global setTimeout.');
    }, 100);

    // Explicitly using global
    global.myGlobalVar = 'I am a global variable!';
    console.log(myGlobalVar); // Accessible directly

    // Variables declared with let/const are NOT global in Node modules
    let moduleVar = 'I am module-scoped';
    // console.log(global.moduleVar); // undefined
    ```

---

### **Question 4: Basic**

1.  **Main Question**: Explain the purpose of the `path` module in Node.js. Provide a common use case.
2.  **Answer**: The Node.js `path` module provides utilities for working with file and directory paths. It offers methods to join, resolve, normalize, and parse paths in a way that is consistent across different operating systems (Windows, Linux, macOS). This is crucial because path separators and conventions differ between OSes (e.g., `\` on Windows, `/` on Unix-like systems).
    **Common Use Case**: Constructing file paths reliably, especially when dealing with paths provided by users or other modules, or when the application needs to run on multiple operating systems.
3.  **Follow-up Questions**:
    *   What is the difference between `path.join()` and `path.resolve()`?
    *   How would you get the directory name and file name from a full path string?
    *   Why is using `path.join()` or `path.resolve()` preferred over simple string concatenation for paths?
4.  **Follow-up Answers**:
    *   `path.join()` concatenates path segments into a single path string, normalizing the result (e.g., handling extra slashes). It creates a relative or absolute path based on the input segments.
    *   `path.resolve()` resolves a sequence of paths or path segments into an absolute path. It processes paths from right to left, prepending the current working directory if the resulting path is not absolute. It's often used to get an absolute path from a relative one.
    *   You would use `path.dirname(fullPath)` to get the directory name and `path.basename(fullPath)` to get the file name (or `path.parse(fullPath)` for an object with all components).
    *   Using `path.join()` or `path.resolve()` is preferred because they correctly handle platform-specific path separators (`\` vs `/`), normalize paths (e.g., remove redundant `.` or `..`), and deal with leading/trailing slashes, preventing errors and ensuring portability across different operating systems.
5.  **Code Example(s)**:

    ```javascript
    const path = require('path');

    // path.join()
    const filePath = path.join('/users', 'john', 'documents', 'report.txt');
    console.log('Joined path:', filePath); // On Windows: \users\john\documents\report.txt, On Linux: /users/john/documents/report.txt

    // path.resolve()
    const absolutePath = path.resolve('src', 'data', 'config.json');
    console.log('Resolved absolute path:', absolutePath); // e.g., /home/user/my-app/src/data/config.json

    // path.dirname() and path.basename()
    const fullPath = '/home/user/documents/report.txt';
    console.log('Directory name:', path.dirname(fullPath)); // /home/user/documents
    console.log('File name:', path.basename(fullPath));    // report.txt
    ```

---

### **Question 5: Basic**

1.  **Main Question**: Beyond simple `console.log()`, what are some other useful `console` methods in Node.js (and browsers), and when would you use them?
2.  **Answer**: The `console` object provides a variety of methods for debugging and logging information to the console.
    *   **`console.log(data, ...)`**: General output of messages.
    *   **`console.warn(data, ...)`**: Outputs a warning message. Often styled differently (e.g., yellow background) in browsers.
    *   **`console.error(data, ...)`**: Outputs an error message. Often styled differently (e.g., red background) and includes stack traces in Node.js.
    *   **`console.info(data, ...)`**: Outputs an informational message.
    *   **`console.table(data)`**: Displays tabular data (arrays of objects or arrays) as a table. Extremely useful for inspecting complex data structures.
    *   **`console.time(label)` / `console.timeEnd(label)`**: Starts a timer with a given label. When `timeEnd()` is called with the same label, it stops the timer and logs the elapsed time. Useful for performance profiling.
    *   **`console.count(label)`**: Logs the number of times `count()` has been called with the same label. Useful for tracking function calls in loops.
    *   **`console.trace(message)`**: Prints a stack trace to the console. Useful for understanding how a particular piece of code was reached.
3.  **Follow-up Questions**:
    *   How would you measure the execution time of a specific function or block of code using `console` methods?
    *   When debugging, why might `console.error()` be preferred over `console.log()` for error messages?
    *   Can you clear the console using a `console` method?
4.  **Follow-up Answers**:
    *   You would use `console.time(label)` before the code block you want to measure and `console.timeEnd(label)` after it. The `label` must be the same for both calls.
    *   `console.error()` is preferred because it typically formats the output as an error (e.g., red text, error icon), making errors more visible. In Node.js, it also prints to `stderr` (standard error stream) instead of `stdout` (standard output stream), which is good practice for separating error logs from regular output, and allows tools to differentiate them. It can also include stack traces automatically.
    *   Yes, `console.clear()` can be used to clear the console.
5.  **Code Example(s)**:

    ```javascript
    // Measuring performance
    console.time('ArrayProcessing');
    const largeArray = Array.from({ length: 1000000 }, (_, i) => i);
    const transformedArray = largeArray.map(num => num * 2);
    console.timeEnd('ArrayProcessing'); // Logs something like: ArrayProcessing: 12.345ms

    // Tabular data
    const users = [
        { name: 'Alice', age: 30, city: 'New York' },
        { name: 'Bob', age: 24, city: 'London' }
    ];
    console.table(users);

    // Counting
    function processItem(item) {
        console.count('Processed Items');
        // ... some processing
    }
    processItem(1);
    processItem(2);
    processItem(3); // Processed Items: 3
    ```

---

### **Question 6: Basic**

1.  **Main Question**: How do you access command-line arguments passed to a Node.js script? Provide an example.
2.  **Answer**: In Node.js, command-line arguments are accessible through the `process.argv` global property. `process.argv` is an array that contains the command-line arguments passed when the Node.js process was launched.
    *   The first element (`process.argv[0]`) is the path to the Node.js executable.
    *   The second element (`process.argv[1]`) is the path to the JavaScript file being executed.
    *   Subsequent elements (`process.argv[2]`, `process.argv[3]`, etc.) are the actual arguments provided by the user.
3.  **Follow-up Questions**:
    *   If you run `node app.js --env production`, what would be the values at `process.argv[0]`, `process.argv[1]`, and `process.argv[2]`?
    *   How can you easily extract named arguments (e.g., `--port=3000`) from `process.argv`?
    *   What is the difference between `process.argv` and `process.env`?
4.  **Follow-up Answers**:
    *   `process.argv[0]` would be the path to the Node.js executable (e.g., `/usr/local/bin/node`).
    *   `process.argv[1]` would be the path to your script (e.g., `/path/to/your/app.js`).
    *   `process.argv[2]` would be `--env`.
    *   For extracting named arguments, you typically need to parse `process.argv` manually or, more commonly, use a third-party library like `minimist` or `yargs` which provide more robust argument parsing capabilities.
    *   `process.argv` contains command-line arguments specifically passed to the script, while `process.env` contains environment variables (e.g., `PORT`, `NODE_ENV`) that are set in the operating system's environment where the Node.js process is running.
5.  **Code Example(s)**:

    ```javascript
    // Save this as `args_example.js`
    // Run from terminal: node args_example.js hello world --name Alice --age 30

    console.log('All arguments:', process.argv);

    const userArgs = process.argv.slice(2); // Get only the custom arguments
    console.log('Custom arguments:', userArgs);

    if (userArgs.length > 0) {
        console.log(`First argument: ${userArgs[0]}`);
        console.log(`Second argument: ${userArgs[1]}`);
    }

    // A simple way to parse named args (for illustration, use libraries in real apps)
    const options = {};
    userArgs.forEach(arg => {
        if (arg.startsWith('--')) {
            const parts = arg.slice(2).split('=');
            options[parts[0]] = parts.length > 1 ? parts[1] : true;
        }
    });
    console.log('Parsed options:', options);
    // Expected output for the example run command:
    // Parsed options: { name: 'Alice', age: '30' }
    ```

---

### **Question 7: Basic**

1.  **Main Question**: In Node.js, what is the significance of `__dirname` and `__filename`? When would you use them?
2.  **Answer**: `__dirname` and `__filename` are global variables available in every Node.js module (but not in ES Modules by default).
    *   **`__dirname`**: Provides the absolute path to the directory containing the currently executing script file.
    *   **`__filename`**: Provides the absolute path to the currently executing script file itself (including the filename).
    **Significance and Use Cases**: They are crucial for creating robust and portable file paths within Node.js applications, especially when dealing with file system operations (like reading/writing files, loading modules, serving static assets) where relative paths might become ambiguous or break when the script is executed from a different working directory.
3.  **Follow-up Questions**:
    *   Are `__dirname` and `__filename` available when using ES Modules (`import`/`export`) in Node.js? If not, how do you get equivalent information?
    *   How would you construct an absolute path to a `data.json` file located in the same directory as your script using `__dirname`?
    *   Why are these variables more reliable than `process.cwd()` for locating module-specific resources?
4.  **Follow-up Answers**:
    *   No, `__dirname` and `__filename` are not directly available in ES Modules. To get equivalent information, you can use `import.meta.url`. You'd then use Node.js's `url` and `path` modules to convert `import.meta.url` (a `file://` URL) into a file path and extract the directory or filename.
    *   You would use `const path = require('path'); const dataFilePath = path.join(__dirname, 'data.json');`.
    *   `__dirname` and `__filename` always refer to the location of the *current module file*, regardless of the current working directory from which the Node.js process was started (`process.cwd()`). This makes them much more reliable for resolving paths to resources relative to the module itself. `process.cwd()` can change, leading to broken paths if not handled carefully.
5.  **Code Example(s)**:

    ```javascript
    // Save this as `info.js`
    const path = require('path');
    const fs = require('fs');

    console.log('__dirname:', __dirname);
    console.log('__filename:', __filename);

    // Example: Reading a file relative to the script
    const configPath = path.join(__dirname, '