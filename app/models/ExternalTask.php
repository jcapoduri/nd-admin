<?php

namespace Neodymium\Models;

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Behavior\SoftDelete;

class ExternalTask extends Model
{
  use Base;

  static public OP_CREATE           = 1;
  static public OP_ENTERMAINTENANCE = 2;
  static public OP_UPDATEDB         = 4;
  static public OP_UPDATECODE       = 8;
  static public OP_EXITMAINTENANCE  = 16;
  static public OP_CREATESNAPSHOT   = 32;
  static public OP_DELETESNAPSHOT   = 64;
  static public OP_PLACEHOLDER128   = 128;

  static public ST_PENDING           = 1;
  static public ST_WORKING           = 2;
  static public ST_COMPLETE_OK       = 4;
  static public ST_COMPLETE_WARNING  = 8;
  static public ST_COMPLETE_ERROR    = 16;

  public $name;
  public $business;
  public $timestamp;
  public $operations;
  public $status;

  public function initialize()
  {
    $this->setSource("externaltask");
    $this->keepSnapshots(true);
    $this->addBehavior(new SoftDelete([
      'field'         => 'isDeleted',
      'value'         => 1,
      'cascadeDelete' => true
    ]));
  }
}

?>
