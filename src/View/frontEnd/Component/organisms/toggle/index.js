import React, { useEffect } from 'react';
import './style.scss';
import themeService from "../../../../../services/themeService";

function ThemeToggle() {
  useEffect(() => {
    themeService.init();
  }, []);

  return (
    <div className="theme__toggle-wrap position-relative">
      <div className="theme__toggle" id="toggleTheme" onClick={themeService.toggle}>
        <span className="moon"></span>
        <span className="sun"></span>
      </div>
    </div>
  );
}

export default ThemeToggle;
