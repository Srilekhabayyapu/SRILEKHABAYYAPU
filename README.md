# AuraUser — User Management Dashboard

A modern, high-fidelity React + Vite User Management Dashboard designed for administrative operations. Built as a frontend engineering solution, it connects to a mock REST API to perform complete CRUD (Create, Read, Update, Delete) management, including client-side validation, multi-field searching, department filtering, lexicographical column sorting, and responsive pagination controls.

---

## 🚀 Live Demo & Screen Recording

*   **Repository Link:** [https://github.com/your-username/user-management-dashboard](https://github.com/your-username/user-management-dashboard)
*   **Live Deployment URL:** _[Add your deployed Vercel/Netlify link here]_
*   **Walkthrough Video (3-5 mins):** _[Add Google Drive/Loom/YouTube link here]_

---

## 🛠️ Features Included

1.  **CRUD Operations:** Fully integrated with `GET`, `POST`, `PUT`, and `DELETE` requests.
2.  **Sleek Vanilla CSS Theme:** A hand-crafted, high-fidelity responsive system containing:
    *   Dynamic Light and Dark Mode switching based on user toggle or operating system preference.
    *   Glassmorphism card interfaces (`backdrop-filter: blur()`).
    *   Interactive hover states and animated layout adjustments.
    *   Pulsing skeleton loader rows for simulating API fetch states.
3.  **Real-Time Search:** Real-time character index searching matching user First Name, Last Name, and Email.
4.  **Advanced Filter Cohort:** Floating overlay panel featuring individual fields to target user cohorts by department, name, or email text.
5.  **Multi-Column Sorting:** Clicking ID, Name, Email, or Department headers sorts rows lexicographically in ascending or descending order.
6.  **Responsive Pagination:** Bottom navigation controls featuring previous/next indicators, page numbering lists, total entries descriptor, and rows-per-page selectors (`5`, `10`, `25`, `50`).
7.  **Form Validation Engine:** Complete validator rules preventing submission of blank names or departments, verifying syntax structures of email strings against robust Regular Expressions, and displaying instant inline visual warnings.
8.  **Graceful Error Handling:** Full `try...catch` block interceptors returning visual warning banners rather than allowing critical React render crashes.

---

## 📂 Folder Structure Map

The project implements a highly modular structure to enforce single-responsibility logic:

```text
user-management-dashboard/
│
├── public/                 # Static public assets (icons, etc.)
│
├── src/
│    ├── api/
│    │    └── userService.js        # Axios configurations & REST methods
│    │
│    ├── components/
│    │    ├── Header.jsx            # Application banner & theme control
│    │    ├── SearchBar.jsx         # Query input and reset keys
│    │    ├── FilterPopup.jsx       # Floating panel for targeted cohorts
│    │    ├── UserTable.jsx         # Relational grid, loaders, & empty states
│    │    ├── UserRow.jsx           # Individual user visual blocks
│    │    ├── UserForm.jsx          # Overlay inputs for creating/updating
│    │    ├── ConfirmDelete.jsx     # Accidental deletion protector
│    │    └── Pagination.jsx        # Rows boundary nav controllers
│    │
│    ├── hooks/
│    │    └── useUsers.js           # Custom hook orchestrating all state logic
│    │
│    ├── utils/
│    │    ├── constants.js          # API URL and department listings
│    │    ├── helpers.js            # Name splittings and avatar helpers
│    │    └── validators.js         # Input validation helpers
│    │
│    ├── App.jsx                    # Root wrapper compiling layout
│    ├── index.css                  # Custom Vanilla CSS variable sheets
│    └── main.jsx                   # React bootstrapper
│
├── index.html              # HTML shell loading premium Outfit/Inter fonts
├── vite.config.js          # Vite config
├── package.json            # Scripts & project dependencies
└── README.md               # Visual guide and technical analysis
```

---

## 💻 Tech Stack & Libraries Used

| Technology / Library | Purpose |
| :--- | :--- |
| **React (v18.3.1)** | Core component structures and render trees |
| **Vite (v5.3.1)** | High-speed module bundling and local dev-server |
| **Axios (v1.7.2)** | Promise-based asynchronous HTTP requests |
| **Vanilla CSS3** | Custom typography, dark/light themes, card styling, and grid sizing |
| **Outfit & Inter** | Google Fonts providing professional aesthetic hierarchies |

---

## ⚙️ Setup & Installation Instructions

Ensure you have **Node.js (v18+)** and **npm** installed on your operating system.

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/user-management-dashboard.git
    cd user-management-dashboard
    ```

2.  **Install Project Dependencies:**
    ```bash
    npm install
    ```

3.  **Launch Local Development Server:**
    ```bash
    npm run dev
    ```
    _The dashboard will launch on your browser (normally at `http://localhost:3000`)._

4.  **Validate Production Build compiles:**
    ```bash
    npm run build
    ```

---

## 💡 Engineering Assumptions & Schema Mappings

Because the **JSONPlaceholder** API does not feature separate fields representing first names, last names, or company departments, the application performs these data conversions during initial mount and storage cycles:

1.  **First & Last Name Extraction:**
    The application splits the API's full `name` string on the first space.
    *   *Example:* `"Leanne Graham"` splits into `firstName: "Leanne"` and `lastName: "Graham"`.
    *   *Example:* `"Mrs. Dennis Schulist"` splits into `firstName: "Mrs."` and `lastName: "Dennis Schulist"`.
2.  **Deterministic Department Assignment:**
    Since the API mock data has no department field, we assign departments dynamically based on the user's ID to keep the layout realistic:
    $$\text{Department Index} = (\text{User ID} - 1) \pmod{\text{Length of Departments List}}$$
    This splits the 10 fetched users evenly across *Engineering, Product, Design, Marketing, Sales, Finance, Human Resources,* and *Operations*.
3.  **Simulation of CRUD Persistence:**
    Mock APIs do not modify database states. Therefore, on a successful simulated API response (e.g. `201 Created` for POST, `200 OK` for PUT/DELETE), we manually update the local React state array (`users`) to reflect the changes instantly in the UI.

---

## ⚠️ Challenges Faced & Solutions

*   **Non-Persistent Mock Server:**
    When adding a user, JSONPlaceholder always returns `id: 11` for a `POST` response. If you add multiple users, having duplicate IDs in React lists leads to key crashes.
    *   *Solution:* We programmatically calculate the maximum existing ID in the state array and increment it to assign a truly unique numerical ID for each newly added user on the client side.
*   **Table Squeezing on Mobile views:**
    Tables with several columns warp on smartphone screen widths.
    *   *Solution:* We applied `overflow-x: auto;` to the table container to allow horizontal scrolling on small screens and used media queries to collapse less critical columns (like IDs and Department badges) on screens narrower than `600px`.

---

## 🔮 Future Architectural Improvements

If we scaled this dashboard to a fully production-ready system, we would introduce:

1.  **Backend Integration:** Connect to a real database (Node.js/Express + PostgreSQL/MongoDB) to persist CRUD operations permanently.
2.  **Authentication & Authorization:** Secure operations with JWT role-based access control (RBAC), restricting Delete operations to root Administrators.
3.  **React Query / RTK Query:** Replace raw `useEffect` fetches with caching hooks to manage background refetches, request retries, cache invalidation, and state syncing.
4.  **Unit & E2E Testing:** Write unit tests for custom hooks (`useUsers.js`) and validation rules (`validators.js`) using Jest, and E2E tests using Cypress or Playwright.
5.  **Advanced Sorting & Drag-Drop Columns:** Lexicographical sorting on multiple fields simultaneously and customizable drag-and-drop table layouts.
