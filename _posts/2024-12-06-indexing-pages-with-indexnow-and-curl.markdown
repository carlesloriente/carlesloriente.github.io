---
layout: post
comments: true
title: "Indexing new pages using IndexNow and cURL"
description: "A step by step guide to send new URLs to search engines with IndexNow and cURL"
date: 2024-12-06 03:10:02 +0200
categories: curl indexnow seo
tags:
- curl
- indexnow
- seo
background: '/assets/images/bg-robot-hand.webp'
---

## IndexNow **Take Control of Your Website's Search Engine Visibility** Part 2 ##

Tired of waiting for search engines to crawl and index your latest content? Then this is for you.

IndexNow is an open-source protocol that allows you to directly notify search engines about new or updated URLs. By using cURL, a versatile command-line tool, you can easily interact with the IndexNow API and submit your URLs for rapid indexing.

In our previous article, "[Auto-indexing URLs with IndexNow & GitHub Actions](/posts/2024-11-22-auto-indexing-urls-with-indexnow-and-gitHub-actions/)," we explored how to automate the IndexNow process using GitHub Actions. This tutorial builds upon that knowledge, focusing on manual URL submission using cURL.

### Your Secret Weapon for Web Development ###

[cURL](https://curl.se/){:target="_blank"}, a powerful command-line tool allows you to talk to servers like a pro, simply by specifying a URL and the data you want to send.

Why [cURL](https://curl.se/){:target="_blank"} is a Developer's Best Friend:

* Versatility: [cURL](https://curl.se/){:target="_blank"} supports a wide range of protocols, including HTTP and HTTPS, making it a versatile tool for various tasks.
* Platform Independence: It runs on almost every platform, allowing you to test communication from any device with a command line and network connectivity.
* Simplicity: Its straightforward syntax makes it easy to learn and use, even for beginners.

### Beyond the Command Line ###

[cURL](https://curl.se/){:target="_blank"} is more than just a command-line tool. It's also a robust development library that powers countless applications.
So, the next time you need to test an API, download a file, or simply interact with a server, remember [cURL](https://curl.se/){:target="_blank"}.

## Obtaining your IndexNow API Key ##

We are going to use the Bing IndexNow endpoint (feel free to use any of the SE endpoints)

1. Visit the [Bing Webmasters website](https://www.bing.com/webmasters/){:target="_blank"} and either create an account or sign in to your existing one.
2. Once logged in, click the gear icon in the top right corner. Navigate to Settings -> API Access and generate a new API key.

> Note: Remember to keep your API key secure.

{:.text-center}
![Repository Secret](/assets/images/2024-12-06-indexing-pages-with-indexnow-and-curl.png){:.img-fluid}

## Preparing and sending URLs to crawl ##

### Craft Your JSON Payload ###

*Now, let's create a file named data-to-submit.json and paste the following code:*:
{% include code_block.html lang="json" content='name: "Payload"
{
  "host": "yoursite.com",
  "key": "yourapikey",
  "keyLocation": "https://www.yoursite.com/yourapikey.txt",
  "urlList": [
    "https://www.yoursite.com/url/",
    "https://www.yoursite.com/url2/"
  ]
}
' %}

**Replace the placeholders**:

* `yoursite.com`: Replace this with your actual website domain.
* `yourapikey`: Substitute this with your IndexNow API key obtained from Bing Webmasters.
* `yourapikey`.txt: Update the filename and place it at the root of your website.
* urlList: Add the URLs you want to submit for indexing.

### Sending the Data with cURL ###

Next, we'll use cURL to send this JSON data to the IndexNow API using a POST request.

`curl -v -X POST https://www.bing.com/indexnow -H "Content-Type: application/json; charset=utf-8" -d @data-to-submit.json`

After sending the cURL request, examine the server's response. If everything is successful, you should receive an HTTP status code of 200 OK.

Full list of Response Codes you may receive.

| HTTP CODE | RESPONSE             | REASON                                                                                               |
|-----------|----------------------|------------------------------------------------------------------------------------------------------|
| 200       | OK                   | URL submitted successfully                                                                           |
| 202       | Accepted             | URL received. IndexNow key validation pending.                                                       |
| 400       | Bad Request          | Invalid format                                                                                       |
| 403       | Forbidden            | In case of key not valid (e.g. key not found, file found but key not in the file)                    |
| 422       | Unprocessable Entity | In case of URLs which don’t belong to the host or the key is not matching the schema in the protocol |
| 429       | Too Many Requests    | Too Many Requests (potential Spam)                                                                   |

## Conclusion ##

cURL is a powerful tool that allows you to directly interact with web servers. When used with IndexNow, it empowers you to:

* Speed up indexing: Quickly notify search engines about new or updated content.
* Test API functionality: Verify the correct behavior of IndexNow's API.
* Automate URL submission: Streamline the process for efficiency.
* Gain deeper insights: Analyze server responses for optimization opportunities.
