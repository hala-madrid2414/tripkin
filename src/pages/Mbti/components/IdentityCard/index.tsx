import { useState, type CSSProperties } from 'react'
import type { PersonaId } from '@/types/mbti'
import { useTripStore } from '@/store/useTripStore'
import { PERSONALITIES } from '../../data'
import { makeBarcodeBars, makeIdNum } from '../../logic'
import { IdentityDetails } from '../IdentityDetails'
import { PersonaAvatar } from '../PersonaAvatar'
import sharedStyles from '../shared.module.less'
import styles from './IdentityCard.module.less'

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

  return (
    <div className={styles.result}>
      <div className={styles.resultScroll}>
        <article
          className={`${sharedStyles.glass} ${styles.idcard}`}
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

        {showDetails && <IdentityDetails details={persona.details} />}
      </div>

      <footer className={styles.resultFooter}>
        <button
          type="button"
          className={`${sharedStyles.btn} ${sharedStyles.btnPrimary} ${sharedStyles.btnLg}`}
          onClick={onGoMap}
        >
          <span>去地图找旅行搭子</span>
          <span className={sharedStyles.btnArrow}>→</span>
        </button>
        <button
          type="button"
          className={`${sharedStyles.btn} ${sharedStyles.btnGhost}`}
          onClick={onRestart}
        >
          重新测试
        </button>
      </footer>
    </div>
  )
}
