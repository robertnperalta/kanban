CREATE TABLE IF NOT EXISTS boards (
    id INTEGER PRIMARY KEY,
    title VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS lists (
    id INTEGER NOT NULL PRIMARY KEY,
    board_id INTEGER NOT NULL,
    title VARCHAR(64) NOT NULL,
    color CHAR(8) NOT NULL,
    FOREIGN KEY (board_id) REFERENCES Boards(id)
);

CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER NOT NULL PRIMARY KEY,
    list_id INTEGER NOT NULL,
    title VARCHAR(256) NOT NULL,
    description TEXT,
    time_modified INTEGER,
    FOREIGN KEY (list_id) REFERENCES Lists(id)
);

CREATE TABLE IF NOT EXISTS labels (
    id INTEGER NOT NULL PRIMARY KEY,
    label VARCHAR(32) NOT NULL,
    color CHAR(8) NOT NULL
);

CREATE TABLE IF NOT EXISTS assignments (
    task_id INTEGER NOT NULL,
    label_id INTEGER NOT NULL,
    FOREIGN KEY (task_id) REFERENCES Tasks(id),
    FOREIGN KEY (label_id) REFERENCES Labels(id)
);