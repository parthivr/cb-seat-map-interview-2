// tslint:disable:max-classes-per-file

import {
  areAllSafeEmpty,
  areAllSafePopulated,
  isSafeEmpty,
  isSafePopulated,
  safeParseBoolean,
  safeParseNumber,
} from './safe-parse.util';

describe('isSafeEmpty', () => {
  it('array - should return true for an empty array', () => {
    expect(isSafeEmpty([])).toBe(true);
  });

  it('array - should return false for a non-empty array', () => {
    expect(isSafeEmpty([1, 2, 3])).toBe(false);
  });

  it('bigint - should return false for BigInt zero', () => {
    expect(isSafeEmpty(BigInt(0))).toBe(false);
  });

  it('boolean - should return false for booleans', () => {
    expect(isSafeEmpty(false)).toBe(false);
    expect(isSafeEmpty(true)).toBe(false);
  });

  it('class - should return false for a class instance with methods', () => {
    class TestClass {
      method() {
        return true;
      }
    }

    expect(isSafeEmpty(new TestClass())).toBe(false);
  });

  it('class - should return false for a class instance without methods', () => {
    class EmptyClass {}

    expect(isSafeEmpty(new EmptyClass())).toBe(false);
  });

  it('class - should return false for a class instance with properties', () => {
    class TestClass {
      prop: string;
    }

    expect(isSafeEmpty(new TestClass())).toBe(false);
  });

  it('dom - should return false for DOM elements', () => {
    expect(isSafeEmpty(document.createElement('div'))).toBe(false);
  });

  it('dom - should return true for empty DOM collections', () => {
    const element = document.createElement('div');

    expect(isSafeEmpty(element.querySelectorAll('.non-existent-class'))).toBe(
      true
    );
  });

  it('error - should return false for objects with throwing property accessors', () => {
    // Setup
    const originalGetOwnPropertyNames = Object.getOwnPropertyNames;

    // Given
    const mockObject = {};
    Object.getOwnPropertyNames = (obj) => {
      if (obj === mockObject) {
        throw new Error('Mock error');
      }

      return [];
    };

    // Expect
    expect(isSafeEmpty(mockObject)).toBe(false);

    // Cleanup
    Object.getOwnPropertyNames = originalGetOwnPropertyNames;
  });

  it('function - should return false for functions', () => {
    // tslint:disable-next-line:no-empty
    expect(isSafeEmpty(() => {})).toBe(false);
  });

  it('map - should return true for an empty Map', () => {
    expect(isSafeEmpty(new Map())).toBe(true);
  });

  it('map - should return false for a non-empty Map', () => {
    expect(isSafeEmpty(new Map(Object.entries({ key: 'value' })))).toBe(false);
  });

  it('null/undefined - should return true', () => {
    expect(isSafeEmpty(null)).toBe(true);
    expect(isSafeEmpty(undefined)).toBe(true);
  });

  it('number - should return false with standard numbers', () => {
    expect(isSafeEmpty(0)).toBe(false);
    expect(isSafeEmpty(-1)).toBe(false);
    expect(isSafeEmpty(1)).toBe(false);
  });

  it('number - should return false for NaN', () => {
    expect(isSafeEmpty(NaN)).toBe(false);
  });

  it('number - should return false for Infinity', () => {
    expect(isSafeEmpty(Infinity)).toBe(false);
  });

  it('object - should return true for an empty object', () => {
    expect(isSafeEmpty({})).toBe(true);
  });

  it('object - should return false for a non-empty object', () => {
    expect(isSafeEmpty({ foo: 'bar' })).toBe(false);
  });

  it('object - should return false for objects with null/undefined values', () => {
    expect(isSafeEmpty({ foo: undefined, bar: null })).toBe(false);
  });

  it('set - should return true for an empty Set', () => {
    expect(isSafeEmpty(new Set())).toBe(true);
  });

  it('set - should return false for a non-empty Set', () => {
    expect(isSafeEmpty(new Set(['foo']))).toBe(false);
  });

  it('string - should return true for an empty string', () => {
    expect(isSafeEmpty('')).toBe(true);
  });

  it('string - should return true for a string with only whitespace', () => {
    expect(isSafeEmpty('   ')).toBe(true);
  });

  it('string - should return true for a string with only tabs and newlines', () => {
    expect(isSafeEmpty('\t\n')).toBe(true);
  });

  it('string - should return false for a non-empty string', () => {
    expect(isSafeEmpty('hello')).toBe(false);
  });

  it('symbol - should return false for symbols', () => {
    expect(isSafeEmpty(Symbol())).toBe(false);
  });
});

describe('isSafePopulated', () => {
  it('array - should return false for an empty array', () => {
    expect(isSafePopulated([])).toBe(false);
  });

  it('array - should return true for a non-empty array', () => {
    expect(isSafePopulated([1, 2, 3])).toBe(true);
  });

  it('bigint - should return true for BigInt zero', () => {
    expect(isSafePopulated(BigInt(0))).toBe(true);
  });

  it('boolean - should return true for booleans', () => {
    expect(isSafePopulated(false)).toBe(true);
    expect(isSafePopulated(true)).toBe(true);
  });

  it('class - should return true for a class instance with methods', () => {
    class TestClass {
      method() {
        return true;
      }
    }

    expect(isSafePopulated(new TestClass())).toBe(true);
  });

  it('class - should return true for a class instance without methods', () => {
    class EmptyClass {}

    expect(isSafePopulated(new EmptyClass())).toBe(true);
  });

  it('class - should return true for a class instance with properties', () => {
    class TestClass {
      prop: string;
    }

    expect(isSafePopulated(new TestClass())).toBe(true);
  });

  it('dom - should return true for DOM elements', () => {
    expect(isSafePopulated(document.createElement('div'))).toBe(true);
  });

  it('dom - should return false for empty DOM collections', () => {
    const element = document.createElement('div');

    expect(
      isSafePopulated(element.querySelectorAll('.non-existent-class'))
    ).toBe(false);
  });

  it('error - should return true for objects with throwing property accessors', () => {
    // Setup
    const originalGetOwnPropertyNames = Object.getOwnPropertyNames;

    // Given
    const mockObject = {};
    Object.getOwnPropertyNames = (obj) => {
      if (obj === mockObject) {
        throw new Error('Mock error');
      }

      return [];
    };

    // Expect
    expect(isSafePopulated(mockObject)).toBe(true);

    // Cleanup
    Object.getOwnPropertyNames = originalGetOwnPropertyNames;
  });

  it('function - should return true for functions', () => {
    // tslint:disable-next-line:no-empty
    expect(isSafePopulated(() => {})).toBe(true);
  });

  it('map - should return false for an empty Map', () => {
    expect(isSafePopulated(new Map())).toBe(false);
  });

  it('map - should return true for a non-empty Map', () => {
    expect(isSafePopulated(new Map(Object.entries({ key: 'value' })))).toBe(
      true
    );
  });

  it('null/undefined - should return false', () => {
    expect(isSafePopulated(null)).toBe(false);
    expect(isSafePopulated(undefined)).toBe(false);
  });

  it('number - should return true with standard numbers', () => {
    expect(isSafePopulated(0)).toBe(true);
    expect(isSafePopulated(-1)).toBe(true);
    expect(isSafePopulated(1)).toBe(true);
  });

  it('number - should return true for NaN', () => {
    expect(isSafePopulated(NaN)).toBe(true);
  });

  it('number - should return true for Infinity', () => {
    expect(isSafePopulated(Infinity)).toBe(true);
  });

  it('object - should return false for an empty object', () => {
    expect(isSafePopulated({})).toBe(false);
  });

  it('object - should return true for a non-empty object', () => {
    expect(isSafePopulated({ foo: 'bar' })).toBe(true);
  });

  it('object - should return true for objects with null/undefined values', () => {
    expect(isSafePopulated({ foo: undefined, bar: null })).toBe(true);
  });

  it('set - should return false for an empty Set', () => {
    expect(isSafePopulated(new Set())).toBe(false);
  });

  it('set - should return true for a non-empty Set', () => {
    expect(isSafePopulated(new Set(['foo']))).toBe(true);
  });

  it('string - should return false for an empty string', () => {
    expect(isSafePopulated('')).toBe(false);
  });

  it('string - should return false for a string with only whitespace', () => {
    expect(isSafePopulated('   ')).toBe(false);
  });

  it('string - should return false for a string with only tabs and newlines', () => {
    expect(isSafePopulated('\t\n')).toBe(false);
  });

  it('string - should return true for a non-empty string', () => {
    expect(isSafePopulated('hello')).toBe(true);
  });

  it('symbol - should return true for symbols', () => {
    expect(isSafePopulated(Symbol())).toBe(true);
  });
});

describe('areAllSafePopulated', () => {
  it('should return true when all values are populated', () => {
    expect(areAllSafePopulated('hello', [1, 2], { foo: 'bar' })).toBe(true);
    expect(areAllSafePopulated(1, 2, 3)).toBe(true);
    expect(areAllSafePopulated(0, false, 'text')).toBe(true);
    expect(areAllSafePopulated(true)).toBe(true);
    expect(areAllSafePopulated(NaN, Infinity, -1)).toBe(true);
  });

  it('should return false when any value is empty', () => {
    expect(areAllSafePopulated('hello', '', { foo: 'bar' })).toBe(false);
    expect(areAllSafePopulated('test', null, 'other')).toBe(false);
    expect(areAllSafePopulated(1, undefined, 3)).toBe(false);
    expect(areAllSafePopulated([1, 2], [], 'text')).toBe(false);
    expect(areAllSafePopulated({ foo: 'bar' }, {})).toBe(false);
  });

  it('should return false when no values are provided', () => {
    expect(areAllSafePopulated()).toBe(false);
  });

  it('should return false when all values are empty', () => {
    expect(areAllSafePopulated(null, undefined)).toBe(false);
    expect(areAllSafePopulated('', '   ', '\t\n')).toBe(false);
    expect(areAllSafePopulated([], {}, new Map())).toBe(false);
  });

  it('should handle mixed types correctly', () => {
    expect(areAllSafePopulated(42, 'hello', [1], { a: 1 }, true, false)).toBe(
      true
    );
    expect(areAllSafePopulated(42, 'hello', [], { a: 1 }, true, false)).toBe(
      false
    );
  });

  it('should handle DOM elements', () => {
    const div = document.createElement('div');
    expect(areAllSafePopulated(div, 'text', 123)).toBe(true);
    expect(areAllSafePopulated(div, '', 123)).toBe(false);
  });

  it('should handle class instances', () => {
    class TestClass {
      prop = 'value';
    }
    const instance = new TestClass();
    expect(areAllSafePopulated(instance, 'text')).toBe(true);
    expect(areAllSafePopulated(instance, null)).toBe(false);
  });
});

describe('areAllSafeEmpty', () => {
  it('should return true when all values are empty', () => {
    expect(areAllSafeEmpty(null, undefined, '')).toBe(true);
    expect(areAllSafeEmpty([], {}, new Map())).toBe(true);
    expect(areAllSafeEmpty('', '   ', '\t\n')).toBe(true);
    expect(areAllSafeEmpty(new Set(), new Map(), [])).toBe(true);
    expect(areAllSafeEmpty(undefined)).toBe(true);
  });

  it('should return false when any value is populated', () => {
    expect(areAllSafeEmpty(null, 'hello')).toBe(false);
    expect(areAllSafeEmpty({}, { foo: 'bar' })).toBe(false);
    expect(areAllSafeEmpty('', 0)).toBe(false);
    expect(areAllSafeEmpty(undefined, false)).toBe(false);
    expect(areAllSafeEmpty([], [1, 2, 3])).toBe(false);
  });

  it('should return false when no values are provided', () => {
    expect(areAllSafeEmpty()).toBe(false);
  });

  it('should return false when all values are populated', () => {
    expect(areAllSafeEmpty(0, false)).toBe(false);
    expect(areAllSafeEmpty('hello', [1, 2], { foo: 'bar' })).toBe(false);
    expect(areAllSafeEmpty(1, 2, 3)).toBe(false);
  });

  it('should handle mixed types correctly', () => {
    expect(areAllSafeEmpty('', null, undefined, [], {})).toBe(true);
    expect(areAllSafeEmpty('', null, undefined, [1], {})).toBe(false);
  });

  it('should handle DOM elements and collections', () => {
    const div = document.createElement('div');
    const emptyNodeList = div.querySelectorAll('.non-existent');

    expect(areAllSafeEmpty(emptyNodeList, '', null)).toBe(true);
    expect(areAllSafeEmpty(div, '')).toBe(false); // DOM elements are never empty
  });

  it('should handle class instances', () => {
    class TestClass {
      prop = 'value';
    }
    const instance = new TestClass();

    expect(areAllSafeEmpty(instance, null)).toBe(false); // Class instances are never empty
    expect(areAllSafeEmpty(null, undefined, '')).toBe(true);
  });

  it('should handle Map and Set correctly', () => {
    const emptyMap = new Map();
    const emptySet = new Set();
    const populatedMap = new Map([['key', 'value']]);

    expect(areAllSafeEmpty(emptyMap, emptySet, '')).toBe(true);
    expect(areAllSafeEmpty(emptyMap, populatedMap)).toBe(false);
  });
});

describe('safeParseBoolean', () => {
  it('should return true for values that should be truthy', () => {
    // Boolean true
    expect(safeParseBoolean(true)).toBe(true);

    // String variations of 'true'
    expect(safeParseBoolean('true')).toBe(true);
    expect(safeParseBoolean('True')).toBe(true);
    expect(safeParseBoolean('TRUE')).toBe(true);
    expect(safeParseBoolean('TrUe')).toBe(true);
    expect(safeParseBoolean('  TrUe  ')).toBe(true);

    // Number 1
    expect(safeParseBoolean(1)).toBe(true);

    // Boxed Boolean object
    // tslint:disable-next-line:no-construct
    expect(safeParseBoolean(new Boolean(true))).toBe(true);

    // Truthy objects and arrays
    expect(safeParseBoolean({})).toBe(true);
    expect(safeParseBoolean([])).toBe(true);
  });

  it('should return false for values that should be falsy', () => {
    // Boolean false
    expect(safeParseBoolean(false)).toBe(false);

    // String variations of 'false'
    expect(safeParseBoolean('false')).toBe(false);
    expect(safeParseBoolean('False')).toBe(false);
    expect(safeParseBoolean('FALSE')).toBe(false);
    expect(safeParseBoolean('  FaLsE  ')).toBe(false);

    // Empty and whitespace strings
    expect(safeParseBoolean('')).toBe(false);
    expect(safeParseBoolean(' ')).toBe(false);

    // String numbers
    expect(safeParseBoolean('0')).toBe(false);
    expect(safeParseBoolean('1')).toBe(false);

    // Null and undefined
    expect(safeParseBoolean(null)).toBe(false);
    expect(safeParseBoolean(undefined)).toBe(false);

    // Number 0 and NaN
    expect(safeParseBoolean(0)).toBe(false);
    expect(safeParseBoolean(NaN)).toBe(false);

    // Boxed Boolean object with false
    // tslint:disable-next-line:no-construct
    expect(safeParseBoolean(new Boolean(false))).toBe(false);
  });
});

describe('safeParseNumber', () => {
  it('should return the number if value is a valid number', () => {
    expect(safeParseNumber(42)).toBe(42);
    expect(safeParseNumber('123')).toBe(123);
    expect(safeParseNumber(0)).toBe(0);
    expect(safeParseNumber('0')).toBe(0);
  });

  it('should return defaultValue if value is null or undefined', () => {
    expect(safeParseNumber(null, 5)).toBe(5);
    expect(safeParseNumber(undefined, 7)).toBe(7);
  });

  it('should return defaultValue if value is not a number', () => {
    expect(safeParseNumber('abc', 10)).toBe(10);
    expect(safeParseNumber({}, 8)).toBe(8);
    expect(safeParseNumber([], 9)).toBe(0);
  });

  it('should use 0 as defaultValue if not provided', () => {
    expect(safeParseNumber(null)).toBe(0);
    expect(safeParseNumber(undefined)).toBe(0);
    expect(safeParseNumber('not-a-number')).toBe(0);
  });

  it('should return defaultValue if value is not finite', () => {
    expect(safeParseNumber(Infinity, 10)).toBe(10);
    expect(safeParseNumber(NaN, 10)).toBe(10);
    expect(safeParseNumber(Number.POSITIVE_INFINITY)).toBe(0);
    expect(safeParseNumber(Number.NEGATIVE_INFINITY)).toBe(0);
  });
});
