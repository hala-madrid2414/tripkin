import { StrictMode } from 'react'
import type { ReactElement } from 'react'
import { unstableSetRender } from 'antd-mobile'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'antd-mobile/es/global'
import '@/styles/reset.less'
import '@/styles/global.less'

unstableSetRender(
  (node: ReactElement, container: Element | DocumentFragment) => {
    const root = createRoot(container)
    root.render(node)
    return async () => {
      root.unmount()
    }
  },
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
