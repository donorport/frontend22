export const PLATFORM_COST = {
  PERCENT: 0.0499,
  BASE: 0.3
};

export const calculatePlatformCost = (val) =>
  (PLATFORM_COST.PERCENT * Number(val) + PLATFORM_COST.BASE).toFixed(2);

export const calculateGrandTotal = (val, platformCost) =>
  (Number(val) + Number(platformCost)).toFixed(2);

export const calculateSubtotal = (amount) =>
  Number((amount - PLATFORM_COST.BASE) / (1 + PLATFORM_COST.PERCENT)).toFixed(2);

export const DONATION_XP_PER_DOLLAR = 10;

export const VALID_IMAGE_EXTENSIONS = ['jpg', 'png', 'jpeg'];
