<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="http://idea-itesm.com/mexicox/plantillas/css/styles_mexicox.css">
</head>
<body>

<?php

$url = $_SERVER['REQUEST_URI'];

$parts = parse_url($url);
parse_str($parts['query'], $query);

$route = preg_replace('/http:\/\/idea-itesm.com\//', '/home/tecprototipos/public_html/', $query['rte']);

$str = file_get_contents($route);
$json = json_decode($str);
$count = count($json->students);
if($count > 0){
	echo '<table class="results_table" align="center">';
	echo "<tr><th>Usuario</th><th>Tiempo en contestar</th><th>Número de intento</th><th>Insignia</th></tr>";
	foreach($json->students as $student){
		$badge = '&nbsp;';
		if($student->usertrynumbercontest <= 3){
			$badge = '<img src="http://idea-itesm.com/mexicox/plantillas/badges_img/badges000'.$student->usertrynumbercontest.'.png" height="50" width="50"/>';
		}		
		echo "<tr><td>".$student->usercontest."</td><td>".$student->timecontest."</td><td>".$student->usertrynumbercontest."</td><td>".$badge."</td></tr>";
	}
	echo "</table>";
}


?>

</body>
</html>