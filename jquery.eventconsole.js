/**
 * Small utility used to display jquery events
 *
 */
;(function($) {
  $.fn.extend({

    eventConsole : function(options) {
      this.defaultOptions = {};

      var settings = $.extend({}, this.defaultOptions, options);

      return this.each(function() {

        var $this = $(this);

        // count how many events
        var jqueryEventNumber = 0;

        // add title
        var title = $("<div>JQuery Events</div>")
            .css({
              'font-weight' : 'bolder',

              'margin' : "10px"
            });

        $this.append(title);

        // add log space
        var logSpace = $("<div id='eventConsole_logspace'></div>").css({
          'fontSize' : '12px',
          'background' : 'black',
          'color' : 'white',
          'height' : '300px',
          'overflow' : 'auto',
          'word-wrap' : 'break-word'
        });
        $this.append(logSpace);

        // Override jquery trigger method to display all events in console
        var self = $this;
        var superJQueryEventTrigger = $.event.trigger;
        $.event.trigger = function(event, data, elem, onlyHandlers) {

          jqueryEventNumber++;

          var name = typeof arguments[0] === "string" ? arguments[0] : arguments[0].type;

          var log = $("<div>" + "#" + jqueryEventNumber

              + " Event name: <b>" + name + "</b> " + new Date().toString() + " <br/>" +

              "Data: " + arguments[0].data + "</br>" + "</div>")

              .css({
                border : "solid 1px gray",
                padding : "5px",
                margin : "10px",
                'word-wrap' : 'break-all'
              });

          logSpace.append(log);

          // scroll down
          if (logSpace[0]) {
            var height = logSpace[0].scrollHeight;
            logSpace.scrollTop(height);
          }

          // call super method
          superJQueryEventTrigger(event, data, elem, onlyHandlers);
        };

        return this;

      });
    }
  });
})(jQuery);