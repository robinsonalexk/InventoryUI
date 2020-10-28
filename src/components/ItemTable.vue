<template>
  <b-container class="p-2">
    <b-table-simple fixed outlined >
      <b-thead head-variant="dark">
        <b-tr>
          <b-th><b-button variant="outline-light" v-on:click="toggleAddItem = !toggleAddItem" id="addItemToggleButton" size="sm"><b-icon icon="plus"/> Add Item </b-button></b-th>
          <b-th>Item Name</b-th>
          <b-th>Cost</b-th>
          <b-th><b-button variant="outline-light"  v-on:click="$emit('reset-table')" size="sm"><b-icon icon="arrow-clockwise"/> Reset</b-button></b-th>
        </b-tr>
      </b-thead>
      <CreateItemRow v-if="toggleAddItem" v-on:add-item="$emit('add-item', $event); toggleAddItem = false" v-on:cancel-add="toggleAddItem = false"/>
      <ItemRow v-for="item in items" :key="item.id" v-bind:item="item" v-on:remove-item="$emit('remove-item', $event)" v-on:edit-item="$emit('edit-item', $event)"/>
    </b-table-simple>
  </b-container>
</template>

<script>
import ItemRow from './ItemRow.vue'
import CreateItemRow from './CreateItemRow.vue'

export default {
  name: 'ItemTable',
  components: {
    ItemRow,
    CreateItemRow
  },
  props: {
    items: {
      id: Number,
      itemName: String,
      cost: Number
    }
  },
  data () {
    return {
      toggleAddItem: false,
    };
  }
}

</script>
