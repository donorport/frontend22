const getFromStorage = () => localStorage.getItem('theme');

const apply = (theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
  const event = new Event('themeChange');
  document.dispatchEvent(event);
};

const detectPreferences = () => {
  const storedTheme = getFromStorage();

  // Check if the user has set a theme preference in localStorage
  if (storedTheme) {
    return storedTheme;
  } else {
    // Use the user's system preference
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
