
document.addEventListener("DOMContentLoaded", function () {
    const myTextarea = document.getElementById("myTextarea");

    const editor = CodeMirror.fromTextArea(myTextarea, {
        mode: "python", // Указываем режим Python
        lineNumbers: true, // Отображение номеров строк
        theme: "default", // Установка темы (по умолчанию)
    });
});