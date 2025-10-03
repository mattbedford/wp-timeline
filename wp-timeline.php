<?php

/*
Plugin Name: Wp Timeline
Plugin URI: http://URI_Of_Page_Describing_Plugin_and_Updates
Description: A brief description of the Plugin.
Version: 1.0
Author: Matt Bedford
Author URI: https://mattbedford.com
Text Domain: wp-timeline
License: A "Slug" license name e.g. GPL2
*/


if (!defined('ABSPATH')) {
    exit;
}


/**
 * Register the timeline blocks
 */
function wp_timeline_register_blocks() {
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'wp_timeline_register_blocks');