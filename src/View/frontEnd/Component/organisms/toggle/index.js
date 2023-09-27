import React, { useEffect } from 'react';
import './style.scss';



function ThemeToggle() {
  useEffect(() => {
    const htmlElement = document.querySelector('html');
    const themeToggle = document.querySelector('.theme__toggle');

    if (htmlElement.dataset.theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else if (htmlElement.dataset.theme === 'light') {
      document.body.classList.remove('dark-theme');
    }

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (htmlElement.dataset.theme === 'light') {
      document.body.classList.remove('dark-theme');
    } else if (mq.matches) {
      document.body.classList.add('dark-theme');
    }

    const handleToggleClick = () => {
      if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
        htmlElement.dataset.theme = 'light';
      } else {
        document.body.classList.add('dark-theme');
        htmlElement.dataset.theme = 'dark';
      }
    };

    themeToggle.addEventListener('click', handleToggleClick);

    return () => {
      themeToggle.removeEventListener('click', handleToggleClick);
    };
  }, []);

  return (
    <div className="theme__toggle-wrap position-relative">
      <div className="theme__toggle" id="toggleTheme">
        <span className="moon"></span>
        <span className="sun"></span>
        {/* <small className="sun__ray"></small>
        <small className="sun__ray"></small>
        <small className="sun__ray"></small>
        <small className="sun__ray"></small>
        <small className="sun__ray"></small>
        <small className="sun__ray"></small> */}
      </div>
    </div>
  );
}

export default ThemeToggle;
