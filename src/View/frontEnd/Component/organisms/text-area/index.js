import React, { useState } from 'react';
function Textarea({
  value = '',
  onChange,
  id,
  title,
  name,
  maxLength,
  maxInput,
  rows,
  placeholder
}) {
  const [textValue, setTextValue] = useState(value);

  return (
    <>
      <div className="form-group mb-4">
        <label htmlFor="headlineInput" className="form__label">
          {name}
        </label>
        <textarea
          className="form-control form-control-lg mb-2"
          id={id}
          value={textValue}
          name={name}
          title={title}
          rows={rows}
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
}
export default Textarea;
