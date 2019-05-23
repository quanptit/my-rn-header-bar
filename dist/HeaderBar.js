import React from 'react';
import Orientation from 'react-native-orientation';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ButtonModel, PureComponentSkipFunction, RenderUtils, Row, StyleUtils, TextCustom, Button } from "my-rn-base-component";
import { CommonUtils, isIOS } from "my-rn-base-utils";
import { isEqual } from "lodash";
const s = StyleUtils.getAllStyle();
let lastOrientation;
/**Chỉ thay đổi khi id hoặc title thay đổi*/
export class HeaderBar extends PureComponentSkipFunction {
    //endregion
    //region life
    constructor(props) {
        super(props);
        this.state = { orientation: lastOrientation || Orientation.getInitialOrientation() };
        this._orientationDidChange = this._orientationDidChange.bind(this);
    }
    _orientationDidChange(orientation) {
        lastOrientation = orientation;
        this.setState({ orientation: orientation });
    }
    componentDidMount() {
        Orientation.addOrientationListener(this._orientationDidChange);
        Orientation.getOrientation((error, orientation) => {
            if (orientation && orientation != this.state.orientation) {
                this._orientationDidChange(orientation);
            }
        });
    }
    componentWillUnmount() {
        Orientation.removeOrientationListener(this._orientationDidChange);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(this.props.hideStatusBar, nextProps.hideStatusBar) ||
            !isEqual(this.props.title, nextProps.title) || !isEqual(this.props.id, nextProps.id)
            || !isEqual(this.state, nextState) || !isEqual(this.props.hideStatusBarWhenLanscape, nextProps.hideStatusBarWhenLanscape);
    }
    //endregion
    _renderLeftButton() {
        return (<Button model={ButtonModel.transparent} onPress={this.props.leftButton.onPress} style={{ paddingTop: 0, paddingBottom: 0 }}>
                {RenderUtils.renderIcon(this.props.leftButton.iconName, 25, "white")}
            </Button>);
    }
    _renderHeaderBar(styleSize) {
        let style = [styleSize, styles.headerBarContainer];
        style.push({ backgroundColor: this.props.colors.background, borderBottomColor: this.props.colors.statusBarColor });
        if (!this.props.disableShadow)
            style.push(styles.shadow);
        return (<Row style={style}>
                {this._renderLeftButton()}
                {this._renderTitle()}
                {this.props.renderRightAction && this.props.renderRightAction()}
            </Row>);
    }
    _renderTitle() {
        if (this.props.title !== undefined)
            return <TextCustom numberOfLines={1} value={this.props.title} style={[styles.title, s.f_lar, { marginRight: 6, color: this.props.colors.textColor }]}/>;
        return this.props.children;
    }
    render() {
        let styleSize;
        let hideStatusBar = this.props.hideStatusBar || (this.props.hideStatusBarWhenLanscape && this.state.orientation === "LANDSCAPE");
        if (this.state.orientation === "LANDSCAPE") {
            if (hideStatusBar)
                styleSize = styles.sizeLanscapeHideStatusBar;
            else
                styleSize = styles.sizeLanscape;
        }
        else {
            styleSize = styles.sizeVertical;
        }
        return (<View>
                <StatusBar barStyle={"light-content"} backgroundColor={this.props.colors.statusBarColor} hidden={hideStatusBar}/>
                {this._renderHeaderBar(styleSize)}
            </View>);
    }
}
//region defaultProps and Variable
HeaderBar.defaultProps = {
    hideStatusBarWhenLanscape: true,
    leftButton: { iconName: "md-arrow-back", onPress: CommonUtils.onBackPress }
};
const statusH = getStatusBarHeight();
const Constants = {
    toolbarHeightVertical: isIOS() ? 45 + statusH : 48,
    toolbarHeightLanscape: isIOS() ? 35 + statusH : 40,
    toolbarHeightLanscapeNoStatus: isIOS() ? 25 + statusH : 40,
    toolbarIconSize: isIOS() ? 20 : 22,
    paddingTopHeader: isIOS() ? statusH : 0,
};
export function getHeaderConstants() {
    return Constants;
}
const styles = StyleSheet.create({
    title: {
        textAlignVertical: "center",
        marginLeft: 3,
        marginRight: 3,
        flex: 1,
    },
    sizeVertical: {
        height: Constants.toolbarHeightVertical
    },
    sizeLanscape: {
        height: Constants.toolbarHeightLanscape
    },
    sizeLanscapeHideStatusBar: {
        height: Constants.toolbarHeightLanscapeNoStatus
    },
    headerBarContainer: {
        paddingRight: 3,
        paddingTop: Constants.paddingTopHeader,
    },
    shadow: Platform.select({
        ios: {
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowRadius: StyleSheet.hairlineWidth,
            shadowOffset: {
                height: StyleSheet.hairlineWidth,
            }
        },
        android: { elevation: 4, borderBottomWidth: Platform.Version >= 21 ? 0 : 1 }
    })
});
