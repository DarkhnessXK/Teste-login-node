import { promises as fs } from 'fs';

export class UserRepository {
    async getOne(id) {
        const database = await this.readDatabase();
        for (const user of database) {
            if (user.id == id) {
                return user;
            }
        }
    }

    async getOneByUsername(username) {
        const database = await this.readDatabase();
        for (const user of database) {
            if (user.username == username) {
                return user;
            }
        }
    }

    async save(user) {
        try {
            let database = await this.readDatabase();
            database.push(user);
            const jsonStr = JSON.stringify(database, null, 2);
            await this.write(jsonStr);
        } catch (error) {
            console.error('Error saving user:', error);
            throw error;
        }
    }

    async delete(id) {
        let database = await this.readDatabase();
        const index = database.findIndex(user => user.id === id);
        if (index !== -1) {
            database.splice(index, 1);
            const jsonStr = JSON.stringify(database, null, 2);
            await this.write(jsonStr);
            return true;
        }
        return false;
    }

    async update(id, newData) {
        let database = await this.readDatabase();
        const index = database.findIndex(user => user.id === id);
        if (index !== -1) {
            database[index] = { ...database[index], ...newData };
            const jsonStr = JSON.stringify(database, null, 2);
            await this.write(jsonStr);
            return true;
        }
        return false;
    }

    write(jsonStr) {
        return new Promise((resolve, reject) => {
            fs.writeFile('database.json', jsonStr, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    createDatabase() {
        return new Promise((resolve, reject) => {
            fs.writeFile('database.json', "[]", (err) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    async readDatabase() {
        try {
            const databaseExists = await fs.access('database.json').then(() => true).catch(() => false);
            if (!databaseExists) {
                await this.createDatabase();
            }
            const data = await fs.readFile('database.json', 'utf8');
            console.log('Database Content:', data);
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading database:', err);
            throw err;
        }
    }
}


class Database {

    createTableIfNotExists(tablename) {}
    createDatabase(databasename) {}

}

let db = new Database()
db.createDatabase('database')
db.createTableIfNotExists('table1')
db.createTableIfNotExists('table2')
db.createTableIfNotExists('table3')
db.createTableIfNotExists('table4')