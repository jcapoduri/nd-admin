<?php

namespace Neodymium\Models;

use InvalidArgumentException;
use Neodymium\Models\JournalEntry;

trait Base
{
  protected $id;

  protected $_innerJourney;

  static public function fromJSON($data) {
    throw new Exception("Error Processing Request", 1);
  }

  public function getId() {
    return $this->id;
  }

  public function beforeUpdate() {
    $auth = $this->di->get("auth");
    $user = $auth->getLoggedUser();
    $fields = $this->getChangedFields();
    $this->_innerJourney = [];
    $originalData = $this->getSnapshotData();
    $timestamp = date('Y-m-d H:i:s', time());
    foreach ($fields as $field) {
      $journey = JournalEntry::fromModel($this, $field == "isDeleted" ? "DELETE" : "UPDATE", $user->getId());
      $journey->setEntryKey($field);
      $journey->setEntryOldValue((string)$originalData[$field]);
      $journey->setEntryNewValue((string)$this->$field);
      $journey->timestamp = $timestamp;
      $this->_innerJourney[] = $journey;
    }
  }

  public function beforeCreate() {
    $auth = $this->di->get("auth");
    $user = $auth->getLoggedUser();
    $journey = JournalEntry::fromModel($this, "CREATE", $user ? $user->getId() : $this->user->getId());
    $journey->setEntryKey("OBJECT");
    $journey->setEntryOldValue("-");
    $journey->setEntryNewValue(json_encode($this->jsonSerialize(), JSON_FORCE_OBJECT));
    $this->_innerJourney = [$journey];
  }

  public function afterSave() {
    if ($this->_innerJourney) {
      foreach($this->_innerJourney as $journey) {
        if (!$journey->getTableId()) {
          $journey->setTableId($this->getId());
        };
        $journey->save();
      };
    }
  }
}

?>
