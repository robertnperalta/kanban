<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <button @click="connect">Connect</button> -->
    <button @click="testDb">Run Test</button>
  </div>
</template>

<script>
import useDb from "../services/Db";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  async beforeCreate() {
    this.db = await useDb();
    console.log("Connecting to DB");
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
