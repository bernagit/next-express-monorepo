# Monorepo Template

This is a **monorepo template** designed to manage multiple applications (`backend` and `frontend`) and shared packages (`utils`) in a single repository using **Yarn Workspaces**. It provides a ready-to-use structure for full-stack TypeScript projects with Prisma, Next.js, and testing setup.

---

## 📂 Project Structure

```
.
├── apps
│   ├── backend       # Express backend with Prisma and TypeScript
│   └── frontend      # Next.js frontend with TypeScript and Mantine
├── packages
│   └── utils         # Shared utilities package
├── tsconfig.base.json
├── eslint.config.js
├── package.json
└── yarn.lock
```

---

## 🧩 Workspaces

This monorepo uses **Yarn Workspaces** to manage dependencies across multiple packages.

* Root `package.json` defines the workspaces:

```json
"workspaces": [
  "apps/*",
  "packages/*"
]
```

This allows packages to reference each other locally, for example:

```json
"dependencies": {
  "@my/utils": "workspace:^"
}
```

---

## 🚀 Running the Project

### 1. Install dependencies

```bash
yarn install
```

### 2. Development

Start both frontend and backend concurrently:

```bash
yarn dev
```

Or individually:

```bash
yarn dev:backend   # runs backend in watch mode
yarn dev:frontend  # runs frontend in development mode
```

### 3. Build

Build all workspaces:

```bash
yarn build
```

Or individually:

```bash
yarn build:backend
yarn build:frontend
```

### 4. Linting & Formatting

Run ESLint:

```bash
yarn lint          # check code style
yarn lint:fix      # auto-fix lint issues
```

Run Prettier:

```bash
yarn format
```

### 5. Testing

Run tests for all workspaces:

```bash
yarn test
```

Watch mode:

```bash
yarn test:watch
```

Check coverage:

```bash
yarn test:coverage
```

### 6. Cleaning

Remove build artifacts from all packages:

```bash
yarn clean
```

---

## 🖥️ Backend

Located in `apps/backend`.

* **Tech stack:** Express, TypeScript, Prisma, Jest.
* **Prisma commands:**

```bash
yarn prisma:migrate    # Run migrations
yarn prisma:generate   # Generate Prisma client
yarn prisma:push       # Push schema to DB
yarn prisma:seed       # Seed database
yarn prisma:studio     # Open Prisma Studio
```

* **Scripts:**

```bash
yarn dev          # Start backend in watch mode
yarn build        # Compile TypeScript to JS
yarn start        # Run compiled backend
```

* **Folder structure:**

```
src/
├── api/
├── config/
├── utils/
└── types/
```

---

## 🌐 Frontend

Located in `apps/frontend`.

* **Tech stack:** Next.js, React 19, Mantine, TypeScript, Next-Intl for i18n.
* **Scripts:**

```bash
yarn dev    # Start Next.js dev server
yarn build  # Build frontend for production
yarn start  # Start production server
yarn lint   # Lint frontend code
```

* **Folder structure:**

```
src/
├── app/          # Next.js pages and layouts
├── components/   # Reusable UI components
├── actions/      # Frontend actions (e.g., set-language)
└── i18n/         # Internationalization utils
```

---

## 📦 Shared Package: `utils`

Located in `packages/utils`.

* Contains utilities shared across backend and frontend.

* Built with TypeScript.

* **Scripts:**

```bash
yarn build         # Compile TypeScript
yarn test          # Run tests
yarn clean         # Remove build artifacts
```

---

## ⚙️ TypeScript & ESLint

* **Root tsconfig:** `tsconfig.base.json` (extends to all packages)
* **ESLint config:** `eslint.config.js` at root, applied across all workspaces.

---

## 🔗 Useful Tips

* Update shared utilities and immediately use them in apps via `@my/utils`.
* Use `yarn workspaces foreach` for running commands across all packages:

```bash
yarn workspaces foreach --all run test
```

* For database changes, always use Prisma commands in the backend workspace.

---

## 📖 References

* [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
* [Prisma Docs](https://www.prisma.io/docs/)
* [Next.js Docs](https://nextjs.org/docs)
* [Mantine Docs](https://mantine.dev/)
