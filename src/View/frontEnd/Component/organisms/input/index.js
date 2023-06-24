import React, { useState } from 'react';

const Input = ({ value = '', onChange, title, name, maxLength, maxInput, placeholder, error }) => {
  const [textValue, setTextValue] = useState(value);

  return (
    <>
      <div className="input__wrap d-flex flex-column">
        <label className="input__label flex__1">
          <input
            className={error && error[name] ? 'inputerror' : ''}
            name={name}
            value={textValue}
            title={title}
            maxLength={maxLength}
            placeholder={placeholder}
            onChange={(e) => {
              setTextValue(e.target.value);
              onChange(e);
            }}
          />
          <span className="input__span">{title}</span>
        </label>
        
        {maxLength && (
          <div className="d-flex fs-7 mt-2">
            <span>
              {textValue.length}/{maxInput}
            </span>
            <span className="ms-1">characters</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Input;
