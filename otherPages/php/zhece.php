<?php
	header('Content-type:text/html;charset=utf-8');
	$username = $_POST['username'];
	$userpass = $_POST['userpass'];
	//一、接收数据
	//二、处理（把数据保存到数据库里）
	//1、创建连接（搭桥）
	$con = mysql_connect('localhost','root','root');

	if(!$con){
		// die("没有连成功");
		//三、响应
		echo "服务器端出错：数据库没有连接上";
	}else{
    //连接数据库
        mysql_select_db("db1810Kangjia",$con);
        
        //执行sql语句
        $sqlstr = "select*from kj_userlist where username = '$username'";
        $result = mysql_query($sqlstr,$con);
        if(mysql_num_rows($result)==0){
            $sqlstr2 = "insert into kj_userlist (username,userpass) values('$username','$userpass');";
            $result2 = mysql_query($sqlstr2,$con);
            if(mysql_num_rows($result2)==1){
                echo "1"; 
            }else{
                echo "0";
            }
        }else{
            echo "0";
        }
        mysql_close($con);
    }

?>