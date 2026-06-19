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
}

export function IdentityCard({ personaId, onGoMap }: IdentityCardProps) {
  const persona = PERSONALITIES[personaId]
  const nickname = useTripStore((s) => s.nickname)
  const destination = useTripStore((s) => s.destination)

  // 条码与编号只在挂载时生成一次，避免重渲染抖动
  const [bars] = useState(() => makeBarcodeBars())
  const [idNum] = useState(() => makeIdNum(personaId))

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
                <p className={styles.idcardBrandCn}>旅行社交身份证</p>
                <p className={styles.idcardBrandEn}>TRAVEL SOCIAL ID</p>
              </div>
            </div>
            <span className={styles.idcardStamp}>VERIFIED</span>
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
            <p className={styles.idcardIntentTitle}>社交意向 / SOCIAL INTENT</p>
            <dl className={styles.idcardIntentGrid}>
              <div>
                <dt>目的地</dt>
                <dd>{destination}</dd>
              </div>
              <div>
                <dt>出行风格</dt>
                <dd>{persona.traits.style}</dd>
              </div>
              <div>
                <dt>同行意向</dt>
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
      </div>

      <footer className={styles.resultFooter}>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}
          onClick={onGoMap}
        >
          <span>带上形象，去地图找搭子</span>
          <span className={styles.btnArrow}>→</span>
        </button>
      </footer>
    </div>
  )
}
