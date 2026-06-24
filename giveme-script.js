(function () {
  var wrap = document.querySelector(".gg_wrap");
  if (!wrap) return;

  var panels = wrap.querySelectorAll(".gg_panel");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("gg_show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    panels.forEach(function (panel) { observer.observe(panel); });
  } else {
    panels.forEach(function (panel) { panel.classList.add("gg_show"); });
  }

  function copyCode(button) {
    var code = button.getAttribute("data-code");
    var original = button.textContent;

    function done() {
      button.textContent = "복사 완료";
      setTimeout(function () { button.textContent = original; }, 1300);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(done);
      return;
    }

    var input = document.createElement("input");
    input.value = code;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    done();
  }

  wrap.querySelectorAll(".gg_copy").forEach(function (button) {
    button.addEventListener("click", function () { copyCode(button); });
  });

  wrap.querySelectorAll(".gg_tilt").forEach(function (card) {
    card.addEventListener("mousemove", function (event) {
      if (window.innerWidth < 768) return;
      var rect = card.getBoundingClientRect();
      var x = ((event.clientX - rect.left) / rect.width - .5) * 8;
      var y = ((event.clientY - rect.top) / rect.height - .5) * -8;
      card.style.transform = "perspective(900px) rotateX(" + y + "deg) rotateY(" + x + "deg) translateY(-2px)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });
})();
