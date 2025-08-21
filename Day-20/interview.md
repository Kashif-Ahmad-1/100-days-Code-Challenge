Welcome to Day 20 of your interview prep! We've covered a lot of ground so far. Today, let's explore some more fundamental and slightly more advanced concepts in JavaScript and Node.js.

---

### **Question 1 (Basic)**

1.  **Main Question**: What is the purpose of the `Node Package Manager (npm)`? How do you typically install a third-party package for a Node.js project using `npm`?

2.  **Answer**:
    `npm` (Node Package Manager) is the default package manager for Node.js. Its primary purpose is to help JavaScript developers share and reuse code. It allows you to:
    *   Discover and install packages (libraries, frameworks, tools) published by other developers.
    *   Manage dependencies for your own projects, ensuring that all necessary libraries are installed and at the correct versions.
    *   Run scripts defined in your `package.json` file.
    *   Publish your own packages to the npm registry.

    To install a third-party package for a Node.js project, you use the `npm install` command. If you want to add it as a dependency to your project (so it's listed in `package.json` and can be reinstalled later), you typically use the `--save` or `--save-dev` flags (or their shorthand `-S` or `-D`).

3.  **Follow-up Questions**:
    *   What's the difference between `npm install <package-name>` and `npm install <package-name> --save-dev`?
    *   What command would you use to install all project dependencies listed in a `package.json` file?
    *   Can you name another popular package manager for Node.js besides `npm`?

4.  **Follow-up Answers**:
    *   `npm install <package-name>` installs the package into `node_modules` but does not automatically add it to your `package.json` dependencies (though modern `npm` versions often default to `--save`). `npm install <package-name> --save-dev` (or `-D`) installs the package and adds it to the `devDependencies` section of your `package.json`. `devDependencies` are typically for packages needed during development (e.g., testing frameworks, build tools), while `dependencies` are for packages required at runtime.
    *   To install all project dependencies listed in `package.json`, you would simply run `npm install` (or `npm i`) without any package name.
    *   Another popular package manager for Node.js is `Yarn`.

5.  **Code Example(s)**:

    ```bash
    # Install a package and save it as a regular dependency
    npm install express

    # Install a package and save it as a dev dependency
    npm install jest --save-dev

    # Install all dependencies from package.json
    npm install
    ```

---

### **Question 2 (Basic)**

1.  **Main Question**: Explain the concept of `event propagation` (bubbling and capturing) in the browser DOM. Why is it important for handling user interactions efficiently?

2.  **Answer**:
    Event propagation describes the order in which events fire on elements nested within each other in the DOM (Document Object Model) tree. When an event occurs on an element (e.g., a click on a button inside a `div`), it doesn't just trigger listeners on that element. Instead, it propagates through the DOM in two phases:

    *   **Capturing Phase (Trickle Down)**: The event starts from the `window` object, then travels down through the ancestor elements to the target element. Listeners set to capture the event will fire during this phase.
    *   **Bubbling Phase (Bubble Up)**: After reaching the target element, the event then bubbles up from the target element back to the `window` object, triggering listeners on its ancestors along the way. Most event listeners are set to fire during the bubbling phase by default.

    It's important because it allows for **event delegation**. Instead of attaching many event listeners to individual child elements, you can attach a single listener to a parent element. This listener can then identify which child element triggered the event (using `event.target`) and react accordingly. This is more efficient for performance and memory, especially with dynamic lists of elements.

3.  **Follow-up Questions**:
    *   How can you stop event propagation at a certain point?
    *   Which phase (bubbling or capturing) is the default for `addEventListener`?
    *   What is `event.target` and `event.currentTarget` in the context of event propagation?

4.  **Follow-up Answers**:
    *   You can stop event propagation using `event.stopPropagation()`. This prevents the event from continuing its journey up (or down) the DOM tree.
    *   The bubbling phase is the default for `addEventListener`. To listen during the capturing phase, you pass `true` as the third argument to `addEventListener` (e.g., `element.addEventListener('click', handler, true)`).
    *   `event.target` refers to the actual element that triggered the event (the "innermost" element). `event.currentTarget` refers to the element on which the event listener was attached.

5.  **Code Example(s)**:

    ```html
    <div id="parent">
      <button id="child">Click Me</button>
    </div>

    <script>
      const parent = document.getElementById('parent');
      const child = document.getElementById('child');

      parent.addEventListener('click', () => {
        console.log('Parent Clicked (Bubbling)');
      });

      child.addEventListener('click', (event) => {
        console.log('Child Clicked');
        // event.stopPropagation(); // Uncomment to stop bubbling
      });

      // Example of capturing phase listener
      parent.addEventListener('click', () => {
        console.log('Parent Clicked (Capturing)');
      }, true); // The 'true' argument makes it a capturing listener
    </script>
    ```
    *Output without `stopPropagation()`*: Parent Clicked (Capturing), Child Clicked, Parent Clicked (Bubbling)
    *Output with `stopPropagation()` uncommented*: Parent Clicked (Capturing), Child Clicked

---

### **Question 3 (Basic)**

1.  **Main Question**: Describe the difference between `localStorage` and `sessionStorage` in web browsers. When would you typically use each?

2.  **Answer**:
    Both `localStorage` and `sessionStorage` are mechanisms for web browsers to store key-value pairs locally within the user's browser, providing a way for web applications to persist data across sessions or browser tabs. They are part of the Web Storage API.

    The key differences lie in their **persistence** and **scope**:

    *   **`localStorage`**:
        *   **Persistence**: Data stored in `localStorage` persists even after the browser window is closed, the user navigates away, or the computer is restarted. It has no expiration date.
        *   **Scope**: Data is available across all tabs and windows from the same origin (same protocol, host, and port).
        *   **Use Case**: Ideal for storing data that needs to be available for a long time, such as user preferences (e.g., dark mode setting), user's login status (though sensitive data like tokens should be handled carefully), or cached application data that doesn't need to be refreshed frequently.

    *   **`sessionStorage`**:
        *   **Persistence**: Data stored in `sessionStorage` is only available for the duration of the browser session (i.e., until the browser tab or window is closed). If the user closes the tab and reopens it, the data is lost.
        *   **Scope**: Data is restricted to the specific tab or window in which it was created. If you open the same application in a new tab, it will have its own separate `sessionStorage`.
        *   **Use Case**: Suitable for storing temporary session-specific data, such as shopping cart contents during a single checkout flow, form input data that needs to persist across page reloads within the same session, or user navigation history for a specific session.

3.  **Follow-up Questions**:
    *   What are the limitations of `localStorage` and `sessionStorage` regarding data size and data type?
    *   How do you add, retrieve, and remove data from `localStorage`?
    *   Are these storage mechanisms secure for sensitive user data like passwords or credit card numbers? Why or why not?

4.  **Follow-up Answers**:
    *   Both `localStorage` and `sessionStorage` typically have a storage limit of around 5-10 MB (depending on the browser). They can only store strings. If you want to store objects or arrays, you must first convert them to JSON strings using `JSON.stringify()` before storing, and `JSON.parse()` when retrieving.
    *   To add data: `localStorage.setItem('key', 'value');`
        To retrieve data: `localStorage.getItem('key');`
        To remove data: `localStorage.removeItem('key');`
        To clear all data: `localStorage.clear();`
    *   No, they are generally not secure for sensitive user data like passwords or credit card numbers. Data stored in `localStorage` and `sessionStorage` is accessible via JavaScript, making it vulnerable to Cross-Site Scripting (XSS) attacks. If an attacker can inject malicious JavaScript, they can easily read or modify this data. For sensitive data, more secure methods like HTTP-only cookies or server-side storage are preferred.

5.  **Code Example(s)**:

    ```javascript
    // Using localStorage
    localStorage.setItem('username', 'Alice');
    console.log('Local Storage Username:', localStorage.getItem('username'));
    // Data persists even after browser close

    // Using sessionStorage
    sessionStorage.setItem('cartId', '12345');
    console.log('Session Storage Cart ID:', sessionStorage.getItem('cartId'));
    // Data will be lost when the tab is closed
    ```

---

### **Question 4 (Basic)**

1.  **Main Question**: What is the purpose of `Object.assign()` in JavaScript? How does it differ from the spread operator (`...`) when merging objects?

2.  **Answer**:
    `Object.assign()` is a static method used to copy the values of all enumerable own properties from one or more source objects to a target object. It returns the target object. Its primary purpose is to merge objects or to create shallow copies of objects.

    **Differences from the spread operator (`...`) for object merging:**

    *   **Syntax**: `Object.assign()` is a method call, while the spread operator is a syntax feature.
    *   **Return Value**: `Object.assign()` modifies and returns the *target object* itself. The spread operator creates a *new object* without modifying any of the original objects.
    *   **Immutability**: The spread operator inherently promotes immutability by creating a new object. `Object.assign()` can be used for immutability if you pass an empty object `{}` as the first argument, but it can also mutate an existing object if that object is passed as the target.
    *   **Browser/Node.js Support**: `Object.assign()` has wider browser support than the spread operator (which is an ES2015/ES6 feature). However, modern environments largely support both.

    Both perform a **shallow copy**. This means if the source object contains nested objects or arrays, only references to those nested structures are copied, not deep copies. Modifying a nested structure in the copied object will also affect the original.

3.  **Follow-up Questions**:
    *   Can `Object.assign()` be used to create a deep copy of an object? Why or why not?
    *   What happens if multiple source objects have the same property key when using `Object.assign()`?
    *   When would you prefer using the spread operator over `Object.assign()` for merging?

4.  **Follow-up Answers**:
    *   No, `Object.assign()` cannot be used to create a deep copy. It only performs a shallow copy. If a property's value is an object or an array, `Object.assign()` copies the *reference* to that object/array, not a new copy of it.
    *   If multiple source objects have the same property key, the properties from later source objects in the argument list will overwrite the properties from earlier source objects.
    *   You would prefer the spread operator when you want to create a new object without mutating any of the original objects (immutability), or when you prefer a more concise and readable syntax for simple merging operations. It's generally considered more idiomatic for modern JavaScript for non-mutating merges.

5.  **Code Example(s)**:

    ```javascript
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };

    // Using Object.assign() to merge into a new object (immutable way)
    const mergedAssign = Object.assign({}, obj1, obj2);
    console.log('Object.assign() merge:', mergedAssign); // { a: 1, b: 3, c: 4 }
    console.log('Original obj1 after assign:', obj1); // { a: 1, b: 2 } (not mutated)

    // Using Object.assign() to mutate an existing object
    const targetObj = { x: 10 };
    Object.assign(targetObj, obj1);
    console.log('Object.assign() mutate:', targetObj); // { x: 10, a: 1, b: 2 }

    // Using spread operator
    const mergedSpread = { ...obj1, ...obj2 };
    console.log('Spread operator merge:', mergedSpread); // { a: 1, b: 3, c: 4 }
    console.log('Original obj1 after spread:', obj1); // { a: 1, b: 2 } (not mutated)

    // Shallow copy example for both
    const original = { a: 1, nested: { b: 2 } };
    const copiedAssign = Object.assign({}, original);
    const copiedSpread = { ...original };

    copiedAssign.nested.b = 3;
    console.log('Original after assign nested change:', original.nested.b); // 3 (shallow copy)

    original.nested.b = 2; // Reset for next test
    copiedSpread.nested.b = 4;
    console.log('Original after spread nested change:', original.nested.b); // 4 (shallow copy)
    ```

---

### **Question 5 (Intermediate)**

1.  **Main Question**: Explain the concept of `module caching` in Node.js. Why is it important, and how does it affect `require()` calls?

2.  **Answer**:
    In Node.js, once a module is loaded (i.e., its code is executed) using `require()`, it is cached. This means that subsequent `require()` calls for the *same module* will not re-execute the module's code; instead, they will return the *cached export object* of that module.

    **Why it's important:**
    *   **Performance**: Prevents redundant file I/O and code execution, making applications faster.
    *   **Consistency**: Ensures that all parts of your application that `require` the same module are working with the exact same instance of that module. This is crucial for modules that manage state (e.g., a database connection pool, a singleton configuration object). Without caching, each `require` would create a new instance, leading to unpredictable behavior and resource waste.

    **How it affects `require()` calls**:
    *   The first time `require('./myModule.js')` is called, Node.js finds the file, executes its code, and stores the `module.exports` object in its cache.
    *   Any subsequent `require('./myModule.js')` call will simply return the cached `module.exports` object immediately, without re-reading the file or re-executing the code.

3.  **Follow-up Questions**:
    *   Where is the module cache stored in Node.js, and how can you inspect it?
    *   Is there a way to clear a module from the cache, and why might you want to do that?
    *   Does module caching apply to built-in Node.js modules (like `fs` or `http`) as well?

4.  **Follow-up Answers**:
    *   The module cache is stored in `require.cache`. It's an object where keys are the resolved file paths of the modules and values are the `module` objects. You can inspect it by logging `require.cache`.
    *   Yes, you can delete a module from the cache by deleting its entry from `require.cache`. For example, `delete require.cache[require.resolve('./myModule.js')]`. This is typically done in development environments (e.g., for hot-reloading) or in testing frameworks to ensure a fresh module instance for each test. It's generally not recommended in production as it can lead to unexpected behavior if not handled carefully.
    *   Yes, module caching applies to built-in Node.js modules as well. Once `require('fs')` is called, the `fs` module is cached, and subsequent calls will return the same instance.

5.  **Code Example(s)**:

    `my-module.js`:
    ```javascript
    console.log('My module is being loaded!');
    let counter = 0;
    module.exports = {
      increment: () => ++counter,
      getCounter: () => counter
    };
    ```

    `app.js`:
    ```javascript
    const myModule1 = require('./my-module');
    const myModule2 = require('./my-module');

    console.log('Module 1 counter:', myModule1.getCounter()); // 0
    myModule1.increment();
    console.log('Module 1 counter after increment:', myModule1.getCounter()); // 1
    console.log('Module 2 counter:', myModule2.getCounter()); // 1 (because it's the same cached instance)

    // Verify they are the exact same object reference
    console.log('Are myModule1 and myModule2 the same object?', myModule1 === myModule2); // true

    // Example of clearing cache (usually for specific dev/test scenarios)
    const modulePath = require.resolve('./my-module');
    delete require.cache[modulePath];
    console.log('\n--- Cache cleared for my-module ---');

    const myModule3 = require('./my-module'); // This will re-execute my-module.js
    console.log('My module is being loaded!'); // This will print again
    console.log('Module 3 counter:', myModule3.getCounter()); // 0 (new instance, new counter)
    ```

---

### **Question 6 (Intermediate)**

1.  **Main Question**: In Node.js, what are environment variables, and why are they commonly used for configuration? How can you access them in a Node.js application?

2.  **Answer**:
    Environment variables are dynamic named values that can affect the way running processes behave on a computer. They are part of the operating system's environment and are external to the application's source code.

    **Why they are used for configuration**:
    *   **Security**: Sensitive information (like API keys, database credentials, secret keys) should never be hardcoded directly into the source code. Environment variables allow you to keep these secrets out of your version control system (e.g., Git) and provide them at runtime.
    *   **Flexibility**: They enable easy configuration changes without modifying and redeploying the application code. You can have different configurations for different environments (development, testing, production) simply by setting different environment variables.
    *   **Portability**: They provide a standardized way to pass configuration to applications, regardless of the deployment platform (e.g., local machine, Docker container, cloud server).

    In a Node.js application, you can access environment variables through the global `process.env` object. This object is a simple JavaScript object where keys are the environment variable names and values are their corresponding string values.

3.  **Follow-up Questions**:
    *   What is a common practice to manage environment variables in a development environment without polluting the system's global environment?
    *   What happens if you try to access an environment variable that hasn't been set?
    *   Why should environment variables always be treated as strings, even if they represent numbers or booleans?

4.  **Follow-up Answers**:
    *   A common practice is to use a `.env` file (e.g., with the `dotenv` npm package). This file stores key-value pairs locally, and the `dotenv` package loads these variables into `process.env` when your application starts, without affecting the global system environment. The `.env` file itself is typically excluded from version control using `.gitignore`.
    *   If you try to access an environment variable that hasn't been set, `process.env.<VARIABLE_NAME>` will return `undefined`. Your application code should include checks or provide default values for such cases.
    *   Environment variables are always strings because they are passed as plain text by the operating system. Even if you set `PORT=3000`, `process.env.PORT` will be the string `"3000"`, not the number `3000`. You need to explicitly parse them to the desired type (e.g., `parseInt(process.env.PORT, 10)` or `process.env.DEBUG === 'true'`).

5.  **Code Example(s)**:

    ```javascript
    // app.js
    // Accessing environment variables
    const port = process.env.PORT || 3000;
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbUser = process.env.DB_USER; // This might be undefined if not set

    console.log(`Application running on port: ${port}`);
    console.log(`Database Host: ${dbHost}`);
    console.log(`Database User: ${dbUser}`);

    if (process.env.NODE_ENV === 'production') {
      console.log('Running in production mode.');
    } else {
      console.log('Running in development or other mode.');
    }
    ```

    To run this, you'd set environment variables in your terminal:
    ```bash
    # On Linux/macOS
    PORT=8080 DB_HOST=myprod.db.com NODE_ENV=production node app.js

    # On Windows (Command Prompt)
    set PORT=8080&& set DB_HOST=myprod.db.com&& set NODE_ENV=production&& node app.js

    # On Windows (PowerShell)
    $env:PORT=8080; $env:DB_HOST='myprod.db.com'; $env:NODE_ENV='production'; node app.js
    ```

---

### **Question 7 (Intermediate)**

1.  **Main Question**: Describe the difference between `HTTP GET` and `HTTP POST` requests. When would you typically use one over the other?

2.  **Answer**:
    `GET` and `POST` are two of the most common HTTP methods used to interact with web resources.

    *   **HTTP GET**:
        *   **Purpose**: Used to *request* data from a specified resource. It should only retrieve data and have no other effect on the data (i.e., it should be idempotent and safe).
        *   **Data Transmission**: Parameters are sent in the URL as query strings (e.g., `/api/users?id=123`).
        *   **Visibility**: Parameters are visible in the URL, browser history, and server logs.
        *   **Caching**: Can be cached by browsers and proxies.
        *   **Bookmarkable**: Can be bookmarked.
        *   **Length Limits**: Has practical URL length limits (though not a strict HTTP limit).
        *   **Use Cases**: Retrieving a webpage, fetching a list of items, querying specific data based on IDs or filters.

    *   **HTTP POST**:
        *   **Purpose**: Used to *submit* data to be processed to a specified resource. It typically creates a new resource or updates an existing one on the server.
        *   **Data Transmission**: Parameters are sent in the request body.
        *   **Visibility**: Parameters are not visible in the URL.
        *   **Caching**: Cannot be cached.
        *   **Bookmarkable**: Cannot be bookmarked directly.
        *   **Length Limits**: No practical data length limits (limited by server/client resources).
        *   **Use Cases**: Submitting a form (e.g., user registration, login), uploading a file, sending complex JSON data to create a new record.

    **When to use each**:
    *   Use `GET` when you want to **read or retrieve data** and the request has no side effects on the server's state.
    *   Use `POST` when you want to **send data to the server to create or update a resource**, or when the request has side effects. Also, use `POST` for sensitive data (like passwords) or large amounts of data.

3.  **Follow-up Questions**:
    *   What are "safe" and "idempotent" methods in HTTP? Which of `GET` and `POST` fall into these categories?
    *   Why is it generally bad practice to send sensitive data (like passwords) using a `GET` request?
    *   Can a `POST` request return data, similar to a `GET` request?

4.  **Follow-up Answers**:
    *   **Safe methods**: Do not alter the state of the server. `GET` is a safe method. `POST` is not.
    *   **Idempotent methods**: Produce the same result on the server if executed multiple times. `GET` is idempotent. `POST` is generally *not* idempotent (e.g., submitting a form multiple times might create multiple new resources).
    *   It's bad practice to send sensitive data via `GET` because the data is exposed in the URL, browser history, and server logs. This makes it vulnerable to shoulder surfing, being intercepted, or being stored in plain text in various places.
    *   Yes, a `POST` request can and often does return data. For example, after successfully creating a new user (via `POST`), the server might respond with the newly created user object, including its ID, or a success message.

5.  **Code Example(s)**:

    ```javascript
    // Example Node.js Express server demonstrating GET and POST
    const express = require('express');
    const app = express();
    const port = 3000;

    app.use(express.json()); // Middleware to parse JSON request bodies

    let products = [{ id: 1, name: 'Laptop', price: 1200 }];

    // GET request: Retrieve all products
    app.get('/products', (req, res) => {
      console.log('GET /products requested.');
      res.json(products);
    });

    // POST request: Add a new product
    app.post('/products', (req, res) => {
      const newProduct = req.body;
      if (newProduct && newProduct.name && newProduct.price) {
        newProduct.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push(newProduct);
        console.log('POST /products: New product added:', newProduct);
        res.status(201).json(newProduct); // 201 Created
      } else {
        res.status(400).send('Invalid product data.'); // 400 Bad Request
      }
    });

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
    ```
    *To test:*
    `GET`: `http://localhost:3000/products`
    `POST`: `http://localhost:30