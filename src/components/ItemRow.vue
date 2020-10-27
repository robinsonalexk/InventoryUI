<template>
  <b-tr>
    <b-td>
      <b-button variant="outline-secondary" v-on:click="toggleEdit" size="sm"><b-icon icon="x-circle" v-if="editing"/><b-icon icon="pencil" v-else/> {{buttonText}}</b-button>
    </b-td>
    <template v-if="editing">
      <b-td>
        <b-form-input v-model="newName" />
      </b-td>
      <b-td>
        <b-form-input v-model="newCost" />
      </b-td>
      <b-td>
        <b-button variant="outline-secondary" v-on:click="$emit('edit-item', {id: item.id, itemName: newName, cost: Number.parseFloat(newCost)}); toggleEdit();" size="sm"><b-icon icon="check2" /> Confirm</b-button>
      </b-td>
    </template>
    <template v-else>
      <b-td>
        {{item.itemName}}
      </b-td>
      <b-td>
        {{item.cost}}
      </b-td>
      <b-td>
        <b-button variant="outline-secondary" v-on:click="$emit('remove-item', item)" size="sm"><b-icon icon="trash"/> Remove</b-button>
      </b-td>
    </template>
  </b-tr>
</template>

<script>

export default {
  name: 'ItemRow',
  props: {
    item: {
      id: Number,
      itemName: String,
      cost: Number
    }
  },
  data () {
    return {
      editing: false,
      buttonText: "Edit",
      newName: null,
      newCost: null
    };
  },
  methods: {
    toggleEdit: function() {
        this.editing = !this.editing;
        this.buttonText = !this.editing ? "Edit" : "Cancel";
        if(this.editing){
          this.newName = this.item.itemName;
          this.newCost = this.item.cost;
        }
        else{
          this.newName = null;
          this.newCost = null;
        }
    }
  }
}

</script>
