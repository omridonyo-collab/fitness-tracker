import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VillaAfter from './VillaAfter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VillaAfter />
  </StrictMode>,
)
