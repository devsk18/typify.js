
[![](./assets/img/logo.png)](/)


typify.js \- Auto Typing Effect Utility Library
===============================================

**typify.js** is a lightweight utility function that creates an auto-typing effect with a cursor for an HTML element. It can be used via CDN and npm.

Demo
------------
[![](./assets/img/demo.gif)](/)
Visit this [page](https://devsk18.github.io/typify.js) to see a demo.

Installation
------------

### Using CDN

To use typify.js directly in the browser, include the following script tag in the `<head>` or `<body>` section of your HTML file:

    <script src="https://unpkg.com/typify.js@1.0.0/dist/typify.min.js"></script>

### Using npm

To use typify.js as an ESModule, install it via npm:

    npm install typify.js

### Download

To setup typify.js locally: [download](./dist/typify.min.js)

Usage
-----

To create a typewriter effect for an HTML element, call the **Typify** function with the required CSS selector and configuration options.

Place the below code in your html file

    <h1 id="typify-text"></h1>
    
Place the below code in your javascript file

    const typingText = Typify('#typify-text', {
      text: ['Hello!', 'Welcome to Typify Library!', 'Enjoy the typing effect!'],
      delay: 100,
      loop: true,
      cursor: true,
      stringDelay: 1000 
    });

Options
-------

The **Typify** function accepts the following options as the second argument:

*   **text** (required): An array of strings to be typed and erased in sequence.
*   **delay** (optional): The delay in milliseconds between typing each character (default: 100ms).
*   **loop** (optional): Whether to loop through the 'text' array continuously or stop after one iteration (default: true).
*   **cursor** (optional): Whether to display the cursor (default: true).
*   **stringDelay** (optional): Time in milliseconds to pause before typing each string (default: 1000ms).

Examples
--------

### Using in browser

The following example demonstrates how to use typify.js in browser.

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Typify Example</title>
    </head>
    <body>
      <h1 id="typify-text"></h1>
      <script src="./typify.min.js"></script>
      <script>
        const typingText = Typify('#typify-text', {
          text: ['Hello!', 'Welcome to Typify Library!', 'Enjoy the typing effect!'],
          delay: 100,
          loop: true,
          cursor: true,
          stringDelay: 1000
        });
      </script>
    </body>
    </html>

### Using as a ESModule

The following example demonstrates how to use typify.js as an ESModule.

    const Typify = require('typify.js');
    
    const typingText = Typify('#typify-text', {
      text: ['Hello!', 'Welcome to Typify Library!', 'Enjoy the typing effect!'],
      delay: 100,
      loop: true,
      cursor: true,
      stringDelay: 1000
    });

License
--------
[MIT](./LICENSE)
