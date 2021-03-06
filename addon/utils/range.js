export default function range(a, b) {
  // Allow a single argument to be treated a range from 0 to n
  const start = typeof b === 'undefined' ? 0 : a;
  const end = typeof b === 'undefined' ? a : b;

  const size = Math.abs(end - start) + 1;

  return Array.from({ length: size }, (_, idx) => start + idx);
}
