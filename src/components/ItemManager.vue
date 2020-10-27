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
      await axios.get("https://localhost:44384/Items").then(response => (this.items = response.data));
    },
    searchItem: async function (itemName) {
      await axios.get("https://localhost:44384/Items/MaxPriced/" + itemName).then(response => (this.items = [response.data]));
    },
    getMaxPrices: async function (){
      await axios.get("https://localhost:44384/Items/MaxPriced").then(response => (this.items = response.data));
    },
    addItem: async function(item) {
      await axios.post("https://localhost:44384/Items", item)
                  .then(response => (this.items.push(response.data.item)));
    },
    removeItem: async function(item) {
      await axios.delete("https://localhost:44384/Items", {data: {id: item.id , itemName: item.itemName, cost: item.cost}})
            .then(() => {
                    this.items.splice(this.items.indexOf(item), 1);
                  });
    },
    editItem: async function (item) {
      await axios.put("https://localhost:44384/Items", item)
            .then(() => {
                let oldItemIndex = this.items.indexOf(this.items.find(i => i.id == item.id));
                this.items[oldItemIndex] = item;
            });
    }
  },
  async mounted (){
    await this.getAllItems();
  }
}
</script>
