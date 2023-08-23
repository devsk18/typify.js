import React, { useState, useEffect } from 'react';

function Typify({ text, delay, stringDelay, loop, cursor }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let typingInterval;
    let erasingInterval;

    async function type() {
      for (const char of text[currentIndex]) {
        setCurrentText(prevText => prevText.slice(0, -1) + char);
        await delay;
      }
    }

    async function erase() {
      for (let i = currentText.length; i >= 0; i--) {
        setCurrentText(prevText => prevText.slice(0, i));
        await delay;
      }
    }

    function toggleCursor() {
      if (cursor) {
        setCursorVisible(prevCursor => !prevCursor);
      }
    }

    async function delay(stringDelay) {
      setTimeout(() => {
        return;
      }, stringDelay);
    }

    async function animateTyping() {
      toggleCursor();

      await type();
      await delay(stringDelay);
      await erase();

      if (currentIndex === text.length - 1) {
        if (!loop) {
          setCurrentText(text[0]);
          toggleCursor();
        }
        setCurrentIndex(0);
      } else {
        setCurrentIndex(prevIndex => prevIndex + 1);
      }

      toggleCursor();
    }

    typingInterval = setInterval(animateTyping, stringDelay * 2);

    return () => {
      clearInterval(typingInterval);
      clearInterval(erasingInterval);
    };
  }, [currentIndex]);

  return (
    <div>
      {currentText}
      {cursor && cursorVisible && '|'}
    </div>
  );
}

Typify.defaultProps = {
  delay: 100,
  stringDelay: 1000,
  loop: true,
  cursor: true,
};

export default Typify;
