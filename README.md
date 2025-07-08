# 🧭 PlaceMate – Your Placement Companion

**PlaceMate** is a full-stack web application built using [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [Firebase](https://firebase.google.com). It serves as a placement companion platform for students to share placement experiences, track their preparation, and access curated coding problems uploaded by admins.

---

## 🚀 Features

### 👨‍🎓 For Students
- 📌 Share placement experiences (categorized by college, company, CTC, department)
- 🔍 Browse experiences by **college name**, with filters for company, department, and package
- 🧠 Access daily coding problems (added by admin)
- 📅 Personalized dashboard with activity stats and tips

### 🛠️ For Admins
- 🔐 Secure login with Firebase Auth
- 🧾 Upload coding problems with title, link, tags, and difficulty
- 🔍 View all uploaded problems in a dashboard

---

## 🏗️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org) + [Tailwind CSS](https://tailwindcss.com)
- **Backend:** [Firebase](https://firebase.google.com)
  - Firebase Auth (Role-based access)
  - Firestore (for storage)
- **Form Validation:** [React Hook Form](https://react-hook-form.com)
- **Rich Text Editor:** [React Quill](https://github.com/zenoamaro/react-quill)

---

## ⚙️ Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/Ashes2004/placemate.git
cd placemate
npm install
