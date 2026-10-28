'use strict';
const config = window.PORTFOLIO_CONFIG || {};
const safeWebUrl = value => {
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; }
  catch { return null; }
};
document.querySelectorAll('[data-profile]').forEach(link => {
  const url = safeWebUrl(config[link.dataset.profile]);
  if (url) link.href = url;
});
if (config.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)) {
  document.querySelectorAll('[data-email]').forEach(link => {
    link.href = `mailto:${config.email}`;
    if (link.classList.contains('email-link')) link.textContent = config.email;
  });
}
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    let count = 0;
    document.querySelectorAll('.filter').forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    document.querySelectorAll('.project').forEach(project => {
      project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
      if (!project.hidden) count++;
    });
    document.getElementById('filter-status').textContent = `${count} project${count === 1 ? '' : 's'} shown.`;
  });
});
const projects = {
  environment: {
    category: 'ENVIRONMENT / INDEPENDENT RESEARCH',
    title: 'Environmental patterns across Dutch municipalities',
    summary: 'An exploration of municipal environmental profiles through multivariate statistical analysis.',
    resources: [['Read research report', 'https://doi.org/10.5281/zenodo.23374811'], ['View R code', 'https://github.com/joshuaaguele/dutch-environmental-analysis']],
    question: 'How can multiple environmental indicators be summarised, and which municipalities share similar combinations of exposure?',
    methods: 'Data preparation and standardisation, principal component analysis, k-means clustering and spatial visualisation in R.',
    limitations: 'Profiles depend on the selected indicators, scale and modelling choices. Descriptive clusters are not causal explanations or individual risk estimates. See the linked reports and preprints for the documented work.'
  },
  labour: {
    category: 'LABOUR MARKETS / INDEPENDENT RESEARCH',
    title: 'Google Search Trends and the Dutch labour market',
    summary: 'Comparing Google Trends search interest with official CBS vacancy measures for the Netherlands, using quarterly observations from 2022–2025.',
    resources: [['Read research report', 'https://doi.org/10.5281/zenodo.22304699']],
    question: 'Can search interest in “vacatures” provide a useful complementary indicator of changes in the Dutch labour market?',
    methods: 'Quarterly aggregation, percentage changes, Pearson correlation, OLS regression, diagnostic checks and sensitivity analysis using Excel and Python.',
    limitations: 'The series contains only 16 quarterly observations. Search interest is a relative index and does not represent all jobseekers. Correlation does not establish causality or reliable forecasting performance. The report is linked below.'
  },
  analytics: {
    category: 'ANALYTICS / PORTFOLIO PROJECT',
    title: 'Dutch labour-market dashboard',
    summary: 'A completed SQL and Power BI portfolio project for exploring Dutch labour-market indicators.',
    resources: [['View SQL and Power BI project', 'https://github.com/joshuaaguele/dutch-labour-market-dashboard']],
    question: 'How can regional indicators and labour-market measures be presented so that users can explore patterns without working directly with raw tables?',
    methods: 'SQL for data preparation and querying; Power BI for visual summaries, filters and interactive reporting.',
    limitations: 'This page describes the completed dashboard; it does not embed a live Power BI report. The cover design is an editorial illustration, not a screenshot of the dashboard. Contact me for a walkthrough.'
  }
};
const dialog = document.getElementById('project-dialog');
let lastTrigger;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  if (!project) return;
  lastTrigger = button;
  ['category', 'title', 'summary', 'question', 'methods', 'limitations'].forEach(key => {
    document.getElementById(`dialog-${key}`).textContent = project[key];
  });
  const resources = document.getElementById('dialog-resources');
  resources.replaceChildren();
  (project.resources || []).forEach(([label, value]) => {
    const url = safeWebUrl(value);
    if (!url) return;
    const link = document.createElement('a');
    link.href = url; link.textContent = label + ' ↗';
    link.target = '_blank'; link.rel = 'noopener noreferrer';
    resources.append(link);
  });
  document.getElementById('dialog-contact').href = `mailto:${config.email || 'joshuaaguele.research@gmail.com'}?subject=${encodeURIComponent('About your project: ' + project.title)}`;
  dialog.showModal();
}));
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { if (lastTrigger) lastTrigger.focus(); });

