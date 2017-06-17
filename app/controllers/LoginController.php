<?php
namespace Neodymium\Controllers;

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\Dispatcher;
use Neodymium\Models\User;
use Neodymium\Controllers\DTO\UserDTO;
use \Exception;

class LoginController extends ControllerBase
{
    public function getAction($id = null) {
        if ($this->cookies->has("Auth")) {
          $authcookie = $this->cookies->get("Auth");
          $token = $authcookie->getValue();
          $authmanager = $this->di->get("auth");
          $user = $authmanager->getLoggedUser($token);
          if (!$user) {
            throw Exception("Auth invalid!");
          } else {
            return new UserDTO($user);
          }
        };
        return false;
    }

    public function queryAction() {
        return null;
    }

    public function postAction() {
        $data = $this->request->getJsonRawBody();
        //check login
        $user = User::findFirst(
            [
                "email = :username: OR name = :username:",
                "bind" => [
                    "username" => $data->username
                ]
            ]
        );
        $app_config = $this->di->get("app_config");
        $authManager = $this->di->get("auth");
        if ($user && password_verify($data->password, $user->getPassword())) {
            $token = $authManager->instanceToken($user);
            $this->cookies->set(
                "Auth",
                $token,
                time() + 15 * 86400,
                $app_config["path"],
                false,
                null,
                true
            );
            return true;
        } else {
            return false;
        };
    }

    public function putAction($id) {
        return null;
    }

    public function deleteAction($id = null) {
        $app_config = $this->di->get("app_config");
        $this->cookies->set(
                "Auth",
                '',
                time(),
                $app_config["path"],
                false,
                null,
                true
            );
        return true;
    }
}

?>
