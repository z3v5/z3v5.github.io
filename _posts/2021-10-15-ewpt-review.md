---
title: "eWPT review"
date: 2021-10-15
---

# eWPT review

![](/assets/images/7aff4fdfda02f21524df8.png)

### > Table of Content

- Introduction
- About the eWPT course
- Expectations
- Before taking the course
- Lab time
- The exam
- Closing thoughts
- Useful resources

### > Introduction

Some time ago I passed the OSCP, and that wasn't a breeze. 

You can reed more on that [here](/OSCP-review-09-27).

I promised myself to take something simpler next time, as recovering from the OSCP both physically and mentally took a lot of time. I also thought that the time limitation is the biggest challenge there, as machines itself wasn't that difficult. If I had three days instead of 24 hours, it would be not that hard at all. Plus, doing a test in 24 hours does not sound realistic to me at all, normally a test in the scale like this is a week or so.

I looked around and discovered that [eLearnSecurity ](https://elearnsecurity.com/)has so many great courses, and they're also kinda trying to fix what is drives me crazy with OffSec. 

### > About the eWPT course

eLearnSecurity's [Web Application Penetration Testing certification (eWPT/WAPT)](https://elearnsecurity.com/product/ewpt-certification/) is around for quite some time. It's not stated on the website, but the first appearance of this cert was made back in 2013. 

The syllabus of the course is:

- Information Gathering
- Cross Site Scripting
- SQL Injections
- Authentication and Authorization
- Session Security
- Flash
- HTML5
- File and Resources Attacks
- Other Attacks
- Web Services
- XPath
- Penetration Testing Content Management Systems
- Penetration Testing NoSQL Databases

Sadly, this is the biggest problem of this course — it's a bit outdated. By a quick glans on the syllabus, you can spot Flash, for example. The Flash as a technology [is dead officially](https://www.adobe.com/products/flashplayer/end-of-life.html), it is very unlikely that you will stumble across it in the wild anymore. So yeah, it's that outdated. But it is fine, really. Web as a whole is changing so rapidly, so you will notice that tools in the course are looks different, but if you think of that, the OWASP TOP 10 2013 is not that different from OWASP TOP 10 2021. Those knowledge and skills are still relevant to this day. 

Remember I said that eLearnSecurity is trying to fix stuff that OffSec won't? I was referring to the timeline on how the exam is going. 

So, on the OSCP you have 24 hours to pwn 5 machines in the network, and 24 more hours to write the report. 

ELS with their eWPT are doing the same, but instead of one day, they give you…seven. Yes, seven. Seven days to pentest A SINGLE WEB APP, and seven more to write your report. 

You might notice that in some sources, they call it eWPT**v1**. I know that there is an eXtreme version of this course which goes with **v2** (eWPTXv2) at the end, so I really hope that they will revamp the whole thing one day. 

In 2019 INE.com bought eLearnSecurity. There are two ways to take this exam: 

1) You paying to INE for the training materials. [Prices](https://ine.com/pages/plans). With that subscription, you will have access not only to the eWPT course, but to everything that ELS has to offer. It might seem expensive, but it is a good way to check different aspects of cybersecurity, as they have both blue and red team trainings.

2) You pay directly to the ELS for the exam voucher and starting your exam whenever you are pleased. The voucher is $400. You will have one free re-take in case you fail, ELS will also SUPPOSE TO provide you with the feedback on what did you miss and how to improve your next try (I will touch that topic a bit later). Remember how OffSec recently increased their re-take price to 66%, up to the $249 for each try with no explanations on why you failed? Yeah... 

### > Expectations

I did not have much, frankly speaking. For sure, I knew it is a web application pentest course, I knew it should be “simple”. 

Let's see what they are [promising ](https://elearnsecurity.com/product/ewpt-certification/)to access in your skill set during the exam: 

- Penetration testing processes and methodologies
- Web application analysis and inspection
- OSINT and information gathering techniques
- Vulnerability assessment of web applications
- OWASP TOP 10 2013 / OWASP Testing guide
- Manual exploitation of XSS, SQLi, web services, HTML5, LFI/RFI
- Exploit development for web environments
- Advanced Reporting skills and remediation

Sounds like a good starting point for someone who want to do the web pentest or do their first steps into bug bounty. Like it or now, web is kinda dominating the market and everything is slowly moving there. Considering that memory corruption is dying as a bug class, it is not a bad idea to pick web as a focus area. But that is the subject for another article, I guess. 

### > Before taking the course

As I said, I already have the OSCP under my belt, so I know **something** about web exploitation, but that wasn't much. I wanted to somehow structure all my knowledge about web app pentesting, and with this exam check - do I have what it takes or now. 

I have read the bible of all web pentesters - [The Web Application Hacker's Handbook](https://www.amazon.com/Web-Application-Hackers-Handbook-Exploiting/dp/1118026470). 

You know what is bad about technical books? They obsolete rapidly. That's why the author of this masterpiece made a decision to move to something more dynamic and founded PortSwigger. You probably know them, because they made Burp Suite. What is more important in that context, they made the [Web Security Academy](https://portswigger.net/web-security). There are ton of materials. For free. They are great. If that was not convincing enough - I think the Web Security Academy is of the best sources today to learn web security. Spend some time there, and you will feel yourself way more confident during the exam. 

### > Lab time

I mentioned already that INE is now holding the lab environment, and I did not like it. I really hope this is a temporary issue, and they will give it some love later, but as for now it is a good labs with confusing interface. Some pieces of practical labs are still referring to old IP's or domains, sometimes a whole chunks of explanations are missed. It was still doable, but I sometimes had that "eeeegh" feelings. Like, you have some guidance and steps to follow, but before that you have to figure out how to use them. 

That was the only downside of the entire thing. Theoretical part is still great, I remember having "Eureka!" moments, as after those slides and videos I finally understood some topics that were problematic for me before. 

INE says that the course will take ~16 hours, I normally double that amount as I am a slow learner, and need a lot of time sometimes to try all possible outcomes.

Some topics have two practical parts: labs and challenges. The difference is only in the way how they are organized. ELS will hold your hand and show exactly how to do what they want you to do, and with the challenges, you will work it through yourself. 

Nice overall experience. I hope it will be even better if eWPT**v2** ever occur. 

### > The exam

The exam itself was surprisingly hard. I knew it will be a beginner-friendly experience, so I expected something super simple and straight forward. Likely, it was not. I love good challenges, and it was one of them. It was difficult, not because vulnerabilities itself were crazy, but because to do everything right you require to chain thing together in a smart way. 

So, ELS gives you a week of access to the lab, and one more week to write the report. It is worth mentioning that I dealt with it way faster, but this amount of time helped me to relax, take it easy and think of every little next step, closer and closer to the admin section. 

Yes, the end goal of the exam is to reach the admin section of the domain. All tools are ok for it, all techniques are allowed. Be creative, do not rush, you will be just fine. 

After submitting the report, ELS will manually evaluate it and provide you with a pass/fail letter. As I mentioned above, if you are failed they PROMISE to guide you to the better next run, and help to fulfill some of the gaps that you had in your previous try. The downside of this approach is the waiting time. According to the policy, ELS has up to **30 working days **to check your report and make a decision. 

### > The reality 

After waiting for two weeks, I received my FAIL email. That was a surprise, as I successfully managed to do the technical part, and wrote a report as I would do it for the real pentest. An obvious boilerplate text was waiting for me instead of detailed comment of what I was missing in my first try. I had to assume what to fix, as it was not clear at all. From some old reviews, it seems they did way better than this in the past. I guess that's a classic situation of reducing costs by INE after acquiring something like ELS.  I asked my folks, and they all got the similar poorly customized template response  on their first attempt. Well, at least the retake is free. My second guess is that they actually using that fact to teach you how to be better on the report writing (you beat all the hands-on technical challenges, you have a free retake, why not to use it to improve your soft skill game a bit?). I used the given 7 days for a retake to rewrite my report, add some more info about each vulnerably, and after one and a half more weeks I received my pass email!

[embed](/embed/twitter?url=https%3A%2F%2Ftwitter.com%2Fcarrotcakesec%2Fstatus%2F1459111754051555329)

### > Closing thoughts

It was a nice ride with its ups and downs, but I probably will still recommend it to anyone who is thinking of starting to do bug bounty or web application penetration test. 

I hope they one day will update the materials, as they are a bit outdated now. 

I also hope they could give a bit more info what you should fix when you failed. From my own experience, they don't provide enough information right now, so you have to guess what exactly is blocking you from getting certified and what you have to fix. 

  


