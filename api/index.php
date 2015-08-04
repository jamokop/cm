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
		
		$db->select('max_point',array('id'),array('email'=?))
	}
	
	
	