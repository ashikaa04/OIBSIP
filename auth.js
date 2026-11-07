// Northstar client-side authentication demo.
// For learning only: browser storage is not secure production authentication.
document.addEventListener('DOMContentLoaded', () => {
  const USERS_KEY = 'northstar-demo-users';
  const SESSION_KEY = 'northstar-demo-session';

  function getUsers() {
    try { const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); return Array.isArray(users) ? users : []; }
    catch { return []; }
  }
  function message(id, text, success=false) {
    const el = document.getElementById(id);
    if (el) { el.textContent = text; el.classList.toggle('success', success); }
  }
  async function hashPassword(password) {
    if (!crypto.subtle) throw new Error('Secure hashing is unavailable. Please run this page on localhost or HTTPS.');
    const data = new TextEncoder().encode(password);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2,'0')).join('');
  }
  document.querySelectorAll('[data-toggle]').forEach(button => button.addEventListener('click', () => {
    const field = document.getElementById(button.dataset.toggle);
    const show = field.type === 'password'; field.type = show ? 'text' : 'password'; button.textContent = show ? 'Hide' : 'Show';
  }));

  const register = document.getElementById('register-form');
  if (register) register.addEventListener('submit', async event => {
    event.preventDefault(); message('register-message','');
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('reg-password').value;
    if (!username || !email || !password) return message('register-message','Please complete all fields.');
    if (!/^[a-zA-Z0-9_]{3,24}$/.test(username)) return message('register-message','Username must be 3–24 characters (letters, numbers or underscores).');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return message('register-message','Please enter a valid email address.');
    if (password.length < 8 || !/\d/.test(password)) return message('register-message','Password must be at least 8 characters and include a number.');
    const users = getUsers();
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === email))
      return message('register-message','That username or email is already registered. Try logging in.');
    try {
      const passwordHash = await hashPassword(password);
      users.push({id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), username, email, passwordHash});
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      register.reset(); message('register-message','Account created! Redirecting to login…',true);
      setTimeout(() => location.href = 'index.html?registered=1', 900);
    } catch (error) { message('register-message',error.message || 'Could not create account.'); }
  });

  const login = document.getElementById('login-form');
  if (login) {
    if (new URLSearchParams(location.search).get('registered') === '1') message('login-message','Registration successful. Please log in.',true);
    login.addEventListener('submit', async event => {
      event.preventDefault(); message('login-message','');
      const identity = document.getElementById('identity').value.trim().toLowerCase();
      const password = document.getElementById('password').value;
      if (!identity || !password) return message('login-message','Please enter both your username/email and password.');
      try {
        const hash = await hashPassword(password);
        const user = getUsers().find(u => u.username.toLowerCase() === identity || u.email.toLowerCase() === identity);
        if (!user || user.passwordHash !== hash) return message('login-message','Login failed. Check your username/email and password, then try again.');
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({userId:user.id, username:user.username}));
        location.href = 'dashboard.html';
      } catch (error) { message('login-message',error.message || 'Unable to log in.'); }
    });
  }

  if (location.pathname.endsWith('dashboard.html')) {
    let session = null;
    try { session = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); } catch {}
    const user = session && getUsers().find(u => u.id === session.userId);
    if (!user) { sessionStorage.removeItem(SESSION_KEY); location.replace('index.html'); return; }
    document.getElementById('user-name').textContent = user.username;
    document.getElementById('logout-button').addEventListener('click', () => {
      sessionStorage.removeItem(SESSION_KEY); location.replace('index.html?loggedout=1');
    });
  }
});
