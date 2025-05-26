document.getElementById('random-button').addEventListener('click', async () => {
    const overlay = document.getElementById('random-overlay');
    const imgStreamer = document.getElementById('random-streamer-img');
    const imgFilm = document.getElementById('random-film-img');
    const names = document.getElementById('random-names');
    const link = document.getElementById('random-link');

    overlay.classList.remove('hidden');
    link.classList.add('hidden');
    names.textContent = '...';

    const pairs = await fetch('/api/random_pairs').then(res => res.json());

    const interval = setInterval(() => {
        const pair = pairs[Math.floor(Math.random() * pairs.length)];

        imgStreamer.src = pair.streamer_photo_link || '/static/icons/user icon.png';
        imgFilm.src = pair.film_banner || '/static/icons/film-default.png';
        names.textContent = `${pair.nickname_on_twitch} + ${pair.film_title}`;
        link.href = `/streamer/${pair.nickname_on_twitch}-smotrit/films/${pair.film_id}`;
    }, 150);

    setTimeout(() => {
        clearInterval(interval);
        link.classList.remove('hidden');
    }, 5000);

    document.getElementById('random-close-btn').addEventListener('click', () => {
        document.getElementById('random-overlay').classList.add('hidden');
    });
});