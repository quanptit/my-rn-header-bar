import { ReactChild } from 'react';
import Orientation from 'react-native-orientation';
import { PureComponentSkipFunction } from "my-rn-base-component";
import { CommonUtils } from "my-rn-base-utils";
export interface HeaderColors {
    background: string;
    statusBarColor: string;
    textColor: string;
}
interface Props {
    leftButton?: {
        iconName: string;
        onPress: VoidFunction;
    };
    colors: HeaderColors;
    renderRightAction?: () => ReactChild;
    title?: string;
    id?: string;
    hideStatusBar?: boolean;
    hideStatusBarWhenLanscape?: boolean;
    disableShadow?: boolean;
}
/**Chỉ thay đổi khi id hoặc title thay đổi*/
export declare class HeaderBar extends PureComponentSkipFunction<Props, {
    orientation: Orientation.orientation;
}> {
    static defaultProps: {
        hideStatusBarWhenLanscape: boolean;
        leftButton: {
            iconName: string;
            onPress: typeof CommonUtils.onBackPress;
        };
    };
    constructor(props: Props);
    private _orientationDidChange;
    componentDidMount(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: Props, nextState: any): boolean;
    private _renderLeftButton;
    private _renderHeaderBar;
    private _renderTitle;
    render(): JSX.Element;
}
export declare function getHeaderConstants(): {
    toolbarHeightVertical: number;
    toolbarHeightLanscape: number;
    toolbarHeightLanscapeNoStatus: number;
    toolbarIconSize: number;
    paddingTopHeader: number;
};
export {};
