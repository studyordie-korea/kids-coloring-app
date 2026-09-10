window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('coloringCanvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    canvas.width = 600;
    canvas.height = 450;

    // 밑그림 이미지 로드
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/600px-Cat03.jpg";
    
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    let isDrawing = false;
    let currentColor = "#FF0000";
    let currentTool = "pen";

    // 초기 커서 클래스 설정
    canvas.className = "tool-pen";

    // --- 1. 32 컬러 팔레트 동적 생성 ---
    const paletteEl = document.getElementById('palette');
    const colors = [
        // 기본 무채색 및 대표 선명한 색상 (16개)
        "#000000", "#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF", 
        "#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8B00FF", "#FF1493", "#8B4513", "#FFC0CB",
        // 아이들이 쓰기 좋은 화사한 파스텔 및 중간 계열 색상 (16개)
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

    // --- 2. 도구 선택 및 커서 변경 ---
    const toolButtons = document.querySelectorAll('.tool-btn');
    toolButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            toolButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentTool = e.target.getAttribute('data-tool');

            // 도구에 맞는 커서 클래스 갱신
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

    // --- 3. 좌표 계산 ---
    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: Math.floor(clientX - rect.left),
            y: Math.floor(clientY - rect.top)
        };
    }

    // --- 4. 이벤트 핸들러 ---
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

    // --- 5. 색상 변환 유틸리티 ---
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

    // --- 6. 페인트 버킷 알고리즘 ---
    function floodFill(startX, startY, fillColorHex) {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const width = canvas.width;
        const height = canvas.height;

        const startIndex = (startY * width + startX) * 4;
        const startR = data[startIndex];
        const startG = data[startIndex + 1];
        const startB = data[startIndex + 2];

        const [fillR, fillG, fillB, fillA] = hexToRgba(fillColorHex);

        if (startR < 80 && startG < 80 && startB < 80) return;
        if (startR === fillR && startG === fillG && startB === fillB) return;

        const targetR = startR;
        const targetG = startG;
        const targetB = startB;

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

            if (r < 80 && g < 80 && b < 80) continue;
            if (Math.abs(r - targetR) > 30 || Math.abs(g - targetG) > 30 || Math.abs(b - targetB) > 30) continue;

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
