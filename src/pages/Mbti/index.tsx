import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTripStore } from '@/store/useTripStore'
import type { ChoiceLetter, PersonaId } from '@/types/mbti'
import { navigateBackOr } from '@/utils/navigation'
import { getPersonaPresentation } from '@/utils/personaPresentation'
import { IdentityCard } from './components/IdentityCard'
import { Quiz } from './components/Quiz'
import { Welcome } from './components/Welcome'
import { PERSONALITIES } from './data'
import { calculateResult, makeNickname, readDestParam } from './logic'
import styles from './Mbti.module.less'

export type MbtiView = 'welcome' | 'quiz' | 'result'

interface MbtiProps {
  view: MbtiView
}

function Mbti({ view }: MbtiProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const resultId = useTripStore((s) => s.personaId)
  const sessionDestination = useTripStore((s) => s.destination)
  const setMbtiResult = useTripStore((s) => s.setMbtiResult)
  const setDestination = useTripStore((s) => s.setDestination)

  const queryDest = searchParams.get('dest')
  const destination = readDestParam(queryDest ?? sessionDestination)

  useEffect(() => {
    setDestination(destination)
  }, [destination, setDestination])

  const finalize = (
    personaId: PersonaId,
    opts: { skipped: boolean; scores?: Record<PersonaId, number> },
  ) => {
    const persona = PERSONALITIES[personaId]
    const presentation = getPersonaPresentation(personaId)
    const nickname = makeNickname(persona)
    setMbtiResult({
      personaId,
      mbtiTypeCn: presentation.tripkinTitleCn,
      mbtiTypeEn: presentation.tripkinTitleEn,
      classicMbti: presentation.classicMbti,
      tagline: presentation.tagline,
      tags: presentation.tags,
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
    navigate('/mbti/result')
  }

  const handleQuizComplete = (answers: ChoiceLetter[]) => {
    const { result, scores } = calculateResult(answers)
    finalize(result, { skipped: false, scores })
  }

  const handleSkip = () => {
    navigate('/map')
  }

  const handleBackToMbti = () => {
    navigateBackOr(navigate, '/mbti')
  }

  return (
    <main className={styles.page}>
      {view === 'welcome' && (
        <Welcome
          onStart={() => navigate('/mbti/test')}
          onViewResult={() => navigate('/mbti/result')}
          onSkip={handleSkip}
        />
      )}
      {view === 'quiz' && (
        <Quiz onComplete={handleQuizComplete} onBack={handleBackToMbti} />
      )}
      {view === 'result' && resultId && (
        <IdentityCard personaId={resultId} onBack={handleBackToMbti} />
      )}
      {view === 'result' && !resultId && (
        <section className={styles.emptyResult}>
          <p>还没有可展示的旅行 MBTI 结果。</p>
          <button type="button" onClick={() => navigate('/mbti')}>
            返回 MBTI 首页
          </button>
        </section>
      )}
    </main>
  )
}

export default Mbti
