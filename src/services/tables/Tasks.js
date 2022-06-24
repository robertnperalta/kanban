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
        return await this.conn.execute(
            "INSERT INTO tasks (id, list_id, title, description, time_modified) VALUES (NULL, $1, $2, $3, $4)",
            [list_id, title, description, Date.now()]
        );
    }
    
    async update(id, list_id, title, description) {
        return await this.conn.execute(
            "UPDATE tasks SET list_id=$1, title=$2, description=$3, time_modified=$4 WHERE id=$5",
            [list_id, title, description, Date.now(), id]
        );
    }

    async remove(id) {
        return await this.conn.execute(
            "DELETE FROM tasks WHERE id=$1",
            [id]
        );
    }
}