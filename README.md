# 🧭 PlaceMate – Your Placement Companion

**PlaceMate** is a full-stack web application built using [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [Firebase](https://firebase.google.com).  
It’s built specifically for **Techno Main Salt Lake (TMSL)** students to stay updated with placement activities, prepare effectively, and connect with seniors through shared experiences and mentorship.

---

## 🚀 Features

### 👨‍🎓 For Students
- 📌 **Share Placement Experiences**  
  Upload and explore company-wise interview stories categorized by department, year, and CTC.

- 🔍 **Smart Filters**  
  Filter experiences by **college name**, company, CTC range, and branch for easier browsing.

- 📄 **Resume Review**  
  Upload resumes and get feedback from seniors or mentors to improve them.

- 💬 **24/7 Placement Chatbot**  
  Ask placement-related doubts anytime and get instant answers powered by Gemini API.

- 🧠 **DSA Practice Sheet**  
  Curated list of coding problems arranged in a proper learning path.

- 📅 **GDG Events Portal**  
  View all upcoming and past **GDG TMSL events** with details like topic, speaker, and registration info.

- 🔔 **Event Reminders**  
  Get notified about GDG events, coding contests, or placement-related sessions.

---

### 🛠️ For Admins
- 🔐 **Secure Admin Login** using Firebase Auth
- 🧾 **Upload Daily Coding Questions** with title, tags, links, and difficulty level
- 📊 **Dashboard to Manage Problems**  
  View, edit, or delete coding problems in an admin-friendly dashboard
- 📅 **Manage GDG Events**  
  Create, update, and delete event listings through the GDG event dashboard

---

## 🏗️ Tech Stack

| Category        | Technology |
|----------------|------------|
| **Frontend**    | [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com) |
| **Backend**     | [Firebase](https://firebase.google.com) – Firestore, Auth, Storage |
| **APIs**        | Gemini API (Chatbot), PDF.co (Resume Parsing) |


---

## 📸 Screenshots


### 🏠 Home Page  
![Home Page](https://i.ibb.co/vCF0Mfg3/screencapture-place-mate-pi-vercel-app-2025-07-14-10-31-43.png)

### 📘 Experience Feed  
![Experience Feed](https://i.ibb.co/WN1kfCz2/Create-Next-App-1.png)
![Experience Details](https://i.ibb.co/YBnZc46G/screencapture-place-mate-pi-vercel-app-interview-Experience-rv0i-SM1uc62-EFrvqqifg-2025-07-11-10-41.png)


### 📄 Resume Review  
![Resume Upload](https://i.ibb.co/hx99mhRz/screencapture-place-mate-pi-vercel-app-resume-Review-2025-07-14-10-30-07.png)

### 📅 GDG Events Portal  
![GDG Events Portal](https://i.ibb.co/b5jVSbQn/screencapture-place-mate-pi-vercel-app-gdg-events-dashboard-2025-07-11-10-35-45.png)

### 🤖 Chatbot Assistant  
![Chatbot Assistant](https://i.ibb.co/Kx4k05wG/screencapture-place-mate-pi-vercel-app-2025-07-11-10-37-53.png)

### 🛠️ Coding Challenges 
![Coding Challenges](https://i.ibb.co/rRQSQ22p/screencapture-place-mate-pi-vercel-app-dsa-Sheet-dashboard-2025-07-14-10-31-28.png)

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ashes2004/placemate.git
cd placemate
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env.local file
```bash
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_PDFCO_API_KEY=your-pdfco-api-key
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 4. Run the development server

```bash
npm run dev
```



