document.getElementById("ageForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const day = document.getElementById("day").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;

  const dayError = document.getElementById("dayError");
  const monthError = document.getElementById("monthError");
  const yearError = document.getElementById("yearError");

  // Reset errors
  dayError.textContent = "";
  monthError.textContent = "";
  yearError.textContent = "";

  let hasError = false;
  const now = new Date();
  const inputDate = new Date(`${year}-${month}-${day}`);

  if (!day) {
    dayError.textContent = "This field is required";
    hasError = true;
  } else if (day < 1 || day > 31) {
    dayError.textContent = "Must be a valid day";
    hasError = true;
  }

  if (!month) {
    monthError.textContent = "This field is required";
    hasError = true;
  } else if (month < 1 || month > 12) {
    monthError.textContent = "Must be a valid month";
    hasError = true;
  }

  if (!year) {
    yearError.textContent = "This field is required";
    hasError = true;
  } else if (inputDate > now) {
    yearError.textContent = "Must be in the past";
    hasError = true;
  }

  if (inputDate.toString() === "Invalid Date") {
    dayError.textContent = "Must be a valid date";
    hasError = true;
  }

  if (hasError) return;

  let today = new Date();
  let birthDate = inputDate;

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  animateCount("years", years);
  animateCount("months", months);
  animateCount("days", days);
});

function animateCount(id, target) {
  const el = document.getElementById(id);
  let current = 0;
  const step = Math.max(1, Math.floor(target / 50));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current;
  }, 20);
}
