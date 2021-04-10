import { DateTime } from 'luxon';

export interface Order {
  name: string;
  price: string;
  status: 'ready' | 'pending' | 'warn';
  timestamp: string;
}

export const tableSalesData: Order[] = [
  {
    name: 'Libertad Servicios Financieros, S.A. de C.V., S.F.P.',
    price: '$36,000.00',
    status: 'pending',
    timestamp: '28-03-2021'
  },
  {
    name: 'Banco Forjadores, S.A., Institución de Banca Múltiple',
    price: '$36,000.00',
    status: 'pending',
    timestamp: '26-03-2021'
  },
  {
    name: 'Banco Azteca, S.A., Institución de Banca Múltiple',
    price: '$18,000.00',
    status: 'ready',
    timestamp: '10-04-2021'
  },
  {
    name: 'Ford Credit de México, S.A. de C.V., SOFOM, E.R.',
    price: '$18,000.00',
    status: 'ready',
    timestamp: '03-04-2021'
  },
  {
    name: 'Administradora de Caja Bienestar, S.A. de C.V., S.F.P.',
    price: '$1,2000.00',
    status: 'ready',
    timestamp: '03-03-2021'
  }
];
