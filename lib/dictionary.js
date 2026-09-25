/*
 * Chrome copy that repeats across the site - nav, footer, the field labels
 * every case study's hero prints, quick-nav's per-project section labels -
 * kept in one place and picked by `locale`, the same way lib/projects.js's
 * `card()` already picks a track's own copy.
 *
 * What is deliberately NOT here: the per-project prose (summaries, problem/
 * outcome text, body paragraphs, the About/Resume essays). That is still
 * English behind a /zh URL until it is translated page by page - see the
 * plan. Only strings that repeat across many pages, or are short enough to
 * translate correctly without more context than a label needs, live here.
 */
export const dictionary = {
  en: {
    nav: { work: "Work", lab: "Lab", resume: "Resume", knowMore: "Know more about me", home: "Home page" },
    footer: { line: "Stay curious, stay kind.", lines: ["Stay curious,", "stay kind."] },
    hero: {
      problem: "The problem",
      whatIDid: "What I did",
      outcome: "The outcome",
      role: "Role",
      scope: "Scope",
      platform: "Platform",
      timeline: "Timeline"
    },
    projectNav: { prev: "Previous Project", next: "Next Project", all: "All Projects", back: "Work" },
    work: { selectedWork: "Selected Work", moreWork: "More Work", projects: (n) => `${n} projects` },
    status: { shipped: "Shipped", concept: "Concept", inProgress: "In progress" },
    resume: { education: "Education", experience: "Experience", skills: "Skills", download: "Download PDF", backToWork: "Back to work" },
    localeToggle: { switchTo: "Switch to Chinese" }
  },
  zh: {
    nav: { work: "作品", lab: "实验室", resume: "简历", knowMore: "认识一下我", home: "首页" },
    footer: { line: "Stay curious, stay kind.", lines: ["Stay curious,", "stay kind."] },
    hero: {
      problem: "问题",
      whatIDid: "我做了什么",
      outcome: "结果",
      role: "角色",
      scope: "范围",
      platform: "平台",
      timeline: "周期"
    },
    projectNav: { prev: "上一个项目", next: "下一个项目", all: "全部项目", back: "作品" },
    work: { selectedWork: "精选作品", moreWork: "更多作品", projects: (n) => `${n} 个项目` },
    status: { shipped: "已上线", concept: "概念阶段", inProgress: "进行中" },
    resume: { education: "教育经历", experience: "工作经历", skills: "技能", download: "下载 PDF", backToWork: "返回作品" },
    localeToggle: { switchTo: "Switch to English" }
  }
}

export function t(locale = "en") {
  return dictionary[locale] || dictionary.en
}
