window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('coloringCanvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    canvas.width = 600;
    canvas.height = 430;

    let isDrawing = false;
    let currentColor = "#FF0000";
    let currentTool = "pen";
    let currentPattern = "solid"; // solid, stripe, dot, grid

    canvas.className = "tool-pen";

    // --- 1. 30가지 밑그림 정의 (아이콘 및 그리기 함수) ---
    const templates = [
        { name: "고양이", icon: "🐱", draw: drawCat },
        { name: "강아지", icon: "🐶", draw: drawDog },
        { name: "토끼", icon: "🐰", draw: drawRabbit },
        { name: "곰돌이", icon: "🐻", draw: drawBear },
        { name: "팬더", icon: "🐼", draw: drawPanda },
        { name: "여우", icon: "🦊", draw: drawFox },
        { name: "사자", icon: "🦁", draw: drawLion },
        { name: "호랑이", icon: "🐯", draw: drawTiger },
        { name: "유니콘", icon: "🦄", draw: drawUnicorn },
        { name: "돼지", icon: "🐷", draw: drawPig },
        { name: "개구리", icon: "🐸", draw: drawFrog },
        { name: "병아리", icon: "🐥", draw: drawChick },
        { name: "물고기", icon: "🐠", draw: drawFish },
        { name: "고래", icon: "🐳", draw: drawWhale },
        { name: "문어", icon: "🐙", draw: drawOctopus },
        { name: "나비", icon: "🦋", draw: drawButterfly },
        { name: "벌", icon: "🐝", draw: drawBee },
        { name: "꽃", icon: "🌻", draw: drawFlower },
        { name: "나무", icon: "🌳", draw: drawTree },
        { name: "버섯", icon: "🍄", draw: drawMushroom },
        { name: "집", icon: "🏠", draw: drawHouse },
        { name: "자동차", icon: "🚗", draw: drawCar },
        { name: "기차", icon: "🚂", draw: drawTrain },
        { name: "로켓", icon: "🚀", draw: drawRocket },
        { name: "별", icon: "⭐", draw: drawStarShape },
        { name: "하트", icon: "💖", draw: drawHeartShape },
        { name: "아이스크림", icon: "🍦", draw: drawIcecream },
        { name: "케이크", icon: "🎂", draw: drawCake },
        { name: "사과", icon: "🍎", draw: drawApple },
        { name: "공룡", icon: "🦖", draw: drawDino }
    ];

    const templateListEl = document.getElementById('template-list');
    templates.forEach((tmpl, idx) => {
        const btn = document.createElement('button');
        btn.className = 'template-btn';
        btn.textContent = tmpl.icon;
        btn.title = tmpl.name;
        btn.addEventListener('click', () => {
            loadTemplate(tmpl.draw);
        });
        templateListEl.appendChild(btn);
    });

    // 캔버스 초기화 및 밑그림 그리기 공통 함수
    function loadTemplate(drawFunc) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        drawFunc(ctx, canvas.width, canvas.height);
    }

    // 기본 첫 번째 밑그림(고양이) 자동 로드
    loadTemplate(drawCat);

    // --- 2. 32 컬러 팔레트 동적 생성 ---
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

    // --- 3. 도구 및 패턴 선택 ---
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

    const patternButtons = document.querySelectorAll('.pattern-btn');
    patternButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            patternButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentPattern = e.target.getAttribute('data-pattern');
        });
    });

    // --- 4. 좌표 계산 및 이벤트 핸들러 ---
    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: Math.floor(clientX - rect.left),
            y: Math.floor(clientY - rect.top)
        };
    }

    canvas.addEventListener('mousedown', handleActionStart);
    canvas.addEventListener('touchstart', (e) => { handleActionStart(e); e.preventDefault(); });

    function handleActionStart(e) {
        const pos = getPosition(e);

        if (currentTool === 'bucket') {
            try {
                floodFill(pos.x, pos.y, currentColor, currentPattern);
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
        ctx.lineWidth = currentTool === 'colored-pencil' ? 3 : 8;
        ctx.lineCap = 'round';
        ctx.globalAlpha = currentTool === 'colored-pencil' ? 0.6 : 1.0;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
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

    // --- 5. 패턴 적용형 페인트 버킷 알고리즘 ---
    function floodFill(startX, startY, fillColorHex, pattern) {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const width = canvas.width;
        const height = canvas.height;

        if (startX < 0 || startX >= width || startY < 0 || startY >= height) return;

        const startIndex = (startY * width + startX) * 4;
        const startR = data[startIndex];
        const startG = data[startIndex + 1];
        const startB = data[startIndex + 2];

        const [fillR, fillG, fillB] = hexToRgba(fillColorHex);

        if (startR < 90 && startG < 90 && startB < 90) return;

        const queue = [[startX, startY]];
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

            // 패턴별 픽셀 색상 계산
            let rOut = fillR, gOut = fillG, bOut = fillB;

            if (pattern === 'stripe') {
                if ((x + y) % 8 < 4) {
                    rOut = Math.min(255, fillR + 60);
                    gOut = Math.min(255, fillG + 60);
                    bOut = Math.min(255, fillB + 60);
                }
            } else if (pattern === 'dot') {
                if (x % 10 < 3 && y % 10 < 3) {
                    rOut = 255; gOut = 255; bOut = 255;
                }
            } else if (pattern === 'grid') {
                if (x % 12 === 0 || y % 12 === 0) {
                    rOut = Math.max(0, fillR - 70);
                    gOut = Math.max(0, fillG - 70);
                    bOut = Math.max(0, fillB - 70);
                }
            }

            data[pixelPos] = rOut;
            data[pixelPos + 1] = gOut;
            data[pixelPos + 2] = bOut;
            data[pixelPos + 3] = 255;

            queue.push([x + 1, y]);
            queue.push([x - 1, y]);
            queue.push([x, y + 1]);
            queue.push([x, y - 1]);
        }

        ctx.putImageData(imgData, 0, 0);
    }

    // --- 6. 30가지 도형 그리기 정의 함수들 ---
    function drawCat(c, w, h) {
        c.beginPath();
        c.arc(300, 240, 110, 0, Math.PI * 2); // 얼굴
        c.moveTo(210, 160); c.lineTo(170, 70); c.lineTo(250, 130); // 귀
        c.moveTo(390, 160); c.lineTo(430, 70); c.lineTo(350, 130); // 귀
        c.stroke();
        // 눈, 코, 수염
        c.beginPath();
        c.arc(260, 210, 14, 0, Math.PI * 2);
        c.arc(340, 210, 14, 0, Math.PI * 2);
        c.arc(300, 250, 8, 0, Math.PI * 2);
        c.moveTo(300, 258); c.lineTo(300, 275);
        c.moveTo(230, 260); c.lineTo(270, 265);
        c.moveTo(370, 260); c.lineTo(330, 265);
        c.stroke();
    }
    function drawDog(c, w, h) {
        c.beginPath();
        c.arc(300, 230, 110, 0, Math.PI * 2); // 얼굴
        c.ellipse(190, 230, 35, 65, Math.PI/6, 0, Math.PI*2); // 왼쪽 귀
        c.ellipse(410, 230, 35, 65, -Math.PI/6, 0, Math.PI*2); // 오른쪽 귀
        c.stroke();
        c.beginPath();
        c.arc(260, 200, 12, 0, Math.PI * 2);
        c.arc(340, 200, 12, 0, Math.PI * 2);
        c.arc(300, 245, 18, 0, Math.PI * 2); // 코주변
        c.stroke();
    }
    function drawRabbit(c, w, h) {
        c.beginPath();
        c.ellipse(260, 100, 25, 80, -Math.PI/12, 0, Math.PI*2); // 귀
        c.ellipse(340, 100, 25, 80, Math.PI/12, 0, Math.PI*2);  // 귀
        c.arc(300, 260, 100, 0, Math.PI*2); // 얼굴
        c.stroke();
        c.beginPath();
        c.arc(265, 230, 10, 0, Math.PI*2);
        c.arc(335, 230, 10, 0, Math.PI*2);
        c.arc(300, 270, 10, 0, Math.PI*2);
        c.stroke();
    }
    function drawBear(c, w, h) {
        c.beginPath();
        c.arc(300, 240, 110, 0, Math.PI*2);
        c.arc(210, 130, 35, 0, Math.PI*2);
        c.arc(390, 130, 35, 0, Math.PI*2);
        c.stroke();
        c.beginPath();
        c.arc(260, 210, 10, 0, Math.PI*2);
        c.arc(340, 210, 10, 0, Math.PI*2);
        c.arc(300, 260, 35, 0, Math.PI*2);
        c.stroke();
    }
    function drawPanda(c, w, h) {
        c.beginPath();
        c.arc(300, 240, 110, 0, Math.PI*2);
        c.arc(210, 140, 35, 0, Math.PI*2);
        c.arc(390, 140, 35, 0, Math.PI*2);
        c.ellipse(250, 220, 25, 18, Math.PI/4, 0, Math.PI*2);
        c.ellipse(350, 220, 25, 18, -Math.PI/4, 0, Math.PI*2);
        c.stroke();
        c.beginPath();
        c.arc(300, 270, 12, 0, Math.PI*2);
        c.stroke();
    }
    function drawFox(c, w, h) {
        c.beginPath();
        c.moveTo(300, 130); c.lineTo(210, 80); c.lineTo(230, 180); c.closePath();
        c.moveTo(300, 130); c.lineTo(390, 80); c.lineTo(370, 180); c.closePath();
        c.moveTo(300, 350); c.lineTo(190, 200); c.lineTo(410, 200); c.closePath();
        c.stroke();
        c.beginPath();
        c.arc(250, 240, 12, 0, Math.PI*2);
        c.arc(350, 240, 12, 0, Math.PI*2);
        c.stroke();
    }
    function drawLion(c, w, h) {
        c.beginPath();
        for(let i=0; i<12; i++) {
            let angle = (i * Math.PI * 2) / 12;
            let x = 300 + Math.cos(angle) * 80;
            let y = 230 + Math.sin(angle) * 80;
            c.arc(x, y, 30, 0, Math.PI*2);
        }
        c.stroke();
        c.beginPath();
        c.arc(300, 230, 75, 0, Math.PI*2);
        c.arc(270, 210, 8, 0, Math.PI*2);
        c.arc(330, 210, 8, 0, Math.PI*2);
        c.arc(300, 250, 12, 0, Math.PI*2);
        c.stroke();
    }
    function drawTiger(c, w, h) {
        c.beginPath();
        c.arc(300, 230, 100, 0, Math.PI*2);
        c.arc(220, 150, 25, 0, Math.PI*2);
        c.arc(380, 150, 25, 0, Math.PI*2);
        c.moveTo(250, 160); c.lineTo(270, 190);
        c.moveTo(350, 160); c.lineTo(330, 190);
        c.moveTo(280, 290); c.lineTo(320, 290);
        c.stroke();
    }
    function drawUnicorn(c, w, h) {
        c.beginPath();
        c.arc(300, 250, 90, 0, Math.PI*2); // 얼굴
        c.moveTo(300, 160); c.lineTo(300, 60); c.lineTo(320, 160); // 뿔
        c.stroke();
        c.beginPath();
        c.arc(260, 230, 10, 0, Math.PI*2);
        c.stroke();
    }
    function drawPig(c, w, h) {
        c.beginPath();
        c.arc(300, 240, 100, 0, Math.PI*2);
        c.arc(220, 160, 20, 0, Math.PI*2);
        c.arc(380, 160, 20, 0, Math.PI*2);
        c.ellipse(300, 260, 30, 20, 0, 0, Math.PI*2); // 코
        c.stroke();
        c.beginPath();
        c.arc(260, 210, 8, 0, Math.PI*2);
        c.arc(340, 210, 8, 0, Math.PI*2);
        c.stroke();
    }
    function drawFrog(c, w, h) {
        c.beginPath();
        c.arc(300, 250, 110, 0, Math.PI*2);
        c.arc(240, 130, 30, 0, Math.PI*2);
        c.arc(360, 130, 30, 0, Math.PI*2);
        c.stroke();
        c.beginPath();
        c.arc(240, 130, 10, 0, Math.PI*2);
        c.arc(360, 130, 10, 0, Math.PI*2);
        c.arc(300, 280, 60, 0, Math.PI); // 입
        c.stroke();
    }
    function drawChick(c, w, h) {
        c.beginPath();
        c.arc(300, 240, 90, 0, Math.PI*2);
        c.arc(300, 140, 60, 0, Math.PI*2);
        c.stroke();
        c.beginPath();
        c.arc(270, 130, 6, 0, Math.PI*2);
        c.arc(330, 130, 6, 0, Math.PI*2);
        c.moveTo(290, 150); c.lineTo(310, 150); c.lineTo(300, 165); c.closePath();
        c.stroke();
    }
    function drawFish(c, w, h) {
        c.beginPath();
        c.ellipse(300, 230, 120, 70, 0, 0, Math.PI*2);
        c.moveTo(420, 230); c.lineTo(480, 170); c.lineTo(480, 290); c.closePath();
        c.stroke();
        c.beginPath();
        c.arc(230, 210, 10, 0, Math.PI*2);
        c.stroke();
    }
    function drawWhale(c, w, h) {
        c.beginPath();
        c.ellipse(300, 240, 140, 80, 0, 0, Math.PI*2);
        c.moveTo(440, 220); c.lineTo(510, 170); c.lineTo(490, 230); c.closePath();
        c.stroke();
        c.beginPath();
        c.arc(210, 220, 10, 0, Math.PI*2);
        c.stroke();
    }
    function drawOctopus(c, w, h) {
        c.beginPath();
        c.arc(300, 180, 80, 0, Math.PI*2);
        c.moveTo(240, 250); c.quadraticCurveTo(220, 350, 180, 320);
        c.moveTo(260, 250); c.quadraticCurveTo(260, 360, 230, 340);
        c.moveTo(340, 250); c.quadraticCurveTo(340, 360, 370, 340);
        c.moveTo(360, 250); c.quadraticCurveTo(380, 350, 420, 320);
        c.stroke();
        c.beginPath();
        c.arc(270, 160, 8, 0, Math.PI*2);
        c.arc(330, 160, 8, 0, Math.PI*2);
        c.stroke();
    }
    function drawButterfly(c, w, h) {
        c.beginPath();
        c.ellipse(300, 240, 20, 100, 0, 0, Math.PI*2); // 몸통
        c.ellipse(220, 180, 70, 50, -Math.PI/4, 0, Math.PI*2); // 날개
        c.ellipse(380, 180, 70, 50, Math.PI/4, 0, Math.PI*2);
        c.ellipse(220, 280, 60, 40, Math.PI/4, 0, Math.PI*2);
        c.ellipse(380, 280, 60, 40, -Math.PI/4, 0, Math.PI*2);
        c.stroke();
    }
    function drawBee(c, w, h) {
        c.beginPath();
        c.ellipse(300, 240, 100, 60, 0, 0, Math.PI*2);
        c.moveTo(250, 180); c.lineTo(250, 300);
        c.moveTo(320, 180); c.lineTo(320, 300);
        c.ellipse(270, 160, 30, 50, -Math.PI/6, 0, Math.PI*2);
        c.ellipse(330, 160, 30, 50, Math.PI/6, 0, Math.PI*2);
        c.stroke();
    }
    function drawFlower(c, w, h) {
        c.beginPath();
        c.arc(300, 210, 40, 0, Math.PI*2); // 가운데
        for(let i=0; i<6; i++) {
            let angle = (i * Math.PI * 2) / 6;
            let x = 300 + Math.cos(angle) * 55;
            let y = 210 + Math.sin(angle) * 55;
            c.arc(x, y, 40, 0, Math.PI*2);
        }
        c.moveTo(300, 250); c.lineTo(300, 380); // 줄기
        c.stroke();
    }
    function drawTree(c, w, h) {
        c.beginPath();
        c.rect(280, 260, 40, 120); // 기둥
        c.arc(300, 200, 90, 0, Math.PI*2); // 나무 잎
        c.stroke();
    }
    function drawMushroom(c, w, h) {
        c.beginPath();
        c.rect(270, 230, 60, 120); // 기둥
        c.arc(300, 230, 100, Math.PI, Math.PI*2); // 갓
        c.stroke();
        c.beginPath();
        c.arc(260, 180, 15, 0, Math.PI*2);
        c.arc(340, 190, 12, 0, Math.PI*2);
        c.stroke();
    }
    function drawHouse(c, w, h) {
        c.beginPath();
        c.rect(220, 220, 160, 140); // 몸체
        c.moveTo(190, 220); c.lineTo(300, 120); c.lineTo(410, 220); c.closePath(); // 지붕
        c.rect(270, 280, 60, 80); // 문
        c.stroke();
    }
    function drawCar(c, w, h) {
        c.beginPath();
        c.rect(180, 230, 240, 70);
        c.roundRect(230, 160, 140, 70, 20);
        c.arc(240, 300, 30, 0, Math.PI*2);
        c.arc(360, 300, 30, 0, Math.PI*2);
        c.stroke();
    }
    function drawTrain(c, w, h) {
        c.beginPath();
        c.rect(180, 210, 120, 100);
        c.rect(320, 230, 100, 80);
        c.arc(220, 310, 25, 0, Math.PI*2);
        c.arc(280, 310, 25, 0, Math.PI*2);
        c.arc(370, 310, 25, 0, Math.PI*2);
        c.stroke();
    }
    function drawRocket(c, w, h) {
        c.beginPath();
        c.ellipse(300, 220, 50, 110, 0, 0, Math.PI*2);
        c.moveTo(250, 280); c.lineTo(210, 330); c.lineTo(250, 310); c.closePath();
        c.moveTo(350, 280); c.lineTo(390, 330); c.lineTo(350, 310); c.closePath();
        c.stroke();
    }
    function drawStarShape(c, w, h) {
        c.beginPath();
        let spikes = 5, outerRadius = 100, innerRadius = 50;
        let rot = Math.PI / 2 * 3;
        let x = 300, y = 230;
        let step = Math.PI / spikes;
        c.moveTo(300, 130);
        for (let i = 0; i < spikes; i++) {
            let x1 = x + Math.cos(rot) * outerRadius;
            let y1 = y + Math.sin(rot) * outerRadius;
            c.lineTo(x1, y1);
            rot += step;
            let x2 = x + Math.cos(rot) * innerRadius;
            let y2 = y + Math.sin(rot) * innerRadius;
            c.lineTo(x2, y2);
            rot += step;
        }
        c.lineTo(300, 130);
        c.closePath();
        c.stroke();
    }
    function drawHeartShape(c, w, h) {
        c.beginPath();
        c.moveTo(300, 280);
        c.bezierCurveTo(300, 280, 200, 200, 200, 140);
        c.bezierCurveTo(200, 100, 240, 90, 270, 120);
        c.lineTo(300, 150);
        c.lineTo(330, 120);
        c.bezierCurveTo(360, 90, 400, 100, 400, 140);
        c.bezierCurveTo(400, 200, 300, 280, 300, 280);
        c.stroke();
    }
    function drawIcecream(c, w, h) {
        c.beginPath();
        c.moveTo(260, 230); c.lineTo(340, 230); c.lineTo(300, 370); c.closePath(); // 콘
        c.arc(300, 200, 70, 0, Math.PI*2); // 아이스크림
        c.stroke();
    }
    function drawCake(c, w, h) {
        c.beginPath();
        c.rect(210, 260, 180, 80);
        c.rect(240, 180, 120, 80);
        c.rect(285, 130, 30, 50); // 초
        c.stroke();
    }
    function drawApple(c, w, h) {
        c.beginPath();
        c.arc(300, 240, 90, 0, Math.PI*2);
        c.moveTo(300, 150); c.quadraticCurveTo(350, 110, 330, 80); // 꼭지
        c.stroke();
    }
    function drawDino(c, w, h) {
        c.beginPath();
        c.ellipse(310, 250, 90, 60, 0, 0, Math.PI*2); // 몸
        c.arc(380, 200, 40, 0, Math.PI*2); // 머리
        c.rect(230, 290, 20, 60);
        c.rect(350, 290, 20, 60);
        c.stroke();
    }
});
