import React, { useEffect } from 'react';
import './style.scss';



function ThemeToggle() {
  useEffect(() => {
    const htmlElement = document.querySelector('html');
    const themeToggle = document.querySelector('.theme__toggle');

    const saveThemeToLocalStorage = (theme) => {
      localStorage.setItem('theme', theme);
    };

    const loadThemeFromLocalStorage = () => {
      return localStorage.getItem('theme');
    };

    const applyTheme = (theme) => {
      htmlElement.dataset.theme = theme;
      if (theme === 'dark') {
        document.body.classList.add('dark-theme');
      } else if (theme === 'light') {
        document.body.classList.remove('dark-theme');
      }
    };

    const toggleTheme = () => {
      if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
        applyTheme('light');
        saveThemeToLocalStorage('light');
      } else {
        document.body.classList.add('dark-theme');
        applyTheme('dark');
        saveThemeToLocalStorage('dark');
      }
    };

    themeToggle.addEventListener('click', toggleTheme);

    const savedTheme = loadThemeFromLocalStorage();
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      if (htmlElement.dataset.theme === 'light') {
        document.body.classList.remove('dark-theme');
      } else if (mq.matches) {
        applyTheme('dark');
        saveThemeToLocalStorage('dark');
      }
    }

    return () => {
      themeToggle.removeEventListener('click', toggleTheme);
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
