/* eslint-disable no-console */

type TLogger = 'log' | 'error' | 'warn' | 'info';

export const logger = (msg?: string, type: TLogger = 'info'): void => console[type](msg);
