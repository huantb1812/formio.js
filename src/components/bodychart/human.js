import $ from 'jquery';
$.fn.extend({
    check: function(data) {
        console.log('check',data);
        return this.each(function() {
            this.checked = true;
        });
    },
    uncheck: function(data) {
        console.log('uncheck',data);
        return this.each(function() {
            this.checked = false;
        });
    }
});
