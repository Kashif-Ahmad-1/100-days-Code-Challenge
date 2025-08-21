Welcome to Day 6 of your interview prep! It's great to have you here. We've covered a lot of ground in the past five days, building a solid foundation in both JavaScript and Node.js.

Today, we'll continue our deep dive, exploring more advanced JavaScript features, delving deeper into Node.js specifics, and touching upon some architectural and best-practice considerations. Remember, this is a discussion to understand your depth of knowledge.

Let's begin!

---

### **Question 1: Basic**

1.  **Main Question**: Explain the purpose and syntax of the **Optional Chaining (`?.`)** and **Nullish Coalescing (`??`)** operators in JavaScript. When would you use each?
2.  **Answer**:
    *   **Optional Chaining (`?.`)**: This operator allows you to safely access properties of an object that might be `null` or `undefined` without causing a `TypeError`. If a property in the chain is `null` or `undefined`, the expression short-circuits and returns `undefined` instead of throwing an error.
    *   **Nullish Coalescing (`??`)**: This operator provides a default value for an expression only when the expression evaluates to `null` or `undefined`. It differs from the logical OR operator (`||`) because `||` treats `null`, `undefined`, `0`, `''` (empty string), and `false` as falsy, whereas `??` only treats `null` and `undefined` as "nullish".
3.  **Follow-up Questions**:
    *   What is the main difference between `??` and `||` when providing a default value?
    *   Can optional chaining be used with function calls or array indexing?
    *   What value does `obj?.prop` return if `obj` is an empty object `{}`?
4.  **Follow-up Answers**:
    *   The main difference is how they handle "falsy" values. `||` returns the right-hand side operand if the left-hand side is any falsy value (`0`, `''`, `false`, `null`, `undefined`, `NaN`). `??` only returns the right-hand side operand if the left-hand side is strictly `null` or `undefined`. This means `??` is safer when `0` or `''` are valid, non-default values.
    *   Yes, optional chaining can be used with function calls (`obj.method?.()`) to safely call a method that might not exist, and with array indexing (`arr?.[0]`) to safely access an element of an array that might be `null` or `undefined`.
    *   If `obj` is an empty object `{}`, `obj?.prop` will return `undefined`. It does not throw an error because the property `prop` simply does not exist on `obj`, and `?.` handles this gracefully.
5.  **Code Example(s)**:

    ```javascript
    // Optional Chaining (?. )
    const user = {
        name: 'Alice',
        address: {
            street: '123 Main St'
        },
        contact: null
    };

    console.log(user.address?.street);         // Output: 123 Main St
    console.log(user.contact?.email);          // Output: undefined (no error)
    console.log(user.preferences?.theme);      // Output: undefined (no error)

    // Nullish Coalescing (??)
    const username = null;
    const defaultName = username ?? 'Guest';
    console.log(defaultName);                  // Output: Guest

    const count = 0;
    const itemsCount = count ?? 10;
    console.log(itemsCount);                   // Output: 0 (because 0 is not nullish)

    const emptyString = '';
    const message = emptyString ?? 'Default Message';
    console.log(message);                      // Output: '' (because '' is not nullish)
    ```

---

### **Question 2: Basic**

1.  **Main Question**: Explain the purpose and common use cases for `Object.keys()`, `Object.values()`, and `Object.entries()` in JavaScript.
2.  **Answer**: These static methods of the `Object` constructor provide ways to iterate over the properties of an object in different formats. They all return a new array.
    *   **`Object.keys(obj)`**: Returns an array of a given object's own enumerable string-keyed property names.
    *   **`Object.values(obj)`**: Returns an array of a given object's own enumerable string-keyed property values.
    *   **`Object.entries(obj)`**: Returns an array of a given object's own enumerable string-keyed `[key, value]` pairs.
    **Common Use Cases**:
    *   Iterating over object properties (keys, values, or both).
    *   Converting objects into arrays for easier manipulation with array methods (`map`, `filter`, `reduce`).
    *   Checking if an object is empty (`Object.keys(obj).length === 0`).
3.  **Follow-up Questions**:
    *   Do these methods include properties from the object's prototype chain?
    *   What happens if an object has properties whose keys are Symbols? Will `Object.keys()`, `Object.values()`, or `Object.entries()` include them?
    *   Which of these methods would you use to create a new object from an existing one, possibly with some transformations?
4.  **Follow-up Answers**:
    *   No, these methods only include an object's *own* properties, not those inherited from its prototype chain.
    *   No, these methods only include *string-keyed* properties. They will ignore properties whose keys are `Symbol`s. To get Symbol properties, you would use `Object.getOwnPropertySymbols()`.
    *   You would typically use `Object.entries()` combined with `Array.prototype.map()` (for transformations) and then `Object.fromEntries()` (ES2019) to create a new object. For example: `Object.fromEntries(Object.entries(obj).map(([key, value]) => [key.toUpperCase(), value]))`.
5.  **Code Example(s)**:

    ```javascript
    const user = {
        name: 'Jane',
        age: 25,
        city: 'San Francisco'
    };

    console.log(Object.keys(user));   // Output: ['name', 'age', 'city']
    console.log(Object.values(user)); // Output: ['Jane', 25, 'San Francisco']
    console.log(Object.entries(user));
    // Output: [['name', 'Jane'], ['age', 25], ['city', 'San Francisco']]

    // Example: Check if object is empty
    const emptyObj = {};
    console.log(Object.keys(emptyObj).length === 0); // Output: true

    // Example: Transform values using map on entries
    const capitalizedKeys = Object.fromEntries(
        Object.entries(user).map(([key, value]) => [key.toUpperCase(), value])
    );
    console.log(capitalizedKeys); // { NAME: 'Jane', AGE: 25, CITY: 'San Francisco' }
    ```

---

### **Question 3: Basic**

1.  **Main Question**: Define **Recursion** in programming. Provide a simple JavaScript example, like calculating a factorial or Fibonacci number, and explain how it works.
2.  **Answer**: Recursion is a programming technique where a function calls itself, directly or indirectly, to solve a problem. It's used when a problem can be broken down into smaller, self-similar subproblems.
    A recursive function typically has two main parts:
    1.  **Base Case**: A condition that stops the recursion. Without a base case, the function would call itself indefinitely, leading to a stack overflow.
    2.  **Recursive Step**: The part where the function calls itself with a modified input that moves closer to the base case.
3.  **Follow-up Questions**:
    *   What is a potential pitfall of using recursion, especially with deep recursion?
    *   Can every recursive function be rewritten iteratively (using loops)?
    *   When might recursion be a more elegant or readable solution than iteration?
4.  **Follow-up Answers**:
    *   The main pitfall is **stack overflow**. Each recursive call adds a frame to the call stack. If the recursion goes too deep (many calls without reaching a base case), the stack can run out of memory, causing the program to crash.
    *   Yes, theoretically, any recursive function can be rewritten iteratively. Recursion is often a more natural way to express solutions for problems that are inherently recursive (e.g., tree traversals, fractal generation), but iterative solutions are generally more memory-efficient as they don't consume stack frames for each "call."
    *   Recursion can be more elegant and readable for problems that have a natural recursive structure, such as tree or graph traversals, mathematical sequences (like factorial, Fibonacci), or certain parsing algorithms. It often mirrors the problem's definition more directly.
5.  **Code Example(s)**:

    ```javascript
    // Example 1: Factorial Calculation
    function factorial(n) {
        // Base case: factorial of 0 or 1 is 1
        if (n === 0 || n === 1) {
            return 1;
        }
        // Recursive step: n * factorial(n-1)
        return n * factorial(n - 1);
    }

    console.log(factorial(5)); // Output: 120 (5 * 4 * 3 * 2 * 1)
    console.log(factorial(0)); // Output: 1

    // Example 2: Fibonacci Sequence (returns the nth Fibonacci number)
    function fibonacci(n) {
        if (n <= 1) {
            return n; // Base cases: fib(0) = 0, fib(1) = 1
        }
        return fibonacci(n - 1) + fibonacci(n - 2); // Recursive step
    }

    console.log(fibonacci(6)); // Output: 8 (0, 1, 1, 2, 3, 5, 8)
    ```

---

### **Question 4: Basic**

1.  **Main Question**: Explain the **Event Emitter pattern** in JavaScript and Node.js. How does it facilitate communication between different parts of an application?
2.  **Answer**: The Event Emitter pattern (also known as the Observer pattern) is a design pattern that allows objects to publish (emit) events and other objects to subscribe (listen) to those events. It promotes a decoupled architecture where components can communicate without direct dependencies on each other.
    *   **Emitter**: An object that can emit named events.
    *   **Listener**: A function that is executed when a specific event is emitted.
    *   **Subscription**: The process of registering a listener with an emitter for a particular event name.
    In Node.js, the built-in `EventEmitter` class (from the `events` module) implements this pattern and is fundamental to many Node.js core modules (like `http`, `fs`, `stream`).
3.  **Follow-up Questions**:
    *   How do you register and unregister event listeners using the Node.js `EventEmitter`?
    *   Can an event listener be synchronous or asynchronous? What are the implications?
    *   What is the benefit of using an Event Emitter over direct function calls or callbacks in certain scenarios?
4.  **Follow-up Answers**:
    *   You register listeners using `emitter.on(eventName, listenerFunction)` or `emitter.addListener(eventName, listenerFunction)`. You unregister listeners using `emitter.off(eventName, listenerFunction)` or `emitter.removeListener(eventName, listenerFunction)`.
    *   Event listeners can be both synchronous or asynchronous. If a listener performs synchronous, blocking work, it will block the Event Loop, potentially impacting performance. Asynchronous listeners (e.g., using `setTimeout`, Promises) allow the Event Loop to continue processing other tasks, which is generally preferred in Node.js for non-blocking operations.
    *   The benefit is **decoupling** and **flexibility**. Instead of a component needing to know about and directly call other components, it simply emits an event. Any number of other components can listen to that event without the emitter knowing about them. This makes the system more modular, easier to extend, and less prone to breaking changes when components are modified. It's ideal for one-to-many communication.
5.  **Code Example(s)**:

    ```javascript
    // In Node.js (requires 'events' module)
    const EventEmitter = require('events');

    class MyCustomEmitter extends EventEmitter {}

    const myEmitter = new MyCustomEmitter();

    // Register a listener for 'greet' event
    myEmitter.on('greet', (name) => {
        console.log(`Hello, ${name}!`);
    });

    // Register another listener for 'greet' event
    myEmitter.on('greet', (name) => {
        console.log(`Glad to see you, ${name}.`);
    });

    // Register a listener for 'data' event
    myEmitter.on('data', (payload) => {
        console.log('Received data:', payload);
    });

    // Emit the 'greet' event
    myEmitter.emit('greet', 'Alice');
    // Output:
    // Hello, Alice!
    // Glad to see you, Alice.

    // Emit the 'data' event
    myEmitter.emit('data', { id: 1, value: 'some info' });
    // Output: Received data: { id: 1, value: 'some info' }

    // Remove a specific listener
    const specificListener = (name) => console.log(`This listener will be removed for ${name}.`);
    myEmitter.on('farewell', specificListener);
    myEmitter.emit('farewell', 'Bob'); // Output: This listener will be removed for Bob.
    myEmitter.off('farewell', specificListener);
    myEmitter.emit('farewell', 'Charlie'); // No output for Charlie, listener removed
    ```

---

### **Question 5: Basic**

1.  **Main Question**: How do you create a very basic HTTP server in Node.js using the built-in `http` module? Provide a simple example that responds to all requests with "Hello, World!".
2.  **Answer**: Node.js has a built-in `http` module that allows you to create web servers without relying on external frameworks. You use `http.createServer()` to create a server instance, which takes a callback function that executes for every incoming request. You then use `server.listen()` to start the server on a specific port.
3.  **Follow-up Questions**:
    *   What are the `req` and `res` objects in the server's callback function, and what are their typical roles?
    *   How would you send a different response based on the requested URL path (e.g., `/` vs `/about`)?
    *   What is the default port for HTTP, and why is it common practice to use ports like 3000 or 8080 for development?
4.  **Follow-up Answers**:
    *   The `req` (request) object is an instance of `http.IncomingMessage` and contains information about the incoming request, such as the URL, HTTP method, headers, and body. The `res` (response) object is an instance of `http.ServerResponse` and is used to send data back to the client, including setting headers, status codes, and writing the response body.
    *   You would check `req.url` inside the request handler. For example, using `if (req.url === '/') { /* respond for root */ } else if (req.url === '/about') { /* respond for about */ }`.
    *   The default port for HTTP is 80. Ports below 1024 are considered "well-known ports" and typically require administrative privileges to bind to. For development, it's common to use higher-numbered ports like 3000, 8080, 5000, etc., because they don't require special permissions and are less likely to conflict with other services.
5.  **Code Example(s)**:

    ```javascript
    const http = require('http');

    const hostname = '127.0.0.1'; // localhost
    const port = 3000;

    // Create a server instance
    const server = http.createServer((req, res) => {
        // Set the response HTTP header with HTTP status and Content-Type
        res.statusCode = 200; // OK
        res.setHeader('Content-Type', 'text/plain');

        // Send the response body
        res.end('Hello, World!\n');
    });

    // Start the server
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
    ```

---

### **