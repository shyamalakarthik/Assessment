import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);
const expectedToken = process.env.AUTH_TOKEN || 'Bearer test-token';

type User = {
  id: string;
  name: string;
  email: string;
  accountType: string;
  createdAt: string;
};

type Transaction = {
  id: string;
  userId: string;
  amount: number;
  type: string;
  recipientId: string;
  description: string;
  createdAt: string;
};

const users = new Map<string, User>();
const transactions: Transaction[] = [];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization || '';

  if (header !== expectedToken) {
    res.status(401).json({ error: 'Unauthorized: valid bearer token required.' });
    return;
  }

  next();
}

function renderPage(title: string, body: string, currentPage = ''): string {
  const nav = `
    <nav>
      <a href="/dashboard" ${currentPage === 'dashboard' ? 'class="active"' : ''}>Dashboard</a>
      <a href="/summary" ${currentPage === 'summary' ? 'class="active"' : ''}>Summary</a>
      <a href="/transfer" ${currentPage === 'transfer' ? 'class="active"' : ''}>Transfer</a>
      <a href="/register" ${currentPage === 'register' ? 'class="active"' : ''}>Register</a>
    </nav>
  `;

  return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          nav { display: flex; gap: 16px; margin-bottom: 24px; }
          .error { color: #b00020; }
          .success { color: #0d7a31; }
          label { display: block; margin-top: 10px; }
          input, select, button { margin-top: 6px; padding: 8px; width: 260px; }
          button { background: #1c7cd6; color: white; border: none; cursor: pointer; }
          table { border-collapse: collapse; width: 400px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          .active { font-weight: bold; }
        </style>
      </head>
      <body>
        ${nav}
        ${body}
      </body>
    </html>`;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/login', (req: Request, res: Response) => {
  const error = req.query.error ? String(req.query.error).replace(/\+/g, ' ') : '';
  const body = `
    <h1>Login</h1>
    <form method="POST" action="/login">
      <label>Username <input name="username" id="username" placeholder="demo-user" /></label>
      <label>Password <input type="password" name="password" id="password" placeholder="demo-password" /></label>
      <button type="submit" id="login-btn">Login</button>
    </form>
    ${error ? `<p id="login-error" class="error">${error}</p>` : ''}
  `;
  res.send(renderPage('Login', body));
});

app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body || {};
  const validUsername = (process.env.TEST_USERNAME || 'demo-user').toLowerCase();
  const validPassword = process.env.TEST_PASSWORD || 'demo-password';

  if (username === validUsername && password === validPassword) {
    return res.redirect('/dashboard?message=Welcome%20back');
  }

  return res.redirect('/login?error=Invalid%20credentials');
});

app.get('/register', (req: Request, res: Response) => {
  const error = req.query.error ? String(req.query.error).replace(/\+/g, ' ') : '';
  const body = `
    <h1>Register</h1>
    <form id="register-form" method="POST" action="/register" novalidate>
      <label>Name <input id="name" name="name" /></label>
      <label>Email <input id="email" name="email" /></label>
      <label>Account Type
        <select id="accountType" name="accountType">
          <option value="premium">Premium</option>
          <option value="basic">Basic</option>
        </select>
      </label>
      <button type="submit" id="register-btn">Create Account</button>
    </form>
    ${error ? `<p id="registration-error" class="error">${error}</p>` : '<p id="registration-error" class="error" hidden></p>'}
    <script>
      const registerForm = document.getElementById('register-form');
      const registrationError = document.getElementById('registration-error');
      registerForm.addEventListener('submit', (event) => {
        const email = document.getElementById('email').value;
        const validEmail = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);

        if (!validEmail) {
          event.preventDefault();
          registrationError.hidden = false;
          registrationError.textContent = 'Invalid email format';
          return false;
        }
      });
    </script>
  `;
  res.send(renderPage('Register', body, 'register'));
});

app.post('/register', (req: Request, res: Response) => {
  const { name, email, accountType = 'premium' } = req.body || {};

  if (!name || !email || !isValidEmail(email)) {
    return res.redirect('/register?error=Invalid%20email%20format');
  }

  const user: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    accountType,
    createdAt: new Date().toISOString()
  };

  users.set(user.id, user);
  return res.redirect(`/dashboard?message=${encodeURIComponent(`Welcome ${user.name}`)}`);
});

app.get('/dashboard', (req: Request, res: Response) => {
  const message = req.query.message ? String(req.query.message).replace(/\+/g, ' ') : 'Welcome to your dashboard';
  const body = `
    <h1>Dashboard</h1>
    <p class="success">${message}</p>
    <ul>
      <li><a id="nav-summary" href="/summary">Account Summary</a></li>
      <li><a id="nav-transfer" href="/transfer">Fund Transfer</a></li>
      <li><a id="nav-payee" href="/payee">Add Payee</a></li>
    </ul>
  `;

  res.send(renderPage('Dashboard', body, 'dashboard'));
});

app.get('/summary', (_req, res) => {
  const body = `
    <h1>Account Summary</h1>
    <p>Total Balance: <span id="account-balance">$10,245.67</span></p>
    <table>
      <thead>
        <tr><th>Type</th><th>Amount</th></tr>
      </thead>
      <tbody>
        <tr><td>Credit</td><td>$500.00</td></tr>
        <tr><td>Debit</td><td>-$120.00</td></tr>
      </tbody>
    </table>
  `;
  res.send(renderPage('Summary', body, 'summary'));
});

app.get('/payee', (_req, res) => {
  const body = `
    <h1>Add Payee</h1>
    <form method="POST" action="/payee">
      <label>Payee Name <input id="payeeName" name="payeeName" /></label>
      <label>Account Number <input id="accountNumber" name="accountNumber" /></label>
      <label>Account Type
        <select id="accountType" name="accountType">
          <option value="Checking">Checking</option>
          <option value="Savings">Savings</option>
        </select>
      </label>
      <button type="submit" id="add-payee-btn">Add Payee</button>
    </form>
    <p role="status" class="success">Payee added successfully</p>
  `;
  res.send(renderPage('Add Payee', body));
});

app.post('/payee', (req: Request, res: Response) => {
  const { payeeName, accountNumber } = req.body || {};
  if (!payeeName || !accountNumber) {
    return res.status(400).send(renderPage('Validation Error', '<p class="error">Payee name and account number are required.</p>'));
  }

  return res.redirect('/dashboard?message=Payee%20added%20successfully');
});

app.get('/transfer', (req: Request, res: Response) => {
  const error = req.query.error ? String(req.query.error).replace(/\+/g, ' ') : '';
  const body = `
    <h1>Fund Transfer</h1>
    <form method="POST" action="/transfer">
      <label>Recipient
        <select id="recipientId" name="recipientId">
          <option value="Jane Smith">Jane Smith</option>
          <option value="John Davis">John Davis</option>
        </select>
      </label>
      <label>Amount <input id="amount" name="amount" type="number" step="0.01" /></label>
      <label>Description <input id="description" name="description" /></label>
      <button type="submit" id="submit-transfer">Submit Transfer</button>
    </form>
    ${error ? `<p class="error">${error}</p>` : ''}
  `;
  res.send(renderPage('Transfer', body, 'transfer'));
});

app.post('/transfer', (req: Request, res: Response) => {
  const { amount, recipientId, description = 'Test transfer' } = req.body || {};
  const parsedAmount = Number(amount);

  if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.redirect('/transfer?error=Transfer%20amount%20must%20be%20greater%20than%200');
  }

  const transaction: Transaction = {
    id: `txn_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    userId: 'user_default',
    amount: parsedAmount,
    type: 'transfer',
    recipientId,
    description,
    createdAt: new Date().toISOString()
  };

  transactions.push(transaction);
  return res.redirect('/dashboard?message=Transfer%20submitted%20successfully');
});

app.post('/api/users', requireAuth, (req: Request, res: Response) => {
  const { name, email, accountType } = req.body || {};

  if (!name || !email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  const user: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    accountType: accountType || 'premium',
    createdAt: new Date().toISOString()
  };

  users.set(user.id, user);
  return res.status(201).json(user);
});

app.get('/api/users/:id', requireAuth, (req: Request, res: Response) => {
  const userId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const user = users.get(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  return res.json(user);
});

app.post('/api/transactions', requireAuth, (req: Request, res: Response) => {
  const { userId, amount, type, recipientId, description = 'test transfer' } = req.body || {};

  if (!userId || !users.has(userId)) {
    return res.status(400).json({ error: 'A valid userId is required.' });
  }

  const parsedAmount = Number(amount);
  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ error: 'Transaction amount must be greater than 0.' });
  }

  if (!type || !recipientId) {
    return res.status(400).json({ error: 'type and recipientId are required.' });
  }

  const transaction: Transaction = {
    id: `txn_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    userId,
    amount: parsedAmount,
    type,
    recipientId,
    description,
    createdAt: new Date().toISOString()
  };

  transactions.push(transaction);
  return res.status(201).json(transaction);
});

app.get('/api/transactions/:userId', requireAuth, (req: Request, res: Response) => {
  const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
  const userTransactions = transactions.filter((transaction) => transaction.userId === userId);
  return res.json(userTransactions);
});

app.listen(port, () => {
  console.log(`Mock fintech server listening on http://127.0.0.1:${port}`);
});
