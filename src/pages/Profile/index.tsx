import BottomNav from '@/components/BottomNav'
import styles from './Profile.module.less'

const profileStats = [
  { label: '实名状态', value: '未认证' },
  { label: '申请记录', value: '2' },
  { label: '安全提醒', value: '1' },
]

const profileSections = [
  {
    title: '个人资料',
    description: '管理头像、常驻城市、公开昵称和资料可见范围。',
  },
  {
    title: '旅行偏好',
    description: '查看或重新测试旅行人格，补充节奏、预算和兴趣标签。',
  },
  {
    title: '实名 / 安全中心',
    description: '完成手机号验证、实名状态、风险提示和安全须知。',
  },
  {
    title: '我的行程与申请',
    description: '查看已申请、待处理、已通过或已过期的同行记录。',
  },
  {
    title: '黑名单与举报',
    description: '管理已拉黑用户，查看举报入口和平台处理状态。',
  },
  {
    title: '隐私设置',
    description: '控制年龄段、性别、旅行记录和联系方式的展示范围。',
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
          <p>这里承接旅行偏好、安全信任、申请记录和隐私设置。</p>
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
      <BottomNav />
    </main>
  )
}

export default Profile
