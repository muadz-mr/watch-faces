// Get time element
const time = document.getElementById("time");
const divAmPm = document.getElementById("amPm");

// Get elements for styling conditionally
const watchFaceBg = document.querySelector(".watch-face");
const font = document.querySelector(".time-info");

// Get elements for animations
const sun = document.getElementById("sun");
const mountSmall = document.getElementById("mount-small");
const mountBig = document.getElementById("mount-big");
const sunAfternoon = document.getElementById("sun-afternoon");
const sea = document.getElementById("sea-reflection");
const cloudBig = document.getElementById("cloud-big");
const cloudSmall = document.getElementById("cloud-small");
const moon = document.getElementById("moon");
const stars = document.getElementById("stars");
const cloudSNight = document.getElementById("cloud-s-night");
const cloudMNight = document.getElementById("cloud-m-night");
const cloudBNight = document.getElementById("cloud-b-night");

// Option for showing AM/PM
const showAmPm = true;

function runTime() {
  let today = new Date(),
    hour = today.getHours(),
    minute = today.getMinutes(),
    second = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? "PM" : "AM";

  // 12-hour format
  hour = hour % 12 || 12;

  // Output time
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(minute)}`;
  divAmPm.innerText = `${showAmPm ? " " + amPm : ""}`;

  setBackground();

  // Repeat after every second
  setTimeout(runTime, 1000);
}

// Add zero for placeholder in front of single digit
function addZero(number) {
  return (parseInt(number, 10) < 10 ? "0" : "") + number;
}

function dayIn() {
  sun.style.top = "0px";
  mountBig.style.top = "53px";
  mountSmall.style.top = "65px";
}

function dayOut() {
  sun.style.top = "120px";
  mountBig.style.top = "130px";
  mountSmall.style.top = "125px";
}

function afternoonIn() {
  sunAfternoon.style.top = "5px";
  sea.style.top = "85px";
  cloudBig.style.top = "25px";
  cloudSmall.style.top = "53px";
}

function afternoonOut() {
  sunAfternoon.style.top = "130px";
  sea.style.top = "140px";
  cloudBig.style.top = "125px";
  cloudSmall.style.top = "130px";
}

function eveIn() {
  moon.style.top = "17px";
  stars.style.top = "13px";
  cloudSNight.style.top = "18px";
  cloudMNight.style.top = "72px";
  cloudBNight.style.top = "35px";
}

function eveOut() {
  moon.style.top = "150px";
  stars.style.top = "120px";
  cloudSNight.style.top = "130px";
  cloudMNight.style.top = "140px";
  cloudBNight.style.top = "130px";
}

// Set background according to time
function setBackground() {
  let today = new Date(),
    hour = today.getHours(),
    second = today.getSeconds();

  if (second < 20) {
    if (
      !watchFaceBg.style.background ||
      watchFaceBg.style.background === "var(--linear-bg-night)"
    ) {
      watchFaceBg.style.background = "var(--linear-bg-day)";
      font.style.color = "var(--fcolor-dark)";
      // Animate out prev night elements
      eveOut();
      // Animate in day elements
      setTimeout(dayIn, 500);
    }
  } else if (second < 40) {
    if (
      !watchFaceBg.style.background ||
      watchFaceBg.style.background === "var(--linear-bg-day)"
    ) {
      watchFaceBg.style.background = "var(--linear-bg-afternoon)";
      // Animate out day elements
      dayOut();
      // Animate in afternoon elements
      setTimeout(afternoonIn, 500);
    }
  } else {
    if (
      !watchFaceBg.style.background ||
      watchFaceBg.style.background === "var(--linear-bg-afternoon)"
    ) {
      watchFaceBg.style.background = "var(--linear-bg-night)";
      font.style.color = "var(--fcolor-light)";
      // Animate out afternoon elements
      afternoonOut();
      // Animate in evening elements
      setTimeout(eveIn, 500);
    }
  }
}

// Run all functions
runTime();
