import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import axios from 'axios';
import './style.scss';

const ThickSlider = styled(Slider)({
  height: 19, // Increase the track height to make it thicker
  '& .MuiSlider-thumb': {
    width: 36, // Increase the thumb size
    height: 36, // Increase the thumb size
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:hover, &.Mui-focusVisible, &.Mui-active': {
      boxShadow: 'inherit'
    }
  },
  '& .MuiSlider-rail': {
    height: 19, // Ensure the rail is also thicker
    backgroundColor: '#2448e4 !important', // Use !important to override any default styles
    opacity: .12
  },
  '& .MuiSlider-track': {
    height: 19, // Ensure the track is also thicker
    backgroundColor: '#2448e4 !important' // Set track color to match rail
  }
});

function formatNumber(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function FundraisingSlider({
  userId,
  value: propValue = 500,
  min = 0,
  max = 10000,
  step = 100,
  onChange: propOnChange
}) {
  const [value, setValue] = useState(propValue);

  useEffect(() => {
    axios
      .get(`/api/fundraising/${userId}`)
      .then((response) => {
        setValue(response.data.amount || propValue);
      })
      .catch((error) => {
        console.error('There was an error fetching the fundraising amount!', error);
      });
  }, [userId, propValue]);

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
    const rawValue = event.target.value.replace(/,/g, ''); // Remove commas
    setValue(rawValue === '' ? 0 : Number(rawValue));
  };

  const handleBlur = () => {
    if (value < min) {
      setValue(min);
    } else if (value > max) {
      setValue(max);
    }

    axios.put(`/api/fundraising/${userId}`, { amount: value }).catch((error) => {
      console.error('There was an error updating the fundraising amount!', error);
    });
  };

  return (
    <div className="d-flex gap-4 py-3">
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
            value={formatNumber(value)}
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
