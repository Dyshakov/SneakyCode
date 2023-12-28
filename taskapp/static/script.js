
document.addEventListener("DOMContentLoaded", function () {
    const myTextarea = document.getElementById("myTextarea");

    const editor = CodeMirror.fromTextArea(myTextarea, {
        mode: "python", // Указываем режим Python
        lineNumbers: true, // Отображение номеров строк
        theme: "cobalt", // Установка темы (по умолчанию)
    });

    var code_name_window = document.querySelector(".file_name_add"); // форма для назначения имени сохраняемого файла

    var button = document.querySelector(".save_button"); // кнопка для сохранения кода
    button.addEventListener("click", function () {
        code_name_window.style.display = 'flex';
    });
});


