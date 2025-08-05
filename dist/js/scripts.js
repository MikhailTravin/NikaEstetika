const modules_flsModules = {};

let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    setTimeout((() => {
      lockPaddingElements.forEach((lockPaddingElement => {
        lockPaddingElement.style.paddingRight = "";
      }));
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("lock");
    }), delay);
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    }));
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
function functions_FLS(message) {
  setTimeout((() => {
    if (window.FLS) console.log(message);
  }), 0);
}

let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout((() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout((() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

function getHash() {
  if (location.hash) { return location.hash.replace('#', ''); }
}

function dataMediaQueries(array, dataSetValue) {
  const media = Array.from(array).filter(function (item) {
    return item.dataset[dataSetValue];
  });

  if (media.length) {
    const breakpointsArray = media.map(item => {
      const params = item.dataset[dataSetValue];
      const paramsArray = params.split(",");
      return {
        value: paramsArray[0],
        type: paramsArray[1] ? paramsArray[1].trim() : "max",
        item: item
      };
    });

    const mdQueries = uniqArray(
      breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`)
    );

    const mdQueriesArray = mdQueries.map(breakpoint => {
      const [query, value, type] = breakpoint.split(",");
      const matchMedia = window.matchMedia(query);
      const itemsArray = breakpointsArray.filter(item => item.value === value && item.type === type);
      return { itemsArray, matchMedia };
    });

    return mdQueriesArray;
  }
}

function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

//========================================================================================================================================================

// Добавление к шапке при скролле
const header = document.querySelector('.header');

let ticking = false;
let lastScrollY = window.scrollY;

function updateHeader() {
  if (lastScrollY > 0) {
    header.classList.add('_header-scroll');
  } else {
    header.classList.remove('_header-scroll');
  }
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateHeader);
    ticking = true;
  }
}

function onScroll() {
  lastScrollY = window.scrollY;
  requestTick();
}

window.addEventListener('scroll', onScroll, { passive: true });

window.addEventListener('touchstart', () => {
  lastScrollY = window.scrollY;
  requestTick();
}, { passive: true });

window.addEventListener('touchmove', () => {
  lastScrollY = window.scrollY;
  requestTick();
}, { passive: true });

updateHeader();

//========================================================================================================================================================

// Меню
const iconMenu = document.querySelector('.icon-menu');
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    e.stopPropagation();
    document.documentElement.classList.toggle("menu-open");
    document.documentElement.classList.toggle("lock");

    if (document.documentElement.classList.contains("menu-open")) {
      document.documentElement.classList.remove("services-open");
    }
  });
}

//========================================================================================================================================================

// Услуги
const headerItem = document.querySelector('.header__item');
const dropdownContainer = document.querySelector('.header__services');

if (headerItem && dropdownContainer) {
  headerItem.addEventListener('click', function (e) {
    e.stopPropagation();
    document.documentElement.classList.toggle('services-open');

    if (document.documentElement.classList.contains("services-open")) {
      document.documentElement.classList.remove("menu-open", "lock");
    }
  });

  document.addEventListener('click', function (e) {
    if (!dropdownContainer.contains(e.target) && !headerItem.contains(e.target)) {
      document.documentElement.classList.remove('services-open');
    }
  });

  dropdownContainer.addEventListener('click', function (e) {
    e.stopPropagation();
  });
}

//========================================================================================================================================================

if (document.querySelector('.block-portfolio__slider')) {
  const swiperPortfolio = new Swiper('.block-portfolio__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 400,
    navigation: {
      prevEl: '.block-portfolio__arrow-prev',
      nextEl: '.block-portfolio__arrow-next',
    },
    breakpoints: {
      0: {
        slidesPerView: 1.1,
        spaceBetween: 12,
      },
      500: {
        slidesPerView: 1.5,
        spaceBetween: 12,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}

if (document.querySelector('.block-reviews__slider')) {
  const swiperReviews = new Swiper('.block-reviews__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 400,
    navigation: {
      prevEl: '.block-reviews__arrow-prev',
      nextEl: '.block-reviews__arrow-next',
    },
    breakpoints: {
      0: {
        slidesPerView: 1.1,
        spaceBetween: 12,
      },
      500: {
        slidesPerView: 1.5,
        spaceBetween: 12,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    on: {
      init: function () {
        updateSlideClasses(this);
      },
      slideChange: function () {
        updateSlideClasses(this);
      },
    }
  });

  function updateSlideClasses(swiper) {
    const slides = swiper.slides;
    const visibleSlides = swiper.params.slidesPerView;

    slides.forEach((slide, index) => {
      if (index >= swiper.activeIndex && index < swiper.activeIndex + visibleSlides) {
        slide.classList.remove('swiper-slide-inactive');
      } else {
        slide.classList.add('swiper-slide-inactive');
      }
    });
  }
}

//========================================================================================================================================================

Fancybox.bind("[data-fancybox]", {
  // опции
});

//========================================================================================================================================================

function indents() {
  const blockDescr = document.querySelector('.block-descr');
  const container = document.querySelector('.container');

  if (blockDescr) {
    let wblockDescr = window.getComputedStyle(blockDescr).width;
    wblockDescr = parseFloat(wblockDescr);

    let wcontainer = window.getComputedStyle(container).width;
    wcontainer = parseFloat(wcontainer);

    const blockDescrSum = (wblockDescr - wcontainer) / 2;

    const tabsBodies = document.querySelectorAll('.tabs__body');

    tabsBodies.forEach(tabsBody => {
      tabsBody.style.marginLeft = `-${blockDescrSum + 15}px`;
      tabsBody.style.width = `calc(100% + ${blockDescrSum * 2 + 30}px)`;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  indents();
});
window.addEventListener('resize', indents);
window.addEventListener('scroll', indents);

//========================================================================================================================================================

//Карта
const mapContainer = document.querySelector("#map");

function loadYandexMapScript() {
  const script = document.createElement('script');
  script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU';
  script.onload = () => {
    if (typeof ymaps !== 'undefined') {
      ymaps.ready(initMainMap);
    } else {
      console.warn('Yandex Maps API не загружено');
    }
  };
  script.onerror = () => console.error('Ошибка загрузки Yandex Maps API');
  document.body.appendChild(script);
}

function initMainMap() {
  try {
    const myMap = new ymaps.Map("map", {
      center: [55.812818, 37.755859],
      zoom: 18,
      controls: ["zoomControl"],
      behaviors: ["drag"]
    }, {
      searchControlProvider: "yandex#search"
    });

    const placemark1 = new ymaps.Placemark([55.812818, 37.755859], {}, {});
    myMap.geoObjects.add(placemark1);
  } catch (error) {
    console.error("Ошибка при инициализации карты #map:", error);
  }
}

if (mapContainer) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadYandexMapScript();
      observer.unobserve(mapContainer);
    }
  }, { threshold: 0.1 });

  observer.observe(mapContainer);
}

//========================================================================================================================================================

document.addEventListener('DOMContentLoaded', () => {
  const revealClasses = ['title1', 'title2'];
  const visibleClass = 'is-visible';
  const isMobile = window.innerWidth < 768;

  const style = document.createElement('style');
  style.textContent = revealClasses.map(cls => `
    .${cls} {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
      transition-delay: 0.12s;
      will-change: opacity, transform;
    }
    .${cls}.${visibleClass} {
      opacity: 1;
      transform: translateY(0);
    }
  `).join('\n');
  document.head.appendChild(style);

  const excludedSelectors = ['.no-reveal', '.disable-reveal'];

  function isExcluded(el) {
    return excludedSelectors.some(sel =>
      el.matches(sel) || el.closest(sel)
    );
  }

  const revealElements = revealClasses.flatMap(cls =>
    Array.from(document.querySelectorAll(`.${cls}`))
  );

  revealElements.forEach(el => {
    if (isMobile && isExcluded(el)) {
      revealClasses.forEach(cls => el.classList.remove(cls));
      // Сброс inline-стилей
      el.style.opacity = '';
      el.style.transform = '';
      el.style.transition = '';
      el.style.willChange = '';
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(visibleClass);
        } else {
          entry.target.classList.remove(visibleClass);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      if (!(isMobile && isExcluded(el))) {
        observer.observe(el);
      }
    });
  } else {
    console.warn('IntersectionObserver не поддерживается в этом браузере.');
  }
});


//========================================================================================================================================================

// Добавляем класс 'loaded' после полной загрузки страницы
window.addEventListener('load', function () {
  setTimeout(function () {
    document.documentElement.classList.add('loaded');
  }, 900);
});