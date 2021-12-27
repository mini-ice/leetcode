const lazyload = (function (container) {
  const imgList = Array.from(document.getElementsByTagName('img'));
  return function () {
    const isLoadedKeys = [];
    const bodyHeight = document.documentElement.clientHeight;

    imgList.forEach((item, i) => {
      const { top } = item.getBoundingClientRect();
      if (top < bodyHeight) {
        isLoadedKeys.push(i);
        item.src = item.dataset.src;
      }

      imgList = imgList.filter((_, i) => !isLoadedKeys.includes(i));

      if (imgList.length === 0) container.removeEventListener('scroll', lazyload);
    });
  };
})(document);

document.addEventListener('scroll', lazyload);

/**
 * Intersection
 */

function observer(container) {
  let intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((item) => {
        if (item.target.tagName === 'IMG' && !item.target.src && item.isIntersecting) {
          item.target.src = item.target.dataset.src;
          intersectionObserver.unobserve(item.target);
        }
      });
    },
    { rootMargin: '0px 0px 50px 0px', root: container }
  );

  const imgList = Array.from(container.getElementsByTagName('img'));
  imgList.forEach((item) => intersectionObserver.observe(item));
}

observer(document);

function observer(container) {
  let intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((item) => {
        if (item.target.tagName === 'IMG' && !item.target.src && item.isIntersecting) {
          item.target.src = item.target.dataset.src;
          intersectionObserver.unobserve(item.target);
        }
      });
    },
    { root: container }
  );

  const imgList = Array.from(container.getElementsByTagName('img'));
  imgList.forEach((item) => intersectionObserver.observe(item));
}

function lazyLoad(container) {
  const imgList = container.querySelectorAll('img [loading=lazy]');
  const clientHeight = container.clientHeight;

  function lazyload() {
    const currentImgList = imgList.slice();
    const pendingDeleteIdx = [];
    currentImgList.forEach((img, index) => {
      const { top } = img.getBoundingClientRect();

      if (top < clientHeight) {
        pendingDeleteIdx.push(index);
        img.src = img.dataset.src;
      }
    });

    pendingDeleteIdx.forEach((idx) => {
      imgList.splice(idx, 1);
    });

    if (imgList.length === 0) {
      container.removeEventListener('scroll', lazyload);
      imgList = null;
    }
  }
  return lazyload;
}

document.addEventListener('scroll', lazyload(document));
