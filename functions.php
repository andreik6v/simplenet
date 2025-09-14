<?php
/**
 * Simplenet functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Simplenet
 * @since Simplenet 1.0
 */
 if ( ! function_exists( 'simplenet_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * @since Simplenet 1.0
	 *
	 * @return void
	 */
	function simplenet_setup() {

		// Remove theme support for the core and featured patterns coming from the WordPress.org pattern directory (for now).
		remove_theme_support( 'core-block-patterns' );
	}

 endif;

 add_action( 'after_setup_theme', 'simplenet_setup' );

if ( ! function_exists( 'simplenet_styles' ) ) :
	/**
	 * Enqueue main stylesheet.
	 *
	 * @since Simplenet 1.0
	 *
	 * @return void
	 */
	function simplenet_styles() {

		$theme_version  = wp_get_theme()->get( 'Version' );
		$version_string = is_string( $theme_version ) ? $theme_version : false;

		// Register theme stylesheet.
		wp_register_style(
			'simplenet-style',
			get_template_directory_uri() . '/style.css',
			array(),
			$version_string
		);

		// Enqueue theme stylesheet.
		wp_enqueue_style( 'simplenet-style' );
	}

endif;

add_action( 'wp_enqueue_scripts', 'simplenet_styles' );

if ( ! function_exists( 'simplenet_editor_styles' ) ) :
	/**
	 * Enqueue style.css into the editor.
	 *
	 * @since Simplenet 1.0
	 *
	 * @return void
	 */
	function simplenet_editor_styles() {

		// Enqueue theme stylesheet there are custom styles.
		add_editor_style( 'style.css' );
	}

endif;

add_action( 'admin_init', 'simplenet_editor_styles' );

// Registers custom block styles.
if (!function_exists("simplenet_block_styles")):
    /**
     * Registers custom block styles.
     *
     * @since Simplenet 1.0
     *
     * @return void
     */
    function simplenet_block_styles()
    {
        register_block_style("core/list", [
            "name" => "simplenet-checkmark",
            "label" => __("Checkmark", "simplenet")
        ]);
        register_block_style("core/list", [
            "name" => "simplenet-dash",
            "label" => __("Dash", "simplenet")
        ]);
        register_block_style("core/list", [
            "name" => "simplenet-arrow",
            "label" => __("Arrow", "simplenet")
        ]);
        register_block_style(
            'core/details',
            [
                'name'  => 'simplenet-plus-minus',
                'label' => __( 'Plus / Minus', 'simplenet' ),
            ]
        );
        register_block_style(
            'core/search',
            [
                'name'  => 'simplenet-underline',
                'label' => __( 'Underline', 'simplenet' ),
            ]
        );
    }
endif;
add_action("init", "simplenet_block_styles");

/**
 * Enqueue block stylesheets.
 */
if ( ! function_exists( 'simplenet_block_stylesheets' ) ) :
	/**
	 * Enqueue custom block stylesheets
	 *
	 * @since Simplenet 1.0
	 * @return void
	 */
	function simplenet_block_stylesheets() {

		$simplenet_styled_blocks = array(
			'core/list'                     => 'list',
			'core/details'                  => 'details',
			'core/search'                   => 'search',
		);

		foreach ( $simplenet_styled_blocks as $block_name_with_namespace => $block_name ) {
			wp_enqueue_block_style(
				$block_name_with_namespace,
				array(
					'handle' => 'simplenet-' . $block_name,
					'src'    => get_template_directory_uri() . '/assets/css/blocks/' . $block_name . '.css',
					'path'   => get_template_directory() . '/assets/css/blocks/' . $block_name . '.css',
				)
			);
		}

	}
endif;

add_action( 'init', 'simplenet_block_stylesheets' );
