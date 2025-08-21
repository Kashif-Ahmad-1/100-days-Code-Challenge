Welcome to Day 17 of your interview prep! Let's start with some fundamentals and then progress to more advanced topics in JavaScript and Node.js.

---

### 1. Optional Chaining and Nullish Coalescing

**Main Question**: What are optional chaining (`?.`) and nullish coalescing (`??`) operators in JavaScript? Provide a scenario where each would be particularly useful.

**Answer**:
*   **Optional Chaining (`?.`)**: This operator provides a safer way to access properties deep within a nested object structure without having to explicitly check if each reference in the chain is valid. If a reference is `null` or `undefined`, the expression short-circuits and returns `undefined` instead of throwing a `TypeError`.
*   **Nullish Coalescing (`??`)**: This operator provides a way to define a default value for a variable that is `null` or `undefined`. It differs from the logical OR (`||`) operator in that `??` only treats `null` and `undefined` as "falsy" values, whereas `||` treats other falsy values like `0`, `''` (empty string), and `false` as well.

**Follow-up Questions**:
1.  How does `??` differ from the logical OR (`||`) operator, especially when dealing with falsy values?
2.  Can optional chaining be used with function calls or array access?
3.  What is the main benefit of using these operators over traditional `if` checks?

**Follow-up Answers**:
1.  The `??` operator only returns the right-hand side operand if the left-hand side is `null` or `undefined`. The `||` operator, on the other hand, returns the right-hand side operand if the left-hand side is *any* falsy value (e.g., `0`, `''`, `false`, `null`, `undefined`). For example, `0 ?? 'default'` would be `0`, but `0 || 'default'` would be `'default'`.
2.  Yes, optional chaining can be used with function calls (e.g., `obj.method?.()`) and array access (e.g., `arr?.[0]`). If `method` or `arr` is `null`/`undefined`, it will return `undefined` instead of throwing an error.
3.  The main benefit is cleaner, more concise, and more readable code, especially when dealing with deeply nested objects or providing default values. It reduces boilerplate `if` statements and makes the intent clearer.

**Code Example(s)**:

```javascript
// Optional Chaining Example
const user = {
  name: 'Alice',
  address: {
    street: '123 Main St',
    city: 'Anytown'
  },
  contact: null // Or undefined
};

// Without optional chaining, this would throw an error if contact.email doesn't exist
// const email = user.contact.email; // TypeError: Cannot read properties of null (reading 'email')

// With optional chaining
const email = user.contact?.email; // undefined (no error)
const zipCode = user.address?.zip; // undefined (no error)
console.log(`User email: ${email}`); // User email: undefined
console.log(`User zip code: ${zipCode}`); // User zip code: undefined

// Nullish Coalescing Example
const settings = {
  theme: null,
  fontSize: 0,
  language: undefined,
  showAds: false
};

const userTheme = settings.theme ?? 'dark'; // 'dark' (because settings.theme is null)
const userFontSize = settings.fontSize ?? 16; // 0 (because settings.fontSize is 0, not null/undefined)
const userLanguage = settings.language ?? 'en'; // 'en' (because settings.language is undefined)
const userShowAds = settings.showAds ?? true; // false (because settings.showAds is false, not null/undefined)

console.log(`Theme: ${userTheme}`); // Theme: dark
console.log(`Font Size: ${userFontSize}`); // Font Size: 0
console.log(`Language: ${userLanguage}`); // Language: en
console.log(`Show Ads: ${userShowAds}`); // Show Ads: false
```

---

### 2. Adding Event Listeners

**Main Question**: How do you add event listeners to DOM elements in JavaScript? Provide an example of adding a click event listener to a button.

**Answer**:
In JavaScript, the most common and recommended way to add event listeners to DOM elements is by using the `addEventListener()` method. This method allows you to attach multiple event handlers to a single element, and it provides more control over the event flow (bubbling vs. capturing).

The `addEventListener()` method takes three arguments:
1.  **Event Type (string)**: The type of event to listen for (e.g., `'click'`, `'mouseover'`, `'submit'`).
2.  **Listener (function)**: The function to be executed when the event occurs.
3.  **Use Capture (boolean, optional)**: A boolean value indicating whether the event should be handled in the capturing phase (`true`) or the bubbling phase (`false`, default).

**Follow-up Questions**:
1.  What is the difference between `addEventListener()` and directly assigning an `onclick` property (e.g., `element.onclick = function() {}`)?
2.  How would you remove an event listener that was previously added?
3.  What does the `event` object passed to the listener function contain?

**Follow-up Answers**:
1.  `addEventListener()` allows you to attach multiple event handlers of the same type to a single element, whereas direct `onclick` assignment will overwrite any previously assigned handler. `addEventListener()` also offers more control over event phases (capturing/bubbling).
2.  You can remove an event listener using `removeEventListener()`. It requires the same event type and the *exact same function reference* that was passed to `addEventListener()`. This means you cannot use an anonymous function if you intend to remove it later.
3.  The `event` object (often named `e` or `event`) contains information about the event that occurred, such as the event type (`event.type`), the target element (`event.target`), mouse coordinates (`event.clientX`, `event.clientY`), keyboard keys pressed (`event.key`), and methods like `preventDefault()` and `stopPropagation()`.

**Code Example(s)**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Listener Example</title>
</head>
<body>
    <button id="myButton">Click Me!</button>

    <script>
        // 1. Get a reference to the button element
        const myButton = document.getElementById('myButton');

        // 2. Define the function to be executed when the button is clicked
        function handleClick() {
            alert('Button was clicked!');
            console.log('Button clicked!');
        }

        // 3. Add the event listener
        myButton.addEventListener('click', handleClick);

        // You could add another listener of the same type
        myButton.addEventListener('click', () => {
            console.log('Another click handler fired!');
        });

        // Example of removing a listener (if you needed to)
        // setTimeout(() => {
        //     myButton.removeEventListener('click', handleClick);
        //     console.log('First click handler removed after 5 seconds.');
        // }, 5000);
    </script>
</body>
</html>
```

---

### 3. The `super` Keyword in ES6 Classes

**Main Question**: Explain the purpose of the `super` keyword in ES6 classes. When and why would you use it in a class constructor and in other methods?

**Answer**:
The `super` keyword in ES6 classes is used to call methods on an object's parent (superclass). It serves two primary purposes:

1.  **Calling the Parent Constructor**: In a subclass constructor, `super()` must be called before `this` can be used. This ensures that the parent class's constructor is executed, initializing any properties or setup defined in the parent class. If you don't call `super()` in a subclass constructor, it will result in a `ReferenceError`.
2.  **Calling Parent Methods**: `super.methodName()` allows a subclass to call a method defined in its parent class. This is useful for extending or augmenting the parent's behavior without completely overwriting it.

**Follow-up Questions**:
1.  What happens if you try to use `this` in a subclass constructor before calling `super()`?
2.  Can `super` be used outside of a class context?
3.  When would you use `super.methodName()` as opposed to just defining a new method with the same name in the subclass?

**Follow-up Answers**:
1.  If you try to use `this` in a subclass constructor before calling `super()`, JavaScript will throw a `ReferenceError`. This is because the subclass instance is not fully initialized until the parent constructor has run.
2.  No, `super` is a reserved keyword and can only be used within the context of a class definition, specifically in constructors and instance methods of a subclass.
3.  You would use `super.methodName()` when you want to execute the parent class's version of a method *in addition to* or *as part of* the subclass's method logic. If you just define a new method with the same name, it completely overrides the parent's method, and the parent's logic will not be executed unless explicitly called via `super`.

**Code Example(s)**:

```javascript
// Parent Class
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

// Subclass extending Animal
class Dog extends Animal {
  constructor(name, breed) {
    // 1. Calling the parent constructor (MUST be called before using 'this')
    super(name);
    this.breed = breed;
  }

  speak() {
    // 2. Calling a parent method
    super.speak(); // Executes 'Animal.speak()'
    console.log(`${this.name} barks! (It's a ${this.breed}.)`);
  }

  fetch(item) {
    console.log(`${this.name} is fetching the ${item}.`);
  }
}

const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.speak(); // Output:
               // Buddy makes a sound.
               // Buddy barks! (It's a Golden Retriever.)

// Another example for a different method
class Cat extends Animal {
    constructor(name, favoriteFood) {
        super(name);
        this.favoriteFood = favoriteFood;
    }

    // Overriding the speak method without calling super.speak()
    speak() {
        console.log(`${this.name} meows for ${this.favoriteFood}.`);
    }
}

const myCat = new Cat('Whiskers', 'tuna');
myCat.speak(); // Output: Whiskers meows for tuna. (Parent speak() is not called)
```

---

### 4. Pure Functions

**Main Question**: What is a "pure function" in JavaScript, and what are its main characteristics? Why are pure functions considered beneficial in programming?

**Answer**:
A "pure function" is a function that, given the same input, will always return the same output, and produces no side effects.

Its main characteristics are:
1.  **Deterministic**: For the same input arguments, it will always return the same result. It does not depend on any external state that might change.
2.  **No Side Effects**: It does not cause any observable changes outside its local scope. This means it doesn't modify global variables, mutate its input arguments, perform I/O operations (like logging to console, writing to file, making network requests), or modify the DOM.

Pure functions are beneficial because they are:
*   **Easier to Test**: Since they don't depend on external state and produce no side effects, testing them simply involves providing inputs and checking outputs.
*   **Easier to Debug**: Their predictable behavior makes it simpler to isolate bugs.
*   **More Reliable/Predictable**: You can be confident that calling a pure function won't unexpectedly alter other parts of your program.
*   **Easier to Reason About**: Their self-contained nature makes code easier to understand and maintain.
*   **Potentially Cacheable (Memoizable)**: Because they are deterministic, their results can be cached (memoized) for specific inputs, improving performance.

**Follow-up Questions**:
1.  Can a pure function call another non-pure function internally and still be considered pure?
2.  Provide an example of a function that is NOT pure and explain why.
3.  In a real-world application, is it always practical or even desirable to make every function pure?

**Follow-up Answers**:
1.  No, if a function calls another non-pure function that has side effects or depends on external mutable state, the calling function itself becomes non-pure. The purity of a function depends on the purity of all its internal operations.
2.  Example of a non-pure function:
    ```javascript
    let total = 0; // External state

    function addToTotal(value) {
        total += value; // Side effect: modifies external state
        return total;
    }

    addToTotal(5); // Returns 5, total is 5
    addToTotal(5); // Returns 10, total is 10 (different output for same input)
    ```
    This function is not pure because it modifies an external variable (`total`) and its output depends on that external, mutable state.
3.  No, it's not always practical or desirable. Many essential operations in programming inherently involve side effects (e.g., interacting with a database, making API calls, updating the UI, logging). The goal is often to isolate and manage side effects effectively, grouping them in specific parts of the application, while keeping the core logic as pure as possible.

**Code Example(s)**:

```javascript
// Pure Function Example
function add(a, b) {
  return a + b; // Always returns the sum of a and b, no side effects
}

console.log(add(2, 3)); // Output: 5
console.log(add(2, 3)); // Output: 5 (always the same for same input)

// Another Pure Function Example (array transformation without mutation)
function doubleNumbers(numbers) {
  return numbers.map(num => num * 2); // Returns a new array, original 'numbers' array is not modified
}

const myNumbers = [1, 2, 3];
const doubled = doubleNumbers(myNumbers);
console.log(myNumbers); // Output: [1, 2, 3] (original array unchanged)
console.log(doubled);   // Output: [2, 4, 6]
```

---

### 5. Event Delegation

**Main Question**: Explain the concept of "event delegation" in JavaScript. Why is it beneficial, especially when dealing with a large number of dynamic elements?

**Answer**:
Event delegation is a technique where you attach a single event listener to a common parent element, rather than attaching individual listeners to multiple child elements. When an event (like a click) occurs on a child element, it "bubbles up" the DOM tree to its ancestors. The single listener on the parent then catches this event, and you can determine which specific child element triggered it using the `event.target` property.

**Benefits of Event Delegation**:
1.  **Performance**: Reduces the number of event listeners attached to the DOM, which can significantly improve performance, especially with a large number of elements. Each listener consumes memory and processing power.
2.  **Memory Management**: Less memory is consumed by fewer listeners.
3.  **Handles Dynamic Elements**: It automatically works for elements that are added to the DOM *after* the initial page load. Since the listener is on a static parent, any new children within that parent will automatically be covered without needing to attach new listeners.
4.  **Cleaner Code**: Simplifies event handling logic by centralizing it.

**Follow-up Questions**:
1.  What is the role of `event.target` in event delegation?
2.  Does event delegation work for all types of events?
3.  When might event delegation not be the best approach?

**Follow-up Answers**:
1.  `event.target` refers to the specific element on which the event *originally occurred* (the deepest element in the DOM tree where the event was fired). In event delegation, you use `event.target` to identify which child element was interacted with, even though the listener is on the parent.
2.  Event delegation works best for events that bubble, such as `click`, `mouseover`, `keydown`, `etc.`. Events that do not bubble (like `focus`, `blur` by default, though they can be captured) are generally not suitable for event delegation.
3.  Event delegation might not be the best approach if:
    *   You only have a very small, static number of elements.
    *   The event doesn't bubble (as mentioned above).
    *   You need to prevent default behavior or stop propagation for a very specific child element and that logic becomes overly complex to manage from the parent.
    *   There's a very deep DOM structure, and the event has to bubble up many levels, though this is usually a minor performance concern compared to individual listeners.

**Code Example(s)**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Delegation Example</title>
    <style>
        #container {
            border: 1px solid #ccc;
            padding: 10px;
            margin-top: 20px;
        }
        .item {
            background-color: lightblue;
            margin: 5px;
            padding: 8px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>Event Delegation Demo</h1>
    <div id="container">
        <div class="item" data-id="1">Item 1</div>
        <div class="item" data-id="2">Item 2</div>
        <div class="item" data-id="3">Item 3</div>
    </div>
    <button id="addItemBtn">Add New Item</button>

    <script>
        const container = document.getElementById('container');
        const addItemBtn = document.getElementById('addItemBtn');
        let itemCount = 3;

        // Using event delegation on the parent container
        container.addEventListener('click', function(event) {
            // Check if the clicked element (event.target) matches our desired child
            if (event.target.classList.contains('item')) {
                const itemId = event.target.dataset.id;
                console.log(`Clicked on Item with ID: ${itemId}`);
                event.target.style.backgroundColor = 'lightgreen'; // Visual feedback
            }
        });

        // Adding new items dynamically
        addItemBtn.addEventListener('click', () => {
            itemCount++;
            const newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = itemCount;
            newItem.textContent = `Item ${itemCount}`;
            container.appendChild(newItem);
            console.log(`Added new item: Item ${itemCount}`);
            // No new event listener needed for this dynamically added item!
        });
    </script>
</body>
</html>
```

---

### 6. Node.js Streams

**Main Question**: Describe what Node.js Streams are. What are the different types of streams, and why are they important for I/O operations in Node.js?

**Answer**:
Node.js Streams are abstract interfaces for working with streaming data. They are a fundamental concept in Node.js for handling I/O, especially when dealing with large amounts of data (like files or network requests) that cannot fit into memory all at once. Instead of loading the entire data into memory, streams allow you to process data in chunks, making operations more efficient and non-blocking.

**Types of Streams**:
1.  **Readable Streams**: Streams from which data can be read (e.g., `fs.createReadStream` for reading files, `http.IncomingMessage` for HTTP requests).
2.  **Writable Streams**: Streams to which data can be written (e.g., `fs.createWriteStream` for writing files, `http.ServerResponse` for HTTP responses).
3.  **Duplex Streams**: Streams that are both Readable and Writable (e.g., `net.Socket`, `zlib.Gzip`).
4.  **Transform Streams**: Duplex streams that can modify or transform data as it is written to them and then read from them (e.g., `zlib.createGzip` for compression, `crypto.createCipher` for encryption).

**Importance for I/O Operations**:
*   **Memory Efficiency**: Prevents memory exhaustion when handling large files or data streams by processing data in small chunks.
*   **Time Efficiency**: Data can be processed as it arrives, rather than waiting for the entire resource to load. This makes applications more responsive.
*   **Composability**: Streams can be "piped" together (`source.pipe(destination)`), allowing for powerful and readable data processing pipelines where the output of one stream becomes the input of another.
*   **Non-Blocking**: Stream operations are asynchronous and non-blocking, aligning with Node.js's event-driven architecture, ensuring the main thread remains free.

**Follow-up Questions**:
1.  What is the purpose of the `pipe()` method in streams?
2.  How do streams help manage "backpressure"?
3.  Name a common use case for a Transform stream.

**Follow-up Answers**:
1.  The `pipe()` method is a convenient way to connect a Readable stream to a Writable stream. It automatically handles data flow, reading from the source and writing to the destination, and importantly, it manages backpressure to prevent the Writable stream from being overwhelmed by a fast Readable stream.
2.  Streams help manage backpressure by providing mechanisms (like `drain` events and the return value of `write()`) that allow a writable stream to signal to a readable stream when it's ready for more data, or when it needs to pause sending data because its internal buffer is full. This prevents memory overflow.
3.  A common use case for a Transform stream is data compression or decompression (e.g., using Node.js's `zlib` module for gzip/unzip), or data encryption/decryption (e.g., using Node.js's `crypto` module). You write uncompressed/unencrypted data to one end, and read compressed/encrypted data from the other end.

**Code Example(s)**:

```javascript
// Example of Readable and Writable Streams with pipe()
const fs = require('fs');
const path = require('path');

const sourceFilePath = path.join(__dirname, 'large_file.txt');
const destFilePath = path.join(__dirname, 'copy_of_large_file.txt');

// Create a dummy large file for demonstration
// fs.writeFileSync(sourceFilePath, 'This is a line of text.\n'.repeat(10000));

console.log('Starting file copy using streams...');

const readableStream = fs.createReadStream(sourceFilePath, { encoding: 'utf8', highWaterMark: 64 * 1024 }); // Read