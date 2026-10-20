---
title: "Reflected XSS into HTML context with nothing encoded"
date: 2021-12-02
---

# Reflected XSS into HTML context with nothing encoded

![](/assets/images/1fbd2e76c7b8fa9534217.png)

### > Objective 

This lab contains a simple [reflected cross-site scripting](https://portswigger.net/web-security/cross-site-scripting/reflected) vulnerability in the search functionality.

To solve the lab, perform a cross-site scripting attack that calls the `alert` function.

### > Solving the challenge

We've got a web page with the search bar:

![](/assets/images/55be14a1039a79efcb907.png)

We can try to submit our XSS payload to the search field to test it:

![](/assets/images/d26567d77c5ba5b350e27.png)

The payload is simple:

```
<script>alert(document.cookie)</script>

```

We are basically creation another `<script>` HTML tag inside the document, and executing arbitrary JavaScript code. 

In most examples of the basic XSS, you will see the payload `alert(1)`, but hear me out - it is bad advice. A classic #bugbountytip moment - by using anything aside from `alert(1)`, you're automatically increasing the level of understanding from the recipient side. It's not that easy to actually understand what is your popped `1` on the screen mean, and what are the security implications of it. 

Long story short, use the `alert(document.cookie`, or `alert(document.domain)` instead, and you will be fine! 

The basic concept of testing for the XSS will remain the same - we will find the input field to provide the payload. It is a well-known vulnerability, and it's taking its place in OWASP top-10 for eternity, so there are mitigations that should be applied. They aren't always there, but in more difficult challenges we will have a look how to bypass the most common ones. 

With our payload, we got the current session cookie displayed on the screen. 

To replicate this attack, we can use the URL:

[https://acbc1f691e2e5f47c0fc18df0067002d.web-security-academy.net/?search=%3Cscript%3Ealert%28document.cookie%29%3C%2Fscript%3E](https://acbc1f691e2e5f47c0fc18df0067002d.web-security-academy.net/?search=%3Cscript%3Ealert%28document.cookie%29%3C%2Fscript%3E)

![](/assets/images/e9ee6125b6ace9a5305a4.png)

  





