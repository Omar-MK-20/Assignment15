# 📘 Assignment 15 – TypeScript OOP (Simple Notes System)

## 🚀 Overview
This project implements a **Simple Notes Management System** using **TypeScript OOP concepts**.

It demonstrates:
- Classes & Inheritance
- Composition, Aggregation, Association
- Generics
- UML Class Diagram

---

## 🛠️ Tech Stack
- TypeScript
- Node.js (optional for running)
- OOP Principles

---

## 📁 Project Structure
```
src/
│
├── models/
│   ├── User.ts
│   ├── Admin.ts
│   ├── Note.ts
│   ├── NoteBook.ts
│   └── Storage.ts
│
├── index.ts
│
└── diagram/
└── uml-diagram.png (or .pdf)

````

---

# ✅ Part A – Implementation Tasks

## 👤 1. User Class
- [ ] Create class `User`
- [ ] Add all required properties
- [ ] Apply access modifiers
- [ ] Validate age (18–60)
- [ ] Implement `displayInfo()`

### 💡 How to implement
- Use constructor for initialization
- Use `private` for sensitive data like password
- Add validation inside constructor or setter
- Print user info using `console.log`

---

## 👑 2. Admin Class (Inheritance)
- [ ] Create `Admin` class
- [ ] Extend `User`
- [ ] Add `manageNotes()` method

### 💡 How to implement
- Use `extends User`
- Call `super(...)` in constructor
- Add admin-specific behavior only

---

## 📝 3. Note Class
- [ ] Create `Note` class
- [ ] Add properties
- [ ] Link note to user
- [ ] Implement `preview()`

### 💡 How to implement
- Pass `User` object or `userId`
- `preview()` → return first 20–30 chars

---

## 📚 4. NoteBook Class (Composition)
- [ ] Create `NoteBook`
- [ ] Store `Note[]`
- [ ] Add `addNote()`
- [ ] Add `removeNote()`

### 💡 How to implement
- Use internal array `notes: Note[]`
- Composition → notes belong to notebook lifecycle

---

## 🔗 5. Aggregation (User ↔ NoteBook)
- [ ] Allow user to own multiple notebooks

### 💡 How to implement
- Add `notebooks: NoteBook[]` inside `User`
- Notebooks can exist independently

---

## 🔄 6. Association (User ↔ Note)
- [ ] Link note to user (author)

### 💡 How to implement
- Store `user: User` inside `Note`
- Keep loose coupling

---

## 📦 7. Generic Storage Class
- [ ] Create `Storage<T>`
- [ ] Implement:
  - [ ] `addItem()`
  - [ ] `removeItem()`
  - [ ] `getAllItems()`

### 💡 How to implement
```ts
class Storage<T> {
  private items: T[] = [];

  addItem(item: T) {
    this.items.push(item);
  }

  removeItem(item: T) {
    this.items = this.items.filter(i => i !== item);
  }

  getAllItems(): T[] {
    return this.items;
  }
}
````

---

# 📊 Part B – UML Diagram

## 🧩 Class Diagram

* [ ] Include all classes
* [ ] Include attributes
* [ ] Include methods
* [ ] Show relationships

## 🔍 Relationship Types

* [ ] Inheritance → `Admin → User`
* [ ] Composition → `NoteBook → Note`
* [ ] Aggregation → `User → NoteBook`
* [ ] Association → `Note → User`

### 💡 How to draw

* Use tools like:

  * draw.io
  * Lucidchart
  * StarUML
* Follow UML symbols:

  * ▲ Inheritance
  * ◆ Composition
  * ◇ Aggregation
  * — Association

---

# 📈 Progress Tracker

| Task           | Status |
| -------------- | ------ |
| User Class     | ⬜      |
| Admin Class    | ⬜      |
| Note Class     | ⬜      |
| NoteBook Class | ⬜      |
| Storage Class  | ⬜      |
| Relationships  | ⬜      |
| UML Diagram    | ⬜      |
| Testing        | ⬜      |

---

# 🎯 Final Submission Checklist

* [ ] All classes implemented
* [ ] All relationships correctly applied
* [ ] Code compiles without errors
* [ ] UML diagram completed
* [ ] UML matches code
* [ ] Project organized properly
* [ ] README updated

---

# 🧠 Best Practices

* Keep classes **small and focused**
* Use **access modifiers properly**
* Avoid duplicating logic
* Keep relationships **clear and meaningful**
* Match UML diagram with actual implementation

---

# 🏁 Bonus Tips

* Add sample usage in `index.ts`
* Test each class individually
* Use meaningful naming

---

## 📌 Example Run (Optional)

```ts
const user = new User(1, "Ali", "ali@mail.com", "123456", "010000", 25);
user.displayInfo();
```

---

## 👨‍💻 Author

Your Name Here
