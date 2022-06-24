export default class Lists {
    constructor(conn) {
        this.conn = conn;
    }

    async all() {
        return await this.conn.execute(
            "SELECT * FROM lists"
        );
    }

    async add(board_id, position, title, color) {
        return await this.conn.execute(
            "INSERT INTO lists (id, board_id, position, title, color) VALUES (NULL, $1, $2, $3, $4)",
            [board_id, position, title, color]
        );
    }

    async getOne(id) {
        return await this.conn.select(
            "SELECT * FROM lists WHERE id=$1",
            [id]
        );
    }

    async getBoard(board_id) { // TODO: move to Db function as join?
        return await this.conn.select(
            "SELECT * FROM lists WHERE board_id=$1",
            [board_id]
        );
    }

    async remove(id) {
        const toRemove = await this.getOne(id);
        const res = await this.conn.execute(
            "DELETE FROM lists WHERE id=$1",
            [id]
        );
        await this.conn.execute(
            "UPDATE lists SET position = position - 1 WHERE position > $1",
            [toRemove.position]
        );
        return res;
    }
}