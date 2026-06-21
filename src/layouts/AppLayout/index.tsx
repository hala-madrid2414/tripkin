import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import BottomNav from '@/components/BottomNav'
import { useTripStore } from '@/store/useTripStore'
import { resolveDestinationId } from '@/utils/destinationResolver'
import styles from './AppLayout.module.less'

const mainTabPaths = new Set(['/', '/map', '/match', '/profile'])

interface AppLayoutProps {
  children: ReactNode
}

function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation()
  const destination = useTripStore((state) => state.destination)
  const destinationId = resolveDestinationId(destination)
  const showBottomNav = mainTabPaths.has(location.pathname)

  return (
    <div className={styles.app}>
      {children}
      {showBottomNav && <BottomNav destinationId={destinationId} />}
    </div>
  )
}

export default AppLayout
