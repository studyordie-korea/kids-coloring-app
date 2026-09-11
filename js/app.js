window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('coloringCanvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    // 고해상도(Retina) 선명도 개선
    const scale = 2;
    const displayWidth = 600;
    const displayHeight = 450;

    canvas.width = displayWidth * scale;
    canvas.height = displayHeight * scale;
    ctx.scale(scale, scale);

    // --- 1. 동화책 삽화풍의 30가지 테마 정의 ---
    const sketchTitles = [
        "1. 달빛 아래 곰돌이의 독서", "2. 토끼의 마법 오페라 하우스", "3. 별을 따는 어린 왕자", "4. 숲속 요정의 찻집", "5. 구름 위 하늘성",
        "6. 아기 고양이의 비밀 정원", "7. 모험가의 신비로운 텐트", "8. 해바라기 마을의 우체부", "9. 밤하늘의 회전목마", "10. 호숫가의 작은 오뚝이 집",
        "11. 강아지와 무지개 다리", "12. 뭉게구름 타고 온 아기새", "13. 보물지도를 펼친 해적 곰", "14. 사파리 나들이의 기린", "15. 요정들의 무도회장",
        "16. 꼬마 소방관의 구름 사다리", "17. 나비가 앉은 장미 아치", "18. 눈 오는 날의 스노우하우스", "19. 우주 탐험가의 유리 돔", "20. 숲속의 갓 구운 빵집",
        "21. 마법사의 신비로운 물약병", "22. 도토리 도서관의 책꽂이", "23. 빙하 미끄럼틀의 펭귄들", "24. 바다 위를 나는 돌고래", "25. 로봇 친구와 꽃다발",
        "26. 신비로운 유니콘의 호수", "27. 노을 지는 하늘 열기구", "28. 정글 나무 위의 앵무새 가족", "29. 꼬마 기관차의 숲속 여행", "30. 밤하늘 별자리 동화"
    ];

    const sketches = sketchTitles.map((title, index) => ({
        id: index + 1,
        name: title
    }));

    const sketchGrid = document.getElementById('sketch-grid');
    sketches.forEach((sketch, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'sketch-thumb' + (index === 0 ? ' selected' : '');
        thumb.innerHTML = `<span>📖</span><span style="font-size:9px; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%;">${sketch.id}번</span>`;
        thumb.title = sketch.name;
        
        thumb.addEventListener('click', () => {
            document.querySelectorAll('.sketch-thumb').forEach(t => t.classList.remove('selected'));
            thumb.classList.add('selected');
            drawStorybookSketch(sketch.id);
        });
        sketchGrid.appendChild(thumb);
    });

    // 동화책 삽화풍 외곽선 렌더링 함수
    function drawStorybookSketch(id) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, displayWidth, displayHeight);

        ctx.strokeStyle = "#2C2C2C";
        ctx.lineWidth = 2.2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.save();

        switch (id) {
            case 1:
                ctx.beginPath(); ctx.arc(300, 180, 100, 0.5, Math.PI * 1.5); ctx.quadraticCurveTo(240, 180, 300, 280); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 320, 45, Math.PI, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(250, 360); ctx.quadraticCurveTo(300, 340, 350, 360); ctx.stroke();
                break;
            case 2:
                ctx.beginPath(); ctx.arc(300, 230, 120, Math.PI, 0, false); ctx.lineTo(420, 380); ctx.lineTo(180, 380); ctx.closePath(); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(180, 260); ctx.quadraticCurveTo(210, 320, 180, 380); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(420, 260); ctx.quadraticCurveTo(390, 320, 420, 380); ctx.stroke();
                break;
            case 3:
                ctx.beginPath(); ctx.moveTo(100, 360); ctx.quadraticCurveTo(300, 280, 500, 360); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(280, 320); ctx.lineTo(310, 160); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(290, 300); ctx.lineTo(320, 140); ctx.stroke();
                for(let pt of [[320, 130], [380, 180], [250, 200]]) {
                    ctx.beginPath(); ctx.moveTo(pt[0], pt[1]-12); ctx.lineTo(pt[0], pt[1]+12); ctx.moveTo(pt[0]-12, pt[1]); ctx.lineTo(pt[0]+12, pt[1]); ctx.stroke();
                }
                break;
            case 4:
                ctx.beginPath(); ctx.moveTo(180, 240); ctx.quadraticCurveTo(300, 140, 420, 240); ctx.quadraticCurveTo(300, 270, 180, 240); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 280, 25, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 280, 18, 0, Math.PI * 2); ctx.stroke();
                break;
            case 5:
                ctx.beginPath(); ctx.arc(220, 340, 45, Math.PI * 0.8, Math.PI * 1.9); ctx.arc(280, 320, 55, Math.PI * 0.9, Math.PI * 2.1); ctx.arc(370, 340, 50, Math.PI * 0.8, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(250, 300); ctx.lineTo(250, 180); ctx.lineTo(275, 150); ctx.lineTo(300, 180); ctx.lineTo(300, 300); ctx.stroke();
                break;
            case 6:
                ctx.beginPath(); ctx.arc(300, 250, 130, Math.PI, 0, false); ctx.lineTo(430, 380); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 250, 100, Math.PI, 0, false); ctx.lineTo(400, 380); ctx.stroke();
                break;
            case 7:
                ctx.beginPath(); ctx.moveTo(300, 140); ctx.lineTo(200, 360); ctx.lineTo(400, 360); ctx.closePath(); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(300, 140); ctx.quadraticCurveTo(270, 260, 270, 360); ctx.stroke();
                break;
            case 8:
                ctx.beginPath(); ctx.arc(300, 220, 50, 0, Math.PI * 2); ctx.stroke();
                for(let i=0; i<8; i++) {
                    let a = (i * Math.PI) / 4;
                    ctx.beginPath(); ctx.ellipse(300 + Math.cos(a)*75, 220 + Math.sin(a)*75, 30, 18, a, 0, Math.PI * 2); ctx.stroke();
                }
                break;
            case 9:
                ctx.beginPath(); ctx.moveTo(180, 180); ctx.lineTo(300, 110); ctx.lineTo(420, 180); ctx.quadraticCurveTo(300, 210, 180, 180); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(220, 180); ctx.lineTo(220, 340); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(380, 180); ctx.lineTo(380, 340); ctx.stroke();
                break;
            case 10:
                ctx.beginPath(); ctx.moveTo(200, 230); ctx.lineTo(300, 150); ctx.lineTo(400, 230); ctx.stroke();
                ctx.beginPath(); ctx.rect(220, 230, 160, 130); ctx.stroke();
                break;
            case 11:
                for(let r of [160, 135, 110]) {
                    ctx.beginPath(); ctx.arc(300, 360, r, Math.PI, 0, false); ctx.stroke();
                }
                break;
            case 12:
                ctx.beginPath(); ctx.arc(220, 280, 60, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(310, 240, 75, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(400, 280, 55, 0, Math.PI * 2); ctx.stroke();
                break;
            case 13:
                ctx.beginPath(); ctx.moveTo(180, 200); ctx.quadraticCurveTo(300, 150, 420, 200); ctx.quadraticCurveTo(450, 280, 420, 340); ctx.quadraticCurveTo(300, 390, 180, 340); ctx.quadraticCurveTo(150, 280, 180, 200); ctx.stroke();
                break;
            case 14:
                ctx.beginPath(); ctx.moveTo(260, 380); ctx.quadraticCurveTo(240, 250, 320, 150); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(310, 380); ctx.quadraticCurveTo(310, 260, 360, 150); ctx.stroke();
                break;
            case 15:
                ctx.beginPath(); ctx.arc(300, 120, 70, 0, Math.PI, false); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(250, 120); ctx.lineTo(350, 120); ctx.stroke();
                break;
            case 16:
                ctx.beginPath(); ctx.moveTo(250, 120); ctx.lineTo(250, 380); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(350, 120); ctx.lineTo(350, 380); ctx.stroke();
                for(let y=160; y<360; y+=40) {
                    ctx.beginPath(); ctx.moveTo(250, y); ctx.lineTo(350, y); ctx.stroke();
                }
                break;
            case 17:
                ctx.beginPath(); ctx.arc(230, 250, 90, Math.PI * 0.5, Math.PI * 1.8); ctx.stroke();
                ctx.beginPath(); ctx.arc(370, 250, 90, Math.PI * 1.2, Math.PI * 2.5); ctx.stroke();
                break;
            case 18:
                ctx.beginPath(); ctx.arc(300, 330, 120, Math.PI, 0, false); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 330, 80, Math.PI, 0, false); ctx.stroke();
                break;
            case 19:
                ctx.beginPath(); ctx.arc(300, 340, 140, Math.PI, 0, false); ctx.lineTo(440, 360); ctx.lineTo(160, 360); ctx.closePath(); ctx.stroke();
                break;
            case 20:
                ctx.beginPath(); ctx.arc(300, 260, 110, Math.PI, 0, false); ctx.lineTo(410, 370); ctx.lineTo(190, 370); ctx.closePath(); ctx.stroke();
                break;
            case 21:
                ctx.beginPath(); ctx.arc(300, 270, 70, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.rect(285, 150, 30, 50); ctx.stroke();
                break;
            case 22:
                ctx.beginPath(); ctx.moveTo(170, 120); ctx.quadraticCurveTo(300, 90, 430, 120); ctx.lineTo(430, 380); ctx.lineTo(170, 380); ctx.closePath(); ctx.stroke();
                break;
            case 23:
                ctx.beginPath(); ctx.moveTo(160, 180); ctx.quadraticCurveTo(280, 240, 440, 360); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(160, 220); ctx.quadraticCurveTo(300, 280, 440, 400); ctx.stroke();
                break;
            case 24:
                ctx.beginPath(); ctx.moveTo(140, 320); ctx.quadraticCurveTo(300, 180, 460, 320); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(300, 240, 75, 35, -0.3, 0, Math.PI * 2); ctx.stroke();
                break;
            case 25:
                ctx.beginPath(); ctx.roundRect(240, 160, 120, 90, [20]); ctx.stroke();
                ctx.beginPath(); ctx.roundRect(210, 265, 180, 110, [25]); ctx.stroke();
                break;
            case 26:
                ctx.beginPath(); ctx.ellipse(270, 250, 85, 50, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(370, 180, 38, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(385, 145); ctx.lineTo(420, 90); ctx.lineTo(395, 140); ctx.closePath(); ctx.stroke();
                break;
            case 27:
                ctx.beginPath(); ctx.arc(300, 190, 95, Math.PI * 0.8, Math.PI * 2.2, false); ctx.quadraticCurveTo(300, 310, 300, 310); ctx.closePath(); ctx.stroke();
                break;
            case 28:
                ctx.beginPath(); ctx.moveTo(280, 120); ctx.quadraticCurveTo(340, 240, 260, 380); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(330, 120); ctx.quadraticCurveTo(390, 240, 310, 380); ctx.stroke();
                break;
            case 29:
                ctx.beginPath(); ctx.roundRect(180, 210, 150, 120, [15]); ctx.stroke();
                ctx.beginPath(); ctx.roundRect(350, 230, 100, 100, [15]); ctx.stroke();
                break;
            case 30:
                let prevX = 150, prevY = 200;
                for(let i=0; i<6; i++) {
                    let nx = 180 + i * 60;
                    let ny = 160 + Math.sin(i * 1.2) * 90;
                    ctx.beginPath(); ctx.arc(nx, ny, 8, 0, Math.PI * 2); ctx.stroke();
                    if(i > 0) {
                        ctx.beginPath(); ctx.moveTo(prevX, prevY); ctx.lineTo(nx, ny); ctx.stroke();
                    }
                    prevX = nx; prevY = ny;
                }
                break;
            default:
                ctx.strokeRect(200, 180, 200, 150);
                break;
        }

        ctx.restore();
    }

    drawStorybookSketch(1);

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

    // --- 3. 질감 선택 설정 ---
    const textureButtons = document.querySelectorAll('.texture-btn');
    textureButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            textureButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentTexture = e.target.getAttribute('data-texture');
        });
    });

    // --- 4. 도구 선택 ---
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

    // --- 5. 마우스 및 터치 좌표 계산 함수 ---
    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;

        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
            clientX = e.changedTouches[0].clientX;
            clientY = e.changedTouches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        return {
            x: Math.floor(clientX - rect.left),
            y: Math.floor(clientY - rect.top)
        };
    }

    // --- 6. 드로잉 및 페인트 버킷 액션 통합 핸들러 (PC/모바일 지원) ---
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
            
            const upHandler = (upEvent) => {
                if (!isDrawing) return;
                isDrawing = false;
                ctx.closePath();
                window.removeEventListener('mousemove', moveHandler);
                window.removeEventListener('mouseup', upHandler);
                window.removeEventListener('touchmove', moveHandler);
                window.removeEventListener('touchend', upHandler);
            };

            // 마우스 이벤트 바인딩
            window.addEventListener('mousemove', moveHandler);
            window.addEventListener('mouseup', upHandler);
            // 터치 이벤트 바인딩 (모바일 드로잉 완벽 지원)
            window.addEventListener('touchmove', moveHandler, { passive: false });
            window.addEventListener('touchend', upHandler);
        }
    }

    // 마우스 및 터치 이벤트 리스너 등록
    canvas.addEventListener('mousedown', handleActionStart);
    canvas.addEventListener('touchstart', (e) => {
        handleActionStart(e);
        e.preventDefault(); // 화면 스크롤 방지 및 원활한 드로잉 보장
    }, { passive: false });

    function drawStroke(x, y) {
        ctx.strokeStyle = currentColor;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (currentTexture === 'solid') {
            ctx.lineWidth = currentTool === 'colored-pencil' ? 2 : 6;
            ctx.globalAlpha = 1.0;
        } else if (currentTexture === 'crayon') {
            ctx.lineWidth = currentTool === 'colored-pencil' ? 4 : 8;
            ctx.globalAlpha = 0.7;
            ctx.setLineDash([2, 2]);
        } else if (currentTexture === 'watercolor') {
            ctx.lineWidth = currentTool === 'colored-pencil' ? 5 : 12;
            ctx.globalAlpha = 0.35;
            ctx.setLineDash([]);
        } else if (currentTexture === 'glow') {
            ctx.lineWidth = currentTool === 'colored-pencil' ? 3 : 8;
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
