import React, { useState } from 'react';

const Input = ({ value = '', onChange, title, name, maxLength, maxInput, placeholder }) => {
  const [textValue, setTextValue] = useState(value);

  return (
    <>
      <div className="form-group mb-4">
        <label htmlFor="headlineInput" className="form__label">
          {title}
        </label>
        <input
          className="form-control form-control-lg mb-2"
          type="text"
          name={name}
          value={textValue}
          title={title}
          maxLength={maxLength}
          onChange={(e) => {
            setTextValue(e.target.value);
            onChange(e);
          }}
          placeholder={placeholder}
        />
        <div className="d-flex fs-7">
          <p>
            {textValue.length}/{maxInput}
          </p>
          <span className="ms-1">characters</span>
        </div>
      </div>
    </>
  );
};
export default Input;
