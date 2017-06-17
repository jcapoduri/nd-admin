<?php

namespace Neodymium\Controllers\DTO;

use \JsonSerializable;
use Neodymium\Models\User;
use Neodymium\Models\Permission;
use Neodymium\Models\Role;

class UserDTO implements JsonSerializable {
  public $id;
  public $name;
  public $email;
  public $permissions;

  public function __construct(User $user) {
    $this->id = $user->getId();
    $this->name = $user->getName();
    $this->email = $user->getEmail();
  }

  public function jsonSerialize () {
    return [
      "id" => $this->id,
      "name" => $this->name,
      "email" => $this->email
    ];
  }
}
