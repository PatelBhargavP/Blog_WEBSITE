#Prerequisits

-You will need node version 8 or heigher installed and mongoDB version 3 or heigher and mongo server running at default config.
-You will also need to run `npm install` before running this at dev server using `ng serve`

# Blog_WEBSITE

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.7.
Node: 8.9.4
Angular: 5.2.5
typescript: 2.5.3
webpack: 3.10.0

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

Blog_website 
    MEAN Stack application using Angular 2.0

    ●	Created the components below.

        ○	Login : displays login form

        ○	Registration : displays registration form

        ○	Home : After login page

        ○	Create Post : Display create form, with the following fields

            ■	Post title

            ■	Post description

        ○	List Posts : Display all the Posts created using create component and each block needs to have the following options

            ■	Comment

                 ●	Once the comment button is clicked, it shows all the comments right below the container for the current post.

            ■	Like

                ●	Once the like button is clicked, it increments the comment count.

                ●	Once the user hovers over the count, it shows the list of users who liked the posts.

        ○	View Post : Displays details of a Post with option to view / create comments and like

        ○	Navigation : Displays navbar with dynamic links

    ●	For login / registration page, the navbar will have the following links

        ○	Login

        ○	Registration

    ●	Upon login the user lands on home page

        ○	Navigation component is updated to display the links shown below.

            ■	Home

            ■	Create Post

            ■	List Posts

            ■	Logout

    ●	separate services for auth and posts to create rest api

    ●	Route guard and JWT tokens to make sure the user has logged in.

    ●	Route guards are for protecting Create user, List user and View user routes.

    ●	Http interceptor is used to pass token value in the request headers.

