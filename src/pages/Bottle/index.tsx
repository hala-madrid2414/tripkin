import { Link } from 'react-router-dom'
import styles from './Bottle.module.less'

function Bottle() {
  return (
    <main className={styles.page}>
      <p className={styles.route}>/bottle</p>
      <h1>旅行漂流瓶</h1>
      <p className={styles.description}>
        后续这里放目的地心愿、旅行故事卡片和互动入口。
      </p>
      <nav className={styles.actions} aria-label="页面跳转">
        <Link to="/map">上一页：旅行地图</Link>
        <Link to="/match">下一页：搭子匹配</Link>
      </nav>
    </main>
  )
}

export default Bottle
