import {Dimensions} from 'react-native';

// app 只有竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


const vPercentToDp = (percent) => {
    return percent * deviceHeight / 100.0;
}


const hPercentToDp = (percent) => {
    return percent * deviceWidthDp / 100.0;
}


const image = (width, height) => {
    return height * deviceWidthDp / width;
}

export default {
    vPercentToDp: vPercentToDp,
    hPercentToDp: hPercentToDp,
    image: image
};