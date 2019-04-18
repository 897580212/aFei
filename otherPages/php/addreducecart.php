<?php
	header("Content-Type:text/html;charset=utf-8");
	//1、接受客户端的数据（用户输入的数据）
	$username   = $_GET['username'];
    $goodsnPrice  = $_GET['goodsnPrice'];
    $goodsId   = $_GET['goodsId'];
    $goodsimg   = $_GET['goodsimg'];
    $goodsType = $_GET['goodsType'];
    $goodscount   = $_GET['goodscount'];
	
	//2、数据保存在数据库中
	//1）、建立连接（搭桥）
	$conn = mysql_connect("localhost","root","root");
	
	//2）、选择数据库（找目的地）
	if(!mysql_select_db("db1810Kangjia",$conn)){
		die("数据库选择失败".mysql_error());
	}
	
	//3）、传输数据（过桥）
	$sqlstr = "update kj_shopcart set goodscount='".$goodscount."' where username='".$username."' and goodsId='".$goodsId."' and goodsimg='".$goodsimg."' and goodsType='".$goodsType."' and goodsnPrice='".$goodsnPrice."'";
	// echo($sqlstr);
	
	if(!mysql_query($sqlstr,$conn)){
		die("执行更新SQL语句失败".mysql_error());
		echo "0";
	}
	
	//4）、关闭连接（拆桥）
	mysql_close($conn);
	
	//3、给客户端返回（响应）一个注册成功！
	echo 1; //1：表示修改成功,0：表示修改失败
?>