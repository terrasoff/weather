export function removeVowels(value: string): string {
  return value.replace(/[aeiou]/ig, "");
}