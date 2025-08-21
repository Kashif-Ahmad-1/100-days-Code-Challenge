Welcome to Day 12 of your interview prep! Let's start with some fundamentals and then gradually move into more complex areas of JavaScript and Node.js.

---

### Question 1: Basic

1.  **Main Question**: Explain the purpose of the `Array.prototype.reduce()` method in JavaScript. How does it work, and what are its main parameters?

2.  **Answer**:
    The `reduce()` method executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements is a single value. It's often used to "reduce" an array of items down to a single value (e.g., sum, product, flattened array, or an object).

    Its main parameters are:
    *   `callback` (required): A function executed on each element of the array. It takes four arguments:
        *   `accumulator`: The accumulated value previously returned in the last invocation of the callback, or `initialValue`, if supplied.
        *   `currentValue`: The current element being processed in the array.
        *   `currentIndex` (optional): The index of the current element being processed.
        *   `array` (optional): The array `reduce()` was called upon.
    *   `initialValue` (optional): A value to use as the first argument to the first call of the `callback`. If no `initialValue` is supplied, the first element in the array will be used as the `accumulator`, and `currentValue` will start from the second element.

3.  **Follow-up Questions**:
    *   Can `reduce()` be used to transform an array into a new array, similar to `map()` or `filter()`?
    *   What happens if you call `reduce()` on an empty array without an `initialValue`?
    *   When might `reduce()` be a more suitable choice than `forEach()` or a simple `for` loop?

4.  **Follow-up Answers**:
    *   Yes, `reduce()` can be used to replicate the functionality of `map()` or `filter()` by having the reducer function return an array and modifying it in each iteration. For `map`, you'd push the transformed `currentValue` into the `accumulator` array. For `filter`, you'd conditionally push the `currentValue`.
    *   If `reduce()` is called on an empty array without an `initialValue`, it will throw a `TypeError`. If `initialValue` is provided, it will simply return that `initialValue`.
    *   `reduce()` is suitable when you need to derive a single value from an array, or when you need to process elements sequentially to build up a result that depends on previous calculations. It's concise for tasks like summing numbers, flattening arrays, grouping objects by a property, or building a complex object from an array of data.

5.  **Code Example(s)**:

    ```javascript
    // Example 1: Summing all numbers in an array
    const numbers = [1, 2, 3, 4, 5];
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(sum); // Output: 15

    // Example 2: Counting occurrences of items in an array
    const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
    const fruitCount = fruits.reduce((count, fruit) => {
      count[fruit] = (count[fruit] || 0) + 1;
      return count;
    }, {});
    console.log(fruitCount); // Output: { apple: 3, banana: 2, orange: 1 }
    ```

---

### Question 2: Basic

1.  **Main Question**: Describe the purpose and usage of `Object.keys()`, `Object.values()`, and `Object.entries()` methods in JavaScript.

2.  **Answer**:
    These three static methods of the `Object` constructor are used to easily extract different parts of an object's own enumerable string-keyed properties into arrays.

    *   `Object.keys(obj)`: Returns an array of a given object's own enumerable string-keyed property **names** (keys).
    *   `Object.values(obj)`: Returns an array of a given object's own enumerable string-keyed property **values**.
    *   `Object.entries(obj)`: Returns an array of a given object's own enumerable string-keyed property `[key, value]` **pairs**. Each pair is itself an array.

3.  **Follow-up Questions**:
    *   Do these methods include properties from the object's prototype chain?
    *   What does "enumerable" mean in the context of these methods?
    *   How would you iterate over both the keys and values of an object using one of these methods?

4.  **Follow-up Answers**:
    *   No, these methods only return the object's *own* properties and do not include properties inherited from its prototype chain.
    *   "Enumerable" properties are those that can be iterated over using a `for...in` loop or returned by `Object.keys()`, `Object.values()`, `Object.entries()`. Most properties created directly on an object are enumerable by default, but they can be made non-enumerable using `Object.defineProperty()`.
    *   You would typically use `Object.entries()` combined with a `for...of` loop to iterate over both keys and values: `for (const [key, value] of Object.entries(myObject)) { /* ... */ }`.

5.  **Code Example(s)**:

    ```javascript
    const user = {
      name: 'Alice',
      age: 30,
      city: 'New York'
    };

    console.log(Object.keys(user));   // Output: ['name', 'age', 'city']
    console.log(Object.values(user)); // Output: ['Alice', 30, 'New York']
    console.log(Object.entries(user)); // Output: [['name', 'Alice'], ['age', 30], ['city', 'New York']]

    // Iterating with Object.entries
    for (const [key, value] of Object.entries(user)) {
      console.log(`${key}: ${value}`);
    }
    // Output:
    // name: Alice
    // age: 30
    // city: New York
    ```

---

### Question 3: Basic

1.  **Main Question**: Explain the differences between `String.prototype.indexOf()` and `String.prototype.includes()` methods. When would you use one over the other?

2.  **Answer**:
    Both methods are used to search within a string, but they return different types of results and serve slightly different primary purposes:

    *   `String.prototype.indexOf(searchValue, fromIndex)`:
        *   Returns the **index** of the first occurrence of `searchValue` within the string.
        *   If `searchValue` is not found, it returns `-1`.
        *   It can take an optional `fromIndex` to start the search from a specific position.
        *   It can be used to find all occurrences by repeatedly calling it with an updated `fromIndex`.

    *   `String.prototype.includes(searchValue, fromIndex)`:
        *   Returns a **boolean** (`true` or `false`) indicating whether the `searchValue` is found anywhere within the string.
        *   It also takes an optional `fromIndex`.
        *   It was introduced in ES6 for a more direct way to check for existence.

    You would use `indexOf()` when you need to know the *position* of the substring, or if you need to perform more complex logic based on the index (e.g., slicing the string from that point, or finding multiple occurrences).
    You would use `includes()` when you simply need to know *if* a string contains another string, and the exact position is not relevant. It provides a more readable and direct check for existence.

3.  **Follow-up Questions**:
    *   Are both methods case-sensitive?
    *   How would you check if a string *starts with* or *ends with* a specific substring using dedicated methods?
    *   Can `indexOf()` distinguish between `0` (the first index) and `false`?

4.  **Follow-up Answers**:
    *   Yes, both `indexOf()` and `includes()` are case-sensitive. For example, `'Hello'.includes('hello')` would return `false`.
    *   To check if a string starts with a substring, you'd use `String.prototype.startsWith()`. To check if it ends with a substring, you'd use `String.prototype.endsWith()`. Both are ES6 additions.
    *   Yes, `indexOf()` returns `0` for a match at the beginning of the string, and `-1` for no match. Since `0` is a truthy value in a boolean context (unless explicitly compared to `-1`), you typically check `myString.indexOf('sub') !== -1` to determine existence, which is why `includes()` was introduced for clarity.

5.  **Code Example(s)**:

    ```javascript
    const sentence = "The quick brown fox jumps over the lazy dog.";

    // Using indexOf()
    console.log(sentence.indexOf('fox'));    // Output: 16 (index of 'f')
    console.log(sentence.indexOf('cat'));    // Output: -1 (not found)
    console.log(sentence.indexOf('o', 10));  // Output: 17 (first 'o' after index 10)

    // Using includes()
    console.log(sentence.includes('jumps')); // Output: true
    console.log(sentence.includes('zebra')); // Output: false
    console.log(sentence.includes('quick', 5)); // Output: false (starts searching from index 5, 'quick' is before that)
    ```

---

### Question 4: Basic

1.  **Main Question**: In Node.js, what is the purpose of the `fs` (File System) module? Give a simple example of reading a file asynchronously.

2.  **Answer**:
    The `fs` module in Node.js provides an API for interacting with the file system. It allows you to perform various file operations such as reading files, writing files, deleting files, creating directories, changing permissions, and more. It offers both synchronous and asynchronous versions of most functions, with asynchronous being the preferred approach in Node.js to avoid blocking the Event Loop.

3.  **Follow-up Questions**:
    *   Why is it generally recommended to use the asynchronous versions of `fs` module functions over their synchronous counterparts in Node.js?
    *   How would you handle potential errors when reading a file using `fs.readFile()`?
    *   What's a common use case for the `fs` module in a Node.js application?

4.  **Follow-up Answers**:
    *   Asynchronous `fs` functions are recommended because they are non-blocking. When an asynchronous operation (like reading a file) is initiated, Node.js offloads it and continues executing other code. Once the operation completes, a callback function is triggered. Synchronous operations, however, block the entire Node.js process until they are complete, which can lead to performance issues and unresponsive applications, especially in a server environment.
    *   With `fs.readFile()`, errors are typically handled as the first argument in the callback function. If an error occurs (e.g., file not found, permission denied), the `err` parameter will contain an `Error` object; otherwise, it will be `null`.
    *   Common use cases include reading configuration files, logging application events to files, serving static assets (like HTML, CSS, images) directly from the file system, or processing user-uploaded files.

5.  **Code Example(s)**:

    ```javascript
    // Assuming a file named 'example.txt' exists in the same directory with some content.
    // example.txt content: "Hello, Node.js File System!"

    const fs = require('fs');

    // Asynchronous file read using a callback
    fs.readFile('example.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      console.log('File content (callback):', data);
    });

    // Asynchronous file read using Promises (modern approach, often with async/await)
    fs.promises.readFile('example.txt', 'utf8')
      .then(data => {
        console.log('File content (promise):', data);
      })
      .catch(err => {
        console.error('Error reading file (promise):', err);
      });

    console.log("This will log before the file content, demonstrating non-blocking I/O.");
    ```

---

### Question 5: Intermediate

1.  **Main Question**: Explain the difference between `call()`, `apply()`, and `bind()` methods in JavaScript. How do they affect the `this` context of a function?

2.  **Answer**:
    All three methods are used to explicitly set the `this` context of a function, allowing you to control what `this` refers to inside that function.

    *   `func.call(thisArg, arg1, arg2, ...)`:
        *   Immediately invokes the function `func`.
        *   Sets `this` inside `func` to `thisArg`.
        *   Accepts arguments individually, separated by commas.

    *   `func.apply(thisArg, [argsArray])`:
        *   Immediately invokes the function `func`.
        *   Sets `this` inside `func` to `thisArg`.
        *   Accepts arguments as an array or an array-like object.

    *   `func.bind(thisArg, arg1, arg2, ...)`:
        *   **Does not immediately invoke** the function.
        *   Returns a *new* function with its `this` context permanently bound to `thisArg`.
        *   Any arguments provided to `bind()` after `thisArg` are pre-set (curried) as arguments to the new function.

    The primary difference between `call` and `apply` is how they handle function arguments (individual vs. array). `bind` is fundamentally different as it returns a new function for later execution, rather than executing immediately.

3.  **Follow-up Questions**:
    *   When would you typically choose `bind()` over `call()` or `apply()`?
    *   Can the `this` context of a function returned by `bind()` be changed later?
    *   What happens if you pass `null` or `undefined` as the `thisArg` to `call()`, `apply()`, or `bind()` in non-strict mode vs. strict mode?

4.  **Follow-up Answers**:
    *   You would choose `bind()` when you want to create a new function with a pre-set `this` context that can be executed later, often as an event handler, a callback function, or when passing a method to another function where its `this` context might otherwise be lost (e.g., in `setTimeout`).
    *   No, once a function's `this` context is bound using `bind()`, it cannot be changed again, even if you try to use `call()` or `apply()` on the bound function. It's permanently fixed.
    *   In non-strict mode, if `null` or `undefined` is passed as `thisArg`, `this` will default to the global object (`window` in browsers, `global` or `undefined` in Node.js depending on context). In strict mode, `this` will remain exactly `null` or `undefined` as passed.

5.  **Code Example(s)**:

    ```javascript
    const person = {
      name: 'Alice',
      greet: function(greeting, punctuation) {
        console.log(`${greeting}, my name is ${this.name}${punctuation}`);
      }
    };

    const anotherPerson = {
      name: 'Bob'
    };

    // Using call(): Executes immediately, arguments individually
    person.greet.call(anotherPerson, 'Hi', '!'); // Output: Hi, my name is Bob!

    // Using apply(): Executes immediately, arguments as an array
    person.greet.apply(anotherPerson, ['Hello', '.']); // Output: Hello, my name is Bob.

    // Using bind(): Returns a new function, doesn't execute immediately
    const greetBob = person.greet.bind(anotherPerson, 'Hey');
    greetBob('?'); // Output: Hey, my name is Bob?

    // Example of bind for event handlers (common use case)
    // document.getElementById('myButton').addEventListener('click', person.greet.bind(person, 'Hello', '!'));
    ```

---

### Question 6: Intermediate

1.  **Main Question**: Describe how the `new` keyword works in JavaScript when used with a constructor function. What does it return, and what happens behind the scenes?

2.  **Answer**:
    The `new` keyword is used to create an instance of a user-defined object type or a built-in object type that has a constructor function. When `new` is used before a function call, it performs several operations behind the scenes:

    1.  **A new empty object is created**: An empty plain JavaScript object is created in memory.
    2.  **Prototype linkage**: The newly created object's `[[Prototype]]` (internal property) is linked to the `prototype` property of the constructor function. This means the new object can inherit properties and methods defined on the constructor's prototype.
    3.  **`this` binding**: The `this` context within the constructor function is bound to the newly created object. So, any properties or methods assigned to `this` inside the constructor will become properties of the new instance.
    4.  **Constructor execution**: The constructor function is executed with the bound `this` and any arguments passed to it.
    5.  **Return value**:
        *   If the constructor function does not explicitly return an object, or returns a primitive value (like a number, string, boolean, `null`, or `undefined`), the newly created object (from step 1) is returned by default.
        *   If the constructor function *explicitly* returns a non-primitive object (e.g., another object, an array, a function), then that explicitly returned object will be returned by the `new` expression instead of the newly created instance.

3.  **Follow-up Questions**:
    *   How do ES6 classes relate to constructor functions and the `new` keyword?
    *   What is the significance of linking the new object's `[[Prototype]]` to the constructor's `prototype` property?
    *   Can you use `new` with an arrow function? Why or why not?

4.  **Follow-up Answers**: