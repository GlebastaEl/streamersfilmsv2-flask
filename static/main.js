document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const filmId = urlParams.get('film_id');
    const nickname_on_twitch = urlParams.get('nickname_on_twitch');

    let url = "http://127.0.0.1:5000/api/streamed_films?";
    if (filmId) url += `film_id=${filmId}&`;
    if (nickname_on_twitch) url += `nickname_on_twitch=${nickname_on_twitch}`;

    fetch(url)
        .then(response => response.json())
        .then(data_array => {
            if (data_array[0].error) return alert(data_array[0].error);

            console.log(data_array)

            if (filmId && nickname_on_twitch) { // значит 1 стрим
                const data = data_array[0];
                document.getElementById("streamer-in-header").innerText = data.popular_name;
                document.getElementById("film-in-header").innerText = data.title + " (";
                document.getElementById("film-year-in-header").innerText = data.year;
                document.getElementById("streamer-twitch nickname").innerText = data.nickname_on_twitch;
                document.getElementById("film-year").innerText = data.year;
                document.querySelector(".film-poster-image").src = data.film_banner
                document.getElementById("film-genres").innerText = data.genre;
                document.getElementById("kinopoisk-mark").innerText = data.kinopoisk_rating;
                document.getElementById("imdb-mark").innerText = data.imdb_rating;
                document.getElementById("film-description").innerText = data.description;
                document.querySelector("img[src*='twitch']").parentElement.href = data.twitch_link;
                document.querySelector(".streamer-image").src = data.streamer_photo_link

                try {
                    document.querySelector(".videoplayer_thumb").style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${data.video_url}')`;
                } catch (error) {
                    console.log(error)
                }
            }
        });
});