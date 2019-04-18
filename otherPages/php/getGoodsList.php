<?php
	header("Content-Type:text/html;charset=utf-8");
	
	//2、数据保存在数据库中
	//1）、建立连接（搭桥）
	$conn = mysql_connect("localhost","root","root");
	
	//2）、选择数据库（找目的地）
	if(!mysql_select_db("db1810kangjia",$conn)){
		die("数据库选择失败".mysql_error());
	}
	
	//3）、传输数据（过桥）
	$sqlstr = "select * from goodsInfo order by goodsId";
	$result = mysql_query($sqlstr,$conn);//执行查询的sql语句后，有返回值，返回的是查询结果
	if(!$result){
		die("获取数据失败".mysql_error());
	}
	//查询列数
	 $query_cols = mysql_num_fields($result);
	 //echo "列数：".$query_cols;
	//查询行数
    $query_num =mysql_num_rows($result);
    //echo "行数：".$query_num;
	
	$str="[";
	
	$query_row = mysql_fetch_array($result);//游标下移,拿出结果集中的某一行，返回值是拿到的行；
	while($query_row){
		$str = $str.'{ "goodsId":"'.$query_row[0].'","goodsName":"'.$query_row[1].'","goodsType":"'.$query_row[2].'","goodsnPrice":"'.$query_row[3].'","goodsoPrice":"'.$query_row[4].'","goodsDesc1":"'.$query_row[5].'","goodsDesc2":"'.$query_row[6].'","goodsDesc3":"'.$query_row[7].'","goodsDesc4":"'.$query_row[8].'","goodsDesc5":"'.$query_row[9].'","goodsDesc6":"'.$query_row[10].'","goodsImg1":"'.$query_row[11].'","goodsImg2":"'.$query_row[12].'","goodsImg3":"'.$query_row[13].'","goodsImg4":"'.$query_row[14].'","goodsImg5":"'.$query_row[15].'","goodsImg6":"'.$query_row[16].'","goodsImg7":"'.$query_row[17].'","goodsPingpai":"'.$query_row[18].'","goodsXinghao":"'.$query_row[1].'","goodsTime":"'.$query_row[20].'","goodsSize":"'.$query_row[21].'","goodsColor":"'.$query_row[22].'","beiyong12":"'.$query_row[23].'","beiyong13":"'.$query_row[24].'"
		}';
		
		$query_row = mysql_fetch_array($result);
		if($query_row){
			$str = $str.",";
		}
	}
	$str = $str."]";
	//4、关闭数据库
	mysql_close($conn);
	
	//3、给客户端返回商品的json数组！
	echo $str;
?>
