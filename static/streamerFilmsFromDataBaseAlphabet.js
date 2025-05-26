// /*document.addEventListener("DOMContentLoaded", async () => {
// const streamerId = {{ id | tojson }};
// const container = document.getElementById("alphabet-films");
// const rusLetters = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('');
// const grouped = {};
// rusLetters.forEach(l => grouped[l] = []);
//
// try {
// const response = await fetch(`/api/streamer/${streamerId}/films`);
// const films = await response.json();
//
// films.forEach(f => {
// const firstLetter = f.title.trim().charAt(0).toUpperCase();
// if (grouped[firstLetter]) {
//     grouped[firstLetter].push(f);
// }
// });
//
// rusLetters.forEach(letter => {
// const list = grouped[letter];
// const div = document.createElement('div');
// div.className = 'alphabet-container';
// div.innerHTML = `
// <span class="letter" id="${letter}">${letter}</span>
// <div class="streamers-letter-list">
// ${
//     list.length === 0 ? '<p class="normalBlueText">Нет фильмов</p>' :
//         list.map(f => `
//   <div class="streamer-name-and-photo-container">
//     <img class="streamer-photo" src="${f.poster_url}" alt="${f.title}">
//     <p class="streamer-page-link">${f.title}</p>
//   </div>
// `).join('')
// }
// </div>
// `;
// container.appendChild(div);
// });
// } catch (error) {
// console.error("Ошибка загрузки фильмов:", error);
// }
// });*/
//
// // const streamerData = {{ streamer_data | tojson }};
// const streamerId = {{ streamer_id | tojson }};
//
// document.addEventListener("DOMContentLoaded", async () => {
//
//     await fetch(`/api/streamer/${streamerId}/films`)
//     .then(res => res.json())
//     .then(films => {
//     const container = document.getElementById('alphabet-films');
//     const rusLetters = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('');
//     const grouped = {};
//     rusLetters.forEach(l => grouped[l] = []);
//
//     films.forEach(f => {
//         const firstLetter = f.title.trim().charAt(0).toUpperCase();
//         if (grouped[firstLetter]) grouped[firstLetter].push(f);
//     });
//
//     rusLetters.forEach(letter => {
//         const list = grouped[letter];
//         const div = document.createElement('div');
//         div.className = 'alphabet-container';
//         div.innerHTML = `
//     <span class="letter" id="${letter}">${letter}</span>
//     <div class="streamers-letter-list">
//     ${list.length === 0 ? '<p class="normalBlueText">Нет фильмов</p>' :
//             list.map(f => `
//         <div class="streamer-name-and-photo-container">
//           <img class="streamer-photo" src="${f.poster_url}">
//           <p class="streamer-page-link">${f.title}</p>
//         </div>
//       `).join('')}
//     </div>
//     `;
//         container.appendChild(div);
//     });
//     })
// });
//
