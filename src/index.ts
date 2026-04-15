import * as prompt from "@clack/prompts";
import chalk from "chalk";
import { getUser } from "./database.js";
import { AuthService } from "./Services/auth.service.js";
import { NoteService } from "./Services/note.service.js";
import { authActionEnum } from "./util/action.enms.js";



async function main()
{

    prompt.intro(chalk.bgWhite.bold.blackBright("    Simple Notes Management System    "));

    while (true)
    {
        // =========    get options from user   =========
        let authAction = await prompt.select({
            message: 'what do you want to do?',
            options: [
                { value: authActionEnum.signup, label: 'Signup' },
                { value: authActionEnum.login, label: 'Login' },
                { value: authActionEnum.exit, label: 'Exit' },
            ],
        });

        // =========    if user cancel with `CTRL+C` or `ESC`   =========
        if (prompt.isCancel(authAction))
        {
            prompt.cancel('Operation cancelled.');
            break;
        }

        // =========    Signup    ========= 
        if (authAction == authActionEnum.signup)
        {
            prompt.log.step('Signup');

            const userData = await prompt.group(
                {
                    name: () => prompt.text({
                        message: 'Enter your name:',
                        validate(value) { if (!value) return `Name is required!`; },
                    }),
                    email: () => prompt.text({
                        message: 'Enter your email:',
                        validate(value) { if (!value) return `Email is required!`; },
                    }),
                    password: () => prompt.password({
                        message: 'Enter your password:',
                        validate(value) { if (!value) return `Password is required!`; },
                    }),
                    phone: () => prompt.text({
                        message: 'Enter your phone:',
                        validate(value) { if (!value) return `Phone is required!`; },
                    }),
                    age: () => prompt.text({
                        message: 'Enter your age:',
                        validate(value) { if (!value) return `Age is required!`; },
                    }),
                },
                {
                    onCancel: ({ results }) =>
                    {
                        prompt.cancel('Operation cancelled.');
                        process.exit(0);
                    },
                }
            );


            try
            {
                const result = AuthService.signup(userData);
                prompt.log.success(`${result.name} Created Successfully!`);
                authAction = authActionEnum.login;
            }
            catch (error)
            {
                if (error instanceof Error) prompt.log.error(error.message);
                else prompt.log.error(String(error));
                break;
            }
        }

        // =========    Login   =========
        if (authAction == authActionEnum.login)
        {

            prompt.log.step('Login');

            const userData = await prompt.group(
                {
                    email: () => prompt.text({
                        message: 'Enter your email:',
                        validate: (value) => { if (!value) return "Email is required"; }
                    }),
                    password: () => prompt.password({
                        message: 'Enter your password:',
                        validate: (value) => { if (!value) return "Password is required"; }
                    }),
                },
                {
                    onCancel: ({ results }) =>
                    {
                        prompt.cancel('Operation cancelled.');
                        process.exit(0);
                    },
                }
            );

            try
            {
                const user = AuthService.login(userData);
                prompt.log.success(`${user.name} logged in successfully`);
            }
            catch (error)
            {
                if (error instanceof Error)
                {
                    prompt.log.error(error.message);
                    const shouldContinue = await prompt.confirm({
                        message: 'Try again?',
                    });

                    if (!shouldContinue)
                    {
                        break;
                    }

                    continue;
                }
                else prompt.log.error("Login failed");
            }
            break;
        }

        // =========    Exit    =========
        if (authAction == authActionEnum.exit)
        {
            break;
        }

    }

    if (getUser())
    {
        while (true)
        {
            prompt.log.step('View all Note Books');

            try
            {
                const noteBooks = NoteService.getAllNoteBooks();

                const noteBookId = await prompt.select({
                    message: 'Pick a Note Book.',
                    options: [
                        ...noteBooks.map((noteBook) =>
                        {
                            return { value: noteBook.id, label: noteBook.name };
                        }),
                        { value: "createBook", label: 'Create new NoteBook' },
                    ],
                });

                if (prompt.isCancel(noteBookId))
                {
                    prompt.cancel('Operation cancelled.');
                    break;
                }


                if (noteBookId == "createBook")
                {

                    prompt.log.step('Create Note Book');
                    const noteBookName = await prompt.text({
                        message: 'Enter Note Book name:',
                        validate(value) { if (!value) return `Name is required!`; },
                    });

                    if (prompt.isCancel(noteBookName))
                    {
                        prompt.cancel('Operation cancelled.');
                        break;
                    }

                    NoteService.createNoteBook(noteBookName);

                    continue;
                }

                NoteService.setNoteBook(noteBookId);
            }
            catch (error)
            {
                if (error instanceof Error) prompt.log.error(error.message);
                else prompt.log.error(String(error));
                break;
            }

            prompt.log.step('View all Notes');

            try
            {
                const notes = NoteService.getAllNotes();

                const noteId = await prompt.select({
                    message: 'Pick a Note.',
                    options: [
                        ...notes.map((note) =>
                        {
                            return { value: note.id, label: note.title };
                        }),
                        { value: "createNote", label: 'Create new Note' },
                    ],
                });

                if (prompt.isCancel(noteId))
                {
                    prompt.cancel('Operation cancelled.');
                    break;
                }


                if (noteId == "createNote")
                {

                    prompt.log.step('Create Note');
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
                            onCancel: ({ results }) =>
                            {
                                prompt.cancel('Operation cancelled.');
                                process.exit(0);
                            },
                        }
                    );

                    NoteService.createNote(noteData);

                    continue;
                }

                NoteService.setNote(noteId);
            }
            catch (error)
            {
                if (error instanceof Error) prompt.log.error(error.message);
                else prompt.log.error(String(error));
                break;
            }


            let action = await prompt.select({
                message: 'what do you want to do?',
                options: [
                    { value: "updateNote", label: 'Update Note' },
                    { value: "previewNote", label: 'Preview Note' },
                    { value: "exit", label: 'Exit' },
                ],
            });

            if (prompt.isCancel(action))
            {
                prompt.cancel('Operation cancelled.');
                break;
            }

            if (action == "updateNote")
            {
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
                );

                try
                {
                    NoteService.updateNote(noteData);
                    prompt.log.success("Note updated successfully");
                } catch (error)
                {
                    if (error instanceof Error) prompt.log.error(error.message);
                    else prompt.log.error(String(error));
                }
                finally { continue; }
            }

            if (action == "previewNote")
            {
                try
                {
                    const notePreview = NoteService.previewNote();
                    prompt.log.info(notePreview);

                } catch (error)
                {
                    if (error instanceof Error) prompt.log.error(error.message);
                    else prompt.log.error(String(error));
                }
                finally { continue; }

            }

            // =========    Exit    =========
            if (action == "exit") { break; }
        }
    }
}


await main();
