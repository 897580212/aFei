<?php
	header('Content-type:text/html;charset=utf-8');

	$username = $_POST['username'];
	$userpass = $_POST['userpass'];

	//搭桥
	$cont = mysql_connect('localhost','root','root');
	if(!$cont){
		echo "服务器出错，数据库连接失败!";
	}else{
		mysql_select_db('db1810Kangjia',$cont);

		$sqlstr = "select * from kj_userlist where username='$username' and userpass='$userpass'";

		$sont = mysql_query($sqlstr,$cont);

		mysql_close($cont);

		if(mysql_num_rows($sont)==1){
        	 echo "1";        	
        }else{
        	echo "0";
        }
	}
?>