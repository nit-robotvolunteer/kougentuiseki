/**
 * 連続して実行される関数呼び出しを一定時間（wait）ごとに1回に制限する (throttle)
 * @param {Function} func - スロットルしたい関数
 * @param {number} wait - 実行を制限する間隔（ミリ秒）
 * @returns {Function} スロットルされた関数
 */
const throttle = (func, wait) => {
    let timeout = null;
    let lastExecuted = 0;

    return function(...args) {
        const context = this;
        const now = Date.now();
        const elapsed = now - lastExecuted;

        if (elapsed >= wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            func.apply(context, args);
            lastExecuted = now;
        } else if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args);
                lastExecuted = Date.now();
            }, wait - elapsed);
        }
    };
};

document.addEventListener('DOMContentLoaded', () => {
    // ==================================================
    // ① ヘッダー固定表示の設定
    // ==================================================
    const header = document.querySelector('header');
    const containers = document.querySelectorAll('.container');
    
    // 初期状態のクラス設定
    header.classList.add('header-visible');
    header.classList.remove('header-hidden');

    // ==================================================
    // ② アコーディオン開閉と自動スクロール機能
    // ==================================================
    // すべての手順ヘッダー要素を取得
    const stepHeaders = document.querySelectorAll('.step-header');

    stepHeaders.forEach(headerEl => {
        headerEl.addEventListener('click', () => {
            const currentItem = headerEl.parentElement;
            // クリックされたstep-itemの親セクションを取得
            const parentSection = currentItem.closest('section');
            // 同じセクション内のすべてのstep-itemを取得
            const itemsInSameSection = parentSection.querySelectorAll('.step-item');

            // 同じセクション内の現在開いている要素を閉じる
            itemsInSameSection.forEach(otherItem => {
                if (otherItem !== currentItem && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // クリックした要素を開閉する
            const willBeActive = !currentItem.classList.contains('active');
            currentItem.classList.toggle('active');

            // 【自動スクロールと除外条件】
            // sectionの中にstep-itemが1個以上ある場合のみ適用
            if (willBeActive && itemsInSameSection.length >= 1) {
                // 少し遅延させて、CSSアニメーション（max-heightの変更）が終わってからスクロールする
                setTimeout(() => {
                    // ヘッダーは常に固定表示されるため、その高さを取得
                    const headerVisibleHeight = document.querySelector('header').offsetHeight;
                    const itemTop = currentItem.getBoundingClientRect().top + window.scrollY; // 要素の上端の絶対位置
                    
                    // 自動スクロール時に、非表示ヘッダーの影響を考慮し、
                    // ヘッダーが表示されていればその高さ分を、非表示であれば0としてオフセットを計算します。
                    // さらに、少しの余白（10px）を追加します。
                    const scrollOffset = headerVisibleHeight + 10;

                    window.scrollTo({
                        top: itemTop - scrollOffset,
                        behavior: 'smooth'
                    });
                }, 400); // CSSのtransition時間（0.4s）に合わせる
            }
        });
    });

    // ==================================================
    // ③ チェックリストの動的メッセージ切り替え
    // ==================================================
    const checkboxes = document.querySelectorAll('.check-item input[type="checkbox"]');
    const statusMessage = document.getElementById('status-message');

    const updateMessage = () => {
        // 全てのチェックボックスの数と、チェックされている数を比較
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        
        if (allChecked) {
            // 全てチェックされた時
            statusMessage.innerHTML = 'ロボット<ruby>完成<rt>かんせい</rt></ruby>おめでとう！';
            statusMessage.classList.add('completed-text');
        } else {
            // 一つでもチェックが外れている時（元の文章に戻す）
            statusMessage.innerHTML = '<ruby>動<rt>うご</rt></ruby>かない<ruby>時<rt>とき</rt></ruby>は、<ruby>動画<rt>どうが</rt></ruby>と<ruby>説明書<rt>せつめいしょ</rt></ruby>をもう<ruby>一度<rt>いちど</rt></ruby><ruby>確認<rt>かくにん</rt></ruby>してみよう！';
            statusMessage.classList.remove('completed-text');
        }
    };

    // 各チェックボックスにイベントを登録
    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateMessage);
    });

    // ==================================================
    // ④ ページトップへ戻るボタンの生成と制御
    // ==================================================
    // 1. ボタンをHTMLとして生成し、bodyの最後に追加
    document.body.insertAdjacentHTML('beforeend', `
        <button id="back-to-top" class="back-to-top" aria-label="ページトップへ戻る">↑</button>
    `);

    // 2. 追加した要素を取得（ここなら必ず存在する）
    const backToTopBtn = document.getElementById('back-to-top');

    // 以降の処理は変更なし
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }, 100));

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});
