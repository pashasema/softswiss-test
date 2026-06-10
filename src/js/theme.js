export function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'light';

  htmlElement.setAttribute('data-theme', savedTheme);

  const syncToggleState = (theme) => {
    if (!themeToggle) return;
    themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  };

  syncToggleState(savedTheme);

  if (!themeToggle) return;

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    syncToggleState(newTheme);
  });
}
