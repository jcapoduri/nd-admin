<?php

use Phalcon\Db\Column as Column;

[
  "postalcode" => [
    "columns" => [
      new Column(
        "id",
        array(
            "type"          => Column::TYPE_INTEGER,
            "size"          => 10,
            "unsigned"      => true,
            "notNull"       => true,
            "autoIncrement" => true,
            "first"         => true,
        )
      ),
      new Column(
        "code",
        array(
            "type"    => Column::TYPE_CHAR,
            "size"    => 4,
            "notNull" => true
        )
      ),
      new Column(
        "shorthand",
        array(
            "type"    => Column::TYPE_CHAR,
            "size"    => 3,
            "notNull" => true
        )
      ),
      new Column(
        "name",
        array(
            "type"    => Column::TYPE_VARCHAR,
            "size"    => 255,
            "notNull" => true
        )
      ),
      new Column(
        "isDeleted",
        array(
          "type"    => Column::TYPE_BOOLEAN,
          "dafult"  => false,
          "notNull" => true
        )
      )
    ],
     "indexes" => [
        new Index(
            "PRIMARY",
            array("id")
        )
    ],
    "options" => [
        "TABLE_TYPE"      => "BASE TABLE",
        "ENGINE"          => "InnoDB",
        "TABLE_COLLATION" => "utf8_general_ci",
    ]
  ]
]