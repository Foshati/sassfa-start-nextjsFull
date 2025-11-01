# Sassfa

Modern and powerful platform for building exceptional digital experiences built with Next.js 16+.

## 🚀 Features

- **High Performance** - Lightning fast and optimized performance
- **Reliable** - Enterprise-level security and stability  
- **Easy to Use** - Simple and user-friendly interface
- **Modern Stack** - Built with Next.js, TypeScript, and Tailwind CSS

## 📸 Screenshots

### Homepage
![Homepage](public/img/homePage.png)

### Login Page
![Login Page](public/img/loginPage.png)

### Dashboard
![Dashboard](public/img/dashboard.png)

## 🛠️ Tech Stack

- **Framework:** Next.js 16+
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Authentication:** Better Auth
- **Database:** Prisma ORM
- **UI Components:** Radix UI
- **Form Handling:** React Hook Form + Zod
- **Email:** Nodemailer
- **Code Quality:** Biome (ESLint + Prettier alternative)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Foshati/sassfa-start-nextjsFull.git
   cd sassfa
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
sassfa/
├── src/
│   ├── app/           # App Router pages
│   ├── components/    # Reusable components
│   └── lib/          # Utilities and configurations
├── public/           # Static assets
├── prisma/          # Database schema
└── ...
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Email (Nodemailer)
NODEMAILER_USER="your-email@gmail.com"
NODEMAILER_APP_PASSWORD="your-app-password"

# Admin Emails (separated by semicolon)
ADMIN_EMAILS="admin@example.com;admin2@example.com"
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Foshati**
- GitHub: [@Foshati](https://github.com/Foshati)

---

⭐ Star this repository if you find it helpful!