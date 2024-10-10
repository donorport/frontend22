import React, { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import axios from 'axios';
import debounce from 'lodash.debounce';
import './style.scss';

// Utility function to format the number with commas
const formatNumberWithCommas = (value) => {
  if (typeof value !== 'number') return value;
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Utility function to strip commas and return a number
const stripCommas = (value) => {
  return Number(value.toString().replace(/,/g, '')); // Remove commas and return as a number
};

const ThickSlider = styled(Slider)({
  height: 19,
  '& .MuiSlider-thumb': {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:hover, &.Mui-focusVisible, &.Mui-active': {
      boxShadow: 'inherit',
    },
  },
  '& .MuiSlider-rail': {
    height: 19,
    backgroundColor: '#2448e4 !important',
    opacity: 0.12,
  },
  '& .MuiSlider-track': {
    height: 19,
    backgroundColor: '#2448e4 !important',
  },
});

export default function FundraisingSlider({
  userId,
  value: propValue = 500, // Default starting value
  min = 0,
  max = 10000,
  step = 100,
  onChange: propOnChange,
}) {
  const [value, setValue] = useState(propValue); // Initial state value is set to propValue

  // Fetch data on mount
  useEffect(() => {
    axios
      .get(`/api/crowdfunding/${userId}`)
      .then((response) => {
        const amount = response.data.amount;
        if (typeof amount === 'number' && amount >= min && amount <= max) {
          setValue(amount);
          if (propOnChange) {
            propOnChange(amount);
          }
        } else {
          setValue(propValue); // Default to 500 if response is not a valid number
        }
      })
      .catch((error) => {
        console.error('There was an error fetching the fundraising amount!', error);
        setValue(propValue); // Fallback to default if error occurs
      });
  }, [userId, propValue, min, max, propOnChange]);

  // Sync propValue with state if it changes
  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    if (propOnChange) {
      propOnChange(newValue);
    }
  };

  const handleInputChange = (event) => {
    const rawValue = event.target.value.replace(/,/g, ''); // Remove commas for internal logic
    const numericValue = rawValue === '' ? 0 : Number(rawValue);
    setValue(numericValue); // Set the state as a number without commas
    if (propOnChange) {
      propOnChange(numericValue);
    }
  };

  const debouncedUpdateAmount = useCallback(
    debounce((amount) => {
      const numericAmount = stripCommas(amount); // Ensure no commas before making API call
      axios
        .put(`/api/crowdfunding/${userId}`, { amount: numericAmount })
        .catch((error) => {
          console.error('There was an error updating the fundraising amount!', error);
        });
    }, 300),
    [userId]
  );

  const handleBlur = () => {
    if (value < min) {
      setValue(min);
      if (propOnChange) {
        propOnChange(min);
      }
    } else if (value > max) {
      setValue(max);
      if (propOnChange) {
        propOnChange(max);
      }
    }
    // Ensure no commas are sent in the API request
    debouncedUpdateAmount(value);
  };

  return (
    <div className="d-flex flex-column gap-4 py-3">
      <div className="w-100 gap-4 d-flex align-items-center">
        <ThickSlider
          className="flex-grow-1"
          value={typeof value === 'number' ? value : 0}
          onChange={handleSliderChange}
          onBlur={handleBlur}
          aria-labelledby="fundraising-slider"
          min={min}
          max={max}
          step={step}
        />
        <div className="fundraise__price d-flex gap-1 align-items-center">
          <h3>$</h3>
          <input
            style={{ fontSize: '46px !important' }}
            className="form-control fundriase__input"
            value={formatNumberWithCommas(value)} // Display value with commas
            onChange={handleInputChange}
            onBlur={handleBlur}
            step={step}
            min={min}
            max={max}
            type="text"
            aria-labelledby="fundraising-slider"
          />
        </div>
      </div>
    </div>
  );
}
