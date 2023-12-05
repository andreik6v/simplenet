<?php
/**
 * Functions for the Henry WordPress theme.
 *
 * @package Henry
 * @author  Andrei Chira
 * @license GNU General Public License v2 or later
 * @link    https://henrywp.com/
 */

if ( ! function_exists( 'henry_setup' ) ) {

	/**
	 * Initialize theme defaults and registers support for WordPress features.
	 */
	function henry_setup() {

		// Enqueue editor style sheet.
		add_editor_style( get_template_directory_uri() . '/style.css' );

		// Disable core block inline styles.
		add_filter( 'should_load_separate_core_block_assets', '__return_false' );

		// Remove core block patterns support.
		remove_theme_support( 'core-block-patterns' );

	}
}
add_action( 'after_setup_theme', 'henry_setup' );

/**
 * Enqueue theme style sheet.
 */
function henry_enqueue_style_sheet() {

	wp_enqueue_style( 'henry', get_template_directory_uri() . '/style.css', array(), wp_get_theme( 'henry' )->get( 'Version' ) );

}
add_action( 'wp_enqueue_scripts', 'henry_enqueue_style_sheet' );

/**
 * Register block styles.
 */
function henry_register_block_styles() {

	$block_styles = array(
		'core/columns' => array(
			'column-reverse' => __( 'Reverse', 'henry' ),
		),
		'core/cover' => array(
			'gradient' => __( 'Gradient', 'henry' )
		),
		'core/group' => array(
			'shadow-light' => __( 'Shadow (Light)', 'henry' ),
			'shadow-solid' => __( 'Shadow (Solid)', 'henry' ),
		),
		'core/image' => array(
			'shadow-light' => __( 'Shadow (Light)', 'henry' ),
			'shadow-solid' => __( 'Shadow (Solid)', 'henry' ),
		),
		'core/list' => array(
			'no-style' => __( 'No Style', 'henry' ),
		),
		'core/social-links' => array(
			'outline' => __( 'Outline', 'henry' ),
		),
	);

	foreach ( $block_styles as $block => $styles ) {
		foreach ( $styles as $style_name => $style_label ) {
			register_block_style(
				$block,
				array(
					'name'  => $style_name,
					'label' => $style_label,
				)
			);
		}
	}

}
add_action( 'init', 'henry_register_block_styles' );

/**
 * Register block pattern categories.
 */
function henry_register_pattern_categories() {

	register_block_pattern_category(
		'content',
		array(
			'label'       => __( 'Content', 'henry' ),
			'description' => __( 'A collection of content patterns designed for Henry.', 'henry' ),
		)
	);
	register_block_pattern_category(
		'hero',
		array(
			'label'       => __( 'Hero', 'henry' ),
			'description' => __( 'A collection of hero patterns designed for Henry.', 'henry' ),
		)
	);
	register_block_pattern_category(
		'page',
		array(
			'label'       => __( 'Pages', 'henry' ),
			'description' => __( 'A collection of page patterns designed for Henry.', 'henry' ),
		)
	);
	register_block_pattern_category(
		'template',
		array(
			'label'       => __( 'Templates', 'henry' ),
			'description' => __( 'A collection of template patterns designed for Henry.', 'henry' ),
		)
	);

}
add_action( 'init', 'henry_register_pattern_categories' );
