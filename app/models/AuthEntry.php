<?php

namespace Neodymium\Models;

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Behavior\SoftDelete;

class AuthEntry extends Model
{
  use Base;
  protected $validUntil;
  protected $token;

  static function generateToken(User $user) {
    $entry = new AuthEntry();
    $entry->validUntil = date('Y-m-d H:i:s', time() + (24 * 60 * 60));
    $entry->token = sha1(time());
    $entry->user = $user;    
    return $entry->save() ? $entry->token : false;
  }

  public function initialize() {
    $this->setSource("authentries");
    $this->keepSnapshots(true);
    $this->addBehavior(new SoftDelete([
      'field'         => 'isDeleted',
      'value'         => true,
      'cascadeDelete' => true
    ]));
    $this->belongsTo(
      "id_user",
      "Neodymium\\Models\\User",
      "id",
      [
        "alias" => "user"
      ]
    );
  }

}

?>
