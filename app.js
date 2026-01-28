const container = document.querySelector(".container");
const text = document.getElementById("text");
const toggleBtn = document.getElementById("toggleBtn");
const pointerContainer = document.querySelector(".pointer-container");

let totalTime = 7500;
let breathTime = (totalTime / 5) * 2;
let holdTime = totalTime / 5;

let isRunning = false;
let intervalId = null;
let timeoutIds = [];

toggleBtn.addEventListener("click", toggleMeditation);

function toggleMeditation() {
    if (isRunning) {
        stopMeditation();
    } else {
        startMeditation();
    }
}

function startMeditation() {
    isRunning = true;
    toggleBtn.textContent = "瞑想終了";
    pointerContainer.classList.add("rotating");
    
    meditateAnimation();
    intervalId = setInterval(meditateAnimation, totalTime);
}

function stopMeditation() {
    isRunning = false;
    toggleBtn.textContent = "瞑想開始";
    
    // インターバルをクリア
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    
    // すべてのタイムアウトをクリア
    timeoutIds.forEach(id => clearTimeout(id));
    timeoutIds = [];
    
    // 初期状態に戻す
    resetToInitialState();
}

function resetToInitialState() {
    text.innerHTML = "準備完了";
    container.className = "container";
    pointerContainer.classList.remove("rotating");
    pointerContainer.style.animation = "none";
    
    // アニメーションをリセットするために少し待ってから再適用
    setTimeout(() => {
        pointerContainer.style.animation = "";
    }, 10);
}

function meditateAnimation() {
    // 前のタイムアウトをクリア
    timeoutIds.forEach(id => clearTimeout(id));
    timeoutIds = [];
    
    text.innerHTML = "吸って!";
    container.className = "container grow";
    
    const timeout1 = setTimeout(() => {
        text.innerHTML = "止めて!";

        const timeout2 = setTimeout(() => {
            text.innerHTML = "吐いて!"
            container.className = "container shrink";
        }, holdTime);
        
        timeoutIds.push(timeout2);
    }, breathTime);
    
    timeoutIds.push(timeout1);
}