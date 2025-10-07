document.addEventListener('DOMContentLoaded', function() {
    const timelines = document.querySelectorAll('.wp-timeline-container');

    timelines.forEach(timeline => {
        const yearsColumn = timeline.querySelector('.wp-timeline-years');
        const contentColumn = timeline.querySelector('.wp-timeline-content');
        const timelineItems = contentColumn.querySelectorAll('.timeline-item');

        if (!yearsColumn || !contentColumn || timelineItems.length === 0) return;

        // Build years navigation from timeline items
        timelineItems.forEach((item, index) => {
            const year = item.dataset.year || 'Unknown';

            const yearElement = document.createElement('div');
            yearElement.className = 'timeline-year-item';
            yearElement.dataset.index = index;
            yearElement.textContent = year;

            yearsColumn.appendChild(yearElement);
        });

        const yearItems = yearsColumn.querySelectorAll('.timeline-year-item');

        let isScrollingYears = false;
        let isScrollingContent = false;
        let scrollTimeout;
        let checkScrollTimeout;

        // Smooth scroll function with easing
        function smoothScrollTo(element, target, duration = 800) {
            const start = element.scrollTop;
            const change = target - start;
            const startTime = performance.now();

            function easeInOutCubic(t) {
                return t < 0.5
                    ? 4 * t * t * t
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }

            function animateScroll(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeInOutCubic(progress);

                element.scrollTop = start + (change * eased);

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                }
            }

            requestAnimationFrame(animateScroll);
        }

        // Find which item is closest to center of viewport
        function findClosestItem() {
            const containerRect = contentColumn.getBoundingClientRect();
            const containerCenter = containerRect.top + (containerRect.height / 2);

            let closestIndex = 0;
            let closestDistance = Infinity;

            timelineItems.forEach((item, index) => {
                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.top + (itemRect.height / 2);
                const distance = Math.abs(itemCenter - containerCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            return closestIndex;
        }

        // Handle scroll end - check which item is actually visible
        function handleScrollEnd() {
            if (!isScrollingContent) {
                const closestIndex = findClosestItem();
                updateActiveYear(closestIndex);

                if (!isScrollingYears) {
                    isScrollingYears = true;

                    const targetYear = yearItems[closestIndex];
                    const targetPosition = targetYear.offsetTop - yearsColumn.offsetTop - (yearsColumn.offsetHeight / 2) + (targetYear.offsetHeight / 2);

                    smoothScrollTo(yearsColumn, targetPosition, 600);

                    setTimeout(() => { isScrollingYears = false; }, 800);
                }
            }
        }

        // Listen for scroll events and debounce
        contentColumn.addEventListener('scroll', () => {
            clearTimeout(checkScrollTimeout);
            checkScrollTimeout = setTimeout(handleScrollEnd, 150);
        });

        // Click on year to scroll to content
        yearItems.forEach((yearItem, index) => {
            yearItem.addEventListener('click', () => {
                isScrollingContent = true;

                const targetItem = timelineItems[index];
                const targetPosition = targetItem.offsetTop - contentColumn.offsetTop;

                smoothScrollTo(contentColumn, targetPosition, 1000);
                updateActiveYear(index);

                setTimeout(() => { isScrollingContent = false; }, 1200);
            });
        });

        // Observe which content item is in view
        const observer = new IntersectionObserver((entries) => {
            let mostVisible = null;
            let highestRatio = 0;

            entries.forEach(entry => {
                if (entry.intersectionRatio > highestRatio) {
                    highestRatio = entry.intersectionRatio;
                    mostVisible = entry;
                }
            });

            if (mostVisible && mostVisible.intersectionRatio > 0.15 && !isScrollingYears) {
                const index = Array.from(timelineItems).indexOf(mostVisible.target);
                updateActiveYear(index);

                if (!isScrollingContent) {
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        isScrollingYears = true;

                        const targetYear = yearItems[index];
                        const targetPosition = targetYear.offsetTop - yearsColumn.offsetTop - (yearsColumn.offsetHeight / 2) + (targetYear.offsetHeight / 2);

                        smoothScrollTo(yearsColumn, targetPosition, 600);

                        setTimeout(() => { isScrollingYears = false; }, 800);
                    }, 100);
                }
            }
        }, {
            root: contentColumn,
            threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1.0],
            rootMargin: '-10% 0px -10% 0px'
        });

        timelineItems.forEach(item => observer.observe(item));

        // Update active year styling
        function updateActiveYear(index) {
            yearItems.forEach(item => item.classList.remove('active'));
            if (yearItems[index]) {
                yearItems[index].classList.add('active');
            }
        }

        // Set first year as active on load
        updateActiveYear(0);
    });
});