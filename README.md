Nights-Watch
============

Watch the user's behavior when they visit a website page.

    npm install nights-watch

#Installation

1. npm install & bower install
2. npm start

Open the browser and navigate to localhost:9001 to see the demo.

#Usage

Currently, we have following methods for detecting and tracking users behaviors which returns the data as data format shows.

#Data Format
> This tool's power comes from automatically capturing all the user interactions that happen in visitors' browser.This data is sanitized and organized into the following hierarchy for you, where users have many visits and visits have many events.

![Imgur](http://i.imgur.com/puakWWX.png?1)

Properties of each object are as follows.

##Events

All the raw client-side actions users performed in target website. It contains the following properties:

* **`Type`**: any of **view page**, **click**.
* **`Time`**: when the event happened.
* **`User Id`**: ID of associated user.
* **`Visit Id`**: ID of associated visit/session.
* **`Target Tag`**: tagname of the event target's DOM element, e.g. **INPUT**, **BUTTON**, or **A**.
* **`Target Id`**: id of the event target's DOM element, e.g. **#login**.
* **`Target Class`**: classname of the event target's DOM element, e.g. **.primary-btn**.
* **`Href`**: **href** property of link. (for **click** on anchor tags)
* **`Domain`**: the current domain including subdomain, e.g. **blog.mrpeach.com**.
* **`Path`**: the part of the current URL following your domain, e.g. **archives/** for **blog.mrpeach.me/archives/**.
* **`Hash`**: the part of the current URL following the hash sign, e.g. **#header** for **blog.mrpeach.me/analytics/dataformat#header**.
* **`Query`**: the query params of the page's current URL, e.g. **utm_id=1234** for **blog.mrpeach.me?utm_id=1234**.

##Visits

A visit, also called a session, is a set of events no more than 30 minutes apart from each other. It contains the following properties:

* **`Visit Id`**: auto-incrementing ID, starts at 0 for each individual user.
* **`User Id`**: ID of associated user.
* **`Time`**: timestamp when visit began.

##Users

A user maps directly to a unique client-side cookie. It contains the following properties:

* **`User Id`**: randomly generated user ID.
* **`Joindate`**: timestamp when the user joined.
* **`Platform`**: user's operating system.
* **`Browser`**: user's browser.
* **`Language`**: user's agent language.
* **`Country`**: geolocation data.
* **`Region`**: geolocation data.
* **`City`**: geolocation data.





