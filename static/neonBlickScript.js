// Проверка, является ли устройство мобильным
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

if (!isMobile) {
    const neons = document.querySelectorAll('.addAtmosphere');
    const sound = document.getElementById('flicker-sound');
    let interval;

    for (let neon of neons) {
        neon.addEventListener('mouseenter', () => {
            sound.currentTime = 0;
            sound.play();

            interval = setInterval(() => {
                if (Math.random() > 0.7) {
                    neon.classList.toggle('flicker-off');
                }
            }, 100);
        });

        neon.addEventListener('mouseleave', () => {
            clearInterval(interval);
            neon.classList.remove('flicker-off');
            sound.pause();
            sound.currentTime = 0;
        });
    }
}