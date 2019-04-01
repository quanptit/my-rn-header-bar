import { ReactChild } from 'react';
import { StyleProp, ViewStyle, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { PureComponentSkipFunction } from "my-rn-base-component";
export interface HeaderBindScrollContentRenderProps {
    contentContainerStyle: StyleProp<ViewStyle>;
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    setTopTabbar: (top: number) => void;
}
interface Props {
    id?: number | string;
    renderHeaderBar: () => ReactChild;
    renderContent: (props: HeaderBindScrollContentRenderProps) => ReactChild;
    style?: StyleProp<ViewStyle>;
}
/**
 * Container thường sử dụng làm screen chứa header và list content. Có thể hide header khi scroll list content
 * Cách sử dụng:
 *
 <VContainerHeaderBindScroll
 renderHeaderBar={() => {
                    return <HeaderBar leftButton={{iconName: "md-menu", onPress: Actions.drawerOpen}}
                                      title={title} disableShadow
                                      colors={{statusBarColor: Colors.primaryDaskColor, background: Colors.primaryColor, textColor: Colors.onPrimaryColor}}/>

                }}
 renderContent={(props: HeaderBindScrollContentRenderProps) => {
                    return (
                        <ListLesson
                        ......
                        contentContainerStyle={props.contentContainerStyle}
                        onScroll={props.onScroll}
                        ....
                         />
                    );
                }}
 />
 - Hàm renderContent cần truyền 2 thuộc tính contentContainerStyle, onScroll vào props của ScrollView
 * */
export declare class VContainerHeaderBindScroll extends PureComponentSkipFunction<Props, any> {
    private currentTop;
    private currentScrollYValue;
    private topY;
    private onScroll;
    private _setTopTabbar;
    render(): JSX.Element;
    static getHeightHeaderBar(): number;
}
export {};
