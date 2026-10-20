---
title: "Remote code execution via web shell upload"
date: 2021-12-08
---

# Remote code execution via web shell upload

![](/assets/images/ae58facf35750c7c9db05.png)

### > Objective

> This lab contains a vulnerable image upload function. It doesn't perform any validation on the files users upload before storing them on the server's filesystem.

> To solve the lab, upload a basic PHP web shell and use it to exfiltrate the contents of the file `/home/carlos/secret`. Submit this secret using the button provided in the lab banner.

> You can log in to your own account using the following credentials: `wiener:peter`

### > Solving the challenge

We got the website, let's log in with `wiener:peter` as credentials:

![](/assets/images/69334c870a9cfb5945b9b.png)

  


Here we can find a file upload feature:

![](/assets/images/c17574580aae305f54bdf.png)

The server seems to expect any type of the file, and not just images. As the objective says, let's try to upload some PHP code. II would like to spawn a web shell there, and my PHP web shell of choice is [p0wny](https://github.com/flozz/p0wny-shell/blob/master/shell.php).

We can upload it via avatar upload form:

![](/assets/images/8cc77f36b0342a46d4adb.png)

Now we can navigate to the `/files/avatars/p0wny.php` to spawn a shell:

![](/assets/images/00a7be36bbfde492f8862.png)

Apparently, they don't want you to run any types of shells, so I could'n make it work properly (which is weird, as the title clearly says "Remote code execution via web shell upload"). Same with a more classic reverse shells. 

What a shame. Anyway, our goal is to read the flag. 

We can create a lame PHP document with something like, as we know what exactly we should read:

`<?php echo file_get_contents('/home/carlos/secret'); ?>`

Upload your `lame.php`, and call it as we did with a shell. 

Submit the secret to solve the lab:

![](/assets/images/08e37423ba3fadec90cff.png)

  


