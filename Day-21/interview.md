Welcome to Day 21 of your interview prep! Let's dive a bit deeper into JavaScript and Node.js today. I've got 10 fresh questions for you.

---

### **Question 1 (Basic)**

1.  **Main Question**: What are the primary differences between `parseInt()` and `parseFloat()` in JavaScript? When would you use one over the other?

2.  **Answer**:
    Both `parseInt()` and `parseFloat()` are global JavaScript functions used to parse a string argument and return a number. The key difference lies in the type of number they return:

    *   **`parseInt(string, radix)`**:
        *   Parses a string and returns an **integer**.
        *   It stops parsing at the first character that is not a digit (or valid character for the specified radix).
        *   It takes an optional `radix` (base) argument, which specifies the base of the number in the string (e.g., 2 for binary, 10 for decimal, 16 for hexadecimal). It's highly recommended to always provide the `radix` to avoid unexpected behavior, especially with strings starting with '0'.

    *   **`parseFloat(string)`**:
        *   Parses a string and returns a **floating-point number** (a number with a decimal component).
        *   It parses the string until it encounters a character that is not a sign (+ or -), a digit, a decimal point, or an exponent.
        *   It does not take a `radix` argument.

    **When to use each**:
    *   Use `parseInt()` when you need to extract a whole number (integer) from a string, or when dealing with numbers in different bases (like hexadecimal colors or binary flags).
    *   Use `parseFloat()` when you need to extract a number that might have a decimal part (e.g., prices, measurements, coordinates).

3.  **Follow-up Questions**:
    *   What will `parseInt("10.5 dollars", 10)` return, and why?
    *   What will `parseFloat("10.5.6")` return?
    *   Is it always necessary to provide the `radix` argument to `parseInt()`? Explain why or why not.

4.  **Follow-up Answers**:
    *   `parseInt("10.5 dollars", 10)` will return `10`. `parseInt` stops parsing at the first non-numeric character (the `.`) when the radix is 10.
    *   `parseFloat("10.5.6")` will return `10.5`. `parseFloat` stops parsing at the second decimal point, as it's not a valid character for a floating-point number.
    *   It is highly recommended to *always* provide the `radix` argument to `parseInt()`. Historically, if the string started with "0x", it would be interpreted as hexadecimal, and if it started with "0" (but not "0x"), it could be interpreted as octal in some older JavaScript engines, leading to unexpected results. While modern JavaScript engines largely default to base 10 for strings not starting with "0x", explicitly providing `10` ensures consistent and predictable behavior across all environments.

5.  **Code Example(s)**:

    ```javascript
    // parseInt examples
    console.log(parseInt("100px", 10));     // Output: 100
    console.log(parseInt("  20.5", 10));    // Output: 20
    console.log(parseInt("0xFF", 16));      // Output: 255 (hexadecimal)
    console.log(parseInt("A1", 16));        // Output: 161 (hexadecimal)
    console.log(parseInt("101", 2));        // Output: 5 (binary)
    console.log(parseInt("hello", 10));     // Output: NaN (starts with non-numeric)

    // parseFloat examples
    console.log(parseFloat("10.5px"));      // Output: 10.5
    console.log(parseFloat("  20.5xyz"));   // Output: 20.5
    console.log(parseFloat("0.123"));       // Output: 0.123
    console.log(parseFloat("3.14e-2"));     // Output: 0.0314 (scientific notation)
    console.log(parseFloat("hello"));       // Output: NaN
    ```

---

### **Question 2 (Basic)**

1.  **Main Question**: Explain the purpose of the `Array.prototype.find()` method in JavaScript. How does it differ from `Array.prototype.filter()`?

2.  **Answer**:
    Both `Array.prototype.find()` and `Array.prototype.filter()` are higher-order array methods that iterate over array elements based on a provided testing function.

    *   **`Array.prototype.find()`**:
        *   **Purpose**: Returns the **value of the first element** in the provided array that satisfies the provided testing function.
        *   **Return Value**: It returns the element itself. If no elements satisfy the testing function, it returns `undefined`.
        *   **Behavior**: It stops iterating as soon as the first matching element is found.

    *   **`Array.prototype.filter()`**:
        *   **Purpose**: Creates a **new array** with all elements that pass the test implemented by the provided function.
        *   **Return Value**: It returns a new array. If no elements satisfy the testing function, it returns an empty array (`[]`).
        *   **Behavior**: It always iterates through the entire array (unless explicitly broken out of with a loop, but `filter` itself doesn't offer this).

    **Key Difference**: `find()` is for getting a single matching element (or `undefined`), while `filter()` is for getting all matching elements as a new array.

3.  **Follow-up Questions**:
    *   What would happen if `find()` found multiple elements that satisfy the condition?
    *   Can `find()` modify the original array?
    *   When might `find()` be more efficient than `filter()`?

4.  **Follow-up Answers**:
    *   If `find()` found multiple elements that satisfy the condition, it would still only return the *first one* it encounters during iteration. Subsequent matching elements are ignored.
    *   No, `find()` (like `filter`, `map`, `forEach`) does not modify the original array. It simply returns a value based on the elements.
    *   `find()` can be more efficient than `filter()` when you only need a single matching element, especially if that element is likely to be at the beginning of a large array. This is because `find()` stops iterating as soon as it finds a match, whereas `filter()` always iterates through the entire array to collect all possible matches.

5.  **Code Example(s)**:

    ```javascript
    const users = [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 30 },
      { id: 4, name: 'David', age: 40 }
    ];

    // Using find(): Get the first user who is 30 years old
    const firstUserAt30 = users.find(user => user.age === 30);
    console.log('First user at 30:', firstUserAt30);
    // Output: { id: 1, name: 'Alice', age: 30 }

    // Using filter(): Get all users who are 30 years old
    const allUsersAt30 = users.filter(user => user.age === 30);
    console.log('All users at 30:', allUsersAt30);
    // Output: [{ id: 1, name: 'Alice', age: 30 }, { id: 3, name: 'Charlie', age: 30 }]

    // Example where find returns undefined
    const userAt50 = users.find(user => user.age === 50);
    console.log('User at 50:', userAt50);
    // Output: undefined

    // Example where filter returns an empty array
    const usersAt50 = users.filter(user => user.age === 50);
    console.log('Users at 50:', usersAt50);
    // Output: []
    ```

---

### **Question 3 (Basic)**

1.  **Main Question**: What is the purpose of the `delete` operator in JavaScript? What are its limitations, especially concerning variable declarations and properties on the prototype chain?

2.  **Answer**:
    The `delete` operator in JavaScript is used to remove a property from an object. When a property is deleted, it becomes `undefined` if you try to access it later, and it will no longer be enumerated in loops like `for...in`.

    **Limitations**:
    1.  **Variables and Functions**: `delete` cannot delete variables declared with `var`, `let`, or `const`, nor can it delete function declarations. It only works on properties of objects. Attempting to delete a non-configurable property (like built-in object properties or properties created without `configurable: true`) will fail silently in non-strict mode or throw a `TypeError` in strict mode.
    2.  **Properties on the Prototype Chain**: `delete` only affects *own properties* of an object. If a property is inherited from the prototype chain, `delete` will not remove it. Instead, it will only remove a property from the object itself if it has an *own property* with that name. If the object doesn't have an own property but inherits one, `delete` will do nothing, and the inherited property will remain accessible.
    3.  **Array Elements**: While `delete` can be used on array elements, it's generally discouraged. It removes the element but leaves a "hole" (an `empty` slot) in the array, changing its length and indices in an unexpected way. It's better to use array methods like `splice()` for removing elements.

3.  **Follow-up Questions**:
    *   What will `delete myVar;` do if `myVar` was declared with `let`?
    *   If an object `child` inherits a property `x` from its `parent` prototype, and `child.x` is deleted, what happens?
    *   How does `delete` an array element differ from setting it to `null` or `undefined`?

4.  **Follow-up Answers**:
    *   `delete myVar;` will have no effect and will return `false` if `myVar` was declared with `let` (or `const`, or `var`). It cannot delete variables declared with these keywords. In strict mode, it would throw a `SyntaxError`.
    *   If an object `child` inherits `x` from `parent`, and `delete child.x` is executed, it will do nothing because `child` does not have an *own property* `x`. The inherited property `x` will still be accessible via `child.x`. If `child` had its *own* property `x` (e.g., `child.x = 5;`), then `delete child.x` would remove `child`'s own `x`, and the inherited `x` would then become accessible.
    *   `delete` an array element removes the element from the array, leaving an empty slot. The array's `length` property does not change. For example, `delete arr[1]` results in `[1, <empty>, 3]`. Setting an element to `null` or `undefined` (e.g., `arr[1] = null;`) replaces the element's value but keeps the slot occupied, and the `length` remains the same. The key difference is that `delete` makes the property truly non-existent on the object (array), while `arr[1] = null` just changes its value.

5.  **Code Example(s)**:

    ```javascript
    const myObject = {
      prop1: 'value1',
      prop2: 'value2'
    };

    console.log('Before delete:', myObject); // { prop1: 'value1', prop2: 'value2' }
    delete myObject.prop1;
    console.log('After deleting prop1:', myObject); // { prop2: 'value2' }
    console.log('Accessing deleted prop1:', myObject.prop1); // undefined

    // Limitations:
    let myLetVar = 10;
    // console.log(delete myLetVar); // SyntaxError in strict mode, false in non-strict

    const protoObj = { inheritedProp: 'I am inherited' };
    const childObj = Object.create(protoObj);
    childObj.ownProp = 'I am my own';

    console.log('\nChild object before delete:', childObj.inheritedProp, childObj.ownProp);
    delete childObj.ownProp; // Deletes own property
    console.log('Child object after deleting ownProp:', childObj.inheritedProp, childObj.ownProp); // inherited, undefined

    delete childObj.inheritedProp; // Does NOT delete inherited property
    console.log('Child object after trying to delete inheritedProp:', childObj.inheritedProp); // still 'I am inherited'

    const myArray = [1, 2, 3];
    console.log('\nArray before delete:', myArray, 'Length:', myArray.length);
    delete myArray[1]; // Leaves a hole
    console.log('Array after deleting element at index 1:', myArray, 'Length:', myArray.length);
    // Output: [ 1, <1 empty item>, 3 ] Length: 3
    ```

---

### **Question 4 (Basic)**

1.  **Main Question**: In JavaScript, what is the role of the `Math` object? Name and describe two commonly used methods from the `Math` object.

2.  **Answer**:
    The `Math` object in JavaScript is a built-in global object that provides mathematical constants and functions. Unlike other global objects like `Date` or `Array`, `Math` is not a constructor; all its properties and methods are static. You cannot create a `Math` object, and you simply use its methods directly (e.g., `Math.random()`, `Math.PI`). Its primary role is to provide a comprehensive set of mathematical utilities for numerical operations beyond basic arithmetic.

    **Two commonly used methods**:

    1.  **`Math.random()`**:
        *   **Description**: Returns a floating-point, pseudo-random number between 0 (inclusive) and 1 (exclusive). This is widely used for generating random numbers in games, simulations, or for selecting random elements.
        *   **Example**: `Math.random()` could return `0.123456789` or `0.987654321`. To get a random integer within a range, you typically combine it with `Math.floor()` and multiplication.

    2.  **`Math.floor(x)`**:
        *   **Description**: Returns the largest integer less than or equal to a given number `x`. Essentially, it rounds a number *down* to the nearest whole number.
        *   **Example**: `Math.floor(5.9)` returns `5`, `Math.floor(5.1)` returns `5`, and `Math.floor(-5.1)` returns `-6`. It's often used when you need to discard the fractional part of a number.

    *(Other common methods include `Math.ceil()` for rounding up, `Math.round()` for standard rounding, `Math.max()` for finding the maximum of numbers, `Math.min()` for finding the minimum, `Math.abs()` for absolute value, `Math.pow()` for exponentiation, `Math.sqrt()` for square root, etc.)*

3.  **Follow-up Questions**:
    *   How would you use `Math.random()` to generate a random integer between 1 and 10 (inclusive)?
    *   What's the difference between `Math.floor()` and `Math.trunc()`?
    *   Can you store values in the `Math` object, like `Math.myCustomValue = 10;`? Why or why not?

4.  **Follow-up Answers**:
    *   To generate a random integer between 1 and 10 (inclusive): `Math.floor(Math.random() * 10) + 1;`
        *   `Math.random() * 10` gives a number between 0 (inclusive) and 10 (exclusive).
        *   `Math.floor()` rounds it down to a whole number from 0 to 9.
        *   Adding `1` shifts the range to 1 to 10.
    *   `Math.floor()` rounds down to the nearest integer (e.g., `Math.floor(-5.1)` is `-6`). `Math.trunc()` simply truncates the decimal part, effectively removing any fractional digits (e.g., `Math.trunc(-5.1)` is `-5`). For positive numbers, they behave identically.
    *   While you technically *can* assign a property to `Math` (e.g., `Math.myCustomValue = 10;`), it's generally not recommended and would be considered bad practice. The `Math` object is intended to be a static utility, and its properties and methods are typically read-only or represent constants. Modifying built-in objects can lead to unexpected side effects and make your code harder to understand and maintain.

5.  **Code Example(s)**: