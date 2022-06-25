<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <button @click="connect">Connect</button> -->
    <button @click="testDb">Run Test</button>
  </div>
</template>

<script>
import dbPromise from "../services/Db";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  async beforeCreate() {
    dbPromise.then(db => {
      this.db = db;
    })
  },
  methods: {
    async testDb() {
      // let db = await Db.build();
      console.log(this.db);
      console.log(await this.db.boards.add("Board 1"));
      console.log(await this.db.boards.add("Board 2"));
      console.log(await this.db.boards.remove(2));
      console.log(await this.db.boards.add("Board 3"));
      console.log(await this.db.boards.all());
      console.log(await this.db.lists.add(1, 0, "List 1", "0xffffff"));
      console.log(await this.db.lists.add(1, 1, "List 2", "0xffffff"));
      console.log(await this.db.lists.add(1, 2, "List 3", "0xffffff"));
      console.log(await this.db.lists.add(1, 3, "List 4", "0xffffff"));
      console.log(await this.db.lists.all());
      console.log(await this.db.lists.remove(2));
      console.log(await this.db.lists.all());
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
