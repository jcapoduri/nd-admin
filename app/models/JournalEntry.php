<?php

namespace Neodymium\Models;

use Phalcon\Mvc\Model;

class JournalEntry extends Model
{
  protected $id;
  protected $timestamp;
  protected $table;
  protected $operation;
  protected $tableId;
  protected $userId;
  protected $entryKey;
  protected $entryOldValue;
  protected $entryNewValue;

  static public function fromModel(Model $model, $op, $userId) {
    $result = new JournalEntry();
    $result->table = $model->getSource();
    $result->operation = $op;
    $result->tableId = $model->getId();
    $result->userId = $userId;
    return $result;
  }

  static public function fromJSON($data) {
    $result = new JournalEntry();
    $result->timestamp = $data->timestamp;
    $result->table = $data->table;
    $result->operation = $data->operation;
    $result->tableId = $data->tableId;
    $result->userId = $data->userId;
    $result->entryKey = $data->entryKey;
    $result->entryOldValue = $data->entryOldValue;
    $result->entryNewValue = $data->entryNewValue;
    return $result;
  }

  public function initialize() {
    $this->setSource("journal");
  }

  public function getUser() {
    return User::findFirst($this->userId);
  }

  public function getId() {
    return $this->id;
  }

  public function getTableId() {
    return $this->tableId;
  }

  public function setTableId($tableId) {
    $this->tableId = $tableId;
  }

  public function getOperation() {
    return $this->operation;
  }

  public function getTable() {
    return $this->table;
  }

  public function setTimestamp($timestamp) {
    $this->timestamp = $timestamp;
  }

  public function getTimestamp() {
    return $this->timestamp;
  }

  public function getEntryKey() {
    return $this->entryKey;
  }

  public function setEntryKey($value) {
    $this->entryKey = $value;
  }

  public function getEntryOldValue() {
    return $this->entryOldValue;
  }

  public function setEntryOldValue($value) {
    $this->entryOldValue = $value;
  }

  public function getEntryNewValue() {
    return $this->entryNewValue;
  }

  public function setEntryNewValue($value) {
    $this->entryNewValue = $value;
  }
}

?>
