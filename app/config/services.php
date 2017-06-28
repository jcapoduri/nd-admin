<?php

use Phalcon\Di\FactoryDefault;
use Phalcon\Mvc\View;
use Phalcon\Dispatcher;
use Phalcon\Mvc\Dispatcher as MvcDispatcher;
use Phalcon\Db\Adapter\Pdo\Mysql as DbAdapter;
use Phalcon\Mvc\Dispatcher\Exception as DispatchException;
use Neodymium\Managers\AuthManager;
use Neodymium\Managers\InstanceManager;
use Phalcon\Logger;
use Phalcon\Logger\Adapter\File as FileAdapter;
use Phalcon\Crypt;

// Create a DI
$di = new FactoryDefault();

$di->set("db", function() use ($config) {
    $dbconf = $config["database"];
    return new DbAdapter(
        [
            "host"     => $dbconf["host"],
            "username" => $dbconf["username"],
            "password" => $dbconf["password"],
            "dbname"   => $dbconf["name"]
        ]
    );
});

$di->set("security_config", function() use ($config) {
    $dbconf = $config["security"];
    return [
            "salt" => $dbconf["salt"],
            "key"  => $dbconf["key"]
        ];
});

$di->set("app_config", function() use ($config) {
    $appconfig = $config["application"];
    return $appconfig;
});

$di->set("db_config", function() use ($config) {
    $appconfig = $config["database"];
    return $appconfig;
});

$di->set("logger", function() {
    return new FileAdapter("../logs/info.log");
});

$di->set(
    'dispatcher',
    function() use ($di) {
        $eventsManager = $di->getShared('eventsManager');
        $eventsManager->attach(
            'dispatch:beforeException',
            function($event, $dispatcher, $exception) {
                switch ($exception->getCode()) {
                    case Dispatcher::EXCEPTION_HANDLER_NOT_FOUND:
                    case Dispatcher::EXCEPTION_ACTION_NOT_FOUND:
                        $dispatcher->forward(
                            array(
                                'controller' => 'errors',
                                'action'     => 'notFound',
                            )
                        );
                        return false;
                        break; // for checkstyle
                    default:
                        $dispatcher->forward(
                            array(
                                'controller' => 'errors',
                                'action'     => 'uncaughtException',
                                'params'     => [$exception]
                            )
                        );
                        return false;
                        break; // for checkstyle
                };
            }
        );
        $dispatcher = new MvcDispatcher();
        $dispatcher->setNamespaceName("Neodymium\\Controllers");
        $dispatcher->setEventsManager($eventsManager);
        return $dispatcher;
    },
    true
);

$di->set(
    "auth",
    function() use ($di) {
        $auth = new AuthManager();
        $auth->setDI($di);
        return $auth;
    },
    true
);

$di->set(
    "InstanceManager",
    function() use ($di) {
        $mgr = new InstanceManager();
        $mgr->setDI($di);
        return $mgr;
    },
    true
);

$di->set(
    "crypt",
    function () use ($di){
        $crypt = new Crypt();
        $sec_config = $di->get("security_config");
        $crypt->setKey($sec_config["key"]);
        return $crypt;
    }
);

?>
