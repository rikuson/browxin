import bent from 'bent';

const defaultTheme = 'slate';
const theme = window.localStorage.theme ? window.localStorage.theme : defaultTheme;
const url = `https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/${theme}/bootstrap.min.css`;
const style = document.createElement('style');

const loadTheme = new Promise(resolve => {
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

export { loadTheme };

/*
class Theme {
  static get DEFAULT_NAME() {
    return 'slate';
  }
  constructor() {
    this.name = window.localStorage.theme ? window.localStorage.theme : Theme.DEFAULT_NAME;
    const url = `https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/${this.name}/bootstrap.min.css`;
    const request = bent('string', 200);
    request(url).then(this.addStylesheet).catch(this.fallback);
  }
  addStylesheet(css) {
    const style = document.createElement('style');
    style.innerText = css;
    document.head.appendChild(style);
  }
  fallback() {
    console.error('Bootswatch CDN is down');
    import(`bootswatch/dist/${this.name}/bootstrap.min.css`);
  }
}
*/
