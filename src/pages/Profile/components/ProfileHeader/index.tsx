import { Toast } from 'antd-mobile'
import { PersonaAvatar } from '@/pages/Mbti/components/PersonaAvatar'
import type { PersonaId } from '@/types/mbti'
import type { ReactElement } from 'react'
import styles from './ProfileHeader.module.less'

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

interface ProfileHeaderProps {
  personaId: PersonaId | null
  nickname: string | null
  mbtiTypeCn: string | null
  tags: string[]
  tagline: string | null
}

export function ProfileHeader({
  personaId,
  nickname,
  mbtiTypeCn,
  tags,
  tagline,
}: ProfileHeaderProps) {
  return (
    <section className={styles.header}>
      <button
        type="button"
        className={styles.editBtn}
        aria-label="\u7F16\u8F91\u8D44\u6599"
        onClick={() =>
          Toast.show({
            content: '\u7F16\u8F91\u529F\u80FD\u5C1A\u672A\u5F00\u653E',
            duration: 1500,
          })
        }
      >
        <IconEdit />
      </button>

      {personaId ? (
        <div className={styles.avatarWrap}>
          <PersonaAvatar id={personaId} />
        </div>
      ) : (
        <div className={styles.avatarPlaceholder}>{'\uD83C\uDF0D'}</div>
      )}

      <h1 className={styles.nickname}>{nickname ?? '\u65C5\u884C\u8005'}</h1>

      <span className={styles.personaBadge}>
        {'\u2728'} {mbtiTypeCn ?? '\u672A\u77E5'}
      </span>

      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>
      )}

      {tagline && <p className={styles.declaration}>{tagline}</p>}
    </section>
  )
}
