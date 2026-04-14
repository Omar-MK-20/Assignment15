import * as prompt from "@clack/prompts";
import chalk from "chalk";
import { AuthService } from "./Services/auth.service.js";
import { NoteService } from "./Services/note.service.js";
import { currentSession } from "./database.js";
import { authActionEnum } from "./util/action.enms.js";



async function main()
{

    prompt.intro(chalk.bgWhite.bold.blackBright("    Simple Notes Management System    "));

    while (true)
    {
        let authAction = await prompt.select({
            message: 'what do you want to do?',
            options: [
                { value: authActionEnum.signup, label: 'Signup' },
                { value: authActionEnum.login, label: 'Login' },
                { value: authActionEnum.exit, label: 'Exit' },
            ],
        });

        if (prompt.isCancel(authAction))
        {
            prompt.cancel('Operation cancelled.');
            process.exit(0);
        }


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
                await AuthService.signup(userData);
                prompt.log.success('User Created Successfully!');
            }
            catch (error)
            {
                if (error instanceof Error) prompt.log.error(error.message);
                else prompt.log.error(String(error));
                break;
            }
            authAction = authActionEnum.login;
        }

        if (authAction == authActionEnum.login)
        {

            prompt.log.step('Login');

            const userData = await prompt.group(
                {
                    email: () => prompt.text({ message: 'Enter your email:' }),
                    password: () => prompt.password({ message: 'Enter your password:' }),
                },
                {
                    onCancel: ({ results }) =>
                    {
                        // prompt.cancel('Operation cancelled.');
                        process.exit(0);
                    },
                }
            );

            try
            {
                const user = await AuthService.login(userData);
                prompt.log.success(`${user?.name} logged in successfully`);
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

                break;
            }
        }

        if (authAction == authActionEnum.exit)
        {
            break;
        }

    }

    if (currentSession.user)
    {
        while (true)
        {

            const getAllBooksResult = await NoteService.getAllNoteBooks();
            if (!getAllBooksResult)
            {
                prompt.log.error("NoteBooks failed loading");
                break;
            }


            const getAllNotesResult = await NoteService.getAllNotes();
            if (!getAllNotesResult)
            {
                prompt.log.error("Notes failed loading");
                break;
            }

            if (!currentSession.note) { break; }

            console.log(currentSession.note.preview());
        }
    }

}


await main();
