# Homework 3: Playing with Koa and React

## Introduction

This week, your goal is to create a React application that allows a user to log in via Google SSO [(learn more about SSO, or _single sign-on_)](https://blog.capterra.com/single-sign-on/) and then displays all of the user's Google Drive files.

Many of the concepts here are _very_ similar to what Vaken does, especially with regards to handling users on the server, authenticating users via SSO, and rendering user data on the frontend. As such, this assignment is a great way for us to begin introducing you to what Vaken is and does.

To accomplish this, it helps to consider the different parts of what your code needs to look like. You need a React component to display some sort of login button to the user, Koa functionality to log a user in via Google SSO once that button is clicked, some more Koa functionality to retrieve the user's Google Drive files, and another React component to display those files in a nice format.

## Helpful Tools

Here are the tools we'll be using to complete this assignment:

- [Koa](https://koajs.com) to handle server-side functionality
- [React](https://reactjs.org) to handle building your frontend, along with HTML and CSS
  - [MDN's guide to HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML)
  - [MDN's guide to CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS)
- [Passport.js](http://www.passportjs.org) to make user SSO really simple
- [Google Drive REST API](https://developers.google.com/drive/api/v3/about-sdk) to interact with Google Drive

## Task 1: Launching a Server
This first task only requires writing a few lines of code; its goal is to get you familiar with our `index.ts` file.

`index.ts` is like the `main()` method in Java or C++; it's the central command hub for our application. Take some time to read through the provided code and comments to understand what it's doing. Then, complete the task given by the line with a `TODO` comment above it. 

## Task 2: Build Your Routes

`UserRouter.ts`

## Task 3: Building a Frontend

`react shit`
