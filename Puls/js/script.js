// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1200,
//         // adaptiveHeight: true,
//         arrows: true,
//         prevArrow:'<button type="button" class="slick-prev"><img src="img/carousel/chevron-left.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="img/carousel/chevron-right.png"></button>'
       
//       });
//   });

$(document).ready(function(){
  const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 1,
    controls: false,
    nav: false
  });

  document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  });

  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });  

  function toggleClass (item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
      })
    });  
  };

  toggleClass('.catalog-item__back');
  toggleClass('.catalog-item__link');

      //Modal

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn(600);
  });

  $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #order, #thanks').fadeOut(600);
  });
  
  $('.buttons_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn(600);
    });
  });

function validateForm (form) {
  $(form).validate( {
    rules: {
      name: {
        required: true,
        minlength: 2
        // maxlength: 10
      },
      phone: 'required',
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name:  {
        required: "Пожалуйста, введите свое имя",
        minlength: jQuery.validator.format("Необходимо ввести хотя бы {0} символа!")
      },
  
      phone: "Пожалуйста, введите номер телефона",
      email: {
        required: "Почтовый адресс нужен для связи с Вами",
        email: "Неправильный формат адресса почты"
      }
    }
  });
};

validateForm ('#consultation form');
validateForm ('#consultation-form');
validateForm ('#order form');

$('Input[name=phone]').inputmask('+380 (99) 999-99-99');

$('form').submit(function(e) {
  e.preventDefault();
  $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
  }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
  });
  return false;
});

$(window).scroll(function() {
  if ($(this).scrollTop() > 1500) {
    $(".go_up").fadeIn()
  } else {
    $(".go_up").fadeOut()
    }
});

$("a[href^='#']").click(function(){
  const _href = $(this).attr("href");
  $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
  return false;
});


new WOW().init();


});

// const slider = tns({
//     container: '.carousel__inner',
//     items: 1,
//     slideBy: 1,
//     controls: false,
//     nav: false
//   });

//   document.querySelector('.prev').addEventListener('click', function () {
//     slider.goTo('prev');
//   });

//   document.querySelector('.next').addEventListener('click', function () {
//     slider.goTo('next');
//   });

  