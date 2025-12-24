import { useState } from 'react'

function Projects({ onNext, hasNext, language = 'en' }) {
  const [expandedProjects, setExpandedProjects] = useState({})
  const isZh = language === 'zh'

  const toggleProject = (projectId) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }))
  }

  const expandLabel = (id) =>
    expandedProjects[id]
      ? isZh
        ? '收起详情'
        : 'Collapse Details'
      : isZh
      ? '展开详情'
      : 'Expand Details'

  return (
    <div className="projects">
      <h2>{isZh ? '项目' : 'Projects'}</h2>

      <div className="project-item">
        <h3>{isZh ? '具备用户级隐私保护的轨迹生成与映射' : 'Trajectory Mapping with User Level Privacy'}</h3>
        <p className="project-role">{isZh ? '机器学习开发者' : 'Machine Learning Developer'}</p>
        <p className="project-description">
          {isZh
            ? '利用机器学习构建合成模型，在严格执行用户级差分隐私的前提下，生成逼真的地图轨迹数据集。'
            : 'Synthesis model utilizing machine learning to generate a realistic map trajectory dataset while strictly enforcing user-level differential privacy.'}
        </p>
        <button
          className="expand-btn"
          onClick={() => toggleProject('trajectory')}
          aria-expanded={expandedProjects['trajectory']}
        >
          {expandLabel('trajectory')}
        </button>
        <ul className={`project-bullets ${expandedProjects['trajectory'] ? 'expanded' : 'collapsed'}`}>
          <li>
            {isZh
              ? '基于 OpenStreetMap 与 OSMnx 对原始轨迹数据进行清洗和高精度地图匹配，构建可靠的道路网络表示。'
              : 'Employed OpenStreetMap and OSMnx for robust data cleaning and precise map matching of raw trajectory datasets.'}
          </li>
          <li>
            {isZh
              ? '使用 NumPy 与 PyTorch 设计并训练生成模型，在合成轨迹数据时保留原始数据集的统计特征与分布规律。'
              : "Developed and trained a dedicated generative model using NumPy and PyTorch to synthesize trajectory data, successfully preserving the original dataset's statistical trends and features."}
          </li>
          <li>
            {isZh
              ? '借助 Opacus 构建用户级差分隐私框架，在训练过程中监控模型更新并量化每个用户的数据隐私消耗。'
              : 'Built a user-level privacy framework using Opacus to monitor model updates and enforce differential privacy (DP), quantifying and protecting individual user data contributions.'}
          </li>
          <li>
            {isZh
              ? '设计专门的地图行走算法，在不同隐私参数设定下生成并评估合成轨迹，为隐私保护强度提供可调节选项。'
              : 'Engineered a specialized map-walking algorithm to generate and test synthetic trajectory datasets under varying differential privacy parameters, allowing for tunable levels of privacy protection.'}
          </li>
        </ul>
      </div>

      <div className="project-item">
        <h3>
          {isZh
            ? '强生 MedTech 内部工单提交流程管理系统'
            : 'Johnson & Johnson MedTech Internal Ticket Submission Web Application'}
        </h3>
        <p className="project-role">{isZh ? '后端开发工程师' : 'Back-end Developer'}</p>
        <p className="project-description">
          {isZh
            ? '面向强生 MedTech 内部员工，用于管理 Microsoft Power App 工单请求的 Web 应用，大幅提升工单处理效率。'
            : 'A web application dedicated to managing internal Microsoft Power App ticket requests, significantly improving employee workflow.'}
        </p>
        <button
          className="expand-btn"
          onClick={() => toggleProject('jj')}
          aria-expanded={expandedProjects['jj']}
        >
          {expandLabel('jj')}
        </button>
        <ul className={`project-bullets ${expandedProjects['jj'] ? 'expanded' : 'collapsed'}`}>
          <li>
            {isZh
              ? '设计并部署高可用的 MongoDB 数据库，包含 7 个互相关联的集合，遵循传统数据库设计原则构建复杂关系结构。'
              : 'Designed and deployed a robust MongoDB database, adhering strictly to conventional database design principles with 7 interconnected collections/tables and complex relational structures.'}
          </li>
          <li>
            {isZh
              ? '实现多级权限管理系统，细粒度区分提交、修改和查看工单的不同访问权限。'
              : 'Implemented an admin system that differentiate three different level of access controls for submitting, modifying and viewing tickets.'}
          </li>
          <li>
            {isZh
              ? '使用 Express.js 构建并维护后端 API，与前端团队紧密协作，保证整体应用功能完备与体验流畅。'
              : 'Created and maintained backend API services using Express.js to satisfy all functional requirements, closely collaborating with the frontend team for seamless integration and user experience.'}
          </li>
          <li>
            {isZh
              ? '将完整的前后端应用部署在 Microsoft Azure 上，实现可扩展、稳定且便于维护的内部平台。'
              : 'Deployed the complete full-stack application (backend and frontend) on Microsoft Azure for scalable and simplified internal usage.'}
          </li>
          <li>
            {isZh
              ? '根据成本效益分析（CBA），该系统每年可为员工节省约 48 小时的工作时间。'
              : 'Improved the efficiency of J&J employees by an estimated 48 hours per year in Cost-Benefit Analysis (CBA) workflows.'}
          </li>
        </ul>
      </div>

      <div className="project-item">
        <h3>{isZh ? 'HASS 选课路径助手网站' : 'HASS Pathways Website'}</h3>
        <p className="project-role">{isZh ? '前端开发工程师' : 'Front-end Developer'}</p>
        <p className="project-description">
          {isZh
            ? '面向学生的选课资源网站，帮助他们更直观地理解并完成 HASS（人文、艺术与社会科学）路径要求。'
            : 'A student resource website designed to simplify course selection and satisfy HASS (Humanities, Arts, and Social Sciences) pathway requirements.'}
        </p>
        <button
          className="expand-btn"
          onClick={() => toggleProject('hass')}
          aria-expanded={expandedProjects['hass']}
        >
          {expandLabel('hass')}
        </button>
        <ul className={`project-bullets ${expandedProjects['hass'] ? 'expanded' : 'collapsed'}`}>
          <li>
            {isZh
              ? '使用 HTML/CSS 与 React 实现精确还原设计稿的前端界面，清晰展示 HASS 课程结构与路径规则。'
              : 'Utilized HTML/CSS and React to develop a precise front-end interface, strictly adhering to the provided design wireframe to clearly illustrate the HASS course system.'}
          </li>
          <li>
            {isZh
              ? '设计直观的交互流程，引导学生逐步完成课程筛选与路径确认。'
              : 'Created an intuitive interface that successfully guides students through the selection process.'}
          </li>
          <li>
            {isZh
              ? '为多达 400 名学生提供选课支持，显著提升他们在 HASS 路径规划方面的效率与体验。'
              : 'Guided up to 400 students in selecting the appropriate HASS courses, directly contributing to smoother academic planning.'}
          </li>
        </ul>
      </div>

      {hasNext && (
        <button className="next-section-btn" onClick={onNext}>
          {isZh ? '下一页：爱好 →' : 'Next: Hobby →'}
        </button>
      )}
    </div>
  )
}

export default Projects

