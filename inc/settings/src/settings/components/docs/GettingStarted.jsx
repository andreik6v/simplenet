const {__} = wp.i18n;
import {Video} from "../partials/Video";

function GettingStarted() {
    return (
        <section>
            <h2 id="getting-started">Getting Started with henry</h2>

			<ul>
				<li><p>View a live demo of the henry theme. <a href="https://demo.henrywp.com/">View henry Demo</a></p></li>
				<li><p>Download the henry theme zip to install on your WordPress site. <a href="https://github.com/henryWP/henry/releases/latest/download/henry.zip">Download henry Theme</a></p></li>
			</ul>

			<p>There are a few ways to install henry on your WordPress website. The easiest way is to install it from within your WordPress admin. Go to <strong>Appearance → Themes → Add New</strong> and search for henry. </p>

			<p>You can also install henry manually by downloading the theme and uploading it to your WordPress site. You can download henry for free at <a href="https://henrywp.com">henryWP.com</a> and also via the <a href="https://github.com/henryWP/henry"> GitHub repository</a>.</p>

			<h3 id="henry-dashboard">henry Theme Dashboard</h3>

			<Video 
				title={__('Intro to henry', 'henry')}
				tagline={__('Learn about the henry dashboard and the henry setup wizard.', 'henry')}
				videoId={'JZ1EgDaDAH0'}
			/>

			<p>Once you activate the henry theme, you will see a pop-up guiding you to the henry theme dashboard. You can also get to the dashboard by visiting <strong>Appearance → henry</strong>. This dashboard is a one-stop hub for all the resources we’ve included with the henry theme. Here, you’ll find a Welcome page with helpful links, henry docs, the henry theme setup wizard, and the video library.</p>

			<h3 id="theme-setup-wizard">Theme Setup Wizard</h3>

			<Video 
				title={__('henry Setup Wizard', 'henry')}
				tagline={__('Set up your site with a few clicks with the henry Setup Wizard.', 'henry')}
				videoId={'OiO4gNDY0VQ'}
			/>

			<p>Whenever you set up a new WordPress site, there’s always a dozen different tasks that you have to complete while jumping around the WordPress admin. Creating pages, designing layouts, setting up your brand assets, and a whole bunch of other stuff. </p>

			<p>Well, you don’t have to do that anymore! The henry theme Setup wizard is a one-of-a-kind onboarding experience that automates all of those pesky tasks and handles them in one streamlined experience. </p>

			<p>The setup wizard will help you change common settings, set up your logo and brand colors, and automatically create pixel-perfect pages for you with just a few clicks. The setup wizard isn’t just for new sites. You can use the wizard to quickly generate pages on existing sites as well. </p>

			<p>From your WordPress dashboard, you can find the henry setup wizard by going to <strong>Appearance → henry → Theme Setup</strong>, or by following the pop-up upon theme activation.</p>
        </section>
    )
}
export default GettingStarted;
