function Hobby({ onNext, hasNext, language = 'en' }) {
  const isZh = language === 'zh'

  return (
    <div className="hobby">
      <h2>{isZh ? '爱好' : 'Hobby'}</h2>

      <div className="hobby-item">
        <h3>{isZh ? '公路骑行' : 'Road Cycling'}</h3>
        <p>
          {isZh
            ? '我非常热爱公路骑行，也喜欢不断探索新的路线。今年我的骑行里程已经接近 '
            : "I'm passionate about road cycling and love exploring new routes. I've clocked almost "}
          <b>10,000 km</b>
          {isZh
            ? '。对我来说，骑车不仅是兴趣，也是持续挑战自我的方式——每一趟骑行我都会努力提升自己的表现和功率指标。'
            : " this year! Cycling is not just a hobby for me, I'm pushing myself to be better for every ride, chasing my power goal!"}
        </p>
      </div>

      <div className="hobby-item">
        <h3>{isZh ? '王者荣耀（Honor of Kings）' : 'Honor of Kings'}</h3>
        <p>
          {isZh
            ? '我也喜欢玩王者荣耀，这是一款强调团队协作和策略思考的 MOBA 手游，是我放松和娱乐的方式之一。孙尚香是我最常用、也是最擅长的英雄。'
            : "I enjoy playing Honor of Kings (王者荣耀), a strategic mobile MOBA game. It's a great way to unwind and challenge myself. Lady Sun is my go-to hero every time!"}
        </p>
      </div>
    </div>
  )
}

export default Hobby

