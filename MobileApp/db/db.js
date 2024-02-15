import { openDatabase } from "expo-sqlite";

const db = openDatabase("mydb_test_1.db");
db.transaction((tx) => {
  tx.executeSql(
    "create table if not exists students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName text, lastName text, age text, email text, password text, pImage text);"
  );
  tx.executeSql(
    "create table if not exists user (email text primary key not null, name text, password text);"
  );
});

export default db;
