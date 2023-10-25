<?php

add_action( 'wp_enqueue_scripts', 'henry_child_enqueue_styles' );

/**
 * Enqueue henry styles.
 *
 * @return void
 */
function henry_child_enqueue_styles(): void {
	wp_enqueue_style( 'henry-child-style', get_stylesheet_uri(), array( 'henry' ), wp_get_theme()->get( 'Version' ) );
}