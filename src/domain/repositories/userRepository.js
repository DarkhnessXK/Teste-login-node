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

    async save(user) {
        let database = await this.readDatabase();
        database.push(user);
        const jsonStr = JSON.stringify(database, null, 2);
        await this.write(jsonStr);
    }

    delete(id) {
        // Implement delete logic
    }

    update(id) {
        // Implement update logic
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
