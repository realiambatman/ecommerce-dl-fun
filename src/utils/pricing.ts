export const FREE_SHIPPING_THRESHOLD = 15000;
export const STANDARD_SHIPPING_FEE = 149;
export const TAX_RATE = 0.07;

// Promo codes accepted by the demo cart, mapped to their discount rate
export const PROMO_CODES: Record<string, number> = {
  WELCOME10: 0.1,
};

const priceFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

export const formatPrice = (price: number) => priceFormatter.format(price);

export const getShippingFee = (subtotal: number) =>
  subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;

export const getDiscount = (subtotal: number, promoCode: string | null) => {
  const rate = promoCode ? PROMO_CODES[promoCode] ?? 0 : 0;
  return Math.round(subtotal * rate);
};
