
<template>
  <div class="home">
    <div class="title">Add something to do!</div>
    <input v-model="myTodo" /><button class="add" @click="addToDo">Add!</button>
    <div v-if="errors !== ''" id="errors">{{ errors }}</div>
    <div v-if="results !== ''" id="results">{{ results }}</div>
    <div class="title">Do something!</div>
    <button class="add" @click="allItems">Show all!</button>
    <button class="add" @click="randomItem">Gimme something!</button>
    <div v-if="showRandomItem !== '' && chosenItem" id="showRandomItem">
     <div v-for="item in this.$store.getters.getItems" :key="item.id">
       <div v-if="item.id == chosenItem && item.status == 'todo'">
        <div class="item">
          {{ item.title }}<br /><br /><button class="delete" @click="completeItem(item.id)">Done!</button>
          <button class="delete" @click="deleteItem(item.id)">Delete!</button>
        </div>
       </div>
     </div>
    </div>
    <div v-if="showAllItems !== ''" id="showAllItems">
      <div v-if="this.$store.getters.getItems && this.$store.getters.getItems.length > 0">
        <div v-for="item in this.$store.getters.getItems" :key="item.id">
          <div v-if="item.status == 'todo'">
            <div class="item">
             {{ item.title }}<br /><br /><button class="delete" @click="completeItem(item.id)">Done!</button>
             <button class="delete" @click="deleteItem(item.id)">Delete!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/main'

export default {
  name: 'home',
  beforeCreate: function () {
   this.$store.dispatch('setItems')
  },
  data: function () {
    return {
      myTodo: '',
      errors: '',
      results: '',
      showRandomItem: '',
      showAllItems: '',
      chosenItem: '',
      showActive: ''
    }
  },
  methods: {
    allItems: function () {
      this.showRandomItem =  '';
      this.showAllItems = true;
    },
    randomItem: function () {
      this.showAllItems = '';
      this.showRandomItem = true;
      let allItems = this.$store.getters.getItems
      if (allItems !== null)
      {
        let activeItems = this.$store.getters.getItems.filter((e) => e.status == 'todo')
        var chosenNumber = Math.floor(Math.random() * activeItems.length)
        this.chosenItem = activeItems[chosenNumber].id
      }
    },
    addToDo: function () {
      this.errors = ''
      this.results = ''
      // check for empty title field
      if (this.myTodo !== '') {
        db.collection('items').add({
          title: this.myTodo,
          created: Date.now(),
          status: 'todo'
        }).then((response) => {
          if (response) {
            this.results = 'Added!'
            this.myTodo = ''
          }
        }).catch((error) => {
          this.errors = error
        })
      // title field empty
      } else {
        this.errors = 'empty title field'
      }
    },
    completeItem: function (id) {
      var self = this
      if (id) {
      let completedItem = db.collection("items").doc(id)
      completedItem.update({status: 'done'}).then(function()
      {
          self.results = 'Deleted!'
      }).catch(function(error) {
        console.log(error)
          self.errors = error
      })
      } else {
        this.error = 'Invalid ID'
      }
    },
    deleteItem: function (id) {
    if (id) {
    var self = this;
    db.collection("items").doc(id).delete().then(function()
     {
        self.results = 'Deleted!'
     }).catch(function(error) {
      console.log(error)
        self.errors = error
    })
    } else {
      this.error = 'Invalid ID'
    }
   }
 }
}
</script>

<style>
* {
  box-sizing:border-box;
}

body, html, #app {
  background:#8ac8e5;
  font-family: Helvetica;
}

.home {
  width:300px;
  margin:auto;
}

.item {
  font-size:28px;
  font-weight:700;
  background-color: white;
  padding: 3px;
}

input, button {
  border:0;
  width:100%;
  margin:0 0 10px;
  padding:7px;
}

input {
  font-size:12px;
}

button {
  border:0;
  text-transform:uppercase;
  color:#000;
  font-weight:700;
  cursor:pointer;
}

.add {
  background:#fffccc;
}

.delete {
  background: pink;
}

.delete:hover {
  animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

.title {
  font-size:28px;
  font-weight:700;
  padding:0 0 10px 0;
  margin:0 0 10px 0;
}

#errors {
  background:#a52222;
  color:#fff;
  padding:5px;
}

#results {
  background: green;
  color:#fff;
  padding:5px;
}
</style>
