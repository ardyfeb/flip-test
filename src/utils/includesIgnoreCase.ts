export function includesIgnoreCase(a: string, b: string): boolean {
  return a.toLowerCase().includes(b.toLowerCase())
}