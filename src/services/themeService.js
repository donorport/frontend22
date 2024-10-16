const getFromStorage = () => localStorage.getItem('theme');

const apply = (theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
  const event = new Event('themeChange');
  document.dispatchEvent(event);
};

const detectPreferences = () => {
  const storedTheme = getFromStorage();
  if (storedTheme) {
    return storedTheme;
  } else {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    return mq.matches ? 'dark' : 'light';
  }
};

const toggle = () => {
  const oldTheme = getFromStorage();
  const newTheme = oldTheme === 'dark' ? 'light' : 'dark';
  apply(newTheme);
};

const init = () => {
  const storedTheme = getFromStorage();
  if (storedTheme) {
    apply(storedTheme);
  } else {
    apply(detectPreferences());
  }
};

const themeService = {
  getFromStorage,
  apply,
  detectPreferences,
  toggle,
  init
};

export default themeService;
