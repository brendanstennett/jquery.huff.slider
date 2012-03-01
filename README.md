# Huff Slider

Just another, very simple to setup, slider for jQuery. It is content agnostic so it does not matter if you are using text, image, video, etc.  However, it does assume all content is of equal height (mostly for aesthetic reasons).  It does not create previous/next or any other navigation links for you to provide the greatest flexibility without limitations.  Only requires jQuery and comes with no css file that needs to be included.  You may put a slider inside another slider without any conflicts.

## Markup

    <div id="slider">
      <ul>
        <li><img src="path/to/image.jpg" /></li>
        <li><img src="path/to/another-image.jpg" /></li>
        <li><img src="path/to/yet-another-image.jpg" /></li>
      </ul>
    </div>

## Usage

All arguments shown below are the defaults.  Note: the name huffslider is chosen instead of slider to avoid naming conflicts.
    
    $(document).ready(function() {
      $('#slider').huffslider({
        easing : "linear",              // which easing to use. 'easeInOutExpo' looks the nicest, but requires jquery-ui
        transition_speed : 750,         // the speed of the slide transition
        duration : null,                // duration between automatic slides in milliseconds.  10000 = 10 seconds. null means no automatic slide.  
        reset : true,                   // whether to loop the slider when the end is reached
        direction : 'lr'                // lr (default) slides content left and right.  tb slides content from top to bottom
      });
    });

## Options

    $('#slider').huffslider('next');        // advances the slider forward (or downward for direction = tb).  Loops to start if reset is set to true
    $('#slider').huffslider('prev');        // advances the slider backward (or upward for direction = tb).  Loops to start if reset is set to true
    $('#slider').huffslider('goto', 2);     // advances to the 3rd item (0-based index)
    $('#slider').huffslider('get_current'); // returns the current index
    $('#slider').huffslider('set', {
      reset: true,
      duration: 5000
    });                                     // sets various properties

Note: the auto-rotate timer is reset on all calls to 'next', 'prev' and 'goto'

## Events

Every slide triggers the 'slide' event.  The event is triggered when the slide starts (not when the slide ends) This can be listened to as so:

    $(document).ready(function() {
      $('#slider').bind('slide', function(event, data) {
        var current = data.current;     // the current index of the item (as it would be after the slide)
        var item = data.item;           // the slider.  In this case $('#slider')
      });
    });

Note: If you have a slider nested inside another slider, you may want to make a call to `event.stopPropagation()` to prevent the parent slider from being triggered.

## Considerations

You may want to explicitly set the height and width of the slider with css to ensure it is displayed as intended.

## License

Copyright (c) 2012 Brendan Stennett

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.