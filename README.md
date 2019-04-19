# About
This project was created as a solution for the assignment described below.

Note: There is definitely a room for improvements, that were not included in the assignment and were not introduced due to time limitation. Such as:
* installation steps;
* build flow;
* features;
* etc.

# Getting Started
Built version (`build` directory) is included due to requirements that the written code should run out of the box when tested. So, just clone the project and open `index.html` file.

# Assignment
The end goal of this assignment is to be able to search for a movie title using the Open Movie Database. The website should be created in HTML5, with the use of CSS3 and JavaScript. It should adhere to the following specification: 
* You must vanilla JavaScript in your application, and you are not allowed to use any framework or library. You are also not allowed to use any back-end technology (PHP, Node, etc). 
* To retrieve the data, you have to use the Open Movie Database API. Instructions on how to use it can be found here: ​http://www.omdbapi.com/. You can use the following API key: ​338f9a63. Note that it is limited to 1000 searches per day. If the limit is reached, please register (free) for an API key yourself.  
* The application should follow the design as displayed on the bottom of this page. There should be a search field and a button to execute the search. Below the search entry field the results should be displayed, where the title and the image of the movies are displayed in a list. 
* The code you write should run out of the box when tested. Any modifications to browser or server settings should not be required. 
* We will test your page on the latest version of Google Chrome. Support for other browsers is a plus, but not required. 
* We will check your solution on the following criteria: 
  * HTML5 and CSS3 usage. 
  * Code separation, readability and maintainability
  * Error handling 

## Design 
![Requested design](https://github.com/pavlova-iryna-s/omdapi-test/blob/master/images/design.png)

## Additional time?

Do you have additional time left? If you’re interested, you can implement one or more of the following optional tasks to demonstrate your knowledge: 
* Partial loading when the user scrolls down (loading more items dynamically).
* Manual pagination to allow users to browse through more movies (select page 2, page 3, etc).
* Clicking on a movie displays additional information of the movie.
* Play a sample movie when clicking on an item in the list. You can use the following sample movie: http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
