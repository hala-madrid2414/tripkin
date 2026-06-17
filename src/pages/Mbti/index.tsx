import { Link } from 'react-router-dom'
import styles from './Mbti.module.less'

function Mbti() {
  return (
    <main className={styles.page}>
      <p className={styles.route}>/mbti</p>
      <h1>旅行 MBTI</h1>
      <p className={styles.description}>
        后续这里放旅行人格测试、偏好选择和身份卡生成入口。
      </p>
      <nav className={styles.actions} aria-label="页面跳转">
        <Link to="/match">上一页：搭子匹配</Link>
        <Link to="/map">下一页：旅行地图</Link>
      </nav>
    </main>
  )
}

export default Mbti
