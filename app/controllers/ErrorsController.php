<?php
namespace Neodymium\Controllers;

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\Dispatcher;
/**
 * ControllerBase
 * This is the base controller for all controllers in the application
 */
class ErrorsController extends Controller
{
    function notFoundAction() {
        $this->response->setStatusCode(404, 'Endpoint not found');
    }

    function uncaughtExceptionAction($e) {
        $this->response->setHeader('Access-Control-Allow-Origin', '*');
        $this->response->setContentType('application/json', 'UTF-8');
        $data = [
            "code" => $e->getCode(),
            "msg"  => $e->getMessage(),
            "trace" => $e->getTrace()
        ];
        $this->response->setStatusCode(500, 'Internal Server Error');
        $this->response->setJsonContent($data);
        return $this->response->send();
    }

}

?>
