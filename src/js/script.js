$(document).ready(function () {
    // Scroll div
    let div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    // Menu 

    const hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu'),
        closeElem = document.querySelector('.menu__close'),
        modalWindowThanks = document.querySelector('.modal__window'),
        modalWindowSwipe = document.querySelector('.modal__window-swipe'),
        link = document.querySelectorAll('.menu__link a'),
        block = document.querySelector('.menu__block'),
        panel = document.querySelector('.sidepanel'),
        promoBlock = document.querySelector('.promo');

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
        document.body.style.overflow = 'hidden';
        promoBlock.style.cssText = `
            margin-right: ${scrollWidth + 'px'};
        `;
    });

    menu.addEventListener('click', (e) => {
        if (e.target !== block && menu.classList.contains('active') || closeElem === true) {
            menu.classList.remove('active');
            document.body.style.overflow = '';
            promoBlock.style.cssText = `
                margin-right: 0;
            `;
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && menu.classList.contains('active')) { 
            menu.classList.remove('active');
            document.body.style.overflow = '';
            promoBlock.style.cssText = `
                margin-right: 0;
            `;
        }
    });

    link.forEach((event) => {
        event.addEventListener('click', () => {
            menu.classList.remove('active');
            document.body.style.overflow = '';
            promoBlock.style.cssText = `
                margin-right: 0;
            `;
        });
    });

    
    // Scroll Up

    panel.style.display = 'none';

    $(window).scroll(function () {
        if ($(this).scrollTop() > 750) {
            $('.pageup').fadeIn();
        } else if ($(this).scrollTop() < 750){
            $('.pageup').fadeOut();
        }
    });

    $("a[href^=#up]").click(function () {
        const _href = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(_href).offset().top + "px"
        });
        return false;
    });

    function scrollShowSocial() {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 650 && $(this).scrollTop() < 3810 ) {
                $('.sidepanel').fadeIn(1000);
            } else {
                $('.sidepanel').fadeOut(1000);
            }
        });
    }

    function scrollHideSocial() {
        panel.style.display = 'none';
    }

    if (window.innerWidth >= 1200 ){
        scrollShowSocial();
    } else {
        scrollHideSocial();
    }

    // Modal window success

    function showModalThanks() {
        let timerId;

        modalWindowThanks.style.display = 'flex';
        modalWindowThanks.classList.add("animate__animated", "animate__slow", "animate__fadeInRight");

        timerId = window.setTimeout(closeModal, 4000);

    }

    function closeModal() {
        if (modalWindowThanks.classList.contains("animate__fadeInRight")) {
            modalWindowThanks.classList.remove('animate__fadeInRight');
            modalWindowThanks.classList.add('animate__fadeOutRight');
        }

        setTimeout(() => modalWindowThanks.style.display = 'none', 2000);
        setTimeout(() => modalWindowThanks.classList.remove("animate__animated", "animate__slow", "animate__fadeOutRight"), 2000); // jshint ignore:line
    }


    // Slider Carousel

    $('.rev_slider').slick({
        infinity: true,
        speed: 3000,
    });

    // Animations

    const wow = new WOW({  // jshint ignore:line
        boxClass: 'wow', // default
        animateClass: 'animate__animated', // default
        offset: 0, // default
        mobile: true, // default
        live: true // default
    });
    
    wow.init();

    // Submit Form

    $("#form").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			showModalThanks();
			$("#form").trigger("reset");
		}).fail(function() {
            alert('Что-то пошло не так!');
        }); 
		return false;
	});
});