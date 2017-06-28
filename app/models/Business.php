<?php

namespace Neodymium\Models;

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Behavior\SoftDelete;

class Business extends Model
{
  use Base;

  protected $name;
  protected $socialName;
  protected $slug;
  protected $branch;
  protected $commit;

  public function initialize()
  {
    $this->setSource("businesses");
    $this->keepSnapshots(true);
    $this->addBehavior(new SoftDelete([
      'field'         => 'isDeleted',
      'value'         => 1,
      'cascadeDelete' => true
    ]));
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

  public function setSocialName($socialname) {
      // The name is too short?
      if (strlen($socialname) < 1) {
          throw new InvalidArgumentException(
              "The name is too short"
          );
      }

      $this->socialName = $socialname;
  }

  public function getSocialName() {
      return $this->socialName;
  }

  public function setBranch($branch) {
        $this->branch = $branch;
  }

  public function getBranch() {
        return $this->branch;
  }

  public function setCommit($commit) {
        $this->commit = $commit;
  }

  public function getCommit() {
        return $this->commit;
  }

  public function setSlug($slugSeed) {
    if (!$this->slug) {
      $this->slug = $this->slugify($slugSeed);
    }
  }

  public function getSlug() {
    return $this->slug;
  }

  protected function slugify($text) {
      // replace non letter or digits by -
      $text = preg_replace('~[^\pL\d]+~u', '-', $text);

      // transliterate
      $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

      // remove unwanted characters
      $text = preg_replace('~[^-\w]+~', '', $text);

      // trim
      $text = trim($text, '-');

      // remove duplicate -
      $text = preg_replace('~-+~', '-', $text);

      // lowercase
      $text = strtolower($text);

      if (empty($text)) {
        return 'n-a';
      }

      return $text;
    }
}

?>
