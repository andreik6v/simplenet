import {useContext, useEffect, useState} from "@wordpress/element";
import {
    Button,
    Flex,
    FlexItem,
    Animate,
    Notice,
	__experimentalNavigatorButton as NavigatorButton,
} from '@wordpress/components';
import Confetti from '../partials/Confetti';
import apiFetch from '@wordpress/api-fetch';
import {SettingsContext} from "../../context/SettingsContext";

const {__} = wp.i18n;

function FinishSetup() {
    const {pageStart, setActiveItem} = useContext(SettingsContext);
    const [childThemeCreated, setChildThemeCreated] = useState(false);

    const createChildTheme = () => {
        apiFetch({
            path: '/henry/v1/create-child-theme',
            method: 'POST',
        });

        setChildThemeCreated(true);

        setTimeout(function () {
            setChildThemeCreated(false);
        }, 4000);
    }

    const completeOnboarding = () => {
        apiFetch({
            path: '/henry/v1/complete-onboarding',
            method: 'POST',
        });
    }

    useEffect(() => {
        // Set focus.
        pageStart.current.focus();
        completeOnboarding();

    }, []);

    return (
        <>
            <Confetti/>
            <section>
                <div className="henry-setting-fields">
                    <Flex className="henry-setting-intro">
                        <FlexItem>
                            <h2 ref={pageStart}>{__('Setup complete!', 'henry')}</h2>
                            <p>{__('You did it! Your theme setup is complete. What would you like to do next?', 'henry')}</p>
                        </FlexItem>
                    </Flex>
                    <Flex className="henry-setting-field">
                        <FlexItem>
                            <label for="view-site">{__('View Your Site', 'henry')}</label>
                            <p>{__('Open your site to check out the live front-end view.', 'henry')}</p>
                        </FlexItem>
                        <FlexItem>
                            <Button id="view-site" isSecondary href={options.home_link}
                                    target="_blank">{__('View Your Site', 'henry')}</Button>
                        </FlexItem>
                    </Flex>
                    <Flex className="henry-setting-field">
                        <FlexItem>
                            <label for="edit-homepage">{__('Edit Your Homepage', 'henry')}</label>
                            <p>{__('Go to the Site Editor to view and edit your homepage and customize your site.', 'henry')}</p>
                        </FlexItem>
                        <FlexItem>
                            <Button id="edit-homepage" isSecondary href={options.dashboard_link + 'site-editor.php'}>{__('Edit Homepage', 'henry')}</Button>
                        </FlexItem>
                    </Flex>
                    <Flex className="henry-setting-field">
                        <FlexItem>
                            <label for="view-docs">{__('View henry Docs', 'henry')}</label>
                            <p>{__('Watch tutorial videos and read through the docs to learn how to build beautiful websites with henry.', 'henry')}</p>
                        </FlexItem>
                        <FlexItem>
							<NavigatorButton 
								id="view-docs"
								isSecondary 
								onClick={() => setActiveItem('/documentation')}
								path="/documentation">
									{__('View henry Docs', 'henry')}
							</NavigatorButton>
                        </FlexItem>
                    </Flex>
                    <Flex className="henry-setting-field">
                        <FlexItem>
                            <label for="child-theme">{__('Create Child Theme', 'henry')}</label>
                            <p>{__('Do you want to activate a child theme where you can further customize the henry theme code?', 'henry')}</p>
                        </FlexItem>
                        <FlexItem>
                            <Button onClick={createChildTheme}
                                    className="henry-wizard-button"
                                    variant="secondary">{__('Create and Activate', 'henry')}</Button>
                            {childThemeCreated &&
                                <Animate type="slide-in" options={{origin: 'top'}}>
                                    {() => (
                                        <Notice status="success" isDismissible={false}>
                                            <p>
                                                {__('Child theme created and activated.', 'henry')}
                                            </p>
                                        </Notice>
                                    )}
                                </Animate>
                            }
                        </FlexItem>
                    </Flex>
                </div>
            </section>
        </>
    )
}

export default FinishSetup;
