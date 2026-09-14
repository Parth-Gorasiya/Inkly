# Inkly

### Full-Stack Content Publishing Platform

Inkly is a full-stack content publishing application built with React and Appwrite. It allows users to create accounts, publish rich-text articles, upload featured images, manage their own content, interact with posts through likes, and browse published articles through a responsive light/dark interface.

The application uses Appwrite for authentication, database operations, and file storage, while Redux Toolkit manages client-side authentication state.

[Live Demo](https://inkly-lyart.vercel.app/) · [GitHub](https://github.com/Parth-Gorasiya/Inkly)

---

## Features

### Authentication and user ownership

- User registration, login, and logout with Appwrite Authentication.
- Persistent user sessions across page refreshes.
- Redux Toolkit authentication state management.
- Protected routes for authenticated functionality.
- Author-based post ownership.
- Edit and delete controls restricted to the post owner.

### Content publishing

- Create, read, update, and delete articles.
- Rich-text article creation using TinyMCE.
- React Hook Form for form state and submission handling.
- Slug-based article identifiers and navigation.
- Publication status support for filtering active posts.
- Dynamic rendering of rich-text HTML content.
- Author information displayed with published posts.
- Creation timestamps displayed on post cards.

### Images and storage

- Featured image uploads through Appwrite Storage.
- Images associated with individual articles.
- Existing images can be replaced when editing a post.
- Stored images are displayed across article cards and post pages.

### Likes and interaction

- Like functionality backed by Appwrite.
- Likes stored separately from article data.
- Users can interact with published content without modifying the article itself.

### Interface and themes

- Responsive layouts for desktop and mobile screens.
- Light and dark mode support.
- Persistent theme preference.
- Responsive article grid.
- Reusable React components.
- Dedicated Home, All Posts, Add Post, Edit Post, Login, and Signup experiences.

---

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, JavaScript, React Router |
| State management | Redux Toolkit |
| Forms | React Hook Form |
| Rich-text editing | TinyMCE |
| Styling | Tailwind CSS |
| Backend service | Appwrite |
| Authentication | Appwrite Authentication |
| Database | Appwrite Database |
| File storage | Appwrite Storage |
| Hosting | Vercel |
| Version control | Git, GitHub |

---

## Architecture

Inkly uses a React frontend connected directly to Appwrite services.

Appwrite handles authentication, article persistence, likes, and featured-image storage. Backend operations are abstracted into reusable service modules rather than being called directly throughout UI components.

Redux Toolkit stores authentication information globally, while React Router and protected-route components control access to authenticated pages.

```text
User
  │
  ▼
React / React Router
  │
  ├── Redux Toolkit
  │      └── Authentication state
  │
  ├── React Hook Form
  │      └── Post forms
  │
  ├── TinyMCE
  │      └── Rich-text content
  │
  ▼
Appwrite Services
  │
  ├── Authentication
  ├── Database
  │      ├── Articles
  │      └── Likes
  │
  └── Storage
         └── Featured images
```

The application is deployed through Vercel, with production configuration supplied through environment variables.

---

## Project Structure

The application separates pages, reusable UI components, Appwrite services, configuration, and Redux state management.

```text
Inkly/
├── public/
├── src/
│   ├── appwrite/
│   │   ├── auth.js
│   │   └── config.js
│   ├── assets/
│   ├── components/
│   ├── conf/
│   │   └── config.js
│   ├── pages/
│   ├── store/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

> The exact component organization may evolve as the project is updated.

---

## Appwrite Data Model

Inkly primarily uses two Appwrite tables: `articles` and `likes`.

### Articles

Articles contain the content and ownership information required to render and manage posts.

| Field | Purpose |
| --- | --- |
| `$id` | Article identifier / slug |
| `title` | Article title |
| `content` | Rich-text article content |
| `featuredImage` | Appwrite Storage file identifier |
| `status` | Publication status |
| `userId` | ID of the article owner |
| `authorName` | Display name of the author |
| `$createdAt` | Creation timestamp |
| `$updatedAt` | Last update timestamp |

### Likes

The `likes` table stores like-related data separately from article documents.

This keeps article content and user interactions separated at the database level.

---

## Appwrite Service Layer

Backend operations are wrapped in reusable Appwrite service methods.

The article service provides operations for:

```text
createPost()
updatePost()
deletePost()
getPost()
getPosts()
uploadFile()
deleteFile()
getFilePreview()
```

This keeps Appwrite-specific implementation details out of most React components and makes backend operations easier to reuse.

---

## Run Locally

### 1. Prerequisites

Install:

- Node.js
- npm
- Git

You will also need an Appwrite project with:

- Authentication enabled
- A database
- An articles table
- A likes table
- A storage bucket

---

### 2. Clone the repository

```bash
git clone https://github.com/Parth-Gorasiya/Inkly.git
cd Inkly
```

---

### 3. Install dependencies

```bash
npm install
```

---

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
VITE_APPWRITE_LIKES_COLLECTION_ID=
```

Replace the empty values with the IDs from your own Appwrite project.

Do not commit the `.env` file to Git.

> Variables prefixed with `VITE_` are included in the client-side application bundle. Do not place private server API keys or other secrets in these variables.

Restart the Vite development server after changing environment variables.

---

### 5. Configure Appwrite

Your Appwrite project must contain the resources referenced by the environment variables.

At minimum, configure:

1. A Web platform for your local development hostname.
2. Authentication for user accounts.
3. An articles table.
4. A likes table.
5. A storage bucket for featured images.
6. Appropriate permissions for authenticated users.

For local development, configure the Appwrite Web platform to allow the hostname used by your Vite development server.

---

### 6. Start the application

```bash
npm run dev
```

Open the local URL shown by Vite in your browser.

Create an account or sign in to access authenticated features such as creating and managing posts.

---

## Authentication Flow

When Inkly starts, the application checks Appwrite for an existing user session.

If a valid user exists, the application stores that user in Redux:

```text
Application starts
        │
        ▼
Check Appwrite session
        │
        ├── User exists ──► Store user in Redux
        │
        └── No user ──────► Logged-out state
```

Protected routes use this authentication state to determine whether authenticated pages should be displayed.

This allows sessions to remain active after page refreshes while preventing unauthenticated users from accessing protected functionality.

---

## Post Lifecycle

A typical publishing workflow is:

```text
Authenticated user
       │
       ▼
Create Post
       │
       ├── Enter title
       ├── Generate slug
       ├── Write rich-text content
       └── Select featured image
       │
       ▼
Upload image to Appwrite Storage
       │
       ▼
Create article in Appwrite Database
       │
       ▼
Published article
       │
       ├── View
       ├── Like
       ├── Edit (owner)
       └── Delete (owner)
```

React Hook Form manages the post form, while TinyMCE provides the rich-text editing experience.

---

## Production Build

Create an optimized production build with:

```bash
npm run build
```

Vite generates the production application in:

```text
dist/
```

The generated `dist` directory should not be committed to Git.

---

## Deployment

Inkly is deployed on Vercel.

| Application | Hosting | Build command | Output |
| --- | --- | --- | --- |
| Inkly frontend | Vercel | `npm run build` | `dist` |
| Authentication | Appwrite Cloud | Managed by Appwrite | — |
| Database | Appwrite Cloud | Managed by Appwrite | — |
| Storage | Appwrite Cloud | Managed by Appwrite | — |

Production URL:

https://inkly-lyart.vercel.app/

The required `VITE_*` environment variables are configured in the Vercel deployment environment.

The production hostname must also be configured as an allowed Web platform in Appwrite so the deployed React application can communicate with Appwrite services.

---

## Development Notes

Several implementation issues were addressed while building and deploying Inkly:

- Appwrite articles require a valid `userId` for ownership.
- Article slugs are used as valid document identifiers instead of titles containing spaces.
- Appwrite Storage must allow the file types used for featured images.
- Image retrieval uses Appwrite file views for displaying uploaded images.
- Authentication state is restored when the application initializes.
- Rich-text HTML generated by TinyMCE is rendered dynamically on article pages.
- Production domains must be configured correctly for external services such as TinyMCE and Appwrite.
- Environment variables must be configured separately for local development and Vercel production deployments.

---

## Current Scope

Inkly currently focuses on the core publishing experience:

- User authentication.
- Article CRUD operations.
- Rich-text publishing.
- Featured image storage.
- Author ownership.
- Likes.
- Responsive design.
- Persistent light/dark themes.

Potential future improvements include:

- Search and filtering.
- Article categories and tags.
- User profile pages.
- Comments.
- Saved/bookmarked articles.
- Pagination.
- More comprehensive loading and error states.
- Automated testing.

---

---

## Author

**Parth Gorasiya**

[GitHub](https://github.com/Parth-Gorasiya) · [LinkedIn](https://www.linkedin.com/in/parth-gorasiya)
