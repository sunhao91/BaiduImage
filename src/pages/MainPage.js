import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

import {queryMain} from '../actions/image';
import Carousel from "react-native-looped-carousel";
import {Actions} from 'react-native-router-flux'

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
    pic_author_name: {
        color: 'white',
        position: 'absolute',
        right: 10,
        fontSize: 10,
        backgroundColor: 'transparent',
        bottom: 10
    },
    hot_search_wrapper: {
        position: 'absolute',
        left: 15,
        width: 200,
        bottom: 200
    },
    hot_search_title: {
        color: 'white',
        fontSize: 24,
        backgroundColor: 'transparent',
    },
    hot_search_tag: {
        color: 'white',
        backgroundColor: 'transparent',
        width: 60,
        height: 30,
        fontSize: 14,
    }
});

class MainPage extends Component {
    constructor(props) {
        super(props);
    }


    // 在组件挂载之前调用一次。
    componentWillMount() {
        const {actions} = this.props;
        actions.queryMain()
    }

    render() {
        const {state, actions} = this.props;
        let backgrounds = state.backgrounds;
        let tags = state.tags;
        console.log(tags)
        if (!backgrounds || backgrounds.length < 1) {
            return (<View style={styles.wrapper}><Text style={styles.loading}>加载中。。。 </Text></View>)
        }
        return (
            <View style={styles.wrapper}>
                <Carousel
                    delay={5000}
                    style={styles.carousel}>
                    {backgrounds.map((value, i) =>
                        <ImageBackground key={i} source={{uri: 'http:' + value.url}} style={styles.content}>
                            <Text style={styles.pic_author_name}> {value.name}</Text>
                        </ImageBackground>
                    )}
                </Carousel>
                <View style={styles.hot_search_wrapper}>
                    <Text style={styles.hot_search_title}>热搜分类</Text>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 20,
                        flexWrap: 'wrap'

                    }}>
                        {tags.map((item, i) => <Text key={i} style={styles.hot_search_tag} onPress={() => Actions.search({title:item.name, bundle:item})}>{item.name}</Text>)}
                    </View>
                </View>
            </View>
        );
    }
}


export const mapStateToProps = ({main}) => ({state: main});
export const mapDispatchToProps = dispatch => ({actions: bindActionCreators({queryMain}, dispatch)});
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
