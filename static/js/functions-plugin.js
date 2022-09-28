/*HTML Functions Start*/
var chosenContainerBackdrop = function () {
    return {
        //main function to initiate the module
        init: function () {
            jQuery(document).on("click", ".chosen-container", function () {
                var count = 0;
                var chosen_container = jQuery(".chosen-container");
                var get_chosen_drop_width = jQuery(this).parent().width();
                if (jQuery(".chosen-search").length > 0) {
                    var get_chosen_search_height = jQuery(this).find(".chosen-search").innerHeight();
                }
                jQuery("body").find(".chosen-has-backdrop").removeClass("chosen-has-backdrop").css({
                    "position": "",
                    "z-index": ""
                });
                if (chosen_container.hasClass("chosen-with-drop")) {
                    jQuery(".chosen-backdrop").remove();
                    jQuery(this).parent().append("<div class='chosen-backdrop'></div>");
                    jQuery(this).parent().addClass("chosen-has-backdrop");
                    jQuery(".chosen-has-backdrop").css({
                        "position": "relative",
                        "z-index": "101"
                    });
                    var get_chosen_drop_height = [];
                    jQuery(this).find("li").each(function (index) {
                        get_chosen_drop_height[index] = jQuery(this).innerHeight();
                        count = count + get_chosen_drop_height[index];
                    });
                    jQuery(".chosen-backdrop").css({
                        "height": count,
                        "max-height": 240 + get_chosen_search_height,
                        "position": "absolute",
                        "left": 0,
                        "top": "100%",
                        "width": get_chosen_drop_width,
                        "z-index": "2",
                    });
                } else {
                    jQuery("body").find(".chosen-has-backdrop").removeClass("chosen-has-backdrop").css({
                        "position": "",
                        "z-index": ""
                    });
                    jQuery(".chosen-backdrop").remove();
                }
            });
            jQuery(document).click(function (event) {
                if (!(jQuery(event.target).closest(".chosen-container").length)) {
                    jQuery("body").find(".chosen-has-backdrop").removeClass("chosen-has-backdrop").css({
                        "position": "",
                        "z-index": ""
                    });
                    jQuery(".chosen-backdrop").remove();
                }
            });
        }
    };
}();
jQuery(document).ready(function () {

    jQuery('.menu-itam-holder .menu-itam-list .image-holder a').attr('rel', 'prettyPhoto');

    jQuery(document).on("click", "#update_membership", function (e) {
        e.preventDefault();
        jQuery('#membership_current').css("display", "none");
        jQuery('#membership_buy').css("display", "block");
    });
    jQuery(document).on("click", "#cancel_btn_membership", function (e) {
        e.preventDefault();
        jQuery('#membership_current').css("display", "block");
        jQuery('#membership_buy').css("display", "none");
    });

    jQuery('a.send-invitation').click(function () {
        event.preventDefault();
        $('.invited_team_member').delay(200).queue(function (next) {
            jQuery('.invited_team_member').addClass('active');
            jQuery('body').addClass('invite-member-open');
            next();
        });
        jQuery('body').find('#overlay').remove();
        jQuery(this).append('<div id="overlay" style="display:none"></div>');
        jQuery('#overlay').fadeIn(300);
    });
    jQuery(document).on("click", ".invite-member a.cancel", function (e) {
        e.preventDefault();
        jQuery('body').removeClass('invite-member-open');
        jQuery(this).parents('invited_team_member').removeClass("active");
        jQuery(this).parents('invited_team_member').hide();
        jQuery('#overlay').fadeOut(300);
        setTimeout(function () {
            jQuery('#overlay').remove();
        }, 400);
    });

    jQuery('a.add-more.add_team_member').click(function () {
        event.preventDefault();
        $('.invite-member.add-member').delay(200).queue(function (next) {
            jQuery('.invite-member.add-member').addClass('active');
            jQuery('body').addClass('invite-member-open');
            next();
        });
        jQuery('body').find('#overlay').remove();
        jQuery(this).append('<div id="overlay" style="display:none"></div>');
        jQuery('#overlay').fadeIn(300);
    });
    jQuery(document).on("click", ".invite-member a.cancel", function (e) {
        e.preventDefault();
        jQuery('body').removeClass('invite-member-open');
        jQuery(this).parents('invite-member.add-member').removeClass("active");
        jQuery(this).parents('invite-member.add-member').hide();
        jQuery('#overlay').fadeOut(300);
        setTimeout(function () {
            jQuery('#overlay').remove();
        }, 400);
    });

    jQuery('a.restaurant-team-member-det').click(function () {
        event.preventDefault();
        $('.invite-member.team-member-det-box').delay(200).queue(function (next) {
            jQuery('.invite-member.team-member-det-box').addClass('active');
            jQuery('body').addClass('invite-member-open');
            next();
        });
        jQuery('body').find('#overlay').remove();
        jQuery(this).append('<div id="overlay" style="display:none"></div>');
        jQuery('#overlay').fadeIn(300);
    });
    jQuery(document).on("click", ".invite-member a.cancel", function (e) {
        e.preventDefault();
        jQuery('body').removeClass('invite-member-open');
        jQuery(this).parents('invite-member.team-member-det-box').removeClass("active");
        jQuery(this).parents('invite-member.team-member-det-box').hide();
        jQuery('#overlay').fadeOut(300);
        setTimeout(function () {
            jQuery('#overlay').remove();
        }, 400);
    });


    jQuery('#profile_delete, #id_truebtn, #id_falsebtn').click(function () {
        event.preventDefault();
        jQuery('#id_confrmdiv').toggle('fast');
    });
    jQuery('.dashboard-review-reply-btn').click(function () {
        event.preventDefault();
        jQuery('.dashbard-user-reviews-list').css("display", "none");;
        jQuery('.dashboard-add-new-review-holder.add-new-review-holder').css("display", "block");
    });
    jQuery('.close-post-new-reviews-btn').click(function () {
        event.preventDefault();
        jQuery('.dashbard-user-reviews-list').css("display", "block");
        jQuery('.dashboard-add-new-review-holder.add-new-review-holder').css("display", "none");
    });



    jQuery(document).on("click", ".user-dashboard-menu > ul > li.user-dashboard-menu-children > a", function () {
        jQuery(this).parent().toggleClass('menu-open');
        jQuery(this).parent().siblings().removeClass('menu-open');
        setTimeout(function () {
            jQuery('.user-dashboard-menu > ul > li.user-dashboard-menu-children > a').addClass('open-overlay');
        }, 2);
        jQuery(".user-dashboard-menu > ul > li").append("<div class='location-overlay'></div>");
        jQuery(".user-dashboard-menu > ul > li > ul").append("<i class='icon-cross3 close-menu-location'></i>");
    });
    jQuery(document).on("click", ".user-dashboard-menu > ul > li.user-dashboard-menu-children > a.open-overlay", function () {
        jQuery(".location-overlay").remove();
        jQuery(".close-menu-location").remove();
        setTimeout(function () {
            jQuery('.user-dashboard-menu > ul > li.user-dashboard-menu-children > a').removeClass('open-overlay');
        }, 2);
    });
    jQuery(document).on("click", ".location-overlay", function () {
        jQuery(this).closest(".location-overlay").remove();
        jQuery(".close-menu-location").remove();
        jQuery('.user-dashboard-menu > ul > li.user-dashboard-menu-children').removeClass("menu-open");
        jQuery('.user-dashboard-menu > ul > li.user-dashboard-menu-children > a').removeClass('open-overlay');
    });
    jQuery(document).on("click", ".close-menu-location", function () {
        jQuery(this).closest(".close-menu-location").remove();
        jQuery(".location-overlay").remove();
        jQuery('.user-dashboard-menu > ul > li.user-dashboard-menu-children').removeClass("menu-open");
        jQuery('.user-dashboard-menu > ul > li.user-dashboard-menu-children > a').removeClass('open-overlay');
    });

    /*
     * custom scroll oder detail popup.
     */
    if (jQuery(".menu-order-detail .modal-dialog .modal-content").length != '') {
        $(".menu-order-detail .modal-dialog .modal-content").mCustomScrollbar({
            setHeight: 724,
        });
    }
    /*
     * end custom scroll oder detail popup. 
     */

    /*Main Navigation Function Start*/
    if (jQuery(".main-navigation>ul").length != '') {
        if (typeof jQuery(document).slicknav != "undefined") {
            jQuery('.main-navigation>ul').slicknav({
                prependTo: '.main-nav'
            });
        }
    }
    jQuery('.filter-toggle').click(function () {
        jQuery(this).toggleClass("active").next().slideToggle();
    });

    function inherit(proto) {
        function F() {}
        F.prototype = proto
        return new F
    }
    var prevEleHeight;

    function stickyElement(element, width, eleOrder, elePos, stopTarget) {
        // properties
        this.element = element;
        this.width = width;
        this.order = eleOrder;
        this.offsetTop = element.offset().top;
        this.defualtWidth = element.parent().width();
        this.defualtPos = elePos;
        this.stopper = stopTarget;

        // Methods  
        this.defaultValues = function () {
            this.element.css({
                "position": "relative",
                "width": '100%',
                "top": "auto"
            });
            this.element.parent().css("height", 'auto');
        }
        this.setWidth = function () {
            if (this.element.parent().is(".sticky-wrpper") || this.element.parent()) {
                wrapWith = this.element.parent().width();
                this.element.css("width", wrapWith + 'px');
            }
        }
        this.elPosition = function () {
            this.element.css("position", "fixed");
        }
        this.setTop = function () {
            this.element.css("top", "0");
            if (this.order != undefined) {
                if (this.defualtPos == 'initialPos') {
                    this.element.css("top", this.offsetTop);
                } else if (this.defualtPos != undefined) {
                    this.element.css("top", this.defualtPos + 'px');
                }
                prevEleHeight = this.element.outerHeight();
            } else {
                this.element.css("top", prevEleHeight);
                prevEleHeight = prevEleHeight + prevEleHeight;
            }
        }
        this.addWrapper = function () {
            if (!this.element.parent().hasClass("sticky-wrpper")) {
                this.element.wrap("<div class='sticky-wrpper'></div>").height();
                this.element.parent().css("height", this.element.outerHeight(true) + 'px');
            }
        }
        this.addStoper = function () {
            if (this.stopper.find(".sticky-stopper").length == 0) {
                this.stopper.append("<span class='sticky-stopper'></span>");
            }
        }
        this.withResponsive = function () {

        }
    }
    if ($(".stickynav-tabs").length > 0) {
        var stickyHeader, stickySearch;
        var headerHeight = $("#header").outerHeight();
        stickyHeader = new stickyElement($(".stickynav-tabs"), 'initial', 'first', '15');
        stickySearch = new stickyElement($(".sticky-search"), 'initial', '', '58', $(".tab-content"));
        var eleTop, eleTop2

        eleTop = stickyHeader.offsetTop + headerHeight - 13;
        eleTop2 = stickySearch.offsetTop + headerHeight - 13;
        if ($("body").find("#wpadminbar").length) {
            stickyHeader = new stickyElement($(".stickynav-tabs"), '', 'first', '47');
            stickySearch = new stickyElement($(".sticky-search"), '', '', '90', $(".tab-content"));
            eleTop = stickyHeader.offsetTop + 25;
            eleTop2 = stickySearch.offsetTop + 25;
        }
        jQuery(window).scroll(function () {
            if ($(window).width() + 17 > 960) {
                var windowTop = $(window).scrollTop();
                if (windowTop >= eleTop) {
                    stickyHeader.elPosition();
                    stickyHeader.setTop();
                    stickyHeader.setWidth();
                    stickyHeader.addWrapper();

                    stickySearch.elPosition();
                    stickySearch.setTop();
                    stickySearch.setWidth();
                    stickySearch.addWrapper();
                    stickySearch.addStoper();
                    var stoperTop = $(".sticky-stopper").offset().top - 160;
                    if (windowTop >= stoperTop) {
                        stickyHeader.defaultValues();
                        stickySearch.defaultValues();
                    }
                } else {
                    stickyHeader.defaultValues();
                    stickySearch.defaultValues();
                }
            } else {
                stickyHeader.defaultValues();
                stickySearch.defaultValues();
            }
        });
        $(window).resize(function () {
            stickyHeader.setWidth();
            stickySearch.setWidth();
            if ($(window).width() + 17 < 960) {
                stickyHeader.defaultValues();
                stickySearch.defaultValues();
            }
        });
    }
    /*Sticky Search Bar End*/
    // Touch Behaviorr for Mobile devices
    chosenContainerBackdrop.init();
    if ($('.chosen-container').length > 0) {
        $('.chosen-container').on('touchstart', function (e) {
            e.stopPropagation();
            e.preventDefault();
            // Trigger the mousedown event.
            $(this).trigger('mousedown');
        });
    }
    /*Chosen Select Functions Start*/
    if (jQuery(".chosen-select, .chosen-select-deselect, .chosen-select-no-single, .chosen-select-no-results, .chosen-select-width").length != '') {
        var config = {
            '.chosen-select': {},
            '.chosen-select-deselect': {
                allow_single_deselect: true
            },
            '.chosen-select-no-single': {
                disable_search_threshold: 10
            },
            '.chosen-select-no-results': {
                no_results_text: 'Oops, nothing found!'
            },
            '.chosen-select-width': {
                width: "95%"
            }
        }
        for (var selector in config) {
            $(selector).chosen(config[selector]);
        }
    };
    /*Chosen Select Functions End*/
    /* Date Time picker */
    if (jQuery('#datetimepicker1').length != '') {
        jQuery('#datetimepicker1').datetimepicker({
            icons: {
                time: "icon-clock-o",
                date: "icon-calendar-o",
                up: " icon-chevron-up",
                down: "icon-chevron-down"
            }
        });
    }
    if (jQuery('#datetimepicker4').length != '') {
        jQuery('#datetimepicker4').datetimepicker({
            icons: {
                time: "icon-clock-o",
                date: "icon-calendar-o",
                up: " icon-chevron-up",
                down: "icon-chevron-down"
            }
        });
    }
    /*Reviews Sortby Functions Start*/
    $(document).on("click", ".reviews-sortby li.reviews-sortby-active", function () {
        jQuery('.reviews-sortby > li').siblings().removeClass('reviews-sortby-active');
    });
    jQuery('.input-reviews > .radio-field label').on('click', function () {
        jQuery(this).parent().toggleClass('active');
        jQuery(this).parent().siblings().removeClass('active');
        /*replace inner Html*/
        var radio_field_active = jQuery(this).html();
        jQuery(".active-sort").html(radio_field_active);
        jQuery('.reviews-sortby > li').removeClass('reviews-sortby-active');
    });
    /*Reviews Sortby Functions End*/
    if (jQuery(".company-holder.default .swiper-container").length != '') {
        var swiper = new Swiper('.company-holder.default .swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 6,
            slidesPerColumn: 2,
            autoplay: 3500,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30,
            breakpoints: {
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 40
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                }
            }
        });
    }

    var swiper = new Swiper('.company-holder.fancy .swiper-container', {
        slidesPerView: 6,
        spaceBetween: 20,
        loop: true,
        nextButton: '.fancy-button-next',
        prevButton: '.fancy-button-prev',
    });

    /* blog Slider Start */
    if (jQuery(".blog .swiper-container").length != '') {
        var swiper = new Swiper('.blog .swiper-container', {
            slidesPerView: 'auto',
            loop: true,
            autoplay: 3500,
            autoplayDisableOnInteraction: false,
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev'

        });
    }
    /*blog Detasil Slider Start*/
    if (jQuery(".blog-detail .swiper-container").length != '') {
        var swiper = new Swiper('.blog-detail .swiper-container', {
            loop: true,
            autoplay: 3500,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            pagination: '.swiper-pagination',
            paginationClickable: true,
            slidesPerView: 3,
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                700: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                480: {
                    slidesPerView: 1,
                    spaceBetween: 30
                }
            }
        });

    }
    /* blog Slider End */
    /*Delivery Timing Dropdown Functions Start*/
    $(".delivery-timing .reviews-sortby-active").on("click", function () {
        $(this).next("ul").slideToggle();
        $(this).parents("ul").toggleClass("open");
        $('.delivery-dropdown > li > a').on('click', function (e) {
            e.preventDefault();
            var anchorText = $(this).text();
            $(".delivery-timing .reviews-sortby-active small").text(anchorText);
            $(".delivery-timing .reviews-sortby-active").next("ul").slideUp();
            $(this).parents("ul").removeClass("open");
        });
    });
    $(document).mouseup(function (e) {
        var container = $(".delivery-timing > ul");
        if (!container.is(e.target) &&
            container.has(e.target).length === 0) {
            $(".delivery-timing .reviews-sortby-active").next("ul").hide();
            $(".delivery-timing > ul").removeClass("open");
        }
    });
    /*Delivery Timing Dropdown Functions End*/

    if ($(window).width() > 991) {
        if (jQuery(".sticky-sidebar").length != '') {
            $('.sticky-sidebar')
                .theiaStickySidebar({
                    additionalMarginTop: 30
                });
        }
    }
    /*Sticky Function End*/

    /*Location Popup Function Start*/
    $(document).on("click", "#pop-close", function () {
        $('#popup').addClass('popup-open');
    });
    $(document).on("click", "#close", function () {
        $('#popup').removeClass('popup-open');
    });
    /*Location Popup Function End*/

});
/*----------Window Load Function Start----------*/
jQuery(window).load(function () {
    //Listing_Filter_li();
    /*Masonry Function Start*/
    if ($('.grid').length !== 0) {
        if (typeof jQuery(document).masonry != "undefined") {
            $('.grid').masonry({
                itemSelector: '.grid-item',
            });
        }
    }
    /*Masonry Function End */

    /*Load More Functions Start*/
    jQuery(function () {
        jQuery(".review-listing > ul#mylist > li").slice(0, 3).show();
        jQuery("#load-more").click(function (e) {
            e.preventDefault();
            jQuery(".review-listing > ul#mylist > li:hidden").slice(0, 1).show();
            if (jQuery(".review-listing > ul#mylist > li:hidden").length == 0) {
                alert("No More Show");
            }
        });
    });
    /*Load More Functions End*/
});
/*HTML Functions End*/