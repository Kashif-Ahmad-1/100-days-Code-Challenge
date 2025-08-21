Welcome to Day 16 of your interview prep! Let's start with some fundamentals and gradually move into more advanced topics in JavaScript and Node.js.

---

### Question 1: Basic

1.  **Main Question**: What is the purpose of the `Symbol` data type in JavaScript? Provide a simple use case where `Symbol` would be beneficial.

2.  **Answer**:
    The `Symbol` is a primitive data type introduced in ES6 (ECMAScript 2015). Its primary purpose is to create unique identifiers. Every `Symbol()` call returns a new, unique symbol, even if you provide the same description. This uniqueness makes symbols ideal for creating unique object property keys that won't conflict with other keys, including those added by other parts of the code or libraries. They are also non-enumerable by default, meaning they won't show up in `for...in` loops or `Object.keys()`.

3.  **Follow-up Questions**:
    *   Can you iterate over `Symbol` properties of an object? If so, how?
    *   What is the difference between `Symbol()` and `Symbol.for()`?

4.  **Follow-up Answers**:
    *   No, `Symbol` properties are non-enumerable by default, so they won't appear in `for...in` loops, `Object.keys()`, `Object.values()`, or `Object.entries()`. You can, however, retrieve them using `Object.getOwnPropertySymbols()`.
    *   `Symbol()` creates a new, unique symbol every time. `Symbol.for(key)`, on the other hand, registers the symbol in a global symbol registry. If a symbol with the given `key` already exists in the registry, it returns that symbol; otherwise, it creates a new one and registers it. This allows symbols to be shared and retrieved across different parts of a codebase.

5.  **Code Example(s)**:

    ```javascript
    // Use Case: Unique object property keys
    const id = Symbol('id');
    const anotherId = Symbol('id');

    const user = {
        name: 'Alice',
        [id]: 123, // Use Symbol as a property key
        age: 30
    };

    console.log(user[id]); // Output: 123
    console.log(user[anotherId]); // Output: undefined (because anotherId is a different unique symbol)

    // Symbol properties are not enumerable by default
    for (let key in user) {
        console.log(key); // Output: name, age (id is skipped)
    }

    // Retrieve Symbol properties
    console.log(Object.getOwnPropertySymbols(user)); // Output: [Symbol(id)]
    ```

---

### Question 2: Basic

1.  **Main Question**: Explain the concept of "currying" in JavaScript. Why might you use it, and what are its main benefits?

2.  **Answer**:
    Currying is a functional programming technique where a function that takes multiple arguments is transformed into a sequence of functions, each taking a single argument. Each subsequent function in the sequence returns another function until all arguments have been supplied, at which point the final result is returned.

    The main benefits include:
    *   **Reusability and Partial Application**: You can create specialized functions by partially applying arguments to a curried function, making it reusable in different contexts without rewriting the logic.
    *   **Readability**: Can make code more readable by breaking down complex function calls into smaller, more manageable steps.
    *   **Composability**: Curried functions are often easier to compose together.

3.  **Follow-up Questions**:
    *   How does currying differ from partial application, or are they the same concept?
    *   What are some potential downsides or scenarios where currying might not be the best approach?

4.  **Follow-up Answers**:
    *   Currying is a specific form of partial application. Currying transforms a function `f(a, b, c)` into `f(a)(b)(c)`. Partial application, on the other hand, allows you to fix a certain number of arguments to a function and return a new function that takes the remaining arguments, without necessarily breaking it down into single-argument functions (e.g., `f(a,b,c)` could become `f_partial(a)(b,c)` or `f_partial(a,b)(c)`). Currying is always partial application, but partial application is not always currying.
    *   Downsides include potentially increased verbosity for very simple functions, and it can sometimes make debugging call stacks more complex due to multiple nested function calls. It also adds overhead if not used judiciously.

5.  **Code Example(s)**:

    ```javascript
    // Non-curried function
    const add = (a, b, c) => a + b + c;
    console.log(add(1, 2, 3)); // Output: 6

    // Curried version of the add function
    const curriedAdd = (a) => {
        return (b) => {
            return (c) => {
                return a + b + c;
            };
        };
    };

    console.log(curriedAdd(1)(2)(3)); // Output: 6

    // Benefits: Partial application
    const addOne = curriedAdd(1);
    const addOneAndTwo = addOne(2);
    console.log(addOneAndTwo(3)); // Output: 6

    const addTen = curriedAdd(10);
    console.log(addTen(20)(30)); // Output: 60
    ```

---

### Question 3: Basic

1.  **Main Question**: In Node.js, what is the main difference between `process.nextTick()` and `setImmediate()`? When would you typically use one over the other?

2.  **Answer**:
    Both `process.nextTick()` and `setImmediate()` are used to defer the execution of a function, but they operate at different stages of the Node.js Event Loop:

    *   `process.nextTick()`: Schedules a callback to be executed *before* any I/O operations (like timers, I/O polling) in the *current* phase of the event loop. It's part of the "microtask queue" (though technically a specific Node.js queue that runs even before Promises). This means `nextTick` callbacks are executed very quickly, potentially starving the I/O or other phases if used excessively.
    *   `setImmediate()`: Schedules a callback to be executed in the "check" phase of the event loop, which runs *after* I/O polling and before timers. It's essentially "immediately" after the current I/O operations.

    **When to use:**
    *   Use `process.nextTick()` when you need to defer an action but want it to happen as soon as possible, ideally before any other I/O, to ensure consistency (e.g., handling errors immediately after an operation, or ensuring a callback is always asynchronous even if the main logic is synchronous).
    *   Use `setImmediate()` when you want to defer an action to the "next iteration" of the event loop, specifically after the current I/O operations have completed, but before new I/O is polled. It's often used for breaking up long-running synchronous tasks to prevent blocking the event loop, or for tasks that should run "as soon as possible" but yield to I/O.

3.  **Follow-up Questions**:
    *   Where do `Promise` microtasks fit into the execution order relative to `process.nextTick()` and `setImmediate()`?
    *   Can excessive use of `process.nextTick()` lead to problems in a Node.js application?

4.  **Follow-up Answers**:
    *   `process.nextTick()` callbacks are executed *before* `Promise` microtasks. So the order within a single event loop iteration is generally: current synchronous code -> `process.nextTick()` callbacks -> `Promise.then()`/`async`/`await` callbacks -> `setImmediate()` callbacks -> `setTimeout()` callbacks (if their timers have expired).
    *   Yes, excessive use of `process.nextTick()` can lead to "I/O starvation" or "event loop starvation." Since `nextTick` callbacks run before I/O, a long chain of them can hog the event loop, preventing Node.js from processing I/O events, timers, or other immediate tasks, making the application unresponsive.

5.  **Code Example(s)**:

    ```javascript
    console.log('Start');

    setTimeout(() => {
        console.log('setTimeout callback');
    }, 0);

    setImmediate(() => {
        console.log('setImmediate callback');
    });

    process.nextTick(() => {
        console.log('process.nextTick callback');
    });

    Promise.resolve().then(() => {
        console.log('Promise.then callback');
    });

    console.log('End');

    // Expected (common) output order:
    // Start
    // End
    // process.nextTick callback
    // Promise.then callback
    // setImmediate callback
    // setTimeout callback
    // (Note: setTimeout and setImmediate order can sometimes vary slightly based on system load,
    // but nextTick and Promise microtasks are consistently before them.)
    ```

---

### Question 4: Basic

1.  **Main Question**: Describe what a "middleware" function is in the context of a Node.js web framework like Express.js. How does it typically receive control and pass it on?

2.  **Answer**:
    In Express.js, a middleware function is a function that has access to the `request` object (`req`), the `response` object (`res`), and the `next` function in the application's request-response cycle. These functions can:
    *   Execute any code.
    *   Make changes to the request and the response objects.
    *   End the request-response cycle.
    *   Call the next middleware function in the stack.

    Middleware functions receive control when a request matches their defined path (or for all requests if no path is specified). They pass control to the next middleware function or route handler in the stack by calling the `next()` function. If `next()` is not called, the request-response cycle is effectively halted, and the client will not receive a response unless the middleware itself sends one.

3.  **Follow-up Questions**:
    *   How do you define an error-handling middleware in Express.js, and what is its characteristic signature?
    *   Can you apply middleware to specific routes only, or does it always apply globally?

4.  **Follow-up Answers**:
    *   Error-handling middleware in Express.js is defined with an arity of four arguments: `(err, req, res, next)`. Express recognizes a function with four arguments as an error-handling middleware. It typically receives control when an error is passed to `next(err)` by another middleware or route handler.
    *   Yes, middleware can be applied globally using `app.use()`, to specific paths using `app.use('/api', myMiddleware)`, or to specific HTTP methods and routes using `app.get('/users', myMiddleware, (req, res) => {...})`.

5.  **Code Example(s)**:

    ```javascript
    const express = require('express');
    const app = express();
    const port = 3000;

    // A simple logging middleware
    const loggerMiddleware = (req, res, next) => {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} - ${req.method} ${req.url}`);
        next(); // Pass control to the next middleware or route handler
    };

    // Apply the logging middleware globally
    app.use(loggerMiddleware);

    // A route handler
    app.get('/', (req, res) => {
        res.send('Hello from Express!');
    });

    // Another route with specific middleware
    const authMiddleware = (req, res, next) => {
        if (req.query.admin === 'true') {
            console.log('Admin access granted');
            next();
        } else {
            res.status(403).send('Access Denied');
        }
    };

    app.get('/admin', authMiddleware, (req, res) => {
        res.send('Welcome, Admin!');
    });

    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
    ```

---

### Question 5: Intermediate

1.  **Main Question**: Explain the concept of JavaScript Generators. How do they differ from regular functions, and what is the `yield` keyword used for?

2.  **Answer**:
    JavaScript Generators are special functions that can be paused and resumed, producing a sequence of values over time. They are defined using a `function*` syntax. When a generator function is called, it doesn't execute its body immediately; instead, it returns an *iterator* object.

    The key differences from regular functions are:
    *   **Pausable Execution**: Regular functions run to completion once called. Generators can pause their execution using the `yield` keyword and resume later.
    *   **Stateful**: Generators maintain their state across multiple invocations, remembering where they left off.
    *   **Return an Iterator**: Calling a generator function returns an iterator, which has a `next()` method. Each call to `next()` resumes the generator's execution until the next `yield` expression or a `return` statement is encountered.

    The `yield` keyword is used to:
    *   **Pause Execution**: It pauses the generator's execution and sends a value back to the caller.
    *   **Return a Value**: The value of the `yield` expression is what `iterator.next().value` will be.
    *   **Receive a Value**: When the generator is resumed (via `next()`), it can also receive a value from the caller, which becomes the result of the `yield` expression.

3.  **Follow-up Questions**:
    *   How can you pass a value *into* a generator function from the outside after it has yielded?
    *   What is the relationship between generators and the `for...of` loop?

4.  **Follow-up Answers**:
    *   You can pass a value into a generator by providing an argument to the `iterator.next()` method. This value will be assigned as the result of the `yield` expression that paused the generator.
    *   Generators are inherently iterable. When a generator function is called, it returns an iterator, and this iterator conforms to the iterable protocol (it has a `[Symbol.iterator]()` method that returns `this`). This means generators can be directly used with `for...of` loops, which will iterate over the values yielded by the generator until it finishes.

5.  **Code Example(s)**:

    ```javascript
    function* idGenerator() {
        let id = 1;
        while (true) {
            const reset = yield id++;
            if (reset) {
                id = 1;
            }
        }
    }

    const gen = idGenerator();

    console.log(gen.next().value); // Output: 1
    console.log(gen.next().value); // Output: 2
    console.log(gen.next().value); // Output: 3

    // Passing a value back into the generator
    console.log(gen.next(true).value); // Output: 1 (reset to 1)
    console.log(gen.next().value); // Output: 2

    // Another example: Fibonacci sequence
    function* fibonacciGenerator() {
        let a = 0, b = 1;
        while (true) {
            yield a;
            [a, b] = [b, a + b];
        }
    }

    const fibGen = fibonacciGenerator();
    console.log(fibGen.next().value); // 0
    console.log(fibGen.next().value); // 1
    console.log(fibGen.next().value); // 1
    console.log(fibGen.next().value); // 2
    console.log(fibGen.next().value); // 3
    ```

---

### Question 6: Intermediate

1.  **Main Question**: What are Node.js `Buffer`s, and why are they necessary? Provide a simple example of creating a `Buffer` from a string.

2.  **Answer**:
    Node.js `Buffer`s are a special type of data structure designed to handle raw binary data. They are fixed-size arrays of integers, where each integer represents a byte of data (from 0 to 255). `Buffer`s are necessary because JavaScript's built-in string type is Unicode-aware and not suitable for handling raw binary data like images, audio, or network packets. When interacting with low-level operations such as TCP streams, file system operations, or cryptography, data often comes in binary form, and `Buffer`s provide an efficient way to store, manipulate, and transfer this data.

    They are globally available and don't need to be `require`d.

3.  **Follow-up Questions**:
    *   How do you convert a `Buffer` instance back into a human-readable string?
    *   Are `Buffer`s mutable or immutable? Explain what that means in this context.

4.  **Follow-up Answers**:
    *   You can convert a `Buffer` back to a string using its `toString()` method, optionally specifying an encoding (e.g., `buffer.toString('utf8')`).
    *   `Buffer`s are mutable. This means that once a `Buffer` is created, its contents can be directly modified (byte by byte) without creating a new `Buffer` instance. This mutability allows for efficient in-place manipulation of binary data, but it also means that operations like `slice()` return a *view* into the original buffer's memory, not a copy, so changes to the slice will affect the original buffer.

5.  **Code Example(s)**:

    ```javascript
    // Create a Buffer from a string using UTF-8 encoding (default)
    const buf1 = Buffer.from('Hello Node.js!');
    console.log(buf1); // Output: <Buffer 48 65 6c 6c 6f 20 4e 6f 64 65 2e 6a 73 21> (hex representation)
    console.log(buf1.toString()); // Output: Hello Node.js!

    // Create a Buffer of a specific size (e.g., 10 bytes)
    const buf2 = Buffer.alloc(10);
    console.log(buf2); // Output: <Buffer 00 00 00 00 00 00 00 00 00 00> (initialized with zeros)

    // Write to a buffer
    buf2.write('Hi', 'utf8');
    console