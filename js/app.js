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

    // --- 1. 만 7세 수준의 30가지 유니크하고 정교한 밑그림 목록 정의 ---
    const sketchTitles = [
        "1. 3단 웨딩 케이크와 촛불", "2. 우주 비행사와 행성 탐사", "3. 산호초와 열대어 무리", "4. 동물들의 피크닉 파티", "5. 중세 시대 마법의 성",
        "6. 티라노사우루스와 화산", "7. 버섯 요정의 숲속 마을", "8. 해바라기 밭과 꿀벌", "9. 대관람차와 롤러코스터", "10. 캠핑 트레일러와 모닥불",
        "11. 강아지 놀이터와 장난감", "12. 무지개 다리와 아기 구름", "13. 보물섬과 해적선 돛", "14. 사파리의 사자와 얼룩말", "15. 우아한 무도회 드레스",
        "16. 대형 소방차와 사다리", "17. 나비와 화려한 장미 정원", "18. 눈사람과 겨울 스노우볼", "19. 첨단 우주 정거장", "20. 이탈리안 화덕 피가게",
        "21. 꼬마 마법사의 물약 실험", "22. 숲속 도서관과 책꽂이", "23. 빙하와 슬라이딩 펭귄", "24. 파도를 넘는 돌고래", "25. 변신 로봇 전사",
        "26. 신비로운 유니콘과 무지개", "27. 거대한 하늘 열기구", "28. 밀림의 알록달록 앵무새", "29. 증기기관차 기차여행", "30. 은하수와 별자리 지도"
    ];

    const sketches = sketchTitles.map((title, index) => ({
        id: index + 1,
        name: title
    }));

    const sketchGrid = document.getElementById('sketch-grid');
    sketches.forEach((sketch, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'sketch-thumb' + (index === 0 ? ' selected' : '');
        thumb.innerHTML = `<span>🎨</span><span style="font-size:9px; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%;">${sketch.id}번</span>`;
        thumb.title = sketch.name;
        
        thumb.addEventListener('click', () => {
            document.querySelectorAll('.sketch-thumb').forEach(t => t.classList.remove('selected'));
            thumb.classList.add('selected');
            drawAge7Sketch(sketch.id);
        });
        sketchGrid.appendChild(thumb);
    });

    // 만 7세(초등 저학년) 수준의 정교하고 디테일한 30가지 밑그림 렌더링 함수
    function drawAge7Sketch(id) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, displayWidth, displayHeight);

        ctx.strokeStyle = "#222222";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.save();

        switch (id) {
            case 1: // 1. 3단 웨딩 케이크와 촛불
                ctx.strokeRect(210, 310, 180, 80);
                ctx.strokeRect(235, 230, 130, 80);
                ctx.strokeRect(260, 160, 80, 70);
                // 촛불 3개
                for(let cx of [280, 300, 320]) {
                    ctx.beginPath(); ctx.rect(cx, 125, 6, 35); ctx.stroke();
                    ctx.beginPath(); ctx.ellipse(cx+3, 115, 5, 10, 0, 0, Math.PI * 2); ctx.stroke();
                }
                // 크림 장식 물결
                for(let x = 210; x < 390; x += 20) {
                    ctx.beginPath(); ctx.arc(x + 10, 310, 10, 0, Math.PI); ctx.stroke();
                    ctx.beginPath(); ctx.arc(x + 25, 230, 8, 0, Math.PI); ctx.stroke();
                }
                break;

            case 2: // 2. 우주 비행사와 행성 탐사
                ctx.beginPath(); ctx.arc(300, 220, 50, 0, Math.PI * 2); ctx.stroke(); // 헬멧
                ctx.beginPath(); ctx.arc(300, 220, 38, 0, Math.PI * 2); ctx.stroke(); // 바이저
                ctx.beginPath(); ctx.rect(265, 270, 70, 90); ctx.stroke(); // 몸체
                // 달 표면 크레이터
                ctx.beginPath(); ctx.arc(150, 360, 40, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(130, 340, 12, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(480, 150, 60, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(480, 150, 90, 25, 0.4, 0, Math.PI * 2); ctx.stroke(); // 토성 고리
                break;

            case 3: // 3. 산호초와 열대어 무리
                for(let i = 0; i < 3; i++) {
                    let ox = 150 + i * 130;
                    ctx.beginPath(); ctx.ellipse(ox, 220, 45, 25, 0.2, 0, Math.PI * 2); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(ox-45, 220); ctx.lineTo(ox-80, 190); ctx.lineTo(ox-80, 250); ctx.closePath(); ctx.stroke();
                    ctx.beginPath(); ctx.arc(ox+20, 210, 4, 0, Math.PI * 2); ctx.fillStyle="#222"; ctx.fill();
                }
                // 해초 디테일
                ctx.beginPath(); ctx.moveTo(80, 400); ctx.bezierCurveTo(110, 320, 60, 250, 90, 180); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(520, 400); ctx.bezierCurveTo(490, 300, 540, 220, 500, 150); ctx.stroke();
                break;

            case 4: // 4. 동물들의 피크닉 파티
                // 곰돌이
                ctx.beginPath(); ctx.arc(200, 230, 50, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(165, 185, 18, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(235, 185, 18, 0, Math.PI * 2); ctx.stroke();
                // 토끼
                ctx.beginPath(); ctx.arc(400, 250, 45, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(385, 150, 12, 45, -0.2, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(420, 150, 12, 45, 0.2, 0, Math.PI * 2); ctx.stroke();
                // 피크닉 매트와 바구니
                ctx.beginPath(); ctx.rect(240, 330, 120, 50); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 330, 25, Math.PI, Math.PI * 2); ctx.stroke();
                break;

            case 5: // 5. 중세 시대 마법의 성
                ctx.strokeRect(230, 180, 140, 180);
                ctx.strokeRect(150, 230, 60, 130);
                ctx.strokeRect(390, 230, 60, 130);
                // 지붕 성곽 장식
                ctx.beginPath(); ctx.moveTo(215, 180); ctx.lineTo(300, 100); ctx.lineTo(385, 180); ctx.closePath(); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(135, 230); ctx.lineTo(180, 170); ctx.lineTo(225, 230); ctx.closePath(); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(375, 230); ctx.lineTo(420, 170); ctx.lineTo(465, 230); ctx.closePath(); ctx.stroke();
                // 아치문과 창문
                ctx.beginPath(); ctx.arc(300, 360, 25, Math.PI, 0, true); ctx.lineTo(325, 360); ctx.lineTo(275, 360); ctx.closePath(); ctx.stroke();
                ctx.strokeRect(275, 210, 20, 35); ctx.strokeRect(305, 210, 20, 35);
                break;

            case 6: // 6. 티라노사우루스와 화산
                // 공룡 몸체
                ctx.beginPath(); ctx.ellipse(280, 280, 90, 50, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(370, 220, 35, 0, Math.PI * 2); ctx.stroke(); // 머리
                ctx.beginPath(); ctx.moveTo(190, 290); ctx.lineTo(80, 340); ctx.lineTo(200, 340); ctx.closePath(); ctx.stroke(); // 꼬리
                // 배경 화산
                ctx.beginPath(); ctx.moveTo(400, 380); ctx.lineTo(500, 200); ctx.lineTo(530, 200); ctx.lineTo(600, 380); ctx.closePath(); ctx.stroke();
                break;

            case 7: // 7. 버섯 요정의 숲속 마을
                // 대형 버섯 집
                ctx.beginPath(); ctx.ellipse(300, 200, 110, 55, 0, 0, Math.PI * 2); ctx.stroke(); // 갓
                ctx.strokeRect(260, 200, 80, 160); // 기둥
                // 창문과 문
                ctx.beginPath(); ctx.arc(300, 260, 18, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 360, 18, Math.PI, 0, true); ctx.lineTo(318, 360); ctx.lineTo(282, 360); ctx.closePath(); ctx.stroke();
                break;

            case 8: // 8. 해바라기 밭과 꿀벌
                ctx.beginPath(); ctx.arc(300, 220, 45, 0, Math.PI * 2); ctx.stroke(); // 꽃심
                for(let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
                    let fx = 300 + Math.cos(angle) * 75;
                    let fy = 220 + Math.sin(angle) * 75;
                    ctx.beginPath(); ctx.arc(fx, fy, 22, 0, Math.PI * 2); ctx.stroke();
                }
                ctx.beginPath(); ctx.rect(292, 265, 16, 120); ctx.stroke(); // 줄기
                break;

            case 9: // 9. 대관람차와 롤러코스터
                ctx.beginPath(); ctx.arc(300, 220, 110, 0, Math.PI * 2); ctx.stroke(); // 관람차 휠
                for(let i=0; i<6; i++) {
                    let angle = (i * Math.PI) / 3;
                    ctx.beginPath(); ctx.moveTo(300, 220); ctx.lineTo(300 + Math.cos(angle)*110, 220 + Math.sin(angle)*110); ctx.stroke();
                }
                break;

            case 10: // 10. 캠핑 트레일러와 모닥불
                ctx.strokeRect(180, 210, 180, 110);
                ctx.beginPath(); ctx.arc(220, 320, 20, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(320, 320, 20, 0, Math.PI * 2); ctx.stroke();
                // 모닥불
                ctx.beginPath(); ctx.moveTo(440, 330); ctx.lineTo(460, 270); ctx.lineTo(480, 330); ctx.closePath(); ctx.stroke();
                break;

            case 11: // 11. 강아지 놀이터와 장난감
                ctx.beginPath(); ctx.arc(230, 240, 45, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(195, 200, 15, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(265, 200, 15, 0, Math.PI * 2); ctx.stroke();
                // 뼈다귀 장난감
                ctx.beginPath(); ctx.rect(350, 260, 60, 25); ctx.stroke();
                break;

            case 12: // 12. 무지개 다리와 아기 구름
                ctx.beginPath(); ctx.arc(300, 320, 150, Math.PI, 0, false); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 320, 120, Math.PI, 0, false); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 320, 90, Math.PI, 0, false); ctx.stroke();
                break;

            case 13: // 13. 보물섬과 해적선 돛
                ctx.beginPath(); ctx.moveTo(150, 350); ctx.lineTo(450, 350); ctx.lineTo(400, 200); ctx.lineTo(200, 200); ctx.closePath(); ctx.stroke(); // 배 몸체
                ctx.beginPath(); ctx.rect(295, 100, 10, 100); ctx.stroke(); // 돛대
                ctx.beginPath(); ctx.moveTo(305, 110); ctx.quadraticCurveTo(360, 130, 305, 180); ctx.stroke(); // 돛
                break;

            case 14: // 14. 사파리의 사자와 얼룩말
                ctx.beginPath(); ctx.arc(230, 230, 50, 0, Math.PI * 2); ctx.stroke(); // 사자 머리
                for(let a=0; a<Math.PI*2; a+=Math.PI/5) {
                    ctx.beginPath(); ctx.arc(230 + Math.cos(a)*55, 230 + Math.sin(a)*55, 18, 0, Math.PI*2); ctx.stroke();
                }
                ctx.beginPath(); ctx.arc(400, 240, 45, 0, Math.PI * 2); ctx.stroke(); // 얼룩말 머리
                break;

            case 15: // 15. 우아한 무도회 드레스
                ctx.beginPath(); ctx.moveTo(270, 150); ctx.lineTo(330, 150); ctx.lineTo(370, 380); ctx.lineTo(230, 380); ctx.closePath(); ctx.stroke();
                ctx.beginPath(); ctx.arc(300, 130, 25, 0, Math.PI * 2); ctx.stroke();
                break;

            case 16: // 16. 대형 소방차와 사다리
                ctx.strokeRect(150, 220, 240, 110);
                ctx.beginPath(); ctx.arc(200, 330, 22, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(330, 330, 22, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.rect(170, 180, 200, 25); ctx.stroke(); // 사다리
                break;

            case 17: // 17. 나비와 화려한 장미 정원
                // 장미꽃
                for(let cx of [200, 300, 400]) {
                    ctx.beginPath(); ctx.arc(cx, 280, 35, 0, Math.PI * 2); ctx.stroke();
                    ctx.beginPath(); ctx.arc(cx, 280, 20, 0, Math.PI * 2); ctx.stroke();
                    ctx.beginPath(); ctx.arc(cx, 280, 8, 0, Math.PI * 2); ctx.stroke();
                }
                break;

            case 18: // 18. 눈사람과 겨울 스노우볼
                ctx.beginPath(); ctx.arc(300, 250, 130, 0, Math.PI * 2); ctx.stroke(); // 스노우볼 구체
                ctx.beginPath(); ctx.arc(300, 280, 45, 0, Math.PI * 2); ctx.stroke(); // 눈사람 몸
                ctx.beginPath(); ctx.arc(300, 215, 30, 0, Math.PI * 2); ctx.stroke(); // 눈사람 머리
                break;

            case 19: // 19. 첨단 우주 정거장
                ctx.strokeRect(220, 180, 160, 100);
                ctx.strokeRect(130, 210, 80, 40); // 태양광 패널 좌
                ctx.strokeRect(390, 210, 80, 40); // 태양광 패널 우
                break;

            case 20: // 20. 이탈리안 화덕 피자가게
                ctx.beginPath(); ctx.arc(300, 260, 90, Math.PI, 0, false); ctx.stroke(); // 화덕
                ctx.beginPath(); ctx.arc(300, 280, 50, Math.PI, 0, false); ctx.stroke(); // 입구
                break;

            case 21: // 21. 꼬마 마법사의 물약 실험
                ctx.beginPath(); ctx.moveTo(270, 180); ctx.lineTo(330, 180); ctx.lineTo(350, 320); ctx.lineTo(250, 320); ctx.closePath(); ctx.stroke(); // 플라스크
                ctx.beginPath(); ctx.rect(285, 140, 30, 40); ctx.stroke(); // 입구
                break;

            case 22: // 22. 숲속 도서관과 책꽂이
                ctx.strokeRect(160, 140, 280, 240);
                ctx.beginPath(); ctx.moveTo(160, 220); ctx.lineTo(440, 220); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(160, 300); ctx.lineTo(440, 300); ctx.stroke();
                break;

            case 23: // 23. 빙하와 슬라이딩 펭귄
                ctx.beginPath(); ctx.ellipse(300, 300, 160, 60, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(250, 230, 35, 50, 0.3, 0, Math.PI * 2); ctx.stroke(); // 펭귄
                break;

            case 24: // 24. 파도를 넘는 돌고래
                ctx.beginPath(); ctx.moveTo(150, 320); ctx.quadraticCurveTo(300, 150, 450, 320); ctx.stroke(); // 파도
                ctx.beginPath(); ctx.ellipse(300, 220, 65, 30, -0.4, 0, Math.PI * 2); ctx.stroke(); // 돌고래
                break;

            case 25: // 25. 변신 로봇 전사
                ctx.strokeRect(250, 160, 100, 90); // 머리
                ctx.strokeRect(220, 260, 160, 110); // 몸통
                ctx.beginPath(); ctx.arc(300, 210, 15, 0, Math.PI * 2); ctx.stroke(); // 눈
                break;

            case 26: // 26. 신비로운 유니콘과 무지개
                ctx.beginPath(); ctx.ellipse(280, 240, 75, 45, 0, 0, Math.PI * 2); ctx.stroke(); // 몸체
                ctx.beginPath(); ctx.arc(380, 180, 35, 0, Math.PI * 2); ctx.stroke(); // 머리
                ctx.beginPath(); ctx.moveTo(395, 155); ctx.lineTo(420, 100); ctx.lineTo(385, 145); ctx.closePath(); ctx.stroke(); // 뿔
                break;

            case 27: // 27. 거대한 하늘 열기구
                ctx.beginPath(); ctx.arc(300, 190, 85, 0, Math.PI * 2); ctx.stroke(); // 풍선
                ctx.strokeRect(275, 310, 50, 45); // 바구니
                ctx.beginPath(); ctx.moveTo(270, 265); ctx.lineTo(285, 310); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(330, 265); ctx.lineTo(315, 310); ctx.stroke();
                break;

            case 28: // 28. 밀림의 알록달록 앵무새
                ctx.beginPath(); ctx.ellipse(280, 250, 50, 75, 0.3, 0, Math.PI * 2); ctx.stroke(); // 몸
                ctx.beginPath(); ctx.arc(320, 170, 30, 0, Math.PI * 2); ctx.stroke(); // 머리
                ctx.beginPath(); ctx.moveTo(340, 175); ctx.lineTo(380, 185); ctx.lineTo(345, 195); ctx.closePath(); ctx.stroke(); // 부리
                break;

            case 29: // 29. 증기기관차 기차여행
                ctx.strokeRect(170, 210, 130, 110); // 기관차
                ctx.strokeRect(320, 230, 110, 90);  // 객차
                ctx.beginPath(); ctx.arc(205, 335, 20, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(265, 335, 20, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(375, 335, 20, 0, Math.PI * 2); ctx.stroke();
                break;

            case 30: // 30. 은하수와 별자리 지도
                for(let i=0; i<12; i++) {
                    let bx = 120 + (i * 35);
                    let by = 150 + Math.sin(i) * 80;
                    ctx.beginPath(); ctx.arc(bx, by, 6, 0, Math.PI * 2); ctx.stroke();
                    if(i > 0) {
                        ctx.beginPath(); ctx.moveTo(bx-35, 150 + Math.sin(i-1)*80); ctx.lineTo(bx, by); ctx.stroke();
                    }
                }
                break;

            default:
                ctx.strokeRect(200, 180, 200, 150);
                break;
        }

        ctx.restore();
    }

    // 첫 번째 도안 기본 로드
    drawAge7Sketch(1);

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
