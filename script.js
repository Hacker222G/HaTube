// Пример данных (можно заменить на загрузку с Firebase или GitHub)
const videos = [
    { title: "Видео 1", url: "videos/video1.mp4" },
    { title: "Видео 2", url: "videos/video2.mp4" },
    { title: "Видео 3", url: "videos/video3.mp4" },
    { title: "Видео 4", url: "videos/video4.mp4" },
    { title: "Видео 5", url: "videos/video5.mp4" },
    { title: "Видео 6", url: "videos/video6.mp4" },
    { title: "Видео 7", url: "videos/video7.mp4" },
    { title: "Видео 8", url: "videos/video8.mp4" },
    { title: "Видео 9", url: "videos/video9.mp4" },
    { title: "Видео 10", url: "videos/video10.mp4" },
];

const videoList = document.getElementById("video-list");
const pagination = document.getElementById("pagination");
const videosPerPage = 4;
let currentPage = 1;

// Отображение видео
function displayVideos(page = 1) {
    videoList.innerHTML = "";
    const start = (page - 1) * videosPerPage;
    const end = start + videosPerPage;
    const paginatedVideos = videos.slice(start, end);

    paginatedVideos.forEach(video => {
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
document.getElementById("search-button").addEventListener("click", () => {
    const searchTerm = document.getElementById("search").value.toLowerCase();
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

// Пагинация
function setupPagination() {
    pagination.innerHTML = "";
    const pageCount = Math.ceil(videos.length / videosPerPage);

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement("button");
        button.innerText = i;
        button.addEventListener("click", () => {
            currentPage = i;
            displayVideos(currentPage);
        });
        pagination.appendChild(button);
    }
}

// Инициализация
displayVideos(currentPage);
setupPagination();
