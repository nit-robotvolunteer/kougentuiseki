// quiz.js
const quizData = [
    // ジャンルA
    { genre: "A", q: "このロボットが懐中電灯などの光を追いかけて走る動きを、何といますか？", a: ["光源追跡", "光源追尾", "光線追跡"], correct: 0, ex: "ロボットに光を当てると光を走って追いかける動きを光源追跡と言います。" },
    { genre: "A", q: "ロボットが小型モーターの力を受けてタイヤを回し走る時に利用している車輪の仕組みを何と言いますか？", a: ["ギア車", "摩擦車", "滑車"], correct: 1, ex: "摩擦車を利用し、小型モーターから力を受けることでタイヤが回り走ります。" },
    { genre: "A", q: "スイッチを入れるとLEDが光りますが、この時ロボットはどのような状態ですか？", a: ["電池が切れた", "故障している", "モータが動く準備ができた"], correct: 2, ex: "スイッチを入れるとLEDが光り、モータが動く準備ができたことを知らせます。" },
    { genre: "A", q: "ロボットを動かすために、外から当てる必要がある道具は何ですか？", a: ["懐中電灯", "うちわ", "磁石"], correct: 0, ex: "懐中電灯の光でロボットを動かすことができます。" },
    { genre: "A", q: "この光源追跡ロボットのモデル番号は何番ですか？", a: ["RoVoK-04", "RoVoK-01", "RoVoK-03"], correct: 0, ex: "RoVoK-04です。" },
    { genre: "A", q: "タイヤを回すための力は、もともとどこから発生していますか？", a: ["小型モーター", "電池の重さ", "太陽の光"], correct: 0, ex: "小型モーターから力を受けることでタイヤが回り走ります。" },
    { genre: "A", q: "電源を入れた時にモータの準備完了を知らせる部品の名前は何ですか？", a: ["LED", "トランジスタ", "コンデンサ"], correct: 0, ex: "スイッチを入れるとLEDが光り、モータが動く準備ができたことを知らせます。" },
    { genre: "A", q: "光を感じる部品を取り付ける場所には何が書いてありますか？", a: ["Q1とQ2", "R1とR2", "D1とD2"], correct: 0, ex: "基板にQ1・Q2と書いています。" },
    { genre: "A", q: "電源をスイッチを取り付ける場所にはどんなことが書いてありますか？", a: ["SW1", "PW1", "ON1"], correct: 0, ex: "基板にSW1と書いています。" },
    { genre: "A", q: "タイヤを回すための力はモーターから何という仕組みを通って伝わりますか？", a: ["摩擦車", "ベルト", "ギア"], correct: 0, ex: "摩擦車を利用し、小型モーターから力を受けることでタイヤが回ります。" },    
    
    // ジャンルB
    { genre: "B", q: "はんだ付けを始める時部品の足とランドをはんだごてで同時に温める時間は、およそ何秒間くらいですか？", a: ["1秒間", "3秒間", "10秒間"], correct: 1, ex: "はんだごてで部品の足とランド（基板の穴の周り)を同時に3秒間くらい温めます。" },
    { genre: "B", q: "はんだを溶かし流し込む時にはんだの先をどこに滑り込ませるようにしますか？", a: ["はんだごての先とランドの間", "部品の足の真上", "基板の裏側"], correct: 0, ex: "はんだごての先とランドの間にはんだを滑りこませるように溶かし流しこみます。" },
    { genre: "B", q: "はんだを離すタイミングは、はんだがどのような状態になった時ですか？", a: ["全体に流れた時", "煙が出た時", "色が黒くなった時"], correct: 0, ex: "はんだが全体に流れ、濡れたような状態になったら、まずはんだを離してはんだごてを離します。" },
    { genre: "B", q: "正しくはんだ付けができた時に溶けたはんだがどのような形になっていればOKですか？", a: ["丸い形", "平らな形", "山の形"], correct: 2, ex: "はんだが山の形になればOKです。" },
    { genre: "B", q: "はんだが溶けて濡れたような状態になったら、どちらを先に離すのが正しい手順ですか？", a: ["はんだを離してからはんだごてを離す", "はんだごてを離しからはんだを離す", "同時に離す"], correct: 0, ex: "はんだが全体に流れ、濡れたような状態になったら、まずはんだを離し、最後にはんだごてを離します。" },
    { genre: "B", q: "はんだ付けをする前に部品が基板から抜け落ちないように足をどんな形で広げますか？", a: ["ハの字", "八の字", "くの字"], correct: 1, ex: "部品の足を八の字に広げます。" },
    { genre: "B", q: "はんだ付けが終わった後、部品の余分な足を切りますが、その時に守るべきことは何ですか？", a: ["足を持ちながら切る", "一気に素早く切る", "根元を切る"], correct: 0, ex: "部品の足を切る時は、足を持ちながら切ります。" },
    { genre: "B", q: "溶けて流れるまで加熱が必要ですが、はんだがどのような状態になるまで溶かし続けますか？", a: ["全体に流れていくまで", "丸く固まるまで", "基板が焦げるまで"], correct: 0, ex: "はんだが全体に流れていくまで溶かします。" },
    { genre: "B", q: "トランジスタを基板に取り付ける前に足に対してしなければならない準備は何ですか？", a: ["足を曲げる", "足を切る", "足に色を塗る"], correct: 0, ex: "トランジスタは取り付ける時に足を曲げます。" },
    { genre: "B", q: "はんだ付けをする時に部品の足と一緒に温める基板の穴の周りのことを何と呼びますか？", a: ["ランド", "アイランド", "シーサイド"], correct: 0, ex: "はんだごてで部品の足とランドを同時に温めます。" },
    { genre: "B", q: "説明書に書いてある正しいはんだ付けの手順は全部で何ステップですか？", a: ["4ステップ", "3ステップ", "5ステップ"], correct: 0, ex: "正しい手順は①温める、②滑り込ませる、③溶かす、④離すの4段階です。" },
    { genre: "B", q: "はんだ付けをする前に部品の足を広げるのはなぜですか？", a: ["抜け落ちないようにするため", "電気が通りやすくするため", "冷めやすくするため"], correct: 0, ex: "部品が抜け落ちないように、足を八の字に広げます。" },

    // ジャンルC
    { genre: "C", q: "この光源追跡マイクロロボットの電気回路で使う抵抗の部品は全部でいくつありますか？", a: ["1つ", "2つ", "3つ"], correct: 2, ex: "抵抗は抵抗1、抵抗2、抵抗3の合計3つです。" },
    { genre: "C", q: "LEDやトランジスタを取り付ける時に短い足は基板の穴のどの形に入れますか？", a: ["丸い穴", "四角い穴", "三角の穴"], correct: 1, ex: "短い足を四角い穴に、長い足を丸い穴に取り付けます。" },
    { genre: "C", q: "基板のR3と書かれた場所に取り付ける抵抗はどの抵抗値を使いますか？", a: ["10kΩ", "75Ω", "1kΩ"], correct: 1, ex: "R3に75Ωを取り付けます（R1・R2には10kΩを取り付けます）。" },
    { genre: "C", q: "電池を使う時の注意点として特にしてはいけないことは何ですか？", a: ["電池を逆向きに入れる", "電池を並べて置く", "電池にテープを貼る"], correct: 0, ex: "電池は逆向きに入れないでください。" },
    { genre: "C", q: "ロボットが光を感じ取るための前に飛び出すように取り付ける部品は何ですか？", a: ["フォトダイオード", "フォトトランジスタ", "フォトセンサー"], correct: 1, ex: "ロボットが光を感じ取るための部品は、フォトトランジスタと言います。" },
    { genre: "C", q: "ロボットが走るために使うモータと電池フォルダはそれぞれいくつ使われていますか？", a: ["1つずつ", "2つずつ", "3つずつ"], correct: 1, ex: "モータ1、モータ2（2つ）と、電池フォルダが2つずつ使われています。" },
    { genre: "C", q: "抵抗R1と抵抗R2に使う抵抗値はいくつですか？", a: ["75Ω", "100Ω", "10kΩ"], correct: 2, ex: "R1・R2に10kΩ を取り付けます。" },
    { genre: "C", q: "75Ωの抵抗には何色のしま模様がついていますか？", a: ["4色", "3色", "5色"], correct: 0, ex: "75Ωの抵抗は紫・緑・黒・金の4色の模様がついています。" },
    { genre: "C", q: "10kΩの抵抗には何色のしま模様がついていますか？", a: ["4色", "3色", "6色"], correct: 0, ex: "10kΩの抵抗には茶・黒・橙・金の4色の模様がついています。" },
    { genre: "C", q: "このロボットを完成させるために必要なLEDは全部でいくつですか？", a: ["1つ", "2つ", "3つ"], correct: 0, ex: "LEDは1つです。" },
    { genre: "C", q: "抵抗75Ωの左から2番目のしま模様は何色ですか？", a: ["緑色", "紫色", "黒色"], correct: 0, ex: "75Ωの抵抗は紫・緑・黒・金の順に模様がついています。" },
    { genre: "C", q: "抵抗10kΩの左から3番目のしま模様は何色ですか？", a: ["橙色", "茶色", "金色"], correct: 0, ex: "10kΩの抵抗には茶・黒・橙・金の順に模様がついています。" },
    { genre: "C", q: "トランジスタを取り付ける2つの場所には何が書いてありますか？", a: ["Q1とQ2", "TR1とTR2", "A1とA2"], correct: 0, ex: "基板の図面にQ1・Q2と記されています。" },
    { genre: "C", q: "長い足を丸い穴に短い足を四角い穴に入れる部品はLEDともう一つは何ですか？", a: ["フォトトランジスタ", "抵抗", "トランジスタ"], correct: 0, ex: "LEDとフォトトランジスタの両方に短い足を四角い穴に入れます。" },

    // ジャンルD
    { genre: "D", q: "車輪を取り付けた後、組み立てが正しくできたかどうか確認する方法は何ですか？", a: ["水平な机の上に置く", "車体を振ってみる", "手で少し引っ張る"], correct: 1, ex: "車体を振ってみて、車輪が外れなければ取り付け完了です。" },
    { genre: "D", q: "トランジスタをQ1やQ2に取り付ける時に向きを間違えないように何をしますか？", a: ["基板の模様", "自分の直感", "ネジの向き"], correct: 0, ex: "トランジスタの上部の形を基板の模様と合わせることが必要です。" },
    { genre: "D", q: "電池の電気がなくなってしまった場合その電池を何ゴミとして捨てるようにしますか？", a: ["燃えるゴミ", "資源ゴミ", "燃えないゴミ"], correct: 2, ex: "電池がなくなったら、燃えないゴミとして捨ててください。" },
    { genre: "D", q: "モーターを後ろの車体パーツに取り付ける時に配線をどのようにする必要がありますか？", a: ["配線を交差させながら", "配線をまっすぐ伸ばして", "配線が触れないように"], correct: 0, ex: "モーターを配線を交差させながら、後ろの車体パーツに取り付けます。" },
    { genre: "D", q: "車輪を取り付ける時に最後に入れる車輪止めパーツはどこにある穴に差し込みますか？", a: ["車軸パーツの穴", "モーターの穴", "基板の穴"], correct: 0, ex: "車輪止めパーツを車軸パーツの穴に差し込みます。" },
    { genre: "D", q: "モーターを取り付けるのは、前と後ろどちらの車体パーツですか？", a: ["後ろの車体パーツ", "前の車体パーツ", "どちらでもよい"], correct: 0, ex: "モーターを後ろの車体パーツに取り付けます。" },
    { genre: "D", q: "目のシールを貼るのは前と後ろのどちらの車体パーツですか？", a: ["前の車体パーツ", "後ろの車体パーツ", "車輪の上"], correct: 0, ex: "前の車体パーツに目のシールを貼り付けて完成です。" },
    { genre: "D", q: "組み立ての最後にロボットを完成させるために行うことは何ですか？", a: ["目のシールを貼る", "名前を書く", "電池を抜く"], correct: 0, ex: "前の車体パーツに目のシールを貼り付けて完成です。" },
    { genre: "D", q: "基板と車体パーツをくっつける時に何を使いますか？", a: ["両面テープ", "接着剤", "はんだ"], correct: 0, ex: "車体パーツの両面テープをはがし、基板と車体パーツをくっつけます。" },

    // ジャンルE
    { genre: "E", q: "後ろの車体パーツにある電池を入れる場所が、どの向きになるように取り付けますか？", a: ["外側", "内側", "上向き"], correct: 0, ex: "電池の挿入口が外側になるように取り付けます。" },
    { genre: "E", q: "工作をしている時に絶対にやってはいけない注意点は何ですか？", a: ["食べたり飲んだりする", "座って作業する", "説明書を読む"], correct: 0, ex: "食べたり飲んだりしないでください。" },
    { genre: "E", q: "はんだごての部品の中で、絶対に触ってはいけないのはどの部分ですか？", a: ["金属部分", "持ち手部分", "コード"], correct: 0, ex: "絶対に熱い金属部分にさわらない。" },
    { genre: "E", q: "車輪を組み立てる時に車輪パーツは車体パーツの内側と外側のどちらから差し込みますか？", a: ["外側", "内側", "横側"], correct: 0, ex: "後ろの車体パーツの外側から車輪パーツを差し込む。" },
    { genre: "E", q: "電池の扱いについて、やってはいけないことはショート・分解・加熱のほかに何がありますか？", a: ["充電", "保管", "交換"], correct: 0, ex: "電池の充電・ショート・分解・加熱は危険です。" },
    { genre: "E", q: "配線についてモーターを車体に取り付ける時に注意することは何ですか？", a: ["配線の色", "配線の太さ", "配線の長さ"], correct: 0, ex: "取り付ける配線の色を間違えないようにします。" }
];

// 離脱防止アラート
window.onbeforeunload = function(e) {
    return "ページを離れると今まで答えたクイズがリセットされます。";
};

let shuffledQuestions = [];
let userAnswers = {}; // 回答保持用
let currentIndex = 0;
let timeLeft = 900; // 15分
let timerInterval;

function initQuiz() {
    // 1. 全データからランダムに20問を抽出
    const selected = [...quizData].sort(() => Math.random() - 0.5).slice(0, 20);

    // 2. 各問題の選択肢(a)をシャッフルし、correct(正解インデックス)を更新
    shuffledQuestions = selected.map(q => {
        // 元の正解テキストを保持
        const correctText = q.a[q.correct];
        // 選択肢をコピーしてシャッフル
        const shuffledChoices = [...q.a].sort(() => Math.random() - 0.5);
        // シャッフル後の配列内で、元の正解がどこにあるか探し直す
        const newCorrectIndex = shuffledChoices.indexOf(correctText);
        
        return {
            ...q,
            a: shuffledChoices,
            correct: newCorrectIndex
        };
    });

    renderIntro();
}
function renderIntro() {
    const app = document.getElementById('quiz-app');
    app.innerHTML = `
        <div class="quiz-intro">
            <h2>ロボットクイズに挑戦！</h2>
            <ul>                
                <li>制限時間は全体で15分です。</li>
                <li>クイズの問題は全部で20問です。</li>
                <li>答えを3択から選択してください。</li>
            </ul>
    
            <ul>
                <li>5つのジャンルから出題されます</li>
                <ul style="padding-left: 7px;">
                   <li>ジャンルA：ロボットの仕組み・特徴</li>
                   <li>ジャンルB：工作（はんだ付け）の基本</li>
                   <li>ジャンルC：部品（パーツ）について</li>
                   <li>ジャンルD：車体・組み立ての順序</li>
                   <li>ジャンルE：安全と組み立て</li>
                </ul>
            </ul>
            <button class="option-btn" style="text-align:center; background:#4c7cb2; color:white;" onclick="startQuiz()">クイズをはじめる！</button>
        </div>
    `;
}

function startQuiz() {
    startTimer();
    renderQuestion();
}

function renderQuestion() {
    const q = shuffledQuestions[currentIndex];
    const app = document.getElementById('quiz-app');
    
    let navDots = shuffledQuestions.map((_, i) => 
        `<div class="nav-dot ${i === currentIndex ? 'active' : ''} ${userAnswers[i] !== undefined ? 'answered' : ''}" onclick="goTo(${i})">${i+1}</div>`
    ).join('');


    app.innerHTML = `
        <div class="timer-bar"><div id="progress"></div></div>
        <div class="question-nav">${navDots}</div>
        <span class="genre-badge">ジャンル ${q.genre}</span>
        <span class="quiz-number">問${currentIndex + 1}</span>
        <h3 class="quiz-tittle">${q.q}</h3>
        <div id="options">
            ${q.a.map((opt, i) => `
                <button class="option-btn ${userAnswers[currentIndex] === i ? 'selected' : ''}" onclick="selectOption(${i})">
                    ${opt}
                </button>
            `).join('')}
        </div>
        <div class="operation-btn">
            <button onclick="goTo(${currentIndex-1})" ${currentIndex===0?'disabled':''}>まえへ</button>
            ${currentIndex === 19 ? '<button onclick="showResult()">結果をみる！</button>' : `<button onclick="goTo(${currentIndex+1})">つぎへ</button>`}
        </div>
    `;

    // 描画した瞬間に現在の残り時間をプログレスバーに反映させる
    updateTimerDisplay();
}

function selectOption(index) {
    userAnswers[currentIndex] = index;
    renderQuestion();
}

function goTo(index) {
    if(index >= 0 && index < 20) {
        currentIndex = index;
        renderQuestion();
    }
}

// プログレスバーの表示を更新する関数を独立
function updateTimerDisplay() {
    const progress = document.getElementById('progress');
    if(progress) {
        progress.style.width = (timeLeft / 900 * 100) + "%";
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        // 共通の表示更新関数を呼び出す
        updateTimerDisplay();
        if(timeLeft <= 0) showResult();
    }, 1000);
}

function showResult() {
    clearInterval(timerInterval);
    window.onbeforeunload = null; // アラート解除
    let score = 0;
    shuffledQuestions.forEach((q, i) => {
        if(userAnswers[i] === q.correct) score++;
    });

    const app = document.getElementById('quiz-app');
    app.innerHTML = `
        <div class="score-screen">
            <h2>結果発表！</h2>
            <div class="score-circle"><div>${score}/20</div><div style="font-size:0.4em">せいかい</div></div>
            <h3>解説を読んでみよう</h3>
            ${shuffledQuestions.map((q, i) => `
                <div class="explanation-card">
                    <strong>問${i+1}: ${userAnswers[i] === q.correct ? '✅正解' : '❌不正解'}</strong><br>
                    <span>あなたの回答：</span><span class="user-ans">${userAnswers[i] !== undefined ? q.a[userAnswers[i]] : '未回答'}</span><br>
                    <span>正解：</span><strong>${q.a[q.correct]}</strong><br>
                    <small>解説：</small><small>${q.ex}</small>
                </div>
            `).join('')}
            <button class="option-btn" id="restart-btn" onclick="location.reload()" style="text-align:center;">もういちど挑戦する</button>
            ${score === 20 ? `<button class="option-btn" id="cert-open-btn" onclick="openCertModal()" style="text-align:center; background:#ffcc00; border-color:#ff9900; font-weight:bold;">合格証を表示する</button>` : ''}
        </div>
    `;
}

// --- 合格証生成ロジック ---
// モーダルを開く
function openCertModal() {
    if (document.getElementById('cert-modal')) return;

    const modalHtml = `
        <div id="cert-modal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); display:flex; justify-content:center; align-items:center; z-index:10000;" onclick="closeCertModal()">
            <div style="background:white; padding:20px; border-radius:15px; width:90%; max-width:640px; text-align:center; position:relative;" onclick="event.stopPropagation()">
                <h2 style="margin-top:0; color:#4c7cb2;">おめでとう！合格証だよ</h2>
                <p style="font-size:14px;">なまえを入力してね（6文字まで）</p>
                <input type="text" id="cert-user-name" maxlength="6" placeholder="なまえをいれてね" 
                    style="font-size:18px; padding:10px; width:80%; border:2px solid #4c7cb2; border-radius:8px; margin-bottom:15px; text-align:center;">
                <div id="canvas-wrapper" style="width:100%; overflow:hidden; border:1px solid #ccc; margin-bottom:15px;">
                    <canvas id="cert-canvas" width="600" height="400" style="width:100%; height:auto; display:block;"></canvas>
                </div>
                <button onclick="downloadCert()" style="background:#4CAF50; color:white; border:none; padding:12px 24px; border-radius:8px; font-size:16px; cursor:pointer; font-weight:bold;">画像を保存する</button>
                <p style="font-size:12px; color:#666; margin-top:10px;">※背景をタッチすると閉じます</p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const nameInput = document.getElementById('cert-user-name');
    const canvas = document.getElementById('cert-canvas');
    const ctx = canvas.getContext('2d');
    const bgImg = new Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.src = "/kougentuiseki/image/goukakusyo/goukakusyo1.png"; // 同階層にある画像

    // 描画更新処理
    const updateCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bgImg, 0, 0, 600, 400);
        
        // 名前の描画
        const name = nameInput.value;
        ctx.font = "bold 24px 'Zen Maru Gothic', sans-serif";
        ctx.fillStyle = "#1a2a44";
        ctx.textAlign = "right";
        // 「さん」の左側に配置（画像内の位置調整: x=455付近）
        ctx.fillText(name, 300, 100); 
    };

    bgImg.onload = updateCanvas;

    // 入力制限バリデーション
    nameInput.addEventListener('input', (e) => {
        // 拗音、促音、濁音、半濁音の除外
        const forbidden = /[ぁぃぅぇぉっァィゥェォッがぎぐげござじずぜぞぢづでどばびぶべぼぱぴぷぺぽガギグゲゴザジズゼゾヂヅデドバビブベボパピプペポ]/g;
        e.target.value = e.target.value.replace(forbidden, '');
        updateCanvas();
    });
}

// モーダルを閉じる
function closeCertModal() {
    const modal = document.getElementById('cert-modal');
    if (modal) modal.remove();
}

// 画像保存（ダウンロード）
function downloadCert() {
    const canvas = document.getElementById('cert-canvas');
    const name = document.getElementById('cert-user-name').value || "マイスター";
    const link = document.createElement('a');
    link.download = `${name}_合格証.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

initQuiz();

initQuiz();
