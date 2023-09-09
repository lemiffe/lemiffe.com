---
author: Lemiffe
comments: false
date: 2009-07-31 09:12:05+00:00
layout: post
link: https://www.lemiffe.com/the-increasing-level-of-connectivity-between-social-sites/
slug: the-increasing-level-of-connectivity-between-social-sites
title: The increasing level of connectivity between Social Sites
wordpress_id: 433
categories:
    - Technology
tags:
    - 128 bit
    - between
    - blog
    - blogger
    - connectivity
    - facebook
    - level
    - md6
    - ping.fm
    - Security
    - sites
    - social
    - ssl
    - status
    - twitter
    - update
    - video
    - wordpress
    - xml
    - youtube
---

A few years ago I dreamt of being able to have all this connectivity, lets say, things being published here, automatically-published there, and elsewhere. I knew we were getting there, as I have been configuring my services for the past few months, but I didn't know we are so advanced.

If I made a rundown or a graph explaining the connectivity between social media sites I currently have, it would grow too large, or the connections would not exactly be easy to draw. \* Update: Well I've decided to draw it anyway:

[caption id="attachment_438" align="aligncenter" width="300" caption="My Network Map"]![My Network Map]({{ site.url }}/assets/media/Network-Map1-300x227.png)]({{ site.url }}/assets/media/Network-Map1.png)[/caption]

For instance: My Youtube is posting to facebook, google reader, twitter and two of my blogs. One of those blogs is lemiffe.com which when receiving a post will alert ping.fm which will then release a post of my new blog post to facebook, twitter, my blog at blogger, myspace, google talk's status, and quite a few other sites.

Now, the only problem I currently see is the level of redundancy. Sites talked to other sites, which in turn talk to other sites, so whenever these sites provide much more connectivity to other services we might end up in a cyclic-post system in which one service posts to the other which in turn posts back to the first one initiating a never-ending cycle in which the user would have to stop one or the other service manually.

I really believe more insight should be applied, like, verifying the other sites connectivity and checking it will not repost to a site the first site has already posted to. This can be done via pure XML transactions between both sites, I mean, thats what web services are for, right?

Another thought I came up with is a Centralised User Account Service, which deals with the connectivity between users of different sites. Lets say: Gravatar meets facebook and ping.fm. All the services first verify the users information on the Centralised service, then they verify which permissions the user has applied concerning posting, which pages must the service send the new update, video or blog message to, and negotiate it only with the Centralised site, which will in turn send off the appropriate XML for all other "connected" sites.

It's just a thought, Security-wise I am not sure where this would lead to as very tight security would have to be placed. Gaining access to the account of a user at the Centralised Site would be, well, Armageddon for that user. So probably a tighter security would have to be placed, with 128 big encription, SSL sockets, MD-6, who knows what else, but it's just a thought anyway.
