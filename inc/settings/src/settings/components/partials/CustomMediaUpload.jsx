import {MediaUpload} from '@wordpress/block-editor';
import {Button, Flex, FlexItem} from '@wordpress/components';

const {__} = wp.i18n;

function CustomMediaUpload(props) {

    return <MediaUpload
        onSelect={media => {
            props.onMediaSelected(media.url)
        }}
        type="image"
        value={props.mediaUrl}
        render={
            ({open}) => {
                if (props.mediaUrl) {
                    return <>
                        <Flex gap="20px" direction="column">
                            <FlexItem>
                                <Button isSecondary onClick={() => {
                                    props.onMediaSelected(null)
                                }}>{__('Remove Image', 'henry')}</Button>
                            </FlexItem>
							<FlexItem className="henry-upload-preview">
                                <img src={props.mediaUrl}/>
                            </FlexItem>
                        </Flex>
                    </>;
                }
                return <Button id={props.labelId} isSecondary onClick={open}>{__('Select Image', 'henry')}</Button>;
            }
        }/>;
}

export {CustomMediaUpload};
