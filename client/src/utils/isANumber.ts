export function isANumber(val: number | null | undefined): val is number {
  return Boolean(val || val === 0);
}
