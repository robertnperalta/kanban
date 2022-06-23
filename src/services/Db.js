import Database from "tauri-plugin-sql-api";
import Boards from "./tables/Boards";

class Db {
  constructor(conn) {
    if (typeof conn === "undefined") {
      throw new Error("Cannot construct directly.");
    }

    this.conn = conn;
    this.boards = new Boards(this.conn);
  }

  static async build() {
    let conn = await Database.load("sqlite:kanban.db");
    return new Db(conn)
  }
}

// async function connect() {
//   let db = await Database.load("sqlite:kanban.db");
//   return db;
// };

// async function addBoard(db, title) {
//   let res = await db.execute(
//     "INSERT INTO boards (id, title) VALUES (NULL, $1)",
//     title
//   );
//   return res;
// };

// async function addList(db, board_id, title, color) {
//   let res = await db.execute(
//     "INSERT INTO lists (id, board_id, title, color) VALUES (NULL, $1, $2, $3)",
//     board_id,
//     title,
//     color
//   );
//   return res;
// };

// async function addTask(db, list_id, title, description) {
//   let res = await db.execute(
//     "INSERT INTO tasks (id, list_id, title, description, time_modified) VALUES (NULL, $1, $2, $3, $4)",
//     list_id,
//     title,
//     description,
//     Date.now()
//   );
//   return res;
// };

// async function addLabel(db, label, color) {
//   let res = await db.execute(
//     "INSERT INTO labels (id, label, color) VALUES (NULL, $1, $2)",
//     label,
//     color
//   );
//   return res;
// };

export default Db
