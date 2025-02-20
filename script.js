// Общая часть для всех страниц
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация данных
    if (!localStorage.getItem('videos')) {
        localStorage.setItem('videos', JSON.stringify([
            { 
                title: "Пример видео", 
                description: "Это пример видео", 
                url: "videos/video1.mp4",
                timestamp: Date.now()
            }
        ]));
    }

    // Для страницы загрузки
    if (document.getElementById('uploadForm')) {
        const form = document.getElementById('uploadForm');
        const notification = document.getElementById('notification');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const filename = document.getElementById('filename').value;

            // Валидация
            if (!title || !filename) {
                showNotification('Заполните обязательные поля', 'error');
                return;
            }

            // Добавление в хранилище
            const videos = JSON.parse(localStorage.getItem('videos'));
            videos.push({
                title,
                description,
                url: `videos/${filename}`,
                timestamp: Date.now()
            });

            localStorage.setItem('videos', JSON.stringify(videos));
            
            showNotification('Видео успешно добавлено!', 'success');
            form.reset();
        });
    }

    // Для главной страницы
    if (document.getElementById('video-list')) {
        let videos = JSON.parse(localStorage.getItem('videos'));
        const videosPerPage = 4;
        let currentPage = 1;

        // Отображение видео
        function displayVideos(page = 1) {
            const videoList = document.getElementById('video-list');
            videoList.innerHTML = "";
            const start = (page - 1) * videosPerPage;
            const end = start + videosPerPage;
            const paginatedVideos = videos.slice(start, end);

            paginatedVideos.forEach(video => {
                const videoItem = document.createElement('div');
                videoItem.className = 'video-item';
                videoItem.innerHTML = `
                    <h3>${video.title}</h3>
                    ${video.description ? `<p>${video.description}</p>` : ''}
                    <video controls>
                        <source src="${video.url}" type="video/mp4">
                        Ваш браузер не поддерживает видео.
                    </video>
                `;
                videoList.appendChild(videoItem);
            });
        }

        // Остальной код пагинации и поиска...
    }
});

function showNotification(text, type = 'success') {
    const notification = document.getElementById('notification');
    notification.className = `notification ${type} ${notification.className.includes('hidden') ? '' : 'hidden'}`;
    notification.textContent = text;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}
