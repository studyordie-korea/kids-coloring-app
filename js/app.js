window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('coloringCanvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    canvas.width = 600;
    canvas.height = 430;

    // --- 30종 밑그림 이미지 목록 ---
    const templates = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/600px-Cat03.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/600px-Felis_catus-cat_on_snow.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/600px-Cat_November_2010-1a.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Magpie_rodents_dead.jpg/600px-Magpie_rodents_dead.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ash_falls_on_cars_in_Manila.jpg/600px-Ash_falls_on_cars_in_Manila.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Black_cat_on_a_white_background.jpg/600px-Black_cat_on_a_white_background.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dog_Breeds.jpg/600px-Dog_Breeds.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Siberian_husky_kochi.jpg/600px-Siberian_husky_kochi.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Labrador_Retriever_portrait.jpg/600px-Labrador_Retriever_portrait.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Golden_Retriever_In_Water.jpg/600px-Golden_Retriever_In_Water.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/A_kitten_gnawing_on_a_pen.jpg/600px-A_kitten_gnawing_on_a_pen.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Cute_dog.jpg/600px-Cute_dog.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Gemsbok_at_Etosha.jpg/600px-Gemsbok_at_Etosha.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-wj_step.jpg/600px-Eq_it-wj_step.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Panda_Cub_playing_-_Flickr_-_Ron_Knight.jpg/600px-Panda_Cub_playing_-_Flickr_-_Ron_Knight.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Red_Panda_%28Ailurus_fulgens%29_-_video_frame.png/600px-Red_Panda_%28Ailurus_fulgens%29_-_video_frame.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/European_robin_Galicia.jpg/600px-European_robin_Galicia.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Oryctolagus_cuniculus_Rc.jpg/600px-Oryctolagus_cuniculus_Rc.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Fox_-_National_Zoo_%28Washington%2C_D.C.%29.jpg/600px-Fox_-_National_Zoo_%28Washington%2C_D.C.%29.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Male_and_female_mallard_ducks.jpg/600px-Male_and_female_mallard_ducks.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Panthera_leo_and_cub_%28Lion%29.jpg/600px-Panthera_leo_and_cub_%28Lion%29.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/600px-African_Bush_Elephant.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Giraffe_standing.jpg/600px-Giraffe_standing.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Macaw_sharp.jpg/600px-Macaw_sharp.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Hedgehog_%28cropped%29.jpg/600px-Hedgehog_%28cropped%29.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Koala_climbing_a_tree.jpg/600px-Koala_climbing_a_tree.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Bottlenose_dolphin_-_Kaikoura.jpg/600px-Bottlenose_dolphin_-_Kaikoura.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Penguin_group_St_Kilda.jpg/600px-Penguin_group_St_Kilda.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Honey_bee_on_dandelion.jpg/600px-Honey_bee_on_dandelion.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Moraine_Lake_17092005.jpg/600px-Moraine_Lake_17092005.jpg"
    ];

    let currentImg = new Image();
    currentImg.crossOrigin = "anonymous";

    function loadTemplate(url) {
        currentImg.src = url;
        currentImg.onload = () => {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.height);
        };
    }

    // 30종 밑그림 썸네일 UI 생성
    const templateGrid = document.getElementById('template-grid');
    templates.forEach((url, index) => {
        const thumb = document.createElement('img');
        thumb.className = 'template-thumb' + (index === 0 ? ' selected' : '');
        thumb.src = url;
        thumb.alt = `밑그림 ${index + 1}`;
        thumb.addEventListener('click', (e) => {
            document.querySelectorAll('.template-thumb').forEach(t => t.classList.remove('selected'));
            e.target.classList.add('selected');
            loadTemplate(url);
        });
        templateGrid.appendChild(thumb);
    });

    // 최초 첫 번째 그림 로드
    loadTemplate(templates[0]);

    let isDrawing = false;
    let currentColor = "#FF0000";
    let currentTool = "pen";
    let currentTexture = "solid";

    canvas.className = "tool-pen";

    // --- 1. 32 컬러 팔레트 동적 생성 ---
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

    // --- 질감 선택 핸들러 ---
    const texButtons = document.querySelectorAll('.tex-btn');
    texButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            texButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentTexture = e.target.getAttribute('data-texture');
        });
    });

    // --- 2. 도구 선택 및 커서 변경 ---
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

        // 질감별 스타일 적용
        if (currentTexture === 'watercolor') {
            ctx.globalAlpha = 0.4;
            ctx.lineWidth = currentTool === 'colored-pencil' ? 5 : 12;
        } else if (currentTexture === 'crayon') {
            ctx.globalAlpha = 0.85;
            ctx.lineWidth = currentTool === 'colored-pencil' ? 4 : 10;
        } else if (currentTexture === 'glitter') {
            ctx.globalAlpha = 0.9;
            ctx.lineWidth = currentTool === 'colored-pencil' ? 3 : 6;
        } else {
            ctx.globalAlpha = currentTool === 'colored-pencil' ? 0.6 : 1.0;
        }

        ctx.lineTo(x, y);
        ctx.stroke();

        // 반짝이 질감 효과
        if (currentTexture === 'glitter' && Math.random() < 0.4) {
            ctx.fillStyle = currentColor;
            ctx.fillRect(x + (Math.random() * 6 - 3), y + (Math.random() * 6 - 3), 3, 3);
        }
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

    // --- 6. 페인트 버킷 알고리즘 (질감 적용 포함) ---
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

        let [fillR, fillG, fillB, fillA] = hexToRgba(fillColorHex);

        if (currentTexture === 'watercolor') {
            fillA = Math.floor(fillA * 0.55);
        }

        if (startR < 90 && startG < 90 && startB < 90) return;
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

            if (r < 90 && g < 90 && b < 90) continue;
            if (Math.abs(r - startR) > 40 || Math.abs(g - startG) > 40 || Math.abs(b - startB) > 40) continue;

            visited[idx] = 1;

            if (currentTexture === 'watercolor') {
                data[pixelPos]     = Math.floor((r * (255 - fillA) + fillR * fillA) / 255);
                data[pixelPos + 1] = Math.floor((g * (255 - fillA) + fillG * fillA) / 255);
                data[pixelPos + 2] = Math.floor((b * (255 - fillA) + fillB * fillA) / 255);
            } else if (currentTexture === 'glitter' && Math.random() < 0.15) {
                data[pixelPos]     = Math.min(255, fillR + 80);
                data[pixelPos + 1] = Math.min(255, fillG + 80);
                data[pixelPos + 2] = Math.min(255, fillB + 80);
            } else {
                data[pixelPos]     = fillR;
                data[pixelPos + 1] = fillG;
                data[pixelPos + 2] = fillB;
                data[pixelPos + 3] = fillA;
            }

            queue.push([x + 1, y]);
            queue.push([x - 1, y]);
            queue.push([x, y + 1]);
            queue.push([x, y - 1]);
        }

        ctx.putImageData(imgData, 0, 0);
    }
});
