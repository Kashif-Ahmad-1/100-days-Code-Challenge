Welcome to Day 8 of your interview prep! Let's start with some fundamentals.

---

### Question 1: Truthy and Falsy Values

1.  **Main Question**: Explain what "truthy" and "falsy" values are in JavaScript. List all the explicitly "falsy" values in JavaScript.
2.  **Answer**:
    In JavaScript, every value has an inherent boolean context. When a non-boolean value is evaluated in a boolean context (e.g., in an `if` statement, or with logical operators), it is implicitly converted to either `true` or `false`.
    *   **Truthy**: A value that evaluates to `true` when converted to a boolean. Most values in JavaScript are truthy.
    *   **Falsy**: A value that evaluates to `false` when converted to a boolean. There are a specific, finite list of falsy values.

    The explicitly falsy values in JavaScript are:
    *   `false` (the boolean primitive `false`)
    *   `0` (the number zero)
    *   `-0` (the negative number zero)
    *   `null`
    *   `undefined`
    *   `NaN` (Not-a-Number)
    *   `""` (an empty string)
    *   `0n` (BigInt zero, introduced in ES2020)
3.  **Follow-up Questions**:
    *   How do the logical AND (`&&`) and OR (`||`) operators use truthy/falsy values in their evaluation?
    *   Can you explain "short-circuiting" in the context of these logical operators?
4.  **Follow-up Answers**:
    *   **Logical Operators**:
        *   The `&&` (AND) operator returns the *first falsy value* it encounters. If all values are truthy, it returns the *last truthy value*.
        *   The `||` (OR) operator returns the *first truthy value* it encounters. If all values are falsy, it returns the *last falsy value*.
    *   **Short-circuiting**: This refers to the behavior where the logical operators `&&` and `||` evaluate expressions from left to right and stop as soon as they can determine the final result. For `&&`, if the first operand is falsy, it immediately returns that value without evaluating the second operand. For `||`, if the first operand is truthy, it immediately returns that value without evaluating the second operand. This can be useful for providing default values or conditional execution.
5.  **Code Example(s)**:

    ```javascript
    // Falsy examples
    if (0) {
        console.log("This will not be logged.");
    }

    if ("") {
        console.log("This will not be logged.");
    }

    // Truthy example
    if ("hello") {
        console.log("'hello' is truthy."); // This will be logged
    }

    // Short-circuiting with &&
    const name = "";
    const defaultName = name && "Guest"; // defaultName will be "" (falsy)
    console.log(defaultName);

    // Short-circuiting with ||
    const user = null;
    const displayName = user || "Anonymous"; // displayName will be "Anonymous" (first truthy)
    console.log(displayName);

    const result = 5 && 10; // result will be 10 (last truthy)
    console.log(result);
    ```

---

### Question 2: Implicit Type Coercion

1.  **Main Question**: Describe what implicit type coercion is in JavaScript. Provide an example where it might lead to unexpected results.
2.  **Answer**:
    Implicit type coercion is JavaScript's automatic conversion of values from one data type to another when an operation or expression expects a different type. This happens behind the scenes without explicit instructions from the developer. While often convenient, it can lead to surprising or unintended outcomes if not understood.
3.  **Follow-up Questions**:
    *   How can you explicitly convert types in JavaScript? Provide examples of common explicit type conversions.
    *   What is the difference between `parseInt()` and `Number()` for converting strings to numbers?
4.  **Follow-up Answers**:
    *   **Explicit Type Conversion**: Developers can manually convert types using built-in functions or constructors.
        *   To Number: `Number("123")`, `parseInt("42px")`, `parseFloat("3.14")`
        *   To String: `String(123)`, `(123).toString()`
        *   To Boolean: `Boolean(0)`, `!!value` (double NOT operator)
    *   **`parseInt()` vs `Number()`**:
        *   `parseInt()` parses a string argument and returns an integer. It reads the string character by character from left to right and stops parsing when it encounters a non-numeric character (other than a sign or a decimal point if used with `parseFloat`). It also takes an optional `radix` argument for number base.
        *   `Number()` is a constructor (or function when used without `new`) that attempts to convert its argument to a number. It is stricter than `parseInt()`; if the string contains *any* non-numeric characters (other than a single decimal point), it will result in `NaN`.
5.  **Code Example(s)**:

    ```javascript
    // Implicit Type Coercion Example
    console.log("5" + 5); // Output: "55" (string concatenation, not addition)
    console.log("5" - 5); // Output: 0 (subtraction forces "5" to a number)
    console.log([] + {});  // Output: "[object Object]" (array converted to string, then concatenated)
    console.log({} + []);  // Output: 0 (In browser console, this might be "[object Object]", but in Node.js or if wrapped in parentheses like `({} + [])` it's 0. This is due to how JS engine parses leading curly braces.)

    // Explicit Type Conversion Examples
    let strNum = "123";
    let num = Number(strNum); // num is 123 (number)
    console.log(num, typeof num);

    let strPx = "42px";
    let parsedInt = parseInt(strPx); // parsedInt is 42
    let numFromPx = Number(strPx); // numFromPx is NaN
    console.log(parsedInt, numFromPx);
    ```

---

### Question 3: `for...of` Loop

1.  **Main Question**: Explain the purpose of a `for...of` loop in JavaScript and when you would prefer to use it over a traditional `for` loop or `for...in` loop.
2.  **Answer**:
    The `for...of` loop is used to iterate over *iterable* objects (like Arrays, Strings, Maps, Sets, NodeLists, etc.). It directly accesses the *values* of the iterable elements.

    You would prefer `for...of` over:
    *   **Traditional `for` loop**: When you don't need the index of the elements and simply want to iterate over the values. It's often more concise and readable.
    *   **`for...in` loop**: `for...in` iterates over *enumerable property names* (keys) of an object, including inherited ones. It's generally not suitable for iterating over arrays because it can iterate over non-index properties and the order is not guaranteed. `for...of` specifically iterates over the *values* of iterable collections, making it safer and more intuitive for arrays and other iterable data structures.
3.  **Follow-up Questions**:
    *   What exactly constitutes an "iterable" object in JavaScript?
    *   Can you use `for...of` to iterate directly over the properties of a plain JavaScript object? Why or why not?
4.  **Follow-up Answers**:
    *   **Iterable Object**: An object is "iterable" if it implements the iterable protocol, meaning it has a method accessible via `Symbol.iterator` that returns an iterator. This iterator is an object with a `next()` method that returns objects with `value` and `done` properties. Common built-in iterables include `Array`, `String`, `Map`, `Set`, `TypedArray`, `arguments` object, and `NodeList`.
    *   **Plain JavaScript Objects**: No, you cannot use `for...of` directly on a plain JavaScript object (e.g., `{ key: value }`) because plain objects are not inherently iterable. They do not have the `Symbol.iterator` method. To iterate over object properties, you would typically use `for...in` (for keys), `Object.keys()` (for keys), `Object.values()` (for values), or `Object.entries()` (for key-value pairs) combined with `forEach` or a `for...of` loop over the resulting array.
5.  **Code Example(s)**:

    ```javascript
    // Iterating over an Array
    const numbers = [10, 20, 30];
    for (const num of numbers) {
        console.log(num); // Outputs: 10, 20, 30
    }

    // Iterating over a String
    const greeting = "Hello";
    for (const char of greeting) {
        console.log(char); // Outputs: H, e, l, l, o
    }

    // Example of why not to use for...of on plain objects directly
    const person = { name: "Alice", age: 30 };
    // This would throw an error: TypeError: person is not iterable
    // for (const prop of person) {
    //     console.log(prop);
    // }

    // Correct way to iterate object properties
    for (const key in person) {
        console.log(key, person[key]); // Outputs: name Alice, age 30
    }
    for (const [key, value] of Object.entries(person)) {
        console.log(key, value); // Outputs: name Alice, age 30
    }
    ```

---

### Question 4: Immediately Invoked Function Expressions (IIFE)

1.  **Main Question**: What is an Immediately Invoked Function Expression (IIFE) in JavaScript, and what are its primary uses?
2.  **Answer**:
    An Immediately Invoked Function Expression (IIFE, pronounced "iffy") is a JavaScript function that runs as soon as it is defined. It's a design pattern that involves defining a function and then executing it immediately.

    The primary uses of IIFEs include:
    *   **Creating a Private Scope**: Variables declared inside an IIFE are not accessible from the outside, preventing them from polluting the global scope. This is crucial for avoiding naming collisions, especially in older JavaScript environments or when integrating multiple scripts.
    *   **Module Pattern**: IIFEs are fundamental to the module pattern, allowing you to encapsulate private variables and expose only a public interface (an object of functions) to the outside world.
    *   **Aliasing Global Variables**: You can pass global objects (like `window` or `jQuery`) as arguments to the IIFE, and then alias them with shorter, local variable names, making the code more concise and slightly faster due to scope lookup.
    *   **Executing Code Once**: When you need to run initialization code once and then discard the variables used, an IIFE is perfect.
3.  **Follow-up Questions**:
    *   Can an IIFE accept arguments? If so, provide a simple example.
    *   How does an IIFE help prevent variable collisions in a global scope?
4.  **Follow-up Answers**:
    *   **Accepting Arguments**: Yes, an IIFE can accept arguments just like any other function. You pass them to the outer parentheses that invoke the function.
        ```javascript
        (function(message) {
            console.log(message);
        })("Hello from IIFE!"); // Outputs: Hello from IIFE!
        ```
    *   **Preventing Variable Collisions**: Variables declared with `var`, `let`, or `const` inside an IIFE are scoped to that function. Because the function is immediately executed and then its execution context is typically removed (unless its inner functions form closures), these variables are not exposed to the global scope. This prevents situations where two different scripts or parts of the same script might accidentally declare variables with the same name, leading to conflicts.
5.  **Code Example(s)**:

    ```javascript
    // Basic IIFE structure
    (function() {
        var privateVariable = "I'm private!";
        console.log(privateVariable); // Accessible inside
    })();

    // console.log(privateVariable); // Throws ReferenceError: privateVariable is not defined

    // IIFE used for module pattern (simple example)
    const myModule = (function() {
        let counter = 0; // private variable

        function increment() {
            counter++;
            console.log("Counter:", counter);
        }

        function reset() {
            counter = 0;
            console.log("Counter reset.");
        }

        return { // Public interface
            increment: increment,
            reset: reset
        };
    })();

    myModule.increment(); // Outputs: Counter: 1
    myModule.increment(); // Outputs: Counter: 2
    myModule.reset();     // Outputs: Counter reset.
    // console.log(myModule.counter); // undefined, counter is private
    ```

---

### Question 5: `Array.prototype.map()`

1.  **Main Question**: Explain the purpose and return value of the `Array.prototype.map()` method. How does it differ from `Array.prototype.forEach()`?
2.  **Answer**:
    *   **`Array.prototype.map()`**: The `map()` method creates a *new array* by calling a provided function on every element in the calling array. It does not modify the original array. The new array contains the results of calling the function on each element.
    *   **Difference from `forEach()`**:
        *   **Return Value**: `map()` returns a *new array* populated with the results of the callback function. `forEach()` returns `undefined` and is primarily used for side effects (e.g., logging, modifying external state).
        *   **Purpose**: `map()` is used for *transformation* – taking an array and producing a new array with its elements transformed. `forEach()` is used for *iteration* – simply executing a function for each element.
        *   **Chaining**: Because `map()` returns a new array, you can chain other array methods (like `filter()`, `reduce()`, `sort()`) directly after it. `forEach()` cannot be chained in this way.
3.  **Follow-up Questions**:
    *   When would you typically choose to use `Array.prototype.filter()`?
    *   Can `map()` be chained with other array methods? Provide a brief example.
4.  **Follow-up Answers**:
    *   **`Array.prototype.filter()`**: You would choose `filter()` when you want to create a *new array* containing only the elements from the original array that satisfy a specific condition. The callback function for `filter()` should return a boolean (`true` to keep the element, `false` to discard it).
    *   **Chaining `map()`**: Yes, `map()` can be chained with other array methods because it returns a new array.
        ```javascript
        const numbers = [1, 2, 3, 4, 5];
        const doubledEvens = numbers
            .filter(num => num % 2 === 0) // Filters: [2, 4]
            .map(num => num * 2);        // Maps: [4, 8]

        console.log(doubledEvens); // Output: [4, 8]
        ```
5.  **Code Example(s)**:

    ```javascript
    const numbers = [1, 2, 3, 4, 5];

    // Using map() to double each number
    const doubledNumbers = numbers.map(num => num * 2);
    console.log("Original numbers:", numbers);        // [1, 2, 3, 4, 5] (original array unchanged)
    console.log("Doubled numbers (map):", doubledNumbers); // [2, 4, 6, 8, 10] (new array)

    // Using forEach() to log each number (no new array returned)
    let sum = 0;
    numbers.forEach(num => {
        sum += num; // Side effect: modifies external variable
    });
    console.log("Sum (forEach side effect):", sum); // 15
    ```

---

### Question 6: JavaScript Object Properties

1.  **Main Question**: How do you add, modify, and delete properties from a JavaScript object? Provide examples for each operation.
2.  **Answer**:
    JavaScript objects are dynamic, meaning you can add, modify, and delete properties after they are created.

    *   **Adding Properties**: You can add new properties using dot notation or bracket notation.
    *   **Modifying Properties**: You can modify existing properties by assigning a new value to them, also using dot or bracket notation.
    *   **Deleting Properties**: You use the `delete` operator to remove a property from an object.
3.  **Follow-up Questions**:
    *   What is the primary difference between dot notation and bracket notation for accessing or setting object properties?
    *   When would you *have* to use bracket notation over dot notation?
4.  **Follow-up Answers**:
    *   **Dot vs. Bracket Notation**:
        *   **Dot Notation (`object.property`):** Properties are accessed directly by their literal name. It's cleaner and generally preferred when the property name is a valid JavaScript identifier and is known at compile time.
        *   **Bracket Notation (`object["property"]`):** Properties are accessed using a string literal or a variable containing the property name.
    *   **When to use Bracket Notation**:
        *   When the property name contains special characters (e.g., spaces, hyphens) that are not valid JavaScript identifiers (e.g., `person["first-name"]`).
        *   When the property name is stored in a variable or needs to be dynamically determined at runtime (e.g., `let key = "age"; person[key]`).
        *   When accessing array-like objects where keys are numerical strings.
5.  **Code Example(s)**:

    ```javascript
    const user = {
        name: "Alice",
        age: 28
    };

    // 1. Adding a property
    user.email = "alice@example.com"; // Dot notation
    user["city"] = "New York";         // Bracket notation
    console.log("After adding:", user);
    // Output: { name: 'Alice', age: 28, email: 'alice@example.com', city: 'New York' }

    // 2. Modifying a property
    user.age = 29;                     // Dot notation
    user["city"] = "San Francisco";    // Bracket notation
    console.log("After modifying:", user);
    // Output: { name: 'Alice', age: 29, email: 'alice@example.com', city: 'San Francisco' }

    // 3. Deleting a property
    delete user.email;                 // Deletes 'email'
    console.log("After deleting email:", user);
    // Output: { name: 'Alice', age: 29, city: 'San Francisco' }

    // Example for when to use bracket notation
    let dynamicKey = "occupation";
    user[dynamicKey] = "Software Engineer"; // Add 'occupation' dynamically
    console.log("After dynamic add:", user);

    const data = {
        "user-id": "12345",
        "first name": "Bob"
    };
    console.log(data["user-id"]); // Must use bracket notation for "user-id"
    console.log(data["first name"]); // Must use bracket notation for "first name"
    ```

---

### Question 7: Callback Functions

1.  **Main Question**: What is a callback function in JavaScript? Provide a simple example demonstrating its use with `setTimeout`.
2.  **Answer**:
    A callback function is a function passed as an argument to another function, which is then executed inside the outer function at a later point in time. Callbacks are fundamental to asynchronous programming in JavaScript and Node.js, allowing code to continue executing while waiting for operations (like network requests, file I/O, or timers) to complete.
3.  **Follow-up Questions**:
    *   What is "Callback Hell" (or "Pyramid of Doom"), and how can it be mitigated (briefly)?
    *   Are all asynchronous operations in JavaScript handled exclusively with callbacks?
4.  **Follow-up Answers**:
    *   **Callback Hell**: This refers to the situation where multiple nested callback functions make code difficult to read, understand, and maintain. It often arises when dealing with sequential asynchronous operations that depend on the results of previous ones, leading to deeply indented code. It can be mitigated by using Promises, `async/await`, or named functions to flatten the code structure.
    *   **Not Exclusively Callbacks**: While callbacks are a core mechanism for asynchronous operations, modern JavaScript heavily relies on Promises and the `async/await` syntax, which are built on top of callbacks but provide a more structured and readable way to handle asynchronous flows, especially for sequential or parallel operations.
5.  **Code Example(s)**:

    ```javascript
    // Simple callback with setTimeout
    console.log("Start of script");

    function greetUser(name, callback) {
        setTimeout(function() { // This is the asynchronous operation
            const message = `Hello, ${name}!`;
            callback(message); // The callback is executed after the delay
        }, 2000); // 2-second delay
    }

    // Calling greetUser with an anonymous callback function
    greetUser("Alice", function(greetingMessage) {
        console.log(greetingMessage); // This will log after 2 seconds
    });

    console.log("End of script (continues immediately)");
    // Expected output order:
    // Start of script
    // End of script (continues immediately)
    // Hello, Alice! (after 2 seconds)
    ```

---

### Question 8: Prototype Chain

1.  **Main Question**: Explain the concept of the prototype chain in JavaScript. How does JavaScript achieve inheritance through this mechanism?
2.  **Answer**:
    The prototype chain is a fundamental mechanism in JavaScript for inheritance. Every JavaScript object has an internal property called `[[Prototype]]` (exposed as `__proto__` in many environments, though it's not standard for direct access) that links to another object, its prototype. When you try to access a property or method on an object, JavaScript first looks for it directly on that object. If it doesn't find it, it then looks at the object's `[[Prototype]]`, and then at *that* prototype's `[[Prototype]]`, and so on, until it finds the property or reaches the end of the chain (`null`). This forms the "prototype chain."

    JavaScript achieves inheritance by allowing objects to inherit properties and methods from their prototypes. This means that an object can "reuse" functionality defined on an ancestor object in its prototype chain without having to define it itself. This is known as prototypal inheritance.
3.  **Follow-up Questions**:
    *   What is `Object.prototype` and what is its significance in the prototype chain?
    *   How can you check if an object has a specific property directly on itself (not inherited from its prototype chain)?
4.  **Follow-up Answers**:
    *   **`Object.prototype`**: `Object.prototype` is the base object that sits at the top of almost every prototype chain in JavaScript. Most objects ultimately inherit from `Object.prototype`. It contains common methods like `toString()`, `hasOwnProperty()`, `isPrototypeOf()`, etc., which are then available to all objects down the chain. It marks the end of a typical prototype chain (its own `[[Prototype]]` is `null`).
    *   **Checking Own Property**: You can use the `hasOwnProperty()` method, which is inherited from `Object.prototype`. This method returns `true` if the object has the specified property as its own direct property (not inherited), and `false` otherwise.
        ```javascript
        const myObject = { a: 1 };
        const inheritedObject = Object.create(myObject); // inheritedObject's prototype is myObject
        inheritedObject.b = 2;

        console.log(inheritedObject.hasOwnProperty('b')); // true
        console.log(inheritedObject.hasOwnProperty('a')); // false (it's inherited)
        console.log(myObject.hasOwnProperty('a'));     // true
        ```
5.  **Code Example(s)**:

    ```javascript
    // Define a prototype object
    const animal = {
        eats: true,
        walk() {
            console.log("Animal walks.");
        }
    };

    // Create a new object `rabbit` and set `animal` as its prototype
    const rabbit = Object.create(animal);
    rabbit.jumps = true;

    console.log(rabbit.eats); // true (inherited from animal)
    rabbit.walk();            // Animal walks. (inherited from animal)
    console.log(rabbit.jumps); // true (own property)

    // Check the prototype chain
    console.log(Object.getPrototypeOf(rabbit) === animal); // true
    console.log(Object.getPrototypeOf(animal) === Object.prototype); // true
    console.log(Object.getPrototypeOf(Object.prototype)); // null (end of chain)
    ```

---

### Question 9: Closures

1.  **Main Question**: What is a closure in JavaScript? Provide an example demonstrating how a closure can retain access to an outer function's scope.
2.  **Answer**:
    A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In simpler terms, a closure gives you access to an outer function's scope from an inner function, even after the outer function has finished executing. The inner function "remembers" the environment in which it was created.
3.  **Follow-up Questions**:
    *   What are some common practical applications or use cases for closures?
    *   Can closures lead to memory leaks? If so, how might you mitigate this?
4.  **Follow-up Answers**:
    *   **Practical Applications**:
        *   **Private Variables/Methods**: Creating private data by encapsulating variables within a closure, exposing only public methods to interact with them (e.g., module pattern).
        *   **Function Factories**: Functions that generate other functions with specific configurations.
        *   **Currying**: Transforming a function that takes multiple