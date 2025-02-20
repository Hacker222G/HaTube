// Хранение данных в LocalStorage
const storage = {
  get(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Инициализация данных
if (!storage.get('videos')) {
  storage.set('videos', [
    {
      id: 1,
      title: "Пример видео",
      description: "Это пример видео",
      url: "videos/video1.mp4",
      views: 1000,
      timestamp: Date.now()
    }
  ]);
}

if (!storage.get('chatMessages')) {
  storage.set('chatMessages', []);
}

// Функция для накрутки просмотров
function incrementViews() {
  const videos = storage.get('videos');
  if (videos) {
    videos.forEach(video => {
      video.views += 100; // Накручиваем по 100 просмотров
    });
    storage.set('videos', videos);
  }
}

// Накрутка просмотров каждый час
setInterval(incrementViews, 60 * 60 * 1000); // 1 час
