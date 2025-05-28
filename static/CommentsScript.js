document.getElementById('sendComment').addEventListener('click', () => {
const nameInput = document.getElementById('user-name');
const commentInput = document.getElementById('user-comment');

const name = nameInput.value.trim();
const comment = commentInput.value.trim();

if (name === '' || comment === '') {
alert('Пожалуйста, заполните имя и комментарий.');
return;
}

// Получаем текущую дату и время
const now = new Date();
const formattedDate = now.toLocaleDateString('ru-RU');
const formattedTime = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

// Создаём HTML нового комментария
const newCommentHTML = `
  <div class="fullComment" style="width: 100%">
    <img id="user-anonymous-icon" style="height:100px; margin-bottom:10px" src="/static/icons/user%20icon.png">
    <div class="comment-content">
      <div class="comment-header">
        <span class="user-name">${name}</span>
        <span class="comment-date">${formattedDate} ${formattedTime}</span>
      </div>
      <div class="comment-text-footer">
        <p class="normalBlueText">${comment}</p>
      </div>
    </div>
  </div>
`;

// Добавляем комментарий в начало блока
const container = document.querySelector('.users-all-comments-container');
container.insertAdjacentHTML('beforeend', newCommentHTML);

// Очищаем поля
nameInput.value = '';
commentInput.value = '';
});
