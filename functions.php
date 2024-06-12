<?php
/**
 * This file adds functions to the Henry WordPress theme.
 *
 * @package henry-block
 * @author  Andrei Chira
 * @license GNU General Public License v2 or later
 * @link    https://henrywp.com
 */

namespace Henry;

/**
 * Set up theme defaults and register various WordPress features.
 */
function setup()
{
    // Enqueue editor styles and fonts.
    add_editor_style("style.css");

    // Remove core block patterns.
    remove_theme_support("core-block-patterns");
}
add_action("after_setup_theme", __NAMESPACE__ . "\setup");

/**
 * Enqueue styles.
 */
function enqueue_style_sheet()
{
    wp_enqueue_style(
        sanitize_title(__NAMESPACE__),
        get_template_directory_uri() . "/style.css",
        [],
        wp_get_theme()->get("Version")
    );
}
add_action("wp_enqueue_scripts", __NAMESPACE__ . '\enqueue_style_sheet');

/**
 * Add block style variations.
 */
function register_block_styles()
{
    $block_styles = [
        "core/button" => [
            "secondary-button" => __("Secondary", "henry-block"),
        ],
        "core/list" => [
            "list-check" => __("Check Yes", "henry-block"),
            "list-check-no" => __("Check No", "henry-block"),
        ],
        "core/query-pagination-next" => [
            "wp-block-button__link" => __("Button", "henry-block"),
        ],
        "core/query-pagination-previous" => [
            "wp-block-button__link" => __("Button", "henry-block"),
        ],
        "core/code" => [
            "dark-code" => __("Dark", "henry-block"),
        ],
        "core/cover" => [
            "blur-image-less" => __("Blur Image Less", "henry-block"),
            "blur-image-more" => __("Blur Image More", "henry-block"),
            "gradient" => __("Gradient", "henry-block"),
            "rounded-cover" => __("Rounded", "henry-block"),
        ],
        "core/column" => [
            "column-box-shadow" => __("Box Shadow", "henry-block"),
        ],
        "core/columns" => [
            "column-reverse" => __("Reverse", "henry-block"),
        ],
        "core/group" => [
            "column-box-shadow" => __("Box Shadow", "henry-block"),
        ],
        "core/separator" => [
            "separator-dotted" => __("Dotted", "henry-block"),
        ],
        "core/image" => [
            "rounded-full" => __("Rounded Full", "henry-block"),
            "media-boxed" => __("Boxed", "henry-block"),
        ],
        "core/preformatted" => [
            "preformatted-dark" => __("Dark Style", "henry-block"),
        ],
        "core/post-terms" => [
            "term-button" => __("Button Style", "henry-block"),
        ],
        "core/video" => [
            "media-boxed" => __("Boxed", "henry-block"),
        ],
    ];

    foreach ($block_styles as $block => $styles) {
        foreach ($styles as $style_name => $style_label) {
            register_block_style($block, [
                "name" => $style_name,
                "label" => $style_label,
            ]);
        }
    }
}
add_action("init", __NAMESPACE__ . '\register_block_styles');

/**
 * Load custom block styles only when the block is used.
 */
function enqueue_custom_block_styles()
{
    // Scan our styles folder to locate block styles.
    $files = glob(get_template_directory() . "/assets/styles/*.css");

    foreach ($files as $file) {
        // Get the filename and core block name.
        $filename = basename($file, ".css");
        $block_name = str_replace("core-", "core/", $filename);

        wp_enqueue_block_style($block_name, [
            "handle" => "henry-block-{$filename}",
            "src" => get_theme_file_uri("assets/styles/{$filename}.css"),
            "path" => get_theme_file_path("assets/styles/{$filename}.css"),
        ]);
    }
}
add_action("init", __NAMESPACE__ . '\enqueue_custom_block_styles');

/**
 * Register pattern categories.
 */
function pattern_categories()
{
    $block_pattern_categories = [
        "henry-block/features" => [
            "label" => __("Features", "henry-block"),
        ],
        "henry-block/hero" => [
            "label" => __("Hero", "henry-block"),
        ],
        "henry-block/pages" => [
            "label" => __("Pages", "henry-block"),
        ],
        "henry-block/pricing" => [
            "label" => __("Pricing", "henry-block"),
        ],
        "henry-block/testimonial" => [
            "label" => __("Testimonials", "henry-block"),
        ],
    ];

    foreach ($block_pattern_categories as $name => $properties) {
        register_block_pattern_category($name, $properties);
    }
}
add_action("init", __NAMESPACE__ . "\pattern_categories", 9);
