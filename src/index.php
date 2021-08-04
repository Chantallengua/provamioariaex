<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessibility examples</title>
</head>
<body>
  <main>
    <h1>Accessibility examples</h1>
    <p>The good, the bad and the ugly of web accessibility</p>
    <ul><?php
    $examples = glob('*/index.html');
    foreach ($examples as $example) {
      $name = substr($example, 0, strpos($example, '/'));
echo <<<example
<li>
<a href="$name/">$name</a>
</li>\n
example;
    }
?></ul>
  </main>
</body>
</html>

<style>
body {background-color: #FFDD00;}
</style>