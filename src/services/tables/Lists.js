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

    async update(id, board_id, title, color) {
        // Note, not to be used to update position
        const res = await this.conn.execute(
            "UPDATE lists SET board_id=$1, title=$2, color=$3 WHERE id=$4",
            [board_id, title, color, id]
        );
        if (res.rowsAffected === 0) {
            throw new Error(`Attempted to update non-existent list ${id}`);
        }
        return res.rowsAffected;
    }

    async remove(id) {
        const toRemove = await this.conn.select(
            "SELECT position FROM lists WHERE id=$1",
            [id]
        );
        if (toRemove.length === 0) {
            throw new Error(`Removing list ${id}, which does not exist`);
        }
        if (toRemove.length > 1) {
            throw new Error(`Removing list ${id}, which matches multiple rows`);
        }
        const positionRemoving = toRemove[0].position
        const res = await this.conn.execute(
            "DELETE FROM lists WHERE id=$1",
            [id]
        );
        await this.conn.execute(
            "UPDATE lists SET position = position - 1 WHERE position > $1",
            [positionRemoving]
        );
        return res.rowsAffected;
    }
}