(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  if (form && note) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      note.textContent = "Sending...";

      try {
        const formData = new FormData(form);

        const res = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (res.ok) {
          note.textContent = "Thanks, we got your message.";
          form.reset();
          return;
        }

        const data = await res.json().catch(() => null);
        if (data && data.errors && data.errors.length) {
          note.textContent = data.errors.map((x) => x.message).join(" ");
        } else {
          note.textContent = "Something went wrong. Please try again.";
        }
      } catch (err) {
        note.textContent = "Network error. Please try again.";
      }
    });
  }
})();
