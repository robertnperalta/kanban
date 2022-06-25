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
    const res = await this.conn.execute(
        "INSERT INTO boards (id, title) VALUES (NULL, $1)",
        [title]
    );
    return res.lastInsertId;
  }

  async update(id, title) {
    const res = await this.conn.execute(
      "UPDATE boards SET title=$1 WHERE id=$2",
      [title, id]
    );
    if (res.rowsAffected === 0) {
      throw new Error(`Attempted to update non-existent board ${id}`);
    }
    return res.rowsAffected;
  }

  async remove(id) {
    const toRemove = await this.conn.select(
      "SELECT 1 FROM boards WHERE id=$1",
      [id]
    );
    if (toRemove.length === 0) {
      throw new Error(`Removing board ${id}, which does not exist`);
    }
    if (toRemove.length > 1) {
      throw new Error(`Removing board ${id}, which matches multiple rows`);
    }
    const res = await this.conn.execute(
        "DELETE FROM boards WHERE id=$1",
        [id]
    );
    return res.rowsAffected;
  }
}