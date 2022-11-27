import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import { TaekwondoApp } from './TaekwondoApp'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TaekwondoApp />
    </BrowserRouter>
  </React.StrictMode>
)
