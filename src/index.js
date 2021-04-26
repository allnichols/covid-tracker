import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './Theme';

ReactDOM.render(
  <Router>
    <ChakraProvider>
      <React.StrictMode>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </React.StrictMode>
    </ChakraProvider>
  </Router>,
  document.getElementById('root')
);


reportWebVitals();
