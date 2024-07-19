import React, { useState, useLayoutEffect } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo2 from '../../../../../assets/images/logo2.png';
import logowhite from '../../../../../assets/images/logowhite.png';

const Logo = () => {
  const user = useSelector((state) => state.user);
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme'));

  useLayoutEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.getAttribute('data-theme'));
    };

    // Create a MutationObserver to watch for changes in the data-theme attribute
    const observer = new MutationObserver(updateTheme);

    const targetNode = document.documentElement;

    // Configure and start the MutationObserver
    const observerConfig = { attributes: true, attributeFilter: ['data-theme'] };
    observer.observe(targetNode, observerConfig);

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Link
        to="/"
        className="logo-wrap d-flex align-items-center justify-content-start text-decoration-none position-relative"
      >
        <img
          src={theme === 'dark' ? logowhite : logo2}
          alt="Donorport Logo Icon"
          className="logo-icon"
        />
        &nbsp;
        <span className="logo-span">{user.countrySortName}</span>
      </Link>
    </>
  );
};

export default Logo;
