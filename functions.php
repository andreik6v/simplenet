<?php
/**
 * This file adds functions to the Henry WordPress theme.
 *
 * @package henryblock
 * @author  Andrei Chira
 * @license GNU General Public License v2 or later
 * @link    https://henrywp.com
 */

/**
 * Set up theme defaults and register various WordPress features.
 */
function henryblock_setup()
{
    // Enqueue editor styles and fonts.
    add_editor_style('style.css');

    // Remove core block patterns.
    remove_theme_support('core-block-patterns');
}
add_action('after_setup_theme', 'henryblock_setup');

/**
 * Enqueue styles.
 */
function henryblock_enqueue_style_sheet()
{
	wp_enqueue_style( 'henryblock', get_template_directory_uri() . '/style.css', array(), wp_get_theme( 'henryblock' )->get( 'Version' ) );
}
add_action('wp_enqueue_scripts', 'henryblock_enqueue_style_sheet');

/**
 * Add block style variations.
 */
function henryblock_register_block_styles()
{
    $block_styles = [
        'core/button' => [
            'secondary-button' => __('Secondary', 'henryblock'),
        ],
        'core/list' => [
            'list-check' => __('Check Yes', 'henryblock'),
            'list-check-no' => __('Check No', 'henryblock'),
        ],
        'core/query-pagination-next' => [
            'wp-block-button__link' => __('Button', 'henryblock'),
        ],
        'core/query-pagination-previous' => [
            'wp-block-button__link' => __('Button', 'henryblock'),
        ],
        'core/code' => [
            'dark-code' => __('Dark', 'henry-block'),
        ],
        'core/cover' => [
            'blur-image-less' => __('Blur Image Less', 'henryblock'),
            'blur-image-more' => __('Blur Image More', 'henryblock'),
            'gradient' => __('Gradient', 'henryblock'),
            'rounded-cover' => __('Rounded', 'henryblock'),
        ],
        'core/column' => [
            'column-box-shadow' => __('Box Shadow', 'henryblock'),
        ],
        'core/columns' => [
            'column-reverse' => __('Reverse', 'henryblock'),
        ],
        'core/group' => [
            'column-box-shadow' => __('Box Shadow', 'henryblock'),
        ],
        'core/separator' => [
            'separator-dotted' => __('Dotted', 'henryblock'),
        ],
        'core/image' => [
            'rounded-full' => __('Rounded Full', 'henryblock'),
            'media-boxed' => __('Boxed', 'henryblock'),
        ],
        'core/preformatted' => [
            'preformatted-dark' => __('Dark Style', 'henryblock'),
        ],
        'core/post-terms' => [
            'term-button' => __('Button Style', 'henryblock'),
        ],
        'core/video' => [
            'media-boxed' => __('Boxed', 'henryblock'),
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
add_action('init', 'henryblock_register_block_styles');

/**
 * Load custom block styles only when the block is used.
 */
function henryblock_enqueue_custom_block_styles()
{
    // Scan our styles folder to locate block styles.
    $files = glob(get_template_directory() . '/assets/styles/*.css');

    foreach ($files as $file) {
        // Get the filename and core block name.
        $filename = basename($file, '.css');
        $block_name = str_replace('core-', 'core/', $filename);

        wp_enqueue_block_style($block_name, [
            'handle' => "henry-block-{$filename}",
            'src' => get_theme_file_uri("assets/styles/{$filename}.css"),
            'path' => get_theme_file_path("assets/styles/{$filename}.css"),
        ]);
    }
}
add_action('init', 'henryblock_enqueue_custom_block_styles');

/**
 * Register pattern categories.
 */
function henryblock_pattern_categories()
{
    $block_pattern_categories = [
        'henry-block/features' => [
            'label' => __('Features', 'henryblock'),
        ],
        'henry-block/hero' => [
            'label' => __('Hero', 'henryblock'),
        ],
        'henry-block/pages' => [
            'label' => __('Pages', 'henryblock'),
        ],
        'henry-block/pricing' => [
            'label' => __('Pricing', 'henryblock'),
        ],
        'henry-block/testimonial' => [
            'label' => __('Testimonials', 'henryblock'),
        ],
    ];

    foreach ($block_pattern_categories as $name => $properties) {
        register_block_pattern_category($name, $properties);
    }
}
add_action('init', 'henryblock_pattern_categories', 9);
