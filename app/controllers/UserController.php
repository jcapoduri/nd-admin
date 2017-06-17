<?php
namespace Neodymium\Controllers;

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\Dispatcher;
use Neodymium\Models\User;
use Neodymium\Models\Role;

/**
 * ControllerBase
 * This is the base controller for all controllers in the application
 */
class UserController extends ControllerBase
{
    public function getAction($id = null) {
        if ($id) {
            return User::findFirst($id);
        } else {
            return User::find([
                "isDeleted = FALSE"
            ]);
        }
    }

    public function queryAction() {
        return null;
    }

    public function postAction() {
        $data = $this->request->getJsonRawBody();
        $user = new User();
        $user->setName($data->name);
        $user->setEmail($data->email);
        $user->setPassword($data->password);
        return $user->save();
    }

    public function putAction($id) {
        $data = $this->request->getJsonRawBody();
        $user = User::findFirst($id);
        if ($data->email) $user->setEmail($data->email);
        if ($data->password) $user->setPassword($data->password);
        if ($data->role) $user->role = Role::findFirst($data->role->id);
        return $user->save();
    }

    public function deleteAction($id) {
        $user = User::findFirst($id);
        return $user->delete();
    }
}

?>
