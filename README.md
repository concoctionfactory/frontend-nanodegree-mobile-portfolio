# Website Performance Optimization

This is a online portofolio that has had it critical rendering path optimized for better performance


## Install

`$https://github.com/concoctionfactory/udacity_FEND_P5_mobile-portfolio.git`


## Run
run dist/index.html in web browser

By clicking on Cam's Pizzera, the site brings you to new page where the pizzas move when you scroll
and by dragging the slider the pizzas become bigger or smaller


## Optimizations

in views/js/main

for pizza scrolling
- document.body.scrollTop was moved out of the for loop since it did not change
- document.querySelectorAll was changed to document.getElementsByClassName and moved out of the function
- % 5 calculation was replaced by count
- the amount of pizza was decreased from 200 to 64

for pizza resize
- function changePizzaSizes
- changed querySelectorAll to get getElementsByClassName and stored in variable
- moved dx and newwidtht oustside of the for loop


## Notes
- run npm install to install dependencies
- project uses grunt, ngrok and PageSpeed
- run grunt to rebuild dist folder