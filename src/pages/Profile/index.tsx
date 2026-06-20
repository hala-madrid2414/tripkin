import BottomNav from '@/components/BottomNav'
import { useNavigate } from 'react-router-dom'
import { useTripStore } from '@/store/useTripStore'
import { resolveDestinationId } from '@/utils/destinationResolver'
import { ProfileHeader } from './components/ProfileHeader'
import { CompanionSection } from './components/CompanionSection'
import { BottleSection } from './components/BottleSection'
import { TripSection } from './components/TripSection'
import { FootprintSection } from './components/FootprintSection'
import { CollectionSection } from './components/CollectionSection'
import { SettingSection } from './components/SettingSection'
import { mockProfileData } from './mock'
import styles from './Profile.module.less'

function Profile() {
  const navigate = useNavigate()
  const personaId = useTripStore((s) => s.personaId)
  const nickname = useTripStore((s) => s.nickname)
  const mbtiTypeCn = useTripStore((s) => s.mbtiTypeCn)
  const classicMbti = useTripStore((s) => s.classicMbti)
  const tagline = useTripStore((s) => s.tagline)
  const tags = useTripStore((s) => s.tags)
  const destination = useTripStore((s) => s.destination)

  const hasPersona = personaId !== null
  const destinationId = resolveDestinationId(destination)

  if (!hasPersona) {
    return (
      <main className={styles.page}>
        <section className={styles.emptyState}>
          <span className={styles.emptyEmoji}>{'\u2728'}</span>
          <h1 className={styles.emptyTitle}>
            {'\u4F60\u7684\u65C5\u884C\u4EBA\u683C'}
          </h1>
          <p className={styles.emptyDesc}>
            {
              '\u5B8C\u6210\u65C5\u884C MBTI\uFF0C\u63A2\u7D22\u4F60\u7684\u65C5\u884C\u98CE\u683C\uFF0C'
            }
            {
              '\u751F\u6210\u5C5E\u4E8E\u4F60\u7684\u65C5\u884C\u8EAB\u4EFD\u5361\u3002'
            }
          </p>
          <button
            type="button"
            className={styles.goMbtiBtn}
            onClick={() => navigate('/mbti')}
          >
            {'\u5F00\u59CB\u63A2\u7D22'}
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <div className={styles.glassCard}>
        <ProfileHeader
          personaId={personaId}
          nickname={nickname}
          mbtiTypeCn={mbtiTypeCn}
          classicMbti={classicMbti}
          tags={tags}
          tagline={tagline}
        />
      </div>

      <div className={styles.glassCard}>
        <CompanionSection companions={mockProfileData.companions} />
      </div>

      <div className={styles.glassCard}>
        <BottleSection bottleStats={mockProfileData.bottleStats} />
      </div>

      <div className={styles.glassCard}>
        <TripSection tripStats={mockProfileData.tripStats} />
      </div>

      <div className={styles.glassCard}>
        <FootprintSection footprintStats={mockProfileData.footprintStats} />
      </div>

      <div className={styles.glassCard}>
        <CollectionSection collectionStats={mockProfileData.collectionStats} />
      </div>

      <div className={styles.glassCard}>
        <SettingSection settingsItems={mockProfileData.settingsItems} />
      </div>

      <BottomNav destinationId={destinationId} />
    </main>
  )
}

export default Profile
