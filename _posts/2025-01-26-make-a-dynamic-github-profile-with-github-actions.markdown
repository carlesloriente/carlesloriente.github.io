---
layout: post
comments: true
toc: true
title: "Make your GitHub Profile shine with dynamic updates"
description: "Level up your GitHub presence with automated profile updates! In this article, we'll explore how to use GitHub Actions to dynamically display your latest contributions, project statistics, and more.."
date: 2025-01-26 00:11:02 +0200
categories: github-profile github-actions automation profile github-stats
tags:
- github-profile
- github-actions
- automation 
- profile
- github-stats
background: '/assets/images/bg-automation.webp'
---

## GitHub Profile Automation: Level Up Your Game with GitHub Actions

### Introduction

Your GitHub profile is your digital resume. It showcases your skills, projects, and contributions to the community. However, keeping it up-to-date can be time-consuming and often leads to outdated information. Using GitHub Actions, you can automate the display of your latest contributions, project statistics, blog articles and more. Keeping your profile fresh and relevant with automated updates.

![GitHub Profile with dynamic content](/assets/images/2025-01-26-make-a-dynamic-github-profile-with-github-actions-1.png){:.img-fluid}

## GitHub Profile README

To get started, we need a GitHub repository with the same name as your GitHub username. The GitHub profile is a special repository that allows you to showcase your skills, projects, and contributions. By creating a custom README file. You can add content to your profile page, such as an introduction, links to your social media profiles, and a list of your projects.

### Create a new repository if you don't have one

1. Go to [GitHub](https://github.com){:target="_blank"} and click the **+** icon in the top right corner and select **New repository**.
2. Enter the repository name `carlesloriente/carlesloriente` (replace `carlesloriente` with your GitHub username).
3. Select **Public** as the visibility option and check the box **Initialize this repository with a README**. Click **Create repository**.
4. Clone the repository to your local machine and create a new branch named `main` and push it to the remote repository:
{% include code_block.html lang="bash" content="git clone git@github.com:carlesloriente/carlesloriente
cd carlesloriente
git checkout -b main
git push origin main" %}

### Create a GitHub profile README

You can use markdown syntax in the README file that will be displayed on your profile page.

Edit the `README.md` file and add the following content:
{% include code_block.html lang="markdown" content="## Check my latest articles 👋

&lt;!-- BLOG-POST-LIST:START --&gt;
&lt;!-- BLOG-POST-LIST:END --&gt;" %}

> **&#9432;** This includes a heading and a placeholder to put the articles from your blog.
{:.alert .alert-info}

Save the file and commit the changes to the repository.
{% include code_block.html lang="bash" content="git add README.md
git commit -m 'Add README.md'
git push origin main" %}

Go to your GitHub profile page and you will see the README file displayed.

### Update file content automatically

Let's set a GitHub Action workflow that runs on a schedule. This workflow will fetch data from our personal blog and update the README file with the latest posts.

**1.-** Make a new folder named `.github/workflows` in the root of your repository.
{% include code_block.html lang="bash" content="mkdir -p .github/workflows" %}

**2.-** Create a new file named `update-readme.yml` in the `.github/workflows` folder.
{% include code_block.html lang="bash" content="touch .github/workflows/update-readme.yml" %}

**3.-** Add the following content to the `update-readme.yml` file:
{% include code_block.html lang="yaml" content='name: Update README
on:
  schedule:
    - cron: "0 * * * *"
  workflow_dispatch: # Run workflow manually (without waiting for the cron to be called), through the GitHub Actions Workflow page directly
permissions:
  contents: write

jobs:
  update-readme-with-blog:
    name: Update README with latest blog posts
    runs-on: ubuntu-24.04
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Pull in notesoncloudcomputing.com posts
        uses: gautamkrishnar/blog-post-workflow@v1
        with:
          feed_list: "https://www.notesoncloudcomputing.com/feed.xml"' %}

The [gautamkrishnar/blog-post-workflow](https://github.com/marketplace/actions/blog-post-workflow){:="_blank"} action created by [Gautam krishna](https://github.com/gautamkrishnar){:="_blank"} fetches the latest blog posts from a feed URL and updates the file with post titles and links.

> **&#9888;** Remember to replace the *feed_list* value with the URL of your blog feed.
{:.alert .alert-danger}

**4.-** Commit the changes:
{% include code_block.html lang="bash" content='git add .github/workflows/update-readme.yml
git commit -m "Add update-readme.yml"
git push origin main' %}

#### Configure GitHub Actions permissions
{:.no_toc}

Go to repository settings, Click on `Actions-> General` and enable the following permissions:

- Click the checkbox "Read and write permissions" button.
- Click the checkbox "Allow Github Actions to create and approve pull requests".

And click on the "Save changes" button.

![Repository permissions](/assets/images/2025-01-26-make-a-dynamic-github-profile-with-github-actions-2-permissions.png){:.img-fluid}

### Workflow explanation

- The workflow is triggered every hour using the cron syntax `0 * * * *`, and also includes a manual trigger using `workflow_dispatch`.
- The `actions/checkout@v4` action is used to check out the repository.
- The `gautamkrishnar/blog-post-workflow@v1` action is used to fetch the information.
- The `feed_list` specifies the URL of the feed.
- The `permissions` section grants write access to the contents of the repository.

### Testing the workflow

Go to the Actions tab of your repository and you will see the workflow `Update README` running, or you can trigger it manually by clicking the `Run workflow` button.

After the workflow finishes, go to the main branch of your repository and you the README file will be updated with the latest blog posts list.

![Updated README file](/assets/images/2025-01-26-make-a-dynamic-github-profile-with-github-actions-3-readme-updated.png){:.img-fluid}

## Bonus: GitHub Stats

You can also add your GitHub stats to your profile README. This includes your GitHub activity, top languages, and more. The [anuraghazra/github-readme-stats](https://github-readme-stats.vercel.app/){:target="_blank"} action created by [Anurag Hazra](https://github.com/anuraghazra){:="_blank"} fetches the data from the GitHub API and generates a dynamic image that you can include in your README file.

![GitHub stats](/assets/images/2025-01-26-make-a-dynamic-github-profile-with-github-actions-4-stats.png){:.img-fluid}

### Add GitHub Stats to your profile

Edit the `README.md` file and add the following content:
{% include code_block.html lang="markdown" content="## GitHub Stats
&#91;!&#91;My Stats&#93;&#40;https://github-readme-stats.vercel.app/api?username=myusername&#41;&#93;&#40;https://github.com/anuraghazra/github-readme-stats&#41;" %}

> **&#9432;** Replace *myusername* with your GitHub username.
{:.alert .alert-info}

Save and commit the changes to the repository.
{% include code_block.html lang="bash" content="git add README.md
git commit -m 'Add GitHub stats'
git push origin main" %}

Now, your GitHub profile page will show the GitHub stats.

## Conclusion

Enhancing your GitHub profile with dynamic updates brings several advantages. It showcases your latest contributions, projects, or blog posts, making your profile more engaging and informative. By automating the update process, you save time and effort, ensuring that your profile is always up-to-date.

If you found this valuable, consider starring the project's consider starring the project's [GitHub repository](https://github.com/carlesloriente/carlesloriente){:="_blank"} 🌟. Share this knowledge with your network by spreading the word about this post! 🌍

Thanks for reading! 🚀

### What's Next?

- Customize your GitHub profile with additional features and integrations.
- Explore other GitHub Actions workflows to automate different tasks.
- Share your GitHub profile with the community and receive feedback.
- Stay updated with the latest GitHub Actions updates and best practices.

## Additional Resources

- [GitHub Profile README Documentation](https://docs.github.com/en/github/setting-up-and-managing-your-github-profile/managing-your-profile-readme){:="_blank"}
- [GitHub Actions Documentation](https://docs.github.com/en/actions){:="_blank"}
