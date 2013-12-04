infinity.js
===========

INFINITY API v0.1

    // INIT (with defaults listed)
    $('#pane').infinity({
    	url: ‘/list/of/data/in/json’,
    	number: 50,
    	page: 0,
    	unloadUnseen: false,
    	filter: ‘Some Name’,
    	sorting: ‘SomeField’,
    	direction: ‘asc’,
    	template: function(item){
    		return ‘<p>’+item.name+</p>
    	}
    });
    $(identifier).infinity().sort({
    	field: “id”,
    	direction: ‘asc’
    });
    $(identifier).infinity().filter([{
    	field: “username”,
    	value: “as%”
    },{
    	field: “magic”,
    	value: “as%”
    }]);
    
Expected Server Code

    //WEB SERVICE
    data(filterObjects, sortObject, page = 0, perPage = 50)
    filterObjects = [{
    	field: ‘field’,
    	value: ‘val%’
    }]
    sortObject = {
    	field: ‘field’,
    	direction: ‘asc’
    }

Use Case

    $(“.username-text”).on(“change”,function() {
    $().infinity().filter({
    	field: “username”,
    	value: $(this).val()
    });
    });

Filtering
- filter - filter object or array of filter objects, overrides if field already exists, appends filter if it does not.
- clearFilter - clears all filters
- listFilters - returns the filterObjects object defined above.

Sorting
- sort - change sortObject to match the given object
