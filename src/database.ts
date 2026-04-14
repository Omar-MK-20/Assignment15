import { Admin } from "./Models/Admin.js";
import { NoteBook } from "./Models/NoteBook.js";
import { User } from "./Models/User.js";
import type { TSession } from "./util/types.js";

export const currentSession: TSession = { user: undefined, noteBook: undefined, note: undefined };

const admin = new Admin("Omar", "omar@admin.com", "admin", "01012345678", 25);
let users: User[] = [admin];

const user1 = new User(
    "Ahmed Ali",
    "ahmed@example.com",
    "123456",
    "+201000000001",
    25
);

const user2 = new User(
    "Sara Mohamed",
    "sara@example.com",
    "abcdef",
    "+201000000002",
    30
);

// Create Notebooks
const notebook1 = new NoteBook("Work Notes", user1);
const notebook2 = new NoteBook("Personal Notes", user1);
const notebook3 = new NoteBook("Ideas", user2);

// Attach notebooks to users
user1.noteBooks.push(notebook1, notebook2);
user2.noteBooks.push(notebook3);

// Create Notes
const note1 = notebook1.addNote(
    "Meeting Notes",
    "Discuss project timeline and deliverables..."
);

const note2 = notebook1.addNote(
    "Daily Tasks",
    "Finish backend API and review PRs..."
);

const note3 = notebook2.addNote(
    "Shopping List",
    "Milk, Eggs, Bread, Coffee..."
);

const note4 = notebook3.addNote(
    "Startup Idea",
    "A platform for AI-powered education..."
);


users.push(user1, user2);


export function addUser(user: User)
{
    if (!(user instanceof User)) return false;
    users.push(user);
    return true;
}

export function getUsers()
{
    return users;
}

export function getSingleUser(findCallBackFN: (value: User, index: number, obj: User[]) => unknown)
{
    return users.find(findCallBackFN);
}

