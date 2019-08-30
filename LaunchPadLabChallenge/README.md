# LaunchPadLab Challenge

A dashboard for comparing client-side Javascript frameworks by their GitHub activities.

https://launchpad-lab-challenge.herokuapp.com/

In my opinion, when comparing which framework to use, one needs to see how many people are actually using it, how often the commits are being submmited and how active the community is.

My first approach to let the page update by itself was to utilize the socket and connect to get the real time update, but I decided to go with the setInterval function because I thought the dynamic data being updated every second was not necessary for this case.

One challenge I had from utilizing setInterval from componentDidMount was to prevent the memory leak. The setInterval function kept being called even when the component was not rendered and I solved the problem by calling the clearInterval function from componentWillUnmount.

Overall, it was a very fun and exciting project that I had a chance to learn and sharpen my skills. It was my first time playing with the GitHub API, and it was a very cool experience to get to know about it.

## Features to be added if given more time

- Email authentication for voting
- Unit tests for rendering components, redux store, API routes, etc.
- More styling for better UI/UX
