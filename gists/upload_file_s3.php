<?php

require_once '../private/config.php';
require_once $CONF->private . 'Project.php';
require_once $CONF->lib . 'aws/aws-autoloader.php';
define('AWS_KEY', $CONF->AWS_KEY);
define('AWS_SECRET_KEY', $CONF->AWS_SECRET_KEY);
define('HOST', 'https://s3.amazonaws.com/');

use Aws\S3\S3Client;

// Establish connection with DreamObjects with an S3 client.
$client = S3Client::factory(array(
    'base_url' => HOST,
    'key'      => AWS_KEY,
    'secret'   => AWS_SECRET_KEY,
));

$bucket = 'YOUR-S3-BUCKET';
$keyname = 'FILETOUPLOAD.ext';

$filepath = $keyname;
$acl         = 'private';
$client->upload($bucket, $keyname, fopen($filepath, 'r'), $acl);