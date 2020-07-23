// Mini Inventory Management System

// System is composed of an 
  // item creator
    // make sure all neccessary info is present and valid
  // Items manager
    // creating items, updating info about items, deleting items, 
    // and querying items
  // reports manager
    // Generates reports for a specific item or all items
    // reports for specific items are generated from report objects
      // created from the report manager
    // report manager is responsible for reports for all items


// Item includes:
  // SKU code:
    // first 3 letters of item, and first 2 letters of category
    // If first word is only 2 letters, next letter is taken from next word
  // Item name:
    // name of the item, min of 5 chars (not including spaces)
  // Category:
    // must consist of a min of 5 chars and only one word
  // Quantity
    // Must be present, assume a valid number will be provided

// Items manager methods:
  // create:
    // creates a new item, returns false if create not successful
  // update:
    // accepts an SKU code and an obj as an arg
    // updates any of the info on an item
    // assume valid values will be provided
  // delete:
    // accepts an SKU Code, deletes that item from list
  // items:
    // returns all the items
  // inStock:
    // list all items w/ quantity of more than 0
  // itemsInCategory:
    // list all the items for a given category

// Reports manager methods:
  // init:
    // accepts the ItemManager object as an arg and assigns it
    // to the items property
  // createReporter:
    // accepts an SKU code as an arg and returns an obj
    // returned obj has one method, itemInfo
      // logs to the console all the properties of an obj as
      // "key:value" pairs (one per line)
  // reportInStock:
    // logs to the console the item names of all the items that
    // are in stock as comma separated values

  // Notes: 
    // Do not validate uniqueness of SKU code
    // each piece of info for an item corresponds to a property
    // if any info required is not valid return { notValid: true }
    // The created item objs should not have any method/properties
      // other than the ones mentioned above
    // may add methods to the item manager as necessary

const ItemManager = (function() {
  function ItemCreator(name, category, quantity) {
    const invalid         = { notValid: true };
    const invalidName     = name.replace(/\s/g, '').length < 5;
    const invalidCategory = category.split(' ').length !== 1 || category.length < 5;
    const invalidQuantity = !Number.isInteger(quantity);

    if (invalidName || invalidCategory || invalidQuantity) return invalid;
    
    let nameAbbrev     = name.match(/\S/gi).slice(0, 3).join('')
    let categoryAbbrev = category.slice(0, 2);

    this.name     = name;
    this.category = category;
    this.quantity = quantity;
    this.skuCode  = (nameAbbrev + categoryAbbrev).toUpperCase();
  }

  return {
    items: [],
    create: function() {
      let newItem = new ItemCreator(...arguments);
      if (newItem.notValid) return false;

      this.items.push(newItem);
    },

    update: function(skuCode, updatedInfo) {
      let item = this.items[this.findItemIndex(skuCode)];
      Object.assign(item, updatedInfo);
    },

    delete: function(skuCode) {
      this.items.splice([this.findItemIndex(skuCode)], 1)
    },

    inStock: function() {
      return this.items.filter(item => item.quantity > 0);
    },

    itemsInCategory: function(category) {
      return this.items.filter(item => item.category === category);
    },

    findItemIndex: function(skuCode) {
      for (let i = 0; i < this.items.length; i += 1) {
        if (this.items[i].skuCode === skuCode) return i;
      }
    },
  };
})();

const ReportManager = {
  init: function(ItemManager) {
    this.items = ItemManager;

    this.createReporter = function(skuCode) {
      let itemIdx = ItemManager.findItemIndex(skuCode);
      let item    = ItemManager.items[itemIdx];

      return {
        itemInfo: function() {
          for (key in item) {
            console.log(key + ': ' + item[key]);
          }
        },
      };
    };

    this.reportInStock = function() {
      console.log(ItemManager.inStock().map(item => item.name).join(', '));
    };
  },
};
