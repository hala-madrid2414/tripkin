import { Link } from 'react-router-dom'
import styles from './Match.module.less'

function Match() {
  return (
    <main className={styles.page}>
      <p className={styles.route}>/match</p>
      <h1>搭子/行程匹配</h1>
      <p className={styles.description}>
        后续这里放同频旅行搭子、行程匹配结果和行动意愿入口。
      </p>
      <nav className={styles.actions} aria-label="页面跳转">
        <Link to="/bottle">上一页：旅行漂流瓶</Link>
        <Link to="/mbti">下一页：旅行 MBTI</Link>
      </nav>
    </main>
  )
}

export default Match
