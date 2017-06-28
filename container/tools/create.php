<?php

/**
* USAGE:
* php create.php host=localhost dbuser=empresa_user dbpass=empresa_pass dbname=nd_empresa dbrootuser=root dbrootpass= businessID=1 path=
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
      case 'path':
        $path = $arg[1];
        break;
      default:
        # ignore
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
chdir('neodymium');
exec('git pull');

//set up conection information
$configFile = fopen('app/config/config.ini', 'w');
fwrite($configFile, '[database]' . PHP_EOL);
fwrite($configFile, 'host     = ' . $dbhost . PHP_EOL);
fwrite($configFile, 'username = ' . $dbuser . PHP_EOL);
fwrite($configFile, 'password = ' . $dbpass . PHP_EOL);
fwrite($configFile, 'name     = ' . $dbname . PHP_EOL);
fwrite($configFile, '[application]' . PHP_EOL);
fwrite($configFile, 'businessID     = ' . $businessID . PHP_EOL);
fwrite($configFile, 'path           = ' . $path . PHP_EOL);
fwrite($configFile, 'controllersDir = app/controllers/' . PHP_EOL);
fwrite($configFile, 'modelsDir      = app/models/' . PHP_EOL);
fwrite($configFile, 'viewsDir       = app/views/' . PHP_EOL);
fwrite($configFile, 'pluginsDir     = app/plugins/' . PHP_EOL);
fwrite($configFile, 'formsDir       = app/forms/' . PHP_EOL);
fwrite($configFile, 'libraryDir     = app/library/' . PHP_EOL);
fwrite($configFile, '[security]');
fwrite($configFile, 'key  = ' . sha1(time()));
fwrite($configFile, 'salt = ' . md5(time()));
fclose($configFile);

//install application
//exec('composer update');
//exec('npm install');
exec('gulp compile');

//complete creation
exec('php tools/setup.php');

?>