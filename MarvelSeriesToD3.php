<?php
/**
 * Convert the Marvel API Series API call to D3 data structure.
 *
 */
class MarvelSeriesToD3
{

	private static $instance = NULL;
	
	private function __construct(){}
	
	public static function getInstance(){
		
		if(self::$instance !== NULL){
			return self::$instance;
		}
		else{
			self::$instance = new self;
			return self::$instance;
		}
		
	}
	
	
	/**
	 * Create the D3 object we need from the Series Call.
	 * 
	 * @param unknown $jsonData
	 */
	public static function doCreate($searchTerm, $jsonData){
		
		if($jsonData == NULL || empty($jsonData)){
			throw new Exception("prameter required.");
		}
		
		//Initialize the end result array.
		$results['name']     = $searchTerm;
		$results['children'] = "";
		
		//Decode the json data.
		$data = json_decode($jsonData, 1);
		//echo print_r($data, 1);
		
		//Fetch the creators.
		$results["children"][] = self::parseData("creators", $data);
	
		//Fetch the Characters
		$results["children"][] = self::parseData("characters", $data);
		
		//Fetch the Stories
		$results["children"][] = self::parseData("stories", $data);
		
		//Fetch the Comics
		$results["children"][] = self::parseData("comics", $data);
		
		//Fetch the Events
		$results["children"][] = self::parseData("events", $data);
		
		//Fetch other info
		$desc  =  $data["data"]["results"][0]["description"];
		if( $data["data"]["results"][0]["description"] == ""){ $desc = "No Description Available"; }
		
		$results["misc"]["desc"]  = $desc;
		$results["misc"]["image"] =  $data["data"]["results"][0]["thumbnail"]["path"]."/standard_medium.jpg";
		
		return json_encode($results);
		
	}
	
	
	/**
	 * Parse specific data from the JSON object.
	 *
	 */
	protected static function parseData($sectionName, $dataArray)
	{
		@$dataPoints = $dataArray["data"]["results"][0][$sectionName]["items"];
		
		if(empty($dataPoints)){
			$dataPoints = array();
		}
		$dataContainer = array("name" => $sectionName);
		foreach($dataPoints as $point){
			$dataContainer["children"][] = array("name" => $point["name"], 
												 "size" => "3000",
												 "uri"  => $point['resourceURI']);
		}
		
		return $dataContainer;
	}
	
}