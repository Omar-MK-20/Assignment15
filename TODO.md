# Assignment 15 – TypeScript OOP Assignment

## Overview
This project implements a **Simple Notes Management System** in TypeScript and includes:
- Classes and inheritance
- Composition, aggregation, and association
- Generics
- UML class diagram

Use this checklist to track what is done and what still needs to be completed.

---

## Part A – System: Simple Notes Management System

### 1) Base Class – `User`
- [x] Create `User` class
- [x] Add `id: number`
- [x] Add `name: string`
- [x] Add `email: string`
- [x] Add `password: string`
- [x] Add `phone: string`
- [x] Add `age: number`
- [x] Validate that age is between 18 and 60
- [x] Use access modifiers properly
- [x] Add `displayInfo()` method

**How to do it**
1. Create a `User.ts` file.
2. Define the class with a constructor that receives all properties.
3. Make sensitive fields like `password` private if needed.
4. Add validation in the constructor or in a setter/helper method for `age`.
5. Implement `displayInfo()` to print user data in a readable format.

---

### 2) Inheritance – `Admin`
- [x] Create `Admin` class
- [x] Extend `User`
- [x] Add a method to manage notes
- [x] Use inheritance correctly

**How to do it**
1. Create an `Admin.ts` file.
2. Make `Admin` extend `User`.
3. Call `super(...)` inside the constructor.
4. Add an admin-specific method such as `manageNotes()`.
5. Keep shared properties in `User` and admin-only behavior in `Admin`.

---

### 3) Class – `Note`
- [x] Create `Note` class
- [x] Add `id: number`
- [x] Add `title: string`
- [x] Add `content: string`
- [ ] Add `userId` reference to `User`
- [x] Add `preview()` method

**How to do it**
1. Create a `Note.ts` file.
2. Add the required properties in the constructor.
3. Link the note to the author using a `User` reference.
4. Implement `preview()` so it returns only the first few words or characters of the content.

---

### 4) Composition – `NoteBook` and `Note`
- [x] Create `NoteBook` class
- [x] Store a collection of `Note` objects
- [x] Add `addNote()`
- [x] Add `removeNote()`
- [x] Make the relationship composition

**How to do it**
1. Create a `NoteBook.ts` file.
2. Give it an internal array like `notes: Note[]`.
3. Implement `addNote(note: Note)` to push a note into the array.
4. Implement `removeNote(id: number)` to delete a note by its id.
5. Treat notes as part of the notebook lifecycle to represent composition.

---

### 5) Aggregation – `User` and `NoteBook`
- [x] Link `User` and `NoteBook`
- [x] Allow one user to own multiple notebooks
- [x] Represent the relationship as aggregation

**How to do it**
1. Add a `notebooks` array inside `User` or a `user` reference inside `NoteBook`.
2. Let notebooks exist independently from the user object.
3. Show that the user only owns or manages notebooks, but does not fully control their lifecycle.

---

### 6) Association – `Note` and `User`
- [x] Link `Note` to `User`
- [x] Ensure each note has an author
- [x] Represent the relationship as association

**How to do it**
1. Store the author as a `User` reference in `Note`.
2. Pass the user object when creating a note.
3. Keep the relationship loose so the note can reference the user without owning it.

---

### 7) Generics – `Storage`
- [x] Create generic class `Storage<T>`
- [x] Store any type of data
- [x] Add `addItem()`
- [x] Add `removeItem()`
- [x] Add `getAllItems()`

**How to do it**
1. Create a `Storage.ts` file.
2. Use a generic type parameter like `class Storage<T>`.
3. Store items in an array such as `private items: T[] = []`.
4. Implement `addItem(item: T)` to add data.
5. Implement `removeItem(item: T)` to remove data.
6. Implement `getAllItems()` to return all stored items.

---

## Part B – UML Diagram

### 1) Class Diagram
- [x] Draw UML class diagram
- [x] Include all classes
- [x] Include all attributes
- [x] Include all methods
- [x] Show all relationships

**How to do it**
1. List every class from Part A.
2. Add each class attribute and method.
3. Draw lines between classes to show their relationships.
4. Use UML symbols for inheritance, composition, aggregation, and association.
5. Make sure the diagram matches the TypeScript code.

---

### 2) Identify Relationships
- [x] Mark inheritance
- [x] Mark composition
- [x] Mark aggregation
- [x] Mark association

**How to do it**
1. Use a closed triangle arrow for inheritance.
2. Use a filled diamond for composition.
3. Use an empty diamond for aggregation.
4. Use a plain line for association.
5. Label relationships clearly if needed.

---

## Progress Tracker
- [x] User class completed
- [x] Admin class completed
- [x] Note class completed
- [x] NoteBook class completed
- [x] Storage class completed
- [x] UML diagram completed
- [] Relationship types identified
- [x] Code tested
- [x] README updated

---

## Notes
- Keep class names and property names consistent.
- Ue TypeScript types properly.
- Make sure the UML diagram reflects the implementation exactly.
- Keep the code clean and easy to read.