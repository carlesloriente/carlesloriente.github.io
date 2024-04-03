---
layout: post
comments: true
title: "A simple PHP script for upload files to s3 using AWS SDK"
date: 2020-01-04 11:23:25 +0200
categories: aws php
tags:
- aws
- php
background: '/assets/images/bg-aws-logo.webp'
---

Before use it you should have installed and configured the [AWS SDK for PHP](https://docs.aws.amazon.com/aws-sdk-php/v2/guide/quick-start.html){:target="_blank"}.

*Don't use in production environments*.

```php
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
```

Download GitHub Gist [upload_files_to_s3_using_aws_sdk.php](https://gist.github.com/carlesloriente/70c6691cd8647cfa03bfda0f39cac681){:target="_blank"}
