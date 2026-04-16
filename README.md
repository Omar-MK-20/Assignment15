# Assignment 15 – Simple Notes Management System (TypeScript OOP CLI)

## Description
This project is a TypeScript, OOP-focused “Simple Notes Management System” implemented as an interactive **command-line** application. It demonstrates core object-oriented concepts (classes, inheritance, composition/aggregation/association patterns, and generics) through the app’s domain models and services.

The CLI supports:
- User **signup** and **login**
- Selecting or creating **note books**
- Selecting, creating, **updating**, and **previewing** **notes**

## Features
- OOP domain models:
  - `User` (with `age` validation)
  - `Admin` (extends `User`)
  - `NoteBook` (stores notes)
  - `Note` (implements `INote` and provides `preview()`)
  - Generic `Storage<T>` (in-memory collection)
- In-memory “database” + in-memory session state
- CLI workflow driven by `@clack/prompts` (select/text/password/confirm prompts)
- Note preview formatting (shows the first 50 characters of content)

## Tech Stack
- TypeScript (compiled with `tsc`)
- Node.js with ES Modules (`"type": "module"`, `module: "nodenext"`)
- `@clack/prompts` (interactive CLI prompts)
- `chalk` (terminal styling)
- Node.js `crypto.randomUUID()` (IDs)

## Folder Structure
- `src/index.ts`: CLI entrypoint and main interactive flow
- `src/database.ts`: in-memory seeded data + session getters/setters
- `src/Models/`
  - `User.ts`
  - `Admin.ts`
  - `NoteBook.ts` (also defines `INote` and the internal `Note` implementation)
  - `Storage.ts`
- `src/Services/`
  - `auth.service.ts`: signup/login logic
  - `note.service.ts`: note book/note operations
- `src/util/`
  - `action.enms.ts`: enums used by the CLI
  - `types.ts`: `TSession` type

Project diagram assets in the repo root:
- `UML.jpg`
- `UML.drawio`
- `Flow Chart.drawio`

## Prerequisites
- Node.js and npm

## Installation
```bash
npm install
```

## Environment Variables
- None (the codebase does not use `process.env` or `.env`).

## How to Run / How to Try
### Run (recommended)
1. Build:
   ```bash
   npm run build
   ```
2. Start the CLI:
   ```bash
   npm run start:js
   ```

### Dev (watch mode)
```bash
npm run dev
```
This runs the TypeScript compiler in watch mode and re-runs Node on the compiled `dist/index.js`.

### `start:ts` note
`npm run start:ts` currently runs `npx -w tsc` (TypeScript compilation only) and does not start the CLI process.

## Usage Overview (CLI)
When you start the app, you will see:
1. **Signup** / **Login** / **Exit**
2. After login, you manage note books and notes:
   - Select a note book (or choose **Create new NoteBook**)
   - Select a note (or choose **Create new Note**)
   - Choose an action:
     - **Update Note** (enter title and/or content)
     - **Preview Note** (prints a formatted preview)
     - **Exit**

### Validation / Business Rules (from code)
- `User.age` must be between **18 and 60** (inclusive). Invalid values throw an error.
- Signup:
  - Prevents duplicate emails
  - Creates a new user
  - Automatically creates a notebook named **`main`** for the new user
- Login:
  - Requires matching email and password
- Note preview:
  - Displays content truncated to the first **50 characters**, followed by `" ..."`

## Seed Data (already in the in-memory “database”)
On startup, `src/database.ts` seeds:
- Admin user:
  - `omar@admin.com` / `admin`
- Regular users:
  - `ahmed@example.com` / `123456`
  - `sara@example.com` / `abcdef`
- Note books:
  - For `ahmed@example.com`: `Work Notes`, `Personal Notes`
  - For `sara@example.com`: `Ideas`
- Notes are also pre-created under those notebooks.

Because everything is in-memory, any changes you make exist only for the current run.

## Scripts
From `package.json`:
- `build`: `npx tsc`
- `start:js`: `node ./dist/index.js`
- `start:ts`: `npx -w tsc`
- `dev`: `concurrently "tsc -w" "node --watch ./dist/index.js" --kill-others`


## Notes / Architecture Details
- **In-memory data layer**: `src/database.ts` uses `Storage<T>` to store users and tracks the current session (`user`, `noteBook`, `note`) for the CLI.
- **Services layer**:
  - `AuthService` handles signup/login and session initialization
  - `NoteService` handles selecting/creating note books, creating/updating notes, and generating previews
- **Domain models**:
  - `NoteBook` owns its notes internally (`_notes`)
  - `Note` references its `author` (`User`) and `noteBook` for association-style modeling

## License
- This project is for education purposes only.