import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, ImageBackground, ScrollView} from 'react-native';
import {queryByKey} from "../actions/image";
import AutoResponsive from 'autoresponsive-react-native'

const styles = StyleSheet.create({
    searchButton: {
        marginRight: 10,
        padding: 5
    },
    wrapper: {
        flex: 1
    },
    loading: {},
    carousel: {
        flex: 1
    },
    content: {
        flex: 1
    },
    pic_title: {
        position: 'absolute',
        bottom: 0,
        width:160,
        color: 'white',
        fontSize: 14,
        textAlign: 'center',

    },
});

class SearchPage extends Component {
    _item_width = 1;

    constructor(props) {
        super(props);
    }


    // 在组件挂载之前调用一次。
    componentWillMount() {
        const {actions, bundle} = this.props;
        let tag = bundle.name;
        actions.queryByKey(tag, 0, 30)
    }

    __getHeight(width, item) {
        return width / item.width * item.height;
    }

    render() {
        const {state, actions} = this.props;
        let foundImages = state.foundImages;

        if (!foundImages || foundImages.length < 1) {
            return (<View style={styles.wrapper}><Text style={styles.loading}>加载中。。。 </Text></View>)
        } else {
            return (
                <ScrollView style={{flex: 1}}>
                    <AutoResponsive style={{flex: 1, backgroundColor: 'red', itemMargin: 10}}>
                        {foundImages.map((item, i) =>
                            <View key={i} style={[{height: this.__getHeight(160, item) + 10, width: 160 + 20}]}>
                                <ImageBackground source={{uri: item.thumburl}}
                                                 style={[{
                                                     height: this.__getHeight(160, item),
                                                     width: 160,
                                                     marginLeft: 10
                                                 }]}>
                                    <Text style={styles.pic_title}>{item.title}</Text>
                                </ImageBackground>
                            </View>
                        )}
                    </AutoResponsive>
                </ScrollView>
            )
        }


    }
}


export const mapStateToProps = ({search}) => ({state: search});
export const mapDispatchToProps = dispatch => ({actions: bindActionCreators({queryByKey}, dispatch)});
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
