<?php

define( 'OS_PATH', untrailingslashit( get_template_directory() ) . '/inc/settings' );
define( 'OS_URL', untrailingslashit( get_template_directory_uri() . '/inc/settings' ) );
define( 'OS_VERSION', '1.0' );

require_once( OS_PATH . '/inc/class-os-settings.php' );
require_once( OS_PATH . '/inc/class-os-helper.php' );

henry\Settings::get_instance();
henry\Helper::get_instance();
