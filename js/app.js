window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('coloringCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 600;
    canvas.height = 450;

    ctx.fillStyle = "#888888";
    ctx.font = "20px 'Malgun Gothic'";
    ctx.textAlign = "center";
    ctx.fillText("밑그림을 불러오는 중입니다...", canvas.width / 2, canvas.height / 2);
});
