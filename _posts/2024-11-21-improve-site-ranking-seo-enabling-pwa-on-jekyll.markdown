---
layout: post
comments: true
toc: true
title: "Improve your Jekyll site ranking (SEO) turning into PWA"
description: "A step by step guide to turn your Jekyll site into a Progressive Web Application"
date: 2024-11-21 01:11:02 +0200
categories: jekyll pwa seo
tags:
- jekyll
- pwa
- seo
background: '/assets/images/2024-11-21-improve-site-ranking-seo-enabling-pwa-on-jekyll.webp'
---

## Turning your Website into a Progressive Web App ##

A [Progressive Web App](https://en.wikipedia.org/wiki/Progressive_web_app){:target="_blank"} (PWA) is a website that leverages modern web technologies to deliver an app-like user experience. By combining the best of both worlds, PWAs offer deep linking and URLs from the web, offline access, push notifications, and more device-specific features typically associated with native apps.

> Deliver a more engaging and reliable web experience with PWA

### Why use PWA? ###

There are numerous benefits to transforming your website into a [PWA](https://en.wikipedia.org/wiki/Progressive_web_app){:target="_blank"}:

- **Faster, More Secure User Experience**: PWAs load quickly, even on slow networks, and provide a secure browsing experience.
- **Improved Google Ranking**: Google prioritizes PWAs in search results, leading to increased visibility and organic traffic.
- **Enhanced Usability**: PWAs offer a seamless user experience across devices, including smartphones, tablets, and desktops.
- **Superior Performance**: PWAs deliver lightning-fast performance, ensuring a smooth and responsive user interface.
- **Offline Access**: Users can access your website's content even when they're offline, boosting user engagement and retention.
- **Home Screen Shortcut**: PWAs can be added to the device's home screen, providing quick and easy access.

### PWA ready in 3 easy steps ###

While the specific steps may vary depending on your website's technology stack, here's a general overview of the process:

1. **Implement a Service Worker**: A service worker is a script that runs in the background, enabling features like offline access and push notifications.
2. **Set Up a Manifest File**: This JSON file provides metadata about your PWA, including its name, icons, and theme color.
3. **Ensure HTTPS**: All resources, including images and scripts, must be served over HTTPS to enhance security.

## Turning Jekyll Website into a PWA ##

Ready? Let's do it.

Open your footer template and add the following code:

{% include code_block.html lang="javascript" content='&lt;script type="text/javasccript"&gt;
if ("serviceWorker" in navigator) {
  if (navigator.serviceWorker.controller) {
    console.log("An active service worker found, no need to register");
  } else {
    // Register the service worker
    navigator.serviceWorker
    .register("/assets/js/serviceworker.js", {
      scope: "./"
    })
    .then(function (reg) {
      console.log("Service worker has been registered for scope: " + reg.scope);
    });
  }
}
&lt;/script&gt;' %}

Create a new JavaScript file with the Service Worker code:

{% include code_block.html lang="javascript" content='const CACHE = "pwabuilder-offline";

const offlineFallbackPage = "index.html";

// Install stage sets up the index page (home page) in the cache and opens a new cache
self.addEventListener("install", function (event) {
  console.log("Install Event processing");

  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      console.log("Cached offline page during install");

      if (offlineFallbackPage === "ToDo-replace-this-name.html") {
        return cache.add(new Response("Update the value of the offlineFallbackPage constant in the serviceworker."));
      }
      return cache.add(offlineFallbackPage);
    })
  );
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        console.log("Add page to offline cache: " + response.url);

        // If request was success, add or update it in the cache
        event.waitUntil(updateCache(event.request, response.clone()));

        return response;
      })
      .catch(function (error) {
        console.log("Network request Failed. Serving content from cache: " + error);
        return fromCache(event.request);
      })
  );
});

function fromCache(request) {
  // Check to see if you have it in the cache
  // Return response
  // If not in the cache, then return error page
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        return Promise.reject("no-match");
      }

      return matching;
    });
  });
}

function updateCache(request, response) {
  return caches.open(CACHE).then(function (cache) {
    return cache.put(request, response);
  });
}' %}

Add the following parameters (if missing) in your config.ynl

{% include code_block.html lang="yaml" content='# Manifest params
name                    : "Example title"
url                     : "https:&#47;&#47;www.example.com"
short_name              : "EXP"
language                : "en"
lang_direction          : "ltr"
color                   : "#FFFFFF"' %}

Create the manifest.json template in the website root.

{% include code_block.html lang="json" content='&dash;&dash;&dash;
layout: none
&dash;&dash;&dash;

{
  "id": "/index.html",
  "lang": "&#123;&#123; site.language &#125;&#125;",
  "dir": "&#123;&#123; site.lang_direction &#125;&#125;",
  "name": &#123;&#123; site.name | smartify | jsonify &#125;&#125;,
  "short_name": &#123;&#123; site.short_name | smartify | jsonify &#125;&#125;,
  "description": "&#123;&#123; site.description &#125;&#125;",
  "categories": ["cat_1", "cat_2", "cat_3"],
  "icons": [
    {
      "src": "\/assets\/images\/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image\/png"
    }
  ],
  "screenshots": [
    {
      "src": "\/assets\/images\/screenshot.png",
      "sizes": "1280x720",
      "type": "image\/png"
    }
  ],
  "launch_handler": {
    "client_mode": ["focus-existing", "auto"]
  },
  "scope_extensions": [
    {
      "origin": "&#123;&#123; site.url &#125;&#125;"
    }
  ],
  "theme_color": "&#123;&#123; site.color &#125;&#125;",
  "background_color": "&#123;&#123; site.color &#125;&#125;",
  "start_url": "&#123;&#123; site.url &#125;&#125;",
  "scope": "/",
  "display": "standalone",
  "orientation": "natural"
}' %}

Link the manifest.json in your header template

{% include code_block.html lang="javascript" content='&lt;link rel="manifest" href="/manifest.json"&gt;' %}

## Resources ###

- **[PWA builder](https://www.pwabuilder.com/){:target="_blank"}**
- **[Jekyll website to progressive web app](https://svrooij.io/2022/01/29/jekyll-pwa/){:target="_blank"}**
