import BottomNav from '@/components/BottomNav'
import { Link } from 'react-router-dom'
import { useTripStore } from '@/store/useTripStore'
import { resolveDestinationId } from '@/utils/destinationResolver'
import styles from './Home.module.less'

function Home() {
  const personaId = useTripStore((state) => state.personaId)
  const mbtiTypeCn = useTripStore((state) => state.mbtiTypeCn)
  const classicMbti = useTripStore((state) => state.classicMbti)
  const destination = useTripStore((state) => state.destination)
  const tags = useTripStore((state) => state.tags)
  const destinationId = resolveDestinationId(destination) ?? 'xizang'

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <p className={styles.kicker}>TripKin 旅行搭子 Demo</p>
        <h1 id="home-title">探索世界的更多可能</h1>
        <p className={styles.description}>
          从旅行 MBTI
          开始认识自己的旅行风格，再去地图里发现目的地、漂流瓶和同路人。
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.primaryLink} to="/map">
            去地图探索
          </Link>
          <Link className={styles.secondaryLink} to="/mbti">
            测测旅行 MBTI
          </Link>
        </div>
      </section>

      <section className={styles.mbtiCard} aria-label="我的旅行 MBTI">
        <div>
          <p className={styles.label}>我的旅行 MBTI</p>
          {personaId ? (
            <>
              <h2>
                {classicMbti} · {mbtiTypeCn}
              </h2>
              <p>{tags.slice(0, 3).join(' / ') || '你的旅行人格已经准备好'}</p>
            </>
          ) : (
            <>
              <h2>还没有生成旅行身份</h2>
              <p>先完成一次测试，让后续地图、漂流瓶和搭子内容更有上下文。</p>
            </>
          )}
        </div>
        <Link to={personaId ? '/mbti/result' : '/mbti'}>查看</Link>
      </section>

      <section className={styles.quickGrid} aria-label="快捷入口">
        <Link to="/map">目的地地图</Link>
        <Link to={`/bottle?dest=${encodeURIComponent(destinationId)}`}>
          旅行漂流瓶
        </Link>
        <Link to={`/match?dest=${encodeURIComponent(destinationId)}`}>
          找同路搭子
        </Link>
      </section>

      <BottomNav destinationId={destinationId} />
    </main>
  )
}

export default Home
