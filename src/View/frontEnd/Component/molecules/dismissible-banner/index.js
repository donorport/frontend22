import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const DismissibleBanner = ({ message, storageKey }) => {
  const [dismissed, setDismissed] = useState(localStorage.getItem(storageKey) === 'true');

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(storageKey, 'true');
  };

  useEffect(() => {
    if (!dismissed) {
      localStorage.removeItem(storageKey);
    }
  }, [dismissed, storageKey]);

  return (
    <div>
      {!dismissed && (
        <div className="note d-flex gap-2">
          <FontAwesomeIcon className="text-primary fs-5" icon={solid('circle-info')} />
          <p>{message}</p>
          <button onClick={handleDismiss}>
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default DismissibleBanner;
