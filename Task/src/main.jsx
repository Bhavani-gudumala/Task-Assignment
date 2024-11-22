import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import seed from './files/seed.jsx'
import pool from './files/pool.jsx'
import fetchOrders from './files/fetchOrders.jsx'
import VirtualizedOrdersTable from './files/VirtualizedOrdersTable .jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> 
    <seed/>
    <pool/>
    <fetchOrders/>
    <VirtualizedOrdersTable/> 
  </StrictMode>,
)
