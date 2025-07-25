# Paper Notes 📝

A modern, full-stack note-taking application built with Next.js that helps you organize your thoughts, ideas, and important information in a clean, intuitive interface.

## ✨ Features

- **Secure Authentication** - Sign in with Google, GitHub, or email using NextAuth
- **Rich Note Editor** - Create and edit notes with markdown support and syntax highlighting
- **Smart Organization** - Tag system, folders, and search functionality to keep notes organized
- **Dark/Light Mode** - Toggle between themes for comfortable writing
- **Responsive Design** - Works seamlessly across desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) - Full-stack React framework with App Router
- **Database**: [MONGODB](https://www.mongodb.com/) with [MONGOOSE](https://mongoosejs.com/) for type-safe database access
- **Authentication**: [NextAuth.js v5](https://next-auth.js.org/) - Complete authentication solution
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight state management
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Beautiful, accessible components
- **Rich Text Editor**: [Tiptap](https://tiptap.dev/) - Headless editor framework
- **Deployment**: [Vercel](https://vercel.com/) - Seamless deployment and hosting

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [PostgreSQL](https://postgresql.org/) (version 13 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/alexsmith/paper-notes.git
   cd paper-notes
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-super-secret-nextauth-key-here
   
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/paper_notes?schema=public"
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # GitHub OAuth (optional)
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   
   # Email Configuration (for magic links)
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-app-password
   EMAIL_FROM=noreply@papernotes.com
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # (Optional) Seed the database with sample data
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see your application running.

## 📱 Usage

### Getting Started
1. **Sign Up/Sign In** - Create an account using Google, GitHub, or email
2. **Create Your First Note** - Click the "New Note" button or use Ctrl+N shortcut
3. **Write with Markdown** - Use markdown syntax for rich formatting
4. **Organize with Tags** - Add tags like #work, #personal, #ideas to categorize notes
5. **Use Folders** - Create folders to group related notes together

### Keyboard Shortcuts
- `Ctrl/Cmd + N` - Create new note
- `Ctrl/Cmd + S` - Save note (auto-saves every 3 seconds)
- `Ctrl/Cmd + F` - Search notes
- `Ctrl/Cmd + D` - Toggle dark mode
- `Ctrl/Cmd + E` - Export current note

### Advanced Features
- **Search**: Use the search bar to find notes by title, content, or tags
- **Export**: Export individual notes or entire folders as PDF or Markdown
- **Collaboration**: Share notes with read-only or edit permissions (coming soon)

## 🏗️ Project Structure

```
paper-notes/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main application pages
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── editor/           # Rich text editor components
│   └── layout/           # Layout components
├── lib/                  # Utility functions and configurations
│   ├── auth.ts           # NextAuth configuration
│   ├── db.ts             # Database connection
│   └── utils.ts          # Helper functions
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding
├── store/                # Zustand store configurations
│   ├── notes.ts          # Notes state management
│   └── user.ts           # User state management
├── types/                # TypeScript type definitions
├── public/               # Static assets
└── README.md
```

## 🎯 Roadmap

- [ ] Real-time collaboration on notes
- [ ] Mobile app (React Native)
- [ ] Integration with cloud storage (Google Drive, Dropbox)
- [ ] Advanced search with filters
- [ ] Note templates
- [ ] Team workspaces
- [ ] API for third-party integrations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Follow the existing code style and conventions
4. Write tests for new features
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Code Style
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add JSDoc comments for complex functions

## 📊 Performance

- **Lighthouse Score**: 71+ on all metrics
- **First Contentful Paint**: < 1.2s
- **Time to Interactive**: < 0.9s
- **Bundle Size**: < 250KB (gzipped)

## 🔒 Security

- All authentication handled by NextAuth.js
- CSRF protection enabled
- XSS protection with Content Security Policy


## 👨‍💻 Author

**Mayur Kendre**
- GitHub: [@mayur-00](https://github.com/Mayur-00)
- LinkedIn: [mayur kendre](https://www.linkedin.com/in/mayurkendre1/)
- Email: kendremayur31@gmail.com
<!-- - Portfolio: [alexsmith.dev](https://alexsmith.dev) -->

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the incredible framework
- [Vercel](https://vercel.com/) for seamless deployment
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
<!-- - [Tiptap](https://tiptap.dev/) for the powerful editor framework -->
- [mongoose](https://mongoosejs.com/) for type-safe database interactions
- The open-source community for inspiration and contributions

## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/alexsmith/paper-notes?style=social)
![GitHub forks](https://img.shields.io/github/forks/alexsmith/paper-notes?style=social)
![GitHub issues](https://img.shields.io/github/issues/alexsmith/paper-notes)
![GitHub license](https://img.shields.io/github/license/alexsmith/paper-notes)

---

⭐ If you found this project helpful, please give it a star on GitHub!

🐛 Found a bug? [Open an issue](https://github.com/alexsmith/paper-notes/issues/new)

💡 Have a feature request? [Start a discussion](https://github.com/alexsmith/paper-notes/discussions)
