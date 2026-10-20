---
title: "Authentication bypass via OAuth implicit flow"
date: 2021-11-17
---

# Authentication bypass via OAuth implicit flow

![](/assets/images/35b3f5dbec4ede91bd57b.png)

### > Objective

> This lab uses an OAuth service to allow users to log in with their social media account. Flawed validation by the client application makes it possible for an attacker to log in to other users' accounts without knowing their password.

> To solve the lab, log in to Carlos's account. His email address is `carlos@carlos-montoya.net`.

> You can log in with your own social media account using the following credentials: `wiener:peter`.

### > Solving the challenge

We will start with launching our challenge [here](https://portswigger.net/web-security/all-labs#oauth-authentication). 

Give it a few seconds, your browser will generate something like that: 

![](/assets/images/9cc3acb3801a1475b8ad1.png)

Make sure that you are capturing your traffic with Burp.

We will navigate to the `My account` section and login with `wiener:peter `credentials

Let's authorize this request and see how it looks in Burp:

![](/assets/images/0ba51d1a14ace0e7215ad.png)

It starts with a `GET` request for `/auth/<client-id>`

![](/assets/images/f7373b12a53a8e2f22a03.png)

And ended up with `POST` request with some input date in the body:

![](/assets/images/a7050f15311c155d4c68c.png)

Interesting. We can replace the email address to the target one, and this `POST` request will not cause the error message:

![](/assets/images/bc67354829b73187e53fe.png)

To solve the lab, we can right-click on a request and select `Request in browser` - `In original session`:

![](/assets/images/88cabec5c79d096b146d3.png)

Copy the URL that Burp will generate for you and paste it to the browser:

![](/assets/images/1a1c0b579e5d649db14d2.png)

Congrats! You successfully bypassed OAuth authentication! 

  


  


  


