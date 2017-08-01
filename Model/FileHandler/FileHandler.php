<?php
	class FileHandler(){
		
		private static $instance = null;
		private static $target_dir = 'CurriculumsVitaes/';

		private function __construct(){

		}

		public static function getInstance(){
			if(self::$instance == null){
				self::$instance = new FileHandler();
			}
			return self::$instance;
		}

		public function saveFile($file){
			
		}

	}
?>