<template>
<b-tr id="addItemRow">
  <b-td>
    <b-button variant="outline-secondary" v-on:click="$emit('cancel-add')" size="sm"><b-icon icon="x-circle"/> Cancel</b-button>
  </b-td>
  <b-td>
    <b-form-input placeholder="Item Name" :state=nameState v-model="itemname" />
    <div id="validationMessage" v-if="!nameState">{{nameValidationMessage}}</div>
  </b-td>
  <b-td>
    <b-form-input placeholder="Cost" :state=costState v-model="cost" />
    <div id="validationMessage" v-if="!costState">{{costValidationMessage}}</div>
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
      costRegex: /^\d+(\.\d{1,2})?$/,
      costValidationMessage: "",
      nameValidationMessage: ""
    };
  },
  methods: {
    checkAdd: function () {
      this.resetValidationVariables();

      if(this.itemname == null || this.itemname == ''){
        this.nameState = false;
        this.nameValidationMessage = "Name value cannot be blank"
      }
      
      if(this.cost == null || this.cost == '' )
      {
        this.costState = false;
        this.costValidationMessage = "Cost value cannot be blank";
      }

      if(this.costState == null && !this.costRegex.exec(this.cost))
      {
        this.costState = false;
        this.costValidationMessage = "Cost must be a number with a max of two decimal places";
      }

      if(this.nameState == false || this.costState == false){
        return
      }
      console.log({itemName: this.itemname, cost: this.cost});
      this.$emit('add-item', {itemName: this.itemname, cost: Number.parseFloat(this.cost)});
    },
    resetValidationVariables: function() {
      this.nameState = null;
      this.costState = null;
      this.costValidationMessage = "";
      this.nameValidationMessage = "";
    }
  }
}
</script>

<style scoped>
#addItemRow{
  background-color: #f4f3ef;
}
</style>
