## Installation

##### Thêm Vào package.json
```
"my-rn-header-bar": "git+https://gitlab.com/react-native-my-libs/my-rn-header-bar.git",
```

Chạy  lệnh sau
```
yarn install
```

## Sử dụng
Content của container header phải có style được truyền "contentContainerStyle"
phải gọi hàm onScroll khi scroll event sảy ra trong content

```javascript
render() {
        let {title, display, key} = this.props.menuItem;
        title = display || title;
        key += this.state.extraData;
        return (
            <VContainerHeaderBindScroll
                id={key}
                style={styles.bgMain}
                renderHeaderBar={() => {
                    return <HeaderBar leftButton={{iconName: "md-menu", onPress: Actions.drawerOpen}}
                                      title={title} disableShadow
                                      colors={{statusBarColor: Colors.primaryDaskColor, background: Colors.primaryColor, textColor: Colors.onPrimaryColor}}/>

                }}
                renderContent={(props: HeaderBindScrollContentRenderProps) => {
                    try { props.setTopTabbar(0);} catch (e) {sendError(e) }
                    return (
                        <VContainerLoad key={key}
                                        isShowProgressLoading
                                        loadDataAsync={this.getListLesson.bind(this)}
                                        onRender={() => this._renderTab(props)}/>
                    );
                }}
            />
        );
    }


private _renderTabContent(props: HeaderBindScrollContentRenderProps, scene: SceneRendererProps<TabRouter>): ReactChild {
        let route = scene.route;
        let {contentContainerStyle, onScroll} = props;
        return (
            <ListLesson
                key={route.key}
                listItems={route.key == "incomplete" ? this.listItemLearning : this.listItemComplete}
                contentContainerStyle={contentContainerStyle}
                onScroll={onScroll}
                renderRowLesson={RenderListLessonUtils.renderRowLesson}
                renderRowAdsLesson={RenderListLessonUtils.renderRowAdsLesson}
                renderRowPreferAds={RenderListLessonUtils.renderRowPreferAds}
                onPressRowLesson={HomeScreen.onPressRowLesson}
                subMeuSetting={null} // SubMenuSettingObj[]
                hideDownloadBtn={false}
                saveObjectFirebaseRef={FirebaseUtils.saveObject}
                ListEmptyComponent={route.key == "incomplete" ? HomeScreen._renderEmptyLearningTab : HomeScreen._renderEmptyCompleteTab}
            />
        );
    }
```
