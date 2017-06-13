<?php

namespace Neodymium\Models;

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Behavior\SoftDelete;

class User extends Model
{
  use Base;

  protected $name;

  protected $password;

  protected $email;

  public function initialize()
  {
    $this->setSource("users");
    $this->keepSnapshots(true);
    $this->addBehavior(new SoftDelete([
      'field'         => 'isDeleted',
      'value'         => 1,
      'cascadeDelete' => true
    ]));
    $this->hasManyToMany(
      "id",
      __NAMESPACE__ . "\\UserRole",
      "id_user", "id_role",
      __NAMESPACE__ . "\\Role",
      "id",
      [ "alias" => "role"]
    );
  }

  public function setName($name) {
      // The name is too short?
      if (strlen($name) < 1) {
          throw new InvalidArgumentException(
              "The name is too short"
          );
      }

      $this->name = $name;
  }

  public function getName() {
      return $this->name;
  }

  public function setPassword($password) {
      // The name is too short?
      if (strlen($password) < 1) {
          throw new InvalidArgumentException(
              "The password is too short"
          );
      };

      $info = $this->di->get("security_config");

      $this->password = password_hash($password, PASSWORD_BCRYPT);
  }

  public function getPassword()
  {
      return $this->password;
  }

  public function setEmail($email) {
      return $this->email = $email;
  }

  public function getEmail() {
      return $this->email;
  }
}

?>
