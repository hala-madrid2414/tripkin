import { useState, type ReactElement } from 'react'
import { PERSONALITIES } from '@/pages/Mbti/data'
import { PersonaAvatar } from '@/pages/Mbti/components/PersonaAvatar'
import type { PersonaId } from '@/types/mbti'
import { getPersonaPresentation } from '@/utils/personaPresentation'
import type { MockTravelLevel } from '../../mock'
import { EditProfileSheet } from '../EditProfileSheet'
import type { EditProfileData } from '../EditProfileSheet'
import styles from './TravelIdentityCard.module.less'

function IconEdit(): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  )
}

function IconBook(): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="14"
      height="14"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

interface TravelIdentityCardProps {
  personaId: PersonaId | null
  nickname: string | null
  mbtiTypeCn: string | null
  classicMbti: string | null
  tags: string[]
  tagline: string | null
  travelLevel: MockTravelLevel
}

export function TravelIdentityCard({
  personaId,
  nickname,
  mbtiTypeCn,
  classicMbti,
  tags,
  tagline,
  travelLevel,
}: TravelIdentityCardProps) {
  const presentation = personaId ? getPersonaPresentation(personaId) : null
  const persona = personaId ? PERSONALITIES[personaId] : null
  const displayTitle = presentation?.tripkinTitleCn ?? mbtiTypeCn ?? '未知'
  const displayMbti = presentation?.classicMbti ?? classicMbti
  const displayTags = persona?.tags ?? presentation?.tags ?? tags
  const displayTagline = presentation?.tagline ?? tagline

  const [editOpen, setEditOpen] = useState(false)
  const [editNickname, setEditNickname] = useState(nickname ?? '旅行者')
  const [editTagline, setEditTagline] = useState(displayTagline ?? '')

  const levelPct =
    travelLevel.nextExp > 0
      ? Math.round((travelLevel.exp / travelLevel.nextExp) * 100)
      : 0

  const handleSave = (data: EditProfileData) => {
    setEditNickname(data.nickname)
    setEditTagline(data.tagline)
    setEditOpen(false)
  }

  return (
    <section className={styles.card}>
      {/* ---- top strip: level badge ---- */}
      <div className={styles.topStrip}>
        <span className={styles.levelBadge}>
          <IconBook />
          <span>
            Lv.{travelLevel.level} · {travelLevel.title}
          </span>
        </span>
        <button
          type="button"
          className={styles.editBtn}
          aria-label="编辑资料"
          onClick={() => setEditOpen(true)}
        >
          <IconEdit />
        </button>
      </div>

      {/* ---- avatar ---- */}
      {personaId ? (
        <div className={styles.avatarWrap}>
          <PersonaAvatar id={personaId} />
        </div>
      ) : (
        <div className={styles.avatarPlaceholder}>🌍</div>
      )}

      {/* ---- nickname ---- */}
      <h1 className={styles.nickname}>{editNickname}</h1>

      {/* ---- persona badge ---- */}
      <span className={styles.personaBadge}>
        {'🎯 '}
        {displayTitle}
        {displayMbti ? ` · ${displayMbti}` : ''}
      </span>

      {/* ---- exp bar ---- */}
      <div className={styles.expWrap}>
        <div className={styles.expHeader}>
          <span className={styles.expLabel}>EXP</span>
          <span className={styles.expValue}>
            {travelLevel.exp}/{travelLevel.nextExp}
          </span>
        </div>
        <div className={styles.expTrack}>
          <div
            className={styles.expFill}
            style={{ width: `${Math.min(levelPct, 100)}%` }}
          />
        </div>
      </div>

      {/* ---- slogan ---- */}
      {editTagline && <p className={styles.slogan}>{editTagline}</p>}

      {/* ---- tags ---- */}
      {displayTags.length > 0 && (
        <div className={styles.tags}>
          {displayTags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* ---- edit sheet ---- */}
      <EditProfileSheet
        visible={editOpen}
        nickname={editNickname}
        tagline={editTagline}
        onClose={() => setEditOpen(false)}
        onSave={handleSave}
      />
    </section>
  )
}
