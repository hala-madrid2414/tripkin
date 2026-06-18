import { useState, type SyntheticEvent } from 'react'
import styles from './Bottle.module.less'

type BottleMessage = {
  id: string
  nickname: string
  from: string
  to: string
  content: string
  tags: string[]
  time: string
  imageUrl?: string
}

const createMockImage = (primary: string, secondary: string, accent: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="${primary}" />
          <stop offset="1" stop-color="${secondary}" />
        </linearGradient>
        <linearGradient id="path" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0.35" />
          <stop offset="1" stop-color="#ffffff" stop-opacity="0.82" />
        </linearGradient>
      </defs>
      <rect width="640" height="420" rx="34" fill="url(#bg)" />
      <circle cx="112" cy="88" r="58" fill="#ffffff" opacity="0.2" />
      <circle cx="540" cy="82" r="82" fill="${accent}" opacity="0.38" />
      <path d="M72 292 C172 198 248 348 352 234 S502 168 586 248" fill="none" stroke="url(#path)" stroke-width="18" stroke-linecap="round" />
      <path d="M0 330 C120 288 220 356 340 314 S526 284 640 328 V420 H0 Z" fill="#ffffff" opacity="0.28" />
      <path d="M84 128 L194 106 L210 214 L102 238 Z" fill="#ffffff" opacity="0.78" />
      <path d="M112 156 H184 M118 184 H176 M124 210 H164" stroke="${accent}" stroke-width="10" stroke-linecap="round" opacity="0.78" />
      <circle cx="456" cy="244" r="16" fill="#ffffff" opacity="0.75" />
      <circle cx="492" cy="218" r="9" fill="#ffffff" opacity="0.62" />
    </svg>
  `)}`

const defaultBottleImage = createMockImage('#f0edff', '#d9d2ff', '#6c5cf6')

const mockBottles: BottleMessage[] = [
  {
    id: 'mock-1',
    nickname: '海边的风',
    from: '重庆',
    to: '大理',
    content:
      '想找一个不赶路的人，一起在洱海边慢慢等日落，把手机放进口袋，只听风和水声。',
    tags: ['慢旅行', '看海', '日落'],
    time: '3 分钟前',
    imageUrl: createMockImage('#8f82ff', '#f3f0ff', '#6c5cf6'),
  },
  {
    id: 'mock-2',
    nickname: '山城旅人',
    from: '成都',
    to: '川西',
    content:
      '想在雪山脚下住一晚，早上推开窗就能看到云和光，晚上围着炉子听别人讲路上的故事。',
    tags: ['川西', '雪山', '周末出发'],
    time: '今天下午',
    imageUrl: createMockImage('#6e5bff', '#d9e6ff', '#5146d9'),
  },
  {
    id: 'mock-3',
    nickname: '拿铁加冰',
    from: '杭州',
    to: '厦门',
    content:
      '希望下一次旅行不用排满攻略，只带一本书，坐在海边咖啡店里发呆一整个下午。',
    tags: ['海边咖啡', '放空', '一个人也行'],
    time: '12 分钟前',
    imageUrl: createMockImage('#c3b8ff', '#f7f8fc', '#7d6bff'),
  },
  {
    id: 'mock-4',
    nickname: '夜航星',
    from: '广州',
    to: '青岛',
    content:
      '想和同频的人一起坐一次夜车，醒来时城市已经换了颜色，然后去吃第一顿热乎乎的早餐。',
    tags: ['城市漫游', '同频搭子', '早餐'],
    time: '刚刚漂来',
    imageUrl: createMockImage('#5146d9', '#a79cff', '#f0edff'),
  },
  {
    id: 'mock-5',
    nickname: '橘子汽水',
    from: '武汉',
    to: '泉州',
    content:
      '想去有风、有老街、有甜汤的地方，把每一天都过得很慢，再给未来的自己寄一张明信片。',
    tags: ['老街', '甜汤', '明信片'],
    time: '1 小时前',
    imageUrl: createMockImage('#7a6cff', '#fff3f7', '#6c5cf6'),
  },
]

function Bottle() {
  const [currentBottle, setCurrentBottle] = useState<BottleMessage>(
    mockBottles[0],
  )
  const [bottleList, setBottleList] = useState<BottleMessage[]>(mockBottles)
  const [wishText, setWishText] = useState('')
  const [destinationText, setDestinationText] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState('')

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = defaultBottleImage
  }

  const handlePickBottle = () => {
    const candidates = bottleList.filter((item) => item.id !== currentBottle.id)

    if (candidates.length === 0) {
      setFeedbackMessage('海面很安静，暂时还是这只瓶子。')
      return
    }

    const nextBottle = candidates[Math.floor(Math.random() * candidates.length)]
    setCurrentBottle(nextBottle)
    setFeedbackMessage('海浪送来了新的漂流瓶。')
  }

  const handleSendBottle = () => {
    const content = wishText.trim()

    if (!content) {
      setFeedbackMessage('先写下一点旅行心愿吧。')
      return
    }

    const newBottle: BottleMessage = {
      id: `user-${Date.now()}`,
      nickname: '我投出的瓶子',
      from: '此刻',
      to: destinationText.trim() || '还没决定',
      content,
      tags: ['我的心愿', '等待回应'],
      time: '刚刚',
      imageUrl: defaultBottleImage,
    }

    setBottleList((prevList) => [newBottle, ...prevList])
    setCurrentBottle(newBottle)
    setWishText('')
    setDestinationText('')
    setFeedbackMessage('你的漂流瓶已经漂向远方。')
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="bottle-title">
        <div>
          <p className={styles.route}>/bottle</p>
          <h1 id="bottle-title">旅行漂流瓶</h1>
          <p className={styles.description}>
            在旅行地图上捡起一张纸条，也把自己的心愿扔向远方。
          </p>
        </div>
        <div className={styles.mapBadge} aria-hidden="true">
          <span>✦</span>
        </div>
      </section>

      <section className={styles.currentBottle} aria-label="当前漂流瓶">
        <div className={styles.cardHeader}>
          <div>
            <p className={styles.label}>当前漂来的瓶子</p>
            <h2>{currentBottle.nickname}</h2>
          </div>
          <span className={styles.bottleIcon} aria-hidden="true">
            🍾
          </span>
        </div>

        <div className={styles.flowLine}>
          <span>{currentBottle.from}</span>
          <i aria-hidden="true" />
          <em>漂向</em>
          <i aria-hidden="true" />
          <span>{currentBottle.to}</span>
        </div>

        <div className={styles.coverImage}>
          <img
            src={currentBottle.imageUrl || defaultBottleImage}
            alt={`${currentBottle.nickname} 的旅行图片`}
            onError={handleImageError}
          />
        </div>

        <div className={styles.message}>
          <p>{currentBottle.content}</p>
        </div>

        <div className={styles.tags}>
          {currentBottle.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <p className={styles.time}>{currentBottle.time}</p>
      </section>

      <button
        className={styles.pickButton}
        type="button"
        onClick={handlePickBottle}
      >
        捡一个漂流瓶
      </button>

      <section className={styles.sendPanel} aria-labelledby="send-title">
        <div className={styles.sectionTitle}>
          <p className={styles.label}>扔一个漂流瓶</p>
          <h2 id="send-title">写下这次想出发的理由</h2>
          <span>内容将关联到当前地点，漂向可能同路的人。</span>
        </div>

        <div className={styles.typeOptions} aria-label="瓶子类型">
          <span className={styles.typeActive}>普通瓶</span>
          <span>心情瓶</span>
        </div>

        <label className={styles.field}>
          <span>想去哪里</span>
          <input
            value={destinationText}
            onChange={(event) => setDestinationText(event.target.value)}
            placeholder="例如：大理、泉州、还没决定"
          />
        </label>

        <label className={styles.field}>
          <span>旅行心愿</span>
          <textarea
            value={wishText}
            onChange={(event) => setWishText(event.target.value)}
            placeholder="写下一段想被回应的旅行心愿"
            rows={4}
          />
        </label>

        <div className={styles.imagePlaceholder} aria-hidden="true">
          <span>＋</span>
          <p>添加图片（可选）</p>
        </div>

        <button
          className={styles.sendButton}
          type="button"
          onClick={handleSendBottle}
        >
          扔出去
        </button>

        {feedbackMessage && (
          <p className={styles.feedback} role="status">
            {feedbackMessage}
          </p>
        )}
      </section>

      <section className={styles.listSection} aria-labelledby="recent-title">
        <div className={styles.sectionTitle}>
          <p className={styles.label}>最近漂来的瓶子</p>
          <h2 id="recent-title">也许有人正想去同一个地方</h2>
        </div>

        <div className={styles.bottleList}>
          {bottleList.map((bottle) => (
            <article className={styles.listCard} key={bottle.id}>
              <div className={styles.listThumb}>
                <img
                  src={bottle.imageUrl || defaultBottleImage}
                  alt={`${bottle.nickname} 的旅行图片`}
                  onError={handleImageError}
                />
              </div>
              <div className={styles.listBody}>
                <div className={styles.listMeta}>
                  <strong>{bottle.nickname}</strong>
                  <span>{bottle.time}</span>
                </div>
                <p className={styles.routeLine}>
                  {bottle.from} <span>漂向</span> {bottle.to}
                </p>
                <p className={styles.listContent}>{bottle.content}</p>
                <div className={styles.tags}>
                  {bottle.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Bottle
