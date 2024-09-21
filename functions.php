<?php
/**
 * This file adds functions to the Henry WordPress theme.
 *
 * @package simplenet
 * @author  Andrei Chira
 * @license GNU General Public License v2 or later
 * @link    https://github.com/fasterwp/simplenet
 */

/**
 * Set up theme defaults and register various WordPress features.
 */
function simplenet_setup()
{
    // Enqueue editor styles and fonts.
    add_editor_style('style.css');

    // Remove core block patterns.
    remove_theme_support('core-block-patterns');
}
add_action('after_setup_theme', 'simplenet_setup');

/**
 * Enqueue styles.
 */
function simplenet_enqueue_style_sheet()
{
	wp_enqueue_style( 'simplenet', get_template_directory_uri() . '/style.css', array(), wp_get_theme( 'simplenet' )->get( 'Version' ) );
}
add_action('wp_enqueue_scripts', 'simplenet_enqueue_style_sheet');

/**
 * Add block style variations.
 */
function simplenet_register_block_styles()
{
    $block_styles = [
        'core/button' => [
            'secondary-button' => __('Secondary', 'simplenet'),
        ],
        'core/list' => [
            'list-check' => __('Check', 'simplenet'),
            'list-check-circle' => __('Check Circle', 'simplenet'),
        ],
        'core/query-pagination-next' => [
            'wp-block-button__link' => __('Button', 'simplenet'),
        ],
        'core/query-pagination-previous' => [
            'wp-block-button__link' => __('Button', 'simplenet'),
        ],
        'core/code' => [
            'dark-code' => __('Dark', 'simplenet'),
        ],
        'core/cover' => [
            'blur-image-less' => __('Blur Image Less', 'simplenet'),
            'blur-image-more' => __('Blur Image More', 'simplenet')
        ],
        'core/column' => [
            'column-box-shadow' => __('Box Shadow', 'simplenet'),
        ],
        'core/columns' => [
            'column-reverse' => __('Reverse', 'simplenet'),
        ],
        'core/group' => [
            'column-box-shadow' => __('Box Shadow', 'simplenet'),
        ],
        'core/separator' => [
            'separator-dotted' => __('Dotted', 'simplenet'),
        ],
        'core/image' => [
            'rounded-full' => __('Rounded Full', 'simplenet'),
            'media-boxed' => __('Boxed', 'simplenet'),
        ],
        'core/preformatted' => [
            'preformatted-dark' => __('Dark Style', 'simplenet'),
        ],
        'core/post-terms' => [
            'term-button' => __('Button Style', 'simplenet'),
        ],
        'core/video' => [
            'media-boxed' => __('Boxed', 'simplenet'),
        ],
    ];

    foreach ($block_styles as $block => $styles) {
        foreach ($styles as $style_name => $style_label) {
            register_block_style($block, [
                'name' => $style_name,
                'label' => $style_label,
            ]);
        }
    }
}
add_action('init', 'simplenet_register_block_styles');

/**
 * Load custom block styles only when the block is used.
 */
function simplenet_enqueue_custom_block_styles()
{
    // Scan our styles folder to locate block styles.
    $files = glob(get_template_directory() . '/assets/styles/*.css');

    foreach ($files as $file) {
        // Get the filename and core block name.
        $filename = basename($file, '.css');
        $block_name = str_replace('core-', 'core/', $filename);

        wp_enqueue_block_style($block_name, [
            'handle' => "simplenet-{$filename}",
            'src' => get_theme_file_uri("assets/styles/{$filename}.css"),
            'path' => get_theme_file_path("assets/styles/{$filename}.css"),
        ]);
    }
}
add_action('init', 'simplenet_enqueue_custom_block_styles');

/**
 * Register pattern categories.
 */
function simplenet_pattern_categories()
{
    $block_pattern_categories = [
        'simplenet/features' => [
            'label' => __('Features', 'simplenet'),
        ],
        'simplenet/hero' => [
            'label' => __('Hero', 'simplenet'),
        ],
        'simplenet/pages' => [
            'label' => __('Pages', 'simplenet'),
        ],
        'simplenet/pricing' => [
            'label' => __('Pricing', 'simplenet'),
        ],
        'simplenet/testimonial' => [
            'label' => __('Testimonials', 'simplenet'),
        ],
    ];

    foreach ($block_pattern_categories as $name => $properties) {
        register_block_pattern_category($name, $properties);
    }
}
add_action('init', 'simplenet_pattern_categories', 9);
