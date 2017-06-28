<?php

namespace Neodymium\Managers;
use Phalcon\Http\Response\Cookies;
use Phalcon\Mvc\User\Module;
use Neodymium\Models;
use Neodymium\Models\Business;


class InstanceManager extends Module {
	public function createInstance(Business $business) {
		$nameSlug = $business->getSlug();
        $config   = $this->di->get("db_config");
        $appConfig = $this->di->get("app_config");
        $args = [];
        $args[] = "host=" . $config["host"];
        $args[] = "dbname=nd_" . $nameSlug;
        $args[] = "dbuser=user_" . $nameSlug;
        $args[] = "dbpass=" . md5($nameSlug);
        $args[] = "path=" . $appConfig["path"] . '/' . $nameSlug;
        $args[] = "dbrootuser=" . $config["username"];
        $args[] = "dbrootpass=" . $config["password"];
        $args[] = "businessID=" . $business->getId();

        $this->copyContainer('../container', '../instances/' . $nameSlug);

        //do the shit
        chdir('../instances/' . $nameSlug);
        exec('php tools/create.php '  . join(' ', $args));
	}

	protected function copyContainer($source, $dest) {
		mkdir($dest, 0755);
		foreach (
			$iterator = new \RecursiveIteratorIterator(
				new \RecursiveDirectoryIterator($source, \RecursiveDirectoryIterator::SKIP_DOTS),
			  	\RecursiveIteratorIterator::SELF_FIRST) as $item
		) {
		 	if ($item->isDir()) {
		    	mkdir($dest . DIRECTORY_SEPARATOR . $iterator->getSubPathName());
		  	} else {
		   		 copy($item, $dest . DIRECTORY_SEPARATOR . $iterator->getSubPathName());
		  	}
		}
	}
}


