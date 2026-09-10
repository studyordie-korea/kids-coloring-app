window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('coloringCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 600;
    canvas.height = 450;

    // 밑그림 이미지 로드
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/600px-Cat03.jpg";
    
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // 드로잉 상태 변수
    let isDrawing = false;
    let currentColor = "#FF0000"; // 기본 빨간색
    let currentTool = "pen";

    // 도구 선택 버튼 이벤트
    const toolButtons = document.querySelectorAll('.tool-btn');
    toolButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            toolButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentTool = e.target.getAttribute('data-tool');
        });
    });

    // 색상 칩 선택 이벤트
    const colorChips = document.querySelectorAll('.color-chip');
    colorChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            currentColor = e.target.getAttribute('data-color');
        });
    });

    // 마우스 및 터치 이벤트 처리
    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', drawing);
    canvas.addEventListener('mouseup', stopDraw);
    
    canvas.addEventListener('touchstart', (e) => { startDraw(e); e.preventDefault(); });
    canvas.addEventListener('touchmove', (e) => { drawing(e); e.preventDefault(); });
    canvas.addEventListener('touchend', stopDraw);

    function startDraw(e) {
        isDrawing = true;
        const pos = getPosition(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }

    function drawing(e) {
        if (!isDrawing) return;
        const pos = getPosition(e);

        ctx.strokeStyle = currentColor;
        ctx.lineWidth = currentTool === 'colored-pencil' ? 3 : 8; // 색연필은 얇고 사각거리게, 사인펜은 굵직하게
        ctx.lineCap = 'round';

        // 색연필 느낌을 위한 투명도 조절 (임시 효과)
        if (currentTool === 'colored-pencil') {
            ctx.globalAlpha = 0.6;
        } else {
            ctx.globalAlpha = 1.0;
        }

        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }

    function stopDraw() {
        isDrawing = false;
        ctx.closePath();
    }
});
