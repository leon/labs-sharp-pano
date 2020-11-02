export function clamp(x: number, min: number, max: number): number {
  return Math.min(max, Math.max(x, min))
}

export function mod(x: number, n: number): number {
  return ((x % n) + n) % n
}
