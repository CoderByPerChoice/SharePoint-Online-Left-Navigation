import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ContextualMenuItemType, IContextualMenuProps, ContextualMenu, DirectionalHint } from 'office-ui-fabric-react/lib/ContextualMenu';

export default function Navigation() {
    const menuProps = useConst<IContextualMenuProps>(() => ({
        shouldFocusOnMount: true,
        hidden: false,
        items: [
            {
                key: 'Actions',
                itemType: ContextualMenuItemType.Header,
                text: 'Actions',
                itemProps: { lang: 'en-us' },
            },
            {
                key: 'upload',
                iconProps: { iconName: 'Upload', style: { color: 'salmon' } },
                text: 'Upload',
                title: 'Upload a file',
            },
            { key: 'rename', text: 'Rename' },
            {
                key: 'share',
                iconProps: { iconName: 'Share' },
                subMenuProps: {
                    items: [
                        { key: 'sharetoemail', text: 'Share to Email', iconProps: { iconName: 'Mail' } },
                        { key: 'sharetofacebook', text: 'Share to Facebook' },
                        { key: 'sharetotwitter', text: 'Share to Twitter', iconProps: { iconName: 'Share' } },
                    ],
                },
                text: 'Sharing',
                ariaLabel: 'Sharing. Press enter, space or right arrow keys to open submenu.',
            },
            {
                key: 'navigation',
                itemType: ContextualMenuItemType.Header,
                text: 'Navigation',
            },
            { key: 'properties', text: 'Properties' },
            { key: 'print', iconProps: { iconName: 'Print' }, text: 'Print' },
            { key: 'Bing', text: 'Go to Bing', href: 'http://www.bing.com', target: '_blank' },
        ],
    }));

    return (
        <>
            <DefaultButton text="Navigation" menuProps={menuProps} />
            {/*Uncomment for floating left navigation.*/}
            {/* <ContextualMenu
                shouldFocusOnMount={true}
                shouldFocusOnContainer={true}
                target={{ x: 49, y: 158 }}
                items={
                    [
                        {
                            key: 'Actions',
                            itemType: ContextualMenuItemType.Header,
                            text: 'Actions',
                            itemProps: { lang: 'en-us' },
                        },
                        {
                            key: 'upload',
                            iconProps: { iconName: 'Upload', style: { color: 'salmon' } },
                            text: 'Upload',
                            title: 'Upload a file',
                        },
                        { key: 'rename', text: 'Rename' },
                        {
                            key: 'share',
                            iconProps: { iconName: 'Share' },
                            subMenuProps: {
                                items: [
                                    { key: 'sharetoemail', text: 'Share to Email', iconProps: { iconName: 'Mail' } },
                                    { key: 'sharetofacebook', text: 'Share to Facebook' },
                                    { key: 'sharetotwitter', text: 'Share to Twitter', iconProps: { iconName: 'Share' } },
                                ],
                            },
                            text: 'Sharing',
                            ariaLabel: 'Sharing. Press enter, space or right arrow keys to open submenu.',
                        },
                        {
                            key: 'navigation',
                            itemType: ContextualMenuItemType.Header,
                            text: 'Navigation',
                        },
                        { key: 'properties', text: 'Properties' },
                        { key: 'print', iconProps: { iconName: 'Print' }, text: 'Print' },
                        { key: 'Bing', text: 'Go to Bing', href: 'http://www.bing.com', target: '_blank' },
                    ]
                }
                hidden={false}
            /> */}
        </>
    );
}

function useConst<T>(initialValue: T | (() => T)): T {
    // Use useRef to store the value because it's the least expensive built-in hook that works here
    // (we could also use `const [value] = React.useState(initialValue)` but that's more expensive
    // internally due to reducer handling which we don't need)
    const ref = React.useRef<{ value: T }>();
    if (ref.current === undefined) {
        // Box the value in an object so we can tell if it's initialized even if the initializer
        // returns/is undefined
        ref.current = {
            value: typeof initialValue === 'function' ? (initialValue as Function)() : initialValue,
        };
    }
    return ref.current.value;
}