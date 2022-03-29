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
* [pages](pages) - здесь находятся макеты, которые необходимо собрать в страницы
* result - здесь находятся уже собранные страницы
* blocks - здесь находятся блоки из которых собираются страницы
