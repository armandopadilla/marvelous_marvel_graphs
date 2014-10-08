<?php 
require 'MarvelSeriesToD3.php';

$searchTerm = $_GET['term'];
$url = @$_GET['url'];

$apiKey  = "APIKEY";
$privateKey = "PRIVATEKEY";
$timeStamp  = time();

$hash = md5($timeStamp."".$privateKey."".$apiKey);

if($url == "" || $url == "undefined"){
	$url = "http://gateway.marvel.com:80/v1/public/series?title=".urlencode($searchTerm)."&ts=".$timeStamp."&apikey=".$apiKey."&hash=".$hash;
}
else {
	$url .= "?ts=".$timeStamp."&apikey=".$apiKey."&hash=".$hash;
}


//Make the call
$results = doCall($url);

//Transform
$SeriesObject = MarvelSeriesToD3::getInstance();
$json = $SeriesObject->doCreate($searchTerm, $results);

//Response!
echo $json;


/**
 * Make the actual call out to the API
 **/
function doCall($url){
	
	$cHandler = curl_init($url);
	
	curl_setopt($cHandler, CURLOPT_URL, $url);
	curl_setopt($cHandler, CURLOPT_RETURNTRANSFER, true);
	
	$results = curl_exec($cHandler);
	curl_close($cHandler);
	
	return $results;
	
	
}
