import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Edit() {
    const blockProps = useBlockProps();

    const innerBlocksProps = useInnerBlocksProps(
        { className: 'wp-timeline-editor' },
        {
            allowedBlocks: ['wp-timeline/timeline-item'],
            template: [
                ['wp-timeline/timeline-item', { year: '2015' }],
            ],
            orientation: 'vertical',
            renderAppender: false
        }
    );

    return (
        <div {...blockProps}>
            <div {...innerBlocksProps} />
        </div>
    );
}