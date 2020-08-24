export type Nop = () => void;

// see: https://github.com/typescript-cheatsheets/typescript-utilities-cheatsheet#utility-types
// and see: https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/

/**
 * Remove from T the keys that are in common with K
 */
export type Optionalize<T extends K, K> = Omit<T, keyof K>;

/**
 * Dictionary of string, value pairs
 */
export type Dictionary<T> = { [key: string]: T };

// From T pick a set of properties K
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html
export declare function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K>;

export function isFunction(value: any): value is Function {
  return typeof value === "function";
}
export function isString(value: any): value is string {
  return typeof value === "string";
}
export function isObject(value: any): value is object {
  return value !== null && typeof value === "object";
}
export const objectToString = (o: any): string => Object.prototype.toString.call(o);

export function isDate(value: any): value is Date {
  return isObject(value) && objectToString(value) === "[object Date]";
}
export function isArray<T>(value: any): value is Array<T> {
  return Array.isArray(value);
}
export function isRegExp(value: any): value is RegExp {
  return isObject(value) && objectToString(value) === "[object RegExp]";
}
export function isNumber(value: any): value is number {
  return typeof value === "number";
}
export function isNullOrUndefined(value: any): value is null | undefined {
  return value === null || value === undefined;
}
export function isNull(value: any): value is null {
  return value === null;
}
export function isUndefined(value: any): value is undefined {
  return value === undefined;
}
export function isError(value: any): value is Error {
  return isObject(value) && (objectToString(value) === "[object Error]" || value instanceof Error);
}
