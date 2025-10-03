# Scrolling two-column timeline

### built with wp-scripts
(use npm run build / npm run start)

### status
Mostly ok. has a bug with page being too jumpy.
The issue is that each content item has min-height: 600px, so when you click a year, the entire viewport shifts dramatically to snap that section to the top.
A few options to make it feel smoother:

Adjust the scroll snap alignment - Instead of start, use center so items scroll to the middle of the viewport
Reduce the min-height or make it more flexible based on content
Add a smoother easing function (though browser support varies)
Change the IntersectionObserver threshold so it triggers earlier/later

Which approach sounds better to you?
Or we could test it with real content first (as you mentioned) - sometimes longer content naturally makes the scrolling feel better because there's more "travel distance."
Want to try a quick CSS tweak first, or wait until you have more content in there?Retry