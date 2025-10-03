import { registerBlockType } from '@wordpress/blocks';
import timelineEdit from './edit';
import timelineSave from './save';
import timelineItemEdit from './timeline-item/edit';
import timelineItemSave from './timeline-item/save';
import './style.css';
import './view.js';

// Register main Timeline block
registerBlockType('wp-timeline/timeline', {
    title: 'Timeline',
    description: 'A synchronized timeline with years and content',
    category: 'design',
    icon: 'clock',
    supports: {
        align: ['wide', 'full'],
    },
    edit: timelineEdit,
    save: timelineSave,
});

// Register Timeline Item block
registerBlockType('wp-timeline/timeline-item', {
    title: 'Timeline Item',
    description: 'A single timeline item with year and content',
    category: 'design',
    icon: 'calendar-alt',
    parent: ['wp-timeline/timeline'],
    supports: {
        reusable: false,
    },
    attributes: {
        year: {
            type: 'string',
            default: '',
        },
    },
    edit: timelineItemEdit,
    save: timelineItemSave,
});