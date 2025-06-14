# 💼 Hr Dashboard**(Advanced)**

### 🔧 **Tech Stack**

- **React (with Next.js App Router)**
- **Tailwind CSS**
- **JavaScript (ES6+)**
- **State Management:** Context API or Zustand (your choice)
- **Optional Bonus:** Chart.js, NextAuth.js

---

## 🚀 **Challenge: Build a Mini HR Performance Dashboard**

> You're building a Dashboard for HR Managers to track employee performance, manage bookmarks, and view detailed insights.
> 

---

### 🎯 **Core Features (Must Have)**

### 1. 🏠 **Dashboard Homepage (`/`)**

- Fetch and display dummy data (use `https://dummyjson.com/users?limit=20`).
- Render user cards with:
    - Full Name, Email, Age, Department (generate via `randomuser.me` + mock logic)
    - A rating bar (1–5 stars) showing performance (randomized or assign logic)
    - Buttons: `View`, `Bookmark`, and `Promote`

### 2. 🔍 **Search & Filter**

- A search bar to filter users by name, email, or department (case-insensitive).
- Multi-select filter dropdown by department or performance rating.

### 3. 👤 **Dynamic User Details Page (`/employee/[id]`)**

- Show detailed profile:
    - Address, Phone, Bio (mock), Past performance history (randomized list)
    - Show performance rating as stars and color-coded badges
- Add a tabbed UI:
    - `Overview`, `Projects`, `Feedback`
    - Each tab should load dynamically (mock data okay)

### 4. 📌 **Bookmark Manager (`/bookmarks`)**

- List all bookmarked employees.
- Allow:
    - Removing from bookmarks
    - Triggering “Promote” or “Assign to Project” (just UI actions)

### 5. 📊 **Analytics Page (`/analytics`)**

- Create a chart (using Chart.js or any lib) showing:
    - Department-wise average ratings
    - Bookmark trends (mocked)
- Optional: Use server-side rendering or static generation for this page.