/*
  SETUP: Paste your deployed Google Apps Script web app URL between the quotes.
  It should end in /exec. Full instructions are in README.md.
*/
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzTRg5BVwsDecdtLMO_xdC3zkJaJUocdMde4mJkHd0AnAEOdUrGAPNyeCX9fTQdZEHABQ/exec";

const GUESTS = {
  isabella: "Isabella",
  matteo: "Matteo",
  darrell: "Darrell",
  melana: "Melana",
  kaiden: "Kaiden",
};

const inviteKey = new URLSearchParams(window.location.search)
  .get("invite")
  ?.toLowerCase();
const guestName = inviteKey && GUESTS[inviteKey] ? GUESTS[inviteKey] : "friend";

document.querySelector("#guest-name").textContent = guestName;

const form = document.querySelector("#rsvp-form");
const rsvpButtons = [...document.querySelectorAll("[data-rsvp]")];
const yesDetails = document.querySelector("#yes-details");
const finalPanel = document.querySelector("#final-panel");
const arrivalTimeWrap = document.querySelector("#arrival-time-wrap");
const arrivalTime = document.querySelector("#arrival-time");
const bringingDessert = document.querySelector("#bringing-dessert");
const dessertWrap = document.querySelector("#dessert-wrap");
const dessert = document.querySelector("#dessert");
const notes = document.querySelector("#notes");
const submitButton = document.querySelector("#submit-button");
const submitMessage = document.querySelector("#submit-message");

let rsvpChoice = null;

function showMessage(message, type) {
  submitMessage.textContent = message;
  submitMessage.className = `submit-message ${type}`;
}

function clearMessage() {
  submitMessage.textContent = "";
  submitMessage.className = "submit-message hidden";
}

function updateRadioCards() {
  document.querySelectorAll("[data-radio-card]").forEach((card) => {
    const input = card.querySelector("input");
    card.classList.toggle("selected", input.checked);
  });
}

rsvpButtons.forEach((button) => {
  button.addEventListener("click", () => {
    rsvpChoice = button.dataset.rsvp;
    rsvpButtons.forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle("active", active);
      candidate.setAttribute("aria-pressed", String(active));
    });
    yesDetails.classList.toggle("hidden", rsvpChoice !== "yes");
    finalPanel.classList.remove("hidden");
    clearMessage();
  });
});

document.querySelectorAll('input[name="arrival-plan"]').forEach((input) => {
  input.addEventListener("change", () => {
    arrivalTimeWrap.classList.toggle("hidden", input.value !== "later");
    updateRadioCards();
  });
});

document.querySelectorAll('input[name="payment"]').forEach((input) => {
  input.addEventListener("change", updateRadioCards);
});

bringingDessert.addEventListener("change", () => {
  dessertWrap.classList.toggle("hidden", !bringingDessert.checked);
});

function formatTime(value) {
  if (!value) return "";
  const [hours, minutes] = value.split(":").map(Number);
  const suffix = hours >= 12 ? "pm" : "am";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessage();

  if (!inviteKey || !GUESTS[inviteKey]) {
    showMessage("Please open the personal invite link I sent you.", "error");
    return;
  }
  if (!rsvpChoice) {
    showMessage("Pick yes or no first, please!", "error");
    return;
  }

  const arrivalPlan = document.querySelector('input[name="arrival-plan"]:checked')?.value;
  const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || "";

  if (rsvpChoice === "yes" && arrivalPlan === "later" && !arrivalTime.value) {
    showMessage("Let me know roughly when you think you'll arrive.", "error");
    return;
  }
  if (rsvpChoice === "yes" && !paymentMethod) {
    showMessage("Let me know whether you're paying by e-transfer or cash.", "error");
    return;
  }
  if (!APPS_SCRIPT_URL.startsWith("https://script.google.com/") || !APPS_SCRIPT_URL.endsWith("/exec")) {
    showMessage("The RSVP sheet is not connected yet. Check the setup instructions in README.md.", "error");
    return;
  }

  const payload = {
    guest: inviteKey,
    guestName,
    rsvp: rsvpChoice,
    arrival:
      rsvpChoice === "yes"
        ? arrivalPlan === "six"
          ? "6:00 pm"
          : formatTime(arrivalTime.value)
        : "",
    paymentMethod: rsvpChoice === "yes" ? paymentMethod : "",
    bringingDessert: rsvpChoice === "yes" && bringingDessert.checked,
    dessert: rsvpChoice === "yes" && bringingDessert.checked ? dessert.value.trim() : "",
    notes: notes.value.trim(),
  };

  submitButton.disabled = true;
  submitButton.textContent = "Saving...";

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    showMessage(
      rsvpChoice === "yes"
        ? "Perfetto! You're on the list. See you Friday!"
        : "I'll miss you, but thanks for letting me know!",
      "saved"
    );
  } catch (error) {
    console.error(error);
    showMessage("That didn't save. Give it one more try.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send my RSVP";
  }

  
});
