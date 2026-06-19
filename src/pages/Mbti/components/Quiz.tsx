import { useState } from 'react'
import type { ChoiceLetter } from '@/types/mbti'
import { QUESTIONS } from '../data'
import styles from '../Mbti.module.less'

interface QuizProps {
  onComplete: (answers: ChoiceLetter[]) => void
}

const OPTION_LETTERS: ChoiceLetter[] = ['A', 'B']

export function Quiz({ onComplete }: QuizProps) {
  const total = QUESTIONS.length
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<ChoiceLetter[]>([])
  const [selected, setSelected] = useState<ChoiceLetter | null>(null)

  const question = QUESTIONS[current]

  const choose = (letter: ChoiceLetter) => {
    if (selected) return
    setSelected(letter)
    const nextAnswers = [...answers, letter]
    window.setTimeout(() => {
      if (current < total - 1) {
        setAnswers(nextAnswers)
        setCurrent((c) => c + 1)
        setSelected(null)
      } else {
        onComplete(nextAnswers)
      }
    }, 360)
  }

  return (
    <div className={styles.quiz}>
      <div className={styles.progress}>
        <div className={styles.bar}>
          <div
            className={styles.barFill}
            style={{ width: `${((current + 1) / total) * 100}%` }}
          />
        </div>
        <div className={styles.meta}>
          <span className={styles.step}>
            {current + 1} / {total}
          </span>
          <div className={styles.dots}>
            {Array.from({ length: total }, (_, i) => (
              <span
                key={i}
                className={i <= current ? styles.dotOn : styles.dot}
              />
            ))}
          </div>
        </div>
      </div>

      <article className={`${styles.glass} ${styles.card}`}>
        <p className={styles.qIndex}>
          Q.{String(current + 1).padStart(2, '0')}
        </p>
        <h2 className={styles.qTitle}>{question.title}</h2>
        <div className={styles.options}>
          {OPTION_LETTERS.map((letter) => (
            <button
              key={letter}
              type="button"
              className={`${styles.opt} ${selected === letter ? styles.optSelected : ''}`}
              onClick={() => choose(letter)}
              disabled={selected !== null}
            >
              <span className={styles.optBadge}>{letter}</span>
              <span className={styles.optText}>{question.options[letter]}</span>
            </button>
          ))}
        </div>
      </article>

      <p className={styles.tip}>点击选项自动进入下一题</p>
    </div>
  )
}
