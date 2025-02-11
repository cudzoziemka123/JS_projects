const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

function sendNumberValue(number) {
  calculatorDisplay.textContent =
    calculatorDisplay.textContent == 0
      ? number
      : calculatorDisplay.textContent + number;
}

function addDecimal() {
  // If no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// Add Event Listeners for numbers, operators, decimal button
inputBtns.forEach((btn) => {
  if (btn.classList.length === 0) {
    btn.addEventListener("click", () => sendNumberValue(btn.value));
  } else if (btn.classList.contains("operator")) {
    btn.addEventListener("click", () => sendNumberValue(btn.value));
  } else if (btn.classList.contains("decimal")) {
    btn.addEventListener("click", () => addDecimal());
  }
});

// Reset display
function resetAll() {
  calculatorDisplay.textContent = "0";
}

clearBtn.addEventListener("click", resetAll);
