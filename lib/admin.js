AdminConfig = {
  name: 'My App',
  adminEmails: ['iam@murilobastos.com'],
  collections: {
    Items: {
			tableColumns: [
				{label: 'Name', name: 'name'},
				{label: 'Type', name: 'type'},
				{label: 'Item Type', name: 'itemType'},
				{label: 'Add Type', name: 'addType'}
			]
    },
    Addons: {
    	tableColumns: [
	    	{label: 'Id', name: 'id'},
				{label: 'Amount', name: 'amount'}
			]
    },
    Chests: {
    	tableColumns: [
	    	{label: 'Name', name: 'name'},
				{label: 'Active', name: 'active'}
			]
    }
  }
};