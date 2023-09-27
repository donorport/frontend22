import React, { useEffect } from 'react';
import './style.scss';

function ThemeToggle() {
  const toggleTheme = () => {
    const htmlElement = document.querySelector('html');
    if (htmlElement.dataset.theme === 'dark') {
      htmlElement.dataset.theme = 'light';
    } else {
      htmlElement.dataset.theme = 'dark';
    }
  };

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    const themeToggle = document.querySelector('.theme__toggle');

    if (htmlElement.dataset.theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }

    themeToggle.addEventListener('click', toggleTheme);

    return () => {
      themeToggle.removeEventListener('click', toggleTheme);
    };
  }, []);

  return (
    <div className="theme__toggle-wrap position-relative">
      <div className="theme__toggle" id="toggleTheme" onClick={toggleTheme}>
        <span className="moon"></span>
        <span className="sun"></span>
        <small className="sun__ray"></small>
        <small className="sun__ray"></small>
        <small className="sun__ray"></small>
        <small className="sun__ray"></small>
        <small className="sun__ray"></small>
        <small className="sun__ray"></small>
      </div>
    </div>
  );
}

export default ThemeToggle;
