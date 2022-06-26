import Database from "tauri-plugin-sql-api";
import Boards from "./tables/Boards";
import Lists from "./tables/Lists";
import Tasks from "./tables/Tasks";
import Labels from "./tables/Labels";

class Db {
  constructor(conn) {
    if (typeof conn === "undefined") {
      throw new Error("Cannot construct directly.");
    }

    this.conn = conn;
    this.boards = new Boards(this.conn);
    this.lists = new Lists(this.conn);
    this.tasks = new Tasks(this.conn);
    this.labels = new Labels(this.conn);
  }

  static async build() {
    let conn = await Database.load("sqlite:kanban.db");
    return new Db(conn);
  }

  async getFullBoard(id) {
    const res = await this.conn.select(
      "SELECT boards.id AS board_id, boards.title AS board_title, " +
      "lists.id AS list_id, lists.position AS list_position, lists.title AS list_title, lists.color AS list_color, " +
      "tasks.id AS task_id, tasks.title AS task_title, tasks.description AS task_desc, tasks.time_modified AS task_modified, " +
      "labels.id AS label_id, labels.label AS label_text, labels.color AS label_color " +
      "FROM boards " +
      "LEFT JOIN lists ON boards.id = lists.board_id " +
      "LEFT JOIN tasks ON lists.id = tasks.list_id " +
      "LEFT JOIN assignments ON tasks.id = assignments.task_id " +
      "LEFT JOIN labels ON assignments.label_id = labels.id " +
      "WHERE boards.id = $1",
      [id]
    );
    if (res.length === 0) {
      throw new Error(`Attempting to get full board ${id}, which does not exist`);
    }
    return res;
  }
}

export default Db.build();
