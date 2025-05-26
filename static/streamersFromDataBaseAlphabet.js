document.addEventListener("DOMContentLoaded", async () => {
const container = document.querySelector(".ABC-list-container");

try {
const response = await fetch("/api/streamers");
const data = await response.json();

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

for (let letter of alphabet) {
const alphabetContainer = document.createElement("div");
alphabetContainer.className = "alphabet-container";

const letterSpan = document.createElement("span");
letterSpan.className = "letter";
letterSpan.id = letter;
letterSpan.textContent = letter;
alphabetContainer.appendChild(letterSpan);

const streamersList = document.createElement("div");
streamersList.className = "streamers-letter-list";

const streamers = data[letter];
if (streamers && streamers.length > 0) {
for (let streamer of streamers) {
const streamerDiv = document.createElement("div");
streamerDiv.className = "streamer-name-and-photo-container";

const imgLink = document.createElement("a");
imgLink.href = `/streamer.html?streamer_id=${streamer.id}`;
const img = document.createElement("img");
img.className = "streamer-photo";
img.src = streamer.photo;
imgLink.appendChild(img);

const nickLink = document.createElement("a");
nickLink.className = "streamer-page-link";
nickLink.href = `/streamer.html?streamer_id=${streamer.id}`;
nickLink.textContent = streamer.nickname;

streamerDiv.appendChild(imgLink);
streamerDiv.appendChild(nickLink);

streamersList.appendChild(streamerDiv);
}
} else {
// нет стримеров на эту букву
const noStreamerDiv = document.createElement("div");
noStreamerDiv.className = "streamer-name-and-photo-container";

const img = document.createElement("img");
img.className = "streamer-photo";
img.src = "../static/icons/user icon.png";

const text = document.createElement("a");
text.className = "streamer-page-link";
text.textContent = "нет стримеров";
text.href = "#";

noStreamerDiv.appendChild(img);
noStreamerDiv.appendChild(text);
streamersList.appendChild(noStreamerDiv);
}

alphabetContainer.appendChild(streamersList);
container.appendChild(alphabetContainer);
}

} catch (err) {
console.error("Ошибка загрузки стримеров:", err);
}
});

