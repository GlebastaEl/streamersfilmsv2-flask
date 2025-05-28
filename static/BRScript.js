const audio = document.getElementById('BR-sound');
const audio2 = document.getElementById('BR-sound2');
const playBtn = document.getElementById('play-btn');
const gifSecretContainer = document.getElementById('gifSecret');
const gifSecretContainer2 = document.getElementById('gifSecret2');
const stopBtn = document.getElementById('gifSecret-close-btn');
const volumeSlider = document.getElementById('volume-control');

playBtn.addEventListener('click', () => {
    playStopAudio()
});

stopBtn.addEventListener('click', () => {
    playStopAudio()
});

function playStopAudio() {
    if (audio.paused) {
        audio.play();
        /*        playBtn.textContent = "Пауза";*/
        gifSecretContainer.style.display = 'flex';
    } else {
        audio.pause();
        /*        playBtn.textContent = "Включить музыку";*/
        gifSecretContainer.style.display = 'none';
    }
}

// Устанавливаем начальную громкость
audio.volume = volumeSlider.value;

// Обновляем громкость при изменении ползунка
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

const images = [
    '/static/images/gosling-sad-gosling.gif',
    '/static/images/good-mood-gosling.gif',
    '/static/images/gosling3.gif',
    '/static/images/sandy-gosling.gif',
    '/static/images/gosling1.gif'
];

const audios = [
    '/static/audio/lonely.mp3',
    '/static/audio/Tears In The Rain.mp3',
    '/static/audio/Elvis - falling in love.mp3',
    '/static/audio/Joi.mp3',
    '/static/audio/Frank_Sinatra-Summer_Wind.mp3'
];

let currentIndex = 0;

const imageEl = document.getElementById('gifSecret').querySelector('.gifSecret-image');
const audioEl = document.getElementById('BR-sound');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');

function updateCarousel(index) {
    // Обновляем картинку
    imageEl.src = images[index];

    // Обновляем музыку
    audioEl.pause();
    audioEl.src = audios[index];
    audioEl.load();
    audioEl.play();
}

leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel(currentIndex);
});

rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel(currentIndex);
});

