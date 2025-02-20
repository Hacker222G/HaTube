// Пример данных (можно заменить на загрузку с Firebase или GitHub)
const videos = [
    { title: "Видео 1", url: "videos/video1.mp4" },
    { title: "Видео 2", url: "videos/video2.mp4" },
];

const videoList = document.getElementById("video-list");

// Отображение видео
function displayVideos() {
    videoList.innerHTML = "";
    videos.forEach(video => {
        const videoItem = document.createElement("div");
        videoItem.className = "video-item";
        videoItem.innerHTML = `
            <h3>${video.title}</h3>
            <video controls>
                <source src="${video.url}" type="video/mp4">
                Ваш браузер не поддерживает видео.
            </video>
        `;
        videoList.appendChild(videoItem);
    });
}

// Поиск видео
document.getElementById("search").addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredVideos = videos.filter(video => 
        video.title.toLowerCase().includes(searchTerm)
    );
    videoList.innerHTML = "";
    filteredVideos.forEach(video => {
        const videoItem = document.createElement("div");
        videoItem.className = "video-item";
        videoItem.innerHTML = `
            <h3>${video.title}</h3>
            <video controls>
                <source src="${video.url}" type="video/mp4">
                Ваш браузер не поддерживает видео.
            </video>
        `;
        videoList.appendChild(videoItem);
    });
});

// Инициализация
displayVideos();
