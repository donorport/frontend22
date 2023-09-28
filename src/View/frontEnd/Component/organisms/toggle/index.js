import React, { useEffect } from 'react';
import './style.scss';
import themeService from "../../../../../services/themeService";

/* init:
 * default to: localStorage > matchMedia > 'light'
 * - set the default theme, and save to storage
 *
 * toggle:
 * detect localStorage current theme
 * - apply opposite theme
 * */

/* Avoid defining functions inside other functions (useEffect, components, etc) 
 * because whenever a function reruns, it re-creates all the functions inside, 
 * which is extra work that might not be necessary.
 * 
 * It's only necessary to nest the function definition if it directly uses
 * state or component props. Alternately, you could pass these in to allow you
 * to move the definition outside.
 * */

function ThemeToggle() {
  useEffect(() => {
    themeService.init();
  }, []);

  return (
    <div className="theme__toggle-wrap position-relative">
      <div className="theme__toggle" id="toggleTheme" onClick={themeService.toggle}>
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
