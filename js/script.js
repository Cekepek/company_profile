(function ($) {

  "use strict";

  // init Isotope
  var initIsotope = function () {
    $(document).ready(function () {
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
        // });

      });
    });

  }
  // var initIsotope = function () {
  //   $(document).ready(function () {
  //     $('.grid').imagesLoaded(function () {
  //       var $buttonGroup = $('.button-group');
  //       var $checked = $buttonGroup.find('.is-checked');
  //       var filterValue = $checked.attr('data-filter');

  //       var $grid = $('.grid').isotope({
  //         itemSelector: '.portfolio-item',
  //         layoutMode: 'fitRows',
  //         filter: filterValue
  //       });

  //       $('.button-group').on('click', 'a', function (e) {
  //         e.preventDefault();
  //         filterValue = $(this).attr('data-filter');
  //         $grid.isotope({ filter: filterValue });
  //       });

  //       $('.button-group').each(function (i, buttonGroup) {
  //         $buttonGroup.on('click', 'a', function () {
  //           $buttonGroup.find('.is-checked').removeClass('is-checked');
  //           $(this).addClass('is-checked');
  //         });
  //       });
  //     });

  //     $('.grid-interior').imagesLoaded(function () {
  //       var $buttonGroup = $('.button-group-interior');
  //       var $checked = $buttonGroup.find('.is-checked-interior');
  //       var filterValue = $checked.attr('data-filter');

  //       var $grid = $('.grid-interior').isotope({
  //         itemSelector: '.portfolio-item-interior',
  //         layoutMode: 'fitRows',
  //         filter: filterValue
  //       });

  //       $('.button-group-interior').on('click', 'a', function (e) {
  //         e.preventDefault();
  //         filterValue = $(this).attr('data-filter');
  //         $grid.isotope({ filter: filterValue });
  //       });

  //       $('.button-group-interior').each(function (i, buttonGroup) {
  //         $buttonGroup.on('click', 'a', function () {
  //           $buttonGroup.find('.is-checked-interior').removeClass('is-checked-interior');
  //           $(this).addClass('is-checked-interior');
  //         });
  //       });
  //     });
  //   });
  // }

  var initTexts = function () {
    // Wrap every letter in a span
    $('.txt-fx').each(function () {
      this.innerHTML = this.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    });

    anime.timeline()
      .add({
        targets: '.txt-fx .letter',
        translateX: [0, -30],
        opacity: [1, 0],
        easing: "easeInExpo",
        duration: 100,
        delay: (el, i) => 0
      });
  }
  var animateTexts = function () {

    anime.timeline()
      .add({
        targets: '.slick-current .txt-fx .letter',
        translateX: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 2000,
        delay: (el, i) => 30 * i
      });
  }

  var hideTexts = function () {

    anime.timeline()
      .add({
        targets: '.slick-current .txt-fx .letter',
        translateX: [0, -30],
        opacity: [1, 0],
        easing: "easeInExpo",
        duration: 2000,
        delay: (el, i) => 30 * i
      })
  }

  // initialize all the sliders
  var initSlider = function () {
    // homepage slider | slick slider
    $('.main-slider').slick({
      autoplay: true,
      autoplaySpeed: 3000,
      fade: true,
      prevArrow: $('.prev'),
      nextArrow: $('.next'),
    });

    $('.main-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      hideTexts();
      console.log('beforeChange');
    });

    $('.main-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
      animateTexts();
      console.log('afterChange');
    });

    initTexts();
    animateTexts();
  }

  // animate search box
  var searchButton = function () {
    // search box toggle
    $('#header-wrap').on('click', '.search-toggle', function (e) {
      var selector = $(this).data('selector');

      $(selector).toggleClass('show').find('.search-input').focus();
      $(this).toggleClass('active');

      e.preventDefault();
    });


    // close when click off of container
    $(document).on('click touchstart', function (e) {
      if (!$(e.target).is('.search-toggle, .search-toggle *, #header-wrap, #header-wrap *')) {
        $('.search-toggle').removeClass('active');
        $('#header-wrap').removeClass('show');
      }
    });
  }
  $('#form-contact').on('submit', function (event) {
    event.preventDefault();

    var formData = new FormData();


    var formData = {
      fullname: $('#name').val(),
      email: $('#email').val(),
      message: $('#message').val()
    };
    // formData.append('id', 0);
    // var inputName = $('#name').val();
    // formData.append('fullname', inputName);

    // var inputEmail = $('#email').val();
    // formData.append('email', inputEmail);

    // var inputMessage = $('#message').val();
    // formData.append('message', inputMessage);


    var jsonData = JSON.stringify(formData);
    console.log(jsonData);
    $.ajax({
      url: 'https://biiio-studio.com:5868/contactUs', // Replace with your API URL
      type: 'POST',
      contentType: 'application/json',
      data: jsonData,
      contentType: false, // Tell jQuery not to set content type
      processData: false, // Don't process the data
      success: function (response) {
        console.log('File and text uploaded successfully:', response);
      },
      error: function (xhr, status, error) {
        console.error('Upload failed:', error);
      }
    });

  })
  // initialize tabs
  var jsTabs = function () {
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
  var stickyHeader = function () {
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

    if (!$('.nav-overlay').length) {
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
      if (element.classList.contains(stringClass)) element.classList.remove(stringClass); else element.classList.add(stringClass);
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
  function formatString(input) {
    return input
      .replace(/[^a-zA-Z0-9]/g, '') // Menghapus karakter selain huruf dan angka
      .toLowerCase(); // Mengubah ke huruf kecil
  }
  var ambilPortfolio = async function () {
    const apiUrl = 'https://biiio-studio.com:5868/proyek'; // Ganti dengan URL API kamu
    const containerArchitecture = document.getElementById('button-container-architecture');
    const containerInterior = document.getElementById('button-container-interior')
    var indexArchi = 0;
    var indexInterior = 0;
    try {
      // Ambil data dari API
      const response = await fetch(apiUrl);
      const jsonresponse = await response.json();

      if (jsonresponse.status === 200) {
        const data = jsonresponse.data;
        for (const item of data) {
          if (item.kategori == "Architecture") {
            indexArchi += 1;
          } else {
            indexInterior += 1;
          }
          // Buat elemen <a>
          const link = document.createElement('a');
          link.href = `#`; // Parameter href
          if (item.kategori == "Architecture" && indexArchi == 1) {
            link.className = 'btn btn-outline-dark rounded-pill text-uppercase is-checked';
          }
          else if (item.kategori == "Interior" && indexInterior == 1) {
            link.className = 'btn btn-outline-dark rounded-pill text-uppercase is-checked-interior';
          }
          else {
            link.className = 'btn btn-outline-dark rounded-pill text-uppercase';
          }
          link.setAttribute('data-filter', `.${formatString(item.nama)}`); // Data filter
          link.textContent = item.nama; // Text konten link

          if (item.kategori == "Architecture") {
            containerArchitecture.appendChild(link);
          }
          else {
            containerInterior.appendChild(link);
          }

          const apiUrlGambar = 'https://biiio-studio.com:5868/sinkronasi/' + item.id;

          const responseGambar = await fetch(apiUrlGambar);
          const jsonresponseGambar = await responseGambar.json();
          if (jsonresponse.status === 200) {
            const gambar = jsonresponseGambar.data
            for (const itemGambar of gambar) {
              const portfolioDiv = document.createElement('div');
              if (item.kategori == "Architecture") {
                portfolioDiv.classList.add('col', 'mb-4', 'portfolio-item', formatString(item.nama));
              }
              else {
                portfolioDiv.classList.add('col', 'mb-4', 'portfolio-item-interior', formatString(item.nama));
              }

              // Membuat elemen <a> dengan atribut href dan title
              const link = document.createElement('a');
              link.href = 'https://biiio-studio.com:5868/getPhoto?path=' + itemGambar.path;
              link.classList.add('image-link');
              link.title = item.nama;

              // Membuat elemen <img> dengan atribut src dan alt
              const img = document.createElement('img');
              // img.loading = "lazy";
              img.src = 'https://biiio-studio.com:5868/getPhoto?path=' + itemGambar.path;
              img.classList.add('img-fluid');
              img.alt = 'portfolio';

              // Menambahkan elemen <img> ke dalam <a>
              link.appendChild(img);

              // Menambahkan elemen <a> ke dalam <div>
              portfolioDiv.appendChild(link);

              // Menambahkan <div> ke dalam container yang sudah ada
              if (item.kategori == "Architecture") {
                const container = document.getElementById("portfolio-architecture");
                container.appendChild(portfolioDiv);
              }
              else {
                const container = document.getElementById("portfolio-interior");
                container.appendChild(portfolioDiv);
              }

            }
          }
        }
      }
      initIsotope();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }
  async function main() {
    await ambilPortfolio(); // Tunggu hingga semua gambar selesai dimuat Tampilkan konten

    stickyHeader();
    searchButton();
    initSlider();
    jsTabs();
    initChocolat();
    overlayMenu();
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });

    $(".preloader").fadeOut("slow");
  }

  $(document).ready(function () {

  }); // End of document ready

  // preloader
  $(window).on("load", async function () {
    $(".preloader").show(); // Pastikan preloader ditampilkan terlebih dahulu
    await main();
  });

})(jQuery);