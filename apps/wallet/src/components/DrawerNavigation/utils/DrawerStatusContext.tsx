import { createContext } from 'react';
import type { DrawerStatus } from '@react-navigation/native';

const DrawerStatusContext = createContext<DrawerStatus | undefined>(undefined);

export default DrawerStatusContext;
