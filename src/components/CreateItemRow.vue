<template>
<b-tr>
  <b-td>
    <b-button variant="outline-secondary" v-on:click="$emit('cancel-add')" size="sm"><b-icon icon="x-circle"/> Cancel</b-button>
  </b-td>
  <b-td>
    <b-form-input placeholder="Item Name" v-model="itemname" />
  </b-td>
  <b-td>
    <b-form-input placeholder="Cost" v-model="cost" />
  </b-td>
  <b-td>
    <b-button variant="outline-secondary"  v-on:click="$emit('add-item', {itemName: itemname, cost: Number.parseFloat(cost)})" size="sm"><b-icon icon="check2"/> Confirm</b-button>
  </b-td>
</b-tr>
</template>

<script>

export default {
  name: 'CreateItemRow',
  data () {
    return {
      itemname: null,
      cost: null
    };
  },
}
</script>
