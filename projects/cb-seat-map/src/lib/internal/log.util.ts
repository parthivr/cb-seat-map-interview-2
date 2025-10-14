/**
 * Log a message to the console with the `[cb-seat-map]` prefix. Calls
 * `console.debug` internally.
 *
 * Ensure the `verbose` log level in your browser is enabled to see these logs.
 */
// export const log: typeof console.log = (...args: any[]) => {
//   console.debug('[cb-seat-map]', ...args);
// };

type Logger = Pick<typeof console, 'debug' | 'info' | 'warn' | 'error'>;

/**
 * Log a message to the console with the `[cb-seat-map]` prefix.
 *
 * @example
 * log.debug('Debug message', args);
 * log.info('Info message', args);
 * log.warn('Warning message', args);
 * log.error('Error message', args);
 */
export const log = (
  ['debug', 'info', 'warn', 'error'] satisfies (keyof Logger)[]
).reduce((logger, methodName) => {
  logger[methodName] = (...args: any[]) => {
    console[methodName]('[cb-seat-map]', ...args);
  };

  return logger;
}, {} as Logger);
