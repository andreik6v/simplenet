import {useState, useEffect, useContext} from "@wordpress/element";
import {
	Button,
	Flex,
	FlexItem,
	ColorPalette,
	SelectControl, 
	ColorIndicator,
	Modal,
} from '@wordpress/components';
import {SettingsContext} from "../../context/SettingsContext";
import {CustomMediaUpload} from "../partials/CustomMediaUpload";
import {CustomLogoUpload} from "../partials/CustomLogoUpload";
import browserIcon from '../../assets/images/browser-icon.svg';

import EmojiPicker, {
	EmojiStyle,
	Emoji,
} from "emoji-picker-react";


// Import Styles.
import blueJson from '../../../../../../../henry/styles/blue.json';
import greenJson from '../../../../../../../henry/styles/green.json';
import orangeJson from '../../../../../../../henry/styles/orange.json';
import pinkJson from '../../../../../../../henry/styles/pink.json';
import redJson from '../../../../../../../henry/styles/red.json';
import tealJson from '../../../../../../../henry/styles/teal.json';

const {__} = wp.i18n;

function BrandSetup() {
	const {settings, updateSetting, pageStart} = useContext(SettingsContext);
	const [siteLogo, setSiteLogo] = useState(false);
	const [palettes, setPalettes] = useState({});
	const [brandColor, setBrandColor] = useState();
	const [style, setStyle] = useState('standard');
	const [siteIcon, setSiteIcon] = useState(false);
	const [isModalOpen, setModalOpen] = useState(false);

	const loadStyles = () => {
		// Restructure styles for color palette component.
		let blueStyle = [];

		blueJson.settings.color.palette.forEach(function (item) {
			item.name = item.slug;
			delete item.slug;
			blueStyle.push(item);
		});

		let greenStyle = [];

		greenJson.settings.color.palette.forEach(function (item) {
			item.name = item.slug;
			delete item.slug;
			greenStyle.push(item);
		});

		let orangeStyle = [];

		orangeJson.settings.color.palette.forEach(function (item) {
			item.name = item.slug;
			delete item.slug;
			orangeStyle.push(item);
		});

		let pinkStyle = [];

		pinkJson.settings.color.palette.forEach(function (item) {
			item.name = item.slug;
			delete item.slug;
			pinkStyle.push(item);
		});

		let redStyle = [];

		redJson.settings.color.palette.forEach(function (item) {
			item.name = item.slug;
			delete item.slug;
			redStyle.push(item);
		});

		let tealStyle = [];

		tealJson.settings.color.palette.forEach(function (item) {
			item.name = item.slug;
			delete item.slug;
			tealStyle.push(item);
		});

		setPalettes(
			{
				'blue': blueStyle,
				'green': greenStyle,
				'orange': orangeStyle,
				'pink': pinkStyle,
				'red': redStyle,
				'teal': tealStyle
			}
		);
	}

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);
	const onSelectEmoji = (emojiData) => {
		updateSetting("site_icon", emojiData.getImageUrl());
		setSiteIcon(emojiData.getImageUrl());
		closeModal();
	}

	useEffect(() => {
		// Set focus.
		pageStart.current.focus();
		loadStyles();

		if (settings.brand_color) {
			setBrandColor(settings.brand_color);
		}

		if (settings.style) {
			setStyle(settings.style);
		}

		if (settings.site_logo) {
			setSiteLogo(settings.site_logo);
		}

		if (settings.site_icon) {
			setSiteIcon(settings.site_icon);
		}
	}, [settings]);

	return (
		<section>
			<div className="henry-setting-fields">
				<Flex className="henry-setting-intro">
					<FlexItem>
						<h2 ref={pageStart}>{__('Your Brand', 'henry')}</h2>
						<p>{__('Next, let\'s customize the colors on your site to match your brand. ', 'henry')}</p>
					</FlexItem>
				</Flex>
				<Flex className="henry-setting-field">
					<FlexItem>
						<label htmlFor="henry-color-palette">{__('Color Palette', 'henry')}</label>
						<p>{__('Choose a color palette that closely matches your brand. You can customize this later in Global Styles.', 'henry')}</p>
					</FlexItem>
					<FlexItem>
						<SelectControl
							id={"henry-color-palette"}
							label="Styles"
							value={style}
							options={[
								{label: 'Blue', value: 'blue'},
								{label: 'Green', value: 'green'},
								{label: 'Orange', value: 'orange'},
								{label: 'Pink', value: 'pink'},
								{label: 'Red', value: 'red'},
								{label: 'Teal', value: 'teal'},
							]}
							onChange={(value) => {
								setStyle(value);
								updateSetting("style", value);
							}}
						/>
						{palettes[style] ?
							<div className={"palette-preview-container"}>
								{palettes[style].map(item => <ColorIndicator key={item.name} colorValue={item.color}/>)}
							</div>
							:
							<>
								{palettes.blue &&
									<div className={"palette-preview-container"}>
										{palettes.blue.map(item => <ColorIndicator key={item.name}
																					 colorValue={item.color}/>)}
									</div>
								}
							</>
						}
					</FlexItem>
				</Flex>
				<Flex className="henry-setting-field">
					<FlexItem>
						<label for="brand-color">{__('Brand Color', 'henry')}</label>
						<p>{__('Add your brand color to be used as the main accent color on your site.', 'henry')}</p>
					</FlexItem>
					<FlexItem>
						{palettes[style] ?
							<ColorPalette
								colors={palettes[style]}
								value={brandColor}
								onChange={(color) => {
									setBrandColor(color);
									updateSetting("brand_color", color);
								}}
							/>
							:
							<>
								{palettes.blue &&
									<ColorPalette
										colors={palettes.blue}
										value={brandColor}
										onChange={(color) => {
											setBrandColor(color);
											updateSetting("brand_color", color);
										}}
									/>
								}
							</>
						}
					</FlexItem>
				</Flex>
				<Flex className="henry-setting-field">
					<FlexItem>
						<label for="site-logo">{__('Logo', 'henry')}</label>
						<p>{__('Choose an image to be used for your Site Logo. Your site title will be used if no logo is set.', 'henry')}</p>
					</FlexItem>
					<FlexItem>
						<div className={"site-logo-preview"}>
							<CustomLogoUpload
								labelId="site-logo"
								mediaId={siteLogo}
								onMediaSelected={(value) => {
									updateSetting("site_logo", value);
									setSiteLogo(value);
								}}
							/>
						</div>
					</FlexItem>
				</Flex>
				<Flex className="henry-setting-field">
					<FlexItem>
						<label for="site-icon">{__('Site Icon', 'henry')}</label>
						<p>{__('Select a small, square icon to display in your browser tab.', 'henry')}</p>
					</FlexItem>
					<FlexItem>
						<Flex gap="0" direction="column" className="henry-setting-button-column">
							<FlexItem>
								<CustomMediaUpload
									labelId="site-icon"
									onMediaSelected={(value) => {
										updateSetting("site_icon", value);
										setSiteIcon(value);
									}}
								/>
								<small>{__('Upload a small image icon to use as a site icon.', 'henry')}</small>
							</FlexItem>
							<FlexItem>
								<Button variant="secondary" onClick={openModal}>
									{__('Choose Emoji', 'henry')}
								</Button>
								<small>{__('Alternatively, you can choose an emoji as a site icon.', 'henry')}</small>
								{isModalOpen && (
									<Modal title={__('Choose an emoji as your site icon.', 'henry')}
										onRequestClose={closeModal}>
										<EmojiPicker
											onEmojiClick={onSelectEmoji}
											autoFocusSearch={false}
											previewConfig={{
												defaultCaption: __('Choose an emoji as your site icon.', 'henry'),
												defaultEmoji: "1f389"
											}}
											emojiStyle={EmojiStyle.NATIVE}
										/>
									</Modal>
								)}
							</FlexItem>
						</Flex>
						{siteIcon ? (
							<div className="henry-site-icon-wrap">
								<div className="henry-site-icon-box">
									<img src={siteIcon} alt={__('Site Icon', 'henry')}/>
								</div>
								<img src={browserIcon} />
							</div>
						) : ''}
					</FlexItem>
				</Flex>
			</div>
		</section>
	)
}

export default BrandSetup;
