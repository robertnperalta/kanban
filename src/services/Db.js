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
    return new Db(conn);
  }
}

var db;
var initialized = false;
export default async function useDb() {
  if (!initialized) {
    db = await Db.build();
    initialized = true;
  }
  return db;
}
