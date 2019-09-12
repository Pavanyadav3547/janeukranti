//Back to top //

(function(){
    var backTop = document.getElementsByClassName('js-cd-top')[0],
        // browser window scroll (in pixels) after which the "back to top" link is shown
        offset = 300,
        //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
        offsetOpacity = 1200,
        scrollDuration = 700
    scrolling = false;
    if( backTop ) {
        //update back to top visibility on scrolling
        window.addEventListener("scroll", function(event) {
            if( !scrolling ) {
                scrolling = true;
                (!window.requestAnimationFrame) ? setTimeout(checkBackToTop, 250) : window.requestAnimationFrame(checkBackToTop);
            }
        });
        //smooth scroll to top
        backTop.addEventListener('click', function(event) {
            event.preventDefault();
            (!window.requestAnimationFrame) ? window.scrollTo(0, 0) : scrollTop(scrollDuration);
        });
    }

    function checkBackToTop() {
        var windowTop = window.scrollY || document.documentElement.scrollTop;
        ( windowTop > offset ) ? addClass(backTop, 'cd-top--show') : removeClass(backTop, 'cd-top--show', 'cd-top--fade-out');
        ( windowTop > offsetOpacity ) && addClass(backTop, 'cd-top--fade-out');
        scrolling = false;
    }

    function scrollTop(duration) {
        var start = window.scrollY || document.documentElement.scrollTop,
            currentTime = null;

        var animateScroll = function(timestamp){
            if (!currentTime) currentTime = timestamp;
            var progress = timestamp - currentTime;
            var val = Math.max(Math.easeInOutQuad(progress, start, -start, duration), 0);
            window.scrollTo(0, val);
            if(progress < duration) {
                window.requestAnimationFrame(animateScroll);
            }
        };

        window.requestAnimationFrame(animateScroll);
    }

    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    //class manipulations - needed if classList is not supported
    function hasClass(el, className) {
        if (el.classList) return el.classList.contains(className);
        else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
    function addClass(el, className) {
        var classList = className.split(' ');
        if (el.classList) el.classList.add(classList[0]);
        else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
        if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
    }
    function removeClass(el, className) {
        var classList = className.split(' ');
        if (el.classList) el.classList.remove(classList[0]);
        else if(hasClass(el, classList[0])) {
            var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
            el.className=el.className.replace(reg, ' ');
        }
        if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
    }
})();

//Slider for Testimonial//
(function($) {
    $.fn.rotateSlider = function(opt) {
        var $this = this,
            itemClass = opt.itemClass || 'rotateslider-item',
            arrowClass = opt.arrowClass || 'js-rotateslider-arrow',
            $item = $this.find('.' + itemClass),
            $arrow = $this.find('.' + arrowClass),
            itemCount = $item.length;


        var defaultIndex = 0;

        changeIndex(defaultIndex);

        $arrow.on('click', function() {
            var action = $(this).data('action'),
                nowIndex = $item.index($this.find('.now'));
            if(action == 'next') {
                if(nowIndex == itemCount - 1) {
                    changeIndex(0);
                } else {
                    changeIndex(nowIndex + 1);
                }
            } else if (action == 'prev') {
                if(nowIndex == 0) {
                    changeIndex(itemCount - 1);
                } else {
                    changeIndex(nowIndex - 1);
                }
            }
        });

        function changeIndex (nowIndex) {
            // clern all class
            $this.find('.now').removeClass('now');
            $this.find('.next').removeClass('next');
            $this.find('.prev').removeClass('prev');
            if(nowIndex == itemCount -1){
                $item.eq(0).addClass('next');
            }
            if(nowIndex == 0) {
                $item.eq(itemCount -1).addClass('prev');
            }

            $item.each(function(index) {
                if(index == nowIndex) {
                    $item.eq(index).addClass('now');
                }
                if(index == nowIndex + 1 ) {
                    $item.eq(index).addClass('next');
                }
                if(index == nowIndex - 1 ) {
                    $item.eq(index).addClass('prev');
                }
            });
        }
    };
})(jQuery);

//Header fixed//
$(function () {
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if(scroll >= 100){
            $('.main-nav').addClass("white");

        }
        else{
            $('.main-nav').removeClass("white");
        }

    });

});


//Mega menu//
$('.menu-toggle').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    $('.mega-menu').toggleClass('open');

    $(document).one('click', function closeMenu (e){
        if($('.mega-menu').has(e.target).length === 0){
            $('.mega-menu').removeClass('open');
        } else {
            $(document).one('click', closeMenu);
        }
    });
});


$(function(){
    $('.fadein p:gt(0)').hide();
    setInterval(function(){$('.fadein > :first-child').fadeOut().next('p').fadeIn().end().appendTo('.fadein');}, 7500);
});