<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <button @click="connect">Connect</button> -->
    <button @click="addBoard('test')">Add board</button>
    <button @click="addList(1, 'list', '0xff0000')">Add list</button>
  </div>
</template>

<script>
import Database from 'tauri-plugin-sql-api'
var db = null;
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    async connect() {
      try {
        db = await Database.load("sqlite:kanban.db");
        console.log('Success')
      } catch(e) {
        console.log(e);
      }
      return db;
    },

    async addBoard(name) {
      db = await this.connect()
      try {
        await db.execute('INSERT INTO boards (id, title) VALUES (NULL,$1)', [
          name
        ]);
      } catch (e) {
        console.log(e)
      }
    },

    async addList(board_id, title, color) {
      try {
        await db.execute('INSERT INTO lists (id, board_id, title, color) VALUES (NULL,$1,$2,$3)', [
          board_id,
          title,
          color
        ]);
      } catch (e) {
        console.log(e)
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
