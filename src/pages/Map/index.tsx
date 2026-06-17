import { Link } from 'react-router-dom'
import styles from './Map.module.less'

function Map() {
  return (
    <main className={styles.page}>
      <p className={styles.route}>/map</p>
      <h1>旅行地图</h1>
      <p className={styles.description}>
        后续这里放目的地地图、城市点位和进入漂流瓶的入口。
      </p>
      <nav className={styles.actions} aria-label="页面跳转">
        <Link to="/mbti">上一页：旅行 MBTI</Link>
        <Link to="/bottle">下一页：旅行漂流瓶</Link>
      </nav>
    </main>
  )
}

export default Map
