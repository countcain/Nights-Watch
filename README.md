Nights-Watch
============

Watch the user's behavior when they visit a website page.

For simple use, just:

    npm install nights-watch

Script in
    
    build/nights-watch.js
    build/nights-watch.min.js

is the core function

You can refer
    
    build/runner.js
    
to learn how to use this script.



#Development

clone this rep.

##Installation & Run

    npm install & bower install
    npm start

##build

    npm build

Open the browser and navigate to localhost:9001 to see the demo.

##Usage

Currently, we have following methods for detecting and tracking users behaviors which return the data as data format shows.

...

##Data Format
> This tool's power comes from automatically capturing all the user interactions that happen in visitors' browser.This data is sanitized and organized into the following hierarchy for you, where users have many visits and visits have many events.

![Imgur](http://i.imgur.com/puakWWX.png?1)

Properties of each object are as follows.

###Events

All the raw client-side actions users performed in target website. It contains the following properties:

* **`Type`**: any of **view page**, **click**.
* **`Time`**: when the event happened.
* **`UserId`**: ID of associated user.
* **`VisitId`**: ID of associated visit/session.
* **`TargetTag`**: tagname of the event target's DOM element, e.g. **INPUT**, **BUTTON**, or **A**.
* **`TargetId`**: id of the event target's DOM element, e.g. **#login**.
* **`TargetClass`**: classname of the event target's DOM element, e.g. **.primary-btn**.
* **`InnerContent`**: **href** property of link. (for **click** on anchor tags)
* **`Domain`**: the current domain including subdomain, e.g. **blog.mrpeach.com**.
* **`Path`**: the part of the current URL following your domain, e.g. **archives/** for **blog.mrpeach.me/archives/**.
* **`Hash`**: the part of the current URL following the hash sign, e.g. **#header** for **blog.mrpeach.me/analytics/dataformat#header**.
* **`Query`**: the query params of the page's current URL, e.g. **utm_id=1234** for **blog.mrpeach.me?utm_id=1234**.

###Visits

A visit, also called a session, is a set of events no more than 30 minutes apart from each other. It contains the following properties:

* **`VisitId`**: auto-incrementing ID, starts at 0 for each individual user.
* **`UserId`**: ID of associated user.
* **`Time`**: timestamp when visit began.
* **`Site`**: the domain to which this visit belongs.
###Users

A user maps directly to a unique client-side cookie. It contains the following properties:

* **`UserId`**: randomly generated user ID.
* **`JoinDate`**: timestamp when the user joined.
* **`Platform`**: user's operating system.
* **`Browser`**: user's browser.
* **`Language`**: user's agent language.
* **`Country`**: geolocation data.
* **`Region`**: geolocation data.
* **`City`**: geolocation data.
