<?php

namespace henry;

class Settings {
	/**
	 * Contains instance or null
	 *
	 * @var object|null
	 */
	private static $instance = null;

	/**
	 * Returns instance of Settings.
	 *
	 * @return object
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Setting up admin fields
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_menu' ) );
		add_action( 'rest_api_init', array( $this, 'rest_api_init' ) );
		add_action( 'admin_footer', array( $this, 'render_modal' ) );
	}

	/**
	 * Add admin menu item.
	 *
	 * @return void
	 */
	public function add_menu() {
		$settings_suffix = add_theme_page(
			__( 'henry', 'henry' ),
			__( 'henry', 'henry' ),
			'manage_options',
			'henry',
			array( $this, 'render_settings' )
		);

		add_action( "admin_print_scripts-{$settings_suffix}", array( $this, 'add_settings_scripts' ) );
		add_action( 'admin_print_scripts', array( $this, 'add_settings_scripts' ) );
	}

	/**
	 * Enqueue admin settings scripts.
	 *
	 * @return void
	 */
	public function add_settings_scripts() {
		$screen = get_current_screen();

		wp_enqueue_media();

		wp_enqueue_script( 'henry-onboarding-settings', OS_URL . '/build/index.js', array(
			'wp-api',
			'wp-components',
			'wp-plugins',
			'wp-edit-post',
			'wp-edit-site',
			'wp-element',
			'wp-api-fetch',
			'wp-data',
			'wp-i18n',
			'wp-block-editor'
		), OS_VERSION, true );

		$henry_settings = get_option( 'henry' );

		if ( 'appearance_page_henry' === $screen->base ) {
			$args = array(
				'screen'              => 'settings',
				'version'             => OS_VERSION,
				'dashboard_link'      => admin_url(),
				'home_link'           => home_url(),
				'logo'                => OS_URL . '/assets/henry-logo.svg',
				'site_title'          => get_option( 'blogname' ),
				'site_tagline'        => get_option( 'blogdescription' ),
				'onboarding_complete' => false,
			);

			if ( isset( $henry_settings['onboarding_complete'] ) ) {
				$args['onboarding_complete'] = $henry_settings['onboarding_complete'];
			}

			// Checking permalink structure.
			$permalinks = get_option( 'permalink_structure' );

			if ( empty( $permalinks ) ) {
				$args['permalink_structure'] = 'plain';
			} else {
				$args['permalink_structure'] = 'postname';
			}

			// Adjust homepage display based on WP settings.
			$front = get_option( 'show_on_front' );

			if ( 'posts' === $front ) {
				$args['homepage_display'] = 'posts';
				$args['home_id']          = '';
				$args['blog_id']          = '';
			} else {
				$args['homepage_display'] = 'page';
				$args['home_id']          = get_option( 'page_on_front' );
				$args['blog_id']          = get_option( 'page_for_posts' );
			}

			wp_localize_script( 'henry-onboarding-settings', 'options', $args );

			// Make the blocks translatable.
			if ( function_exists( 'wp_set_script_translations' ) ) {
				wp_set_script_translations( 'henry-onboarding-settings', 'henry-data', OS_PATH . '/languages' );
			}

			wp_enqueue_style( 'henry-onboarding-settings-style', OS_URL . '/build/index.css', array( 'wp-components' ) );
		} else {
			$args = array(
				'screen'          => 'modal',
				'logo'            => OS_URL . '/assets/henry-logo.svg',
				'onboarding_link' => admin_url() . 'themes.php?page=henry',
				'skip_onboarding' => false,
			);

			if ( isset( $henry_settings['skip_onboarding'] ) ) {
				$args['skip_onboarding'] = $henry_settings['skip_onboarding'];
			}

			wp_localize_script( 'henry-onboarding-settings', 'options', $args );

			// Make the blocks translatable.
			if ( function_exists( 'wp_set_script_translations' ) ) {
				wp_set_script_translations( 'henry-onboarding-settings', 'henry-data', OS_PATH . '/languages' );
			}
		}
	}

	/**
	 * Render henry onboarding settings.
	 *
	 * @return void
	 */
	public function render_settings() {
		?>
        <div id="henry-onboarding"></div>
		<?php
	}

	/**
	 * Render henry onboarding modal.
	 *
	 * @return void
	 */
	public function render_modal() {
		global $pagenow;
		if ( ( 'themes.php' == $pagenow ) || ( 'plugins.php' == $pagenow ) ) {
			?>
            <div id="henry-modal"></div>
            <style>
                @keyframes henryFadeIn {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }

                .henry-modal-background {
                    background: rgba(93, 93, 111, 0.7);
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 9991;
                    animation: henryFadeIn .5s;
                }

                .henry-modal-content {
                    background: white;
                    padding: 50px;
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    max-width: 440px;
                    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
                    z-index: 99;
                    border-radius: 3px;
                }

                .henry-modal-close {
                    background: none;
                    border: none;
                    padding: 0;
                    position: absolute;
                    right: 20px;
                    top: 20px;
                }

                .henry-modal-close:hover {
                    cursor: pointer;
                    opacity: .6;
                }

                .henry-modal-content img {
                    max-width: 300px;
                    margin: 0 auto 35px auto;
                    display: block;
                }

                .henry-modal-content h2 {
                    text-align: center;
                    font-size: 2.2em;
                }

                .henry-modal-content p {
                    margin: 25px auto;
                    font-size: 16px;
                    text-align: center;
                }

                .henry-modal-content .henry-modal-inner button {
                    padding: 15px 20px;
                    transition: 0.3s ease;
                    background: #3858e9;
                    color: white;
                    border: none;
                    cursor: pointer;
                    border-radius: 2px;
                    font-size: 16px;
                }

                .henry-modal-content .henry-modal-inner button:hover {
                    background: #2145e6;
                }

                .henry-modal-content button.henry-modal-skip {
                    background: none;
                    color: #3c434a;
                }

                .henry-modal-content button.henry-modal-skip:hover {
                    text-decoration: underline;
                    background: none;
                }
            </style>
			<?php
		}
	}

	/**
	 * Set up Rest API routes.
	 *
	 * @return void
	 */
	public function rest_api_init() {
		register_rest_route( 'henry/v1', '/settings', array(
			'methods'             => 'GET',
			'callback'            => [ $this, 'get_settings' ],
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
		) );

		register_rest_route( 'henry/v1', '/settings', array(
			'methods'             => 'POST',
			'callback'            => [ $this, 'save_settings' ],
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
		) );

		register_rest_route( 'henry/v1', '/create-child-theme', array(
			'methods'             => 'POST',
			'callback'            => [ $this, 'create_child_theme' ],
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
		) );

		register_rest_route( 'henry/v1', '/complete-onboarding', array(
			'methods'             => 'POST',
			'callback'            => [ $this, 'complete_onboarding' ],
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
		) );

		register_rest_route( 'henry/v1', '/skip-onboarding', array(
			'methods'             => 'POST',
			'callback'            => [ $this, 'skip_onboarding' ],
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
		) );

		register_rest_route( 'henry/v1', '/site-logo', array(
			'methods'             => 'GET',
			'callback'            => [ $this, 'get_logo' ],
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
		) );

		register_rest_route( 'henry/v1', '/site-logo', array(
			'methods'             => 'POST',
			'callback'            => [ $this, 'set_logo' ],
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
		) );

		register_rest_route( 'henry/v1', '/create-pages', array(
			'methods'             => 'POST',
			'callback'            => [ $this, 'create_pages' ],
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
		) );
	}

	/**
	 * Get henry settings via Rest API.
	 *
	 * @return false|mixed|null
	 */
	public function get_settings() {
		return get_option( 'henry' );
	}

	/**
	 * Save settings via Rest API.
	 *
	 * @param object $request given request.
	 *
	 * @return string
	 */
	public function save_settings( $request ) {
		if ( $request->get_params() ) {
			$options = $request->get_params();
			update_option( 'henry', $options );

			// Update core options.
			if ( isset( $options['site_title'] ) ) {
				update_option( 'blogname', $options['site_title'] );
			}

			if ( isset( $options['site_tagline'] ) ) {
				update_option( 'blogdescription', $options['site_tagline'] );
			}

			// Update logo.
			if ( isset( $options['site_logo'] ) ) {
				update_option( 'site_logo', $options['site_logo'] );
			}

			// Set up the homepage.
			if ( isset( $options['homepage_display'] ) ) {
				switch ( $options['homepage_display'] ) {
					case 'posts':
						// Just update the option.
						update_option( 'show_on_front', 'posts' );
						break;
					case 'page':
						// Update options for homepage + blog page.
						update_option( 'show_on_front', 'page' );
						update_option( 'page_on_front', $options['home_id'] );
						update_option( 'page_for_posts', $options['blog_id'] );
						break;
				}
			}

			if ( isset( $options['permalink_structure'] ) ) {
				switch ( $options['permalink_structure'] ) {
					case 'postname':
						update_option( 'permalink_structure', '/%postname%/' );
						break;
					case 'plain':
						update_option( 'permalink_structure', '' );
						break;
				}
			}

			return json_encode( [ "status" => 200, "message" => "Ok" ] );
		}

		return json_encode( [ "status" => 400, "message" => "Could not dave settings" ] );
	}

	/**
	 * Create child theme via helper method.
	 *
	 * @param object $request given request.
	 *
	 * @return string
	 */
	public function create_child_theme( $request ) {
		if ( $request->get_params() ) {
			Helper::create_child_theme();

			return json_encode( [ "status" => 200, "message" => "Ok" ] );
		}

		return json_encode( [ "status" => 400, "message" => "Could not create child theme." ] );
	}


	/**
	 * Finish onboarding.
	 *
	 * @param object $request given request.
	 *
	 * @return string
	 */
	public function complete_onboarding( $request ) {
		if ( $request->get_params() ) {
			$options                        = get_option( 'henry' );
			$options['onboarding_complete'] = true;

			update_option( 'henry', $options );

			return json_encode( [ "status" => 200, "message" => "Ok" ] );
		}

		return json_encode( [ "status" => 400, "message" => "Could not create child theme." ] );
	}

	/**
	 * Finish onboarding.
	 *
	 * @param object $request given request.
	 *
	 * @return string
	 */
	public function skip_onboarding( $request ) {
		if ( $request->get_params() ) {
			$options = get_option( 'henry' );

			// If no henry settings exist, create them.
			if ( ! is_array( $options ) ) {
				$options = [];
			}

			// Set skip onboarding to true and update.
			$options['skip_onboarding'] = true;
			update_option( 'henry', $options );

			return json_encode( [ "status" => 200, "message" => "Ok" ] );
		}

		return json_encode( [ "status" => 400, "message" => "Could not create child theme." ] );
	}

	/**
	 * Create pages.
	 *
	 * @param object $request given request.
	 *
	 * @return string
	 */
	public function create_pages( $request ) {
		if ( $request->get_params() ) {
			$pages = $request->get_params();
			unset( $pages['_locale'] );
			unset( $pages['rest_route'] );

			$created_pages = Helper::create_pages( $pages );

			if ( isset( $created_pages['home'] ) ) {
				update_option( 'show_on_front', 'page' );
				update_option( 'page_on_front', $created_pages['home'] );
			}

			if ( isset( $created_pages['blog'] ) ) {
				update_option( 'page_for_posts', $created_pages['blog'] );
			}

			return json_encode( [ "status" => 200, "pages" => $created_pages, "message" => "Ok" ] );
		}

		return json_encode( [ "status" => 400, "message" => "Could not create pages." ] );
	}

	/**
	 * Get site logo via Rest API.
	 *
	 * @return false|mixed|null
	 */
	public function get_logo() {
		return wp_get_attachment_url( get_option( 'site_logo' ) );
	}

	/**
	 * Update site logo via REST API.
	 *
	 * @param object $request given request.
	 *
	 * @return string
	 */
	public function set_logo( $request ) {
		if ( $request->get_params() ) {
			$data = $request->get_params();

			return $data['logo'];
		}

		return json_encode( [ "status" => 400, "message" => "Could not set logo" ] );
	}
}
