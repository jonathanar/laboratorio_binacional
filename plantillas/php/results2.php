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
$array = (array) $query['rte'];
$carray = count($array);

if($carray > 0){
	$jsonfull = [];
	foreach ($array as $res) {
		$route = preg_replace('/http:\/\/idea-itesm.com\//', '/home/tecprototipos/public_html/', $res);
		$str = file_get_contents($route);
		$json = json_decode($str);
		$jsonfull = array_merge($jsonfull, $json->students);
	}
	if(count($jsonfull) > 0){
		echo '<table class="results_table" align="center"><tr><th>Usuario</th>';
		for ($i=1; $i < $carray+1; $i++) { 
			echo "<th>Tiempo en contestar (Pregunta ".$i.")</th><th>Número de intento (Pregunta ".$i.")</th>";
		}
		echo "<th>Insignia</th></tr>";
		foreach ($jsonfull as $student) {
			$studentgroups[$student->usercontest][] = $student;
		}
		foreach ($studentgroups as $student) {
			if(count($student) > 0){
				$badge = '&nbsp;';
				echo "<tr><td>".$student[0]->usercontest."</td>";
				$max = 0;
				foreach ($student as $contest) {
					if($contest->usertrynumbercontest > $max){
						$max = $contest->usertrynumbercontest;
						$badge = '<img src="http://idea-itesm.com/mexicox/plantillas/badges_img/badges000'.$max.'.png" height="50" width="50"/>';
					}
					if($max >= 4){
						$badge = '&nbsp;';
					}
					echo "<td>".$contest->timecontest."</td><td>".$contest->usertrynumbercontest."</td>";
				}
				echo "<td>".$badge."</td></tr>";
			}
		}
		echo "</table>";
	}
}

?>

</body>
</html>