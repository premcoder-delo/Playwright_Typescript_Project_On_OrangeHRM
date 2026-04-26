import { db } from './sqlite';

db.prepare(`
CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    empId TEXT,
    firstName TEXT,
    lastName TEXT
)
`).run();

db.prepare(`
DELETE FROM employees
`).run();

db.prepare(`
INSERT INTO employees (empId, firstName, lastName)
VALUES (?, ?, ?)
`).run('0319', 'John', 'David');

console.log('Database Seeded Successfully');