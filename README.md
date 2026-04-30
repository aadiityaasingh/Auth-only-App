# 🔐 Auth System with Email Verification

A lightweight but production-ready authentication backend built with **Node.js**, **Express.js**, and **MongoDB**. Features full user auth flow with **OTP-based email verification** via Nodemailer and Gmail SMTP, JWT cookie sessions, and a welcome email on successful verification.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Database | MongoDB + Mongoose |
| Authentication | JWT + HTTP-only Cookies |
| Password Hashing | bcrypt |
| Email Service | Nodemailer (Gmail SMTP) |

---

## ✨ Features

- 📝 **Register** — Creates user, generates 6-digit OTP, sends verification email
- 📧 **Email OTP Verification** — Validates OTP with 10-minute expiry, issues JWT on success
- 📨 **Welcome Email** — Sent automatically after successful email verification
- 🔑 **Login** — Validates credentials, returns JWT cookie
- 🚪 **Logout** — Clears JWT cookie
- ⏱ **OTP Expiry** — OTP auto-expires after 10 minutes
- 🔒 **Security** — Passwords hashed with bcrypt, JWT stored in HTTP-only cookie

---

## 📁 Project Structure

```
auth-email-verification/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js     # Register, login, logout
│   │   └── otp.controller.js      # OTP email verification
│   ├── db/
│   │   └── db.js                  # MongoDB connection
│   ├── models/
│   │   └── user.model.js          # User schema with OTP fields
│   ├── routes/
│   │   └── auth.route.js          # All auth routes
│   └── services/
│       └── email.service.js       # Nodemailer OTP & welcome emails
├── app.js                         # Express app & route mounting
├── server.js                      # Entry point
├── .env
├── .gitignore
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A Gmail account with an [App Password](https://myaccount.google.com/apppasswords) enabled

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/aadiityaasingh/Auth-only-App.git
cd Auth-only-App

# 2. Install dependencies
npm install

# 3. Set up environment variables
touch .env
# Fill in your values (see below)

# 4. Start the server
node server.js
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DB_URI=mongodb://localhost:27017/auth-system
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
```

> ⚠️ Use a **Gmail App Password**, not your regular Gmail password. Enable it at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).

---

## 📡 API Reference

**Base URL:** `http://localhost:PORT`

All routes are prefixed with `/api/auth`.

---

### 👤 Auth — `/api/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/user/register` | Public | Register user & send OTP to email |
| POST | `/api/auth/user/login` | Public | Login and receive JWT cookie |
| GET | `/api/auth/user/logout` | Public | Logout and clear JWT cookie |
| POST | `/api/auth/verify-otp` | Public | Verify email OTP |

---

### Request & Response Examples

**Register**
```json
// POST /api/auth/user/register
// Request
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

// Response 201
{
  "message": "OTP sent to email. Please verify your account."
}
```

**Verify OTP**
```json
// POST /api/auth/verify-otp
// Request
{
  "email": "john@example.com",
  "otp": "847291"
}

// Response 200 — sets JWT cookie
{
  "message": "Email verified successfully"
}
```

**Login**
```json
// POST /api/auth/user/login
// Request
{
  "email": "john@example.com",
  "password": "password123"
}

// Response 200 — sets JWT cookie
{
  "message": "login successfully",
  "user": {
    "name": "John Doe",
    "_id": "<userId>",
    "email": "john@example.com"
  }
}
```

**Logout**
```json
// GET /api/auth/user/logout
// Response 200 — clears JWT cookie
{
  "message": "logout successfully"
}
```

---

## 🔄 Registration & Verification Flow

```
1. POST /api/auth/user/register
        │
        ▼
   Hash password → Generate 6-digit OTP → Save user (isVerified: false)
        │
        ▼
   Send OTP email via Gmail SMTP (expires in 10 min)
        │
        ▼
2. POST /api/auth/verify-otp  (with email + OTP)
        │
        ▼
   Validate OTP & expiry → Mark isVerified: true → Clear OTP fields
        │
        ▼
   Send welcome email → Issue JWT cookie → Done ✅
```

---


## 📧 Email Service

Two transactional emails are sent via Gmail SMTP (`email.service.js`):

| Email | Trigger | Content |
|---|---|---|
| **OTP Verification** | On registration | 6-digit OTP code, expires in 10 minutes |
| **Welcome Email** | On successful OTP verification | Welcome message with user's name |

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

> Built with 💙 for secure, email-verified authentication