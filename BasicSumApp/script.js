function calculate() {  // Butona tıklandığında çalışacak olan fonksiyonumuz.

    let num1 = parseFloat(document.getElementById("num1").value); // 1. değer
    let operation = document.getElementById("operation").value;  // İşlem tipi
    let num2 = parseFloat(document.getElementById("num2").value);  // 2. değer

    let result; // Sonuç değişkenimiz.

    switch (operation) { 
        case "+":
            result = num1 + num2;
            break;

        case "*":
            result = num1 * num2;
            break;
        case "-":
            result = Math.abs(num1 - num2);
            break;
        case "/":
            result = num1 / num2;
            break;
        default:
            result = " Geçersiz İşlem!"

    }
document.getElementById("result").value=result;
}