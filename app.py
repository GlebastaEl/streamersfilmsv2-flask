from flask import Flask, render_template, request, jsonify
import psycopg2

import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__, static_folder="static", static_url_path="/static")

# Настройки подключения к БД
conn = psycopg2.connect(
    os.getenv("DATABASE_URL"),
    options='-c search_path=app'
)

@app.route("/")
def index():
    return render_template("streamers-list2.html")

@app.route("/api/streamed_films", methods=["GET"])
def get_streamed_films():
    film_id = request.args.get("film_id", type=int)
    nickname_on_twitch = request.args.get("nickname_on_twitch")

    query = """
        SELECT
            f.title,
            f.year,
            f.genre,
            f.kinopoisk_rating,
            f.imdb_rating,
            f.description,
            f.film_banner,
            s.streamer_name,
            s.nickname_on_twitch,
            s.twitch_link,
            st.video_url,
            s.streamer_photo_link,
            s.popular_name
        FROM streamers_plus_films_connections st
        JOIN films f ON st.film_id = f.id
        JOIN streamers s ON st.streamer_id = s.id
        WHERE 1=1
    """
    params = []

    if film_id:
        query += " AND f.id = %s"
        params.append(film_id)
    if nickname_on_twitch:
        query += " AND s.nickname_on_twitch = %s"
        params.append(nickname_on_twitch)

    cur = conn.cursor()
    cur.execute(query, params)
    rows = cur.fetchall()
    cur.close()

    results = []
    for row in rows:
        results.append({
            "title": row[0],
            "year": row[1],
            "genre": row[2],
            "kinopoisk_rating": row[3],
            "imdb_rating": row[4],
            "description": row[5],
            "film_banner": row[6],
            "streamer_name": row[7],
            "nickname_on_twitch": row[8],
            "twitch_link": row[9],
            "video_url": row[10],
            "streamer_photo_link": row[11],
            "popular_name": row[12]
        })

    return jsonify(results)

@app.route("/api/streamers")
def api_streamers():
    cur = conn.cursor()
    cur.execute("SELECT id, streamer_name, nickname_on_twitch, twitch_link, streamer_photo_link FROM app.streamers ORDER BY streamer_name ASC")
    streamers = cur.fetchall()
    cur.close()

    result = []
    for s in streamers:
        result.append({
            "id": s[0],
            "streamer_name": s[1],
            "nickname_on_twitch": s[2],
            "twitch_link": s[3],
            "streamer_photo_link": s[4]
        })

    return jsonify(result)

""" @app.route("/streamer/<nickname_on_twitch>-smotrit/films/<int:film_id>")
def streamer_film_page(nickname_on_twitch, film_id):
    return render_template("index.html", nickname_on_twitch=nickname_on_twitch, film_id=film_id) """

@app.route("/streamer/<nickname_on_twitch>-smotrit/films/<int:film_id>")
def streamer_film_page(nickname_on_twitch, film_id):
    cur = conn.cursor()
    cur.execute("""
        SELECT
            st.video_url,
            s.streamer_name,
            s.popular_name,
            s.nickname_on_twitch,
            f.title,
            f.year,
            f.film_banner
        FROM streamers_plus_films_connections st
        JOIN streamers s ON s.id = st.streamer_id
        JOIN films f ON f.id = st.film_id
        WHERE s.nickname_on_twitch = %s AND f.id = %s
    """, (nickname_on_twitch, film_id))
    result = cur.fetchone()
    cur.close()

    if result:
        video_url, streamer_name, popular_name, nickname_on_twitch, film_title, film_year, film_banner_url = result
    else:
        video_url = ""
        streamer_name = popular_name = film_title = film_banner_url = "Не найдено"
        film_year = 0

    return render_template(
        "index.html",
        nickname_on_twitch=nickname_on_twitch,
        film_id=film_id,
        video_url=video_url,
        streamer_name=streamer_name,
        popular_name=popular_name,
        film_title=film_title,
        film_year=film_year,
        film_banner_url=film_banner_url
    )


@app.route("/streamer/<nickname_on_twitch>-smotrit")
def streamer_page(nickname_on_twitch):
    cur = conn.cursor()
    cur.execute("""
        SELECT id, streamer_name, nickname_on_twitch, popular_name, twitch_link, telegram_link, streamer_photo_link
        FROM streamers
        WHERE nickname_on_twitch = %s
    """, (nickname_on_twitch,))
    streamer = cur.fetchone()
    cur.close()

    if not streamer:
        return "Стример не найден", 404

    streamer_data = {
        "id": streamer[0],
        "streamer_name": streamer[1],
        "nickname_on_twitch": streamer[2],
        "popular_name": streamer[3],
        "twitch_link": streamer[4],
        "telegram_link": streamer[5],
        "streamer_photo_link": streamer[6],
    }

    return render_template("streamer-films.html", streamer_data=streamer_data, nickname_on_twitch=nickname_on_twitch)


@app.route("/api/streamer/<nickname_on_twitch>-smotrit/films")
def get_films_by_streamer(nickname_on_twitch):
    cur = conn.cursor()
    cur.execute("""
    SELECT f.id, f.title, f.film_banner
    FROM streamers_plus_films_connections st
    JOIN films f ON f.id = st.film_id
    JOIN streamers s ON s.id = st.streamer_id
    WHERE s.nickname_on_twitch = %s
    ORDER BY f.title;
    """, (nickname_on_twitch,))
    films = cur.fetchall()
    cur.close()

    result = []
    for film in films:
        result.append({
            "film_id": film[0],
            "title": film[1],
            "film_banner": film[2] if film[2] else "../static/icons/film-default.png"
        })

    return jsonify(result)

@app.route("/api/films/all")
def get_all_films():
    cur = conn.cursor()
    cur.execute("""
        SELECT DISTINCT f.id, f.title, f.film_banner
        FROM films f
        JOIN streamers_plus_films_connections st ON f.id = st.film_id
        ORDER BY f.title
    """)
    films = cur.fetchall()
    cur.close()

    result = []
    for film in films:
        result.append({
            "film_id": film[0],
            "title": film[1],
            "film_banner": film[2] if film[2] else "../static/icons/film-default.png"
        })

    return jsonify(result)


@app.route("/films")
def all_films_page():
    return render_template("all-films.html")


@app.route('/films/<int:film_id>')
def film_detail(film_id):
    cur = conn.cursor()

    # Получение информации о фильме
    cur.execute("""
        SELECT id, title, description, genre, year, film_banner
        FROM films
        WHERE id = %s
    """, (film_id,))
    film_row = cur.fetchone()

    if not film_row:
        cur.close()
        return "Фильм не найден", 404

    film = {
        "id": film_row[0],
        "title": film_row[1],
        "description": film_row[2],
        "genre": film_row[3],
        "year": film_row[4],
        "film_banner": film_row[5] or "/static/images/default-banner.jpg"
    }

    # Получение стримеров, смотревших этот фильм
    cur.execute("""
        SELECT s.id, s.nickname_on_twitch, s.popular_name, s.streamer_photo_link
        FROM streamers_plus_films_connections st
        JOIN streamers s ON s.id = st.streamer_id
        WHERE st.film_id = %s
        ORDER BY s.nickname_on_twitch
    """, (film_id,))
    rows = cur.fetchall()
    cur.close()

    streamers = []
    for row in rows:
        streamers.append({
            "id": row[0],
            "nickname_on_twitch": row[1] or "",
            "popular_name": row[2] or "Без имени",
            "streamer_photo_link": row[3] or "/static/icons/user icon.png"
        })

    return render_template("film-detail.html", film=film, streamers=streamers)

@app.route("/api/random_pairs")
def get_random_pairs():
    cur = conn.cursor()
    cur.execute("""
        SELECT
            s.nickname_on_twitch,
            s.popular_name,
            s.streamer_photo_link,
            f.id as film_id,
            f.title,
            f.film_banner
        FROM streamers_plus_films_connections st
        JOIN streamers s ON s.id = st.streamer_id
        JOIN films f ON f.id = st.film_id
    """)
    rows = cur.fetchall()
    cur.close()

    result = []
    for row in rows:
        result.append({
            "nickname_on_twitch": row[0],
            "popular_name": row[1],
            "streamer_photo_link": row[2],
            "film_id": row[3],
            "film_title": row[4],
            "film_banner": row[5]
        })

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)