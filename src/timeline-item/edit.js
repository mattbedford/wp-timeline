import { useBlockProps, InspectorControls, useInnerBlocksProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
    const { year } = attributes;

    const blockProps = useBlockProps({
        className: 'timeline-item-editor'
    });

    const innerBlocksProps = useInnerBlocksProps(
        { className: 'timeline-item-content' },
        {
            allowedBlocks: true,
            template: [
                ['core/paragraph', { placeholder: 'Add content for this year...' }]
            ],
            templateLock: false
        }
    );

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Timeline Item Settings', 'wp-timeline')}>
                    <TextControl
                        label={__('Year', 'wp-timeline')}
                        value={year}
                        onChange={(value) => setAttributes({ year: value })}
                        placeholder="e.g., 2015"
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="timeline-item-year-display">
                    <strong>{year || __('(Set year in sidebar →)', 'wp-timeline')}</strong>
                </div>
                <div {...innerBlocksProps} />
            </div>
        </>
    );
}