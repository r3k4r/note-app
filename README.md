# Notes App - IQ Group Frontend Assignment

A responsive and modern notes management application built for the IQ Group frontend assignment.  
Users can sign up, log in, create notes with different priorities, switch between grid and list views, and enjoy a smooth and user-friendly interface.

## 🚀 Live Demo

[**Click here to view the deployed app**](https://note-app-sepia-two.vercel.app/)

## 📂 GitHub Repository

[**GitHub Repo Link**](https://github.com/r3k4r/note-app)

---

## ✨ Features

- **Authentication**
  - Sign up & login system with session management (stored in cookies)
  - Logout functionality with confirmation dialog

- **Notes Management**
  - Create, Edit, and delete notes
  - Priority labels (e.g., Urgent, High, Low)
  - Grid view & list view toggle
  - Empty state design when no notes are available

- **UI & UX**
  - Modal for note creation
  - Fully responsive design (mobile, tablet, desktop)
  - Smooth animations (Framer Motion + Tailwind Transitions)
  - Dark/Light mode with `next-themes`
  - Consistent design system using ShadCN UI

- **Validation & Forms**
  - Form validation with **Zod** + **React Hook Form**
  - Real-time error messages
  - Password requirements for sign up

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React-based)
- **UI Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Tailwind Animate](https://tailwind-animate.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) (Validation)
- **HTTP Requests:** [Axios](https://axios-http.com/)
- **Cookies Management:** [js-cookie](https://github.com/js-cookie/js-cookie)
- **Theme Management:** [next-themes](https://github.com/pacocoursey/next-themes)

---

## 🔗 API

This project uses [MockAPI](https://mockapi.io/) for backend simulation.

**Base URL** (stored in `.env.local` / `.env`):

```
NEXT_PUBLIC_API_BASE_URL = "https://688b2b592a52cabb9f506d87.mockapi.io/api/v1"
```

---

## 🖥️ Getting Started Locally

### 1️⃣ Clone the repository
Run the following command in your terminal to clone the project:
```bash
git clone https://github.com/r3k4r/note-app.git
cd note-app
```

### 2️⃣ Install dependencies
Run:
```bash
npm install
```

### 3️⃣ Create an .env.local or .env file
Inside the project root, create a file named .env.local or .env and add:
```
NEXT_PUBLIC_API_BASE_URL = "https://688b2b592a52cabb9f506d87.mockapi.io/api/v1"
```

### 4️⃣ Run the development server
Run:
```bash
npm run dev
```
Then open http://localhost:3000 in your browser to see the app.

---

## 📌 Additional Notes

- All state management is handled via React state and context.
- Cookies are used for session storage (via js-cookie)
- API calls are managed using Axios with a reusable Axios instance.
- The project is fully mobile-friendly and matches the provided Figma design closely.
- All components are separated into smaller, reusable parts for better maintainability.

## 👤 Author

**Rekar Jamal**
- GitHub: [https://github.com/r3k4r](https://github.com/r3k4r)
- Live Demo: [https://note-app-sepia-two.vercel.app/](https://note-app-sepia-two.vercel.app/)
