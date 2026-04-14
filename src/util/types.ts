import type { INote, NoteBook } from "../Models/NoteBook.js";
import type { User } from "../Models/User.js";

export type TSession = {
    user: User | undefined;
    noteBook: NoteBook | undefined;
    note: INote | undefined;
};