<?php
/**
 * This file adds functions to the Henry WordPress theme.
 *
 * @package henry
 * @author  Andrei Chira
 * @license GNU General Public License v2 or later
 * @link    https://henrywp.com
 */

namespace Henry;

/**
 * Set up theme defaults and register various WordPress features.
 */
function setup() {

	// Enqueue editor styles and fonts.
	add_editor_style( 'style.css' );

	// Remove core block patterns.
	remove_theme_support( 'core-block-patterns' );
}
add_action( 'after_setup_theme', __NAMESPACE__ . '\setup' );


/**
 * Enqueue styles.
 */
function enqueue_style_sheet() {
	wp_enqueue_style( sanitize_title( __NAMESPACE__ ), get_template_directory_uri() . '/style.css', array(), wp_get_theme()->get( 'Version' ) );
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_style_sheet' );


/**
 * Add Dashicons for use with block styles.
 */
function enqueue_block_dashicons() {
	wp_enqueue_style( 'dashicons' );
}
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\enqueue_block_dashicons' );


/**
 * Add block style variations.
 */
function register_block_styles() {

	$block_styles = array(
		'core/button'                    => array(
			'secondary-button' => __( 'Secondary', 'henry' ),
		),
		'core/list'                      => array(
			'list-check'        => __( 'Check', 'henry' ),
			'list-check-circle' => __( 'Check Circle', 'henry' ),
		),
		'core/query-pagination-next'     => array(
			'wp-block-button__link' => __( 'Button', 'henry' ),
		),
		'core/query-pagination-previous' => array(
			'wp-block-button__link' => __( 'Button', 'henry' ),
		),
		'core/code'                      => array(
			'dark-code' => __( 'Dark', 'henry' ),
		),
		'core/cover'                     => array(
			'blur-image-less' => __( 'Blur Image Less', 'henry' ),
			'blur-image-more' => __( 'Blur Image More', 'henry' ),
			'rounded-cover'   => __( 'Rounded', 'henry' ),
		),
		'core/column'                    => array(
			'column-box-shadow' => __( 'Box Shadow', 'henry' ),
		),
		'core/group'                     => array(
			'column-box-shadow' => __( 'Box Shadow', 'henry' ),
		),
		'core/separator'                 => array(
			'separator-dotted' => __( 'Dotted', 'henry' ),
		),
		'core/image'                     => array(
			'rounded-full' => __( 'Rounded Full', 'henry' ),
			'media-boxed'  => __( 'Boxed', 'henry' ),
		),
		'core/preformatted'              => array(
			'preformatted-dark' => __( 'Dark Style', 'henry' ),
		),
		'core/post-terms'                => array(
			'term-button' => __( 'Button Style', 'henry' ),
		),
		'core/video'                     => array(
			'media-boxed' => __( 'Boxed', 'henry' ),
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
add_action( 'init', __NAMESPACE__ . '\register_block_styles' );

/**
 * Load custom block styles only when the block is used.
 */
function enqueue_custom_block_styles() {

	// Scan our styles folder to locate block styles.
	$files = glob( get_template_directory() . '/assets/styles/*.css' );

	foreach ( $files as $file ) {

		// Get the filename and core block name.
		$filename   = basename( $file, '.css' );
		$block_name = str_replace( 'core-', 'core/', $filename );

		wp_enqueue_block_style(
			$block_name,
			array(
				'handle' => "henry-block-{$filename}",
				'src'    => get_theme_file_uri( "assets/styles/{$filename}.css" ),
				'path'   => get_theme_file_path( "assets/styles/{$filename}.css" ),
			)
		);
	}
}
add_action( 'init', __NAMESPACE__ . '\enqueue_custom_block_styles' );


/**
 * Register pattern categories.
 */
function pattern_categories() {

	$block_pattern_categories = array(
		'henry/card'           => array(
			'label' => __( 'Cards', 'henry' ),
		),
		'henry/call-to-action' => array(
			'label' => __( 'Call To Action', 'henry' ),
		),
		'henry/features'       => array(
			'label' => __( 'Features', 'henry' ),
		),
		'henry/hero'           => array(
			'label' => __( 'Hero', 'henry' ),
		),
		'henry/pages'          => array(
			'label' => __( 'Pages', 'henry' ),
		),
		'henry/posts'          => array(
			'label' => __( 'Posts', 'henry' ),
		),
		'henry/pricing'        => array(
			'label' => __( 'Pricing', 'henry' ),
		),
		'henry/testimonial'    => array(
			'label' => __( 'Testimonials', 'henry' ),
		),
	);

	foreach ( $block_pattern_categories as $name => $properties ) {
		register_block_pattern_category( $name, $properties );
	}
}
add_action( 'init', __NAMESPACE__ . '\pattern_categories', 9 );