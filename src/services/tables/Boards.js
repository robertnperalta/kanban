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

  async remove(id) {
    return await this.conn.execute(
        "DELETE FROM boards WHERE id=$1",
        [id]
    );
  }
}