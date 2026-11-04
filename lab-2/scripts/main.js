function greetingPhrase() {
  var hour = new Date().getHours();
  var hello = "Добрый вечер";

  if (hour < 12) {
    hello = "Доброе утро";
  } else if (hour < 18) {
    hello = "Добрый день";
  }

  return hello + ". Добро пожаловать на портфолио Eloah Elie Monga Wandala.";
}

function showGreeting() {
  var dialog = document.getElementById("greeting-dialog");
  var phrase = document.getElementById("greeting-phrase");

  if (phrase) {
    phrase.textContent = greetingPhrase();
  }

  if (dialog && typeof dialog.showModal === "function" && !dialog.open) {
    dialog.showModal();
  }

  return false;
}

function scaleImageMaps() {
  var images = document.querySelectorAll("img[usemap]");

  images.forEach(function (img) {
    var mapName = (img.getAttribute("usemap") || "").replace("#", "");
    var map = document.querySelector('map[name="' + mapName + '"]');
    if (!map) {
      return;
    }

    var areas = map.querySelectorAll("area");
    areas.forEach(function (area) {
      if (!area.dataset.coords) {
        area.dataset.coords = area.getAttribute("coords") || "";
      }
    });

    var naturalWidth = img.naturalWidth || Number(img.getAttribute("width")) || 1;
    var naturalHeight = img.naturalHeight || Number(img.getAttribute("height")) || 1;
    var scaleX = img.clientWidth / naturalWidth;
    var scaleY = img.clientHeight / naturalHeight;

    areas.forEach(function (area) {
      var scaled = area.dataset.coords.split(",").map(function (value, index) {
        var number = Number(value);
        return Math.round(number * (index % 2 === 0 ? scaleX : scaleY));
      });
      area.setAttribute("coords", scaled.join(","));
    });
  });
}

function initImageMaps() {
  var images = document.querySelectorAll("img[usemap]");
  if (!images.length) {
    return;
  }

  images.forEach(function (img) {
    if (img.complete) {
      scaleImageMaps();
    } else {
      img.addEventListener("load", scaleImageMaps);
    }
  });

  window.addEventListener("resize", scaleImageMaps);
}

document.addEventListener("DOMContentLoaded", function () {
  initImageMaps();
});
