import * as DBRepo from "../database.js";
import { NoteBook } from "../Models/NoteBook.js";

export class NoteService
{
    public static createNoteBook(noteBookName: string)
    {
        const newNoteBook = new NoteBook(noteBookName, DBRepo.getUser());
        DBRepo.getUser().noteBooks.push(newNoteBook);
        return true;

    }

    public static getAllNoteBooks()
    {
        return DBRepo.getUser().noteBooks;
    }

    public static setNoteBook(noteBookId: string)
    {
        const existNoteBook = DBRepo.getUser().noteBooks.find(noteBook => noteBook.id == noteBookId);

        if (!existNoteBook)
        {
            throw new Error("Choose Note Book first to set it");
        }

        DBRepo.setNoteBook(existNoteBook);
        DBRepo.setNote(undefined);
        return true;
    }

    public static createNote(noteData: { title: string; content: string; })
    {
        const newNoteBook = DBRepo.getNoteBook().addNote(noteData.title.trim(), noteData.content.trim());
        return newNoteBook;
    }

    public static getAllNotes()
    {
        return DBRepo.getNoteBook().notes;
    }

    public static setNote(noteId: string)
    {
        const existNote = DBRepo.getNoteBook().notes.find(note => note.id == noteId);

        if (!existNote)
        {
            throw new Error("Choose Note first to set it");
        }

        DBRepo.setNote(existNote);
        return true;
    }

    public static updateNote(noteData: { title?: string, content?: string; })
    {
        const title = noteData.title?.trim();
        const content = noteData.content?.trim();

        if (!title && !content)
        {
            throw new Error("You must enter title or content");
        }

        if (title) DBRepo.getNote().title = title;
        if (content) DBRepo.getNote().content = content;

        return true;

    }

    public static previewNote()
    {
        return DBRepo.getNote().preview();
    }


}