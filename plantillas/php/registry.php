<?php

$flag = true;

$user = $_POST['usercontest'];
$email = $_POST['useremailcontest'];
$time = $_POST['timecontest'];
$try = $_POST['usertrynumbercontest'];
$rte = $_POST['routeresults'];

$route = preg_replace('/http:\/\/idea-itesm.com\//', '/home/tecprototipos/public_html/', $rte);

$timein = gmdate("H:i:s", $time);

$upload_info = array('usercontest'=>$user, 'useremailcontest'=>$email, 'timecontest'=>$timein, 'usertrynumbercontest'=>$try);

$str = file_get_contents($route);
$json = json_decode($str);
$count = count($json->students);
if($count != 0){
	foreach($json->students as $student){
		if($student->useremailcontest == $email){
			$flag = false;
			break;
		}
	}
}
if($flag){
	array_push($json->students, $upload_info);
	file_put_contents($route, json_encode($json));
}

?>