<template>
  <div>
    <h1>Inventory UI</h1>
    <MaxPriceBar v-on:search-item-max-price="searchItem" v-on:get-all-max-priced="getMaxPrices" />
    <ItemTable v-bind:items="items" v-on:remove-item="removeItem" v-on:edit-item="editItem" v-on:add-item="addItem" v-on:reset-table="getAllItems" />
  </div>
</template>

<script>
import ItemTable from './ItemTable.vue'
import MaxPriceBar from './MaxPriceBar.vue'
import axios from "axios";


export default {
  name: 'ItemManager',
  components: {
    ItemTable,
    MaxPriceBar
  },
  data () {
    return {
      items: null
    };
  },
  methods: {
    getAllItems: async function() {
      await axios.get().then(response => (this.items = response.data ? response.data : null))
            .catch(error => {
              this.triggerErrorMessage("Could not retrieve items " + error)
            });
    },
    searchItem: async function (itemName) {
      await axios.get("/MaxPriced/" + itemName).then(response => (this.items = [response.data]))
            .catch(error => {
              this.triggerErrorMessage("Could not retrieve items " + error)
            });
    },
    getMaxPrices: async function (){
      await axios.get("/MaxPriced").then(response => (this.items = response.data))
            .catch(error => {
              this.triggerErrorMessage("Could not retrieve items " + error)
            });
    },
    addItem: async function(item) {
      await axios.post('',item)
            .then(response => (this.items.push(response.data.item)))
            .catch(error => {
              this.triggerErrorMessage("Failed to add item " + error)
            });
    },
    removeItem: async function(item) {
      await axios.delete('',{data: {id: item.id , itemName: item.itemName, cost: item.cost}})
            .then(() => {
                    this.items.splice(this.items.indexOf(item), 1);
                  })
            .catch(error => {
              this.triggerErrorMessage("Failed to remove item " + error)
            });
    },
    editItem: async function (item) {
      await axios.put('',item)
            .then(() => {
                let oldItemIndex = this.items.indexOf(this.items.find(i => i.id == item.id));
                this.$set(this.items, oldItemIndex, item);
            })
            .catch(error => {
              this.triggerErrorMessage("Failed to edit item " + error.response.data.errors)
            });
    },
    triggerErrorMessage: function(message){
      this.$bvToast.toast(message, {
        title: 'Error has occured',
        variant: 'danger',
        solid: true
      });
    }
  },
  async mounted (){
    await this.getAllItems();
  }
}
</script>
