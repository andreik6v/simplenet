import {useContext, useEffect} from "@wordpress/element";
import {
    Flex,
    FlexItem,
    TextControl,
    RadioControl,
} from '@wordpress/components';
import {SettingsContext} from "../../context/SettingsContext";

const {__} = wp.i18n;

function SiteSetup() {
    const {settings, updateSetting, pageStart} = useContext(SettingsContext);

    useEffect(() => {
        // Set focus.
        pageStart.current.focus();
    }, []);

    return (
        <section>
            <div className="henry-setting-fields">
                <Flex className="henry-setting-intro">
                    <FlexItem>
                        <h2 ref={pageStart}>{__('Site Settings', 'henry')}</h2>
                        <p>{__('Let\'s start with the basics and set up a few important site-wide settings. All settings in this wizard are optional.', 'henry')}</p>
                    </FlexItem>
                </Flex>
                <Flex className="henry-setting-field">
                    <FlexItem>
                        <label for="site-title">{__('Site Title', 'henry')}</label>
                        <p>{__('Name of your website or brand', 'henry')}</p>
                    </FlexItem>
                    <FlexItem>
                        <TextControl
                            id="site-title"
                            value={settings.site_title}
                            placeholder={__('henry Site', 'henry')}
                            onChange={(value) => {
                                updateSetting("site_title", value);
                            }}
                        />
                    </FlexItem>
                </Flex>
                <Flex className="henry-setting-field">
                    <FlexItem>
                        <label for="site-tagline">{__('Site Tagline', 'henry')}</label>
                        <p>{__('In a few words, explain what the site is about', 'henry')}</p>
                    </FlexItem>
                    <FlexItem>
                        <TextControl
                            id="site-tagline"
                            value={settings.site_tagline}
                            placeholder={__('This is my cool website', 'henry')}
                            onChange={(value) => {
                                updateSetting("site_tagline", value);
                            }}
                        />
                    </FlexItem>
                </Flex>
                <Flex className="henry-setting-field">
                    <FlexItem>
                        <label for="site-permalinks">{__('URL Style', 'henry')}</label>
                        <p>{__('Choose between descriptive permalinks or number-based permalinks.', 'henry')}</p>
                    </FlexItem>
                    <FlexItem>
                        <RadioControl
                            className="henry-permalink-radio"
                            id="homepage-display"
                            selected={settings.permalink_structure}
                            options={[
                                {label: 'Post Name', value: 'postname'},
                                {label: 'Plain', value: 'plain'},
                            ]}
                            onChange={(value) => {
                                updateSetting("permalink_structure", value);
                            }}
                        />
                    </FlexItem>
                </Flex>
            </div>
        </section>
    )
}

export default SiteSetup;
