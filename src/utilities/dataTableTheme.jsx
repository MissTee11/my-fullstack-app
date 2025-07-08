import { createTheme } from "react-data-table-component";

export const myCustomTheme = createTheme(
    'myCustomTheme',
  {
    text: {
        primary: '#4C3BCF',
    },
    background: {
        default: 'white',
    },
    context: {
        background: '#cb4b16',
        text: '#FFFFFF',
    },
    divider: {
        default: '#263859',
    },
    sortFocus: {
        default: '#2aa198',
    },
    
  },
  'light',
  );