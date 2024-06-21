<?php
/**
 * Title: Footer
 * Slug: henryblock/footer
 * Categories: footer
 * Block Types: core/template-part/footer
 */
?>

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}}},"backgroundColor":"base-2","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-base-2-background-color has-background" style="padding-top:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50)"><!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide"><!-- wp:column {"width":"30%"} -->
<div class="wp-block-column" style="flex-basis:30%"><!-- wp:group {"style":{"dimensions":{"minHeight":""},"layout":{"selfStretch":"fit","flexSize":null}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group"><!-- wp:site-title {"level":0,"fontSize":"medium"} /-->

<!-- wp:paragraph -->
<p>Henry is designed to embrace the potential of block-based design, and comes with a colorful collection of style variations and gradients.</p>
<!-- /wp:paragraph -->

<!-- wp:social-links {"iconColor":"base","iconColorValue":"#ffffff","iconBackgroundColorValue":"#6d28d9","className":"is-style-default","layout":{"type":"flex","justifyContent":"left"}} -->
<ul class="wp-block-social-links has-icon-color has-icon-background-color is-style-default"><!-- wp:social-link {"url":"#","service":"twitter"} /-->

<!-- wp:social-link {"url":"#","service":"instagram"} /-->

<!-- wp:social-link {"url":"#","service":"linkedin"} /-->

<!-- wp:social-link {"url":"#","service":"facebook"} /--></ul>
<!-- /wp:social-links --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"20%"} -->
<div class="wp-block-column" style="flex-basis:20%"></div>
<!-- /wp:column -->

<!-- wp:column {"width":"50%"} -->
<div class="wp-block-column" style="flex-basis:50%"><!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between","verticalAlignment":"top"}} -->
<div class="wp-block-group"><!-- wp:group {"layout":{"type":"flex","orientation":"vertical","justifyContent":"stretch"}} -->
<div class="wp-block-group"><!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"600"}},"className":"has-medium-font-size","fontFamily":"body"} -->
<h2 class="wp-block-heading has-medium-font-size has-body-font-family" style="font-style:normal;font-weight:600">Services</h2>
<!-- /wp:heading -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|10"}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group"><!-- wp:navigation {"overlayMenu":"never","layout":{"type":"flex","orientation":"vertical"},"style":{"typography":{"fontStyle":"normal","fontWeight":"400"},"spacing":{"blockGap":"var:preset|spacing|10"}},"fontSize":"small"} -->
<!-- wp:navigation-link {"label":"Web Design","url":"#"} /-->

<!-- wp:navigation-link {"label":"Web Hosting","url":"#"} /-->

<!-- wp:navigation-link {"label":"Site Maintenance","url":"#"} /-->

<!-- wp:navigation-link {"label":"Site Audit","url":"#"} /-->
<!-- /wp:navigation --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:group {"layout":{"type":"flex","orientation":"vertical","justifyContent":"stretch"}} -->
<div class="wp-block-group"><!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"600"}},"className":"has-medium-font-size","fontFamily":"body"} -->
<h2 class="wp-block-heading has-medium-font-size has-body-font-family" style="font-style:normal;font-weight:600">Resources</h2>
<!-- /wp:heading -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|10"}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group"><!-- wp:navigation {"overlayMenu":"never","layout":{"type":"flex","orientation":"vertical"},"style":{"typography":{"fontStyle":"normal","fontWeight":"400"},"spacing":{"blockGap":"var:preset|spacing|10"}},"fontSize":"small"} -->
<!-- wp:navigation-link {"label":"Blog","url":"#"} /-->

<!-- wp:navigation-link {"label":"Knowledgebase","url":"#"} /-->

<!-- wp:navigation-link {"label":"Video tutorials","url":"#"} /-->

<!-- wp:navigation-link {"label":"Case Studies","url":"#"} /-->
<!-- /wp:navigation --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:group {"layout":{"type":"flex","orientation":"vertical","justifyContent":"stretch"}} -->
<div class="wp-block-group"><!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"600"}},"className":"has-medium-font-size","fontFamily":"body"} -->
<h2 class="wp-block-heading has-medium-font-size has-body-font-family" style="font-style:normal;font-weight:600">Company</h2>
<!-- /wp:heading -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|10"}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group"><!-- wp:navigation {"overlayMenu":"never","layout":{"type":"flex","orientation":"vertical"},"style":{"typography":{"fontStyle":"normal","fontWeight":"400"},"spacing":{"blockGap":"var:preset|spacing|10"}},"fontSize":"small"} -->
<!-- wp:navigation-link {"label":"About Us","url":"#"} /-->

<!-- wp:navigation-link {"label":"Contact Us","url":"#"} /-->

<!-- wp:navigation-link {"label":"Privacy Policy","url":"#"} /-->

<!-- wp:navigation-link {"label":"Terms and Conditions","url":"#"} /-->
<!-- /wp:navigation --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:separator {"align":"wide","style":{"spacing":{"margin":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}}},"className":"is-style-separator-dotted"} -->
<hr class="wp-block-separator alignwide has-alpha-channel-opacity is-style-separator-dotted" style="margin-top:var(--wp--preset--spacing--30);margin-bottom:var(--wp--preset--spacing--30)"/>
<!-- /wp:separator -->

<!-- wp:group {"align":"wide"} -->
<div class="wp-block-group alignwide"><!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between","verticalAlignment":"top"}} -->
<div class="wp-block-group"><!-- wp:group {"style":{"spacing":{"blockGap":"5px"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">
    <!-- wp:paragraph -->
		<p>&copy; <?php echo esc_html(gmdate("Y")); ?> · Your Company LLC</p>
	<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:paragraph -->
<p>Designed with <a href="https://henrywp.com" data-type="link" data-id="https://henrywp.com" target="_blank" rel="noreferrer noopener nofollow">Henry</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
