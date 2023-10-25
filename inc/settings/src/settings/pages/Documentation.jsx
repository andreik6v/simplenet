import {
    __experimentalSpacer as Spacer,
    Flex,
    FlexItem,
} from "@wordpress/components";
import DocsIntroduction from "../components/docs/Introduction";
import DocsBlockThemes from "../components/docs/BlockThemes";
import DocsResources from "../components/docs/Resources";
import GettingStarted from "../components/docs/GettingStarted";
import {useState} from "@wordpress/element";

const {__} = wp.i18n;

function Documentation() {

    const [activeItem, setActiveItem] = useState({activeItem: "introduction"});

    return (
        <Flex align="stretch" gap="0" className="henry-settings-inner">
            <FlexItem className={"henry-setup-sidebar"}>
                <div className="henry-docs-nav-sticky">
                    <div className="henry-docs-nav-overflow">
                        <h2>{__('Documentation', 'henry')}</h2>
                        <p>{__('Learn about the henry theme and how to build beautiful websites.', 'henry')}</p>
                        <Spacer margin={10}/>
                        <ul className={"henry-docs-steps"}>
                            <li>
                                <p className="henry-doc-step-title">{__('Getting Started', 'henry')}</p>
                                <ul>
                                    <li onClick={() => setActiveItem('getting-started')}
                                        className={activeItem === 'getting-started' ? 'henry-active-doc' : ''}>
                                        <a href="#getting-started">{__('Getting Started with henry', 'henry')}</a>
                                    </li>
									<li onClick={() => setActiveItem('henry-dashboard')}
                                        className={activeItem === 'henry-dashboard' ? 'henry-active-doc' : ''}>
                                        <a href="#henry-dashboard">{__('henry Theme Dashboard', 'henry')}</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <p>{__('Block Themes', 'henry')}</p>
                                <ul>
                                    <li onClick={() => setActiveItem('block-theme-intro')}
                                        className={activeItem === 'block-theme-intro' ? 'henry-active-doc' : ''}>
                                        <a href="#block-theme-intro">{__('Block Theme Intro', 'henry')}</a>
                                    </li>
                                    <li onClick={() => setActiveItem('site-editor')}
                                        className={activeItem === 'site-editor' ? 'henry-active-doc' : ''}>
                                        <a href="#site-editor">{__('Site Editor', 'henry')}</a>
                                    </li>
                                    <li onClick={() => setActiveItem('patterns')}
                                        className={activeItem === 'patterns' ? 'henry-active-doc' : ''}>
                                        <a href="#patterns">{__('Patterns', 'henry')}</a>
                                    </li>
                                    <li onClick={() => setActiveItem('global-styles')}
                                        className={activeItem === 'global-styles' ? 'henry-active-doc' : ''}>
                                        <a href="#global-styles">{__('Global Styles', 'henry')}</a>
                                    </li>
                                    <li onClick={() => setActiveItem('template-parts')}
                                        className={activeItem === 'template-parts' ? 'henry-active-doc' : ''}>
                                        <a href="#template-parts">{__('Template Parts', 'henry')}</a>
                                    </li>
                                    <li onClick={() => setActiveItem('site-export')}
                                        className={activeItem === 'site-export' ? 'henry-active-doc' : ''}>
                                        <a href="#site-export">{__('Export Your Site', 'henry')}</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <p>{__('Resources', 'henry')}</p>
                                <ul>
									<li onClick={() => setActiveItem('henry-youtube')}
                                        className={activeItem === 'henry-youtube' ? 'henry-active-doc' : ''}>
                                        <a href="#henry-youtube">{__('henry YouTube Channel', 'henry')}</a>
                                    </li>
									<li onClick={() => setActiveItem('developer-notes')}
                                        className={activeItem === 'developer-notes' ? 'henry-active-doc' : ''}>
                                        <a href="#developer-notes">{__('Developer Notes', 'henry')}</a>
                                    </li>
                                    <li onClick={() => setActiveItem('license')}
                                        className={activeItem === 'license' ? 'henry-active-doc' : ''}>
                                        <a href="#license">{__('License', 'henry')}</a>
                                    </li>
                                    <li onClick={() => setActiveItem('feedback')}
                                        className={activeItem === 'feedback' ? 'henry-active-doc' : ''}>
                                        <a href="#feedback">{__('Feedback', 'henry')}</a>
                                    </li>
                                    <li onClick={() => setActiveItem('about-creator')}
                                        className={activeItem === 'about-creator' ? 'henry-active-doc' : ''}>
                                        <a href="#about-creator">{__('About the Creators', 'henry')}</a>
                                    </li>
                                    <li onClick={() => setActiveItem('support')}
                                        className={activeItem === 'support' ? 'henry-active-doc' : ''}>
                                        <a href="#support">{__('Support', 'henry')}</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </FlexItem>
            <FlexItem className={"henry-setup-content henry-setup-content-docs"}>
                <DocsIntroduction/>
				<GettingStarted/>
                <DocsBlockThemes/>
                <DocsResources/>
            </FlexItem>
        </Flex>
    )
}

export default Documentation;
