Welcome to Day 4 of your interview prep! It's great to have you here. We've covered a lot of fundamental ground in the past three days, from JavaScript basics to asynchronous patterns and Node.js essentials.

Today, we'll continue our deep dive, exploring more advanced JavaScript features, delving deeper into Node.js specifics, and touching upon some architectural and best-practice considerations. Remember, this is a discussion to understand your depth of knowledge.

Let's begin!

---

### **Question 1: Basic**

1.  **Main Question**: What are Higher-Order Functions in JavaScript? Provide an example of how they are commonly used with array methods.
2.  **Answer**: A Higher-Order Function (HOF) is a function that either takes one or more functions as arguments, or returns a function as its result, or both. They are a fundamental concept in functional programming and enable powerful abstractions and code reuse. Common JavaScript array methods like `map()`, `filter()`, and `reduce()` are excellent examples of built-in higher-order functions.
3.  **Follow-up Questions**:
    *   Why are Higher-Order Functions considered a powerful feature in JavaScript?
    *   Can you name another common scenario (besides array methods) where you might encounter Higher-Order Functions?
    *   What is a "callback function" in the context of a Higher-Order Function?
4.  **Follow-up Answers**:
    *   They promote code reusability, modularity, and abstraction. They allow for more declarative programming (describing *what* to do rather than *how* to do it) and make code more concise and easier to reason about.
    *   Another common scenario is in event handling, where you pass a function to be executed when an event occurs (e.g., `element.addEventListener('click', myFunction)`). Also, middleware functions in frameworks like Express.js are HOFs.
    *   A callback function is simply the function that is passed as an argument to a Higher-Order Function and is intended to be executed at a later point in time by the HOF.
5.  **Code Example(s)**:

    ```javascript
    // Example: Using map() as a HOF to transform an array
    const numbers = [1, 2, 3, 4];

    // The anonymous function (num) => num * 2 is the callback
    const doubledNumbers = numbers.map((num) => num * 2);
    console.log(doubledNumbers); // Output: [2, 4, 6, 8]

    // Example: A custom HOF
    function operateOnArray(arr, operation) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(operation(arr[i]));
        }
        return result;
    }

    const addFive = (num) => num + 5;
    const numbersPlusFive = operateOnArray(numbers, addFive);
    console.log(numbersPlusFive); // Output: [6, 7, 8, 9]
    ```

---

### **Question 2: Basic**

1.  **Main Question**: Explain the purpose and typical use cases for the `map()`, `filter()`, and `reduce()` array methods in JavaScript.
2.  **Answer**: These are three of the most commonly used higher-order array methods in JavaScript, enabling powerful data transformations and manipulations.
    *   **`map()`**: Creates a *new array* by calling a provided function on every element in the calling array. It's used for **transforming** each element.
    *   **`filter()`**: Creates a *new array* containing all elements from the calling array that satisfy a provided test function. It's used for **selecting** a subset of elements.
    *   **`reduce()`**: Executes a reducer function (that you provide) on each element of the array, resulting in a *single output value*. It's used for **accumulating** a single value from the array.
3.  **Follow-up Questions**:
    *   Do `map()`, `filter()`, and `reduce()` modify the original array?
    *   When would `forEach()` be more appropriate than `map()`?
    *   Can you achieve the functionality of `filter()` or `map()` using `reduce()`?
4.  **Follow-up Answers**:
    *   No, all three methods (`map()`, `filter()`, `reduce()`) return a *new array* (or a single value for `reduce()`) and do not modify the original array. This makes them suitable for functional programming paradigms and immutability.
    *   `forEach()` is appropriate when you need to iterate over an array and perform a side effect for each element (e.g., logging to the console, updating a DOM element) but you don't need to create a new array or return a value from the iteration. `map()` is specifically for transforming elements into a new array.
    *   Yes, you can achieve the functionality of `filter()` and `map()` using `reduce()`, as `reduce()` is the most versatile of the three. For `map()`, you'd accumulate a new array with transformed elements. For `filter()`, you'd accumulate a new array with only the elements that pass a condition.
5.  **Code Example(s)**:

    ```javascript
    const products = [
        { id: 1, name: 'Laptop', price: 1200 },
        { id: 2, name: 'Mouse', price: 25 },
        { id: 3, name: 'Keyboard', price: 75 },
        { id: 4, name: 'Monitor', price: 300 }
    ];

    // map(): Get just product names
    const productNames = products.map(product => product.name);
    console.log("Names:", productNames); // Output: ["Laptop", "Mouse", "Keyboard", "Monitor"]

    // filter(): Get products under $100
    const affordableProducts = products.filter(product => product.price < 100);
    console.log("Affordable:", affordableProducts);
    // Output: [{ id: 2, name: 'Mouse', price: 25 }, { id: 3, name: 'Keyboard', price: 75 }]

    // reduce(): Calculate total price of all products
    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
    console.log("Total Price:", totalPrice); // Output: 1600
    ```

---

### **Question 3: Basic**

1.  **Main Question**: What are "truthy" and "falsy" values in JavaScript? List all the common falsy values.
2.  **Answer**: In JavaScript, every value has an inherent boolean value. When a non-boolean value is evaluated in a boolean context (e.g., in an `if` statement, `&&`, `||`, or `!`), it is coerced into a boolean `true` or `false`.
    *   **Falsy values**: Values that coerce to `false` when evaluated in a boolean context.
    *   **Truthy values**: All values that are not falsy.
    The common falsy values are:
    1.  `false` (the boolean primitive)
    2.  `0` (the number zero)
    3.  `-0` (the negative number zero)
    4.  `0n` (BigInt zero)
    5.  `""` (an empty string)
    6.  `null`
    7.  `undefined`
    8.  `NaN` (Not-a-Number)
3.  **Follow-up Questions**:
    *   Is an empty array (`[]`) truthy or falsy? What about an empty object (`{}`)?
    *   How can you explicitly convert a value to its boolean equivalent?
    *   Give an example of how a falsy value might unexpectedly affect program flow.
4.  **Follow-up Answers**:
    *   Both an empty array (`[]`) and an empty object (`{}`) are **truthy** in JavaScript.
    *   You can explicitly convert a value to its boolean equivalent using the `Boolean()` constructor (e.g., `Boolean(value)`) or by using the double negation operator (`!!value`).
    *   A common example is checking if a string is empty: `if (username)` would evaluate to `false` if `username` is an empty string, which is often the desired behavior. However, `if (count)` would evaluate to `false` if `count` is `0`, which might not be desired if `0` is a valid count.
5.  **Code Example(s)**:

    ```javascript
    // Falsy examples
    if (0) { console.log("0 is truthy"); } else { console.log("0 is falsy"); }
    // Output: 0 is falsy

    if ("") { console.log("Empty string is truthy"); } else { console.log("Empty string is falsy"); }
    // Output: Empty string is falsy

    // Truthy examples
    if ([]) { console.log("Empty array is truthy"); } else { console.log("Empty array is falsy"); }
    // Output: Empty array is truthy

    if ({}) { console.log("Empty object is truthy"); } else { console.log("Empty object is falsy"); }
    // Output: Empty object is truthy

    const myVar = null;
    if (myVar) {
        console.log("myVar is truthy");
    } else {
        console.log("myVar is falsy"); // This will execute
    }
    ```

---

### **Question 4: Basic**

1.  **Main Question**: Explain the concepts of "Event Bubbling" and "Event Capturing" in the DOM. How do they relate to event propagation?
2.  **Answer**: When an event occurs on a DOM element (e.g., a click), that event doesn't just happen on that element. It propagates through the DOM tree in a specific order, known as event propagation. This process has three phases:
    1.  **Capturing Phase**: The event starts from the `window` object, then travels down to the target element.
    2.  **Target Phase**: The event reaches the actual element that triggered it.
    3.  **Bubbling Phase**: The event bubbles up from the target element back to the `window` object.
    *   **Event Bubbling (default)**: The event handler is triggered first on the target element, and then on its parent, then on its grandparent, and so on, up to the root of the DOM. This is the default behavior of `addEventListener()`.
    *   **Event Capturing**: The event handler is triggered first on the outermost ancestor element (e.g., `window` or `document`), then on its child, and so on, down to the target element. You enable capturing by passing `true` as the third argument to `addEventListener()`.
3.  **Follow-up Questions**:
    *   Which phase is the default behavior for `addEventListener()`?
    *   How can you stop event propagation at a certain point?
    *   When might you specifically want to use event capturing instead of bubbling?
4.  **Follow-up Answers**:
    *   The default behavior for `addEventListener()` is **Event Bubbling**. If you omit the third argument or set it to `false`, the listener will be triggered during the bubbling phase.
    *   You can stop event propagation using `event.stopPropagation()` within an event handler. This prevents the event from bubbling up (or capturing down) to parent (or child) elements after the current handler has executed.
    *   Event capturing is less commonly used than bubbling. It can be useful when you want to intercept events at a higher level in the DOM tree before they reach the target element, for example, to implement a global event listener that needs to process events before specific element listeners, or to prevent certain actions on child elements.
5.  **Code Example(s)**:

    ```html
    <!-- HTML Structure -->
    <div id="grandparent" style="padding: 20px; background: lightblue;">
        Grandparent
        <div id="parent" style="padding: 20px; background: lightcoral;">
            Parent
            <button id="child">Child Button</button>
        </div>
    </div>

    <script>
        const grandparent = document.getElementById('grandparent');
        const parent = document.getElementById('parent');
        const child = document.getElementById('child');

        // Bubbling (default)
        grandparent.addEventListener('click', () => console.log('Grandparent (Bubbling)'));
        parent.addEventListener('click', () => console.log('Parent (Bubbling)'));
        child.addEventListener('click', () => console.log('Child (Bubbling)'));

        // Capturing (third argument is true)
        grandparent.addEventListener('click', () => console.log('Grandparent (Capturing)'), true);
        parent.addEventListener('click', () => console.log('Parent (Capturing)'), true);
        child.addEventListener('click', () => console.log('Child (Capturing)'), true);

        // If you click "Child Button":
        // Output Order:
        // Grandparent (Capturing)
        // Parent (Capturing)
        // Child (Bubbling) / Child (Capturing) - depending on order of addEventListener for child
        // Parent (Bubbling)
        // Grandparent (Bubbling)
    </script>
    ```

---

### **Question 5: Basic**

1.  **Main Question**: What is "Event Delegation" in JavaScript, and what are its primary benefits?
2.  **Answer**: Event delegation is a technique where you attach a single event listener to a parent element, rather than attaching separate listeners to each of its child elements. When an event occurs on a child element, it bubbles up to the parent, and the single listener on the parent then handles the event. The listener uses event object properties (like `event.target`) to identify which specific child element triggered the event.
    Primary benefits:
    *   **Performance**: Reduces the number of event listeners attached to the DOM, especially beneficial for large lists or tables. Fewer listeners mean less memory consumption and faster page rendering.
    *   **Dynamic Elements**: Automatically handles events for elements that are added to the DOM dynamically *after* the initial page load, without needing to attach new listeners to them.
    *   **Simpler Code**: Can lead to cleaner and more maintainable code by centralizing event handling logic.
3.  **Follow-up Questions**:
    *   What property of the `Event` object is crucial for implementing event delegation?
    *   When might event delegation not be the best approach?
    *   Can event delegation be used with any type of event?
4.  **Follow-up Answers**:
    *   The `event.target` property is crucial. It refers to the actual DOM element that originally dispatched the event (the element that was clicked, typed in, etc.), allowing the delegated listener on the parent to identify the source of the event.
    *   Event delegation might not be the best approach if the event does not bubble (e.g., `focus`, `blur` by default), or if the event handler logic becomes overly complex due to many different types of child elements requiring distinct handling. Also, if there are very few child elements, the overhead of delegation might not be justified.
    *   No, not all events bubble. Events like `focus`, `blur`, `load`, `unload`, `scroll`, and `resize` do not bubble. Therefore, event delegation cannot be used for these types of events unless they are explicitly set to bubble (which is rare for these events).
5.  **Code Example(s)**:

    ```html
    <!-- HTML Structure -->
    <ul id="myList">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li class="special">Item 4 (Special)</li>
    </ul>
    <button id="addItem">Add New Item</button>

    <script>
        const myList = document.getElementById('myList');
        const addItemButton = document.getElementById('addItem');

        // Use event delegation on the parent <ul>
        myList.addEventListener('click', function(event) {
            // Check if the clicked element is an <li>
            if (event.target.tagName === 'LI') {
                console.log('Clicked on list item:', event.target.textContent);

                // Specific action for special items
                if (event.target.classList.contains('special')) {
                    event.target.style.backgroundColor = 'yellow';
                } else {
                    event.target.style.backgroundColor = 'lightgreen';
                }
            }
        });

        // Add new items dynamically
        addItemButton.addEventListener('click', () => {
            const newItem = document.createElement('li');
            newItem.textContent = `New Item ${myList.children.length + 1}`;
            myList.appendChild(newItem);
            console.log('Added new item. Event delegation still works!');
        });
    </script>
    ```

---

### **Question 6: Basic**

1.  **Main Question**: How do you read from and write to files in Node.js using the built-in `fs` (File System) module? Provide examples for both synchronous and asynchronous operations.
2.  **Answer**: The `fs` module provides an API for interacting with the file system. It offers both synchronous and asynchronous methods for most operations. Asynchronous methods are generally preferred in Node.js to avoid blocking the Event Loop.
    *   **Reading Files**:
        *   `fs.readFile(path, [options], callback)`: Asynchronously reads the entire contents of a file.
        *   `fs.readFileSync(path, [options])`: Synchronously reads the entire contents of a file.
    *   **Writing Files**:
        *   `fs.writeFile(file, data, [options], callback)`: Asynchronously writes data to a file, replacing the file if it already exists.
        *   `fs.writeFileSync(file, data, [options])`: Synchronously writes data to a file.
3.  **Follow-up Questions**:
    *   Why are asynchronous `fs` methods generally preferred over synchronous ones in Node.js?
    *   What happens if an error occurs during a file operation using an asynchronous method?
    *   How would you append data to an existing file instead of overwriting it?
4.  **Follow-up Answers**:
    *   Asynchronous `fs` methods are preferred because Node.js is single-threaded. Synchronous I/O operations block the main thread, preventing it from handling other requests or tasks until the file operation completes. Asynchronous methods offload the I/O operation to the underlying system, allowing the Node.js process to continue handling other work, leading to better performance and scalability, especially for server-side applications.
    *   If an error occurs during an asynchronous file operation, the error object will be passed as the first argument to the callback function. It's crucial to check for this `err` object in your callback and handle it appropriately (e.g., logging the error, sending an error response).
    *   To append data to an existing file, you would use `fs.appendFile()` (asynchronous) or `fs.appendFileSync()` (synchronous). These methods add the data to the end of the file without overwriting its existing content.
5.  **Code Example(s)**:

    ```javascript
    const fs = require('fs');
    const path = require('path');

    const filePath = path.join(__dirname, 'sample.txt');
    const newContent = 'Hello from Node.js!\n';

    // --- Asynchronous File Operations ---

    // Write to file (async)
    fs.writeFile(filePath, newContent, (err) => {
        if (err) {
            console.error('Async Write Error:', err);
            return;
        }
        console.log('File written asynchronously.');

        // Read from file (async)
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Async Read Error:', err);
                return;
            }
            console.log('Async Read Content:', data);
        });
    });

    // --- Synchronous File Operations ---

    try {
        const syncContent = 'This is synchronous content.\n';
        fs.writeFileSync(filePath, syncContent);
        console.log('File written synchronously.');

        const data = fs.readFileSync(filePath, 'utf8');
        console.log('Sync Read Content:', data);
    } catch (err) {
        console.error('Synchronous Operation Error:', err);
    }
    ```

---

### **Question 7: Basic**

1.  **Main Question**: In Node.js CommonJS modules, what is the fundamental difference between `exports` and `module.exports`? What is the common pitfall associated with this difference?
2.  **Answer**: In Node.js's CommonJS module system:
    *   **`module.exports`**: This is the actual object that is returned when a module is `require()`d. By default, it's an empty object `{}`. You can assign any value to `module.exports` (an object, function, string, etc.) and that will be the export of your module.
    *   **`exports`**: This is a convenience variable that is initially a *reference* to `module.exports`. It's essentially a shortcut, meaning `exports = module.exports`. You can add properties to `exports` (e.g., `exports.myFunc = ...;`), and these properties will be added to the `module.exports` object.
    **Common Pitfall**: The pitfall arises when developers mistakenly reassign `exports` instead of `module.exports` when they intend to export a single value (like a function or a class).
    If you do `exports = someValue;`, you are breaking the reference between `exports` and `module.exports`. `module.exports` will still be the original empty object (or whatever it was previously assigned), and `someValue` will not be exported. Only properties added to `exports` directly (e.g., `exports.foo = bar;`) will work as expected, as they modify the object that `module.exports` is still referencing.
3.  **Follow-up Questions**:
    *   If you have both `exports.foo = 'bar';` and `module.exports = { baz: 'qux' };` in the same module, what will be exported?
    *   When is it safe or common to use `exports.propertyName = value;`?
    *   Can you use `exports` directly to export a default function, like `exports = function() {}`?
4.  **Follow-up Answers**:
    *   If you have both, `module.exports = { baz: 'qux' };` will take precedence. Whatever is assigned to `module.exports` at the end of the module's execution is what gets exported. The `exports.foo = 'bar';` line would have modified the *original* `module.exports` object, but then `module.exports` was reassigned to a *new* object, effectively discarding the changes made via `exports`.
    *   It's safe and common to use `exports.propertyName = value;` when you want to export *multiple named properties or functions* from your module. For example, `exports.add = (a, b) => a + b; exports.subtract = (a, b) => a - b;`.
    *   No, you cannot use `exports = function() {}` to export a default function. This will break the reference to `module.exports`, and the module will still export the original `module.exports` object (which might be an empty object or something else). To export a default function, you must use `module.exports = function() {};`.
5.  **Code Example(s)**:

    ```javascript
    // --- myModule.js ---

    // Correct way to export multiple things
    exports.add = (a, b) => a + b;
    exports.subtract = (a, b) => a - b;

    // Correct way to export a single default thing (