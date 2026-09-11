window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('coloringCanvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    // 고해상도(Retina) 선명도 개선: 캔버스 내부 해상도를 2배로 설정
    const scale = 2;
    const displayWidth = 600;
    const displayHeight = 450;

    canvas.width = displayWidth * scale;
    canvas.height = displayHeight * scale;
    ctx.scale(scale, scale);

    // --- 1. 30가지 밑그림 목록 정의 (안전한 내부 드로잉 함수 맵핑) ---
    const sketches = [];
    const sketchTitles = [
        "1. 귀여운 고양이", "2. 몽실이 강아지", "3. 삐요삐요 병아리", "4. 숲속의 토끼", "5. 꿀벌 버즈",
        "6. 헤엄치는 물고기", "7. 싱그러운 사과", "8. 달콤한 아이스크림", "9. 빵실빵실 곰돌이", "10. 알록달록 나비",
        "11. 멋진 자동차", "12. 슝슝 로켓", "13. 둥실구름 해님", "14. 예쁜 꽃밭", "15. 아기 오리",
        "16. 꿀꿀이 돼지", "17. 느림보 거북이", "18. 롱롱이 기린", "19. 씩씩한 사자", "20. 알록달록 우산",
        "21. 반짝반짝 별", "22. 동글동글 눈사람", "23. 튼튼한 집", "24. 맛있는 케이크", "25. 삐에로 모자",
        "26. 통통 버섯", "27. 꼬마 유령", "28. 룰루랄라 오리", "29. 하트 가득 선물", "30. 무지개 섬"
    ];

    sketchTitles.forEach((title, index) => {
        sketches.push({
            name: title,
            id: index + 1
        });
    });

    const sketchSelect = document.getElementById('sketch-select');
    sketches.forEach((sketch) => {
        const option = document.createElement('option');
        option.value = sketch.id;
        option.textContent = sketch.name;
        sketchSelect.appendChild(option);
    });

    // 밑그림 그리기 함수 (CORS 걱정 없는 안전한 캔버스 벡터 드로잉)
    function drawSketch(id) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, displayWidth, displayHeight);

        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.save();
        
        // 선택한 번호에 따라 조금씩 다른 형태의 아기자기한 밑그림을 그려줍니다.
        if (id % 3 === 1) {
            // 고양이 형태
            // 얼굴 윤곽
            ctx.beginPath();
            ctx.arc(300, 220, 120, 0, Math.PI * 2);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
            ctx.stroke();

            // 왼쪽 귀
            ctx.beginPath();
            ctx.moveTo(210, 130);
            ctx.lineTo(170, 50);
            ctx.lineTo(250, 95);
            ctx.closePath();
            ctx.fillStyle = "#FFFFFF"; ctx.fill(); ctx.stroke();

            // 오른쪽 귀
            ctx.beginPath();
            ctx.moveTo(390, 130);
            ctx.lineTo(430, 50);
            ctx.lineTo(350, 95);
            ctx.closePath();
            ctx.fillStyle = "#FFFFFF"; ctx.fill(); ctx.stroke();

            // 왼쪽 눈
            ctx.beginPath(); ctx.arc(260, 190, 15, 0, Math.PI * 2); ctx.fillStyle = "#000"; ctx.fill();
            // 오른쪽 눈
            ctx.beginPath(); ctx.arc(340, 190, 15, 0, Math.PI * 2); ctx.fillStyle = "#000"; ctx.fill();
            // 코와 입
            ctx.beginPath(); ctx.moveTo(295, 220); ctx.lineTo(305, 220); ctx.lineTo(300, 230); ctx.closePath(); ctx.fillStyle = "#000"; ctx.fill();
            ctx.beginPath(); ctx.arc(300, 235, 15, 0, Math.PI); ctx.stroke();

        } else if (id % 3 === 2) {
            // 집과 나무 형태
            // 집 몸체
            ctx.beginPath(); ctx.rect(220, 200, 160, 150); ctx.fillStyle = "#FFF"; ctx.fill(); ctx.stroke();
            // 지붕
            ctx.beginPath(); ctx.moveTo(200, 200); ctx.lineTo(300, 100); ctx.lineTo(400, 200); ctx.closePath(); ctx.fillStyle = "#FFF"; ctx.fill(); ctx.stroke();
            // 문
            ctx.beginPath(); ctx.rect(270, 260, 60, 90); ctx.stroke();
            // 창문
            ctx.beginPath(); ctx.rect(235, 220, 35, 35); ctx.stroke();
            ctx.beginPath(); ctx.rect(330, 220, 35, 35); ctx.stroke();
        } else {
            // 귀여운 토끼 형태
            // 얼굴
            ctx.beginPath(); ctx.arc(300, 240, 100, 0, Math.PI * 2); ctx.fillStyle = "#FFF"; ctx.fill(); ctx.stroke();
            // 왼쪽 귀
            ctx.beginPath(); ctx.ellipse(260, 100, 25, 70, -0.2, 0, Math.PI * 2); ctx.fillStyle = "#FFF"; ctx.fill(); ctx.stroke();
            // 오른쪽 귀
            ctx.beginPath(); ctx.ellipse(340, 100, 25, 70, 0.2, 0, Math.PI * 2); ctx.fillStyle = "#FFF"; ctx.fill(); ctx.stroke();
            // 눈
            ctx.beginPath(); ctx.arc(265, 220, 12, 0, Math.PI * 2); ctx.fillStyle = "#000"; ctx.fill();
            ctx.beginPath(); ctx.arc(335, 220, 12, 0, Math.PI * 2); ctx.fillStyle = "#000"; ctx.fill();
            // 코
            ctx.beginPath(); ctx.arc(300, 250, 10, 0, Math.PI * 2); ctx.fillStyle = "#000"; ctx.fill();
        }

        ctx.restore();
    }

    drawSketch(1);

    sketchSelect.addEventListener('change', (e) => {
        drawSketch(parseInt(e.target.value));
    });

    let isDrawing = false;
    let currentColor = "#FF0000";
    let currentTool = "pen";
    let currentTexture = "solid";

    canvas.className = "tool-pen";

    // --- 2. 32 컬러 팔레트 생성 ---
    const paletteEl = document.getElementById('palette');
    const colors = [
        "#000000", "#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF", 
        "#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8B00FF", "#FF1493", "#8B4513", "#FFC0CB",
        "#FF9999", "#FFCC99", "#FFFF99", "#99FF99", "#99FFFF", "#9999FF", "#CC99FF", "#FF99FF",
        "#660000", "#663300", "#336600", "#003366", "#000066", "#330066", "#660033", "#555555"
    ];

    colors.forEach((hex, index) => {
        const chip = document.createElement('div');
        chip.className = 'color-chip' + (index === 6 ? ' selected' : '');
        chip.style.backgroundColor = hex;
        chip.setAttribute('data-color', hex);
        
        chip.addEventListener('click', (e) => {
            document.querySelectorAll('.color-chip').forEach(c => c.classList.remove('selected'));
            e.target.classList.add('selected');
            currentColor = e.target.getAttribute('data-color');
        });
        paletteEl.appendChild(chip);
    });

    // --- 3. 질감(Texture) 선택 설정 ---
    const textureButtons = document.querySelectorAll('.texture-btn');
    textureButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            textureButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentTexture = e.target.getAttribute('data-texture');
        });
    });

    // --- 4. 도구 선택 및 커서 변경 ---
    const toolButtons = document.querySelectorAll('.tool-btn');
    toolButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            toolButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentTool = e.target.getAttribute('data-tool');

            canvas.className = "";
            if (currentTool === 'pen') canvas.classList.add('tool-pen');
            else if (currentTool === 'colored-pencil') canvas.classList.add('tool-colored-pencil');
            else if (currentTool === 'bucket') canvas.classList.add('tool-bucket');
        });
    });

    // --- 5. 좌표 계산 ---
    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: Math.floor(clientX - rect.left),
            y: Math.floor(clientY - rect.top)
        };
    }

    // --- 6. 이벤트 핸들러 ---
    canvas.addEventListener('mousedown', handleActionStart);
    canvas.addEventListener('touchstart', (e) => { handleActionStart(e); e.preventDefault(); });

    function handleActionStart(e) {
        const pos = getPosition(e);

        if (currentTool === 'bucket') {
            try {
                floodFill(pos.x, pos.y, currentColor);
            } catch (err) {
                console.error("페인트 버킷 실행 오류:", err);
            }
        } else {
            isDrawing = true;
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            
            const moveHandler = (moveEvent) => {
                if (!isDrawing) return;
                const mPos = getPosition(moveEvent);
                drawStroke(mPos.x, mPos.y);
            };
            
            const upHandler = () => {
                isDrawing = false;
                ctx.closePath();
                window.removeEventListener('mousemove', moveHandler);
                window.removeEventListener('mouseup', upHandler);
            };

            window.addEventListener('mousemove', moveHandler);
            window.addEventListener('mouseup', upHandler);
        }
    }

    function drawStroke(x, y) {
        ctx.strokeStyle = currentColor;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (currentTexture === 'solid') {
            ctx.lineWidth = currentTool === 'colored-pencil' ? 3 : 8;
            ctx.globalAlpha = 1.0;
        } else if (currentTexture === 'crayon') {
            ctx.lineWidth = currentTool === 'colored-pencil' ? 5 : 10;
            ctx.globalAlpha = 0.7;
            ctx.setLineDash([2, 2]);
        } else if (currentTexture === 'watercolor') {
            ctx.lineWidth = currentTool === 'colored-pencil' ? 6 : 14;
            ctx.globalAlpha = 0.35;
            ctx.setLineDash([]);
        } else if (currentTexture === 'glow') {
            ctx.lineWidth = currentTool === 'colored-pencil' ? 4 : 10;
            ctx.globalAlpha = 0.9;
            ctx.shadowBlur = 8;
            ctx.shadowColor = currentColor;
            ctx.setLineDash([]);
        }

        ctx.lineTo(x, y);
        ctx.stroke();

        if (currentTexture !== 'glow') {
            ctx.shadowBlur = 0;
        }
        ctx.setLineDash([]);
    }

    function hexToRgba(hex) {
        if (hex.startsWith('#')) {
            let c = hex.substring(1);
            if (c.length === 3) c = c.split('').map(x => x + x).join('');
            const num = parseInt(c, 16);
            return [(num >> 16) & 255, (num >> 8) & 255, num & 255, 255];
        }
        return [255, 0, 0, 255];
    }

    // --- 7. 페인트 버킷 알고리즘 ---
    function floodFill(startX, startY, fillColorHex) {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const width = canvas.width;
        const height = canvas.height;

        const realX = Math.floor(startX * scale);
        const realY = Math.floor(startY * scale);

        if (realX < 0 || realX >= width || realY < 0 || realY >= height) return;

        const startIndex = (realY * width + realX) * 4;
        const startR = data[startIndex];
        const startG = data[startIndex + 1];
        const startB = data[startIndex + 2];

        const [fillR, fillG, fillB, fillA] = hexToRgba(fillColorHex);

        if (startR < 90 && startG < 90 && startB < 90) return;
        if (startR === fillR && startG === fillG && startB === fillB) return;

        const queue = [[realX, realY]];
        const visited = new Uint8Array(width * height);

        while (queue.length > 0) {
            const [x, y] = queue.pop();
            const idx = y * width + x;

            if (x < 0 || x >= width || y < 0 || y >= height) continue;
            if (visited[idx]) continue;

            const pixelPos = (y * width + x) * 4;
            const r = data[pixelPos];
            const g = data[pixelPos + 1];
            const b = data[pixelPos + 2];

            if (r < 90 && g < 90 && b < 90) continue;
            if (Math.abs(r - startR) > 40 || Math.abs(g - startG) > 40 || Math.abs(b - startB) > 40) continue;

            visited[idx] = 1;

            data[pixelPos] = fillR;
            data[pixelPos + 1] = fillG;
            data[pixelPos + 2] = fillB;
            data[pixelPos + 3] = fillA;

            queue.push([x + 1, y]);
            queue.push([x - 1, y]);
            queue.push([x, y + 1]);
            queue.push([x, y - 1]);
        }

        ctx.putImageData(imgData, 0, 0);
    }
});
