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
    // ① スクロールによるヘッダー表示/非表示機能の追加
    // ==================================================
    const header = document.querySelector('header');
    const containers = document.querySelectorAll('.container');

    let lastScrollTop = 0; // 以前のスクロール位置を保持
    const scrollThreshold = 50; // スクロール検知のしきい値
    let isHeaderHidden = false;
    header.classList.add('header-visible'); // 初期状態は表示

    let isFirstScroll = true;

    // .topクラスを制御する関数をシンプルに修正
    const updateContainerTopClass = (isVisible) => {
        containers.forEach(container => {
            // ヘッダーが表示されている場合、.topを付与してスペースを空ける
            if (isVisible) {
                container.classList.add('top');
            } else {
                // ヘッダー非表示時は.topを削除
                container.classList.remove('top');
            }
        });
    };
    
    // ページロード時に即座に.topを付与し、transitionを無効化
    containers.forEach(container => {
        container.classList.add('no-top'); // 一時的にtransitionを無効化
    });
    // 初期状態では header-visible なので、.topを付与する
    updateContainerTopClass(true);

    // マイクロタスクキュー/次の描画フレームで transition を有効に戻す
    setTimeout(() => {
        containers.forEach(container => {
            container.classList.remove('no-top'); // transitionを有効に戻す
        });
    }, 0); // 0msのsetTimeoutで即座に実行させ、初期描画後の処理に回す


    // ヘッダー状態を更新するメインの関数
    const handleScroll = () => {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;

        // isFirstScrollフラグの操作ロジックは現状のままでOK
        if (isFirstScroll && currentScroll > 0) {
            isFirstScroll = false; // 一度でもスクロールされたらフラグをfalseに
            // 初回付与した .top クラスは、次の updateContainerTopClass(false) または
            // ヘッダー非表示ロジックで解除されるので、ここでは何もしなくてよい
        }

        // ヘッダーの表示/非表示ロジック (変更なし)
        if (currentScroll <= 0) {
            // ページトップの場合：必ず表示
            if (isHeaderHidden) {
                header.classList.remove('header-hidden');
                header.classList.add('header-visible');
                isHeaderHidden = false;
            }
        } else if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
            // 下にスクロール（ページから離れる）：非表示
            if (!isHeaderHidden) {
                header.classList.add('header-hidden');
                header.classList.remove('header-visible');
                isHeaderHidden = true;
            }
        } else if (currentScroll < lastScrollTop) {
            // 上にスクロール（ページ上部に戻る）：表示
            if (isHeaderHidden) {
                header.classList.remove('header-hidden');
                header.classList.add('header-visible');
                isHeaderHidden = false;
            }
        }

        // .container.topの制御を、ヘッダーの表示状態に連動させる
        // ヘッダーの表示状態に応じて .top クラスを操作
        updateContainerTopClass(header.classList.contains('header-visible'));

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // スクロール位置を更新
    };

    // スクロールイベントにthrottleを適用 (100msに1回だけ処理を実行)
    window.addEventListener('scroll', throttle(handleScroll, 100));

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
                    // ヘッダーが表示されている場合のみ高さを引く（ヘッダー非表示時は0として扱う）
                    const headerVisibleHeight = isHeaderHidden ? 0 : document.querySelector('header').offsetHeight;
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
    // ④ ページトップへ戻るボタンの制御
    // ==================================================
    const backToTopBtn = document.getElementById('back-to-top');

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
