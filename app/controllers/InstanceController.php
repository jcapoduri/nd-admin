<?php
namespace Neodymium\Controllers;

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\Dispatcher;
use Neodymium\Models\User;
use Neodymium\Models\Business;

/**
 * ControllerBase
 * This is the base controller for all controllers in the application
 */
class InstanceController extends ControllerBase
{
    public function getAction($id = null) {
        if ($id) {
            return Business::findFirst($id);
        }  else {
            return Business::find ([
                "isDeleted = FALSE"
            ]);

        }
        
    }

    public function queryAction() {
        return null;
    }

    public function postAction() {
        $data     = $this->request->getJsonRawBody();
        $business = new Business(); 
        $business->setName($data->name);
        $business->setSocialName($data->socialName);
        $business->setBranch(isset($data->branch) ? $data->branch : "master");
        $business->setCommit(isset($data->commit) ? $data->commit : " ");

        if ($business->save()) {
            return true;
        } else {
            throw new Exception($business->getMessages(), 1);
            
        };
    }

    public function putAction($id) {
        $data     = $this->request->getJsonRawBody();
        $business = Business::findFirst($id);
        if ($data->name) $business->setName($data->name);
        if ($data->socialName) $business->setSocialName($data->socialName);
        if ($data->branch) $business->setBranch($data->branch);
        if ($data->commit) $business->setCommit($data->commit);
        return $business->save();
    }

    public function deleteAction($id) {
        $business = Business::findFirst($id);
        return $business->delete();
    }
}

?>
