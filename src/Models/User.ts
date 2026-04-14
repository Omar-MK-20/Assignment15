import chalk from 'chalk';
import { randomUUID } from "node:crypto";
import type { NoteBook } from "./NoteBook.js";


export class User
{
    public readonly id: string;
    public name: string;
    public email: string;
    protected password: string;
    public phone: string;
    private _age!: number;
    public noteBooks: NoteBook[];


    constructor(name: string, email: string, password: string, phone: string, age: number)
    {
        this.id = randomUUID();
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
        this.noteBooks = [];
    }

    public get age(): number
    {
        return this._age;
    }

    public set age(value: number)
    {
        if (value < 18 || value > 60)
        {
            console.error(chalk.red("Error:     ") + "Invalid age");
            return;
        }
        this._age = value;
    }

    public isPasswordCorrect(password: string): boolean
    {
        return this.password === password;
    }

    public displayInfo()
    {
        console.log(`${chalk.bold.cyan("User Info:")}
    ${chalk.bold("id")}:        ${this.id}
    ${chalk.bold("name")}:      ${this.name}
    ${chalk.bold("email")}:     ${this.email}
    ${chalk.bold("phone")}:     ${this.phone}
    ${chalk.bold("age")}:       ${this.age}
`);
    }
}
