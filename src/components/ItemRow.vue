<template>
  <b-tr>
    <b-td>
      <b-button variant="outline-secondary" v-on:click="toggleEdit" size="sm" id="editButton"><b-icon icon="x-circle" v-if="editing"/><b-icon icon="pencil" v-else/> {{buttonText}}</b-button>
    </b-td>
    <template v-if="editing">
      <b-td>
        <b-form-input :state=nameState v-model="newName" />
        <div id="validationMessage" v-if="!nameState">{{nameValidationMessage}}</div>
      </b-td>
      <b-td>
        <b-form-group label-cols-sm="1" label="$"  label-for="new-item-cost">
          <b-form-input id="new-item-cost" :state=costState v-model="newCost" />
          <div id="validationMessage" v-if="!costState">{{costValidationMessage}}</div>
        </b-form-group>
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
        {{formattedCost}}
      </b-td>
      <b-td>
        <b-button variant="outline-secondary" v-on:click="$emit('remove-item', item)" size="sm" id="removeButton"><b-icon icon="trash"/> Remove</b-button>
      </b-td>
    </template>
  </b-tr>
</template>

<script>
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

export default {
  name: 'ItemRow',
  props: {
    item: {
      id: Number,
      itemName: String,
      cost: Number
    }
  },
  // watch: {
  //   cost: function() {
  //     this.formatedCost = formatter.format(this.item.cost);
  //   }
  // },
  data () {
    return {
      editing: false,
      buttonText: "Edit",
      newName: null,
      newCost: null,
      nameState: null,
      costState: null,
      costRegex: /^(?![,.0]*$)(\d|[1-9]\d{1,5})(\.\d{2})?$/,
      costValidationMessage: "",
      nameValidationMessage: ""
    };
  },
  methods: {
    toggleEdit: function() {
        this.editing = !this.editing;
        this.buttonText = !this.editing ? "Edit" : "Cancel";
        if(this.editing){
          this.newName = this.item.itemName;
          this.newCost = Number.parseFloat(this.item.cost).toFixed(2);
        }
        else{
          this.newName = null;
          this.newCost = null;
          this.nameState = null;
          this.costState = null;
        }
    },
    checkInput: function() {
        this.resetValidationVariables();

        if(this.newName == null || this.newName == ''){
          this.nameState = false;
          this.nameValidationMessage = "Name value cannot be blank"
        }
        
        if(this.newCost == null || this.newCost == '' )
        {
          this.costState = false;
          this.costValidationMessage = "Cost value cannot be blank";
        }

        if(this.costState == null && !this.costRegex.exec(this.newCost))
        {
          this.costState = false;
          this.costValidationMessage = "Invalid Cost. Must be a valid USD amount greater than 0 or less than 1000000";
        }

        if(this.nameState == false || this.costState == false){
          return
        }
        
        this.$emit('edit-item', {id: this.item.id, itemName: this.newName, cost: Number.parseFloat(this.newCost)}); 

        this.toggleEdit();
    },
    resetValidationVariables: function() {
        this.nameState = null;
        this.costState = null;
        this.costValidationMessage = "";
        this.nameValidationMessage = "";
    }
  },
  computed: {
    formattedCost: {
      get: function () {
        return formatter.format(this.item.cost);
      }
    }
  }
}

</script>
