---
author: Lemiffe
comments: true
date: 2013-08-28 11:42:50+00:00
layout: post
link: https://www.lemiffe.com/5-solutions-for-mysql-error-1235/
slug: 5-solutions-for-mysql-error-1235
title: 5 Solutions for MySQL Error 1235
wordpress_id: 1278
categories:
    - Technology
tags:
    - '1235'
    - after
    - after_delete
    - before
    - combine
    - database
    - definers
    - error
    - mysql
    - reference
    - restore
    - same table
    - solutions
---

I got stuck for hours the other day with this problem. I've used triggers for years in SQL Server without a problem, however, in MySQL the implementation is a bit iffy.

One problem I ran into yesterday while trying to **restore a database** was error 1235:

ERROR 1235 (42000) at line 1408: This version of MySQL doesn't yet support 'multiple triggers with the same action time and event for one table'

I scoured Google for about an hour, and came to the conclusion that there is multiple reasons this error may appear. I explain these reasons and provide solutions for them below.

First of all, I suggest you get a list of all triggers by running the following command:

    <code>SELECT trigger_schema, trigger_name
    FROM information_schema.triggers
    WHERE trigger_schema = '<span style="color: #339966;">NAME_OF_YOUR_DATABASE</span>';</code>

**Reason #1:  You can't combine both BEFORE/AFTER with INSERT/UPDATE/DELETE**

[This PDF](http://technocation.org/files/doc/2010_06_stored_code.pdf) describes this issue. The problem is simple: You can't have BEFORE_INSERT and AFTER_INSERT for the same table. You may have been updating a column BEFORE insert and updating some other table AFTER insert with the ID. I suggest you move some of this logic (maybe the BEFORE trigger) to your code.

**Reason #2: AFTER_DELETE sometimes fails with error 1235**

You should avoid using AFTER_DELETE triggers. Move the logic to a BEFORE_DELETE trigger if you are going to use the OLD variable. No idea why this happens, maybe it is my specific MySQL version.

**Reason #3: You can't have triggers with the same name (duplicate triggers)**

Sometimes you get another error code when doing this, but other times you get the same error 1235 with no explanation. Run the "show triggers" query I stated above and look for any triggers with the same name. Always run DROP TRIGGER before creating/modifying a trigger.

**Reason #4: You can't reference the SAME TABLE you are updating/inserting to in a trigger**

For example, if you wanted to set the default password for a user through a trigger upon creating a new user record, you might have tried to do this: UPDATE users SET password = 'newPassword';

The correct way to do this is to set the variable in the BEFORE_INSERT trigger. Example: SET NEW.password = 'newPassword';

**Reason #5: When exporting a database (as an SQL script) you may get database definers in the script**

In other words, if you export a MySQL database to a .sql file, the actual file may contain things like TRIGGER 'mydbname'.'trigger_name'. So if you try to restore it to a database with a different name it would fail. I would have expected another error code because the database it is referencing is NOT the one I am restoring to. Anyway, you receive error 1235 for this as well.

Quick fix: Open the .sql file and replace all mentions of `EXPORTED_DB_NAME`. with a blank string (i.e. replace with nothing).

**Summary / TLDR:**

Do not use BEFORE/UPDATE triggers on the same table for a same function (e.g. INSERT). Do not use AFTER_DELETE triggers, use BEFORE_DELETE instead. Do not have duplicate trigger names. Do not reference the same table you are updating or inserting to in the trigger, use OLD and NEW instead with SET instead of a subquery. If you are restoring a database from a backup, check that the backup does not contain mentions to the explicit database name (when restoring to a different database name).

Please remember: When creating an INSERT trigger you can only use the NEW variable, when creating an UPDATE trigger you can use OLD and NEW, and in a DELETE trigger you can only reference OLD.
