/**
 * Checks if a value is empty (null, undefined, empty object, empty array, empty
 * string, etc.)
 *
 * @param value - The value to check.
 * @returns `true` if the value is considered empty; `false` otherwise.
 *
 * @example
 *
 * isSafeEmpty(null);        // => true
 * isSafeEmpty(undefined);   // => true
 * isSafeEmpty('');          // => true
 * isSafeEmpty('   ');       // => true (strings are trimmed)
 * isSafeEmpty([]);          // => true
 * isSafeEmpty({});          // => true
 * isSafeEmpty(new Map());   // => true
 * isSafeEmpty(new Set());   // => true
 *
 * // DOM elements are always non-empty
 * isSafeEmpty(document.createElement('div')); // => false
 *
 * // Class instances are always non-empty
 * class Foo { hello() {} }
 * isSafeEmpty(new Foo());   // => false
 *
 * isSafeEmpty(0);           // => false
 * isSafeEmpty(false);       // => false
 * isSafeEmpty('hello');     // => false
 * isSafeEmpty([1, 2, 3]);   // => false
 * isSafeEmpty({ foo: 1 });  // => false
 */
export function isSafeEmpty<T>(value: T): boolean {
  // Check for null or undefined
  if (value == null) {
    return true;
  }

  // Check for empty strings
  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  // Numbers, booleans, functions, symbols are not empty
  if (typeof value !== 'object') {
    return false;
  }

  // Safe check for objects that might throw on property access
  try {
    // Handle array-like objects safely
    if (Array.isArray(value)) {
      return value.length === 0;
    }

    // Handle Map and Set objects
    if (value instanceof Map || value instanceof Set) {
      return value.size === 0;
    }

    // Handle DOM elements (always consider non-empty)
    if (typeof window !== 'undefined') {
      // Check if it's a DOM element
      if (value instanceof Element || value instanceof Node) {
        return false;
      }

      // Handle DOM collections
      if (
        value instanceof NodeList ||
        value instanceof HTMLCollection ||
        'length' in value
      ) {
        return value.length === 0;
      }
    }

    return (
      // Class instances (excluding Object) are always non-empty
      value.constructor === Object &&
      // Check if the object has own properties without accessing them
      Object.getOwnPropertyNames(value as object).length === 0 &&
      // If no error was thrown during property names check, we can safely use
      // Object.keys
      Object.keys(value as object).length === 0
    );
  } catch (error: unknown) {
    // If any property access fails, consider the object non-empty
    return false;
  }
}

/**
 * Checks if a value is populated (not empty) - simply returns the inverse of
 * {@link isSafeEmpty}.
 *
 * @param value - The value to check.
 * @returns `true` if the value is considered populated; `false` otherwise.
 *
 * @example
 *
 * isSafePopulated(null);        // => false
 * isSafePopulated(undefined);   // => false
 * isSafePopulated('');          // => false
 * isSafePopulated('   ');       // => false (strings are trimmed)
 * isSafePopulated([]);          // => false
 * isSafePopulated({});          // => false
 * isSafePopulated(new Map());   // => false
 * isSafePopulated(new Set());   // => false
 *
 * // DOM elements are always non-empty
 * isSafePopulated(document.createElement('div')); // => true
 *
 * // Class instances are always non-empty
 * class Foo { hello() {} }
 * isSafePopulated(new Foo());   // => true
 *
 * isSafePopulated(0);           // => true
 * isSafePopulated(false);       // => true
 * isSafePopulated('hello');     // => true
 * isSafePopulated([1, 2, 3]);   // => true
 * isSafePopulated({ foo: 1 });  // => true
 */
export function isSafePopulated<T>(value: T): boolean {
  return !isSafeEmpty(value);
}

/**
 * Checks if all provided values are populated (not empty). Returns `true` only
 * if every single value passes the {@link isSafePopulated} check.
 *
 * @param values - Variable number of values to check.
 * @returns `true` if all values are considered populated; `false` if any value
 * is empty or if no values are provided.
 *
 * @example
 *
 * areAllSafePopulated('hello', [1, 2], { foo: 'bar' }); // => true
 * areAllSafePopulated('hello', '', { foo: 'bar' });     // => false (empty string)
 * areAllSafePopulated(1, 2, 3);                         // => true
 * areAllSafePopulated(0, false, 'text');                // => true (0 and false are populated)
 * areAllSafePopulated();                                // => false (no values provided)
 * areAllSafePopulated(null, undefined);                 // => false
 * areAllSafePopulated('test', null, 'other');           // => false (null is empty)
 */
export function areAllSafePopulated(...values: unknown[]): boolean {
  return values?.every(isSafePopulated) ?? false;
}

/**
 * Checks if all provided values are empty. Returns `true` only if every single
 * value passes the {@link isSafeEmpty} check.
 *
 * @param values - Variable number of values to check.
 * @returns `true` if all values are considered empty; `false` if any value is
 * populated or if no values are provided.
 *
 * @example
 *
 * areAllSafeEmpty(null, undefined, '');  // => true
 * areAllSafeEmpty([], {}, new Map());    // => true
 * areAllSafeEmpty('', '   ', '\t\n');    // => true (all whitespace strings)
 * areAllSafeEmpty(null, 'hello');        // => false ('hello' is populated)
 * areAllSafeEmpty();                     // => false (no values provided)
 * areAllSafeEmpty(0, false);             // => false (0 and false are populated)
 * areAllSafeEmpty({}, { foo: 'bar' });   // => false (second object is populated)
 */
export function areAllSafeEmpty(...values: unknown[]): boolean {
  return values?.every(isSafeEmpty) ?? false;
}

/**
 * Safely parses any value to a `boolean`.
 *
 * - For booleans as strings, the string is normalized and compared to the
 * string literal `'true'`/`'false'`.
 *
 * - Boxed `Boolean` objects are converted to their primitive value.
 *
 * @example
 * ```ts
 * // The following return `true`:
 * safeParseBoolean(true)
 * safeParseBoolean('true')
 * safeParseBoolean('True')
 * safeParseBoolean('TRUE')
 * safeParseBoolean('TrUe')
 * safeParseBoolean('  TrUe  ')
 * safeParseBoolean(1)
 * safeParseBoolean(new Boolean(true))
 * safeParseBoolean({})
 * safeParseBoolean([])
 *
 * // The following return `false`:
 * safeParseBoolean(false)
 * safeParseBoolean('false')
 * safeParseBoolean('False')
 * safeParseBoolean('FALSE')
 * safeParseBoolean('  FaLsE  ')
 * safeParseBoolean('')
 * safeParseBoolean(' ')
 * safeParseBoolean('0')
 * safeParseBoolean('1')
 * safeParseBoolean(null)
 * safeParseBoolean(undefined)
 * safeParseBoolean(0)
 * safeParseBoolean(NaN)
 * safeParseBoolean(new Boolean(false))
 */
export function safeParseBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    return value.trim().toLowerCase() === 'true';
  }

  if (value instanceof Boolean) {
    return value.valueOf();
  }

  return Boolean(value);
}

/**
 * A robust number parser that safely handles any type and edge cases such as
 * nullish values, integers, floats, strings, etc.
 *
 * - If `Infinity` is parsed, or `NaN` is parsed from the input,
 * `defaultValue` (`0` if not provided) is returned.
 *
 * @param value - The value to parse.
 * @param defaultValue - The default value to return if the parsed value is
 * nullish, `Infinity`, or `NaN`.
 *
 * @example
 * // Valid values
 * safeParseNumber('123') // 123
 * safeParseNumber('123.45') // 123.45
 * safeParseNumber('123.456789') // 123.456789
 * safeParseNumber(new Number(123)) // 123
 * safeParseNumber(true) // 1
 * safeParseNumber(false) // 0
 *
 * // Edge cases
 * safeParseNumber(null) // 0
 * safeParseNumber(null, 1) // 1
 * safeParseNumber(undefined) // 0
 * safeParseNumber(undefined, 1) // 1
 * safeParseNumber('Infinity') // 0
 * safeParseNumber(Number.POSITIVE_INFINITY) // 0
 * safeParseNumber(Number.NEGATIVE_INFINITY) // 0
 * safeParseNumber(NaN) // 0
 * safeParseNumber('') // 0
 * safeParseNumber('foo') // 0
 */
export function safeParseNumber(value: unknown, defaultValue = 0): number {
  if (value == null) {
    return defaultValue;
  }

  const parsedNumber = Number(value);

  return Number.isFinite(parsedNumber) ? parsedNumber : defaultValue;
}
