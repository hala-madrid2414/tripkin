import { PERSONALITIES } from '@/pages/Mbti/data'
import type { PersonaId } from '@/types/mbti'
import styles from './DestinationSection.module.less'

interface DestinationSectionProps {
  personaId: PersonaId
}

export function DestinationSection({ personaId }: DestinationSectionProps) {
  const persona = PERSONALITIES[personaId]
  if (!persona) return null

  const destTypes = persona.details.destTypes
  if (!destTypes || destTypes.length === 0) return null

  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>目的地倾向</h2>
      </header>

      <p className={styles.hint}>根据你的旅行人格，推荐以下类型的旅行目的地</p>

      <div className={styles.chipList}>
        {destTypes.map((dest) => (
          <span key={dest} className={styles.chip}>
            {dest}
          </span>
        ))}
      </div>
    </section>
  )
}
