import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import MbtiEntryModal from '@/components/MbtiEntryModal'
import styles from './BottomNav.module.less'

const navItems = [
  { to: '/', label: '首页', icon: '⌂' },
  { to: '/map', label: '地图', icon: '⌖' },
  { to: '/mbti', label: 'MBTI', icon: '✦', special: true },
  { to: '/profile', label: '我的', icon: '●' },
]

interface BottomNavProps {
  destinationId?: string
}

function getNavTo(pathname: string, destinationId?: string) {
  if (!destinationId) {
    return pathname
  }

  return {
    pathname,
    search: `?dest=${encodeURIComponent(destinationId)}`,
  }
}

function BottomNav({ destinationId }: BottomNavProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [mbtiModalOpen, setMbtiModalOpen] = useState(false)
  const isMbtiRoute = location.pathname.startsWith('/mbti')

  const handleMbtiClick = () => {
    if (isMbtiRoute) {
      navigate('/mbti')
      return
    }

    setMbtiModalOpen(true)
  }

  const handleEnterMbti = () => {
    setMbtiModalOpen(false)
    navigate('/mbti')
  }

  return (
    <>
      <nav className={styles.nav} aria-label="主导航">
        {navItems.map((item) =>
          item.special ? (
            <button
              key={item.to}
              type="button"
              className={
                isMbtiRoute
                  ? `${styles.item} ${styles.mbtiItem} ${styles.itemActive}`
                  : `${styles.item} ${styles.mbtiItem}`
              }
              onClick={handleMbtiClick}
            >
              <span aria-hidden="true">{item.icon}</span>
              <strong>{item.label}</strong>
            </button>
          ) : (
            <NavLink
              key={item.to}
              to={getNavTo(item.to, destinationId)}
              end={item.to === '/'}
              className={({ isActive }) =>
                isActive ? `${styles.item} ${styles.itemActive}` : styles.item
              }
            >
              <span aria-hidden="true">{item.icon}</span>
              <strong>{item.label}</strong>
            </NavLink>
          ),
        )}
      </nav>
      <MbtiEntryModal
        open={mbtiModalOpen}
        onEnter={handleEnterMbti}
        onClose={() => setMbtiModalOpen(false)}
      />
    </>
  )
}

export default BottomNav
