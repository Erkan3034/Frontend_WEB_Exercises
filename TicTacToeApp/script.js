document.addEventListener("DOMContentLoaded", () => {
    // tüm hücreleri seçip bir liste at.
    const cells = document.querySelectorAll(".cell");
    //Sıradaki oyuncuyu tutan değişken. Başlangıçta X oyuncusu olarak belirledik.
    let currentPlayer = "X"
    const xScoreElement = document.getElementById("x-score");
    const oScoreElement = document.getElementById("o-score");
    const restartButton = document.getElementById("restart-button");
    let xScore = 0;
    let oScore = 0;


    //Oyun tahtasını temsil eden başlangıçta boş olan bir dizi.

    const board = Array(9).fill(null);


    //Şimdi 3*3'lük ızgarada kazanan kombinasyonları belirlediğimiz bir diziyi tanımlayalım.

    const winningCombinations = [
        [0, 1, 2], // ilk sıra
        [3, 4, 5], //ikinci sıra
        [6, 7, 8], //üçüncü sıra
        [0, 3, 6], //sol sütun
        [1, 4, 7], //orta sütun
        [2, 5, 8], // Sağ sütun
        [0, 4, 8], // Sol üstten sağ alta çapraz
        [2, 4, 6] // Sağ üstten sol alta çapraz
    ];

    //Şimdi her hücreye tıklama event'i ekleyelim.

    cells.forEach(cell => {

        //tıklama olayını dinleyen fonk.
        cell.addEventListener("click", () => {

            //hücrenin data-index attributunu alalım.

            const index = cell.getAttribute("data-index");

            // Hücre zaten doluysa veya oyun bittiyse tıklamayı engelliyoruz
            if (board[index] || checkWinner()) {
                return; // Fonksiyondan çıkıyoruz
            }
            // Hücreyi güncelliyoruz ve ekranda gösteriyoruz
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;

            // Kazananı kontrol ediyoruz
            if (checkWinner()) {
                // Biraz gecikmeyle kazanan mesajını gösteriyoruz
                setTimeout(() => alert(`${currentPlayer} , oyuncusu kazandı!`), 100);
                return; // Fonksiyondan çıkıyoruz
            }
            // Sıradaki oyuncuyu değiştiriyoruz
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        });
    });

    restartButton.addEventListener("click", restartGame);


    // Kazananı kontrol eden fonksiyon
    function checkWinner() {
        // Her kazanan kombinasyonu kontrol ediyoruz
        return winningCombinations.some(combination => {
            // Kombinasyondaki tüm hücrelerin aynı oyuncuya ait olup olmadığını kontrol ediyoruz
            return combination.every(index => board[index] === currentPlayer);
        });
    }

    function updateScore(winner) {
        if (winner === "X") {
            xScore++;
            xScoreElement.textContent = xScore;
            animateScore(xScoreElement);
        } else {
            oScore++;
            oScoreElement.textContent = oScore;
            animateScore(oScoreElement);
        }
    }

    function animateScore(element) {
        element.classList.add("update");
        setTimeout(() => element.classList.remove("update"), 300);
    }

    function restartGame() {
        board.fill(null);
        cells.forEach(cell => cell.textContent = "");
        currentPlayer = "X";
    }


});