/* ∞ grid view
 *
 *
 */
(function ($) {

    var infinity = function (dom, options) {
        var self = this;
        this.options = options;
        this.dom = dom;
        this.fetching = false;

        dom.empty();

        // bind on filter changes
        dom.on('infinitySortChange infinityFilterChange', function () {
            self.fetch();
        })

        // bind on scroll events.
        $(window).on('scroll', function (e) {
            var p = self.dom.position();
            var h = self.dom.height();
            if (!self.fetching && p.top + h < window.scrollY + $(window).height() ) {
                self.fetch(true);
            }
        })

        //debug binding.
        dom.on('infinityAppend infinityFailure infinitySortChange infinityFilterChange', function (a, b, c) {
            console.log(a.type)
            if (a.type == 'infinityAppend') {
                console.log("\tAdded " + c + " more items.");
            }
        })

        return this;
    }

    infinity.prototype.sort = function (object) {
        this.options.sort = object;
        this.dom.trigger('infinitySortChange', [this.options.sort]);
        return this.options.sort;
    }

    infinity.prototype.filter = function (object) {
        var self = this;
        if (object === undefined) return this.options.filters
        if (typeof object == 'array')
            $.each(object, function (i, item) {
                self.options._filters[item.field] = item.value;
            });
        else
            self.options._filters[object.field] = object.value;

        // convert
        self.options.filters = [];
        $.each(Object.keys(self.options._filters), function (i, item) {
            self.options.filters.push({
                field: item,
                value: self.options._filters[item]
            })
        });
        self.dom.trigger('infinityFilterChange', [self.options.filters]);
        return self.options.filters;
    }

    infinity.prototype.clearFilter = function () {
        this.options._filters = {};
        this.options.filters = [];
        self.dom.trigger('infinityFilterChange', [self.options.filters]);
        return this.options.filters;
    }

    infinity.prototype.fetch = function (append) {
        var self = this;
        if (this.fetching) return;

        var data = {
            'sort': this.options.sort,
            'filters': this.options.filters,
            'page': (append) ? ++this.options.page : this.options.page = 0,
            'perPage': this.options.perPage
        }
        window.infinityData = data;

        $.ajax({
            type: "POST",
            url: this.options.url,
            data: JSON.stringify({ infinityOptions: data }),
            contentType: "application/json",
            success: function (d, textStatus, jqXHR) {
                self.dom.trigger('infinitySuccess', [jqXHR, textStatus]);
                if (d.d.data.length == 0) self.options.page--;
                if (!append) {
                    self.dom.empty(); // destroy children.
                }
                else self.dom.trigger('infinityAppend', [self.options.page, d.d.data.length]);

                $.each(d.d.data, function (i, item) {
                    var element = $(self.options.template(item));
                    self.dom.append(element);
                })

                self.dom.trigger('infinityComplete', [jqXHR, textStatus]);
                self.fetching = false;
            },
            fail: function (jqXHR, textStatus, errorThrown) {
                self.dom.trigger('infinityFailure', [jqXHR, textStatus, errorThrown]);
                self.fetching = false;
            }
        });
    }

    $.fn.infinity = function (option) {
        var $this = $(this[0]),
        data = $this.data('infinity'),
        options = $.extend({}, $.fn.infinity.defaults, typeof option == 'object' && option);

        if (!data) $this.data('infinity', (data = new infinity($this, options)));
        window.infinity = data;
        return data;
    };

    $.fn.infinity.defaults = {
        url: '/',
        perPage: 30,
        unloadUnseen: false, // does nothing right now.
        page: 0,
        sort: { field: '', direction: 'asc' },
        filters: [],
        _filters: {},
        template: function (item) {
            return '<p>' + item.toString() + '</p>';
        }
    }
})(jQuery);