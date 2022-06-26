export default class Lists {
    constructor(conn) {
        this.conn = conn;
    }

    async all() {
        return await this.conn.select(
            "SELECT * FROM lists"
        );
    }

    async add(board_id, position, title, color) {
        const res = await this.conn.execute(
            "INSERT INTO lists (id, board_id, position, title, color) VALUES (NULL, $1, $2, $3, $4)",
            [board_id, position, title, color]
        );
        return res.lastInsertId;
    }

    async update(id, title, color) {
        // Note, not to be used to update position
        const res = await this.conn.execute(
            "UPDATE lists SET title=$1, color=$2 WHERE id=$3",
            [title, color, id]
        );
        if (res.rowsAffected === 0) {
            throw new Error(`Attempted to update non-existent list ${id}`);
        }
        return res.rowsAffected;
    }

    async remove(id) {
        const toRemove = await this.conn.select(
            "SELECT board_id, position FROM lists WHERE id=$1",
            [id]
        );
        if (toRemove.length === 0) {
            throw new Error(`Removing list ${id}, which does not exist`);
        }
        if (toRemove.length > 1) {
            throw new Error(`Removing list ${id}, which matches multiple rows`);
        }
        const boardRemovingFrom = toRemove[0].board_id;
        const positionRemoving = toRemove[0].position;
        const res = await this.conn.execute(
            "DELETE FROM lists WHERE id=$1",
            [id]
        );
        await this.conn.execute(
            "UPDATE lists SET position = position - 1 WHERE board_id=$1 AND position > $1",
            [boardRemovingFrom, positionRemoving]
        );
        return res.rowsAffected;
    }
}