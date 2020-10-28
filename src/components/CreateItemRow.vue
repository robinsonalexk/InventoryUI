<template>
<b-tr id="addItemRow">
  <b-td>
    <b-button variant="outline-secondary" v-on:click="$emit('cancel-add')" size="sm"><b-icon icon="x-circle"/> Cancel</b-button>
  </b-td>
  <b-td>
    <b-form-input placeholder="Item Name" :state=nameState v-model="itemname" />
  </b-td>
  <b-td>
    <b-form-input placeholder="Cost" :state=costState v-model="cost" />
  </b-td>
  <b-td>
    <b-button variant="outline-secondary" v-on:click="checkAdd" id="confirmButton" size="sm"><b-icon icon="check2"/> Confirm</b-button>
  </b-td>
</b-tr>
</template>

<script>

export default {
  name: 'CreateItemRow',
  data () {
    return {
      itemname: null,
      cost: null,
      nameState: null,
      costState: null,
      costRegex: /^\d*\.?\d*$/
    };
  },
  methods: {
    checkAdd: function () {
      this.nameState = null;
      this.costState = null;
      
      if(this.itemname == null || this.itemname == ''){
        this.nameState = false;
      }
      
      if(this.cost == null || this.cost == '' || !this.costRegex.exec(this.cost))
      {
        this.costState = false;
      }

      if(this.nameState == false || this.costState == false){
        return
      }
      console.log({itemName: this.itemname, cost: this.cost});
      this.$emit('add-item', {itemName: this.itemname, cost: Number.parseFloat(this.cost)});
    }
  }
}
</script>

<style scoped>
#addItemRow{
  background-color: #f4f3ef;
}
</style>
