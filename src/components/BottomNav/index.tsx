import { NavLink } from 'react-router-dom'
import styles from './BottomNav.module.less'

const navItems = [
  { to: '/map', label: '地图', icon: '⌖' },
  { to: '/match', label: '匹配', icon: '≋' },
  { to: '/bottle', label: '漂流瓶', icon: '✦' },
  { to: '/profile', label: '我的', icon: '●' },
]

function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="主导航">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            isActive ? `${styles.item} ${styles.itemActive}` : styles.item
          }
        >
          <span aria-hidden="true">{item.icon}</span>
          <strong>{item.label}</strong>
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
