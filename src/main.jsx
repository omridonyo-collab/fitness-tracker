import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VillaBrief from './VillaBrief.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VillaBrief />
  </StrictMode>,
)
