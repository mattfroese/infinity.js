infinity.js
===========

INFINITY API v0.1

    // INIT (with defaults listed)
    $('#pane').infinity({
    	url: ‘/list/of/data/in/json’,
    	number: 50,
    	page: 0,
    	unloadUnseen: false, // does nothing.
    	filter: ‘Some Name’,
    	sorting: ‘SomeField’,
    	direction: ‘asc’,
    	template: function(item){
    		return ‘<p>’+item.name+</p>
    	}
    });
    $(identifier).infinity().sort({
    	field: “id”,
    	direction: “asc”
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
    	value: ‘val’
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
- filter - filter object or array of filter objects, overrides if field already exists, appends filter if it does not. Returns current filters.
- clearFilter - clears all filters

Sorting
- sort - change sortObject to match the given object

## Events

- `infinitySortChange`: After the `sort()` function is called.
- `infinityFilterChange`: After the `filter()` function is called.
- `infinityAppend`: Triggered after page is attempted to be extended. Passes the _page number_ and the _number of pages inserted_ into any callbacks.
- `infinityFailure`: Ajax request failed.
- `infinitySuccess`: Ajax request succeded.
- `infinityComplete`: All new items have been inserted on the page. Called even if 0 items were inserted.