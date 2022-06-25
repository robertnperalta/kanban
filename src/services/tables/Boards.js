export default class Boards {
  constructor(conn) {
    this.conn = conn;
  }

  async all() {
    return await this.conn.select(
        "SELECT * FROM boards"
    );
  }

  async add(title) {
    return await this.conn.execute(
        "INSERT INTO boards (id, title) VALUES (NULL, $1)",
        [title]
    );
  }

  async update(id, title) {
    return await this.conn.execute(
      "UPDATE boards SET title=$1 WHERE id=$2",
      [title, id]
    );
  }

  async remove(id) {
    return await this.conn.execute(
        "DELETE FROM boards WHERE id=$1",
        [id]
    );
  }
}