import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTripStore } from '@/store/useTripStore'
import type { ChoiceLetter, PersonaId } from '@/types/mbti'
import { PERSONALITIES, TIE_PRIORITY } from './data'
import { calculateResult, makeNickname, readDestParam } from './logic'
import { Welcome } from './components/Welcome'
import { Quiz } from './components/Quiz'
import { IdentityCard } from './components/IdentityCard'
import styles from './Mbti.module.less'

type View = 'welcome' | 'quiz' | 'result'

function Mbti() {
  const [view, setView] = useState<View>('welcome')
  const [resultId, setResultId] = useState<PersonaId | null>(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const setMbtiResult = useTripStore((s) => s.setMbtiResult)
  const setDestination = useTripStore((s) => s.setDestination)

  const destination = readDestParam(searchParams.get('dest'))

  useEffect(() => {
    setDestination(destination)
  }, [destination, setDestination])

  const finalize = (
    personaId: PersonaId,
    opts: { skipped: boolean; scores?: Record<PersonaId, number> },
  ) => {
    const persona = PERSONALITIES[personaId]
    const nickname = makeNickname(persona)
    setResultId(personaId)
    setMbtiResult({
      personaId,
      mbtiTypeCn: persona.titleCn,
      mbtiTypeEn: persona.titleEn,
      tagline: persona.tagline,
      tags: persona.tags,
      nickname,
      destination,
      avatarKey: personaId,
      accent: persona.accent,
      socialIntent: {
        dest: destination,
        style: persona.traits.style,
        intent: persona.intentLine,
      },
      skipped: opts.skipped,
      rawScores: opts.scores ?? {},
    })
    setView('result')
  }

  const handleQuizComplete = (answers: ChoiceLetter[]) => {
    const { result, scores } = calculateResult(answers)
    finalize(result, { skipped: false, scores })
  }

  const handleSkip = () => {
    const id = TIE_PRIORITY[Math.floor(Math.random() * TIE_PRIORITY.length)]
    finalize(id, { skipped: true })
  }

  const handleGoMap = () => {
    navigate('/map')
  }

  return (
    <main className={styles.page}>
      {view === 'welcome' && (
        <Welcome
          destination={destination}
          onStart={() => setView('quiz')}
          onSkip={handleSkip}
        />
      )}
      {view === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
      {view === 'result' && resultId && (
        <IdentityCard personaId={resultId} onGoMap={handleGoMap} />
      )}

      <button
        type="button"
        className={styles.profileEntry}
        onClick={() => navigate('/profile')}
        aria-label="个人主页"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>
    </main>
  )
}

export default Mbti
