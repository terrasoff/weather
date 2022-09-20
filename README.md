# Quick start

* Run `make up` to launch docker environment locally.
* The application will be available on http://localhost:9000/weather.

# Implementation

Project build with:

* ReactJS 17.
* Typescript 4.
* MobX 6.
* Material UI 5.
* InversifyJS 5 (dependency injection).
* And custom form components on top of mobx stores.

The app is build on top of my own scaffold from previous project.

Using Material UI, I've shown styled components technique. 

The Login page is marked up with flexbox responsively.

The Weather page has primitive mark up just to demonstrate data flow.

# Testing

* Run `make test` to run tests written with jest.
* I've added just one test as an example.

# Check code styles.

* Run `make lint` to check code styles.