import bent from 'bent';

const defaultTheme = 'slate';
const themes = [
  'cerulean',
  'cosmo',
  'cyborg',
  'darkly',
  'flatly',
  'journal',
  'litera',
  'lumen',
  'lux',
  'materia',
  'minty',
  'pulse',
  'sandstone',
  'simplex',
  'sketchy',
  'slate',
  'solar',
  'spacelab',
  'superhero',
  'united',
  'yeti',
];
const theme = window.localStorage.theme ? window.localStorage.theme : defaultTheme;
const url = `https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/${theme}/bootstrap.min.css`;
const style = document.createElement('style');

const loadTheme = () => new Promise(resolve => {
  // Fetch stylesheet from CDN
  const request = bent('string', 200);
  request(url).then(css => {
    // Load stylesheet
    style.innerText = css;
    document.head.appendChild(style);
    resolve();
  }).catch(() => {
    // Fallback
    import(`bootswatch/dist/${theme}/bootstrap.min.css`);
    resolve();
  });
});

export { loadTheme, themes, defaultTheme };
