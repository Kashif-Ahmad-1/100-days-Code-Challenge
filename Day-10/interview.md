Welcome to Day 10 of your interview prep! It's great to see your continued dedication. Today, we'll dive a bit deeper into some core JavaScript concepts and start touching upon more advanced Node.js specifics. Don't worry if some of these are new; the goal is to explore and learn.

Let's start with some fundamentals!

---

### Question 1: Basic

1.  **Main Question**: Explain the difference between passing arguments by value and by reference in JavaScript functions.

2.  **Answer**:
    In JavaScript, arguments are always passed by value, but the "value" itself differs for primitive and non-primitive (object) types.

    *   **Pass by Value (Primitives)**: When you pass a primitive data type (like `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) to a function, a *copy* of that value is created and assigned to the function's parameter. Any changes made to the parameter inside the function will not affect the original variable outside the function.

    *   **Pass by Value (Objects/References)**: When you pass a non-primitive data type (like `object`, `array`, `function`) to a function, a *copy of the reference* (memory address) to that object is created and assigned to the function's parameter. Both the original variable and the function parameter now point to the *same object* in memory. If you modify the properties of the object inside the function, these changes *will* be reflected in the original object outside the function. However, if you reassign the parameter itself to a *new* object, the original variable will still point to the old object.

3.  **Follow-up Questions**:
    *   Can you force an object to be passed by value, meaning changes inside the function don't affect the original?
    *   What happens if you reassign the object parameter itself within the function?
    *   How does this behavior relate to the concept of immutability?

4.  **Follow-up Answers**:
    *   You can effectively "pass an object by value" by creating a *shallow or deep copy* of the object before passing it to the function. For a shallow copy, you can use `Object.assign({}, originalObj)` or the spread syntax `{...originalObj}` for objects, and `[...originalArray]` for arrays. For a deep copy, you'd typically use a library like Lodash's `cloneDeep` or `JSON.parse(JSON.stringify(originalObj))` (with limitations).
    *   If you reassign the object parameter itself within the function (e.g., `obj = { newProp: 'value' }`), the parameter will now point to a *new* object. The original variable outside the function will *still point to the original object*, and thus will not be affected by this reassignment.
    *   This behavior highlights why immutability is important in JavaScript, especially when working with objects. By ensuring that objects are never directly mutated but instead new objects are created for every change, you can avoid unexpected side effects from functions that receive references to your objects.

5.  **Code Example(s)**:

    ```javascript
    // Pass by Value (Primitives)
    let num = 10;

    function addFive(value) {
      value = value + 5; // Modifies the copy
      console.log("Inside function (primitive):", value); // 15
    }

    addFive(num);
    console.log("Outside function (primitive):", num); // 10 (original unaffected)

    // Pass by Value (Objects/References)
    let myObject = {
      a: 1,
      b: 2
    };

    function modifyObject(obj) {
      obj.a = 100; // Modifies the object pointed to by the reference
      obj.c = 3;   // Adds a new property to the object
      console.log("Inside function (object modified):", obj); // { a: 100, b: 2, c: 3 }

      obj = {
        x: 1,
        y: 2
      }; // Reassigns the local 'obj' parameter to a NEW object
      console.log("Inside function (object reassigned):", obj); // { x: 1, y: 2 }
    }

    modifyObject(myObject);
    console.log("Outside function (object):", myObject); // { a: 100, b: 2, c: 3 } (original object affected by property modifications, but not by reassignment)
    ```

---

### Question 2: Basic

1.  **Main Question**: How do you check the data type of a variable in JavaScript? Discuss `typeof` and its known limitations.

2.  **Answer**:
    The primary way to check the data type of a variable in JavaScript is using the `typeof` operator. It returns a string indicating the type of the unevaluated operand.

    For example:
    *   `typeof "hello"` returns `"string"`
    *   `typeof 123` returns `"number"`
    *   `typeof true` returns `"boolean"`
    *   `typeof undefined` returns `"undefined"`
    *   `typeof Symbol()` returns `"symbol"`
    *   `typeof 10n` returns `"bigint"`
    *   `typeof {}` returns `"object"`
    *   `typeof []` returns `"object"`
    *   `typeof function() {}` returns `"function"`

    **Known Limitations of `typeof`**:
    *   **`typeof null` returns `"object"`**: This is a long-standing bug in JavaScript that cannot be fixed due to backward compatibility concerns.
    *   **Arrays and Objects**: `typeof` returns `"object"` for both arrays and plain objects, making it difficult to distinguish between them.
    *   **Functions**: While functions are technically objects, `typeof` specifically returns `"function"` for them, which is generally helpful but can sometimes be misleading if you're strictly thinking of "objects".

3.  **Follow-up Questions**:
    *   How would you correctly check if a variable is an array?
    *   What are other ways to check for object types beyond `typeof`, especially for custom objects or instances of classes?
    *   When might `instanceof` be more useful than `typeof`?

4.  **Follow-up Answers**:
    *   To correctly check if a variable is an array, you should use `Array.isArray()`. For example, `Array.isArray([])` returns `true`, while `Array.isArray({})` returns `false`.
    *   For more specific object type checking, especially for custom objects or instances of classes, you can use `instanceof` or check the object's `constructor.name`. For example, `myDate instanceof Date` would return `true` if `myDate` is a `Date` object. You can also use `Object.prototype.toString.call(variable)` which returns a string like `"[object Array]"`, `"[object Object]"`, `"[object Date]"`, etc.
    *   `instanceof` is more useful than `typeof` when you need to determine if an object is an instance of a specific class or constructor function (or any of its superclasses in the prototype chain). `typeof` only tells you the broad category (primitive, object, function), whereas `instanceof` provides more granular information about the object's origin.

5.  **Code Example(s)**:

    ```javascript
    console.log(typeof 42); // "number"
    console.log(typeof "hello"); // "string"
    console.log(typeof true); // "boolean"
    console.log(typeof undefined); // "undefined"
    console.log(typeof null); // "object" (limitation!)
    console.log(typeof {}); // "object"
    console.log(typeof []); // "object" (limitation!)
    console.log(typeof function() {}); // "function"

    // Correctly checking for an array
    console.log(Array.isArray([])); // true
    console.log(Array.isArray({})); // false

    // Using instanceof
    class MyClass {}
    const myInstance = new MyClass();
    const myArr = [];
    console.log(myInstance instanceof MyClass); // true
    console.log(myArr instanceof Array); // true
    console.log(myArr instanceof Object); // true (due to prototype chain)
    ```

---

### Question 3: Basic

1.  **Main Question**: Explain the purpose of the `isNaN()` function and the global `NaN` property in JavaScript. What are some common scenarios where `NaN` might appear?

2.  **Answer**:
    *   **`NaN` (Not-a-Number)**: `NaN` is a special numeric value in JavaScript that represents an undefined or unrepresentable numerical result. It's the only value in JavaScript that is not equal to itself (`NaN !== NaN`).
    *   **`isNaN()` function**: The global `isNaN()` function is used to determine whether a value is `NaN` *or* if it cannot be converted into a number. It attempts to coerce its argument to a number before checking if it's `NaN`.

    **Common Scenarios where `NaN` might appear**:
    *   **Invalid mathematical operations**: `0 / 0`, `Math.sqrt(-1)`, `Infinity - Infinity`.
    *   **Failed number conversions**: `parseInt("hello")`, `Number("abc")`.
    *   **Undefined values in arithmetic**: `undefined + 5`.
    *   **Operations involving `NaN`**: Any arithmetic operation with `NaN` as an operand will result in `NaN` (e.g., `NaN + 5`).

3.  **Follow-up Questions**:
    *   What is the difference between the global `isNaN()` and `Number.isNaN()`? Which one is generally preferred and why?
    *   Given that `NaN !== NaN`, how would you check if a variable *strictly* holds the `NaN` value without coercing it?
    *   Can `NaN` be used in comparisons with other numbers?

4.  **Follow-up Answers**:
    *   The global `isNaN()` function has a quirk: it returns `true` for values that are not `NaN` but cannot be coerced into numbers (e.g., `isNaN("hello")` is `true`). `Number.isNaN()` was introduced in ES6 and is a more robust check. It returns `true` only if the value is *actually* the `NaN` value and does *not* perform type coercion. `Number.isNaN()` is generally preferred because it avoids the unexpected behavior of the global `isNaN()` when dealing with non-numeric strings.
    *   To strictly check if a variable holds the `NaN` value without coercion, you should use `Number.isNaN()`. Alternatively, you can leverage the `NaN !== NaN` property: `value !== value` will only be true if `value` is `NaN`.
    *   No, `NaN` cannot be used in meaningful comparisons with other numbers. Any comparison operation involving `NaN` (e.g., `NaN > 5`, `NaN < 10`, `NaN === NaN`) will always evaluate to `false`.

5.  **Code Example(s)**:

    ```javascript
    // Examples where NaN appears
    console.log(0 / 0); // NaN
    console.log(Math.sqrt(-1)); // NaN
    console.log(parseInt("hello")); // NaN
    console.log(Number("abc")); // NaN
    console.log(undefined + 5); // NaN

    // Using global isNaN()
    console.log(isNaN(123)); // false
    console.log(isNaN("hello")); // true (coerces "hello" to NaN)
    console.log(isNaN(NaN)); // true
    console.log(isNaN("123")); // false (coerces "123" to 123)

    // Using Number.isNaN() (preferred)
    console.log(Number.isNaN(123)); // false
    console.log(Number.isNaN("hello")); // false (no coercion, "hello" is not NaN)
    console.log(Number.isNaN(NaN)); // true
    console.log(Number.isNaN("123")); // false
    ```

---

### Question 4: Basic

1.  **Main Question**: Describe "short-circuiting" with logical operators (`&&`, `||`) in JavaScript. Provide a simple example for each.

2.  **Answer**:
    Short-circuiting is a behavior in JavaScript's logical `&&` (AND) and `||` (OR) operators where the second operand is only evaluated if the first operand is not sufficient to determine the result of the expression.

    *   **Logical AND (`&&`)**: If the first operand is "falsy", the `&&` operator immediately returns the first operand's value without evaluating the second operand. If the first operand is "truthy", it evaluates and returns the second operand. It's often used for conditional execution or assigning a default value if a variable exists.

    *   **Logical OR (`||`)**: If the first operand is "truthy", the `||` operator immediately returns the first operand's value without evaluating the second operand. If the first operand is "falsy", it evaluates and returns the second operand. It's commonly used to provide a default value if a variable is `null`, `undefined`, `0`, `""`, `false`, or `NaN`.

3.  **Follow-up Questions**:
    *   What are some practical use cases for short-circuiting in everyday JavaScript development?
    *   How does the nullish coalescing operator (`??`) differ from the logical OR (`||`) operator in terms of short-circuiting?
    *   Can you use short-circuiting with functions?

4.  **Follow-up Answers**:
    *   **Practical Use Cases**:
        *   **Conditional Execution (`&&`)**: `user && user.isAdmin && grantAdminAccess();` (only calls `grantAdminAccess()` if `user` exists and `user.isAdmin` is true).
        *   **Default Value Assignment (`||`)**: `const userName = inputName || "Guest";` (if `inputName` is falsy, `userName` defaults to "Guest").
        *   **Guarding against errors**: `data && data.items && data.items.length` to avoid errors when trying to access properties of potentially `null` or `undefined` objects.
    *   **`??` vs `||`**: The nullish coalescing operator (`??`) short-circuits and returns the right-hand operand *only if* the left-hand operand is `null` or `undefined`. In contrast, `||` returns the right-hand operand if the left-hand operand is *any falsy value* (including `0`, `""`, `false`, `NaN`). This makes `??` useful when `0` or `""` are valid values that you don't want to treat as "missing" defaults.
    *   Yes, you can use short-circuiting with functions. If a function call is part of a short-circuiting expression, the function will only be executed if its evaluation is necessary to determine the overall result of the logical operation.

5.  **Code Example(s)**:

    ```javascript
    // Logical AND (&&) Short-circuiting
    function logMessage(msg) {
      console.log(msg);
      return msg;
    }

    let user = {
      name: "Alice"
    };
    let isAdmin = false;

    // Example 1: `user` is truthy, so `logMessage('User exists')` is executed
    user && logMessage('User exists'); // Output: "User exists"

    // Example 2: `isAdmin` is falsy, so `logMessage('Grant admin access')` is NOT executed
    isAdmin && logMessage('Grant admin access'); // No output

    // Assigning a value based on short-circuiting
    const result1 = 0 && "Hello";
    console.log(result1); // 0 (0 is falsy, so it returns 0)

    const result2 = "World" && 123;
    console.log(result2); // 123 ("World" is truthy, so it returns 123)

    // Logical OR (||) Short-circuiting
    let userName = "";
    let defaultName = "Guest";

    // Example 1: `userName` is falsy, so `defaultName` is returned
    const display1 = userName || defaultName;
    console.log(display1); // "Guest"

    let age = 30;
    // Example 2: `age` is truthy, so `age` is returned, `logMessage` is NOT executed
    const display2 = age || logMessage("Age not found");
    console.log(display2); // 30

    // Using `??` for comparison (not short-circuiting example but shows difference)
    const count = 0;
    const items = count || "No items"; // "No items" (0 is falsy)
    const itemsStrict = count ?? "No items"; // 0 (0 is not null/undefined)
    console.log(items);
    console.log(itemsStrict);
    ```

---

### Question 5: Intermediate

1.  **Main Question**: Explain the concept of `async` and `await` in JavaScript. How do they simplify asynchronous code compared to using Promises directly or traditional callbacks?

2.  **Answer**:
    `async` and `await` are syntactic sugar built on top of Promises, introduced in ES2017 (ES8), designed to make asynchronous code look and behave more like synchronous code, making it easier to read and write.

    *   **`async` keyword**: An `async` function is a function declared with the `async` keyword. It implicitly returns a Promise. If the function returns a non-Promise value, it's automatically wrapped in a resolved Promise. If it throws an error, it's wrapped in a rejected Promise.
    *   **`await` keyword**: The `await` keyword can only be used inside an `async` function. It pauses the execution of the `async` function until the Promise it's waiting for settles (either resolves or rejects). Once the Promise settles, `await` returns its resolved value or throws its rejected value. This allows you to write sequential-looking code for asynchronous operations.

    **Simplification compared to Promises/Callbacks**:
    *   **Readability**: `async/await` eliminates the need for `.then()` chains and nested callbacks, leading to flatter, more linear code that's easier to follow.
    *   **Error Handling**: Errors in `async/await` functions can be handled using traditional `try...catch` blocks, which is much more intuitive than `.catch()` for Promises or checking for errors in every callback.
    *   **Debugging**: Debugging `async/await` code is often simpler because the execution flow looks more synchronous, making stack traces easier to understand.
    *   **Conditional Logic**: Writing conditional logic (e.g., `if/else`, `for` loops) with asynchronous operations becomes much more straightforward.

3.  **Follow-up Questions**:
    *   Can you use `await` outside of an `async` function? Why or why not?
    *   How do you handle errors within an `async` function?
    *   When might you still prefer to use `Promise.all()` or `Promise.race()` over sequential `await` calls?

4.  **Follow-up Answers**:
    *   No, you cannot use `await` outside of an `async` function. The `await` keyword pauses the execution of the *enclosing `async` function*. Without an `async` function to pause, `await` would have no context and would result in a `SyntaxError`. (Top-level `await` is available in ES Modules in some environments, but generally, it requires an `async` function).
    *   Errors within an `async` function are handled using a standard `try...catch` block. If a Promise awaited inside the `try` block rejects, the execution jumps to the `catch` block, allowing you to handle the error gracefully.
    *   You would still prefer `Promise.all()` when you need to run multiple independent asynchronous operations concurrently and wait for *all of them* to complete successfully before proceeding. `Promise.race()` is useful when you want to execute multiple promises concurrently and only care about the result of the *first one to settle* (resolve or reject). Sequential `await` calls would execute operations one after another, which is less efficient for independent tasks.

5.  **Code Example(s)**:

    ```javascript
    // Simulating an asynchronous operation
    function fetchData(id) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(`Data for ID: ${id}`);
        }, 1000);
      });
    }

    // Using Promises directly
    function getDataWithPromises() {
      fetchData(1)
        .then(data1 => {
          console.log(data1);
          return fetchData(2);
        })
        .then(data2 => {
          console.log(data2);
        })
        .catch(error => {
          console.error("Error with Promises:", error);
        });
    }
    // getDataWithPromises();

    // Using async/await
    async function getDataWithAsyncAwait() {
      try {
        console.log("Fetching data...");
        const data1 = await fetchData(1); // Pauses here until fetchData(1) resolves
        console.log(data1);

        const data2 = await fetchData(2); // Pauses here until fetchData(2) resolves
        console.log(data2);

        // Example of error handling
        // await Promise.reject("Something went wrong!");

        console.log("All data fetched.");
      } catch (error) {
        console.error("Error with async/await:", error);
      }
    }
    getDataWithAsyncAwait();
    ```

---

### Question 6: Intermediate

1.  **Main Question**: Describe the difference between `Array.prototype.slice()` and `Array.prototype.splice()` methods in JavaScript. Provide use cases for each.

2.  **Answer**:
    Both `slice()` and `splice()` are array methods, but they serve different purposes and have a fundamental difference in how they modify the original array.

    *   **`Array.prototype.slice()`**:
        *   **Purpose**: Extracts a *shallow copy* of a portion of an array into a new array.
        *   **Mutability**: It is **non-mutating**. The original array remains unchanged.
        *   **Arguments**: `slice(startIndex, endIndex)`
            *   `startIndex`: (Optional) The index at which to begin extraction. Defaults to `0`.
            *   `endIndex`: (Optional) The index before which to end extraction. The element at `endIndex` is *not* included. Defaults to `array.length`.
        *   **Return Value**: A new array containing the extracted elements.

    *   **`Array.prototype.splice()`**:
        *   **Purpose**: Changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
        *   **Mutability**: It is **mutating**. It modifies the original array.
        *   **Arguments**: `splice(startIndex, deleteCount, item1, item2, ...)`
            *   `startIndex`: The index at which to start changing the array.
            *   `deleteCount`: (Optional) The number of elements to remove from `startIndex`. If `0`, no elements are removed. If omitted, all elements from `startIndex` to the end are removed.
            *   `item1, item2, ...`: (Optional) The elements to add to the array, starting at `startIndex`.
        *   **Return Value**: An array containing the deleted elements (if any).

3.  **Follow-up Questions**:
    *   Can `slice()` be used to convert an array-like object (like `arguments` or a NodeList) into a true array? How?
    *   What happens if you call `splice()` with only the `startIndex` argument?
    *   When would you choose `slice()` over `splice()` and vice versa?

4.  **Follow-up Answers**:
    *   Yes, `slice()` can be used to convert an array-like object into a true array. You can do this by calling `Array.prototype.slice.call(arrayLikeObject)` or more commonly in modern JavaScript, by using the spread syntax: `[