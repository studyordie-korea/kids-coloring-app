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

    // --- 1. 64 컬러 팔레트 동적 생성 ---
    const paletteEl = document.getElementById('palette');
    
    // 64가지 색상을 다채롭게 생성하는 로직
    const colors = [];
    // 무채색 및 기본 대표 색상
    const baseColors = ["#000000", "#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF"];
    colors.push(...baseColors);

    // 64개가 되도록 색상 조합 만들기 (Hue 회전 방식)
    for (let i = 0; i < 52; i++) {
        const hue = (i * 360) / 52;
        colors.push(`hsl(${hue}, 80%, 60%)`);
    }

    colors.slice(0, 64).forEach((hex, index) => {
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

    // --- 2. 도구 선택 ---
    const toolButtons = document.querySelectorAll('.tool-btn');
    toolButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            toolButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentTool = e.target.getAttribute('data-tool');
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

    // --- 4. 캔버스 이벤트 핸들러 ---
    canvas.addEventListener('mousedown', handleActionStart);
    canvas.addEventListener('touchstart', (e) => { handleActionStart(e); e.preventDefault(); });

    function handleActionStart(e) {
        const pos = getPosition(e);

        if (currentTool === 'bucket') {
            // 페인트 버킷 (플러드 필 실행)
            floodFill(pos.x, pos.y, currentColor);
        } else {
            // 사인펜 또는 색연필 그리기 시작
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

    // --- 5. 페인트 버킷 알고리즘 (Flood Fill) ---
    function hexToRgba(hex) {
        let c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c = hex.substring(1).split('');
            if(c.length === 3){ c = [c[0], c[0], c[1], c[1], c[2], c[2]]; }
            c = '0x' + c.join('');
            return [(c>>16)&255, (c>>8)&255, c&255, 255];
        }
        // HSL 색상 지원을 위한 파싱 보완
        const tempDiv = document.createElement('div');
        tempDiv.style.color = hex;
        document.body.appendChild(tempDiv);
        const rgb = window.getComputedStyle(tempDiv).color;
        document.body.removeChild(tempDiv);
        const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if(match) return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), 255];
        return [255, 0, 0, 255];
    }

    function floodFill(startX, startY, fillColorHex) {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const width = canvas.width;
        const height = canvas.height;

        const startIndex = (startY * width + startX) * 4;
        const startR = data[startIndex];
        const startG = data[startIndex + 1];
        const startB = data[startIndex + 2];
        const startA = data[startIndex + 3];

        const [fillR, fillG, fillB, fillA] = hexToRgba(fillColorHex);

        // 이미 같은 색이면 중단
        if (startR === fillR && startG === fillG && startB === fillB && startA === fillA) return;

        // 검은색 외곽선(어두운 선) 영역은 침범하지 않도록 예외 처리
        if (startR < 50 && startG < 50 && startB < 50) return;

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

            // 경계선(어두운 선)을 만나면 멈춤
            if (r < 50 && g < 50 && b < 50) continue;

            // 시작 색상과 비슷한 영역인지 확인
            if (Math.abs(r - startR) > 30 || Math.abs(g - startG) > 30 || Math.abs(b - startB) > 30) continue;

            visited[idx] = 1;

            // 색상 채우기
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
