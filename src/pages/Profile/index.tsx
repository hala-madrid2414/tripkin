import styles from './Profile.module.less'

const profileStats = [
  { label: '旅行灵感', value: '--' },
  { label: '漂流瓶', value: '--' },
  { label: '搭子匹配', value: '--' },
]

const profileSections = [
  {
    title: '我的旅行',
    description: '预留足迹、收藏目的地和即将出发的行程入口。',
  },
  {
    title: '互动记录',
    description: '预留漂流瓶、搭子申请和消息通知入口。',
  },
  {
    title: '账号设置',
    description: '预留资料编辑、偏好设置和隐私安全入口。',
  },
]

function Profile() {
  return (
    <main className={styles.page}>
      <section className={styles.header} aria-labelledby="profile-title">
        <div className={styles.avatar} aria-hidden="true">
          TK
        </div>
        <div className={styles.identity}>
          <p className={styles.route}>/profile</p>
          <h1 id="profile-title">个人主页</h1>
          <p>这里承接用户资料、旅行资产和个人设置。</p>
        </div>
      </section>

      <section className={styles.stats} aria-label="个人数据概览">
        {profileStats.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className={styles.content} aria-label="个人主页功能区">
        {profileSections.map((section) => (
          <article key={section.title} className={styles.panel}>
            <div>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>
            <span aria-hidden="true">›</span>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Profile
