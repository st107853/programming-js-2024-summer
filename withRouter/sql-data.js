const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    university TEXT
    )`);


module.exports = {
    async getUsers() {
        try {
            const user = await new Promise((resolve, reject) => {
                db.all('SELECT * FROM users', [], (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                });
            });
            return user;
        } catch (err) {
            return null;
        }
    },

    async addUser(user) {
        const lastId = await new Promise((resolve, reject) => {
            db.run(`INSERT INTO users (name, age, university) VALUES (?, ?, ?)`, [user.name, user.age, user.university], function (err) {
                if (err) {
                    reject(err);
                }
                resolve(this.changes);
            });
        });
        return {id: lastId, ...user};
    },

    async updateUser(id, updatedData) {
        const changes = await new Promise((resolve, reject) => {
            db.run(`UPDATE users SET name = ?, age = ?, university = ? WHERE id = ?`, [updatedData.name, updatedData.age, updatedData.university, id], function (err) {
                if (err) {
                    reject(err);
                }
                resolve(this.changes);
            });            
        });
        if (changes === 0) {
            return null;
        }
        return this.getUserById(id);
    },

    async deleteUser(id) {
        const changes = await new Promise((resolve, reject) => {
            db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
                if (err) {
                    reject(err);
                }
                resolve(this.changes);
            });
        });
        return changes > 0;
    },

    async getUserById(id) {
        const user = await new Promise((resolve, reject) => {
            db.get(`SELECT * FROM users WHERE id = ?`, [id], function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
        return user;
    }
}