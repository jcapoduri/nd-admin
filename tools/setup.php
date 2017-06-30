<?php

error_reporting(E_ALL);
ini_set('memory_limit', '5120M');
set_time_limit ( 0 );

use Phalcon\Config\Adapter\Ini as ConfigIni;
use Phalcon\Mvc\Model\Query;

try {
    define('APP_PATH', realpath('.') . '/');

    echo("Running..." . PHP_EOL);

    // Read the configuration
    $config = new ConfigIni(APP_PATH . 'app/config/config.ini');
    if (is_readable(APP_PATH . 'app/config/config.ini.dev')) {
        $override = new ConfigIni(APP_PATH . 'app/config/config.ini.dev');
        $config->merge($override);
    }

    //Autoloader
    require APP_PATH . 'app/config/loader.php';

    //Dependencies manager
    require APP_PATH . 'app/config/services.php';

    //do the magic
    $dbms_schema = APP_PATH .'schema/nd.clean.sql';
    $sql_query = @fread(@fopen($dbms_schema, 'r'), @filesize($dbms_schema)) or die('problem openning ' . $dbms_schema);

    echo("cleaning up..." . PHP_EOL);
    $di->get("db")->execute($sql_query);

    $dbms_schema = APP_PATH . 'schema/nd.schema.sql';
    $sql_query = @fread(@fopen($dbms_schema, 'r'), @filesize($dbms_schema)) or die('problem openning ' . $dbms_schema);

    echo("clean done, loading schema up..." . PHP_EOL);
    $di->get("db")->execute($sql_query);

    $dbms_schema = APP_PATH . 'schema/nd.data.sql';
    $sql_query = @fread(@fopen($dbms_schema, 'r'), @filesize($dbms_schema)) or die('problem openning ' . $dbms_schema);

    echo('schema done, loading initial data...' . PHP_EOL);
    $di->get("db")->execute($sql_query);
    echo('Data done, System OK' . PHP_EOL);

} catch (Exception $e){
    echo $e->getMessage() . '<br>';
    echo '<pre>' . $e->getTraceAsString() . '</pre>';
}

