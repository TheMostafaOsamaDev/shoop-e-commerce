export const arrayToSnakeCase = (arr: string[]): string[] =>
  arr.map((str) => str.toUpperCase().replace(/ /g, '_'));
