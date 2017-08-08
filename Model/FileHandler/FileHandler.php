<?php
	class FileHandler{
		
		private static $instance = null;
		private $target_dir = '../CurriculumsVitaes/';

		private function __construct(){

		}

		public static function getInstance(){
			if(self::$instance == null){
				self::$instance = new FileHandler();
			}
			return self::$instance;
		}

		public function saveFile($file,$id){
			$temp_name = $file['tmp_name'];
			$name = 'CV_'.$id.'.'.end(explode(".",$file['name']));
			move_uploaded_file($temp_name,$this->target_dir.$name);
			return $name;
		}

		public function getFile($file){
			
		}

		public function deleteFile($file){
			
		}

		public function renameFile($file,$id){

		}
	}

?>