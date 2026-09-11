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

    // --- 1. 30가지 정밀 밑그림 목록 정의 ---
    const sketchTitles = [
        "1. 귀여운 고양이", "2. 몽실이 강아지", "3. 삐요삐요 병아리", "4. 숲속의 토끼", "5. 꿀벌 버즈",
        "6. 헤엄치는 물고기", "7. 싱그러운 사과", "8. 달콤한 아이스크림", "9. 빵실빵실 곰돌이", "10. 알록달록 나비",
        "11. 멋진 자동차", "12. 슝슝 로켓", "13. 둥실구름 해님", "14. 예쁜 꽃밭", "15. 아기 오리",
        "16. 꿀꿀이 돼지", "17. 느림보 거북이", "18. 롱롱이 기린", "19. 씩씩한 사자", "20. 알록달록 우산",
        "21. 반짝반짝 별", "22. 동글동글 눈사람", "23. 튼튼한 집", "24. 맛있는 케이크", "25. 삐에로 모자",
        "26. 통통 버섯", "27. 꼬마 유령", "28. 룰루랄라 오리", "29. 하트 가득 선물", "30. 무지개 섬"
    ];

    const sketchSelect = document.getElementById('sketch-select');
    sketchTitles.forEach((title, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = title;
        sketchSelect.appendChild(option);
    });

    // --- 2. 30가지 개별 드로잉 함수 ---
    function drawSketch(id) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, displayWidth, displayHeight);

        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.save();

        switch (id) {
            case 1: // 고양이
                ctx.beginPath(); ctx.arc(300, 220, 100, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(220, 140); ctx.lineTo(180, 70); ctx.lineTo(250, 110); ctx.closePath(); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(380, 140); ctx.lineTo(420, 70); ctx.lineTo(350, 110); ctx.closePath(); ctx.stroke();
                ctx.beginPath(); ctx.arc(265, 190, 12, 0, Math.PI * 2); ctx.fillStyle="#000"; ctx.fill();
                ctx.beginPath(); ctx.arc(335, 190, 12, 0, Math.PI * 2); ctx.fillStyle="#000"; ctx.fill();
                ctx.beginPath(); ctx.moveTo(295, 220); ctx.lineTo(305, 220); ctx.lineTo(300, 230); ctx.closePath(); ctx.fillStyle="#000"; ctx.fill();
                ctx.beginPath(); ctx.arc(300, 235, 15, 0, Math.PI); ctx.stroke();
                break;
            case 2: // 강아지
                ctx.beginPath(); ctx.arc(300, 230, 95, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(205, 210, 25, 55, 0.3, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(395, 210, 25, 55, -0.3, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(265, 200, 10, 0, Math.PI * 2); ctx.fillStyle="#000"; ctx.fill();
                ctx.beginPath(); ctx.arc(335, 200, 10, 0, Math.PI * 2); ctx.fillStyle="#000"; ctx.fill();
                ctx.beginPath(); ctx.arc(300, 230, 18, 0, Math.PI * 2); ctx.fillStyle="#000"; ctx.fill();
                break;
            case 3: // 병아리
                ctx.beginPath(); ctx.arc(300, 250, 70, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 160, 50, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(280, 150, 8, 0, Math.PI * 2); ctx.fillStyle="#000"; ctx.fill();
                ctx.beginPath(); ctx.arc(320, 150, 8, 0, Math.PI * 2); ctx.fillStyle="#000"; ctx.fill();
                ctx.beginPath(); ctx.moveTo(290, 170); ctx.lineTo(310, 170); ctx.lineTo(300, 190); ctx.closePath(); ctx.stroke();
                break;
            case 4: // 토끼
                ctx.beginPath(); ctx.arc(300, 250, 90, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(265, 110, 20, 75, -0.1, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(335, 110, 20, 75, 0.1, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(265, 230, 10, 0, Math.PI * 2); ctx.fillStyle="#000"; ctx.fill();
                ctx.beginPath(); ctx.arc(335, 230, 10, 0, Math.PI * 2); ctx.fillStyle="#000"; ctx.fill();
                break;
            case 5: // 꿀벌
                ctx.beginPath(); ctx.ellipse(300, 220, 60, 85, Math.PI/2, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(230, 220, 35, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(280, 140, 25, 45, -0.4, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(330, 140, 25, 45, 0.4, 0, Math.PI * 2); ctx.stroke();
                break;
            case 6: // 물고기
                ctx.beginPath(); ctx.ellipse(300, 225, 90, 60, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(390, 225); ctx.lineTo(450, 175); ctx.lineTo(450, 275); ctx.closePath(); ctx.stroke();
                ctx.beginPath(); ctx.arc(250, 210, 10, 0, Math.PI * 2); ctx.fillStyle="#000"; ctx.fill();
                break;
            case 7: // 사과
                ctx.beginPath(); ctx.arc(300, 240, 85, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(300, 155); ctx.quadraticCurveTo(340, 110, 320, 90); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(335, 105, 20, 10, 0.5, 0, Math.PI * 2); ctx.stroke();
                break;
            case 8: // 아이스크림
                ctx.beginPath(); ctx.moveTo(300, 360); ctx.lineTo(240, 210); ctx.lineTo(360, 210); ctx.closePath(); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 200, 75, Math.PI, Math.PI * 2); ctx.stroke();
                break;
            case 9: // 곰돌이
                ctx.beginPath(); ctx.arc(300, 230, 95, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(220, 140, 30, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(380, 140, 30, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(260, 210, 10, 0, Math.PI * 2); ctx.fillStyle="#000"; ctx.fill();
                ctx.beginPath(); ctx.arc(340, 210, 10, 0, Math.PI * 2); ctx.fillStyle="#000"; ctx.fill();
                break;
            case 10: // 나비
                ctx.beginPath(); ctx.ellipse(300, 225, 12, 70, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(230, 180, 55, 75, -0.5, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(370, 180, 55, 75, 0.5, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(240, 280, 45, 55, 0.5, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(360, 280, 45, 55, -0.5, 0, Math.PI * 2); ctx.stroke();
                break;
            case 11: // 자동차
                ctx.beginPath(); ctx.rect(200, 230, 200, 75); ctx.stroke();
                ctx.beginPath(); ctx.arc(245, 305, 30, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(355, 305, 30, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(230, 230); ctx.lineTo(265, 175); ctx.lineTo(335, 175); ctx.lineTo(370, 230); ctx.closePath(); ctx.stroke();
                break;
            case 12: // 로켓
                ctx.beginPath(); ctx.moveTo(300, 100); ctx.lineTo(360, 240); ctx.lineTo(340, 330); ctx.lineTo(260, 330); ctx.lineTo(240, 240); ctx.closePath(); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 220, 25, 0, Math.PI * 2); ctx.stroke();
                break;
            case 13: // 해님
                ctx.beginPath(); ctx.arc(300, 225, 65, 0, Math.PI * 2); ctx.stroke();
                for(let i=0; i<8; i++) {
                    let angle = (i * Math.PI) / 4;
                    let x1 = 300 + Math.cos(angle) * 85;
                    let y1 = 225 + Math.sin(angle) * 85;
                    let x2 = 300 + Math.cos(angle) * 115;
                    let y2 = 225 + Math.sin(angle) * 115;
                    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
                }
                break;
            case 14: // 꽃밭
                ctx.beginPath(); ctx.arc(300, 175, 35, 0, Math.PI * 2); ctx.stroke();
                for(let i=0; i<6; i++) {
                    let angle = (i * Math.PI) / 3;
                    let cx = 300 + Math.cos(angle) * 40;
                    let cy = 175 + Math.sin(angle) * 40;
                    ctx.beginPath(); ctx.arc(cx, cy, 25, 0, Math.PI * 2); ctx.stroke();
                }
                ctx.beginPath(); ctx.moveTo(300, 210); ctx.lineTo(300, 350); ctx.stroke();
                break;
            case 15: // 아기 오리
                ctx.beginPath(); ctx.arc(300, 250, 60, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(350, 180, 40, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(360, 175, 6, 0, Math.PI * 2); ctx.fillStyle="#000"; ctx.fill();
                ctx.beginPath(); ctx.moveTo(390, 180); ctx.lineTo(420, 175); ctx.lineTo(390, 190); ctx.closePath(); ctx.stroke();
                break;
            case 16: // 돼지
                ctx.beginPath(); ctx.arc(300, 225, 85, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(300, 240, 30, 20, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(250, 155, 20, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(350, 155, 20, 0, Math.PI * 2); ctx.stroke();
                break;
            case 17: // 거북이
                ctx.beginPath(); ctx.ellipse(300, 225, 85, 65, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(400, 225, 30, 0, Math.PI * 2); ctx.stroke();
                break;
            case 18: // 기린
                ctx.beginPath(); ctx.rect(275, 175, 50, 175); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 140, 45, 0, Math.PI * 2); ctx.stroke();
                break;
            case 19: // 사자
                ctx.beginPath(); ctx.arc(300, 225, 105, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 225, 65, 0, Math.PI * 2); ctx.stroke();
                break;
            case 20: // 우산
                ctx.beginPath(); ctx.arc(300, 200, 95, Math.PI, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(300, 200); ctx.lineTo(300, 340); ctx.stroke();
                ctx.beginPath(); ctx.arc(285, 340, 15, 0, Math.PI); ctx.stroke();
                break;
            case 21: // 별
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    let angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
                    let x = 300 + Math.cos(angle) * 85;
                    let y = 225 + Math.sin(angle) * 85;
                    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                }
                ctx.closePath(); ctx.stroke();
                break;
            case 22: // 눈사람
                ctx.beginPath(); ctx.arc(300, 275, 75, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 160, 50, 0, Math.PI * 2); ctx.stroke();
                break;
            case 23: // 집
                ctx.beginPath(); ctx.rect(220, 200, 160, 150); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(200, 200); ctx.lineTo(300, 100); ctx.lineTo(400, 200); ctx.closePath(); ctx.stroke();
                ctx.beginPath(); ctx.rect(270, 260, 60, 90); ctx.stroke();
                break;
            case 24: // 케이크
                ctx.beginPath(); ctx.rect(220, 230, 160, 110); ctx.stroke();
                ctx.beginPath(); ctx.rect(250, 160, 100, 70); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(300, 160); ctx.lineTo(300, 120); ctx.stroke();
                break;
            case 25: // 모자
                ctx.beginPath(); ctx.ellipse(300, 300, 110, 25, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(215, 290); ctx.lineTo(260, 130); ctx.lineTo(340, 130); ctx.lineTo(385, 290); ctx.closePath(); ctx.stroke();
                break;
            case 26: // 버섯
                ctx.beginPath(); ctx.arc(300, 190, 85, Math.PI, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.rect(270, 190, 60, 130); ctx.stroke();
                break;
            case 27: // 유령
                ctx.beginPath(); ctx.arc(300, 190, 75, Math.PI, Math.PI * 2);
                ctx.lineTo(375, 330); ctx.lineTo(350, 310); ctx.lineTo(325, 330); ctx.lineTo(300, 310); ctx.lineTo(275, 330); ctx.lineTo(250, 310); ctx.lineTo(225, 330);
                ctx.closePath(); ctx.stroke();
                break;
            case 28: // 오리
                ctx.beginPath(); ctx.ellipse(300, 250, 75, 55, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(350, 170, 35, 0, Math.PI * 2); ctx.stroke();
                break;
            case 29: // 선물
                ctx.beginPath(); ctx.rect(225, 200, 150, 150); ctx.stroke();
                ctx.beginPath(); ctx.rect(210, 175, 180, 30); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(300, 350); ctx.lineTo(300, 200); ctx.stroke();
                break;
            case 30: // 무지개 섬
                ctx.beginPath(); ctx.arc(300, 280, 110, Math.PI, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 280, 85, Math.PI, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 280, 60, Math.PI, Math.PI * 2); ctx.stroke();
                break;
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

    // --- 3. 32 컬러 팔레트 생성 ---
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

    // --- 4. 질감(Texture) 선택 설정 ---
    const textureButtons = document.querySelectorAll('.texture-btn');
    textureButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            textureButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentTexture = e.target.getAttribute('data-texture');
        });
    });

    // --- 5. 도구 선택 및 커서 변경 ---
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

    // --- 6. 좌표 계산 ---
    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: Math.floor(clientX - rect.left),
            y: Math.floor(clientY - rect.top)
        };
    }

    // --- 7. 이벤트 핸들러 ---
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

    // --- 8. 페인트 버킷 알고리즘 ---
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
