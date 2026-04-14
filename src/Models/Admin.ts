import chalk from 'chalk';
import { User } from "./User.js";
import type { INote } from './NoteBook.js';

export class Admin extends User
{
    constructor(name: string, email: string, password: string, phone: string, age: number)
    {
        super(name, email, password, phone, age);
    }

    public manageNotes({ oldNote, title, content }: { oldNote: INote; title?: string; content?: string; })
    {
        if (!title && !content) 
        {
            console.error(chalk.red("Error:     ") + "you must provide at least title or content");
            return;
        }
        if (title) oldNote.title = title;
        if (content) oldNote.content = content;
    }
}