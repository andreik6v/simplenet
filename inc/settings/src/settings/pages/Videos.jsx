import {
	__experimentalGrid as Grid,
	__experimentalSpacer as Spacer,
    Flex,
    FlexItem,
} from "@wordpress/components";
import {Video} from "../components/partials/Video";
import {Header} from "../components/partials/Header";

const {__} = wp.i18n;

function Videos() {
    return (
		<>
			<div className={"henry-dash-hero"}>
                <div className="henry-dash-container">
                    <Header />
                    <Flex className="henry-dash-hero-content henry-dash-video-content">
                        <FlexItem>
                            <h1>{__('Learn how to build with WordPress and henry', 'henry')}</h1>
                            <p>{__('WordPress is more powerful than its ever been, which means there\'s a lot to learn! The henry Builder Acdemy is a video tutorial series designed to help you build beautiful and blazing-fast websites with WordPress and the henry block theme, no page builder required.', 'henry')}</p>
                            <p>{__('This series is updated regularly, so check back often for new content! Ready to get started? Click on any of the videos below to start learning.', 'henry')}</p>
                        </FlexItem>
                        <FlexItem>
							<Video 
								title={__('Intro to henry', 'henry')}
								tagline={__('Learn about the henry dashboard and the henry setup wizard.', 'henry')}
								videoId={'JZ1EgDaDAH0'}
							/>
                        </FlexItem>
                    </Flex>
                </div>
            </div>
			<div className="henry-dash-container henry-dash-content">
				<h2 className="henry-dash-content-intro">{__('Get Started with henry', 'henry')}</h2>
				<Grid columns={3} gap={8}>
					<Video 
						title={__('henry Setup Wizard', 'henry')}
						tagline={__('Set up your site with a few clicks with the henry Setup Wizard.', 'henry')}
						videoId={'OiO4gNDY0VQ'}
					/>
					<Video 
						title={__('Homepage & Blog', 'henry')}
						tagline={__('Learn a few different ways to quickly create your homepage and blog page.', 'henry')}
						videoId={'U-syrjB58j8'}
					/>
					<Video 
						title={__('What is a block theme?', 'henry')}
						tagline={__('Let\'s dig into block themes and learn about all of the powerful new features.', 'henry')}
						videoId={'D7GUoX2XU1k'}
					/>
					<Video 
						title={__('Site Editor 101', 'henry')}
						tagline={__('Learn how to fully customize the henry theme with the WordPress Site Editor.', 'henry')}
						videoId={'51-FInsYsGs'}
					/>
					<Video 
						title={__('Global Styles', 'henry')}
						tagline={__('Quickly and easily change your site\'s fonts, colors, and more with global styles.', 'henry')}
						videoId={'6RavZxNFy2Y'}
					/>
					<Video 
						title={__('Working with Patterns', 'henry')}
						tagline={__('Design pixel-perfect pages with the growing collection of henry patterns.', 'henry')}
						videoId={'w8DehSH1_PA'}
					/>
				</Grid>
				<Spacer margin={20}/>
				<h2 className="henry-dash-content-intro">{__('Building with the Site Editor', 'henry')}</h2>
				<Grid columns={3} gap={8}>
					<Video 
						title={__('Edit Headers and Footers', 'henry')}
						tagline={__('Learn how to quickly adjust your header and footer designs with block themes.', 'henry')}
						videoId={'sp3gZha1gRY'}
					/>
					<Video 
						title={__('Desgin a Hero Header', 'henry')}
						tagline={__('Follow along as we design a hero header in the WordPress block editor.', 'henry')}
						videoId={'Y7JjG1PhLHc'}
					/>
					<Video 
						title={__('How To Build a Pattern', 'henry')}
						tagline={__('Designing patterns in the block editor is a breeze once you know how to use the tools.', 'henry')}
						videoId={'pWpnMD2MX7w'}
					/>
				</Grid>
			</div>
		</>
    )
}

export default Videos;
