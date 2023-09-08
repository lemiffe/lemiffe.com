---
author: Lemiffe
comments: false
date: 2011-12-02 15:54:20+00:00
layout: post
link: https://www.lemiffe.com/my-initial-experience-with-asp-net-mvc3-and-razor/
slug: my-initial-experience-with-asp-net-mvc3-and-razor
title: My initial experience with ASP.NET MVC3 and Razor
wordpress_id: 1200
categories:
    - Technology
tags:
    - .net
    - asp
    - aspnet
    - beginner
    - c#
    - jquery mobile
    - mvc
    - mvc3
    - razor
    - starter
    - tutorial
    - tutorials
---

A couple of weeks ago I was asked to develop a mobile application with data access in ASP.NET.

Naturally, I did a bit of research, tried out a few things, and finally came to the conclusion that .NET framework 4.0 was the best choice.

So I got down straight to development, using [Jquery Mobile Framework](http://jquerymobile.com/), ASP.NET with .NET 4.0,  [MVC3](http://www.asp.net/mvc/mvc3), ADO.NET [Entity Framework 4.1](http://www.microsoft.com/download/en/details.aspx?displaylang=en&id=8363), and ASPX (web forms).

It was easy enough to set up, but when it came down to implementing user controls, I found it a nightmare. Passing parameters to the user control whilst using a MultiView was giving me a headache.

The issue here is that web forms are not naturally set up to work via AJAX calls, and Jquery Mobile Framework relies entirely on AJAX calls. So I decided to try out the [Razor layout engine](http://weblogs.asp.net/scottgu/archive/2010/07/02/introducing-razor.aspx) instead of web forms.

I had no experience using the Razor layout engine, but after a couple of hours, I found it delicious to use. I could code up pages much faster than in web forms. And the integration with controllers and models in the MVC3 framework was just, natural, it all fit into place beautifully.

Naturally, I found a few issues learning the basics of the MVC3 framework, forms authentication, the Razor layout engine, and accessing data from a database. Tutorials seemed to be all over the place, but I came across a few good ones which I will share with you.

If you are getting started with MVC3 + Razor + Data access (using DBContext in MVC3), follow these tutorials, and you'll be a 'pro' in a couple of days (providing you have enough experience).

### Razor Layout Engine:

**Learn the basics of the Razor layout syntax:**

[http://msdn.microsoft.com/en-us/gg618477](http://msdn.microsoft.com/en-us/gg618477)

**Learn how "sections" work in Razor:**

[http://weblogs.asp.net/scottgu/archive/2010/12/30/asp-net-mvc-3-layouts-and-sections-with-razor.aspx](http://weblogs.asp.net/scottgu/archive/2010/12/30/asp-net-mvc-3-layouts-and-sections-with-razor.aspx)

**Learn how to implement partial views in Razor **(which can be used as 'user controls')**:**

[http://rachelappel.com/razor/partial-views-in-asp-net-mvc-3-w-the-razor-view-engine/](http://rachelappel.com/razor/partial-views-in-asp-net-mvc-3-w-the-razor-view-engine/)

### MVC3:

**Learn how a basic MVC3 application works in .NET:**

[http://www.asp.net/mvc/tutorials/creating-a-mvc-3-application-with-razor-and-unobtrusive-javascript](http://www.asp.net/mvc/tutorials/creating-a-mvc-3-application-with-razor-and-unobtrusive-javascript)

**Learn how to integrate data access (database first) using MVC3 and EF 4.1:**

[http://msdn.microsoft.com/en-us/data/gg685489](http://msdn.microsoft.com/en-us/data/gg685489)

(If you want to create models, but use a MSSQL database that is not on your machine, and you don't want to have it in the App_Data folder, just follow the steps, then delete the database from the app_data folder, and change the data source in the web.config to point to the correct location).

**Writing your own queries to access the database instead of relying solely on those from the model:**

[http://blogs.msdn.com/b/adonet/archive/2011/02/04/using-dbcontext-in-ef-feature-ctp5-part-10-raw-sql-queries.aspx](http://blogs.msdn.com/b/adonet/archive/2011/02/04/using-dbcontext-in-ef-feature-ctp5-part-10-raw-sql-queries.aspx)

So that's it for now, I thought it would be good to have a central location for these tutorials as they served me well whilst I learned the basics of MVC3 + EF4.1 + Razor, so I hope they are useful to you as well.

If you have any queries, please let me know in the comment section below.
