function Education({ onNext, hasNext, language = 'en' }) {
  const isZh = language === 'zh'

  return (
    <div className="education">
      <h2>{isZh ? '教育背景' : 'Education'}</h2>

      <div className="education-item">
        <h3>{isZh ? '加州大学欧文分校（University of California, Irvine）' : 'University of California, Irvine'}</h3>
        <p className="location">{isZh ? 'Irvine, California, USA' : 'Irvine, California'}</p>
        <p className="degree">{isZh ? '数据科学硕士（Master of Data Science）' : 'Master of Data Science'}</p>
        <p className="period">{isZh ? '预计 2026 年 12 月毕业' : 'Expected December 2026'}</p>
        <p>
          {isZh
            ? '在 UCI 攻读数据科学硕士期间，我系统学习了数据分析、统计建模、机器学习与深度学习等领域的课程，并通过项目实践提升自己在大规模数据处理与建模方面的能力。'
            : 'Currently pursuing advanced studies in data science, machine learning, and artificial intelligence, with a focus on data analysis, statistical modeling, and predictive analytics.'}
        </p>
      </div>

      <div className="education-item">
        <h3>{isZh ? '伦斯勒理工学院（Rensselaer Polytechnic Institute）' : 'Rensselaer Polytechnic Institute'}</h3>
        <p className="location">{isZh ? 'Troy, New York, USA' : 'Troy, New York'}</p>
        <p className="degree">
          {isZh ? '信息技术与 Web 科学学士（B.S., Information Technology & Web Science）' : 'B.S., Information Technology & Web Science'}
        </p>
        <p className="period">2021 - 2024</p>
        <p>
          {isZh
            ? '信息技术与 Web 科学专业曾被 College Choice 评为全美排名第一的项目。在这里，我系统掌握了 Web 开发、数据库系统、算法与数据结构、软件工程等核心知识，并通过团队项目与实践课程积累了丰富的工程经验。'
            : 'Graduated with a degree in Information Technology and Web Science, a program ranked #1 nationwide by College Choice in 2017. Gained comprehensive knowledge in web development, database systems, algorithms, and software engineering through rigorous coursework and hands-on projects.'}
        </p>
      </div>

      {hasNext && (
        <button className="next-section-btn" onClick={onNext}>
          {isZh ? '下一页：项目 →' : 'Next: Projects →'}
        </button>
      )}
    </div>
  )
}

export default Education

