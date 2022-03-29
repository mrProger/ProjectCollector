# ProjectCollector

Пример использования:
```
<html>
  <head>
    <title>test</title>
  </head>
  <body>
    [% blocks/header.html %]
    [% blocks/footer.html %]
  </body>
</html>
```

Структура проекта
-----------------
* (builders)[builders] - здесь находятся все сборщики, а именно: HTML, JS и CSS
* pages - здесь находятся макеты, которые необходимо собрать в страницы
* result - здесь находятся уже собранные страницы
* blocks - здесь находятся блоки из которых собираются страницы
* scripts - здесь находятся JavaScript файлы, которые собираются в script.js
* views - здесь находятся CSS файлы, которые собираются в style.css
* result/js - здесь находится собранный script.js
* result/css - здесь находится собранный style.css

**Папку pages, blocks, scripts и views необходимо создавать самому**
**НАЗВАНИЕ blocks ВЗЯТО ДЛЯ ПРИМЕРА, НАЗВАНИЕ МОЖНО ЗАМЕНИТЬ НА ЛЮБОЕ ДРУГОЕ**