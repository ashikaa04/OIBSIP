# Northstar — Login Authentication System

**OIBSIP Web Development Internship · Task 4**

A front-end authentication learning demo built with HTML5, CSS3 and vanilla JavaScript.

## Features
- Registration with username, email and password.
- Duplicate username/email validation (case-insensitive).
- Password rule: minimum 8 characters and at least one number.
- SHA-256 password digest using the browser Web Crypto API.
- Login using either username or email.
- Generic incorrect-credentials message.
- Protected dashboard redirects unauthenticated visitors to login.
- Logout clears the browser session.
- Empty-field validation and show/hide password controls.
- Responsive layout.

## Files
```text
WebDev-L2-LoginAuthentication/
├── index.html
├── register.html
├── dashboard.html
├── style.css
├── auth.js
└── README.md
```

## Run
1. Open this folder in VS Code.
2. Run `index.html` using Live Server (localhost) or another local web server.
3. Create an account, then log in with your username or email.
4. Visit `dashboard.html` directly in a fresh session to test the redirect.
5. Click Log out to clear the session.

## Security note
This is a client-side educational demonstration, not production authentication. User records and SHA-256 digests are stored in localStorage, while a demo session is stored in sessionStorage. Browser storage and client-side JavaScript can be inspected or modified. SHA-256 is not a password-specific hashing algorithm. Production applications should verify credentials on a server and store passwords using Argon2id, bcrypt or scrypt with unique salts. Protected data must be authorized server-side over HTTPS; a client-side redirect alone cannot secure private resources. Do not use a real or reused password in this demo.

## References
- MDN Web Crypto API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
- MDN localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- MDN sessionStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
- MDN HTTP cookies: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

---
Created by **Ashikaa Verma** · OIBSIP Web Development · Level 2 · Task 4
