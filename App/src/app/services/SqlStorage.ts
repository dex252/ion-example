import { File } from '@ionic-native/file/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { User } from '../models/User';
import { Recipe } from '../models/Recipe';

export class SqlStorage {

    static module: string = "SQLStorage.ts";
    static FileSystemPath: string;

    static file: File = new File();
    static sqlite: SQLite = new SQLite();
    static try: boolean = true;

    static db: SQLiteObject;

    static OpenDb(): Promise<any> {
        if (this.try) {
            this.try = false;
            this.FileSystemPath = this.file.externalDataDirectory;

            return SqlStorage.sqlite.create({
                name: "data.db",
                location: "default"
            }).then((_db: SQLiteObject) => {
                SqlStorage.db = _db;
                return SqlStorage.db.transaction((tz) => {
                    tz.executeSql(
                        'CREATE TABLE IF NOT EXISTS User (' +

                        'key TINYINT(1), ' +
                        'login VARCHAR (100), ' +
                        'password VARCHAR (100), ' +
                        'token VARCHAR (200), ' +
                        'id TINYINT(4), ' +
                        'PRIMARY KEY (key))');

                    tz.executeSql('INSERT INTO User VALUES (?1,?2,?3,?4,?5)', [0, null, null, null, 0]);

                    tz.executeSql(
                        'CREATE TABLE IF NOT EXISTS Recipes (' +

                        'guid VARCHAR(100), ' +
                        'id TINYINT(36), ' +
                        'title VARCHAR(100), ' +
                        'text VARCHAR (1000), ' +

                        'PRIMARY KEY (guid))');

                }).catch(e => console.log(e.message));
            },
                e => console.log(e.message)).catch(e => e.message);
        } else {
            return SqlStorage.sqlite.create({
                name: "data.db",
                location: "default"
            }).catch(e => console.log(e.message));
        }
    }

    static GetUser(): Promise<User> {
        return SqlStorage.db.executeSql('SELECT * FROM User WHERE key=?1', [0])
            .then((data) => {
                var item = data.rows.item(0) as User;

                if (item != null && item.login != null && item.password != null)
                    return item;
                else return null;
            }).catch((e) => {
                console.log(e.message);
                return null;
            });
    }

    static SaveUser(user: User): Promise<boolean> {
        return SqlStorage.db.executeSql('UPDATE User SET login=?2, password=?3, token=?4 WHERE key=?1',
            [0, user.login, user.password, user.token])
            .then(() => {
                return true;
            }).catch((e) => {
                return false;
            });
    }

    static GetCollection(): Promise<Recipe[]> {
        var collection: Recipe[] = [];
        return SqlStorage.db.executeSql('SELECT * FROM Recipes', [])
            .then((data) => {
                for (var i = 0; i < data.rows.length; i++) {
                    let item = data.rows.item(i) as Recipe;
                    collection.push(item);
                }
            }).then(e => {
                return collection;
            })
            .catch ((e) => {
            console.log(e.message);
            return null;
        });
    }

    static AddRecipe(item: Recipe): Promise<any> {
        return SqlStorage.db.executeSql('INSERT INTO Recipes VALUES (?1,?2,?3,?4)',
            [
                item.guid,
                item.id,
                item.title,
                item.text
            ]).then(() => alert('Recipe has been add')).catch((e) => {
                alert(e.message);
            });
    }

    static DeleteRecipe(item: Recipe): Promise<any> {
        return SqlStorage.db.executeSql('DELETE FROM Recipes WHERE guid=?1', [item.guid]).then(() => alert('Recipe has been deleted')).catch((e) => {
            alert(e.message);
        });
    }
}
