---
author: Lemiffe
comments: false
date: 2012-10-18 20:58:42+00:00
layout: post
link: https://www.lemiffe.com/how-to-deploy-a-static-page-to-heroku-the-easy-way/
slug: how-to-deploy-a-static-page-to-heroku-the-easy-way
title: How to deploy a static page to Heroku, the easy way!
wordpress_id: 1244
categories:
    - Technology
tags:
    - deploy
    - easy
    - heroku
    - php
    - site
    - static
    - way
---

I wanted to upload a simple website based on HTML, CSS and JS files, with a few images, and a favicon. So I registered at Heroku, bought a domain name, followed the Heroku instructions on how to set up the "Toolbelt" and GIT.

So I thought I was all set up: I created a folder with an index.html page, with the text "Coming Soon...". I set up the repository, and tried to commit to Heroku, only to receive a message similar to "This is not a code repository" or something similar. Heroku is primarily aimed at apps running on frameworks, like Ruby on Rails, Django (Python), node.js, or... ahem... PHP.

So it seemed incredibly dumb that it can handle all these frameworks, but it doesn't let me upload a static site! So I searched about, and found out how to do this by setting a demo (barebones) [ruby app](https://devcenter.heroku.com/articles/static-sites-on-heroku), as well as a [Sinatra variation](http://codingfrontier.com/running-a-static-site-for-free-on-heroku). However, this didn't convince me. First of all I didn't want to place my code in a "public" folder. No. I was probably being a bit picky, but when I expect things to work a certain way, I get annoyed when barriers are put up in my way.

I finally figured out that Heroku allows you to publish PHP sites as well, with NO configuration needed! That's right, just create your .php files, and it will figure out that the Heroku app should run PHP for this site, and it will auto-configure the app to run on the latest version of PHP/Apache.

## So here is how you do it:

Rename your index.html to home.html or something similar.

Create an index.php file with the following code:

    <?php include_once("home.html"); ?>

That's it!

Now go to your app folder in CMD (or Bash), and commit your code to Heroku using the following:

    git add .
    git commit -m 'Change this to a meaningful description'
    git push heroku master

And finally, you should get the following:

    -----> Heroku receiving push<br id=".reactRoot[192].[1][2][1]{comment10152195294515593_36201897}..[1]..[1]..[0].[0][2]..[0].[1]"></br>-----> PHP app detected<br id=".reactRoot[192].[1][2][1]{comment10152195294515593_36201897}..[1]..[1]..[0].[0][2]..[0].[3]"></br>-----> Bundling Apache version 2.2.22<br id=".reactRoot[192].[1][2][1]{comment10152195294515593_36201897}..[1]..[1]..[0].[0][2]..[0].[5]"></br>-----> Bundling PHP version 5.3.10<br id=".reactRoot[192].[1][2][1]{comment10152195294515593_36201897}..[1]..[1]..[0].[0][2]..[0].[7]"></br>-----> Discovering process types<br id=".reactRoot[192].[1][2][1]{comment10152195294515593_36201897}..[1]..[1]..[0].[0][2]..[3]..[0]"></br>Default types for PHP -> web
    -----> Compiled slug size: 9.5MB<br id=".reactRoot[192].[1][2][1]{comment10152195294515593_36201897}..[1]..[1]..[0].[0][2]..[3]..[12]"></br>-----> Launching... done, v4

**Congratulations!** You have published a static site to Heroku with one line of PHP code :)
