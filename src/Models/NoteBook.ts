import chalk from "chalk";
import { randomUUID } from "node:crypto";
import { User } from "./User.js";


export interface INote 
{
    readonly id: string;
    title: string;
    content: string;
    author: User;
    noteBook: NoteBook;
    preview(): string;
}


export function isInstanceOfINote(obj: any): obj is INote
{
    return (
        obj !== null &&
        typeof obj === 'object' &&
        typeof obj.id === 'string' &&
        typeof obj.title === 'string' &&
        typeof obj.content === 'string' &&
        obj.author instanceof User &&
        obj.noteBook instanceof NoteBook &&
        typeof obj.preview === 'function'
    );
}


class Note implements INote
{
    public readonly id: string;
    public title: string;
    public content: string;
    public author: User;
    public noteBook: NoteBook;

    private constructor(title: string, content: string, author: User, noteBook: NoteBook)
    {
        this.id = randomUUID();
        this.title = title;
        this.content = content;
        this.author = author;
        this.noteBook = noteBook;
    }

    public preview()
    {
        return (`${chalk.bold.cyan("Note Preview:")}
    ${chalk.bold("title")}:     ${this.title}
    ${chalk.bold("content")}:   ${this.content.slice(0, 50) + " ..."}
        `);
    }

    public static create(title: string, content: string, author: User, noteBook: NoteBook)
    {
        return new Note(title, content, author, noteBook);
    }
}




export class NoteBook 
{
    public readonly id: string;
    public name: string;
    public owner: User;
    private _notes: Note[];

    constructor(name: string, user: User)
    {
        this.id = randomUUID();
        this.name = name;
        this._notes = [];
        this.owner = user;
    }

    get notes(): Note[]
    {
        return this._notes;
    }

    public addNote(title: string, content: string)
    {
        const note = Note.create(title, content, this.owner, this);
        this._notes.push(note);
        return note;

    }

    public removeNote(note: Note)
    {
        const index = this._notes.indexOf(note);
        if (index !== -1)
        {
            this._notes.splice(index, 1);
            console.log("INFO::     note removed");
        }
        else
        {
            console.log("INFO::     note not found");
        }
    }

}


