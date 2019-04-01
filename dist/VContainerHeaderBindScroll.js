import React from 'react';
import { StyleSheet, Animated } from "react-native";
import { getHeaderConstants } from "./HeaderBar";
import { Col, PureComponentSkipFunction } from "my-rn-base-component";
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
export class VContainerHeaderBindScroll extends PureComponentSkipFunction {
    constructor() {
        super(...arguments);
        this.currentTop = 0;
        this.currentScrollYValue = 0;
        this.topY = new Animated.Value(0);
        //endregion
    }
    onScroll(event) {
        let scrollY = event.nativeEvent.contentOffset.y;
        if (scrollY <= 0) {
            if (this.currentTop == 0)
                return;
            this.currentTop = 0;
            this._setTopTabbar();
            return;
        }
        let offset = scrollY - this.currentScrollYValue;
        this.currentScrollYValue = scrollY;
        if (offset > 0) { // Dang move Scroll Xuong cuoi list => Hide Tabbar
            if (this.currentTop <= -VContainerHeaderBindScroll.getHeightHeaderBar())
                return;
            this.currentTop -= offset;
            this._setTopTabbar();
        }
        else {
            if (this.currentTop == 0)
                return;
            this.currentTop += (-offset);
            this._setTopTabbar();
        }
    }
    _setTopTabbar() {
        let MAX_TOP = VContainerHeaderBindScroll.getHeightHeaderBar();
        if (this.currentTop < -MAX_TOP)
            this.currentTop = -MAX_TOP;
        else if (this.currentTop > 0)
            this.currentTop = 0;
        this.topY.setValue(this.currentTop);
    }
    render() {
        return (<Col flex={1} style={this.props.style}>
                {this.props.renderContent({
            contentContainerStyle: { paddingTop: VContainerHeaderBindScroll.getHeightHeaderBar() },
            onScroll: this.onScroll.bind(this),
            setTopTabbar: (top) => {
                this.topY.setValue(top);
                this.currentTop = top;
            }
        })}
                <Animated.View style={[styles.header, { top: this.topY }]}>
                    {this.props.renderHeaderBar()}
                </Animated.View>
            </Col>);
    }
    //region utils
    static getHeightHeaderBar() {
        return getHeaderConstants().toolbarHeightVertical;
    }
}
const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    }
});
