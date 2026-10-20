---
title: "Stored XSS into HTML context with nothing encoded"
date: 2021-12-02
---

# Stored XSS into HTML context with nothing encoded

![](/assets/images/70f7fa2433134fa35a8c1.png)

### > Objective

This lab contains a [stored cross-site scripting](https://portswigger.net/web-security/cross-site-scripting/stored) vulnerability in the comment functionality.

To solve this lab, submit a comment that calls the `alert` function when the blog post is viewed.

### > Solving the challenge 

For this challenge, we will work with the following page:

![](/assets/images/e1b3b7b6943eb48cb8f2b.png)

Under each post, there seems to be a comment section. We already have a nice payload from a previous challenge, why not try to apply it here? 

Let's fulfill those fields in the comment section:

![](/assets/images/2eed2112ffc8d9605eba2.png)

Whenever the user will navigate to the following page now, they will have their cookies displayed like that:

![](/assets/images/50450c02c34e9bcd7a747.png)

  


To make it clear, that is the main difference between **Reflected **XSS and **Stored **XSS. Reflected XSS, well, reflecting the payload in the URL of the page. Stored XSS, on the other hand, storing your payload somewhere in the content of the page itself. 

There is also a **DOM-based XSS**, but we will talk about it tomorrow.

