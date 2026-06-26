import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VillaVisual from './VillaVisual.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VillaVisual />
  </StrictMode>,
)
