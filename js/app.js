window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('coloringCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 600;
    canvas.height = 450;

    // 테스트용 흑백 밑그림 이미지 불러오기 (임시 오픈소스 선화 이미지)
    const img = new Image();
    img.crossOrigin = "anonymous";
    // 간단한 곰돌이/동물 외곽선 대체 이미지 링크
    img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/600px-Cat03.jpg"; // (나중에 아이들이 좋아하는 선화로 교체 가능)
    
    img.onload = () => {
        // 이미지를 캔버스 크기에 딱 맞게 그리기
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
});
