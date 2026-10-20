---
title: "DOM XSS in document.write sink using source location.search"
date: 2021-12-02
---

# DOM XSS in document.write sink using source location.search

![](/assets/images/82ef696c6242703c71e50.png)

### > Objective

This lab contains a [DOM-based cross-site scripting](https://portswigger.net/web-security/cross-site-scripting/dom-based) vulnerability in the search query tracking functionality. It uses the JavaScript document.write function, which writes data out to the page. The document.write function is called with data from location.search, which you can control using the website URL.

To solve this lab, perform a [cross-site scripting](https://portswigger.net/web-security/cross-site-scripting) attack that calls the `alert` function.

### > Solving the challange 

Starting up the box:

![](/assets/images/41fa980da089e4f528e77.png)

Let's try to search for something

![](/assets/images/26a1f8db45d342e257d4d.png)

If we inspect the source code of the page, we will learn that our search query ended up in the `img `tag inside `<script>` section

![](/assets/images/74f2a327fc711ce563efe.png)

  


We can break that `img` tag with the `"` symbol, and put our arbitrary code there:

![](/assets/images/0cf7ec5bd3e451a0c1985.png)

And we got our session cookie alerted to the screen.

If we explore the code one more time, we can see that our search populated and executed one more code section, that executed an alert when the browser rendered this element: 

![](/assets/images/0534200183acd5b2675f7.png)

 

  


