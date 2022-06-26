export default class Labels {
    constructor(conn) {
        this.conn = conn;
    }

    async all() {
        return await this.conn.select(
            "SELECT * FROM labels"
        );
    }

    async add(label, color) {
        const res = await this.conn.execute(
            "INSERT INTO labels (id, label, color) VALUES (NULL, $1, $2)",
            [label, color]
        );
        return res.lastInsertId;
    }
    
    async update(id, label, color) {
        const res = await this.conn.execute(
            "UPDATE labels SET label=$1, color=$2 WHERE id=$3",
            [label, color, id]
        );
        if (res.rowsAffected === 0) {
            throw new Error(`Attempted to update non-existent label ${id}`);
        }
        return res.rowsAffected;
    }

    async remove(id) {
        const toRemove = await this.conn.select(
            "SELECT 1 FROM labels WHERE id=$1",
            [id]
        );
        if (toRemove.length === 0) {
            throw new Error(`Removing label ${id}, which does not exist`);
        }
        if (toRemove.length > 1) {
            throw new Error(`Removing label ${id}, which matches multiple rows`);
        }
        const res = await this.conn.execute(
            "DELETE FROM labels WHERE id=$1",
            [id]
        );
        return res.rowsAffected;
    }
}