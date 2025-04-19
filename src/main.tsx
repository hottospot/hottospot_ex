import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'

import './index.css'
import App from './App.tsx'

// PWAのService Workerを登録
registerSW({
  onNeedRefresh() {
    if (confirm('新しいバージョンがあります。リロードしますか？')) {
      location.reload()
    }
  },
  onOfflineReady() {
    console.log('PWA is ready to work offline')
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
