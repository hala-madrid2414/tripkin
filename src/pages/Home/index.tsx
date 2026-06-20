import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.less'

type RoutePath = '/' | '/map' | '/mbti' | '/bottle' | '/match' | '/profile'

type QuickAction = {
  title: string
  icon: string
  action: () => void
}

type RecommendCard = {
  title: string
  description: string
  tag: string
  visualClass: string
  badge?: string
  route: RoutePath
}

type SearchItem = {
  title: string
  type: string
  description: string
  keywords: string[]
  route: RoutePath
  requiresMbtiModal?: boolean
}

const mockSearchItems: SearchItem[] = [
  {
    title: '大理 · 洱海',
    type: '地图推荐',
    description: '风花雪月，治愈心灵的蓝色之旅',
    keywords: ['大理', '洱海', '云南', '地图', '旅行'],
    route: '/map',
  },
  {
    title: '周末轻徒步',
    type: '搭子广场',
    description: '龙泉山轻徒步，呼吸自然清新空气',
    keywords: ['徒步', '周末', '搭子', '活动', '行程'],
    route: '/match',
  },
  {
    title: '来自厦门的问候',
    type: '漂流瓶',
    description: '想找一起去看海的小伙伴',
    keywords: ['厦门', '看海', '漂流瓶', '聊天'],
    route: '/bottle',
  },
  {
    title: '旅行 MBTI',
    type: 'MBTI',
    description: '测试你的旅行人格',
    keywords: ['mbti', '人格', '测试', '旅行mbti'],
    route: '/mbti',
    requiresMbtiModal: true,
  },
  {
    title: '成都搭子',
    type: '搭子广场',
    description: '找同城旅行搭子，一起出发',
    keywords: ['成都', '搭子', '同城', '结伴'],
    route: '/match',
  },
]

function getSearchText(item: SearchItem) {
  return `${item.title} ${item.type} ${item.description} ${item.keywords.join(' ')}`.toLowerCase()
}

function getGreeting() {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) {
    return '早上好'
  }

  if (hour >= 12 && hour < 18) {
    return '下午好'
  }

  if (hour >= 18 && hour < 24) {
    return '晚上好'
  }

  return '夜深了'
}

function Home() {
  const navigate = useNavigate()
  const [isMbtiModalOpen, setIsMbtiModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const greeting = useMemo(() => getGreeting(), [])
  const searchResults = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    if (!keyword) {
      return mockSearchItems.slice(0, 4)
    }

    return mockSearchItems.filter((item) =>
      getSearchText(item).includes(keyword),
    )
  }, [searchQuery])

  const openMbtiModal = () => {
    setIsMbtiModalOpen(true)
  }

  const closeMbtiModal = () => {
    setIsMbtiModalOpen(false)
  }

  const enterMbti = () => {
    setIsMbtiModalOpen(false)
    navigate('/mbti')
  }

  const selectSearchItem = (item: SearchItem) => {
    setSearchQuery(item.title)
    setIsSearchFocused(false)

    if (item.requiresMbtiModal) {
      openMbtiModal()
      return
    }

    navigate(item.route)
  }

  const submitSearch = () => {
    if (searchResults[0]) {
      selectSearchItem(searchResults[0])
    }
  }

  const quickActions: QuickAction[] = [
    {
      title: '旅行地图',
      icon: 'map',
      action: () => navigate('/map'),
    },
    {
      title: '旅行 MBTI',
      icon: 'star',
      action: openMbtiModal,
    },
    {
      title: '漂流瓶',
      icon: 'bottle',
      action: () => navigate('/bottle'),
    },
    {
      title: '搭子广场',
      icon: 'people',
      action: () => navigate('/match'),
    },
  ]

  const recommendCards: RecommendCard[] = [
    {
      title: '大理 · 洱海',
      description: '风花雪月，治愈心灵的蓝色之旅',
      tag: '匹配度 95%',
      visualClass: styles.visualLake,
      badge: '地图推荐',
      route: '/map',
    },
    {
      title: '周末轻徒步 · 3人想加入',
      description: '龙泉山轻徒步，呼吸自然清新空气',
      tag: 'ENFP · 活跃友好',
      visualClass: styles.visualHike,
      badge: '周末活动',
      route: '/match',
    },
    {
      title: '来自厦门的问候',
      description: '想找一起去看海的小伙伴',
      tag: '去捞一个',
      visualClass: styles.visualBottle,
      badge: '漂流瓶',
      route: '/bottle',
    },
  ]

  return (
    <main className={styles.page}>
      <div className={styles.homePage}>
        <section className={styles.statusBar} aria-label="手机状态栏">
          <span className={styles.statusTime}>9:41</span>
          <span className={styles.statusIcons} aria-hidden="true">
            <span className={styles.signal}>
              <span />
              <span />
              <span />
              <span />
            </span>
            <span className={styles.wifi} />
            <span className={styles.battery}>
              <span />
            </span>
          </span>
        </section>

        <div className={styles.content}>
          <section className={styles.header}>
            <div>
              <h1>{greeting} 👋</h1>
              <p>发现灵感，找到同行的人</p>
            </div>
            <button
              className={styles.weatherPill}
              type="button"
              aria-label="成都天气，多云"
            >
              <span>🌥</span>
              成都 · 24°C 多云
              <span className={styles.chevron}>›</span>
            </button>
          </section>

          <div
            className={styles.searchWrap}
            onBlur={(event) => {
              const nextTarget = event.relatedTarget

              if (
                !(nextTarget instanceof Node) ||
                !event.currentTarget.contains(nextTarget)
              ) {
                setIsSearchFocused(false)
              }
            }}
          >
            <form
              className={styles.searchBox}
              role="search"
              aria-label="首页搜索"
              onSubmit={(event) => {
                event.preventDefault()
                submitSearch()
              }}
            >
              <span className={styles.searchIcon} aria-hidden="true" />
              <input
                className={styles.searchInput}
                type="search"
                value={searchQuery}
                placeholder="搜索目的地 / 搭子 / 灵感"
                onChange={(event) => setSearchQuery(event.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              {searchQuery ? (
                <button
                  className={styles.clearSearch}
                  type="button"
                  aria-label="清空搜索"
                  onClick={() => {
                    setSearchQuery('')
                    setIsSearchFocused(true)
                  }}
                >
                  ×
                </button>
              ) : (
                <span className={styles.scanIcon} aria-hidden="true" />
              )}
            </form>

            {isSearchFocused ? (
              <section className={styles.searchPanel} aria-label="搜索结果">
                <div className={styles.searchPanelTitle}>
                  {searchQuery.trim() ? '搜索结果' : '热门搜索'}
                </div>
                {searchResults.length > 0 ? (
                  <div className={styles.searchList}>
                    {searchResults.map((item) => (
                      <button
                        className={styles.searchResult}
                        key={item.title}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => selectSearchItem(item)}
                      >
                        <span>
                          <strong>{item.title}</strong>
                          <em>{item.type}</em>
                        </span>
                        <small>{item.description}</small>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className={styles.searchEmpty}>暂时没有找到相关内容</p>
                )}
              </section>
            ) : null}
          </div>

          <section className={styles.banner} aria-labelledby="banner-title">
            <div className={styles.bannerCopy}>
              <h2 id="banner-title">开始你的旅行探索 ✦</h2>
              <p>测 MBTI、找搭子、做计划</p>
              <button
                className={styles.bannerButton}
                type="button"
                onClick={openMbtiModal}
              >
                测测我的旅行 MBTI
                <span>→</span>
              </button>
            </div>
            <div className={styles.bannerArt} aria-hidden="true">
              <span className={styles.cloudOne} />
              <span className={styles.cloudTwo} />
              <span className={styles.balloonOne}>ENFP</span>
              <span className={styles.balloonTwo} />
              <span className={styles.mountainBack} />
              <span className={styles.mountainFront} />
              <span className={styles.lake} />
              <span className={styles.routePath} />
              <span className={styles.mapCard}>
                <span className={styles.mapLineOne} />
                <span className={styles.mapLineTwo} />
                <span className={styles.compass} />
              </span>
              <span className={styles.pin}>⌖</span>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="quick-title">
            <h2 id="quick-title" className={styles.sectionTitle}>
              快捷功能
            </h2>
            <div className={styles.quickGrid}>
              {quickActions.map((item) => (
                <button
                  className={styles.quickCard}
                  key={item.title}
                  type="button"
                  onClick={item.action}
                >
                  <span
                    className={`${styles.quickIcon} ${styles[item.icon]}`}
                    aria-hidden="true"
                  />
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="recommend-title">
            <div className={styles.sectionHeader}>
              <h2 id="recommend-title" className={styles.sectionTitle}>
                今日推荐
              </h2>
              <button
                className={styles.moreButton}
                type="button"
                onClick={() => navigate('/map')}
              >
                查看更多 <span>›</span>
              </button>
            </div>
            <div className={styles.recommendGrid}>
              {recommendCards.map((card) => (
                <button
                  className={styles.recommendCard}
                  key={card.title}
                  type="button"
                  onClick={() => navigate(card.route)}
                >
                  <span
                    className={`${styles.recommendVisual} ${card.visualClass}`}
                  >
                    {card.badge ? (
                      <span className={styles.visualBadge}>{card.badge}</span>
                    ) : null}
                  </span>
                  <span className={styles.recommendBody}>
                    <strong>{card.title}</strong>
                    <span>{card.description}</span>
                    <em>{card.tag}</em>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.mixGrid} aria-label="热门搭子和最近漂流瓶">
            <button
              className={styles.mixCard}
              type="button"
              onClick={() => navigate('/match')}
            >
              <span className={styles.mixHeader}>
                <strong>热门搭子</strong>
                <span>更多 ›</span>
              </span>
              <span className={styles.partnerRow}>
                <span className={styles.avatarStack} aria-hidden="true">
                  <span>🧢</span>
                  <span>📷</span>
                </span>
                <span>
                  <strong>小鹿旅行中</strong>
                  <em>ENFP</em>
                </span>
              </span>
              <span className={styles.meta}>成都 · 2小时前</span>
              <span className={styles.mixDesc}>
                计划去川西 5 天，找摄影搭子
              </span>
              <span className={styles.mixTag}>3/4 人想加入</span>
            </button>

            <button
              className={styles.mixCard}
              type="button"
              onClick={() => navigate('/bottle')}
            >
              <span className={styles.mixHeader}>
                <strong>最近漂流瓶</strong>
                <span>更多 ›</span>
              </span>
              <span className={styles.bottleRow}>
                <span className={styles.bottleIcon} aria-hidden="true">
                  🧴
                </span>
                <span>
                  <strong>6月的风</strong>
                  <span className={styles.meta}>2分钟前 · 来自青岛</span>
                </span>
              </span>
              <span className={styles.mixDesc}>
                一个人散步在栈桥，想找人聊聊～
              </span>
              <span className={styles.mixTag}>想捞聊天搭子</span>
            </button>
          </section>
        </div>

        <nav className={styles.bottomNav} aria-label="首页底部导航">
          <button
            className={styles.navItemActive}
            type="button"
            onClick={() => navigate('/')}
          >
            <span className={styles.navHomeIcon} aria-hidden="true" />
            首页
          </button>
          <button
            className={styles.navItem}
            type="button"
            onClick={() => navigate('/map')}
          >
            <span className={styles.navMapIcon} aria-hidden="true" />
            地图
          </button>
          <button
            className={styles.navItem}
            type="button"
            onClick={openMbtiModal}
          >
            <span className={styles.navMbtiIcon} aria-hidden="true" />
            MBTI
          </button>
          <button
            className={styles.navItem}
            type="button"
            onClick={() => navigate('/profile')}
          >
            <span className={styles.navMineIcon} aria-hidden="true" />
            我的
          </button>
        </nav>
      </div>

      {isMbtiModalOpen ? (
        <div
          className={styles.modalMask}
          role="presentation"
          onClick={closeMbtiModal}
        >
          <section
            className={styles.mbtiModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mbti-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalIcon} aria-hidden="true">
              ✦
            </div>
            <h2 id="mbti-modal-title">开启你的旅行 MBTI</h2>
            <p>用几个问题找到你的旅行人格、适合目的地和同行搭子。</p>
            <button
              className={styles.modalPrimary}
              type="button"
              onClick={enterMbti}
            >
              进入 MBTI 首页
            </button>
            <button
              className={styles.modalSecondary}
              type="button"
              onClick={closeMbtiModal}
            >
              稍后再说
            </button>
          </section>
        </div>
      ) : null}
    </main>
  )
}

export default Home
