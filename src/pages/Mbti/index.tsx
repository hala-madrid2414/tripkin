import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTripStore } from '@/store/useTripStore'
import type { ChoiceLetter, PersonaId } from '@/types/mbti'
import { PERSONALITIES } from './data'
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

  // 目的地：URL ?dest= 覆盖，缺省「西藏」
  const destination = readDestParam(searchParams.get('dest'))

  // 进入页面时把目的地同步进跨页面 store，供 /map 消费
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

  const handleQuizBack = () => {
    setView('welcome')
  }

  const handleSkip = () => {
    navigate('/map')
  }

  const handleGoMap = () => {
    navigate('/map')
  }

  const handleRestart = () => {
    setResultId(null)
    setView('welcome')
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
      {view === 'quiz' && (
        <Quiz onComplete={handleQuizComplete} onBack={handleQuizBack} />
      )}
      {view === 'result' && resultId && (
        <IdentityCard
          personaId={resultId}
          onGoMap={handleGoMap}
          onRestart={handleRestart}
        />
      )}
    </main>
  )
}

export default Mbti
