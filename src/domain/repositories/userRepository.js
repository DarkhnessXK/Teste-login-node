import { fs } from 'node:fs';


class UserRepository {
    async getOne(id) {
        const database = await this.readDatabase()
        for (user of database) {
            if (user.id == id) {
                return user
            }
        }
    }
    async save(user) {
        let database = await this.readDatabase()
        database.push(user)
        const jsonStr = JSON.stringify(objetoJSON, null, 2)
        await this.write(jsonStr)
    }

    delete(id) {}
    update(id) {}

    write(jsonStr) {
        return new Promise((resolve, reject) => {
            fs.writeFile('database.json', jsonStr, (err) => {
                if (err) {
                reject(err);
                }
                resolve(true);
            });

        })
    }


    createDatabase() {
        return new Promise((resolve, reject) => {
            fs.writeFile('database.json', "[]", (err) => {
                if (err) {
                  reject(err);
                }
                resolve(true);
            });

        })
    }

    async readDatabase() {
        try {
            return await _readDatabase()
        } catch {
            await this.createDatabase()
            return await _readDatabase()
        }
    }

    _readDatabase() {
        return new Promise((resolve, reject) => {
            fs.readFile('database.json', 'utf8', (err, data) => {
                if (err) {
                  reject(err)
                }
              
                resolve(JSON.parse(data));
            });
        })
    }
}
