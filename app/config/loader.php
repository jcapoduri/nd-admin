<?php
require __DIR__ . '/../../vendor/autoload.php';

use Phalcon\Loader;

$loader = new Loader();

$loader->registerNamespaces(
    [
        "Neodymium\\Controllers" => "../app/controllers",
        "Neodymium\\Controllers\\DTO" => "../app/controllers/DTO",
        "Neodymium\\Managers" => "../app/managers",
        "Neodymium\\Repositories" => "../app/repositories",
        "Neodymium\\Models" => "../app/models/"
    ]
);

$loader->register();

?>
