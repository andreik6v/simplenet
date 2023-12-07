<?php
/**
 * Henry functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Henry
 * @since Henry 1.0
 */




/**
 * Register block styles.
 */

if ( ! function_exists( 'henry_block_styles' ) ) :
	/**
	 * Register custom block styles
	 *
	 * @since Henry 1.0
	 * @return void
	 */
	function henry_block_styles() {

		register_block_style(
			'core/details',
			array(
				'name'         => 'arrow-icon-details',
				'label'        => __( 'Arrow icon', 'henry' ),
				/*
				 * Styles for the custom Arrow icon style of the Details block
				 */
				'inline_style' => '
				.is-style-arrow-icon-details {
					padding-top: var(--wp--preset--spacing--10);
					padding-bottom: var(--wp--preset--spacing--10);
				}

				.is-style-arrow-icon-details summary {
					list-style-type: "\2193\00a0\00a0\00a0";
				}

				.is-style-arrow-icon-details[open]>summary {
					list-style-type: "\2192\00a0\00a0\00a0";
				}',
			)
		);
		register_block_style(
			'core/post-terms',
			array(
				'name'         => 'pill',
				'label'        => __( 'Pill', 'henry' ),
				/*
				 * Styles variation for post terms
				 * https://github.com/WordPress/gutenberg/issues/24956
				 */
				'inline_style' => '
				.is-style-pill a,
				.is-style-pill span:not([class], [data-rich-text-placeholder]) {
					display: inline-block;
					background-color: var(--wp--preset--color--base);
					padding: 0.375rem 0.875rem;
					border-radius: var(--wp--preset--spacing--20);
				}

				.is-style-pill a:hover {
					background-color: var(--wp--preset--color--contrast);
				}',
			)
		);
		register_block_style(
			'core/list',
			array(
				'name'         => 'checkmark-list',
				'label'        => __( 'Checkmark', 'henry' ),
				/*
				 * Styles for the custom checkmark list block style
				 * https://github.com/WordPress/gutenberg/issues/51480
				 */
				'inline_style' => '
				ul.is-style-checkmark-list {
					list-style-type: "\2713";
				}

				ul.is-style-checkmark-list li {
					padding-inline-start: 1ch;
				}',
			)
		);
		register_block_style(
			'core/navigation-link',
			array(
				'name'         => 'arrow-link',
				'label'        => __( 'With arrow', 'henry' ),
				/*
				 * Styles for the custom arrow nav link block style
				 */
				'inline_style' => '
				.is-style-arrow-link .wp-block-navigation-item__label:after {
					content: "\2197";
					padding-inline-start: 0.25rem;
					vertical-align: middle;
					text-decoration: none;
					display: inline-block;
				}',
			)
		);
		register_block_style(
			'core/image',
			array(
				'name'         => 'media-boxed',
				'label'        => __( 'Boxed', 'henry' ),
				/*
				 * Styles for the custom boxed image block style
				 */
				'inline_style' => '
				.is-style-media-boxed {
					background-color: var(--wp--preset--color--quaternary);
					padding: var(--wp--preset--spacing--40);
					border-radius: 5px;
				}'
			)
		);
		register_block_style(
			'core/image',
			array(
				'name'         => 'rounded-full',
				'label'        => __( 'Rounded full', 'henry' ),
				/*
				 * Styles for the custom fully rounded image block style
				 */
				'inline_style' => '
				.wp-block-image.is-style-rounded-full img,
				.wp-block-image .is-style-rounded-full img {
					border-radius: 999px;
				}'
			)
		);
		register_block_style(
			'core/separator',
			array(
				'name'         => 'separator-dotted',
				'label'        => __( 'Dotted', 'henry' ),
				/*
				 * Styles for the custom dotted separator block style
				 */
				'inline_style' => '
				hr.is-style-separator-dotted, .editor-styles-wrapper hr.is-style-separator-dotted {
					width: 100% !important;
					height: 1px !important;
					border: none !important;
					height: 1px !important;
					background-color: none !important;
					background: currentColor !important;
					background: repeating-linear-gradient(90deg,currentColor,currentColor 2px,transparent 2px,transparent 5px) !important;
				}',
			)
		);
	}
endif;

add_action( 'init', 'henry_block_styles' );

/**
 * Enqueue block stylesheets.
 */

if ( ! function_exists( 'henry_block_stylesheets' ) ) :
	/**
	 * Enqueue custom block stylesheets
	 *
	 * @since Henry 1.0
	 * @return void
	 */
	function henry_block_stylesheets() {
		/**
		 * The wp_enqueue_block_style() function allows us to enqueue a stylesheet
		 * for a specific block. These will only get loaded when the block is rendered
		 * (both in the editor and on the front end), improving performance
		 * and reducing the amount of data requested by visitors.
		 *
		 * See https://make.wordpress.org/core/2021/12/15/using-multiple-stylesheets-per-block/ for more info.
		 */
		wp_enqueue_block_style(
			'core/button',
			array(
				'handle' => 'henry-button-style-outline',
				'src'    => get_parent_theme_file_uri( 'assets/css/button-outline.css' ),
				'ver'    => wp_get_theme( get_template() )->get( 'Version' ),
				'path'   => get_parent_theme_file_path( 'assets/css/button-outline.css' ),
			)
		);
	}
endif;

add_action( 'init', 'henry_block_stylesheets' );

/**
 * Register pattern categories.
 */

if ( ! function_exists( 'henry_pattern_categories' ) ) :
	/**
	 * Register pattern categories
	 *
	 * @since Henry 1.0
	 * @return void
	 */
	function henry_pattern_categories() {

		register_block_pattern_category(
			'page',
			array(
				'label'       => _x( 'Pages', 'Block pattern category' ),
				'description' => __( 'A collection of full page layouts.' ),
			)
		);
	}
endif;

add_action( 'init', 'henry_pattern_categories' );

