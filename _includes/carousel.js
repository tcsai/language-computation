// Rotates the photos at the top of the home page, listed in _data/photos.yml.
// Starts from a random photo and fades to the next one every data-interval
// seconds. Visitors can jump to a photo with the dots or pause the rotation.
// Inlined into the page by photo-carousel.html.
(function () {
  var carousel = document.querySelector(".carousel");
  if (!carousel) return;

  var photos = carousel.querySelectorAll(".carousel-photos img");
  var captions = carousel.querySelectorAll(".carousel-captions > span");
  if (photos.length < 2) return;

  var interval = Number(carousel.dataset.interval || 30) * 1000;
  var current = 0;
  var wanted = 0;
  var timer = null;
  var paused = false;

  var ICONS = {
    pause: '<path d="M7 4v12M13 4v12"/>',
    play: '<path d="M6 4l10 6-10 6z"/>'
  };

  // Hidden photos are lazy-loaded; this starts loading one in advance.
  function preload(index) {
    photos[index % photos.length].loading = "eager";
  }

  function mark(index, on) {
    photos[index].classList.toggle("is-active", on);
    captions[index].classList.toggle("is-active", on);
    dots[index].setAttribute("aria-current", on ? "true" : "false");
  }

  function show(index) {
    wanted = index;
    var photo = photos[index];
    photo.loading = "eager";
    // Fade in only once the photo has loaded, rather than while it loads.
    Promise.resolve(photo.decode && photo.decode()).catch(function () {}).then(function () {
      if (wanted !== index || index === current) return;
      Array.prototype.forEach.call(photos, function (p) { p.classList.remove("is-leaving", "is-entering"); });
      Array.prototype.forEach.call(captions, function (c) { c.classList.remove("is-entering"); });
      photos[current].classList.add("is-leaving");
      mark(current, false);
      mark(index, true);
      photo.classList.add("is-entering");
      captions[index].classList.add("is-entering");
      current = index;
      preload(index + 1);
    });
  }

  function restart() {
    clearInterval(timer);
    if (!paused) timer = setInterval(function () { show((wanted + 1) % photos.length); }, interval);
  }

  // The previous photo stays underneath until the new one has faded in.
  carousel.addEventListener("animationend", function (event) {
    if (event.target !== photos[current]) return;
    Array.prototype.forEach.call(photos, function (p) { p.classList.remove("is-leaving"); });
  });

  var controls = document.createElement("div");
  controls.className = "carousel-controls";
  var dots = Array.prototype.map.call(photos, function (photo, i) {
    var dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", "Show photo " + (i + 1) + " of " + photos.length);
    dot.addEventListener("click", function () { show(i); restart(); });
    controls.appendChild(dot);
    return dot;
  });

  var toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "carousel-toggle";
  function drawToggle() {
    toggle.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow");
    toggle.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true">' + (paused ? ICONS.play : ICONS.pause) + "</svg>";
  }
  toggle.addEventListener("click", function () {
    paused = !paused;
    drawToggle();
    restart();
  });
  drawToggle();
  controls.appendChild(toggle);
  carousel.querySelector(".carousel-photos").appendChild(controls);

  // Swap in the random starting photo straight away, without a fade.
  mark(0, false);
  current = wanted = Math.floor(Math.random() * photos.length);
  photos[current].loading = "eager";
  mark(current, true);
  preload(current + 1);
  restart();
})();
