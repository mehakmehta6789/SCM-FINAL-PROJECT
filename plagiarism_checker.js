function calculate_plagiarism(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const m = [];

    for (let i = 0; i <= b.length; i++) {
        m[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        m[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                m[i][j] = m[i - 1][j - 1];
            } else {
                m[i][j] = Math.min(
                    m[i - 1][j - 1] + 1, // substitution
                    m[i][j - 1] + 1,     // insertion
                    m[i - 1][j] + 1      // deletion
                );
            }
        }
    }
    return m[b.length][a.length];
}

function checkPlagiarism() {
    const text1 = document.getElementById('Area1').value;
    const text2 = document.getElementById('Area2').value;

    const distance = calculate_plagiarism(text1, text2);
    const similarityPercentage = ((Math.max(text1.length, text2.length) - distance) / Math.max(text1.length, text2.length)) * 100;

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `Similarity: ${similarityPercentage.toFixed(2)}%`;
}