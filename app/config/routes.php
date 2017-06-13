<?php

namespace Neodymium;

use \Phalcon\Mvc\Router;
use \Phalcon\Http\Request;

if(isset($config) === false) die('Config file is not initialized! Check your ./config/application.php');

use \Phalcon\Mvc\Router\Group;

class Routes extends Group {

    /**
     * Initialize routes Rest V1
     */
    public function initialize()
    {
        $this->setPrefix('/v1');

        $this->addGet('/:controller/:params', [
            'namespace'  => 'Neodymium\Controllers',
            'controller' => 1,
            'action'     => 'get',
            'params'     => 2
        ]);

        $this->addPost('/:controller/:params', [
            'namespace'  => 'Neodymium\Controllers',
            'controller' => 1,
            'action'     => 'post',
            'params'     => 2
        ]);

        $this->addPost('/:controller/query/:params', [
            'namespace'  => 'Neodymium\Controllers',
            'controller' => 1,
            'action'     => 'query',
            'params'     => 2
        ]);

        $this->addPut('/:controller/:params', [
            'namespace'  => 'Neodymium\Controllers',
            'controller' => 1,
            'action'     => 'put',
            'params'     => 2
        ]);

        $this->addDelete('/:controller/:params', [
            'namespace'  => 'Neodymium\Controllers',
            'controller' => 1,
            'action'     => 'delete',
            'params'     => 2
        ]);
    }
}

$router = new Router(true);
$router->setDI($di);
$router->removeExtraSlashes(true);
$router->mount(new Routes());

$di->set('router', $router);

?>
