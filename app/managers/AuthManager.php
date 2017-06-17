<?php

namespace Neodymium\Managers;
use Phalcon\Http\Response\Cookies;
use Phalcon\Mvc\User\Module;
use Neodymium\Models;
use Neodymium\Models\AuthEntry;
use Neodymium\Models\User;


class AuthManager extends Module {
    public function getLoggedUser(String $token = NULL) {
      if (!$token) {
        $cookies = $this->getDI()->getCookies();//new Cookies();
        $authcookie = $cookies->get("Auth");
        $token = $authcookie->getValue();
      }
      $authentry = AuthEntry::findFirst([
          "validUntil > now() AND token = :token:",
          "bind" => [
            "token" => $token
          ]
      ]);
      if ($authentry) {
        return $authentry->getUser();
      }
      return NULL;
    } 

    public function instanceToken(User $user) {
      //TODO: invalidate other user's tokens
      $token = AuthEntry::generateToken($user);
      return $token;
    }
}
