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

        // Smooth scroll function with easing
        function smoothScrollTo(element, target, duration = 800) {
            const start = element.scrollTop;
            const change = target - start;
            const startTime = performance.now();

            // Easing function (ease-in-out cubic)
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
            entries.forEach(entry => {
                if (entry.isIntersecting && !isScrollingYears) {
                    const index = Array.from(timelineItems).indexOf(entry.target);
                    updateActiveYear(index);

                    if (!isScrollingContent) {
                        isScrollingYears = true;

                        const targetYear = yearItems[index];
                        const targetPosition = targetYear.offsetTop - yearsColumn.offsetTop - (yearsColumn.offsetHeight / 2) + (targetYear.offsetHeight / 2);

                        smoothScrollTo(yearsColumn, targetPosition, 1000);

                        setTimeout(() => { isScrollingYears = false; }, 1200);
                    }
                }
            });
        }, {
            root: contentColumn,
            threshold: 0.5
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