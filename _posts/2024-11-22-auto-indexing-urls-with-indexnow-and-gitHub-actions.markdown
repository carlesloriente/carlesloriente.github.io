---
layout: post
comments: true
title: "Auto-indexing URLs with IndexNow & GitHub Actions"
description: "Submit automatically new URLs to search engines with IndexNow and Github Actions"
date: 2024-11-22 00:01:02 +0200
categories: jekyll indexnow github-actions search-engines
tags:
- jekyll
- indexnow
- github-actions
- search-engines
background: '/assets/images/2024-11-22-auto-indexing-urls-with-indexnow-and-gitHub-actions.webp'
---

## IndexNow **Take Control of Your Website's Search Engine Visibility** ##

[IndexNow](https://www.indexnow.org/){:target="_blank"} is a new protocol that lets you instantly inform search engines about changes to your website. This means your new content can be indexed and appear in search results much faster.

### Why is IndexNow a Game-Changer? ###

- **Faster Indexing**: Get your new content discovered quicker.
- **Prioritized Crawling**: Tell search engines which pages are most important.
- **Reduced Server Load**: Less frequent crawling means less stress on your server.

> Improve your website's visibility and drive more traffic

### IndexNow Search engines ###

The following search engines use IndexNow protocol and provide their API URLs for integration:

- [IndexNow](https://api.indexnow.org/indexnow?url=url-changed&key=your-key){:target="_blank"}
- [Microsoft Bing](https://www.bing.com/indexnow?url=url-changed&key=your-key){:target="_blank"}
- [Naver](https://searchadvisor.naver.com/indexnow?url=url-changed&key=your-key){:target="_blank"}
- [Seznam.cz](https://search.seznam.cz/indexnow?url=url-changed&key=your-key){:target="_blank"}
- [Yandex](https://yandex.com/indexnow?url=url-changed&key=your-key){:target="_blank"}
- [Yep](https://indexnow.yep.com/indexnow?url=url-changed&key=your-key){:target="_blank"}

IndexNow-enabled search engines instantly share submitted URLs with each other, streamlining indexing across multiple platforms.

## Using IndexNow with GitHub Actions: A Step-by-Step Guide ##

### Obtaining an API Key ###

1. Visit the [Bing IndexNow website](https://www.bing.com/indexnow){:target="_blank"}
2. Create an account or log in to your existing account
3. Once logged in, you'll be able to generate an API key.

### IndexNow GitHub Action Workflow ###

Create a workflow that triggers on specific events, such as a push to the main branch or a deployment. This workflow will:

- Fetch the IndexNow API key
- Identify changed URLs
- Submit URLs to IndexNow

Set the IndexNow API secret in your repository, go to `Settings -> Secrets and Variables -> Actions -> Repository secrets`. Click on `New repository secret` paste the key and save it. You can call it `INDEXNOW_KEY`.

Create a new Github workflow for sending automatically URLs every day at 11am.

*Copy and paste the following code*:
{% include code_block.html lang="yml" content='name: "IndexNow"
on:
  schedule: # Run workflow automatically
  &dash; cron: "0 11 &ast; &ast; &ast;"  
  workflow_dispatch:

jobs:
  check-and-submit:
    runs-on: ubuntu-latest
    steps:
      &dash; name: indexnow-action
        uses: bojieyang/indexnow-action@v2
        with:
          sitemap-location: "https://www.yoursite.com/sitemap.xml"
          since: 1
          since-unit: "week"
          key: $&#123;&#123; secrets.INDEXNOW_KEY &#125;&#125;' %}

Remember to update `sitemap-location` with your correct sitemap URL.

## Resources ###

- **[IndexNow Website](https://www.indexnow.org/searchengines){:target="_blank"}**
- **[Documentation for Search Engines](https://www.indexnow.org/searchengines){:target="_blank"}**
