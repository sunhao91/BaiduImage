/*
 * action 类型
 */
import axios from 'axios'

export const QUERY_MAIN = 'QUERY_MAIN';
export const QUERY_IMAGE_BY_KEY = 'QUERY_IMAGE_BY_KEY';

/*
 * action 创建函数
 */
export function queryMain() {
    return dispatch => {
        axios.get('http://image.baidu.com/wisehomepage/feeds')
            .then(response => response.data)
            .then(data => {
                let bgLeftKey = 'maincontent.init(';
                let bgRightKey = ', {"querylist":';
                let bgStart = data.indexOf(bgLeftKey) + bgLeftKey.length
                let bgEnd = data.indexOf(bgRightKey, bgStart);
                let allBg = JSON.parse(data.substr(bgStart, bgEnd - bgStart));

                let hotRightKey = ');';
                let hotStart = bgEnd + 2;
                let hotEnd = data.indexOf(hotRightKey, hotStart);
                let allHots = JSON.parse(data.substr(hotStart, hotEnd - hotStart));

                let backgrounds = [];
                allBg['bglist'].map((item) => {
                    backgrounds.push({
                        url: item['objurl'],
                        name: item['title'] + item['photographer'],
                        remoteUrl: item['photographerurl']
                    })
                });
                let hots = [];
                allHots['querylist'].map((item) => {
                    hots.push({
                        name: item['query'],
                        remoteUrl: item['promoteurl']
                    })
                });
                dispatch({type: QUERY_MAIN, tags: hots, backgrounds: backgrounds})
            })
    }
}

export function suggestion(key) {
    let time = ''
    let zepto = ''
    return dispatch => {
        axios.get('https://sp1.baidu.com/8qUZeT8a2gU2pMbgoY3K/su/su?prod=image&ie=utf-8&wd='
            + key + '&_=' + t + '&cb=Zepto' + zepto)
            .then(response => response.json())
            .then(data => {

                dispatch({type: QUERY_MAIN, tags: hots, backgrounds: backgrounds})
            })
    }
}

export function queryByKey(key, offset, len) {
    let pn = offset;
    let rn = len;
    let gsm = parseInt(pn).toString(16)

    return dispatch => {
        axios.get('https://image.baidu.com/search/wisejsonala?tn=wisejsonala&ie=utf8&cur=result&word='
            + key + '&fr=&catename=&pn=' + pn + '&rn=' + rn + '&gsm=' + gsm)
            .then(response => response.data)
            .then(data => {
                let images = []
                data.data.map((item, i) => {
                    images.push({
                        id: item['di'],
                        dataId: item['dataId'],
                        title: item['title'].replace("<strong>", '').replace('</strong>', ''),
                        sign: item['sign'],
                        thumburl: item['thumburl'],
                        setCount: item['img_set_count'],
                        setTag: item['set_tag'],
                        setSign: item['set_sign'],
                        oriWidth: item['ori_width'],
                        oriHeight: item['ori_height'],
                        width: item['width'],
                        height: item['height'],
                    })
                })
                dispatch({type: QUERY_IMAGE_BY_KEY, images: images, length: offset + len})
            })
    }
}

