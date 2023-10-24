---
title: Being on-call
date: 2023-10-16
---

I've been on call for about 10 years. I wanted to share a few thoughts on this, such as: Managing stress, how things change over time, and how the tech landscape and architecture change the scope of responsibilities of the person who is on call.

When I was asked to be on call nearly a decade ago, we had about 4-5 people who were selected as the group to be on call. This would mean we'd need to be available 1-2 days a week, in full mental capacity (aka not intoxicated) to jump on calls, debug issues, be woken up at any point during the night to help mitigate production issues. On the upside you get compensated, based on how many days you are on call per month, as well as how many hours of extra work you did as part of emergency responses.

At first thought it might seem a bit daunting, what if you randomly get a message to go out with friends? What if you don't know how to fix the issue? What if it is outside of your domain and you need someone else to help? What if they are not available? What if you are not feeling well that night? What if you just pulled a full day and night of working and you finally manage to get some shut-eye just to be awoken in the middle of the night, knowing you have a fully packed schedule the next day?

Personally, I feel like the initial fear of being on-call outweighs the actual job; yes it will happen, you will eventually get the dreaded ping, but more often than not the issues are easier to fix (specially with modern tooling) than you might think; as long as you have a modern infrastructure with pipelines and auto-scaling of some sort.

## What is expected of me?

When you are on call you are expected to know how to investigate, narrow down, debug, inspect network requests, try to isolate the issue to a specific service or area, then prod at it, check the pods, check the database, figure out if you can restart or redeploy previous pipelines.

You are not expected to be an expert in every domain, nor every part of the codebase. A critical mindset is what is needed, one that doesn't go down a rabbit hole at 3AM but instead tries different high-level approaches to understand the problem from a few angles before trying to dive a bit deeper.

What happens when shit hits the fan? It is 2AM and you get paged. The initial response is a bit of fear, the alarms are going off, you have to get to the laptop and catch up with the chat messages. A few minutes in you have seen the ticket, caught up with the chat logs, and you are now checking the error tracking issue. Shortly afterwards, you work together with support to reproduce it, and meanwhile you figure out if it was related to the previous deploy. If it was, you start the rollback (after notifying everyone, in case there was something that the rollback would revert to, for example if the last deploy was a hotfix). If it wasn't, you start the investigation, checking if flags changed in the database, checking access/error logs, checking pod restarts, etc. In some cases it will be out of your control and you'll have to ping infra/devops, maybe they have an on-call system of their own, in some cases it won't be backend but frontend and you might have to reach out to the on-callee there, or attempt to revert their own pipeline, but in most cases the issue is at least controllable.

The primary purpose is not fixing the underlying issue, it is getting the system under control so that normal operation can resume, so that users aren't blocked and can use the application. Mitigation as a first line of response, fixing can take place afterwards, as long as the issue will definitely not resurface. It is an exercise of estimating the severity and likelihood of recurrance, and making the best decision with the information available at the moment.

## How often will I be needed?

In practice, I don't think I was paged more than 20 times in the years I've been on call, the majority of them being in the earlier years.

The size of the company and the stage that it is in often inversely correlates with the amount one gets paged. What I mean is, with time and growth, services will become more stable, certain areas of the codebase will change less, and more teams will become owners of their own domains; in some cases each team might have a separate cloud account hosting their own services, thus potentially moving the on-call responsibility away from a central group of people are more towards separate teams having their own schedules.

Depending on the size of the company and when this happens, it could either be a good thing or a bad thing, in some cases one person has been the sole person on call for month after month, due to the specificity of that domain and the lack of more people to share the responsibility with. I'd argue in those cases it might be worth it to bring it up to management, and see how to mitigate it, either by introducing more people to that codebase (people from other teams helping to distribute the responsibility of being on-call), or hiring more people / transferring internally.

When the company grows, you will likely adopt different pillars (either by building products or acquiring other companies to grow your portfolio), this means the knowledge of domains (and even access to accounts and resources) may start to split, only giving access to those who need it. This also means multiple on-call teams may start to spring up. Simultaneously, helpdesk support people must know which team (and in some cases which domain) to assign tickets to, which might trigger a page depending on the severity of the issue.

More importantly, by the time you've reached this size you'll probably have a dedicated cloudops/devops team (or person?), and given the prevalence of "the cloud", likely they will become the first line of defence when issues happen. Since we started containerising everything, multiple failures on a container or pod might trigger it to become unavailable, and new containers might spin up. This has the downside of potentially hiding issues, but the upside of it "fixing itself". Thus, developers are not AS incentivised (as in the 2000s and 2010s) to produce error-proof code. This also means that the infra team might be notified first when a spike in container creation happens due to bad code; ultimately the fix might be to roll-back to a previous image, thus not even needing to wake up the backend engineers.

You might think I'm exaggerating, but eventually you will come across `kubernetes.containers.restarts over environment:production,kube_namespace:project was > 20.0 on average during the last 5m` and it will sink in. These are weird times indeed.

In any case, if you are considering being an on-call engineer and wanted to know more about what it requires, and how it will evolve over time, hopefully this gave you a few insights.
