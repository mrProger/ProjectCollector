# ProjectCollector

Пример использования:
<html>
  <head>
    <title>test</title>
  </head>
  <body>
    [% header.html %]
    [% footer.html %]
    
  </body>
</html>

Код вводится в index.html, а готовая страница в result.html

На данный момент обязателен пробел над </body>, иначе он будет отсутствовать. Скорее всего в дальнейшем пофиксится
Так же пока нельзя использовать блоки в папках, Node.js это почему-то не любит
