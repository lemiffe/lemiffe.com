---
author: Lemiffe
comments: false
date: 2008-07-29 07:15:04+00:00
layout: post
link: https://www.lemiffe.com/documenting-stored-procedures/
slug: documenting-stored-procedures
title: Documenting Stored Procedures
wordpress_id: 77
categories:
  - Technology
tags:
  - documenting
  - information
  - sp
  - sproc
  - sql server
  - stored procedures
---

I've been creating and modifying a few stored procedures for a 'debt history and future payments' report in a VS.NET app using SQL Server 2005 for the past days. Quite a bit of a task to be honest, but I have found something very useful while developing large stored procedures. Some times they can get out of hand, you know, with virtual tables, views, massive calculations involving aggregate functions and loads of inner joins.

Document everything! Changes, current status, this way you'll have a clue on where you stand and what you must achieve, so even if things get out of hand this is always a good reference, and gives you a great focus. It's also a very good guide when you finished it, and several months later your customer calls you nagging that it's not working anymore. You go back, read all you wrote, and get a full view on it's current status and what you must do to correct the mistakes.

An example of my style of documenting stored procedures is as follows:

<!-- more -->

    /*###########################

    Stored Procedure:	[NAME]
    Main Author:		Persons Name
    Modifications:		Person, Person, Person
    Current State:		Not Working
    Parameters:		@idcatalog: Catalog ID
    			@parameter1: Description
    			@parameter2: Description
    Test Parameters:	1, 100, 2044

    General Info:		This stored procedure does this
    			and that and something else,
    			unfortunately it does not work
    			because it is missing this and
    			that and something else.

    LOG:	28.07.2008	SP created with initial values. (Me)
    	29.07.2008	Parameter 2 added for +reason. (You)

    ###########################*/

You'll notice a good improvement in programming time per stored procedure even though it takes you a mintue or two to write it down. It'll help you out quite a lot in the future, you'll see.
