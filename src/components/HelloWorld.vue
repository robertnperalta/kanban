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
    this.db = await dbPromise;
  },
  methods: {
    async testDb() {
      console.log(this.db);
      console.log("Set up boards");
      let b1 = await this.db.boards.add("Board 1");
      let b2 = await this.db.boards.add("Board 2");
      let b3 = await this.db.boards.add("Board 3");
      await this.db.boards.remove(b2);
      await this.db.boards.view(b3);
      await this.db.boards.update(b3, "Board 3.5");
      await this.db.boards.view(b1);
      console.log("Boards: ", await this.db.boards.all());

      console.log("Set up lists");
      let l1 = await this.db.lists.add(b1, 0, "List 1", "0xff0000");
      let l2 = await this.db.lists.add(b1, 1, "List 2", "0xff0000");
      let l3 = await this.db.lists.add(b1, 2, "List 3", "0xff0000");
      await this.db.lists.add(b3, 0, "List 4", "0x0000ff");
      let l5 = await this.db.lists.add(b3, 1, "List 5", "0x0000ff");
      await this.db.lists.add(b3, 2, "List 6", "0x0000ff");
      await this.db.lists.remove(l2);
      await this.db.lists.update(l3, "List 3.5", "0xff0000");
      console.log("Lists: ", await this.db.lists.all());

      console.log("Set up tasks");
      let t1 = await this.db.tasks.add(l1, "Task 1", "Something");
      let t2 = await this.db.tasks.add(l1, "Task 2", "Something else");
      let t3 = await this.db.tasks.add(l5, "Task 3", null);
      let t4 = await this.db.tasks.add(l5, "Task 4", null);
      await this.db.tasks.remove(t4);
      await this.db.tasks.update(t2, l1, "Task 2.5", "Something else");
      console.log("Tasks: ", await this.db.tasks.all());

      console.log("Set up labels");
      let a1 = await this.db.labels.add("Important", "0xff0000");
      let a2 = await this.db.labels.add("Todo", "0x00ff00");
      let a3 = await this.db.labels.add("Won't do", "0x000000");
      let a4 = await this.db.labels.add("Eh", "0x0000ff");
      await this.db.labels.remove(a3);
      await this.db.labels.update(a4, "Do Later", "0x0000ff");
      console.log("Labels :", await this.db.labels.all());

      console.log("Set up label assignments");
      await this.db.tasks.addLabel(t1, a1);
      await this.db.tasks.addLabel(t1, a2);
      await this.db.tasks.addLabel(t3, a1);
      await this.db.tasks.addLabel(t3, a2);
      await this.db.tasks.addLabel(t3, a4);
      await this.db.tasks.removeLabel(t3, a4);

      console.log("Get full board");
      let fullB1 = await this.db.getFullBoard(b1);
      console.log(fullB1);

      console.log("Remove board");
      await this.db.boards.remove(b3);
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
