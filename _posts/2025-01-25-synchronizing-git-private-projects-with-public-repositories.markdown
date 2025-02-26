---
layout: post
comments: true
title: "GitHub Actions for Updating Git Submodules in Private Repos"
description: "Enhance your development practices by automating git submodule updates using GitHub Actions. This guide provides a step-by-step approach to configuring workflows, managing secrets, and ensuring secure and reliable updates for your private projects."
date: 2025-01-25 00:23:02 +0200
categories: git submodule github-actions automation workflow CI/CD
tags:
- git
- submodule
- github-actions
- automation
- workflow
- CI/CD
background: '/assets/images/bg-github.webp'
---

## Synchronizing Private Projects with Public Repos

### Introduction

Git submodules allow you to integrate code from a separate Git repository (in this case, a public repository) into your main project (a private repository). This is valuable for managing reusable components or external libraries. However, keeping these submodules up-to-date can be challenging.

In this post I will guide you through updating a submodule within a private repository whenever the corresponding public repository is updated.
We'll leverage GitHub Actions workflows and explore the necessary configurations in both repositories, including the use of secrets for secure authentication.

**Key aspects covered**:

- Setting up a public repository on GitHub.
- Creating a private repository with a submodule pointing to the public repository.
- Configuring a GitHub Actions workflow in the private repository to trigger on pushes to the public repository.
- Implementing the submodule update logic within the workflow using Git commands.
- Defining and utilizing necessary secrets in both repositories for secure access and authentication.

## Let's get started

### Public repository setup

Create your public repo, in this guide i created my-public-repo at github.com, you can check it out [here](https://github.com/carlesloriente/my-public-repo){:="_blank"}.

Clone it to your local machine:
{% include code_block.html lang="bash" content="git clone git@github.com:carlesloriente/my-public-repo.git" %}

Create the folder `files` and create a new file `file.txt` and do your first commit:
{% include code_block.html lang="bash" content='git checkout -b main
mkdir files
touch files/file.txt
git add .
git commit -m "Add file.txt"
git push -u origin main' %}

#### Action sending repository event

Back to your local machine, go to `my-public-repo` and create the github workflows folder:
{% include code_block.html lang="bash" content="mkdir -p .github/workflows" %}

To send and receive events from one repo to another, we are going to use the action `repository-dispatch` by [Peter Evans](https://github.com/peter-evans){:="_blank"}, create the workflow file `.github/workflows/updates_dispatch.yml`, with the following content (replace `carlesloriente/my-private-repo` with your private repo):
{% include code_block.html lang="yaml" content='name: Dispatch Updates
on:
  push:
    branches:
      - main
jobs:
  dispatch:
    runs-on: ubuntu-24.04
    steps:
      - uses: peter-evans/repository-dispatch@v3
        with:
          token: $&#123;&#123; secrets.PAT &#125;&#125;
          repository: carlesloriente/my-private-repo
          event-type: updating' %}

Commit the changes:
{% include code_block.html lang="bash" content='git add .github/workflows/updates_dispatch.yml
git commit -m "[skip actions] Add updates_dispatch.yml"
git push origin main' %}

> **&#9432;** The *[skip actions]* in the commit message is used to avoid triggering the workflow when pushing changes to the public repository.
{:.alert .alert-info}

Now, go to your public repo at github.com and click the Actions tab, you will see the new workflow `Dispatch Updates`.

##### Updates_dispatch action explanation

The workflow is triggered by a push event specifically to the main branch of the current repository (my-public-repo).

- Job named "dispatch" is executed.
- Steps
  - Dispatch Update Event:
    - The peter-evans/repository-dispatch@v3 action is used to dispatch a custom event.
    - The token input utilizes the secrets.PAT repository secret for authentication.
    - The repository input specifies the target repository for the dispatched event (carlesloriente/my-private-repo).
    - The event-type input defines the name of the custom event as "updating".

**Key Considerations**:

- This workflow relies on the secrets.PAT repository secret for authentication.
- The target repository for the dispatched event (carlesloriente/my-private-repo) needs to be configured appropriately.
- The event-type ("updating") can be customized to any desired value.

### Private repository setup

Create the private repo, I created my-private-repo at github.com, you can check it out [here](https://github.com/carlesloriente/my-private-repo){:="_blank"}.

{:.text-center}
![Private Repository](/assets/images/2025-01-25-synchronizing-git-private-projects-with-public-repositories-1.png){:.img-fluid}

Now, clone the my-private-repo to your local machine (replace `carlesloriente` with your username):
{% include code_block.html lang="bash" content="git clone git@github.com:carlesloriente/my-private-repo" %}

Create the new branches `main` and `develop`, and commit the main branch:
{% include code_block.html lang="bash" content="git checkout -b main
touch README.md
git add .
git commit -m 'Initial commit'
git push -u origin main
git checkout -b develop" %}

Add the `my-public-repo` as a submodule to `my-private-repo`, create a folder named `submodules` and run the following command:
{% include code_block.html lang="bash" content="mkdir submodules
git submodule add git@github.com:carlesloriente/my-public-repo submodules/my-public-repo
git submodule update --init --recursive" %}

It will add the `my-public-repo` as a submodule to the folder `submodules/my-public-repo`.

Create a symlink to the folder `files` in the root of `my-private-repo`:
{% include code_block.html lang="bash" content="ln -ns submodules/my-public-repo/files files" %}

Commit the changes:
{% include code_block.html lang="bash" content='git add .
git commit -m "Add my-public-repo as a submodule"' %}

Push the changes to the remote repository:
{% include code_block.html lang="bash" content="git push -u origin develop" %}

You can check the changes at the branch develop of my-private-repo, you will see the my-public-repo as a submodule.

<!-- Now, go to github.com and create a pull request to merge the branch develop to main. -->

{:.text-center}
![Create PR and merge](/assets/images/2025-01-25-synchronizing-git-private-projects-with-public-repositories-2.png){:.img-fluid}

After the pull request is merged, go to [Settings-> Personal access tokens](https://github.com/settings/personal-access-tokens){:="_blank"} and create a new token with the following permissions:

- Read access to:
  - actions
  - metadata
  - repo
- Read and write access to:
  - workflows
  - commit statuses
  - pull requests

Copy the token and go to `Settings-> Secrets and Variables-> Actions` of `m̀y-private-repo` on github.com:

- Add a new secret named PAT with the previously copied token value
- Add a new secret named OWNER_EMAIL with your email

Now, go to `Settings-> Secrets and Variables-> Actions` of `my-public-repo` and add the same secrets.

#### Action triggered by repository event

Go to `Settings-> Actions-> General` of `my-private-repo` on github.com and enable the following permissions:

- Click the checkbox "Read and write permissions" button.
- Click the checkbox "Allow Github Actions to create and approve pull requests".

![Workflow permissions](/assets/images/2025-01-25-synchronizing-git-private-projects-with-public-repositories-3.png){:.img-fluid}

Back to your local machine (my-private-repo), create the github workflows folder:
{% include code_block.html lang="bash" content="mkdir -p .github/workflows" %}

We are going to use the action [checkout](https://github.com/actions/checkout){:="_blank"} provided by github, so create the workflow file `.github/workflows/update_on_event.yml`, with the following content (replace ENV variable; MODULE_PATH with your value):
{% include code_block.html lang="yaml" content='name: Updating Submodule

on:
  repository_dispatch:
    types:
      - updating

jobs:
  update:
    runs-on: ubuntu-24.04
    permissions:
      contents: write
      pull-requests: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          token: $&#123;&#123; secrets.PAT &#125;&#125;
          submodules: recursive

      - name: Configure git user
        env:
          OWNER_EMAIL: $&#123;&#123; secrets.OWNER_EMAIL &#125;&#125;
        run: |
          git config --global user.email "$OWNER_EMAIL"
          git config --global user.name "PRBot"

      - name: Generate Unique variable based on timestamp
        run: echo BRANCH=$(date +%s) >> $GITHUB_ENV

      - name: Update submodules
        run: |
          git submodule update --init --recursive --remote

      - name: Commit changes
        run: |
          git add .
          git commit -m "Update submodules"

      - name: Create and push new branch
        run: |
          git checkout -b $&#123;&#123; env.BRANCH &#125;&#125;
          git push origin $&#123;&#123; env.BRANCH &#125;&#125;

      - name: Create pull request
        env:
          GITHUB_TOKEN: $&#123;&#123; secrets.PAT &#125;&#125;
        run: |
          gh pr create -B develop -H $&#123;&#123; env.BRANCH &#125;&#125; --title "PR: Submodule update to develop" --body "Created by Github action"' %}

Commit the changes:
{% include code_block.html lang="bash" content='git add .github/workflows/update_on_event.yml
git commit -m "Add update_on_event.yml workflow"
git push origin develop' %}

Go to github.com and create a pull request to merge the branch develop to main. Click the Actions tab, you will see the new workflow `Updating Submodule`.

##### Update_on_event action explanation

The workflow is triggered by a custom repository_dispatch event named "updating". This allows you to manually initiate the update process from within your repository (my-private-repo).

- The job named "build" is executed and requires write permissions to both; repository contents and pull requests.
- Steps
  - Checkout: actions/checkout@v4 will check out the repository code, including the submodule, using a Personal Access Token (PAT) stored in secrets.PAT repository secret.
  - Updates Submodule:
    - Navigates to the submodule directory.
    - Sets the Git user email to a value retrieved from the secrets.OWNER_EMAIL repository secret.
    - Fetches and pulls the latest changes from the submodule's remote repository.
    - Navigates back to the main repository directory.
    - Stages the updated submodule.
    - Commits the changes with a message indicating the submodule update.
    - Pushes the changes creating a new branch.
    - Creates a pull request from the new branch to the main branch using the GitHub CLI (gh).

### Testing Workflows and Synchronization

Make a change to `my-public-repo` and push the changes to the main branch.
{% include code_block.html lang="bash" content='touch files/file2.txt
git add .
git commit -m "Add file2.txt"
git push origin main' %}

After the push, go to the Actions tab of `my-public-repo` and you will see the workflow `Dispatch Updates` running.

{:.text-center}
![Dispatch updates Github action running](/assets/images/2025-01-25-synchronizing-git-private-projects-with-public-repositories-4.png){:.img-fluid}

After the workflow finishes, go to the Actions tab of `my-private-repo` and you will see the workflow `Updating Submodule` running.

{:.text-center}
![Updating submodule Github action running](/assets/images/2025-01-25-synchronizing-git-private-projects-with-public-repositories-5.png){:.img-fluid}

After the workflow finishes, go to the Pull requests tab of `my-private-repo` and you will see a new pull request created by the workflow.

{:.text-center}
![PR Created by Github action](/assets/images/2025-01-25-synchronizing-git-private-projects-with-public-repositories-6.png){:.img-fluid}

When the pull request is merged, the submodule will be updated to the latest commit of the public repository.

## Conclusion

GitHub Actions offers a vast array of features and capabilities beyond what we've covered here. Dive deeper into the documentation and explore its potential to further automate your workflows.

If you found this valuable, consider starring the project's consider starring the project's [GitHub repository](https://github.com/carlesloriente/carlesloriente.github.io){:="_blank"} 🌟. Share this knowledge with your network by spreading the word about this post! 🌍

Thanks for reading! 🚀

### What's Next?

- Explore advanced GitHub Actions features and capabilities to further optimize your workflows.
- Experiment
- Share your feedback and experiences with the GitHub community.
- Stay updated with the latest GitHub Actions updates and best practices.

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions){:="_blank"}
- [GitHub Actions for CI/CD](https://github.com/marketplace?query=ci%2Fcd){:="_blank"}
- [GitHub Actions for Git Submodules](https://github.com/marketplace?query=git+submodules){:="_blank"}
