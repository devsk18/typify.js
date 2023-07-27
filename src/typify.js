/*

MIT License

Copyright (c) 2023 Sam K Thampan <github@devsk18> <https://devsk18.github.io/samkthampan>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

/**
 * Typify - A utility function to create an auto-typing effect with a cursor for an HTML element.
 * Author - Sam K Thampan <github@devsk18> <https://devsk18.github.io/samkthampan>
 * License - MIT License
 * @param {string} selector - Required: The CSS selector for the HTML element where the typing effect will be applied.
 * @param {object} options - Required: An object with configuration options for the typing effect.
 * @param {string[]} options.text - Required: An array of strings to be typed and erased in sequence.
 * @param {number} [options.delay=100] - Optional: The delay in milliseconds between typing each character.
 * @param {boolean} [options.loop=true] - Optional: Whether to loop through the 'text' array continuously or stop after one iteration.
 * @param {boolean} [options.cursor=true] - Optional: Whether to show the cursor during the typing effect.
 * @param {number} [options.stringDelay=1000] - Optional: Time in milliseconds to pause before typing each string.
 */

function Typify(selector, options) {
  // Select the HTML element where the typing effect will be applied
  const element = document.querySelector(selector);

  // Default options for the typing effect
  const defaultOptions = {
    text: [],             // An array of strings to be typed and erased in sequence
    delay: 100,           // The delay in milliseconds between typing each character
    stringDelay: 1000,    // The delay in milliseconds between typing each string
    loop: true,           // Whether to loop through the 'text' array continuously or stop after one iteration
    cursor: true,         // Whether to show the cursor during the typing effect
  };

  // Merge user-provided options with the default options
  const config = { ...defaultOptions, ...options };

  let cursorVisible = true;
  element.textContent = '|'; // Set initial cursor (visible)

  // Function to type a single string
  async function type(text) {
    toggleCursor();
    for (const char of text) {
      element.textContent = element.textContent.slice(0, -1); // Remove cursor
      element.textContent += char + '|'; // Add new character with cursor
      await delay(config.delay);
    }
    toggleCursor();
  }

  // Function to erase a single string
  async function erase() {
    toggleCursor();
    for (let i = element.textContent.length; i >= 0; i--) {
      element.textContent = element.textContent.slice(0, -1); // Remove cursor
      element.textContent = element.textContent.slice(0, i) + '|'; // Add cursor during erasing
      await delay(config.delay);
    }
    toggleCursor();
  }

  // Utility function to introduce a delay
  async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Function to toggle the cursor visibility
  function toggleCursor() {
    if (config.cursor) {
      cursorVisible = !cursorVisible;
      element.textContent = element.textContent.replace(/\|/g, cursorVisible ? '|' : ' ');
    }
  }

  // Automatically start the typing effect when options are passed and text array is not empty
  if (config.text.length > 0) {
    (async function () {
      while (true) {
        for (const text of config.text) {
          await type(text); // Type the string
          await delay(config.stringDelay); // Pause between strings
          await erase(); // Erase the typed string
        }
        if (!config.loop) {
          await type(config.text[0]);
          toggleCursor();
          return;
        }
      }
    })();
  }
}

// Export the Typify function for Node.js projects
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Typify;
}
