let sessionCount = 0;
let slapCounts = [null, null, null]; // 初期値をnullに設定して、「-」で表示する

document.getElementById('startButton').addEventListener('click', function() {
    this.style.display = 'none'; // Startボタンを非表示にする
    startFirstSession();
});

function startFirstSession() {
    countdown(3, startTypingSession);
}

function startSession() {
    startTypingSession();
}

function countdown(duration, callback) {
    let timeLeft = duration;
    const countdownElement = document.getElementById('countdown');
    countdownElement.innerText = timeLeft;

    const timer = setInterval(() => {
        timeLeft--;
        countdownElement.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            countdownElement.innerText = '';
            callback();
        }
    }, 1000);
}

function startTypingSession() {
    if (sessionCount < 3) {
        document.getElementById('result').innerText = ''; // 前回の「Number of SLAP」の結果を消去
        sessionCount++;
        document.getElementById('strategyTime').innerText = ''; // Strategy timeのテキストを消去
        const textInput = document.getElementById('textInput');
        textInput.disabled = false;
        textInput.value = '';
        textInput.focus();
        countdown(60, endTypingSession);
        updateSessionRecords(); // セッションの記録を更新
    } else {
        displayFinalRecord();
    }
}

function endTypingSession() {
    const textInput = document.getElementById('textInput');
    textInput.disabled = true;
    showResult();

    if (sessionCount < 3) {
        strategyTime();
    } else {
        displayCompletionText();
    }
}

function showResult() {
    const text = document.getElementById('textInput').value.toUpperCase();
    const slapCount = (text.match(/SLAP/g) || []).length;
    slapCounts[sessionCount - 1] = slapCount;
    document.getElementById('result').innerText = `Number of SLAP: ${slapCount}`;
    updateSessionRecords(); // セッションの記録を更新
}

function strategyTime() {
    if (sessionCount < 3) {
        document.getElementById('strategyTime').innerText = "Strategy time for 2 minutes. The next session will automatically start after 2 minutes.";
        countdown(120, startSession);
    }
}

function updateSessionRecords() {
    let recordText = 'Session Records: ';
    slapCounts.forEach((count, index) => {
        recordText += `Session ${index + 1}: ${count !== null ? count + ' SLAPs' : '-'}; `;
    });
    document.getElementById('record').innerText = recordText;
}

function displayCompletionText() {
    document.getElementById('strategyTime').innerText = "The task is now complete. Thank you.";
}

function displayFinalRecord() {
    updateSessionRecords(); // 最終記録を表示
}
