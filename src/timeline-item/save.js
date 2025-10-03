import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const { year } = attributes;

    const blockProps = useBlockProps.save({
        className: 'timeline-item'
    });

    return (
        <div {...blockProps} data-year={year}>
            <div className="timeline-item-inner">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}