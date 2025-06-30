const toggle = document.getElementById("toggle-mode");

// Set initial icon based on current mode
toggle.innerHTML = document.body.classList.contains("dark")
  ? '<i class="bx bx-toggle-right"></i>'
  : '<i class="bx bx-toggle-left"></i>';

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Update toggle icon based on current mode
  toggle.innerHTML = document.body.classList.contains("dark")
    ? '<i class="bx bx-toggle-right"></i>'
    : '<i class="bx bx-toggle-left"></i>';
});

async function fetchTipOfTheDay(params) {
  const response = await fetch(
    "https://quoteslate.vercel.app/api/quotes/random"
  );
  const data = await response.json();
  console.log(data);

  const tips = document.querySelector(".tips p");
  tips.textContent = "";
  if (data.quote && data.author) {
    tips.textContent = `${data.quote} -${data.author}`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetchTipOfTheDay();
});
