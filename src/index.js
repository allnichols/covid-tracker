import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './Theme';

ReactDOM.render(
  <ChakraProvider>
   <React.StrictMode>
     <ColorModeScript initialColorMode={theme.config.initialColorMode} />
     <App />
   </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);


reportWebVitals();
