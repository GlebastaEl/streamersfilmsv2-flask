const neons = document.querySelectorAll('.addAtmosphere');
const sound = document.getElementById('flicker-sound');
let interval;

for (let neon of neons) {

neon.addEventListener('mouseenter', () => {
    // Включаем звук
    sound.currentTime = 0;
    sound.play();

    interval = setInterval(() => {
        // 30% шанс мерцания
        if (Math.random() > 0.7) {
            neon.classList.toggle('flicker-off');
        }
    }, 100);
});

neon.addEventListener('mouseleave', () => {
    clearInterval(interval);
    neon.classList.remove('flicker-off');

    // Останавливаем звук и сбрасываем его
    sound.pause();
    sound.currentTime = 0;
});

}