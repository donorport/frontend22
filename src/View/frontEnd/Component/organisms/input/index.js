import React from 'react';

const Input = ({ value = '', onChange, title, name, maxLength, maxInput, placeholder, error }) => {
  return (
    <>
      <div className="input__wrap d-flex flex-column">
        <label className="input__label flex__1">
          <input
            className={error && error[name] ? 'inputerror' : ''}
            name={name}
            value={value}  // Use the 'value' prop directly
            title={title}
            maxLength={maxLength}
            placeholder={placeholder}
            onChange={onChange} // onChange prop takes the event, so can write it like this instead of wrapping in a (e) => onChange(e)
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
};

export default Input;
