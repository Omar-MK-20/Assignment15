import { addUser, getSingleUser, setNoteBook, setUser } from "../database.js";
import { NoteBook } from "../Models/NoteBook.js";
import { User } from "../Models/User.js";


export class AuthService
{
    public static signup(userData: { name: string; email: string; password: string; phone: string; age: string; })
    {

        const age = Number(userData.age);
        if (isNaN(age))
        {
            throw new Error("Invalid age");
        }

        const existUser = getSingleUser(user => user.email == userData.email);
        if (existUser)
        {
            throw new Error("Email already exist");
        }

        const newUser = new User(userData.name, userData.email, userData.password, userData.phone, age);
        const mainNoteBook = new NoteBook("main", newUser);
        newUser.noteBooks.push(mainNoteBook);

        const result = addUser(newUser);
        if (!result)
        {
            throw new Error("Failed saving user");
        }

        return newUser;

    }

    public static login(userData: { email: string; password: string; })
    {


        const existUser = getSingleUser((user) => user.email == userData.email && user.isPasswordCorrect(userData.password));

        if (!existUser)
        {
            throw new Error("Invalid email or password");
        }

        setUser(existUser);
        setNoteBook(undefined);

        return existUser;

    }
}