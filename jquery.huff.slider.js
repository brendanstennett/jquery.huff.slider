/*
 * Copyright (c) 2012 Brendan Stennett
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, 
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or 
 * substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT 
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function($, undefined) {
  
  
  /*
   * Advances slider to previous item
   */
  function prev_item(item) {
    
    var settings = item.data('settings');
    var ul = item.find("ul").eq(0);
    var lis = ul.find("li");
    var width = item.width();
    var size = lis.size();
    var current = item.data('current') - 1;

    if (current >= 0)
      goto_item(item, current);
    else
      if (settings.reset)
        goto_item(item, size-1);
  }

  /*
   * Advances slider to next item
   */
  function next_item(item) {
    
    var settings = item.data('settings');
    var ul = item.find("ul").eq(0);
    var lis = ul.find("li");
    var width = item.width();
    var size = lis.size();
    var current = item.data('current') + 1;
    if (current < size)
      goto_item(item, current);
    else
      if (settings.reset)
        goto_item(item, 0);
  }

  /*
   * Advances slider to specified item
   */
  function goto_item(item, index) {
    reset_timer(item);
    
    var settings = item.data('settings');
    var ul = item.find("ul").eq(0);
    var lis = ul.find("li");
    var width = item.width();
    var size = lis.size();
    index = parseInt(index);

    if (index >= 0 && index < size) {
      item.trigger("slide", {item:item, current:index});
      if (settings.direction == 'tb') {
        ul.stop(true, true).animate({
          top : -100*index+"%"
        }, settings.transition_speed, settings.easing);
      } else {
        ul.stop(true, true).animate({
          left : -100*index+"%"
        }, settings.transition_speed, settings.easing);
      }
      item.data('current', index);
    }
  }

  /*
   * Sets configuration value for slider
   */
  function set(item, obj) {
    var settings = item.data('settings');
    $.extend(settings, obj);
    item.data('settings', settings);
  }
  
  /*
   * Resets slider automatic timer
   */
  function reset_timer(item) {
    var settings = item.data('settings');
    var interval = item.data('interval');
    if (settings.duration) {
      if (interval)
        clearInterval(interval);
      interval = setInterval(function() {
        next_item(item);
      }, settings.duration);
      item.data('interval', interval);
    }
  }
  
  $.fn.huffslider = function(arg1, arg2, arg3) {

    /*
     * Default settings
     */
    var settings ={
      easing : "linear",
      transition_speed : 750,
      duration : null,
      reset : true,
      direction : 'lr'
    };
    
    if (arg1 == undefined || typeof arg1 == "object") {
      // do setup
      if (typeof arg1 == "object")
        $.extend(settings, arg1);

      $(this).each(function() {
        var ul = $(this).find("ul");
        var lis = ul.find("li");
        var width = $(this).width();
        var height = $(this).height();

        // setup css
        $(this).css({
          overflow: 'hidden',
          position: 'relative'
        });
        ul.css({
          width : settings.direction == 'tb' ? width+"px" : width*lis.size()+"px",
          height : settings.direction == 'tb' ? height*lis.size()+"px" : height+"px",
          position : "relative"
        });
        lis.css({
          width : width+"px",
          height : height+"px",
          float : "left"
        });

        // setup data
        $(this).data({
          current: 0,
          settings: settings,
          interval: null
        });
        
        reset_timer($(this));
      });
    } else {
      //handle option
      _this = $(this);
      switch (arg1) {
        case "prev":
          _this.each(function() {
            prev_item($(this));
          });
          break;
        case "next":
          _this.each(function() {
            next_item($(this), arg2);
          });
          break;
        case "goto":
          _this.each(function() {
            goto_item($(this), arg2);
          });
          
          break;
        case "set":
          _this.each(function() {
            set($(this), arg2);
          });
          break;
        case "get_current":
          return _this.eq(0).data('current');
      }
    }

    return $(this);
  };
})(jQuery);