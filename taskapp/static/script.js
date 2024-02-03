
document.addEventListener("DOMContentLoaded", function () {

    tabClose = document.querySelector(".tab_close");
    tabClose.addEventListener("click", function() {
       closeTab(0);
    });

    tab = document.querySelector(".tab.tab-0");
    tab.addEventListener("click", function(event) {
        selectTab(event, 0);
    });



    //Добавление подсветки input_area

    const myTextarea = document.getElementById("myTextarea-0");

    const editor = CodeMirror.fromTextArea(myTextarea, {
        mode: "python", // Указываем режим Python
        lineNumbers: true, // Отображение номеров строк
        theme: "cobalt", // Установка темы (по умолчанию)
    });

    const codeMirrorWrapper = editor.getWrapperElement();
        codeMirrorWrapper.id = 'codeMirror-' + 0;


    // При нажатии на кнопку save показать форму сохранения файла

    var code_name_window = document.querySelector(".file_name_add"); // форма для назначения имени сохраняемого файла

    var button = document.querySelector(".save_button"); // кнопка для сохранения кода
    button.addEventListener("click", function () {
        code_name_window.style.display = 'flex';
    });


    // добавление кнопки + в переменную 

    var new_file_button = document.querySelector(".new_file");
    var tabs_conteiner = document.querySelector(".tabs_conteiner");
    let tabCounter = 1;

    // При нажатии на + добавление нового текстового поля

    new_file_button.addEventListener("click", function() {
        const tab = document.createElement("div");                     //создание новой вкладки
        const tabClose = document.createElement("div");                //добавление кнопки закрытия вкладки
        const tabContent = document.createElement('textarea');         //создание нового текстового поля
        const tabIndex = tabCounter++;
        tabContent.style.rows = 5;
        tabContent.style.cols = 5;
        tabContent.id = 'myTextarea-' + tabIndex;                      //добавление id текстовому полю
        tabContent.textContent = "#Write your python code here";
        tabContent.className = 'tab-content';                          //добавление класса текстовому полю
        tab.className = "tab tab-" + tabIndex;                                         //добавление класса новой вкладке
        tab.textContent = "new";                                   //название вкладки
        tabClose.innerHTML = "&#10006";
        tabClose.className = "tab_close";
        tabClose.id = tabIndex;

        tab.onclick = function(event) {selectTab(event, tabIndex)};    //при клике на вкладку вызов функции selectTab
        tabs_conteiner.insertBefore(tab, tabs_conteiner.lastElementChild); //добавление новой владки в контейнер вкладок
        tab.insertBefore(tabClose, tab.lastElementChild);
        tabClose.onclick = function(event) {closeTab(tabClose.id)};



        //Убираем другие текстовые поля
        HideTextArea();



        //Вставляем новое текстовое поле
        document.querySelector('.form').insertBefore(tabContent, document.querySelector('.form').lastElementChild);
        addTextArea(tabContent, tabIndex);
        
        //Делаем новую вкладку текущей
        selectTab({ currentTarget: tab }, tabIndex);
    });

    // Выделение вкладки при клике на нее

    function selectTab(event, tabIndex) {
        //убираем у всех textArea класс и имя active
        document.querySelectorAll('.tab-content').forEach((tabContent) => {
            tabContent.classList.remove('active_tabContent');
            tabContent.removeAttribute('name');
        });

        //убираем у всех вкладок класс active_tab
        document.querySelectorAll('.tab').forEach((tab) => {
            tab.classList.remove('active_tab');
        });

        event.currentTarget.classList.add('active_tab');

        //записываем в переменную текущую textArea
        tabContent = document.querySelector('#myTextarea-' + tabIndex)

        //добавляем к активной textArea класс active_tabContent
        tabContent.classList.add('active_tabContent');

        //добавляем к активной textArea имя active_tabContent
        tabContent.setAttribute('name', 'active_tabContent');

        

        

        HideTextArea();

        document.querySelector('#codeMirror-' + tabIndex).style.display = 'block';
    }

    function addTextArea(tabContent, tabIndex) {
        const editor = CodeMirror.fromTextArea(tabContent, {
            mode: "python", // Указываем режим Python
            lineNumbers: true, // Отображение номеров строк
            theme: "cobalt", // Установка темы (по умолчанию)
        });


        //Устанавливаем id для Codemirror
        const codeMirrorWrapper = editor.getWrapperElement();
        codeMirrorWrapper.id = 'codeMirror-' + tabIndex;
    }


    // Скрываем все текстовые поля
    function HideTextArea() {
        document.querySelectorAll('.CodeMirror').forEach((codeMirror) => {
            codeMirror.style.display = 'none';
        });
    }

    function closeTab(tabIndex) {
        const editor = document.querySelector('#codeMirror-' + tabIndex);
        editor.parentNode.removeChild(editor);
        document.querySelector('#myTextarea-' + tabIndex).remove();
        document.querySelector('.tab.tab-' + tabIndex).remove();
        selectTab({currentTarget: document.querySelector(".tab.tab-2")}, 2);

    }

});


