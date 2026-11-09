/**
 * Formats a number to Sri Lankan Rupee display format
 * Example: 3250 -> "Rs. 3,250"
 */
export function formatPrice(amount: number): string {
  const formatted = new Intl.NumberFormat('en-LK', {
    maximumFractionDigits: 0,
  }).format(amount);
  return `Rs. ${formatted}`;
}
