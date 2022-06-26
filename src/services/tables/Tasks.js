export default class Tasks {
    constructor(conn) {
        this.conn = conn;
    }

    async all() {
        return await this.conn.select(
            "SELECT * FROM tasks"
        );
    }

    async add(list_id, title, description) {
        const res = await this.conn.execute(
            "INSERT INTO tasks (id, list_id, title, description, time_modified) VALUES (NULL, $1, $2, $3, $4)",
            [list_id, title, description, Date.now()]
        );
        return res.lastInsertId;
    }
    
    async update(id, list_id, title, description) {
        const res = await this.conn.execute(
            "UPDATE tasks SET list_id=$1, title=$2, description=$3, time_modified=$4 WHERE id=$5",
            [list_id, title, description, Date.now(), id]
        );
        if (res.rowsAffected === 0) {
            throw new Error(`Attempted to update non-existent task ${id}`);
        }
        return res.rowsAffected;
    }

    async remove(id) {
        const toRemove = await this.conn.select(
            "SELECT 1 FROM tasks WHERE id=$1",
            [id]
        );
        if (toRemove.length === 0) {
            throw new Error(`Removing task ${id}, which does not exist`);
        }
        if (toRemove.length > 1) {
            throw new Error(`Removing task ${id}, which matches multiple rows`);
        }
        const res = await this.conn.execute(
            "DELETE FROM tasks WHERE id=$1",
            [id]
        );
        return res.rowsAffected;
    }

    async addLabel(id, label_id) {
        const res = await this.conn.execute(
            "INSERT INTO assignments (task_id, label_id) VALUES ($1, $2)",
            [id, label_id]
        );
        return res.lastInsertId;
    }

    async removeLabel(id, label_id) {
        const toRemove = await this.conn.select(
            "SELECT 1 FROM assignments WHERE task_id=$1 AND label_id=$2",
            [id, label_id]
        );
        if (toRemove.length === 0) {
            throw new Error(`Removing assignment between task ${id} and label ${label_id}, which does not exist`);
        }
        if (toRemove.length > 1) {
            throw new Error(`Removing assignment between task ${id} and label ${label_id}, which matches multiple rows`);
        }
        const res = await this.conn.execute(
            "DELETE FROM assignments WHERE task_id=$1 AND label_id=$2",
            [id, label_id]
        );
        return res.rowsAffected;
    }
}