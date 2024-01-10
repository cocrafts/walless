import type { RefObject } from 'react';
import { createContext } from 'react';

/* eslint-disable-next-line */
export default createContext<RefObject<any> | null>(null);
