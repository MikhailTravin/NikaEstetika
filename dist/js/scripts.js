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

//========================================================================================================================================================
function spollers() {
  const spollersArray = document.querySelectorAll("[data-spollers]");
  if (spollersArray.length > 0) {
    const spollersRegular = Array.from(spollersArray).filter((function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    }));
    if (spollersRegular.length) initSpollers(spollersRegular);

    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach((spollersBlock => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add("_spoller-init");
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);
        } else {
          spollersBlock.classList.remove("_spoller-init");
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction);
        }
      }));
    }

    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
      if (spollerTitles.length) {
        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
        spollerTitles.forEach((spollerTitle => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute("tabindex");
            if (!spollerTitle.classList.contains("_spoller-active")) {
              spollerTitle.nextElementSibling.hidden = true;
            } else {
              // Инициализируем showmore при открытом спойлере
              setTimeout(() => initShowMoreInSpoller(spollerTitle.nextElementSibling), 10);
            }
          } else {
            spollerTitle.setAttribute("tabindex", "-1");
            spollerTitle.nextElementSibling.hidden = false;
          }
        }));
      }
    }

    function initShowMoreInSpoller(spollerBody) {
      const showMoreBlocks = spollerBody.querySelectorAll('[data-showmore]');

      showMoreBlocks.forEach(showMoreBlock => {
        const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
        const showMoreButton = showMoreBlock.querySelector('[data-showmore-button]');
        const items = showMoreContent.children;
        const limit = 6; // Показываем 6 элементов

        if (items.length > limit) {
          // 1. Сначала сбросим ограничения, чтобы измерить реальные размеры
          showMoreContent.style.maxHeight = '';
          showMoreContent.style.overflow = '';

          // 2. Ждем следующего фрейма для применения стилей
          setTimeout(() => {
            // 3. Рассчитываем высоту для 6 элементов
            let height = 0;
            const itemHeight = [];

            // Измеряем высоту каждого из первых 6 элементов
            for (let i = 0; i < limit; i++) {
              const item = items[i];
              const styles = getComputedStyle(item);
              const marginTop = parseFloat(styles.marginTop) || 0;
              const marginBottom = parseFloat(styles.marginBottom) || 0;
              itemHeight.push(item.offsetHeight + marginTop + marginBottom);
            }

            // Учитываем промежутки (gap) между элементами
            const gap = parseFloat(getComputedStyle(showMoreContent).gap) || 0;
            height = itemHeight.reduce((sum, h) => sum + h, 0) + (gap * (limit - 1));

            // 4. Применяем рассчитанную высоту
            showMoreContent.style.maxHeight = `${height}px`;
            showMoreContent.style.overflow = 'hidden';
            showMoreButton.hidden = false;

            // 5. Настройка кнопки "Показать еще"
            showMoreButton.addEventListener('click', function (e) {
              e.preventDefault();
              const isExpanded = showMoreContent.style.maxHeight !== `${height}px`;

              if (!isExpanded) {
                showMoreContent.style.maxHeight = `${showMoreContent.scrollHeight}px`;
                showMoreButton.querySelector('span:first-child').hidden = true;
                showMoreButton.querySelector('span:last-child').hidden = false;
              } else {
                showMoreContent.style.maxHeight = `${height}px`;
                showMoreButton.querySelector('span:first-child').hidden = false;
                showMoreButton.querySelector('span:last-child').hidden = true;
              }
            });
          }, 50); // Небольшая задержка для гарантии применения стилей
        } else {
          showMoreButton.hidden = true;
        }
      });
    }

    function setSpollerAction(e) {
      const el = e.target;
      if (el.closest("[data-spoller]")) {
        const spollerTitle = el.closest("[data-spoller]");
        const spollerItem = spollerTitle.closest(".spollers__item");
        const spollersBlock = spollerTitle.closest("[data-spollers]");
        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

        if (!spollersBlock.querySelectorAll("._slide").length) {
          if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) {
            hideSpollersBody(spollersBlock);
          }

          spollerTitle.classList.toggle("_spoller-active");
          if (spollerItem) spollerItem.classList.toggle("_spoller-active");

          const contentBlock = spollerTitle.nextElementSibling;
          _slideToggle(contentBlock, spollerSpeed, () => {
            // Инициализируем showonly при открытии спойлера
            if (spollerTitle.classList.contains("_spoller-active")) {
              setTimeout(() => initShowMoreInSpoller(contentBlock), 10);
            }
          });

          e.preventDefault();
        }
      }
    }

    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
      if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
        spollerActiveTitle.classList.remove("_spoller-active");
        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
      }
    }

    const spollersClose = document.querySelectorAll("[data-spoller-close]");
    if (spollersClose.length) {
      document.addEventListener("click", (function (e) {
        const el = e.target;
        if (!el.closest("[data-spollers]")) {
          spollersClose.forEach((spollerClose => {
            const spollersBlock = spollerClose.closest("[data-spollers]");
            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
            spollerClose.classList.remove("_spoller-active");
            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
          }));
        }
      }));
    }
  }
}
spollers();

function tabs() {
  const tabs = document.querySelectorAll('[data-tabs]');
  let tabsActiveHash = [];

  if (tabs.length > 0) {
    const hash = getHash();
    if (hash && hash.startsWith('tab-')) {
      tabsActiveHash = hash.replace('tab-', '').split('-');
    }
    tabs.forEach((tabsBlock, index) => {
      tabsBlock.classList.add('_tab-init');
      tabsBlock.setAttribute('data-tabs-index', index);
      tabsBlock.addEventListener("click", setTabsAction);
      initTabs(tabsBlock);
    });

    // Получение спойлеров с медиа-запросами
    let mdQueriesArray = dataMediaQueries(tabs, "tabs");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach(mdQueriesItem => {
        // Событие
        mdQueriesItem.matchMedia.addEventListener("change", function () {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }

  // Установка позиций заголовков
  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach(tabsMediaItem => {
      tabsMediaItem = tabsMediaItem.item;
      let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
      let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
      let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
      let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
      tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
      tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
      tabsContentItems.forEach((tabsContentItem, index) => {
        if (matchMedia.matches) {
          tabsContent.append(tabsTitleItems[index]);
          tabsContent.append(tabsContentItem);
          tabsMediaItem.classList.add('_tab-spoller');
        } else {
          tabsTitles.append(tabsTitleItems[index]);
          tabsMediaItem.classList.remove('_tab-spoller');
        }
      });
    });
  }

  // Инициализация табов
  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
      tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
    }
    if (tabsContent.length) {
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute('data-tabs-title', '');
        tabsContentItem.setAttribute('data-tabs-item', '');

        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add('_tab-active');
        }
        tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
      });
    }
    setTabsStatus(tabsBlock);
  }

  // Установка статуса (открыт/закрыт) и анимации
  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;

    function isTabsAnimate(tabsBlock) {
      if (tabsBlock.hasAttribute('data-tabs-animate')) {
        return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
      }
      return false;
    }
    const tabsBlockAnimate = isTabsAnimate(tabsBlock);

    if (tabsContent.length > 0) {
      const isHash = tabsBlock.hasAttribute('data-tabs-hash');
      tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains('_tab-active')) {
          if (tabsBlockAnimate) {
            _slideDown(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = false;
          }
          if (isHash && !tabsContentItem.closest('.popup')) {
            setHash(`tab-${tabsBlockIndex}-${index}`);
          }
        } else {
          if (tabsBlockAnimate) {
            _slideUp(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }

  // Обработка кликов
  function setTabsAction(e) {
    const el = e.target;
    if (el.closest('[data-tabs-title]')) {
      const tabTitle = el.closest('[data-tabs-title]');
      const tabsBlock = tabTitle.closest('[data-tabs]');
      if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
        let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
        tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock);
        if (tabActiveTitle.length) tabActiveTitle[0].classList.remove('_tab-active');
        tabTitle.classList.add('_tab-active');
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}
tabs();

function formFieldsInit(options = { viewPass: false, autoHeight: false }) {
  document.body.addEventListener("focusin", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.add('_form-focus');
        targetElement.parentElement.classList.add('_form-focus');
      }
      formValidate.removeError(targetElement);
      if (targetElement.hasAttribute('data-validate')) {
        formValidate.removeError(targetElement);
      }
    }
  });
  document.body.addEventListener("focusout", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.remove('_form-focus');
        targetElement.parentElement.classList.remove('_form-focus');
      }
      if (targetElement.hasAttribute('data-validate')) {
        formValidate.validateInput(targetElement);
      }
    }
  });
  if (options.viewPass) {
    document.addEventListener("click", function (e) {
      const targetElement = e.target;
      if (targetElement.closest('[class*="__viewpass"]')) {
        const input = targetElement.parentElement.querySelector('input');
        const inputType = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', inputType);
        targetElement.classList.toggle('_viewpass-active');
      }
    });
  }
  if (options.autoHeight) {
    const textareas = document.querySelectorAll('textarea[data-autoheight]');
    if (textareas.length) {
      textareas.forEach(textarea => {
        const startHeight = textarea.hasAttribute('data-autoheight-min')
          ? Number(textarea.dataset.autoheightMin)
          : textarea.offsetHeight;
        const maxHeight = textarea.hasAttribute('data-autoheight-max')
          ? Number(textarea.dataset.autoheightMax)
          : Infinity;
        setHeight(textarea, Math.min(startHeight, maxHeight));
        textarea.addEventListener('input', () => {
          if (textarea.scrollHeight > startHeight) {
            textarea.style.height = 'auto';
            setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
          }
        });
      });
      function setHeight(textarea, height) {
        textarea.style.height = `${height}px`;
      }
    }
  }
}
formFieldsInit({
  viewPass: true,
  autoHeight: false
});
let formValidate = {
  getErrors(form) {
    let error = 0;
    const formRequiredItems = form.querySelectorAll('*[data-required]');
    if (formRequiredItems.length) {
      formRequiredItems.forEach(formRequiredItem => {
        if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
          error += this.validateInput(formRequiredItem);
        }
      });
    }
    return error;
  },
  validateInput(formRequiredItem) {
    let error = 0;
    if (formRequiredItem.dataset.required === "email") {
      formRequiredItem.value = formRequiredItem.value.replace(/\s/g, "");
      if (this.emailTest(formRequiredItem)) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
      this.addError(formRequiredItem);
      this.removeSuccess(formRequiredItem);
      error++;
    } else {
      if (!formRequiredItem.value.trim()) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    }
    return error;
  },
  addError(formRequiredItem) {
    formRequiredItem.classList.add('_form-error');
    formRequiredItem.parentElement.classList.add('_form-error');
    const inputError = formRequiredItem.parentElement.querySelector('.form__error');
    if (inputError) formRequiredItem.parentElement.removeChild(inputError);
    if (formRequiredItem.dataset.error) {
      formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
    }
  },
  removeError(formRequiredItem) {
    formRequiredItem.classList.remove('_form-error');
    formRequiredItem.parentElement.classList.remove('_form-error');
    const inputError = formRequiredItem.parentElement.querySelector('.form__error');
    if (inputError) {
      formRequiredItem.parentElement.removeChild(inputError);
    }
  },
  addSuccess(formRequiredItem) {
    formRequiredItem.classList.add('_form-success');
    formRequiredItem.parentElement.classList.add('_form-success');
  },
  removeSuccess(formRequiredItem) {
    formRequiredItem.classList.remove('_form-success');
    formRequiredItem.parentElement.classList.remove('_form-success');
  },
  formClean(form) {
    form.reset();
    setTimeout(() => {
      const inputs = form.querySelectorAll('input,textarea');
      inputs.forEach(el => {
        el.parentElement.classList.remove('_form-focus');
        el.classList.remove('_form-focus');
        formValidate.removeError(el);
      });
      const checkboxes = form.querySelectorAll('.checkbox__input');
      checkboxes.forEach(checkbox => {
        checkbox.checked = false;
      });
      if (flsModules.select) {
        const selects = form.querySelectorAll('div.select');
        selects.forEach(selectBlock => {
          const select = selectBlock.querySelector('select');
          flsModules.select.selectBuild(select);
        });
      }
    }, 0);
  },
  emailTest(formRequiredItem) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
  }
};
function formSubmit() {
  const forms = document.forms;
  if (forms.length) {
    for (const form of forms) {
      form.addEventListener('submit', e => formSubmitAction(form, e));
      form.addEventListener('reset', e => formValidate.formClean(form));
    }
  }

  async function formSubmitAction(form, e) {
    const error = form.hasAttribute('data-no-validate') ? 0 : formValidate.getErrors(form);
    if (error === 0) {
      const ajax = form.hasAttribute('data-ajax');
      if (ajax) {
        e.preventDefault();
        const action = form.getAttribute('action')?.trim() || '#';
        const method = form.getAttribute('method')?.trim() || 'GET';
        const formData = new FormData(form);
        form.classList.add('_sending');
        try {
          const response = await fetch(action, { method, body: formData });
          if (response.ok) {
            const result = await response.json();
            form.classList.remove('_sending');
            formSent(form, result);
          } else {
            alert('Ошибка');
            form.classList.remove('_sending');
          }
        } catch {
          alert('Ошибка подключения');
          form.classList.remove('_sending');
        }
      } else if (form.hasAttribute('data-dev')) {
        e.preventDefault();
        formSent(form);
      }
    } else {
      e.preventDefault();
      if (form.querySelector('._form-error') && form.hasAttribute('data-goto-error')) {
        const gotoErrorClass = form.dataset.gotoError || '._form-error';
        gotoBlock(gotoErrorClass, true, 1000);
      }
    }
  }

  function formSent(form, responseResult = '') {
    document.dispatchEvent(new CustomEvent("formSent", { detail: { form } }));
    setTimeout(() => {
      if (flsModules.popup && form.dataset.popupMessage) {
        flsModules.popup.open(form.dataset.popupMessage);
      }
    }, 0);
    formValidate.formClean(form);
    console.log('[Формы]: Форма отправлена!');
  }
}
formSubmit()