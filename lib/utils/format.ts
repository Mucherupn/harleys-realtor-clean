import { format } from 'date-fns';

export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0
  }).format(value);
}

export function formatDate(value: string) {
  return format(new Date(value), 'MMM d, yyyy');
}
