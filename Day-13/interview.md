Welcome to Day 13 of your interview prep! We're building a strong foundation, and today we'll continue exploring some core JavaScript concepts and delve a bit more into Node.js fundamentals. Let's start with some fundamentals.

---

### **Question 1: Type Conversion (Basic)**

1.  **Main Question**: In JavaScript, how do you explicitly convert a string to a number, and vice versa? Provide at least two methods for each direction.

2.  **Answer**:
    *   **String to Number**:
        *   **`Number()` constructor/function**: `Number("123")` returns `123`. It's a strict conversion.
        *   **`parseInt()` / `parseFloat()`**: `parseInt("123px")` returns `123`, `parseFloat("3.14")` returns `3.14`. These parse a string up to the first non-numeric character.
        *   **Unary Plus Operator (`+`)**: `+"123"` returns `123`. This is a quick shorthand.
    *   **Number to String**:
        *   **`String()` constructor/function**: `String(123)` returns `"123"`.
        *   **`.toString()` method**: `(123).toString()` returns `"123"`. This method is available on all primitive wrapper objects.
        *   **String Concatenation with empty string**: `123 + ""` returns `"123"`. This leverages implicit type coercion.

3.  **Follow-up Questions**:
    *   What is the key difference between `Number()` and `parseInt()` when converting a string like `"100px"`?
    *   What happens if you try to convert a string that cannot be parsed as a number (e.g., `"hello"`) using `Number()` or `parseInt()`?
    *   When would `toString()` fail, and what is a safer alternative in that scenario?

4.  **Follow-up Answers**:
    *   `Number("100px")` will return `NaN` because it attempts a strict conversion of the entire string. `parseInt("100px")` will return `100` because it parses the string from the beginning and stops at the first non-numeric character (`p`).
    *   Both `Number("hello")` and `parseInt("hello")` will return `NaN` (Not-a-Number).
    *   `toString()` will fail if the value is `null` or `undefined` because these primitives do not have a `.toString()` method (e.g., `null.toString()` throws a TypeError). `String()` (e.g., `String(null)`) is a safer alternative as it handles `null` and `undefined` gracefully, returning `"null"` and `"undefined"` respectively.

5.  **Code Example(s)**:

    ```javascript
    // String to Number
    console.log(Number("42"));      // 42
    console.log(parseInt("50px"));  // 50
    console.log(+"3.14");           // 3.14

    // Number to String
    console.log(String(100));       // "100"
    console.log((255).toString());  // "255"
    console.log(456 + "");          // "456"
    ```

---

### **Question 2: Debugging with `console` (Basic)**

1.  **Main Question**: Explain the primary purpose of `console.log()` and `console.dir()` in JavaScript debugging. When would you choose to use `console.dir()` over `console.log()`?

2.  **Answer**:
    *   **`console.log()`**: The most commonly used method, it outputs a message to the web console (in browsers) or standard output (in Node.js). It's primarily used for general logging, displaying variable values, and tracing code execution flow. When logging objects, it often provides a formatted, human-readable representation.
    *   **`console.dir()`**: This method is specifically designed to display an interactive listing of the properties of a specified JavaScript object. It provides a more detailed, object-oriented view of the object's properties, including non-enumerable properties and the prototype chain, which `console.log()` might omit or simplify.

    You would choose `console.dir()` over `console.log()` when you need to inspect the full structure and properties of a complex JavaScript object, especially when dealing with DOM elements, custom objects, or instances of built-in types where `console.log()` might give a less detailed or misleading representation.

3.  **Follow-up Questions**:
    *   Can you name a few other useful methods available on the `console` object for debugging purposes?
    *   How does `console.dir()`'s output differ for a DOM element compared to `console.log()`?

4.  **Follow-up Answers**:
    *   Other useful `console` methods include: `console.warn()`, `console.error()`, `console.info()`, `console.table()` (for tabular data), `console.time()`/`console.timeEnd()` (for performance timing), `console.count()` (for counting calls), and `console.trace()` (for showing a stack trace).
    *   For a DOM element, `console.log()` typically shows a tree-like representation of the element's HTML structure, allowing you to inspect its rendered state. `console.dir()`, however, will show the JavaScript object representation of the DOM element, listing all its properties (like `tagName`, `id`, `className`, `childNodes`, `ownerDocument`, etc.) in an expandable tree, which is useful for understanding its programmatic interface.

5.  **Code Example(s)**:

    ```javascript
    const user = {
        name: "Alice",
        age: 30,
        isAdmin: false,
        greet() {
            console.log(`Hello, ${this.name}`);
        }
    };

    console.log("--- Using console.log() ---");
    console.log(user);
    console.log(document.body); // In browser environment

    console.log("\n--- Using console.dir() ---");
    console.dir(user);
    console.dir(document.body); // In browser environment
    ```

---

### **Question 3: `typeof null` Quirk (Basic)**

1.  **Main Question**: The `typeof` operator is commonly used to check the data type of a variable. Explain what `typeof null` returns in JavaScript and why this is considered a "quirk" or a "bug."

2.  **Answer**:
    `typeof null` returns `"object"`. This is considered a long-standing quirk or bug in JavaScript. Historically, `null` was intended to represent the intentional absence of any object value. However, due to a bug in the initial implementation of JavaScript, `typeof null` was erroneously set to `"object"`. While it's technically incorrect, fixing it now would break a significant amount of existing web code, so it remains a part of the language specification for backward compatibility.

3.  **Follow-up Questions**:
    *   If `typeof null` returns `"object"`, how would you reliably check if a variable's value is strictly `null`?
    *   What does `typeof undefined` return, and how does it differ from `typeof null`'s return value?

4.  **Follow-up Answers**:
    *   To reliably check if a variable's value is strictly `null`, you should use the strict equality operator (`===`): `myVar === null`.
    *   `typeof undefined` returns `"undefined"`. This correctly reflects its type, which represents a variable that has been declared but not yet assigned a value, or a non-existent object property. The key difference is that `undefined` has its own distinct type, whereas `null` is a primitive value that erroneously reports its type as "object."

5.  **Code Example(s)**:

    ```javascript
    console.log(typeof null);       // "object" (the quirk)
    console.log(typeof undefined);  // "undefined"

    let myVar = null;
    console.log(myVar === null);    // true (reliable check for null)

    let anotherVar;
    console.log(anotherVar === undefined); // true
    ```

---

### **Question 4: Checking for Arrays (Basic)**

1.  **Main Question**: In JavaScript, what is the most reliable way to determine if a given variable is an array? Why is this method preferred over others like `typeof` or `instanceof`?

2.  **Answer**:
    The most reliable way to determine if a variable is an array is using `Array.isArray()`.

    This method is preferred because:
    *   **`typeof` limitation**: `typeof []` returns `"object"`, which is not specific enough as it also applies to plain objects, `null`, etc.
    *   **`instanceof` limitation**: While `someVar instanceof Array` generally works, it can fail in scenarios involving multiple JavaScript realms or iframes (e.g., if an array is created in one frame and passed to another, it might not be an instance of the `Array` constructor from the current frame's context). `Array.isArray()` correctly identifies arrays regardless of the realm they were created in.

3.  **Follow-up Questions**:
    *   What would `typeof []` return, and why is that not sufficient for array checking?
    *   Can you describe a scenario where `instanceof Array` might yield an incorrect result?

4.  **Follow-up Answers**:
    *   `typeof []` returns `"object"`. This is not sufficient because it's too broad; many other data types (like plain objects `{}` or even `null`) also return `"object"` when checked with `typeof`, making it impossible to specifically identify an array.
    *   `instanceof Array` might yield an incorrect result in environments with multiple global contexts, such as a web page with multiple iframes. If an array is created in one iframe's JavaScript context and then passed to another iframe, `someArrayFromOtherFrame instanceof Array` in the second iframe might return `false` because the `Array` constructor in the second iframe is different from the one that created the array in the first iframe.

5.  **Code Example(s)**:

    ```javascript
    const myArr = [1, 2, 3];
    const myObj = { a: 1 };
    const myNull = null;

    console.log(Array.isArray(myArr));   // true
    console.log(Array.isArray(myObj));   // false
    console.log(Array.isArray(myNull));  // false
    console.log(Array.isArray("hello")); // false

    // Limitations of other methods:
    console.log(typeof myArr);           // "object"
    console.log(myArr instanceof Array); // true (usually works, but has edge cases)
    ```

---

### **Question 5: Method Chaining (Intermediate)**

1.  **Main Question**: Explain the concept of "method chaining" in JavaScript. How is it implemented, and what are its primary benefits? Provide a simple code example.

2.  **Answer**:
    Method chaining (also known as "fluent interface") is a programming technique where multiple method calls are strung together on the same object in a single statement. For method chaining to work, each method in the chain must return the object itself (`this`) on which it was called, allowing the next method to be invoked immediately.

    **Implementation**: A method enables chaining by explicitly returning `this` at the end of its execution.

    **Benefits**:
    *   **Readability**: Makes code more concise and easier to read, as operations on an object can be expressed in a sequential, natural language-like flow.
    *   **Conciseness**: Reduces the need for intermediate variables to store the object at each step.
    *   **Expressiveness**: Allows for a more fluid and expressive API design, common in libraries like jQuery or frameworks like Express.js.

3.  **Follow-up Questions**:
    *   What must a method return for it to be chainable?
    *   Can you think of a scenario where method chaining might make debugging more difficult?

4.  **Follow-up Answers**:
    *   For a method to be chainable, it must return `this` (the current object instance) to allow subsequent methods to be called on the same object.
    *   Method chaining can make debugging more difficult because if an error occurs within a long chain, it might be harder to pinpoint the exact method in the chain that caused the issue without breaking the chain into separate statements or using a debugger to step through each call. Also, inspecting intermediate states of the object is harder without breaking the chain.

5.  **Code Example(s)**:

    ```javascript
    class Calculator {
        constructor(initialValue = 0) {
            this.result = initialValue;
        }

        add(num) {
            this.result += num;
            return this; // Important for chaining
        }

        subtract(num) {
            this.result -= num;
            return this; // Important for chaining
        }

        multiply(num) {
            this.result *= num;
            return this; // Important for chaining
        }

        getValue() {
            return this.result;
        }
    }

    const calc = new Calculator(10);

    const finalResult = calc
        .add(5)       // result is now 15
        .subtract(3)  // result is now 12
        .multiply(2)  // result is now 24
        .getValue();  // returns 24

    console.log(finalResult); // 24
    ```

---

### **Question 6: Getters and Setters (Intermediate)**

1.  **Main Question**: What are getters and setters in JavaScript objects, and why would you use them? Provide an example.

2.  **Answer**:
    Getters and setters are special methods that allow you to define custom logic for how object properties are accessed (`get`) and modified (`set`). They provide a way to control access to an object's properties, enabling encapsulation and allowing for computed properties or side effects when properties are read or written.

    **Why use them?**
    *   **Validation**: Setters can validate data before it's assigned to a property.
    *   **Computed Properties**: Getters can return a value that is computed based on other properties, rather than a stored value.
    *   **Side Effects**: Getters or setters can trigger other actions (e.g., updating UI, logging) when a property is accessed or changed.
    *   **Encapsulation**: They can hide the internal representation of data, exposing only a public interface.
    *   **Backward Compatibility**: They can be used to maintain an existing API while refactoring the internal data structure.

3.  **Follow-up Questions**:
    *   How are getters and setters typically defined in modern JavaScript (ES6+)?
    *   Can you have a getter without a setter, or a setter without a getter? If so, what are the implications?

4.  **Follow-up Answers**:
    *   In modern JavaScript (ES6+), getters and setters are typically defined using the `get` and `set` keywords within object literals or class definitions.
    *   Yes, you can have a getter without a setter, or a setter without a getter.
        *   **Getter only**: This creates a read-only property. Any attempt to assign a value to it will be ignored in non-strict mode or throw a TypeError in strict mode.
        *   **Setter only**: This creates a write-only property. Reading from it will return `undefined`.

5.  **Code Example(s)**:

    ```javascript
    class User {
        constructor(firstName, lastName) {
            this._firstName = firstName; // Convention to use _ for private-like properties
            this._lastName = lastName;
        }

        // Getter for fullName
        get fullName() {
            return `${this._firstName} ${this._lastName}`;
        }

        // Setter for fullName (allows updating name parts)
        set fullName(name) {
            const parts = name.split(' ');
            if (parts.length === 2) {
                this._firstName = parts[0];
                this._lastName = parts[1];
            } else {
                console.warn("Invalid full name format. Please provide 'FirstName LastName'.");
            }
        }

        // Getter with validation/computation for age
        get age() {
            return this._age;
        }

        // Setter with validation for age
        set age(value) {
            if (value > 0 && value < 150) {
                this._age = value;
            } else {
                console.error("Age must be between 1 and 149.");
            }
        }
    }

    const user = new User("John", "Doe");
    user.age = 30; // Triggers setter

    console.log(user.fullName); // "John Doe" (Triggers getter)
    console.log(user.age);      // 30 (Triggers getter)

    user.fullName = "Jane Smith"; // Triggers setter
    console.log(user.fullName);   // "Jane Smith"

    user.age = 200; // Triggers setter, prints error, age remains 30
    console.log(user.age);      // 30
    ```

---

### **Question 7: `module.exports` vs `exports` in Node.js (Intermediate)**

1.  **Main Question**: In Node.js, when using CommonJS modules, what is the fundamental difference between `module.exports` and `exports`? Explain when you should use one over the other.

2.  **Answer**:
    In Node.js's CommonJS module system:
    *   **`module.exports`**: This is the actual object that is returned by the `require()` function when a module is imported. By default, `module.exports` is an empty object (`{}`). You can assign any value (an object, function, string, number, etc.) directly to `module.exports` to make it the sole export of the module.
    *   **`exports`**: This is a *reference* to `module.exports` (specifically, it's `exports = module.exports = {}` initially). You can add properties to the object referenced by `exports` (e.g., `exports.myFunction = ...`) and these properties will be available when the module is `require()`d.

    **Key Difference**:
    The crucial point is that `exports` is *just a variable* that initially points to `module.exports`. If you reassign `exports` (e.g., `exports = someValue`), you break its reference to `module.exports`. In this case, whatever `exports` points to will *not* be exported, and the `require()` call will still return the original `module.exports` object (which might be empty or have other properties added directly to it).

    **When to use which**:
    *   Use **`module.exports`** when you want to export a *single thing* (e.g., a function, a class, an array, a string) as the module's primary export, or when you need to completely replace the default export object.
    *   Use **`exports`** when you want to export *multiple named properties or functions* from your module. You add properties to `exports` (e.g., `exports.foo = ...`, `exports.bar = ...`).

3.  **Follow-up Questions**:
    *   What is the default value of `module.exports` if nothing is explicitly assigned to it or `exports`?
    *   If you have both `module.exports = someObject;` and `exports.someProperty = someValue;` in the same module, what will be exported when the module is `require()`d?

4.  **Follow-up Answers**:
    *   The default value of `module.exports` is an empty object (`{}`). If neither `module.exports` nor `exports` is modified, requiring the module will return an empty object.
    *   If both are present, `module.exports` takes precedence. Whatever is assigned to `module.exports` will be the final export. Any properties added to `exports` will be ignored if `module.exports` is reassigned later in the module.