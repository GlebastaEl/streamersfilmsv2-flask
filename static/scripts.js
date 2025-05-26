const audio = document.getElementById('BR-sound');
const playBtn = document.getElementById('play-btn');
const volumeSlider = document.getElementById('volume');
const gifSecretContainer = document.getElementById('gifSecret');

// стартовая громкость
audio.volume = volumeSlider.value;

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "Пауза";
        gifSecretContainer.style.display = 'flex';
    } else {
        audio.pause();
        playBtn.textContent = "Включить музыку";
        gifSecretContainer.style.display = 'none';
    }
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});