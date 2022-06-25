import Database from "tauri-plugin-sql-api";
import Boards from "./tables/Boards";
import Lists from "./tables/Lists";
import Tasks from "./tables/Tasks";

class Db {
  constructor(conn) {
    if (typeof conn === "undefined") {
      throw new Error("Cannot construct directly.");
    }

    this.conn = conn;
    this.boards = new Boards(this.conn);
    this.lists = new Lists(this.conn);
    this.tasks = new Tasks(this.conn);
  }

  static async build() {
    let conn = await Database.load("sqlite:kanban.db");
    return new Db(conn);
  }
}

export default Db.build();
