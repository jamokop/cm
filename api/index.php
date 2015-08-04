<?php
	require "db/medoo.php";
	$db = new medoo(array(
		'database_type' => 'mysql',
		'database_name' => 'cm',
		'server' => 'localhost',
		'username' => 'root',
		'password' => '',
		'charset' => 'utf8'
	));
	if($_POST) {
		$db->insert('stat',array(
			'name' => $_POST['name'],
			'email' => $_POST['email'],
			'point' => $_POST['point']
		));
		$maxPoint = intval($_POST['point']);
		$isExist = $db->select('max_point',array('max_point','id'),array('email'=>$_POST['email']));
		if($isExist) {
			if($_POST['point'] > $isExist[0]['max_point']) {
				$db->update('max_point',array('max_point' => $_POST['point']),array('id'=>$isExist[0]['id']));
			} else {
				$maxPoint = $isExist[0]['max_point'];
			}
		} else {
			$db->insert('max_point',array(
				'email' => $_POST['email'],
				'max_point' => $_POST['point']
			));
		}
		
		$rank = $db->query('select count(*) as rank from stat where point > '.$maxPoint)->fetch();
		$rank = $rank['rank']+1;
		echo json_encode(array('max_point' =>$maxPoint,'rank' => $rank));
	}
	
	
	