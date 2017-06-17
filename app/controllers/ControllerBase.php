<?php
namespace Neodymium\Controllers;

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\Dispatcher;
/**
 * ControllerBase
 * This is the base controller for all controllers in the application
 */
abstract class ControllerBase extends Controller
{
    abstract protected function getAction($id = null);

    abstract protected function queryAction();

    abstract protected function postAction();

    abstract protected function putAction($id);

    abstract protected function deleteAction($id);

    // After route executed event
    public function afterExecuteRoute(\Phalcon\Mvc\Dispatcher $dispatcher) {
        //$this->response->setStatusCode($this->_response['statusCode'], $this->_statusCodes[$this->_response['statusCode']]);
        $this->response->setHeader('Access-Control-Allow-Origin', '*');
        $this->response->setContentType('application/json', 'UTF-8');
        $data = $dispatcher->getReturnedValue();
        $this->response->setJsonContent($data);
        return $this->response->send();
    }
}

?>
