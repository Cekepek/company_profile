(function($) {

  "use strict";

  // init Isotope
	var initIsotope = function () {
    $(document).ready(function() {
      $('.grid').each(function () {

        // $('.grid').imagesLoaded( function() {
        // images have loaded
        var $buttonGroup = $('.button-group');
        var $checked = $buttonGroup.find('.is-checked');
        var filterValue = $checked.attr('data-filter');
  
        var $grid = $('.grid').isotope({
          itemSelector: '.portfolio-item',
          // layoutMode: 'fitRows',
          filter: filterValue
        });
  
        // bind filter button click
        $('.button-group').on('click', 'a', function (e) {
          e.preventDefault();
          filterValue = $(this).attr('data-filter');
          $grid.isotope({ filter: filterValue });
        });
  
        // change is-checked class on buttons
        $('.button-group').each(function (i, buttonGroup) {
          $buttonGroup.on('click', 'a', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
          });
        });
        // }); 
  
      });
  
      $('.grid-interior').each(function () {
  
        // $('.grid').imagesLoaded( function() {
        // images have loaded
        var $buttonGroup = $('.button-group-interior');
        var $checked = $buttonGroup.find('.is-checked-interior');
        var filterValue = $checked.attr('data-filter');
  
        var $grid = $('.grid-interior').isotope({
          itemSelector: '.portfolio-item-interior',
          // layoutMode: 'fitRows',
          filter: filterValue
        });
  
        // bind filter button click
        $('.button-group-interior').on('click', 'a', function (e) {
          e.preventDefault();
          filterValue = $(this).attr('data-filter');
          $grid.isotope({ filter: filterValue });
        });
  
        // change is-checked class on buttons
        $('.button-group-interior').each(function (i, buttonGroup) {
          $buttonGroup.on('click', 'a', function () {
            $buttonGroup.find('.is-checked-interior').removeClass('is-checked-interior');
            $(this).addClass('is-checked-interior');
          });
        });
      });
    });
	}

  var initTexts = function(){
    // Wrap every letter in a span
     $('.txt-fx').each(function(){
      this.innerHTML = this.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    });

    anime.timeline()
      .add({
        targets: '.txt-fx .letter',
        translateX: [0,-30],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 100,
        delay: (el, i) => 0
      });
  }
  var animateTexts = function(){

    anime.timeline()
      .add({
        targets: '.slick-current .txt-fx .letter',
        translateX: [40,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 2000,
        delay: (el, i) => 30 * i
      });
  }

  var hideTexts = function(){

    anime.timeline()
      .add({
        targets: '.slick-current .txt-fx .letter',
        translateX: [0,-30],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 2000,
        delay: (el, i) => 30 * i
      })
  }

  // initialize all the sliders
  var initSlider = function() {
    // homepage slider | slick slider
    $('.main-slider').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
    });

    $('.main-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      hideTexts();
      console.log('beforeChange');
    });

    $('.main-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
      animateTexts();
      console.log('afterChange');
    });
    
    initTexts();
    animateTexts();
  }

  // animate search box
  var searchButton = function() {
    // search box toggle
    $('#header-wrap').on('click', '.search-toggle', function(e) {
      var selector = $(this).data('selector');

      $(selector).toggleClass('show').find('.search-input').focus();
      $(this).toggleClass('active');

      e.preventDefault();
    });


    // close when click off of container
    $(document).on('click touchstart', function (e){
      if (!$(e.target).is('.search-toggle, .search-toggle *, #header-wrap, #header-wrap *')) {
        $('.search-toggle').removeClass('active');
        $('#header-wrap').removeClass('show');
      }
    });
  }

  // initialize tabs
  var jsTabs = function() {
    // portfolio tabs
    const tabs = document.querySelectorAll('[data-tab-target]')
    const tabContents = document.querySelectorAll('[data-tab-content]')

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
          tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
          tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
      })
    });
  }

  // stick header on the top
  var stickyHeader = function() {
    // header menu
    var StickyHeader = new hcSticky('#header.fixed', {
      stickTo: 'body',
      top: 0,
      bottomEnd: 200,
      responsive: {
        1024: {
          disable: true
        }
      }
    });
  }

  //Overlay Menu Navigation
  var overlayMenu = function () {

    if(!$('.nav-overlay').length) {
      return false;
    }

    var body = undefined;
    var menu = undefined;
    var menuItems = undefined;
    var menuItem = undefined;
    var init = function init() {
      body = document.querySelector('body');
      menu = document.querySelector('.menu-btn');
      menuItems = document.querySelectorAll('.nav__list-item');
      menuItem = document.querySelectorAll('.hover-target');
      applyListeners();
      menuListeners();
    };
    var applyListeners = function applyListeners() {
      menu.addEventListener('click', function () {
        return toggleClass(body, 'nav-active');
      });
    };
    var toggleClass = function toggleClass(element, stringClass) {
      if (element.classList.contains(stringClass)) element.classList.remove(stringClass);else element.classList.add(stringClass);
    };
    var menuListeners = function menuListeners() {
      menuItem.forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault(); // Mencegah perilaku default sementara
          
          // Navigasi ke ID yang ditentukan di atribut href
          var targetId = item.getAttribute('href'); // Ambil nilai href
          if (targetId.startsWith('#')) {
            var targetElement = document.querySelector(targetId); // Pilih elemen dengan ID target
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' }); // Gulir secara halus
            }
          }
          var checkbox = document.getElementById("menu-toggle");
          checkbox.checked = false;
          // Tetap jalankan toggleClass untuk body
          toggleClass(body, 'nav-active');
        });
      });
    };
    init();
  }

  // init Chocolat light box
  var initChocolat = function() {
    Chocolat(document.querySelectorAll('.image-link'), {
        imageSize: 'contain',
        loop: true,
    })
  }

  $(document).ready(function(){

    console.log('TESTTTT');
    stickyHeader();
    searchButton();
    initSlider();
		// initIsotope();
    jsTabs();
    initChocolat();
    overlayMenu();

    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });

  }); // End of document ready

  // preloader
	$(window).load(function () {
		$(".preloader").fadeOut("slow");
		initIsotope();
	});

})(jQuery);