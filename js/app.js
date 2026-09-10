window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('coloringCanvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    canvas.width = 600;
    canvas.height = 450;

    // --- 1. 코드로 직접 귀여운 고양이 밑그림 그리기 (CORS 및 노이즈 문제 원천 해결) ---
    function drawTemplate() {
        // 배경을 완벽한 흰색으로 채우기
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // 얼굴 윤곽 (동글동글한 고양이 얼굴)
        ctx.beginPath();
        ctx.arc(300, 240, 150, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.stroke();

        // 왼쪽 귀
        ctx.beginPath();
        ctx.moveTo(180, 140);
        ctx.lineTo(150, 40);
        ctx.lineTo(250, 100);
        ctx.closePath();
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.stroke();

        // 오른쪽 귀
        ctx.beginPath();
        ctx.moveTo(420, 140);
        ctx.lineTo(450, 40);
        ctx.lineTo(350, 100);
        ctx.closePath();
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.stroke();

        // 왼쪽 눈 (동그라미)
        ctx.beginPath();
        ctx.arc(240, 200, 20, 0, Math.PI * 2);
        ctx.fillStyle = "#000000";
        ctx.fill();

        // 오른쪽 눈 (동그라미)
        ctx.beginPath();
        ctx.arc(360, 200, 20, 0, Math.PI * 2);
        ctx.fill();

        // 코
        ctx.beginPath();
        ctx.moveTo(290, 240);
        ctx.lineTo(310, 240);
        ctx.lineTo(300, 255);
        ctx.closePath();
        ctx.fill();

        // 입 (웃는 모양)
        ctx.beginPath();
        ctx.moveTo(300, 255);
        ctx.lineTo(300, 275);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(275, 275, 25, 0, Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(325, 275, 25, 0, Math.PI);
        ctx.stroke();
    }

    drawTemplate();

    let isDrawing = false;
    let currentColor = "#FF0000";
    let currentTool = "pen";

    canvas.className = "tool-pen";

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

    // --- 3. 도구 선택 및 커서 변경 ---
    const toolButtons = document.querySelectorAll('.tool-btn');
    toolButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            toolButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentTool = e.target.getAttribute('data-tool');

            canvas.className = "";
            if (currentTool === 'pen') {
                canvas.classList.add('tool-pen');
            } else if (currentTool === 'colored-pencil') {
                canvas.classList.add('tool-colored-pencil');
            } else if (currentTool === 'bucket') {
                canvas.classList.add('tool-bucket');
            }
        });
    });

    // --- 4. 좌표 계산 ---
    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: Math.floor(clientX - rect.left),
            y: Math.floor(clientY - rect.top)
        };
    }

    // --- 5. 이벤트 핸들러 ---
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
        ctx.lineWidth = currentTool === 'colored-pencil' ? 3 : 8;
        ctx.lineCap = 'round';
        ctx.globalAlpha = currentTool === 'colored-pencil' ? 0.6 : 1.0;

        ctx.lineTo(x, y);
        ctx.stroke();
    }

    // --- 6. 색상 변환 유틸리티 ---
    function hexToRgba(hex) {
        if (hex.startsWith('#')) {
            let c = hex.substring(1);
            if (c.length === 3) c = c.split('').map(x => x + x).join('');
            const num = parseInt(c, 16);
            return [(num >> 16) & 255, (num >> 8) & 255, num & 255, 255];
        }
        const tempDiv = document.createElement('div');
        tempDiv.style.color = hex;
        document.body.appendChild(tempDiv);
        const rgb = window.getComputedStyle(tempDiv).color;
        document.body.removeChild(tempDiv);
        const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (match) return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), 255];
        return [255, 0, 0, 255];
    }

    // --- 7. 완벽한 페인트 버킷 (Flood Fill) 알고리즘 ---
    function floodFill(startX, startY, fillColorHex) {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const width = canvas.width;
        const height = canvas.height;

        if (startX < 0 || startX >= width || startY < 0 || startY >= height) return;

        const startIndex = (startY * width + startX) * 4;
        const startR = data[startIndex];
        const startG = data[startIndex + 1];
        const startB = data[startIndex + 2];

        const [fillR, fillG, fillB, fillA] = hexToRgba(fillColorHex);

        // 검은색 외곽선(어두운 선)을 클릭한 경우는 채우지 않음
        if (startR < 50 && startG < 50 && startB < 50) return;

        // 이미 채우려는 색과 완전히 같은 경우 중단
        if (startR === fillR && startG === fillG && startB === fillB) return;

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

            // 검은색 외곽선(어두운 선)을 만나면 막힘
            if (r < 50 && g < 50 && b < 50) continue;

            // 클릭한 지점의 색상 영역과 일치하는 픽셀만 채우기 확장
            if (Math.abs(r - startR) > 30 || Math.abs(g - startG) > 30 || Math.abs(b - startB) > 30) continue;

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
