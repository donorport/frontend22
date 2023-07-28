import React from 'react';

function Textarea({
  value = '',
  onChange,
  id,
  title,
  name,
  maxLength,
  maxInput,
  rows,
  placeholder,
  error
}) {
  return (
    <>
      <div className="input__wrap d-flex flex-column">
        <label className="input__label flex__1">
          <textarea
            className={error && error[name] ? 'inputerror' : ''}
            name={name}
            id={id}
            value={value} // Use the 'value' prop directly
            title={title}
            rows={rows}
            maxLength={maxLength}
            placeholder={placeholder}
            onChange={onChange} // use the parent's change handler, which takes the Event
          />
          <span className="input__span">{title}</span>
        </label>
        {maxLength && (
          <div className="d-flex fs-7 mt-2">
            <span>
              {value.length}/{maxInput}
            </span>
            <span className="ms-1">characters</span>
          </div>
        )}
      </div>
    </>
  );
}

export default Textarea;
