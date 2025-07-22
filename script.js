document.addEventListener("DOMContentLoaded", () => {
  const allBtn = document.querySelector(".all-btn");
  const activeBtn = document.querySelector(".active-btn");
  const inActiveBtn = document.querySelector(".inactive-btn");
  const theme = document.querySelector(".theme");
  const container = document.querySelector(".container");
  const logo = document.querySelector(".logo");

  const extensionGrid = document.querySelector(".extension-grid");
  const template = document.getElementById("extension-template");

  let allExtensions = [];
  let currentFilter = "all"; // track current filter

  // Fetch data from JSON
  fetch("data.json")
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      allExtensions = data;
      renderExtensions(allExtensions);
    })
    .catch((error) => console.error("Failed to fetch data:", error));

  // Filter logic
  allBtn.addEventListener("click", (e) => {
    e.preventDefault();
    currentFilter = "all";
    renderExtensions(allExtensions);
  });

  activeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    currentFilter = "active";
    renderExtensions(allExtensions.filter((ext) => ext.isActive));
  });

  inActiveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    currentFilter = "inactive";
    renderExtensions(allExtensions.filter((ext) => !ext.isActive));
  });

  function renderExtensions(extensions) {
    extensionGrid.innerHTML = "";

    extensions.forEach((ext) => {
      const clone = template.content.cloneNode(true);

      const extensionImg = clone.querySelector(".extension-img");
      const extensionName = clone.querySelector(".extension-name");
      const extensionDesc = clone.querySelector(".extension-desc");
      const isActiveToggle = clone.querySelector(".isActiveToggle");
      const removeBtn = clone.querySelector(".remove-btn");

      extensionImg.src = ext.logo;
      extensionImg.alt = ext.img || ext.name;
      extensionName.textContent = ext.name;
      extensionDesc.textContent = ext.description;
      isActiveToggle.checked = ext.isActive;

      removeBtn.addEventListener("click", () => {
        allExtensions = allExtensions.filter((e) => e.name !== ext.name);
        applyCurrentFilter();
      });

      isActiveToggle.addEventListener("change", () => {
        ext.isActive = isActiveToggle.checked;
        applyCurrentFilter(); // re-filter after toggle
      });

      extensionGrid.appendChild(clone);
    });
  }

  function applyCurrentFilter() {
    if (currentFilter === "all") {
      renderExtensions(allExtensions);
    } else if (currentFilter === "active") {
      renderExtensions(allExtensions.filter((ext) => ext.isActive));
    } else if (currentFilter === "inactive") {
      renderExtensions(allExtensions.filter((ext) => !ext.isActive));
    }
  }
  let isDark = false;
  theme.addEventListener("click", (e) => {
    e.preventDefault();
    isDark = !isDark;

    if (isDark) {
      theme.src = "./assets/images/icon-sun.svg";
      document.body.classList.add("dark");
      theme.style.border = "2px solid hsl(3, 71%, 56%)";
    } else {
      theme.src = "./assets/images/icon-moon.svg";
      document.body.classList.remove("dark");
      logo.src = "./assets/images/logo.svg";
      theme.style.border = "2px solid hsl(3, 71%, 56%)";
    }
  });
});
