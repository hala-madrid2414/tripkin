import { PERSONALITIES } from '@/pages/Mbti/data'
import { getPersonaPresentation } from '@/utils/personaPresentation'
import type { PersonaId } from '@/types/mbti'
import type { MockTravelIndices } from '../../mock'
import styles from './TravelPersonaSection.module.less'

interface TravelPersonaSectionProps {
  personaId: PersonaId
  travelIndices: MockTravelIndices
}

function IndexBar({ label, value }: { label: string; value: number }) {
  return (
    <div className={styles.indexRow}>
      <span className={styles.indexLabel}>{label}</span>
      <div className={styles.indexTrack}>
        <div
          className={styles.indexFill}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      <span className={styles.indexValue}>{value}</span>
    </div>
  )
}

export function TravelPersonaSection({
  personaId,
  travelIndices,
}: TravelPersonaSectionProps) {
  const persona = PERSONALITIES[personaId]
  const presentation = getPersonaPresentation(personaId)
  if (!persona) return null

  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>🧬</span>
          旅行人格
        </h2>
        <span className={styles.mbtiBadge}>{presentation.classicMbti}</span>
      </header>

      <p className={styles.desc}>{persona.description}</p>

      <div className={styles.traitsRow}>
        <span className={styles.traitChip}>精力 · {persona.traits.energy}</span>
        <span className={styles.traitChip}>规划 · {persona.traits.plan}</span>
        <span className={styles.traitChip}>风格 · {persona.traits.style}</span>
      </div>

      <div className={styles.divider} />

      <h3 className={styles.indicesTitle}>旅行偏好指数</h3>
      <div className={styles.indices}>
        <IndexBar label="城市探索" value={travelIndices.cityExplore} />
        <IndexBar label="文化体验" value={travelIndices.culture} />
        <IndexBar label="社交旅行" value={travelIndices.social} />
      </div>
    </section>
  )
}
