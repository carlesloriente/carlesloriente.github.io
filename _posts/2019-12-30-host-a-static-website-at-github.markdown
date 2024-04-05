---
layout: post
comments: true
title: "Host a static website for free using Github Pages"
date: 2019-12-30 12:23:45 +0200
categories: github website
tags:
- github
- website
background: '/assets/images/bg-github.webp'
redirect_from: "/website/github/2019/12/30/host-a-static-website-at-github/"
---

[GitHub](https://github.com/){:target="_blank"} provides hosting for software development version control using Git. If you don't have an account go and create one [it's free"](/assets/images/its-free.png){:target="_blank"}.

**Which type of website can host GitHub**
Take in mind that we are going to store a website in a Git repo, so don't expect advaced functionaIlities beyond some javascript and images.

You can host a:
+ Blog
+ Curriculum Vitae
+ Project documentation

**Let's start**

1. Sig up for GitHub (if you don't have an account)
2. Create a new repository (public) following this pattern (mygithubuser.mygithubuser.github.io)
⋅⋅1. As you can see the name of the repo should be the same as the user
⋅⋅2. After the repo name add .github.io

![New repo](/assets/images/repo-created.png)

3. Download the [zip file](https://github.com/hostwebsite/hostwebsite.github.io/archive/master.zip) containing the required files.

4. Unzip the file

5. Edit _config.yml with your own settings

6. Initialize a local Git repo and push it contents to GitHub

```bash
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/username/username.github.io.git
git push -u origin master
```

7. Wait a bit and check the section "GitHub Pages" inside settings of the repo at the GitHub panel

![GitHub Pages settings](/assets/images/githubpages.png)

8.- Done! now you can browse the website

**References**

[Jekyll](https://jekyllrb.com/){:target="_blank"}<br/>
[Clean Blog - Jekyll](https://startbootstrap.com/themes/clean-blog-jekyll/){:target="_blank"}<br/>
[Getting started with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages){:target="_blank"}
