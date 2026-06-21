import { useNavigate } from 'react-router-dom'
import { useTripStore } from '@/store/useTripStore'
import { TravelIdentityCard } from './components/TravelIdentityCard'
import { TravelPersonaSection } from './components/TravelPersonaSection'
import { MatchingProfileSection } from './components/MatchingProfileSection'
import { TravelStorySection } from './components/TravelStorySection'
import { TripSection } from './components/TripSection'
import { FootprintSection } from './components/FootprintSection'
import { TravelAchievementSection } from './components/TravelAchievementSection'
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

  const hasPersona = personaId !== null
  const handleSaveAccount = (newNickname: string, newTagline: string) => {
    useTripStore.setState({ nickname: newNickname, tagline: newTagline })
  }

  if (!hasPersona) {
    return (
      <main className={styles.page}>
        <section className={styles.emptyState}>
          <span className={styles.emptyEmoji} aria-hidden="true">
            ✨
          </span>
          <h1 className={styles.emptyTitle}>{'你的旅行人格'}</h1>
          <p className={styles.emptyDesc}>
            {'完成旅行 MBTI，探索你的旅行风格，'}
            {'生成属于你的旅行身份卡。'}
          </p>
          <button
            type="button"
            className={styles.goMbtiBtn}
            onClick={() => navigate('/mbti')}
          >
            {'开始探索'}
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      {/* 1. Travel Identity Card */}
      <div className={styles.glassCard}>
        <TravelIdentityCard
          personaId={personaId}
          nickname={nickname}
          mbtiTypeCn={mbtiTypeCn}
          classicMbti={classicMbti}
          tags={tags}
          tagline={tagline}
          travelLevel={mockProfileData.travelLevel}
        />
      </div>

      {/* 2. Travel Persona */}
      <div className={styles.glassCard}>
        <TravelPersonaSection
          personaId={personaId}
          travelIndices={mockProfileData.travelIndices}
        />
      </div>

      {/* 3. Matching Profile */}
      <div className={styles.glassCard}>
        <MatchingProfileSection
          matchingProfile={mockProfileData.matchingProfile}
        />
      </div>

      {/* 4. Travel Stories */}
      <div className={styles.glassCard}>
        <TravelStorySection
          bottleStats={mockProfileData.bottleStats}
          featuredStories={mockProfileData.featuredStories}
        />
      </div>

      {/* 5. My Trips */}
      <div className={styles.glassCard}>
        <TripSection tripStats={mockProfileData.tripStats} />
      </div>

      {/* 6. Footprints */}
      <div className={styles.glassCard}>
        <FootprintSection footprintStats={mockProfileData.footprintStats} />
      </div>

      {/* 7. Achievements */}
      <div className={styles.glassCard}>
        <TravelAchievementSection achievements={mockProfileData.achievements} />
      </div>

      {/* 8. Collections */}
      <div className={styles.glassCard}>
        <CollectionSection collectionStats={mockProfileData.collectionStats} />
      </div>

      {/* 9. Settings */}
      <div className={styles.glassCard}>
        <SettingSection
          settingsItems={mockProfileData.settingsItems}
          nickname={nickname ?? '旅行者'}
          tagline={tagline ?? ''}
          onSaveAccount={handleSaveAccount}
        />
      </div>
    </main>
  )
}

export default Profile
