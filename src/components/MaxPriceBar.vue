<template>
<b-container>
  <b-row class="mb-2">
    <b-col offset-sm="9">
      <b-button variant="outline-secondary"  col-sm="3" v-on:click="$emit('get-all-max-priced')" id="getAllButton" >Show Max Price For All Items</b-button>
    </b-col>
  </b-row>
  <b-row>
    <b-col offset-sm="4" col-sm-8>
      <b-form-group label="Search Item's Max Price" label-cols-sm="3" label-for="item-search">
        <b-input-group>
          <b-form-input id="item-search" v-model="itemname" :state=itemInputState placeholder="Item Name"/>
          <b-input-group-append>
            <b-button variant="outline-secondary" v-on:click="checkSearch" id="searchButton"><b-icon icon="search"/>Search </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-col>
  </b-row>
</b-container>
</template>

<script>

export default {
  name: 'MaxPriceBar',
  data () {
    return {
      itemname: null,
      itemInputState: null
    };
  },
  methods: {
    clearSearch: function () {
      this.itemname = null;
    },
    checkSearch: function () {
      this.itemInputState = null;
      if(this.itemname == null || this.itemname == '')
      {
        this.itemInputState = false;
      }

      if(this.itemInputState == false){
        return
      }
      this.$emit('search-item-max-price', this.itemname); 
      this.clearSearch();
    }
  }
}
</script>
