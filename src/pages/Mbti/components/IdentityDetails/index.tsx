import type { PersonaDetails } from '@/types/mbti'
import sharedStyles from '../shared.module.less'
import styles from './IdentityDetails.module.less'

interface IdentityDetailsProps {
  details: PersonaDetails
}

const TRAVEL_STYLE_LABELS: Record<keyof PersonaDetails['travelStyle'], string> =
  {
    energy: '旅行节奏',
    planning: '计划程度',
    social: '社交偏好',
    adventure: '探索偏好',
  }

export function IdentityDetails({ details }: IdentityDetailsProps) {
  return (
    <div className={`${sharedStyles.glass} ${styles.idcardDetails}`}>
      <div className={styles.detailSection}>
        <h3 className={styles.detailTitle}>✨ 旅行人格解析</h3>
        <div className={styles.detailGrid}>
          <div className={styles.detailItem}>
            <p className={styles.detailLabel}>优点</p>
            <ul className={styles.detailList}>
              {details.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </div>
          <div className={styles.detailItem}>
            <p className={styles.detailLabel}>注意事项</p>
            <ul className={styles.detailList}>
              {details.considerations.map((consideration) => (
                <li key={consideration}>{consideration}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.detailSection}>
        <h3 className={styles.detailTitle}>📊 结构化偏好</h3>
        <div className={styles.radarChart}>
          {Object.entries(details.travelStyle).map(([key, value]) => (
            <div key={key} className={styles.radarItem}>
              <span className={styles.radarLabel}>
                {
                  TRAVEL_STYLE_LABELS[
                    key as keyof PersonaDetails['travelStyle']
                  ]
                }
              </span>
              <div className={styles.radarBar}>
                <div
                  className={styles.radarFill}
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className={styles.radarValue}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.detailSection}>
        <h3 className={styles.detailTitle}>🤝 搭子匹配建议</h3>
        <p className={styles.detailText}>{details.matchAdvice}</p>
      </div>

      <div className={styles.detailSection}>
        <h3 className={styles.detailTitle}>🗺️ 适合的目的地</h3>
        <div className={styles.destTags}>
          {details.destTypes.map((destinationType) => (
            <span key={destinationType} className={styles.destTag}>
              {destinationType}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
