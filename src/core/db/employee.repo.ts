import { db } from './sqlite';

export class EmployeeRepo {

    static save(
        empId: string,
        firstName: string,
        lastName: string
    ) {
        return db.prepare(`
            INSERT INTO employees (
                empId,
                firstName,
                lastName
            )
            VALUES (?, ?, ?)
        `).run(empId, firstName, lastName);
    }

    static getLatestByFirstName(firstName: string) {
        return db.prepare(`
            SELECT *
            FROM employees
            WHERE firstName = ?
            ORDER BY id DESC
            LIMIT 1
        `).get(firstName);
    }

    static getByEmpId(empId: string) {
        return db.prepare(`
            SELECT *
            FROM employees
            WHERE empId = ?
        `).get(empId);
    }

    static deleteAll() {
        return db.prepare(`
            DELETE FROM employees
        `).run();
    }
}