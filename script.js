// =============================================================================
// MV.Portfolio — scroll spy, hamburger menu, scroll reveal
// =============================================================================
MV = {};

MV.Portfolio = {

    init: function () {
        this.setupHamburger();
        this.setupScrollReveal();
        this.setupScrollSpy();
    },

    // ── Setup ─────────────────────────────────────────────────────────────────

    setupHamburger: function () {
        var $btn,
            $links,
            $nav;

        $btn   = $('.hamburger');
        $links = $('.side-nav ul li a');
        $nav   = $('.side-nav');

        $btn.on('click', function () {
            $btn.toggleClass('open');
            $nav.toggleClass('open');
        });

        $links.on('click', function () {
            $btn.removeClass('open');
            $nav.removeClass('open');
        });
    },

    setupScrollReveal: function () {
        var $cards,
            observer;

        $cards   = $('.experience-card, .project-card');
        observer = new IntersectionObserver(function (entries) {
            $.each(entries, function (i, entry) {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        $cards.addClass('reveal');
        $cards.each(function () {
            observer.observe(this);
        });
    },

    setupScrollSpy: function () {
        var $navLinks,
            $sections,
            midpoint,
            scrollTop;

        $navLinks = $('.side-nav ul li a');
        $sections = $('section[id]');

        $navLinks.first().addClass('active');

        $(window).on('scroll', function () {
            midpoint  = $(window).scrollTop() + $(window).height() / 2;
            scrollTop = $(window).scrollTop();

            if (scrollTop < 80) {
                $navLinks.removeClass('active');
                $navLinks.filter('[href="#about"]').addClass('active');
                return;
            }

            $sections.each(function () {
                var $section, bottom, id, top;
                $section = $(this);
                bottom   = $section.offset().top + $section.outerHeight();
                id       = $section.attr('id');
                top      = $section.offset().top;

                if (midpoint >= top && midpoint < bottom) {
                    $navLinks.removeClass('active');
                    $navLinks.filter('[href="#' + id + '"]').addClass('active');
                }
            });
        });
    }

};

$(document).ready(function () {
    MV.Portfolio.init();
});