import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import axios from 'axios';

const Input = styled(MuiInput)(({ theme }) => ({
  '&.MuiInput-root': {
    '&:before': {
      borderBottom: 'none' // Remove the underline border
    },
    '&:after': {
        borderBottom: 'none' // Remove the underline border
      },
    '&:hover:before': {
      borderBottom: 'none' // Remove the underline border on hover
    },
    '&.Mui-focused:before': {
      borderBottom: 'none' // Remove the underline border when focused
    }
  },
  input: {
    fontSize: '36px !important',
    fontWeight: '700' // Ensure the font size is applied to the input element
  }
}));

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
    backgroundColor: '#2448e4 !important' // Use !important to override any default styles
  },
  '& .MuiSlider-track': {
    height: 19, // Ensure the track is also thicker
    backgroundColor: '#2448e4 !important' // Set track color to match rail
  }
});

function formatNumber(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function FundraisingSlider({ userId }) {
  const [value, setValue] = useState(500);

  useEffect(() => {
    axios
      .get(`/api/fundraising/${userId}`)
      .then((response) => {
        setValue(response.data.amount || 500);
      })
      .catch((error) => {
        console.error('There was an error fetching the fundraising amount!', error);
      });
  }, [userId]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    const rawValue = event.target.value.replace(/,/g, ''); // Remove commas
    setValue(rawValue === '' ? 0 : Number(rawValue));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 10000) {
      setValue(10000);
    }

    axios.put(`/api/fundraising/${userId}`, { amount: value }).catch((error) => {
      console.error('There was an error updating the fundraising amount!', error);
    });
  };

  return (
    <div className="d-flex gap-4 py-3">
      <div className="w-100 gap-4 d-flex">
        <ThickSlider
        className="flex-grow-1"
          value={typeof value === 'number' ? value : 0}
          onChange={handleSliderChange}
          onBlur={handleBlur}
          aria-labelledby="fundraising-slider"
          min={0}
          max={10000}
          step={100}
        />
        <div className="fundraise__price d-flex gap-1 align-items-center">
          <h3>$</h3>
          <Input
            value={formatNumber(value)}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 100,
              min: 0,
              max: 10000,
              type: 'text',
              'aria-labelledby': 'fundraising-slider'
            }}
          />
        </div>
      </div>
    </div>
  );
}
