$(function() {

    function t() {
        if(u.progress > 1) u.progress = 1;
        if(u.progress < 0) u.progress = 0;
        if(u.yPos < 0) u.yPos = 0;
        TweenMax.set(".top-circle", {
            y: u.yPos
        });
        if(canMovePage){
            TweenMax.set("#fullpage", {
                y: -u.yPos
            });
        }
        n(!1,u.progress);
        u.progress = u.yPos / $(".connecting-line").height();
    }

    function n(e, t) {
        var t = t || 0
            , o = $(".connecting-line .small-dot")
            , a = new TimelineMax;
        return o.each(function(n) {
            var r = n / o.length < t ? 0 : n / o.length;
            a.to(this, 1, {
                autoAlpha: r,
                ease: Expo.easeOut
            }, e ? .01 * n : 0)
        }),
            a
    }

    var i = 10,
        u = {
            yPos: 0,
            progress: 0
        },
        s = false,
        k = false,
        canMovePage = true;

    var e = new TimelineMax({
        repeat: -1,
        repeatDelay: .05
    });

    e.staggerTo(".top-circle .pulsate", 2, {
        width: 150,
        height: 150,
        borderRadius: 200,
        ease: Expo.easeOut,
        autoAlpha: 0
    }, .2);
    e.to(".top-circle .main", .5, {
        width: 50,
        height: 50,
        borderRadius: 50,
        ease: Expo.easeOut
    });

    var $topCircle = $('.top-circle');
    $topCircle
        .on("touchstart mouseover", function(e) {
            k || TweenMax.to(this, .3, {
                scale: .9
            }),
                e.preventDefault()
        })
        .on("touchend mouseout", function(t) {
            if (!k) {

                TweenMax.to(this, .3, {
                    scale: 1
                });
                t.preventDefault();
            }
        })
        .on('touchstart mousedown', function (t) {
            e.pause(),
            TweenMax.to(e, .2, {
                progress: 0,
                //ease: Expo.easeOut
            }),
                TweenMax.to(this, .5, {
                    scale: .5,
                    //ease: Expo.easeOut
                }),
                k = !0,
                t.preventDefault()
        });

    $('#main-nav').on("touchend mouseup", function() {
        k = !1;
        s = false;
        TweenMax.to($topCircle, .5, {
            scale: 1
        });
        TweenMax.to(u, .2, {
            yPos: 0,
            //ease: Expo.easeOut,
            onUpdate: t
        });
        e.play();
        if(u.progress > .9) {
            canMovePage = false;
            // вызвать функцию переходу к основынм слайдам
            $.fn.fullpage.moveSectionDown();
            $.fn.fullpage.setMouseWheelScrolling(false);
            $.fn.fullpage.setAllowScrolling(false);
        }

    });

    var $falter = $(".maori-intro");
    var $connectLine = $('.connecting-line');

    $(document).on("mousemove touchmove", function(e) {
        if (!s) {
            var o = "touchmove" === e.type ? e.originalEvent.touches[0].pageY : e.clientY,
                a = o - $falter.position().top - $topCircle.height() / 2;
            if (k) {
                if(a > $connectLine.height()*0.8 && u.progress > 0.9)
                    a = $('.target-circle').position().top;
                TweenMax.to(u, .2, {
                    yPos: a,
                    onUpdate: t
                });
            }
        }
    });

    if($connectLine.length > 0){
        var heightConnectLine = $connectLine.height();
        var curYPos = 0;
        while( curYPos <  heightConnectLine){
            var $smallDot = $('<span />');
            $smallDot.addClass('small-dot');
            TweenMax.set($smallDot, {
                y: curYPos,
                opacity:  curYPos / heightConnectLine
            });
            $connectLine.append($smallDot);
            curYPos += 6;
        }
    }

    var interval = 20;
    var summTime = 0;
    $.fn.animate_Text = function () {
        return this.each(function (i1, el1) {
            var $this = $(this);
            var string = $this.text();
            $this.html(string.replace(/[_0-9a-zA-Zа-яёА-ЯЁ,?—!\-\.]/g, '<span class="new">$&</span>'));
            $this.find('span.new').each(function (i2, el2) {
                var $el = $(this);
                summTime += interval;
                $el.delay( summTime )
                    .queue(function () {
                    $el.addClass('div_opacity');
                });
            });
        });
    };

    var isAnimatedSwipe = false;
    var idAnimatedSwipe;
    var isConceptAnimate = false;

    var canScroll = false;

    $('#fullpage').fullpage({
        //Navigation
        menu: '#main-menu',
        lockAnchors: false,
        //anchors:['main','conception', 'interior'],
        navigation: false,
        navigationPosition: 'right',

        showActiveTooltip: false,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 2000,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 200,
        scrollBar: false,
        easing: 'easeInOutExpo',
        easingcss3: 'ease-in-out',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        continuousHorizontal: false,
        scrollHorizontally: false,
        interlockedSlides: false,
        resetSliders: false,
        fadingEffect: false,
        //normalScrollElements: '#element1, .element2',
        scrollOverflow: false,
        scrollOverflowOptions: null,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,
        bigSectionsDestination: null,

        //Accessibility
        keyboardScrolling: false,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: true,
        verticalCentered: true,
        //sectionsColor : ['#ccc', '#fff'],
        //paddingTop: '3em',
        //paddingBottom: '10px',
        //fixedElements: '#header, .footer',
        responsiveWidth: 0,
        responsiveHeight: 0,
        responsiveSlides: false,

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',

        //events
        onLeave: function(index, nextIndex, direction){

            var _this = this;

            if(!canScroll) {

                if(!isAnimatedSwipe) {

                    isAnimatedSwipe = true;

                    clearTimeout(idAnimatedSwipe);

                    idAnimatedSwipe = setTimeout(function () {

                        if ($(_this).find('.section__swipe').length > 0) {
                            $(_this).find('.section__swipe-line').slideUp(300, function () {
                                $(_this).find('.section__swipe').fadeOut(300, function () {
                                    canScroll = true;
                                    isAnimatedSwipe = false;
                                    if (direction === "down") {
                                        $.fn.fullpage.moveTo(index + 2);
                                    } else {
                                        $.fn.fullpage.moveTo(index - 2);
                                    }
                                });
                            });
                        } else {
                            canScroll = true;
                            isAnimatedSwipe = false;
                            if (direction === "down") {
                                $.fn.fullpage.moveTo(index + 2);
                            } else {
                                $.fn.fullpage.moveTo(index - 2);
                            }
                        }
                    }, 1);
                }

                return false;
            }

            //$(this).find('.section__swipe-line').slideUp(300);
            //$(this).find('.section__swipe').fadeOut(300);

            /*if($(this).find('.section__swipe').length > 0) {
                if(!isAnimatedSwipe) {
                    var _this = this;
                    idAnimatedSwipe = setTimeout(function () {
                        $(_this).find('.section__swipe-line').slideUp(300, function () {
                            $(_this).find('.section__swipe').fadeOut(300, function () {
                                isAnimatedSwipe = true;
                                if (direction === "down") {
                                    $.fn.fullpage.moveSectionDown();
                                } else {
                                    $.fn.fullpage.moveSectionUp();
                                }
                            });
                        });
                    });
                    return false;
                }
            }*/
            /*setTimeout(function() {
                if ((nextIndex) % 2 === 0) {
                    if (direction === "down") {
                        $.fn.fullpage.moveSectionDown();
                    } else {
                        $.fn.fullpage.moveSectionUp();
                    }
                }
            },1);*/

            if(nextIndex == 1){
                canMovePage = true;
                $('#main-menu').fadeOut(300);
            }
            if(nextIndex > 1){
                $('#main-nav').fadeOut(300);
            }
        },
        afterLoad: function(anchorLink, index){

            canScroll = false;

            console.log('afterLoad');

            $(this).find('.section__swipe').fadeIn(300, function () {
                $(this).find('.section__swipe-line').slideDown('300')
            });
            if(index > 1)
                $('#main-menu').fadeIn(300);
            if(index == 1) {
                $('#main-nav').fadeIn(300);
                $('#fullpage').css('transition', "");
            }

            if(index == 3 && !isConceptAnimate){
                isConceptAnimate = true;
                $('#concept-descr').fadeIn(300);
                $('#concept-descr .conception-desrc__text span').animate_Text();
            }

            isLastSlide = false;
            if(index == $('.fp-section').length){
                isLastSlide = true;
                footerController();
            }
        },
        afterRender: function(){},
        afterResize: function(){},
        afterResponsive: function(isResponsive){},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
    });

    if(window.location.hash == '#main' || window.location.hash == '') {
        $.fn.fullpage.setMouseWheelScrolling(false);
        $.fn.fullpage.setAllowScrolling(false);
    }

    function footerController() {
        $(document).one('wheel', function (event) {
            if (event.originalEvent.deltaY > 0) {
                console.log('Scrolled down!');
                window.location.hash = "#contacts";
            } else {
                console.log('Scrolled up!');
            }
        })
    }

    var isLastSlide = false;
    var isOpenMap = false;

    $(document).on('wheel', function (event) {
        if(!isOpenMap) {
            if (isLastSlide) {
                if (event.originalEvent.deltaY < 0) {
                    if (window.location.hash == "#contacts") {
                        window.history.back();
                    }
                    footerController();
                }
            } else {
                if (window.location.hash == "#contacts") {
                    window.history.back();
                }
            }
        }
    });

    var elmt = $("#interior-slider");
    elmt.vegas({
        timer: false,
        shuffle: false,
        delay: 8000,
        slides: [
            { src: "img/bg-slider/first.jpg", valign: 'bottom' },
            { src: "img/bg-slider/second.jpg" },

            { src: "img/bg-slider/fours.jpg", valign: 'bottom' },
            { src: "img/bg-slider/fifth.jpg", valign: 'bottom' },
            { src: "img/bg-slider/third.jpg" },
        ],
        overlay: "img/overlays/06.png",
        init: function (globalSettings) {
            var $this = $(this);
            var $pagination = $this.find('.slider-paginate');
            //console.log(globalSettings);
            for(var i = 0; i < globalSettings.slides.length; i++) {
                $pagination.append('<div class="slider-paginate__item" data-slide="'+i+'"><div class="slider-paginate__item-inner"></div></div>');
            }
            $('.slider-paginate__item').on('click',function () {
                $('.slider-paginate__item').removeClass('active');
                var $this = $(this);
                $this.addClass('active');
                var slideIndex = $this.data('slide');
                elmt.vegas('jump', slideIndex);
                console.log(11);
            })
        },
        walk: function (index, slideSettings) {
            $('.slider-paginate__item').removeClass('active');
            $('.slider-paginate__item[data-slide='+index+']').addClass('active');
        }
    });

    $('#slider-next').click( function() {
        elmt.vegas('next');
    });
    $('#slider-prev').click( function() {
        elmt.vegas('previous');
    });

    $('.footer__close').click(function(){
        $('.footer').removeClass('footer--active');
        window.history.back();
        if(isLastSlide){
            footerController();
        }
    });

    $(document).on('click', function () {
        $('.conception .circle.js-active').trigger('click');
    });

    var circles = [];
    $('.conception .circle').each(function (index, element) {
        var $this = $(this);
        circles.push($this);
        $this.animation = new TimelineMax({
            repeat: -1,
            repeatDelay: 1
        });
        $this.animation.staggerTo($this.find(".circle__pulsate"), 2, {
            width: 150,
            height: 150,
            borderRadius: 200,
            autoAlpha: 0,
            ease: Expo.easeOut
        }, .2);

        $this.animation.pause();
        setTimeout(function () {
            $this.animation.play();
        }, 200 * index);
        $this.on('click', '.fact', function (e) {
            e.stopPropagation();
            e.preventDefault();
        });
        $this.on('click',function (e) {
                e.stopPropagation();
                if(!$this.hasClass('js-active')) {
                    var $prev = $('.conception .circle.js-active');
                    if($prev.length > 0) {
                        $prev.removeClass('js-active');
                        $prev.find('.circle__outer').removeClass('circle__active');
                        $prev.find('.circle__in').removeClass('circle__in__active');
                        $prev.find('.fact').slideUp('slow');
                        //console.log(circles,$prev.index());
                        circles[$prev.index()-1].animation.play();
                        /*circles.forEach(function (element,index,list) {
                            element.animation.play();
                        });*/
                    }
                    $this.animation.pause();
                    TweenMax.to( $this.animation, .5, {
                        progress: 0,
                        ease: Expo.easeOut
                    });
                    $this.addClass('js-active');
                    $this.find('.circle__outer').addClass('circle__active');
                    $this.find('.circle__in').addClass('circle__in__active');
                    $this.find('.fact').slideDown('slow');
                }else{
                    $this.animation.play();
                    $this.removeClass('js-active');
                    $this.find('.circle__outer').removeClass('circle__active');
                    $this.find('.circle__in').removeClass('circle__in__active');
                    $this.find('.fact').slideUp('slow');
                }
            })
    });

    $('.section__swipe:not(#swipe-to-more)').click(function(){
        /*var _this = this;
        $(_this).find('.section__swipe-line').slideUp(300, function () {
            $(_this).fadeOut(300, function () {
                $.fn.fullpage.moveSectionDown();
            });
        });*/

        $.fn.fullpage.moveSectionDown();
    });

    $('#swipe-to-more').click(function () {
        window.location.hash = '#contacts';
    });

    $('a[href="#map"]').on('click', function (event) {
        isOpenMap = true;
        $('#map').addClass('map--active');//.slideDown();
        event.preventDefault();
    });
    $('.map__close').on('click', function () {
        $('#map').removeClass('map--active');//.slideUp();
        setTimeout(function () {
            isOpenMap = false;
        }, 500);
    });

    var anchor = window.location.hash;
    var $footer = $('.footer');
    $('.main-menu__pill a[href="'+anchor+'"]').addClass('active');
    $(window).bind('hashchange', function() {
        var anchor = window.location.hash;
        $('.main-menu__pill').find('.active').removeClass('active');
        $('.main-menu__pill a[href="'+anchor+'"]').addClass('active');

        if(anchor == "#contacts"){
            $footer.addClass('footer--active');
            $.fn.fullpage.setMouseWheelScrolling(false);
            $.fn.fullpage.setAllowScrolling(false);
        }else{
            $footer.removeClass('footer--active');
            clearTimeout($.data(this, 'timer'));
            $.data(this, 'timer', setTimeout(function() {
                $.fn.fullpage.setMouseWheelScrolling(true);
                $.fn.fullpage.setAllowScrolling(true);
            }, 750));
        }
    });

    $(".main-menu__pill a").click(function(){
        var $this = $(this);
        if($this.attr('href') == "#contacts"){
            if($this.hasClass('active'))
                window.history.back();
        }
    });
});
