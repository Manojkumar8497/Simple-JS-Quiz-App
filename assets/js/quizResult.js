const name = localStorage.getItem('name');
const points = localStorage.getItem('score');
const timer = localStorage.getItem('timer');

// DOM access 
const nameEl = document.querySelector(".user_name");
const pointsEl = document.querySelector(".user_points");
const timeEl = document.querySelector(".user_time");

if (name && points) {
    nameEl.textContent = `Well done, ${name}`;
    pointsEl.innerHTML = `Your points: <span class="points">${points}</span>`;
    timeEl.innerHTML = `Time: <span class="time">${timer}</span>`
}