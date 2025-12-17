// quiz.js
const quizData = [
    // ジャンルA
    { genre: "A", q: "このロボットが懐中電灯などの光を追いかけて走る動きを、説明書では何と呼んでいますか？", a: ["光源追跡", "光ダッシュ", "光キャッチ"], correct: 0, ex: "ロボットに光を当てると光を走って追いかける動きを光源追跡と言います。" },
    { genre: "A", q: "ロボットが小型モーターの力を受けてタイヤを回し走るときに利用している車輪の仕組みを何と言いますか？", a: ["ギア車", "摩擦車", "滑車"], correct: 1, ex: "摩擦車を利用し、小型モーターから力を受けることでタイヤが回り走ります。" },
    { genre: "A", q: "スイッチを入れるとLEDが光りますが、これはロボットのどのような状態を知らせるためのものですか？", a: ["電池が切れたこと", "故障していること", "モータが動く準備ができたこと"], correct: 2, ex: "スイッチを入れるとLEDが光り、モータが動く準備ができたことを知らせます。" },
    
    // ジャンルB
    { genre: "B", q: "はんだ付けを始めるとき、部品の足とランドを、はんだごてで同時に温める時間は、およそ何秒間くらいですか？", a: ["1秒間", "3秒間くらい", "10秒間"], correct: 1, ex: "はんだごてで部品の足とランド（基板の穴の周り)を同時に3秒間くらい温めます。" },
    { genre: "B", q: "正しく はんだ付けができたとき、溶けた はんだがどのような形になっていれば「OK」と説明されていますか？", a: ["丸い形", "平らな形", "山の形"], correct: 2, ex: "はんだが山の形になればOKです。" },
    { genre: "B", q: "はんだが溶けて濡れたような状態になったら、はんだごてとはんだのどちらを先に離すのが正しい手順ですか？", a: ["まず はんだを離し、最後にはんだごてを離す", "まず はんだごてを離し、最後にはんだを離す", "同時に離す"], correct: 0, ex: "はんだが全体に流れ、濡れたような状態になったら、まず はんだを離し、最後にはんだごてを離します。" },
    { genre: "B", q: "はんだ付けをする前に、部品が基板から抜け落ちないように、部品の足を広げますが、その形はどんな字に似せて広げますか？", a: ["ハの字", "八の字", "くの字"], correct: 1, ex: "部品の足を八の字に広げます。" },
    { genre: "B", q: "はんだ付けが終わった後、部品の余分な足をニッパーで切りますが、基板に負担をかけないように、足を切るときに守るべき注意点は何ですか？", a: ["足を持ちながら切る", "一気に素早く切る", "根元から無理やり切る"], correct: 0, ex: "部品の足を切るときは、足を持ちながら切ります。" },

    // ジャンルC
    { genre: "C", q: "この光源追跡ロボットの電気回路で使う「抵抗」の部品は全部でいくつありますか？", a: ["1つ", "2つ", "3つ"], correct: 2, ex: "抵抗は抵抗1、抵抗2、抵抗3の合計3つです。" },
    { genre: "C", q: "LEDやトランジスタを取り付ける際、長い足と短い足がある場合、短い足は基板の穴のどちらの形に入れればよいですか？", a: ["丸い穴", "四角い穴", "三角の穴"], correct: 1, ex: "短い足を四角い穴に、長い足を丸い穴に取り付けます。" },
    { genre: "C", q: "基板の「R3」と書かれた場所に取り付ける抵抗は、どちらの抵抗値のものを使いますか？", a: ["10kΩ", "75Ω", "1kΩ"], correct: 1, ex: "R3に75Ωを取り付けます（R1・R2には10kΩを取り付けます）。" },
    { genre: "C", q: "電池を使う時の注意点として、電池の向きに関して特にしてはいけないと書かれていることは何ですか？", a: ["電池を逆向きに入れない", "電池を並べて置かない", "電池にシールを貼らない"], correct: 0, ex: "電池は逆向きに入れないでください。" },
    { genre: "C", q: "このロボットが光を感じ取るための、顔のように前方に突き出すように取り付ける部品の名前は何ですか？", a: ["フォトダイオード", "フォトトランジスタ", "光センサー"], correct: 1, ex: "ロボットが光を感じ取るための部品は、フォトトランジスタと言います。" },
    { genre: "C", q: "ロボットが走るために使っている小型モータと、電池フォルダは、それぞれいくつ使われていますか？", a: ["1つずつ", "2つずつ", "3つずつ"], correct: 1, ex: "モータ1、モータ2（2つ）と、電池フォルダが2つずつ使われています。" },
    { genre: "C", q: "抵抗R1と抵抗R2に使う抵抗値は、いくつですか？", a: ["75Ω", "100Ω", "10kΩ"], correct: 2, ex: "R1・R2に10kΩ を取り付けます。" },

    // ジャンルD
    { genre: "D", q: "車輪を取り付けた後、組み立てが正しくできたかどうか確認するテスト方法として何と書かれていますか？", a: ["水に浮かべてみる", "車体を振ってみて、車輪が外れないか確認する", "手で強く引っ張る"], correct: 1, ex: "車体を振ってみて、車輪が外れなければ取り付け完了です。" },
    { genre: "D", q: "トランジスタを基板のQ1やQ2に取り付ける際、向きを間違えないために何を合わせる必要がありますか？", a: ["基板の模様", "自分の直感", "ネジの向き"], correct: 0, ex: "トランジスタの「上部の形を基板の模様と合わせる」ことが必要です。" },
    { genre: "D", q: "電池の電気がなくなってしまった場合、説明書にはその電池を何ゴミとして捨てるように書かれていますか？", a: ["燃えるゴミ", "資源ゴミ", "燃えないゴミ"], correct: 2, ex: "電池がなくなったら、燃えないゴミとして捨ててください。" },
    { genre: "D", q: "モーターを後ろの車体パーツに取り付ける際、配線をどのようにする必要があると指示されていますか？", a: ["配線を交差させながら", "配線をまっすぐ伸ばして", "配線を結んで"], correct: 0, ex: "モーターを配線を交差させながら、後ろの車体パーツに取り付けます。" },

    // ジャンルE
    { genre: "E", q: "後ろの車体パーツにある電池の挿入口が、最終的にどの向きになるように取り付ける必要がありますか？", a: ["内側", "上向き", "外側"], correct: 2, ex: "電池の挿入口が外側になるように取り付けます。" }
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
    shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5);
    renderIntro();
}

function renderIntro() {
    const app = document.getElementById('quiz-app');
    app.innerHTML = `
        <div class="quiz-intro">
            <h2>ロボットクイズに挑戦！</h2>
            <p>光源追跡マイクロロボットの20問クイズです。</p>
            <ul>
                <li>制限時間：30分</li>
                <li>全部で20問</li>
                <li>ヒントは説明書</li>
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
        <h3 class="quiz-tittle">問${currentIndex + 1}. ${q.q}</h3>
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
                    あなたの回答：<span class="user-ans">${userAnswers[i] !== undefined ? q.a[userAnswers[i]] : '未回答'}</span><br>
                    正解：<strong>${q.a[q.correct]}</strong><br>
                    解説：<small>${q.ex}</small>
                </div>
            `).join('')}
            <button class="option-btn" onclick="location.reload()" style="text-align:center;">もういちど挑戦する</button>
        </div>
    `;
}

initQuiz();
