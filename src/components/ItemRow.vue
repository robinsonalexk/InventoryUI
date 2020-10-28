<template>
  <b-tr>
    <b-td>
      <b-button variant="outline-secondary" v-on:click="toggleEdit" size="sm" id="editButton"><b-icon icon="x-circle" v-if="editing"/><b-icon icon="pencil" v-else/> {{buttonText}}</b-button>
    </b-td>
    <template v-if="editing">
      <b-td>
        <b-form-input :state=nameState v-model="newName" />
      </b-td>
      <b-td>
        <b-form-input :state=costState v-model="newCost" />
      </b-td>
      <b-td>
        <b-button variant="outline-secondary" v-on:click="checkInput" size="sm" id="confirmButton"><b-icon icon="check2" /> Confirm</b-button>
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
        <b-button variant="outline-secondary" v-on:click="$emit('remove-item', item)" size="sm" id="removeButton"><b-icon icon="trash"/> Remove</b-button>
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
      newCost: null,
      nameState: null,
      costState: null,
      costRegex: /^\d*\.?\d*$/
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
          this.nameState = null;
          this.costState = null;
        }
    },
    checkInput: function() {
        this.nameState = null;
        this.costState = null;
        if(this.newName == null || this.newName == ''){
          this.nameState = false;
        }
        
        if(this.newCost == null || this.newCost == '' || !this.costRegex.exec(this.newCost))
        {
          this.costState = false;
        }

        if(this.nameState == false || this.costState == false){
          return
        }
        
        this.$emit('edit-item', {id: this.item.id, itemName: this.newName, cost: Number.parseFloat(this.newCost)}); 
        this.toggleEdit();
    }
  }
}

</script>
