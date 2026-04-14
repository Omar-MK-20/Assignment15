import * as prompt from "@clack/prompts";
import { NoteBook } from "../Models/NoteBook.js";
import { currentSession } from "../database.js";

export class NoteService
{
    public static async createNoteBook()
    {
        prompt.log.step('Create Note Book');

        if (!currentSession.user)
        {
            prompt.log.error("Login first to create Note Book");
            return false;
        }

        const noteBookName = await prompt.text({
            message: 'Enter Note Book name:',
            validate(value) { if (!value) return `Name is required!`; },
        });

        if (prompt.isCancel(noteBookName))
        {
            // prompt.cancel('Operation cancelled.');
            process.exit(0);
        }


        const newNoteBook = new NoteBook(noteBookName, currentSession.user);
        currentSession.user.noteBooks.push(newNoteBook);
        currentSession.noteBook = newNoteBook;
        return true;

    }


    public static async getAllNoteBooks()
    {
        prompt.log.step('View all Note Books');

        if (!currentSession.user)
        {
            prompt.log.error("Logon first to create Note Book");
            return false;
        }

        const noteBookId = await prompt.select({
            message: 'Pick a Note Book.',
            options: [
                ...currentSession.user.noteBooks.map((noteBook) =>
                {
                    return { value: noteBook.id, label: noteBook.name };
                }),
                { value: "createBook", label: 'Create new NoteBook' },
            ],
        });

        if (prompt.isCancel(noteBookId))
        {
            // prompt.cancel('Operation cancelled.');
            process.exit(0);
        }

        if (noteBookId == "createBook")
        {
            return await this.createNoteBook();
        }

        const existNoteBook = currentSession.user.noteBooks.find(noteBook => noteBook.id == noteBookId);

        if (!existNoteBook)
        {
            return false;
        }

        currentSession.noteBook = existNoteBook;
        return true;


    }


    public static async createNote()
    {
        prompt.log.step('Create Note');

        if (!currentSession.user)
        {
            prompt.log.error("Login first to create Note Book");
            return false;
        }

        if (!currentSession.noteBook)
        {
            prompt.log.error("Choose Note Book first to create Note");
            return false;
        }

        const noteData = await prompt.group(
            {
                title: () => prompt.text({
                    message: 'Enter Note title:',
                    validate(value) { if (!value) return `Title is required!`; },
                }),
                content: () => prompt.text({
                    message: 'Enter Note content:',
                    validate(value) { if (!value) return `Content is required!`; },
                }),
            },
            {
                // On Cancel callback that wraps the group
                // So if the user cancels one of the prompts in the group this function will be called
                onCancel: ({ results }) =>
                {
                    // prompt.cancel('Operation cancelled.');
                    process.exit(0);
                },
            }
        );


        const newNote = currentSession.noteBook.addNote(noteData.title, noteData.content);
        currentSession.note = newNote;
        return true;

    }


    public static async getAllNotes()
    {
        prompt.log.step('View all Notes');

        if (!currentSession.user)
        {
            prompt.log.error("Logon first to create Note Book");
            return false;
        }
        if (!currentSession.noteBook)
        {
            prompt.log.error("Choose Note Book first to create Note");
            return false;
        }

        const noteId = await prompt.select({
            message: 'Pick a Note.',
            options: [
                ...currentSession.noteBook.notes.map((note) =>
                {
                    return { value: note.id, label: note.title };
                }),
                { value: "createNote", label: 'Create new Note' },
            ],
        });

        if (prompt.isCancel(noteId))
        {
            // prompt.cancel('Operation cancelled.');
            process.exit(0);
        }

        if (noteId == "createNote")
        {
            return await this.createNote();
        }

        const existNote = currentSession.noteBook.notes.find(note => note.id == noteId);

        if (!existNote)
        {
            return false;
        }

        currentSession.note = existNote;
        return true;
    }





}