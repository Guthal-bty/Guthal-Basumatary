const scrollIntervals = {};
const scrollAmounts = {};
const scrollTimers = {};
const scrollConfig = {};

function autoScrollSlider(id, interval = 2000) {
  const slider = document.getElementById(id);
  if (!slider) return;

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  let touchStartX = 0;

  scrollAmounts[id] = 0;

  // ✅ Function to get image width dynamically
  function getImageWidth() {
    const firstImage = slider.querySelector("img");
    if (!firstImage) return 160;
    const style = getComputedStyle(firstImage);
    return firstImage.clientWidth + parseInt(style.marginRight || 0);
  }

  // ✅ Scroll content
  function scrollContent() {
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const imageWidth = getImageWidth();

    if (scrollAmounts[id] >= maxScroll) {
      scrollAmounts[id] = 0;
    } else {
      scrollAmounts[id] += imageWidth;
    }

    slider.scrollTo({
      left: scrollAmounts[id],
      behavior: "smooth"
    });
  }

  // ✅ Scroll control
  scrollConfig[id] = {
    startScroll: function () {
      if (!scrollIntervals[id]) {
        scrollIntervals[id] = setInterval(scrollContent, interval);
      }
    },
    stopScroll: function () {
      clearInterval(scrollIntervals[id]);
      scrollIntervals[id] = null;
    }
  };

  scrollConfig[id].startScroll();

  // ✅ Mouse drag
  slider.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    scrollConfig[id].stopScroll();
    isDragging = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      scrollAmounts[id] = slider.scrollLeft;
      scrollConfig[id].startScroll();
    }
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });

  // ✅ Touch drag
  slider.addEventListener("touchstart", (e) => {
    scrollConfig[id].stopScroll();
    isDragging = true;
    touchStartX = e.touches[0].clientX;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("touchend", () => {
    if (isDragging) {
      isDragging = false;
      scrollAmounts[id] = slider.scrollLeft;
      scrollConfig[id].startScroll();
    }
  });

  slider.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const walk = (touchStartX - x) * 2;
    slider.scrollLeft = scrollLeft + walk;
  });
}

// ✅ Scroll via arrow buttons with dynamic image width
function scrollSlider(btn, direction) {
  const wrapper = btn.closest(".slideshow-wrapper");
  const slider = wrapper.querySelector(".slideshow");
  const id = slider.id;
  const maxScroll = slider.scrollWidth - slider.clientWidth;
  const imageWidth = (() => {
    const img = slider.querySelector("img");
    if (!img) return 160;
    const style = getComputedStyle(img);
    return img.clientWidth + parseInt(style.marginRight || 0);
  })();

  if (scrollConfig[id]) scrollConfig[id].stopScroll();

  if (direction === "left") {
    slider.scrollBy({ left: -imageWidth, behavior: "smooth" });
    scrollAmounts[id] = Math.max(0, slider.scrollLeft - imageWidth);
  } else {
    slider.scrollBy({ left: imageWidth, behavior: "smooth" });
    scrollAmounts[id] = Math.min(maxScroll, slider.scrollLeft + imageWidth);
  }

  clearTimeout(scrollTimers[id]);
  scrollTimers[id] = setTimeout(() => {
    if (scrollConfig[id]) scrollConfig[id].startScroll();
  }, 3000);
}

// ✅ Initialize sliders
autoScrollSlider("slider1", 2000);
autoScrollSlider("slider2", 2500);
autoScrollSlider("slider3", 3000);
autoScrollSlider("slider4", 2500);
autoScrollSlider("slider5", 2000);
function scrollSlider(btn, direction, event) {
  if (event) {
    event.stopPropagation(); // Prevent click bubbling to .project-card
    event.preventDefault();  // Prevent any default behavior
  }

  const wrapper = btn.closest(".slideshow-wrapper");
  const slider = wrapper.querySelector(".slideshow");
  const id = slider.id;
  const maxScroll = slider.scrollWidth - slider.clientWidth;

  const img = slider.querySelector("img");
  const style = img ? getComputedStyle(img) : null;
  const imageWidth = img ? img.clientWidth + parseInt(style.marginRight || 0) : 160;

  if (scrollConfig[id]) scrollConfig[id].stopScroll();

  if (direction === "left") {
    slider.scrollBy({ left: -imageWidth, behavior: "smooth" });
    scrollAmounts[id] = Math.max(0, slider.scrollLeft - imageWidth);
  } else {
    slider.scrollBy({ left: imageWidth, behavior: "smooth" });
    scrollAmounts[id] = Math.min(maxScroll, slider.scrollLeft + imageWidth);
  }

  clearTimeout(scrollTimers[id]);
  scrollTimers[id] = setTimeout(() => {
    if (scrollConfig[id]) scrollConfig[id].startScroll();
  }, 3000);
}
