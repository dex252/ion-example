"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ngx_1 = require("@ionic-native/file/ngx");
var ngx_2 = require("@ionic-native/sqlite/ngx");
var SqlStorage = /** @class */ (function () {
    function SqlStorage() {
    }
    SqlStorage.OpenDb = function () {
        if (this.try) {
            this.try = false;
            this.FileSystemPath = this.file.externalDataDirectory;
            return SqlStorage.sqlite.create({
                name: "data.db",
                location: "default"
            }).then(function (_db) {
                SqlStorage.db = _db;
                return SqlStorage.db.transaction(function (tz) {
                    tz.executeSql('CREATE TABLE IF NOT EXISTS User (' +
                        'key TINYINT(1), ' +
                        'login VARCHAR (100), ' +
                        'password VARCHAR (100), ' +
                        'token VARCHAR (200), ' +
                        'id TINYINT(4), ' +
                        'PRIMARY KEY (key))');
                    tz.executeSql('INSERT INTO User VALUES (?1,?2,?3,?4,?5)', [0, null, null, null, 0]);
                    tz.executeSql('CREATE TABLE IF NOT EXISTS Recipes (' +
                        'guid VARCHAR(100), ' +
                        'id TINYINT(36), ' +
                        'title VARCHAR(100), ' +
                        'text VARCHAR (1000), ' +
                        'PRIMARY KEY (guid))');
                }).catch(function (e) { return console.log(e.message); });
            }, function (e) { return console.log(e.message); }).catch(function (e) { return e.message; });
        }
        else {
            return SqlStorage.sqlite.create({
                name: "data.db",
                location: "default"
            }).catch(function (e) { return console.log(e.message); });
        }
    };
    SqlStorage.GetUser = function () {
        return SqlStorage.db.executeSql('SELECT * FROM User WHERE key=?1', [0])
            .then(function (data) {
            var item = data.rows.item(0);
            if (item != null && item.login != null && item.password != null)
                return item;
            else
                return null;
        }).catch(function (e) {
            console.log(e.message);
            return null;
        });
    };
    SqlStorage.SaveUser = function (user) {
        return SqlStorage.db.executeSql('UPDATE User SET login=?2, password=?3, token=?4 WHERE key=?1', [0, user.login, user.password, user.token])
            .then(function () {
            return true;
        }).catch(function (e) {
            return false;
        });
    };
    SqlStorage.GetCollection = function () {
        var collection = [];
        return SqlStorage.db.executeSql('SELECT * FROM Recipes', [])
            .then(function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                var item = data.rows.item(i);
                collection.push(item);
            }
        }).then(function (e) {
            return collection;
        })
            .catch(function (e) {
            console.log(e.message);
            return null;
        });
    };
    SqlStorage.AddRecipe = function (item) {
        return SqlStorage.db.executeSql('INSERT INTO Recipes VALUES (?1,?2,?3,?4)', [
            item.guid,
            item.id,
            item.title,
            item.text
        ]).then(function () { return alert('Recipe has been add'); }).catch(function (e) {
            alert(e.message);
        });
    };
    SqlStorage.DeleteRecipe = function (item) {
        return SqlStorage.db.executeSql('DELETE FROM Recipes WHERE guid=?1', [item.guid]).then(function () { return alert('Recipe has been deleted'); }).catch(function (e) {
            alert(e.message);
        });
    };
    SqlStorage.module = "SQLStorage.ts";
    SqlStorage.file = new ngx_1.File();
    SqlStorage.sqlite = new ngx_2.SQLite();
    SqlStorage.try = true;
    return SqlStorage;
}());
exports.SqlStorage = SqlStorage;
//# sourceMappingURL=SqlStorage.js.map