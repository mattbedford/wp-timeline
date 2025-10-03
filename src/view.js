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

        // Click on year to scroll to content
        yearItems.forEach((yearItem, index) => {
            yearItem.addEventListener('click', () => {
                isScrollingContent = true;
                timelineItems[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
                updateActiveYear(index);
                setTimeout(() => { isScrollingContent = false; }, 1000);
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
                        yearItems[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
                        setTimeout(() => { isScrollingYears = false; }, 1000);
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