---
layout: post
comments: true
title: "How to install Ladybird on Fedora"
description: "A step-by-step guide on how to install and run Ladybird on Fedora."
date: 2025-03-07 21:51:02 +0200
categories: ladybird fedora
tags:
- ladybird
- fedora
- installation
background: '/assets/images/bg-ladybird.webp'
---

## Why use Ladybird browser?

[Ladybird](https://ladybird.org/){:target="_blank"} is a web browser that is designed to be fast and lightweight. It is built on top of the Chromium browser engine, which means that it is compatible with all of the latest web technologies. Ladybird is designed to be easy to use and to provide a clean and simple user interface.

![Ladybird logo](/assets/images/2025-03-07-how-to-install-ladybird-on-fedora-1.png){:.img-fluid}

[Andreas Kling](https://awesomekling.github.io/){:target="_blank"} the creator of [Ladybird](https://ladybird.org/){:target="_blank"}, is also the creator of the [SerenityOS](https://serenityos.org/){:target="_blank"}.

## Download and Install Ladybird on Fedora

Ladybird it's on development, so you can download the latest version from the [official GitHub repo](https://github.com/LadybirdBrowser/ladybird){:target="_blank"}.

Feel free to clone the repository or download the full source code as a [zip file](https://github.com/LadybirdBrowser/ladybird/archive/refs/heads/master.zip){:target="_blank"}.

### Dependencies

{% include code_block.html lang="bash" content="sudo dnf install autoconf-archive automake ccache cmake curl liberation-sans-fonts libglvnd-devel nasm ninja-build perl-FindBin perl-IPC-Cmd perl-lib qt6-qtbase-devel qt6-qtmultimedia-devel qt6-qttools-devel qt6-qtwayland-devel tar unzip zip zlib-ng-compat-static" %}

> **&#9432;** These are the dependencies required to build Ladybird from source
{:.alert .alert-info}

### Build Ladybird

1. Open a terminal window.
2. Navigate to the directory where you downloaded the Ladybird package.
3. Run the following command to install Ladybird:

{% include code_block.html lang="bash" content="sh Meta/ladybird.sh install" %}

Copy the `Ladybird` binary to a directory in your `PATH`:
{% include code_block.html lang="bash" content="sudo cp Build/release/bin/Ladybird /usr/local/bin" %}

### Run Ladybird

You can now run Ladybird like an standard application or by typing `ladybird` in a terminal window.
{% include code_block.html lang="bash" content="Ladybird" %}

![Ladybird browser](/assets/images/2025-03-07-how-to-install-ladybird-on-fedora-2.png){:.img-fluid}

### Troubleshooting

If you encounter any errors during the build process, you can run the following command to clean up the build directory and start over:
{% include code_block.html lang="bash" content="sh Meta/ladybird.sh clean" %}

> **&#9432;** Check the [official Ladybird documentation](https://github.com/LadybirdBrowser/ladybird?tab=readme-ov-file){:target="_blank"} for more information
{:.alert .alert-info}

## Conclusion

Ladybird it's on development, so you can expect some bugs and missing features. But it's a good alternative to the mainstream browsers, and it's worth to give it a try.

Consider supporting the Ladybird project donating on [donorbox](https://donorbox.org/ladybird){:target="_blank"}. Donors can also contribute to the development of the browser.

If you have any questions or suggestions, feel free to leave a comment below.
