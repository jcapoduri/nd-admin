<?php

/**
* USAGE:
* php create.php host=localhost dbuser=empresa_user dbpass=empresa_pass dbname=nd_empresa dbrootuser=root dbrootpass= businessID=1
*/

foreach ($argv as $argi) {
  $arg = explode('=', $argi);
  if (count($arg) == 2) {
    switch ($arg[0]) {
      case 'host':
        $dbhost = $arg[1];
        break;
      case 'dbuser':
        $dbuser = $arg[1];
        break;
      case 'dbpass':
        $dbpass = $arg[1];
        break;
      case 'dbname':
        $dbname = $arg[1];
        break;
      case 'dbrootuser':
        $dbrootuser = $arg[1];
        break;
      case 'dbrootpass':
        $dbrootpass = $arg[1];
        break;
      case 'businessID':
        $businessID = $arg[1];
        break;
      default:
        # code...
        break;
    }
  }
}

//create database
try {
    $dbh = new PDO("mysql:host=$host", $dbrootuser, $dbrootpass);

    $dbh->exec("CREATE DATABASE `$dbname`;
            CREATE USER '$dbuser'@'localhost' IDENTIFIED BY '$dbpass';
            GRANT ALL ON `$dbname`.* TO '$dbuser'@'localhost';
            FLUSH PRIVILEGES;") 
    or die(print_r($dbh->errorInfo(), true));

} catch (PDOException $e) {
  die("DB ERROR: ". $e->getMessage());
} catch (Exception $e) {
  die("ERROR: ". $e->getMessage());
}

//clone code
exec('git clone https://github.com/jcapoduri/neodymium.git');

//set up conection information
$configFile = fopen('neodymium/app/config/config.ini', 'w');
fwrite($configFile, '[database]');
fwrite($configFile, 'host     = ' . $dbhost);
fwrite($configFile, 'username = ' . $dbuser);
fwrite($configFile, 'password = ' . $dbpass);
fwrite($configFile, 'name     = ' . $dbname);
fwrite($configFile, '[application]');
fwrite($configFile, 'businessID     = ' . $businessID);
fwrite($configFile, 'path           = dev/nd');
fwrite($configFile, 'controllersDir = app/controllers/');
fwrite($configFile, 'modelsDir      = app/models/');
fwrite($configFile, 'viewsDir       = app/views/');
fwrite($configFile, 'pluginsDir     = app/plugins/');
fwrite($configFile, 'formsDir       = app/forms/');
fwrite($configFile, 'libraryDir     = app/library/');
fwrite($configFile, 'baseUri        = /invo/');
fwrite($configFile, '[security]');
fwrite($configFile, 'key  = ' . sha1(time()));
fwrite($configFile, 'salt = ' . md5(time()));
fclose($configFile);

//install application
chdir('neodymium');
exec('composer update');
exec('npm install');

//complete creation

?>