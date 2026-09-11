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

    // --- 1. 만 5세 수준의 정교하고 풍성한 30가지 밑그림 목록 정의 ---
    const sketchTitles = [
        "1. 생일 파티 케이크", "2. 우주 탐험 로켓", "3. 바닷속 인어공주", "4. 소풍 가는 동물들", "5. 마법의 성",
        "6. 알록달록 공룡", "7. 숲속의 요정집", "8. 꿀벌과 해바라기", "9. 신나는 놀이공원", "10. 캠핑카 여행",
        "11. 귀여운 강아지 집", "12. 무지개와 구름", "13. 보물섬 해적선", "14. 사파리 사자", "15. 예쁜 공주님 드레스",
        "16. 튼튼한 소방차", "17. 알록달록 나비 정원", "18. 눈사람과 겨울나라", "19. 우주 정거장", "20. 맛있는 피자가게",
        "21. 꼬마 마법사", "22. 곰돌이의 다이어리", "23. 펭귄의 빙하 슬라이드", "24. 공중제비 돌고래", "25. 로봇 친구",
        "26. 신비로운 유니콘", "27. 하늘을 나는 열기구", "28. 알록달록 앵무새", "29. 신나는 기차 여행", "30. 반짝반짝 밤하늘"
    ];

    const sketches = sketchTitles.map((title, index) => ({
        id: index + 1,
        name: title
    }));

    const sketchGrid = document.getElementById('sketch-grid');
    sketches.forEach((sketch, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'sketch-thumb' + (index === 0 ? ' selected' : '');
        thumb.innerHTML = `<span>🎨</span><span style="font-size:10px; margin-top:2px;">${sketch.id}번</span>`;
        thumb.title = sketch.name;
        
        thumb.addEventListener('click', () => {
            document.querySelectorAll('.sketch-thumb').forEach(t => t.classList.remove('selected'));
            thumb.classList.add('selected');
            drawAdvancedSketch(sketch.id);
        });
        sketchGrid.appendChild(thumb);
    });

    // 만 5세 수준의 디테일하고 다양한 밑그림 렌더링 함수
    function drawAdvancedSketch(id) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, displayWidth, displayHeight);

        ctx.strokeStyle = "#222222";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.save();

        if (id % 5 === 1) {
            // 1. 생일 파티 케이크 (3단 케이크와 촛불, 별 장식)
            // 1단 케이크
            ctx.strokeRect(200, 300, 200, 100);
            // 2단 케이크
            ctx.strokeRect(230, 200, 140, 100);
            // 3단 케이크
            ctx.strokeRect(260, 120, 80, 80);
            // 촛불
            ctx.beginPath(); ctx.rect(295, 80, 10, 40); ctx.stroke();
            // 불꽃
            ctx.beginPath(); ctx.ellipse(300, 65, 10, 18, 0, 0, Math.PI * 2); ctx.stroke();
            // 크림 장식 (곡선)
            ctx.beginPath(); ctx.arc(235, 300, 15, 0, Math.PI); ctx.stroke();
            ctx.beginPath(); ctx.arc(265, 300, 15, 0, Math.PI); ctx.stroke();
            ctx.beginPath(); ctx.arc(295, 300, 15, 0, Math.PI); ctx.stroke();
            ctx.beginPath(); ctx.arc(325, 300, 15, 0, Math.PI); ctx.stroke();
            ctx.beginPath(); ctx.arc(355, 300, 15, 0, Math.PI); ctx.stroke();
        } else if (id % 5 === 2) {
            // 2. 우주 탐험 로켓 (거대한 로켓과 창문, 별, 행성)
            // 로켓 몸체
            ctx.beginPath(); ctx.moveTo(300, 80); ctx.lineTo(370, 220); ctx.lineTo(370, 350); ctx.lineTo(230, 350); ctx.lineTo(230, 220); ctx.closePath(); ctx.stroke();
            // 로켓 창문
            ctx.beginPath(); ctx.arc(300, 200, 25, 0, Math.PI * 2); ctx.stroke();
            // 날개 (좌우)
            ctx.beginPath(); ctx.moveTo(230, 270); ctx.lineTo(180, 340); ctx.lineTo(230, 340); ctx.closePath(); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(370, 270); ctx.lineTo(420, 340); ctx.lineTo(370, 340); ctx.closePath(); ctx.stroke();
            // 불꽃
            ctx.beginPath(); ctx.moveTo(260, 350); ctx.lineTo(300, 410); ctx.lineTo(340, 350); ctx.closePath(); ctx.stroke();
            // 주변 행성
            ctx.beginPath(); ctx.arc(120, 150, 35, 0, Math.PI * 2); ctx.stroke();
            // 토성과 고리
            ctx.beginPath(); ctx.arc(480, 250, 25, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.ellipse(480, 250, 50, 15, 0.3, 0, Math.PI * 2); ctx.stroke();
        } else if (id % 5 === 3) {
            // 3. 바닷속 인어공주 / 바다 탐험 (물고기, 산호초, 해초)
            // 물고기 1
            ctx.beginPath(); ctx.ellipse(200, 200, 40, 25, 0, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(160, 200); ctx.lineTo(130, 175); ctx.lineTo(130, 225); ctx.closePath(); ctx.stroke();
            // 물고기 눈
            ctx.beginPath(); ctx.arc(215, 195, 4, 0, Math.PI * 2); ctx.fillStyle="#222"; ctx.fill();
            // 산호초 및 해초들
            ctx.beginPath(); ctx.moveTo(100, 400); ctx.quadraticCurveTo(120, 300, 90, 250); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(130, 400); ctx.quadraticCurveTo(150, 280, 120, 230); ctx.stroke();
            ctx.beginPath(); ctx.arc(400, 280, 60, 0, Math.PI * 2); ctx.stroke(); // 큰 물방울 또는 거품
        } else if (id % 5 === 4) {
            // 4. 소풍 가는 동물들 (귀여운 곰돌이와 토끼, 피크닉 바구니)
            // 곰돌이 얼굴
            ctx.beginPath(); ctx.arc(220, 220, 60, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.arc(175, 160, 25, 0, Math.PI * 2); ctx.stroke(); // 왼쪽 귀
            ctx.beginPath(); ctx.arc(265, 160, 25, 0, Math.PI * 2); ctx.stroke(); // 오른쪽 귀
            // 토끼 얼굴
            ctx.beginPath(); ctx.arc(380, 240, 55, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.ellipse(360, 130, 15, 50, -0.2, 0, Math.PI * 2); ctx.stroke(); // 왼쪽 귀
            ctx.beginPath(); ctx.ellipse(400, 130, 15, 50, 0.2, 0, Math.PI * 2); ctx.stroke(); // 오른쪽 귀
            // 피크닉 바구니
            ctx.beginPath(); ctx.rect(270, 310, 60, 50); ctx.stroke();
            ctx.beginPath(); ctx.arc(300, 310, 30, Math.PI, Math.PI * 2); ctx.stroke();
        } else {
            // 5. 마법의 성 (웅장한 성과 성벽, 깃발)
            // 중앙 타워
            ctx.strokeRect(260, 150, 80, 200);
            // 중앙 지붕 (삼각형)
            ctx.beginPath(); ctx.moveTo(250, 150); ctx.lineTo(300, 80); ctx.lineTo(350, 150); ctx.closePath(); ctx.stroke();
            // 왼쪽 타워
            ctx.strokeRect(170, 200, 60, 150);
            ctx.beginPath(); ctx.moveTo(160, 200); ctx.lineTo(200, 140); ctx.lineTo(240, 200); ctx.closePath(); ctx.stroke();
            // 오른쪽 타워
            ctx.strokeRect(370, 200, 60, 150);
            ctx.beginPath(); ctx.moveTo(360, 200); ctx.lineTo(400, 140); ctx.lineTo(440, 200); ctx.closePath(); ctx.stroke();
            // 아치형 성문
            ctx.beginPath(); ctx.arc(300, 350, 25, Math.PI, 0, true); ctx.lineTo(325, 350); ctx.lineTo(275, 350); ctx.closePath(); ctx.stroke();
        }

        ctx.restore();
    }

    // 첫 번째 도안 기본 로드
    drawAdvancedSketch(1);

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
