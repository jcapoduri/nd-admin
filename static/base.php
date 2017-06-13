<?php

error_reporting(E_ALL);

use Phalcon\Mvc\Application;
use Phalcon\Config\Adapter\Ini as ConfigIni;
use Phalcon\Mvc\View;

try {
    define('APP_PATH', realpath('..') . '/');

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

    //routing
    require APP_PATH . 'app/config/routes.php';

    $app = new Application($di);
    //disable the view engine
    $app->useImplicitView(false);
    //handle request
    $response = $app->handle(!empty($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : null);
    
    //$response->send();
} catch (Exception $e){
    echo $e->getMessage() . '<br>';
    echo '<pre>' . $e->getTraceAsString() . '</pre>';
}

