import { useState, type CSSProperties } from 'react'
import type { PersonaId } from '@/types/mbti'
import { useTripStore } from '@/store/useTripStore'
import { PERSONALITIES } from '../data'
import { makeBarcodeBars, makeIdNum } from '../logic'
import { PersonaAvatar } from './PersonaAvatar'
import styles from '../Mbti.module.less'

interface IdentityCardProps {
  personaId: PersonaId
  onGoMap: () => void
  onRestart: () => void
}

export function IdentityCard({
  personaId,
  onGoMap,
  onRestart,
}: IdentityCardProps) {
  const persona = PERSONALITIES[personaId]
  const nickname = useTripStore((s) => s.nickname)
  const destination = useTripStore((s) => s.destination)

  // 条码与编号只在挂载时生成一次，避免重渲染抖动
  const [bars] = useState(() => makeBarcodeBars())
  const [idNum] = useState(() => makeIdNum(personaId))
  const [showDetails, setShowDetails] = useState(false)

  const { details } = persona

  return (
    <div className={styles.result}>
      <div className={styles.resultScroll}>
        <article
          className={`${styles.glass} ${styles.idcard}`}
          style={{ '--accent': persona.accent } as CSSProperties}
        >
          <header className={styles.idcardHead}>
            <div className={styles.idcardBrand}>
              <span className={styles.idcardBrandMark}>✦</span>
              <div>
                <p className={styles.idcardBrandCn}>旅行身份卡</p>
                <p className={styles.idcardBrandEn}>TRAVEL SOCIAL CARD</p>
              </div>
            </div>
            <span className={styles.idcardStamp}>PERSONA</span>
          </header>

          <div className={styles.idcardIdentity}>
            <div className={styles.idcardAvatar}>
              <PersonaAvatar id={personaId} />
            </div>
            <div className={styles.idcardMain}>
              <p className={styles.idcardNickname}>{nickname}</p>
              <h2 className={styles.idcardTitleCn}>{persona.titleCn}</h2>
              <p className={styles.idcardTitleEn}>{persona.titleEn}</p>
            </div>
          </div>

          <p className={styles.idcardTagline}>
            <strong>{persona.tagline}</strong>
            {persona.description}
          </p>

          <div className={styles.idcardTags}>
            {persona.tags.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
              </span>
            ))}
          </div>

          <div className={styles.idcardIntent}>
            <p className={styles.idcardIntentTitle}>
              偏好摘要 / PREFERENCE SNAPSHOT
            </p>
            <dl className={styles.idcardIntentGrid}>
              <div>
                <dt>目的地</dt>
                <dd>{destination}</dd>
              </div>
              <div>
                <dt>旅行方式</dt>
                <dd>{persona.traits.style}</dd>
              </div>
              <div>
                <dt>推荐解释</dt>
                <dd>{persona.intentLine}</dd>
              </div>
            </dl>
          </div>

          <footer className={styles.idcardFoot}>
            <div className={styles.idcardBarcode}>
              {bars.map((b, i) => (
                <span key={i} style={{ width: b.width, opacity: b.opacity }} />
              ))}
            </div>
            <span className={styles.idcardIdnum}>{idNum}</span>
          </footer>
        </article>

        {/* 详情折叠区域 */}
        <button
          type="button"
          className={styles.detailsToggle}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? '收起旅行偏好' : '查看旅行偏好'}
          <span
            className={`${styles.detailsArrow} ${showDetails ? styles.detailsArrowUp : ''}`}
          >
            ↓
          </span>
        </button>

        {showDetails && (
          <div className={`${styles.glass} ${styles.idcardDetails}`}>
            {/* 人格深度解析 */}
            <div className={styles.detailSection}>
              <h3 className={styles.detailTitle}>✨ 旅行人格解析</h3>
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>优点</p>
                  <ul className={styles.detailList}>
                    {details.strengths.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>注意事项</p>
                  <ul className={styles.detailList}>
                    {details.considerations.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 旅行风格雷达 */}
            <div className={styles.detailSection}>
              <h3 className={styles.detailTitle}>📊 结构化偏好</h3>
              <div className={styles.radarChart}>
                {Object.entries(details.travelStyle).map(([key, value]) => {
                  const labels: Record<string, string> = {
                    energy: '旅行节奏',
                    planning: '计划程度',
                    social: '社交偏好',
                    adventure: '探索偏好',
                  }
                  return (
                    <div key={key} className={styles.radarItem}>
                      <span className={styles.radarLabel}>{labels[key]}</span>
                      <div className={styles.radarBar}>
                        <div
                          className={styles.radarFill}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                      <span className={styles.radarValue}>{value}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 搭子匹配建议 */}
            <div className={styles.detailSection}>
              <h3 className={styles.detailTitle}>🤝 搭子匹配建议</h3>
              <p className={styles.detailText}>{details.matchAdvice}</p>
            </div>

            {/* 适合的目的地类型 */}
            <div className={styles.detailSection}>
              <h3 className={styles.detailTitle}>🗺️ 适合的目的地</h3>
              <div className={styles.destTags}>
                {details.destTypes.map((d) => (
                  <span key={d} className={styles.destTag}>
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className={styles.resultFooter}>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}
          onClick={onGoMap}
        >
          <span>去地图找旅行搭子</span>
          <span className={styles.btnArrow}>→</span>
        </button>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnGhost}`}
          onClick={onRestart}
        >
          重新测试
        </button>
      </footer>
    </div>
  )
}
