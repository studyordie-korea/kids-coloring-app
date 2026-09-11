window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('coloringCanvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const scale = 2;
    const displayWidth = 600;
    const displayHeight = 450;

    canvas.width = displayWidth * scale;
    canvas.height = displayHeight * scale;
    ctx.scale(scale, scale);

    // --- 1. 색칠공부 도서 수준의 고품질 밑그림 10선 정의 ---
    const sketchTitles = [
        "1. 곰돌이의 마법 찻잔", 
        "2. 토끼의 별빛 성", 
        "3. 숲속 오두막과 무지개", 
        "4. 우주를 나는 아기 고양이", 
        "5. 나비가 앉은 꽃바구니", 
        "6. 회전목마와 풍선", 
        "7. 꼬마 기차의 모험", 
        "8. 바닷속 인어공주 성", 
        "9. 밤하늘의 곰돌이 별자리", 
        "10. 요정들의 비밀 정원"
    ];

    const sketchGrid = document.getElementById('sketch-grid');
    sketchTitles.forEach((title, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'sketch-thumb' + (index === 0 ? ' selected' : '');
        thumb.innerHTML = `<span>📖</span><span style="font-size:8px; margin-top:1px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%; text-align:center;">${index+1}번</span>`;
        thumb.title = title;
        
        thumb.addEventListener('click', () => {
            document.querySelectorAll('.sketch-thumb').forEach(t => t.classList.remove('selected'));
            thumb.classList.add('selected');
            drawColoringBookSketch(index + 1);
        });
        sketchGrid.appendChild(thumb);
    });

    // 고품질 외곽선 렌더링 함수
    function drawColoringBookSketch(id) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, displayWidth, displayHeight);

        ctx.strokeStyle = "#1A1A1A";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.save();

        switch (id) {
            case 1: // 곰돌이의 마법 찻잔
                ctx.beginPath(); ctx.arc(300, 200, 80, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(280, 185, 8, 0, Math.PI * 2); ctx.fillStyle="#1A1A1A"; ctx.fill();
                ctx.beginPath(); ctx.arc(320, 185, 8, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(300, 210, 12, 0, Math.PI); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(220, 260); ctx.lineTo(380, 260); ctx.quadraticCurveTo(400, 360, 300, 360); ctx.quadraticCurveTo(200, 360, 220, 260); ctx.stroke();
                break;
            case 2: // 토끼의 별빛 성
                ctx.beginPath(); ctx.moveTo(220, 360); ctx.lineTo(220, 200); ctx.lineTo(300, 120); ctx.lineTo(380, 200); ctx.lineTo(380, 360); ctx.closePath(); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 240, 40, 0, Math.PI * 2); ctx.stroke();
                break;
            case 3: // 숲속 오두막과 무지개
                ctx.beginPath(); ctx.arc(300, 150, 140, Math.PI, 0); ctx.stroke();
                ctx.beginPath(); ctx.rect(200, 240, 200, 130); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(180, 240); ctx.lineTo(300, 150); ctx.lineTo(420, 240); ctx.closePath(); ctx.stroke();
                break;
            case 4: // 우주를 나는 아기 고양이
                ctx.beginPath(); ctx.ellipse(300, 240, 90, 110, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(220, 150); ctx.lineTo(250, 200); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(380, 150); ctx.lineTo(350, 200); ctx.stroke();
                break;
            case 5: // 나비가 앉은 꽃바구니
                ctx.beginPath(); ctx.arc(300, 220, 60, 0, Math.PI * 2); ctx.stroke();
                for(let i=0; i<6; i++) {
                    let a = (i * Math.PI) / 3;
                    ctx.beginPath(); ctx.ellipse(300 + Math.cos(a)*85, 220 + Math.sin(a)*85, 35, 20, a, 0, Math.PI * 2); ctx.stroke();
                }
                break;
            case 6: // 회전목마와 풍선
                ctx.beginPath(); ctx.moveTo(180, 200); ctx.lineTo(300, 120); ctx.lineTo(420, 200); ctx.closePath(); ctx.stroke();
                ctx.beginPath(); ctx.rect(200, 200, 200, 160); ctx.stroke();
                break;
            case 7: // 꼬마 기차의 모험
                ctx.beginPath(); ctx.roundRect(180, 220, 140, 110, [15]); ctx.stroke();
                ctx.beginPath(); ctx.roundRect(340, 240, 90, 90, [15]); ctx.stroke();
                ctx.beginPath(); ctx.arc(220, 350, 25, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(380, 350, 25, 0, Math.PI * 2); ctx.stroke();
                break;
            case 8: // 바닷속 인어공주 성
                for(let r of [160, 130, 100]) {
                    ctx.beginPath(); ctx.arc(300, 380, r, Math.PI, 0); ctx.stroke();
                }
                break;
            case 9: // 밤하늘의 곰돌이 별자리
                ctx.beginPath(); ctx.arc(300, 230, 75, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(250, 150, 25, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(350, 150, 25, 0, Math.PI * 2); ctx.stroke();
                break;
            case 10: // 요정들의 비밀 정원
                ctx.beginPath(); ctx.arc(300, 240, 120, Math.PI * 0.8, Math.PI * 2.2); ctx.stroke();
                ctx.beginPath(); ctx.rect(240, 160, 120, 160); ctx.stroke();
                break;
            default:
                ctx.strokeRect(200, 180, 200, 150);
                break;
        }

        ctx.restore();
    }

    drawColoringBookSketch(1);

    let isDrawing = false;
    let currentTool = "bucket"; // 기본 페인트 버킷
    let currentSubTool = "signpen";
    let activeFillType = "solid"; // solid, gradient, pattern
    let currentFillValue = "#FF5733"; // 현재 선택된 색상 또는 패턴 ID

    // --- 2. 팔레트 UI 동적 생성 (단색, 그라데이션, 패턴) ---
    const solidPaletteEl = document.getElementById('solidPalette');
    const solidColors = [
        "#000000", "#4A5568", "#A0AEC0", "#FFFFFF",
        "#EF4444", "#F97316", "#F59E0B", "#10B981", 
        "#06B6D4", "#3B82F6", "#6366F1", "#EC4899",
        "#9333EA", "#14B8A6", "#84CC16", "#EAB308"
    ];
    solidColors.forEach((hex, idx) => {
        const chip = document.createElement('div');
        chip.className = 'color-chip' + (idx === 4 ? ' selected' : '');
        chip.style.backgroundColor = hex;
        chip.addEventListener('click', (e) => {
            document.querySelectorAll('.color-chip, .pattern-chip').forEach(c => c.classList.remove('selected'));
            e.target.classList.add('selected');
            activeFillType = "solid";
            currentFillValue = hex;
        });
        solidPaletteEl.appendChild(chip);
    });

    const gradientPaletteEl = document.getElementById('gradientPalette');
    const gradients = [
        { id: "sunset", name: "일몰 노을", colors: ["#FF512F", "#DD2476"] },
        { id: "ocean", name: "푸른 바다", colors: ["#2193b0", "#6dd5ed"] },
        { id: "spring", name: "봄날 새싹", colors: ["#56ab2f", "#a8e063"] },
        { id: "candy", name: "달콤 캔디", colors: ["#ff9a9e", "#fecfef"] }
    ];
    gradients.forEach((g, idx) => {
        const chip = document.createElement('div');
        chip.className = 'pattern-chip' + (idx === 0 ? ' selected' : '');
        chip.style.background = `linear-gradient(135deg, ${g.colors[0]}, ${g.colors[1]})`;
        chip.innerText = g.name;
        chip.addEventListener('click', (e) => {
            document.querySelectorAll('.color-chip, .pattern-chip').forEach(c => c.classList.remove('selected'));
            chip.classList.add('selected');
            activeFillType = "gradient";
            currentFillValue = g;
        });
        gradientPaletteEl.appendChild(chip);
    });

    const patternPaletteEl = document.getElementById('patternPalette');
    const patterns = [
        { id: "dots", name: "물방울 도트", bg: "#FEF08A", dotColor: "#CA8A04" },
        { id: "stripe", name: "줄무늬 스트라이프", bg: "#BAE6FD", stripeColor: "#0284C7" },
        { id: "stars", name: "별 반짝임", bg: "#F3E8FF", starColor: "#9333EA" },
        { id: "check", name: "체크 격자", bg: "#FFEDD5", checkColor: "#EA580C" }
    ];
    patterns.forEach((p, idx) => {
        const chip = document.createElement('div');
        chip.className = 'pattern-chip';
        chip.style.backgroundColor = p.bg;
        chip.innerText = p.name;
        chip.addEventListener('click', (e) => {
            document.querySelectorAll('.color-chip, .pattern-chip').forEach(c => c.classList.remove('selected'));
            chip.classList.add('selected');
            activeFillType = "pattern";
            currentFillValue = p;
        });
        patternPaletteEl.appendChild(chip);
    });

    // 팔레트 탭 전환
    const pTabs = document.querySelectorAll('.p-tab');
    pTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            pTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.getAttribute('data-tab');
            document.getElementById('paletteSolid').style.display = target === 'solid' ? 'block' : 'none';
            document.getElementById('paletteGradient').style.display = target === 'gradient' ? 'block' : 'none';
            document.getElementById('palettePattern').style.display = target === 'pattern' ? 'block' : 'none';
        });
    });

    // --- 3. 도구 및 서브 펜 토글 관리 ---
    const toolButtons = document.querySelectorAll('.tool-btn');
    const penToolsContainer = document.getElementById('penToolsContainer');

    toolButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tool = btn.getAttribute('data-tool');
            if (tool === 'toggle-pen') {
                // 펜 도구 숨김/보이기 토글
                if (penToolsContainer.style.display === 'none') {
                    penToolsContainer.style.display = 'block';
                    btn.classList.add('active');
                } else {
                    penToolsContainer.style.display = 'none';
                    btn.classList.remove('active');
                }
            } else {
                toolButtons.forEach(b => { if(b.getAttribute('data-tool') !== 'toggle-pen') b.classList.remove('active'); });
                btn.classList.add('active');
                currentTool = tool;
                if (penToolsContainer.style.display === 'block') {
                    penToolsContainer.style.display = 'none';
                    document.querySelector('[data-tool="toggle-pen"]').classList.remove('active');
                }
            }
        });
    });

    const subToolBtns = document.querySelectorAll('.sub-tool-btn');
    subToolBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            subToolBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSubTool = btn.getAttribute('data-subtool');
            currentTool = 'pen';
            document.querySelector('[data-tool="bucket"]').classList.remove('active');
        });
    });

    // 전체 지우기 버튼
    document.getElementById('clearBtn').addEventListener('click', () => {
        const selectedThumb = document.querySelector('.sketch-thumb.selected');
        const index = Array.from(sketchGrid.children).indexOf(selectedThumb) + 1;
        drawColoringBookSketch(index);
    });

    // --- 4. 좌표 계산 함수 ---
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

    // --- 5. 드로잉 및 페인트 버킷 액션 핸들러 ---
    function handleActionStart(e) {
        const pos = getPosition(e);

        if (currentTool === 'bucket') {
            try {
                floodFillWithAdvancedStyle(pos.x, pos.y, activeFillType, currentFillValue);
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
                if (!isDrawing) return;
                isDrawing = false;
                ctx.closePath();
                window.removeEventListener('mousemove', moveHandler);
                window.removeEventListener('mouseup', upHandler);
                window.removeEventListener('touchmove', moveHandler);
                window.removeEventListener('touchend', upHandler);
            };

            window.addEventListener('mousemove', moveHandler);
            window.addEventListener('mouseup', upHandler);
            window.addEventListener('touchmove', moveHandler, { passive: false });
            window.addEventListener('touchend', upHandler);
        }
    }

    canvas.addEventListener('mousedown', handleActionStart);
    canvas.addEventListener('touchstart', (e) => {
        handleActionStart(e);
        e.preventDefault();
    }, { passive: false });

    function drawStroke(x, y) {
        // 단색만 펜 드로잉 지원
        const strokeColor = (activeFillType === 'solid') ? currentFillValue : "#3B82F6";
        ctx.strokeStyle = strokeColor;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (currentSubTool === 'signpen') {
            ctx.lineWidth = 5;
            ctx.globalAlpha = 1.0;
        } else { // 색연필
            ctx.lineWidth = 2.5;
            ctx.globalAlpha = 0.85;
        }

        ctx.lineTo(x, y);
        ctx.stroke();
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

    // --- 6. 강력한 페인트 버킷 알고리즘 (단색 + 그라데이션 + 패턴 덮어쓰기 완벽 지원) ---
    function floodFillWithAdvancedStyle(startX, startY, type, value) {
        const width = canvas.width;
        const height = canvas.height;
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        const realX = Math.floor(startX * scale);
        const realY = Math.floor(startY * scale);

        if (realX < 0 || realX >= width || realY < 0 || realY >= height) return;

        const startIndex = (realY * width + realX) * 4;
        const startR = data[startIndex];
        const startG = data[startIndex + 1];
        const startB = data[startIndex + 2];

        // 외곽선(검은색 선)은 채우지 않음
        if (startR < 70 && startG < 70 && startB < 70) return;

        // BFS 영역 탐색으로 연결된 같은 색상/영역의 픽셀들을 추출
        const queue = [[realX, realY]];
        const visited = new Uint8Array(width * height);
        const matchedPixels = [];

        let minX = width, maxX = 0, minY = height, maxY = 0;

        while (queue.length > 0) {
            const [x, y] = queue.pop();
            const idx = y * width + x;

            if (x < 0 || x >= width || y < 0 || y >= height) continue;
            if (visited[idx]) continue;

            const pixelPos = (y * width + x) * 4;
            const r = data[pixelPos];
            const g = data[pixelPos + 1];
            const b = data[pixelPos + 2];

            if (r < 70 && g < 70 && b < 70) continue; // 외곽선 만나면 중단
            // 허용 오차 범위 내의 색상 및 기존에 칠해진 그라데이션/패턴 영역도 덮어쓸 수 있도록 판별
            if (Math.abs(r - startR) > 50 || Math.abs(g - startG) > 50 || Math.abs(b - startB) > 50) continue;

            visited[idx] = 1;
            matchedPixels.push([x, y]);

            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;

            queue.push([x + 1, y]);
            queue.push([x - 1, y]);
            queue.push([x, y + 1]);
            queue.push([x, y - 1]);
        }

        if (matchedPixels.length === 0) return;

        // 임시 캔버스에 해당 영역의 스타일(단색, 그라데이션, 패턴)을 렌더링한 후 마스킹 적용
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;
        const tCtx = tempCanvas.getContext('2d');

        if (type === 'solid') {
            const [fr, fg, fb, fa] = hexToRgba(value);
            tCtx.fillStyle = value;
            tCtx.fillRect(minX, minY, maxX - minX + 1, maxY - minY + 1);
        } else if (type === 'gradient') {
            const grad = tCtx.createLinearGradient(minX, minY, maxX, maxY);
            grad.addColorStop(0, value.colors[0]);
            grad.addColorStop(1, value.colors[1]);
            tCtx.fillStyle = grad;
            tCtx.fillRect(minX, minY, maxX - minX + 1, maxY - minY + 1);
        } else if (type === 'pattern') {
            tCtx.fillStyle = value.bg;
            tCtx.fillRect(minX, minY, maxX - minX + 1, maxY - minY + 1);
            
            // 세부 특수 패턴 그리기
            tCtx.fillStyle = value.dotColor || value.stripeColor || value.starColor || value.checkColor || '#333';
            if (value.id === 'dots') {
                for (let px = minX; px <= maxX; px += 12) {
                    for (let py = minY; py <= maxY; py += 12) {
                        tCtx.beginPath(); tCtx.arc(px, py, 3, 0, Math.PI * 2); tCtx.fill();
                    }
                }
            } else if (value.id === 'stripe') {
                tCtx.lineWidth = 4;
                tCtx.strokeStyle = value.stripeColor;
                for (let p = minX - (maxY - minY); p <= maxX + (maxY - minY); p += 16) {
                    tCtx.beginPath(); tCtx.moveTo(p, minY); tCtx.lineTo(p + (maxY - minY), maxY); tCtx.stroke();
                }
            } else if (value.id === 'stars') {
                for (let px = minX + 10; px <= maxX; px += 24) {
                    for (let py = minY + 10; py <= maxY; py += 24) {
                        tCtx.beginPath(); tCtx.arc(px, py, 4, 0, Math.PI * 2); tCtx.fill();
                    }
                }
            } else if (value.id === 'check') {
                tCtx.lineWidth = 2;
                tCtx.strokeStyle = value.checkColor;
                for (let px = minX; px <= maxX; px += 16) {
                    tCtx.beginPath(); tCtx.moveTo(px, minY); tCtx.lineTo(px, maxY); tCtx.stroke();
                }
                for (let py = minY; py <= maxY; py += 16) {
                    tCtx.beginPath(); tCtx.moveTo(minX, py); tCtx.lineTo(maxX, py); tCtx.stroke();
                }
            }
        }

        const patternImgData = tCtx.getImageData(0, 0, width, height);
        const pData = patternImgData.data;

        // 찾은 영역(matchedPixels)에만 새로운 색상/패턴 픽셀을 적용하여 기존 패턴이 남지 않고 완벽히 덮어씌워지도록 함
        for (let i = 0; i < matchedPixels.length; i++) {
            const [x, y] = matchedPixels[i];
            const pIdx = (y * width + x) * 4;
            
            data[pIdx]     = pData[pIdx];
            data[pIdx + 1] = pData[pIdx + 1];
            data[pIdx + 2] = pData[pIdx + 2];
            data[pIdx + 3] = pData[pIdx + 3];
        }

        ctx.putImageData(imgData, 0, 0);
    }
});
