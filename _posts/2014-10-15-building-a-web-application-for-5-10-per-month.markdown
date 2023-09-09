---
author: Lemiffe
comments: true
date: 2014-10-15 14:48:11+00:00
layout: post
link: https://www.lemiffe.com/building-a-web-application-for-5-10-per-month/
slug: building-a-web-application-for-5-10-per-month
title: Building a web application for $5-10 per month
wordpress_id: 1321
categories:
    - Technology
tags:
    - airbrake
    - amazon s3
    - analytics
    - apps
    - architecture
    - cheap
    - cloudflare
    - datastore
    - digitalocean
    - godaddy
    - google
    - iconifier
    - mailjet
    - newrelic
    - openid
    - saas
    - ssl
    - statuscake
    - unsplash
    - web application
---

SAAS companies seem to fulfil almost every need lately; from VCS to mailing, from authentication to screen sharing, from image and video processing to caching and app hosting. Interestingly enough, a lot of these companies offer basic tiers for free, so it is becoming increasingly possible to launch a web application where most of the work is done by 3rd parties, with a minimal budget.

I started wondering recently if it would be possible to launch such an app, using as many 3rd party services as possible to fulfil the necessary functions (such as authentication and storage), with a budget of $5 to $10 USD per month.

The following is a graph representing my idea for the architecture of such an app, describing the interaction with these services. Most of these are free (except for the purchase of a domain name, Google Apps, and DigitalOcean, which have very accessible plans):

![image]({{ site.url }}/assets/media/SaasMapWebApp.png)

**The goal of my small research was to verify if it would be possible to:**

Build an SSL-enabled web application with monitoring + CDN + hosting + authentication using OpenID, striving for minimal cost while offloading as much back-end, data, and functionality to cheap or free 3rd party services.

**Every 3rd party service mentioned in this graph had to fulfil the following criteria: **

-   Free (or very cheap)
-   Longevity (has been thoroughly adopted by the market, or major companies)
-   Reliable (at least 99% SLA)

**This is a list of tools & services to get your new product up and running for dirt cheap:**

-   **Domain, DNS, hosting, and caching**

    -   [**GoDaddy**](https://www.godaddy.com/) offers cheap domain names and DNS hosting

    -   [**Cloudflare**](https://www.cloudflare.com/) offers excellent caching + security + free SSL

    -   [**DigitalOcean**](https://www.digitalocean.com/) [has it's flaws](https://github.com/fog/fog/issues/2525), but is still a much cheaper option than Rackspace or Amazon

-   **Authentication**

    -   [**OpenID**](http://openid.net/) Connect is an initiative by several large companies to make auth simpler (like [Persona](https://www.mozilla.org/en-US/persona/) by Mozilla)

-   **Databases & Storage**

    -   **Self-hosted**

        -   [**MongoDB**](http://www.mongodb.org/) is a great/easy NoSQL solution

        -   **[PostgreSQL](http://www.postgresql.org/)** is widely used and supports SQL/NoSQL

        -   **[MySQL](http://www.mysql.com/) **and[** MariaDB**](https://mariadb.org/) are standard SQL RDBMS that have gone through the test of time

    -   **Remote**

        -   [**Google Cloud DataStore**](https://cloud.google.com/datastore/docs) is your database in the cloud (and it has a free plan as well)

        -   [**Amazon S3**](http://aws.amazon.com/s3/) (for storage, in case you have a large amount of images/files, optional in this case)

-   **Mail**

    -   **Mailbox hosting**

        -   [**Pawnmail**](https://pawnmail.com/) - Email hosting for free! (tried it for a year and so far it seems to work great)

        -   [**Google Apps**](https://www.google.com/work/apps/business/) - Mailbox functionality for your domain ($5/mailbox) in case you don't want to set up a server

        -   [**Postfix mail server**](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-postfix-e-mail-server-with-dovecot) - You can host it yourself (using Postfix), but be prepared to spend a lot of time setting it up

    -   **Mass-mailing systems**

        -   [**Mailjet**](https://www.mailjet.com/) is great for sending emails (from your server) and newsletters ([and has a free plan](https://www.mailjet.com/pricing))

        -   [**Mailchimp**](http://mailchimp.com/) is another option, and also has a [free plan](http://mailchimp.com/pricing/)

-   **Graphics and icons**

    -   [**Unsplash**](https://unsplash.com) (and Flickr freeuse) offer good images for use in your site for free

    -   [**Font Awesome**](http://fortawesome.github.io/Font-Awesome/) provides a quality icon font for free

    -   [**Iconifier.net**](http://iconifier.net/) (create your favicon and apple icons for free)

-   **Monitoring, logging and analytics**

    -   [**Google Analytics**](http://www.google.com/analytics/) offers free tracking for website users and their actions on your site/application

    -   <del>[**Pingdom**](https://www.pingdom.com/) be alerted when your site goes down [with a free account](https://www.pingdom.com/free/)</del>

        -   Pingdom no longer has a free account, but **[statuscake](https://www.statuscake.com)** does!

    -   [**NewRelic**](http://newrelic.com/) offers application/server monitoring [with a free plan](http://newrelic.com/application-monitoring/pricing)

    -   [**AirBrake**](https://airbrake.io/) helps with error logging / notifications, it costs $35/mo so I'd say this is optional in early stages

**Finally, the application itself could be built in this way:**

-   **Back-end**: Python + Flask + Tornado. Flask is a framework which allows you to generate APIs in a simple/scalable way, and it is very easy to get started. Add Tornado to handle concurrent requests. You could use the PyOIDC wrapper to handle authentication, and the rest could rely on a simple architecture (Entity - DAL - BLL - API).
-   **Front-end**: Built with HTML5 + Bootstrap (easy way to get up and running fast), AngularJS (with controllers and services to communicate with the back-end), SASS (or LESS), and Gulp to compile/merge everything.
-   **Source & deployments**: You could use Bitbucket with two private repositories (front-end / back-end) for free, and Capistrano to deploy to your server.
-   **Testing**: Protractor and/or Jasmine

**As easy as that!**

If you have any suggestions to how I could improve this chart, or any services that would improve (or further delegate core functionality to free/cheap 3rd party solutions), please let me know in the comments!

**\* Note**: You could use Heroku (which has a free tier) instead of DigitalOcean or Rackspace, but who doesn't love full control over his/her server?
