<?php
/**
 * Title: 404
 * Slug: henryblock/hidden-404
 * Inserter: no
 */
?>

<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading" id="page-not-found"><?php echo esc_html_x(
    "Page Not Found",
    "Heading for a webpage that is not found",
    "henryblock"
); ?></h1>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><?php echo esc_html_x(
    "The page you are looking for does not exist, or it has been moved. Please try searching using the form below.",
    "Message to convey that a webpage could not be found",
    "henryblock"
); ?></p>
<!-- /wp:paragraph -->
<!-- wp:pattern {"slug":"henryblock/hidden-search"} /-->
