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
        $business->setSlug($data->name);
        $business->setSocialName($data->socialName);

        if (isset($data->branch)) {
            $business->setBranch($data->branch);
        } else {
            $business->setBranch("master");
        };
        if (isset($data->commit)) {
            $business->setCommit($data->commit);
        } else {
            $business->setCommit("HEAD");
        };

        $business->setInstanceCreated(false);

        if ($business->save()) {
            try {
                $instanceManager = $this->di->get("InstanceManager");
                $instanceManager->createInstance($business);
                $business->setInstanceCreated(true);
                $business->save();
                return true;
            } catch(\Exception $e) {
                throw $e;
            }            
        } else {
            $messages = $business->getMessages();
            throw new Exception(join(', ', $messages), 1);
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
