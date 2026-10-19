const members = {
  1: {
    initial: "A",
    name: "PENILLA, Janaya",
    role: "Team Leader",
    bio: "Coordinates group tasks, keeps the hive on schedule, and helps organize the final portfolio."
  },
  2: {
    initial: "B",
    name: "AMANTE, Xian",
    role: "Material Manager",
    bio: "Prepares tools and materials, checks safety reminders, and supports a smooth lab setup."
  },
  3: {
    initial: "C",
    name: "BORJA, Xian",
    role: "Researcher",
    bio: "Collects background information, checks sources, and helps connect the lab to key concepts."  
  },
  4: {
    initial: "D",
    name: "FABRIGA, Mary Claire",
    role: "Experiment Lead",
    bio: "Guides the procedure, watches each step carefully, and helps the group stay accurate."
  },
  5: {
    initial: "E",
    name: "FRANCISCO, Sam",
    role: "Recorder",
    bio: "Writes observations, organizes notes, and keeps the activity documentation complete."
  },
  6: {
    initial: "F",
    name: "ILAO, Eliseo",
    role: "Analyst",
    bio: "Reviews results, compares evidence, and helps turn raw data into clear conclusions."
  },
  7: {
    initial: "G",
    name: "MEDRANO, Raynne",
    role: "Designer",
    bio: "Creates visuals, improves layout, and makes the portfolio cute, clear, and easy to read."
  },
  8: {
    initial: "H",
    name: "TOLENTINO, Jillian",
    role: "Presenter",
    bio: "Prepares the final sharing, practices explanations, and helps communicate the group's learning."
  }
};

const memberCards = document.querySelectorAll(".member-card");
const spotlightAvatar = document.querySelector("#spotlightAvatar");
const spotlightName = document.querySelector("#spotlightName");
const spotlightRole = document.querySelector("#spotlightRole");
const spotlightBio = document.querySelector("#spotlightBio");
const reflectionJump = document.querySelector("#reflectionJump");
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".activity-panel");
const reflectionCards = document.querySelectorAll(".reflection-card");
const reflectionHeaders = document.querySelectorAll(".reflection-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");

let selectedMember = "1";

function updateSpotlight(memberId) {
  const member = members[memberId];

  selectedMember = memberId;
  spotlightAvatar.textContent = member.initial;
  spotlightName.textContent = member.name;
  spotlightRole.textContent = member.role;
  spotlightBio.textContent = member.bio;

  memberCards.forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.member === memberId);
  });
}

function openReflection(memberId) {
  const targetCard = document.querySelector(`#reflection-${memberId}`);
  const targetButton = targetCard.querySelector(".reflection-header");
  const targetBody = targetCard.querySelector(".reflection-body");
  const targetIcon = targetCard.querySelector(".reflection-icon");

  targetButton.setAttribute("aria-expanded", "true");
  targetBody.hidden = false;
  targetIcon.textContent = "−";

  reflectionCards.forEach((card) => card.classList.remove("is-highlighted"));
  targetCard.classList.add("is-highlighted");
  targetCard.scrollIntoView({ behavior: "smooth", block: "center" });

  window.setTimeout(() => {
    targetCard.classList.remove("is-highlighted");
  }, 1800);
}

memberCards.forEach((card) => {
  card.addEventListener("click", () => {
    updateSpotlight(card.dataset.member);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      updateSpotlight(card.dataset.member);
    }
  });
});

reflectionJump.addEventListener("click", () => {
  openReflection(selectedMember);
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTab = button.dataset.tab;

    tabButtons.forEach((tab) => {
      const isActive = tab === button;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.id === selectedTab;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  });
});

reflectionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const body = header.nextElementSibling;
    const icon = header.querySelector(".reflection-icon");
    const isOpen = header.getAttribute("aria-expanded") === "true";

    header.setAttribute("aria-expanded", String(!isOpen));
    body.hidden = isOpen;
    icon.textContent = isOpen ? "+" : "−";
  });
});

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

function applySavedTheme() {
  const savedTheme = localStorage.getItem("honeybee-theme");

  if (savedTheme === "night") {
    document.body.classList.add("night-mode");
    themeToggle.textContent = "☀️";
  }
}

themeToggle.addEventListener("click", () => {
  const isNight = document.body.classList.toggle("night-mode");
  themeToggle.textContent = isNight ? "☀️" : "🌙";
  localStorage.setItem("honeybee-theme", isNight ? "night" : "day");
});

applySavedTheme();

function filterGallery(category) {
  // Update active button state
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  const items = document.querySelectorAll('.gallery-item');
  
  items.forEach(item => {
    const imgSrc = item.querySelector('img').src;
    
    if (category === 'all') {
      item.style.display = 'block';
    } else if (imgSrc.includes(category)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}