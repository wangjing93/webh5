/* *
 * 全局空间 Vcity
 * */
var Vcity = {};
/* *
 * 静态方法集
 * @name _m
 * */
Vcity._m = {
    /* 选择元素 */
    $:function (arg, context) {
        var tagAll, n, eles = [], i, sub = arg.substring(1);
        context = context || document;
        if (typeof arg == 'string') {
            switch (arg.charAt(0)) {
                case '#':
                    return document.getElementById(sub);
                    break;
                case '.':
                    if (context.getElementsByClassName) return context.getElementsByClassName(sub);
                    tagAll = Vcity._m.$('*', context);
                    n = tagAll.length;
                    for (i = 0; i < n; i++) {
                        if (tagAll[i].className.indexOf(sub) > -1) eles.push(tagAll[i]);
                    }
                    return eles;
                    break;
                default:
                    return context.getElementsByTagName(arg);
                    break;
            }
        }
    },

    /* 绑定事件 */
    on:function (node, type, handler) {
        node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
    },

    /* 获取事件 */
    getEvent:function(event){
        return event || window.event;
    },

    /* 获取事件目标 */
    getTarget:function(event){
        return event.target || event.srcElement;
    },

    /* 获取元素位置 */
    getPos:function (node) {
        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
                scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        var pos = node.getBoundingClientRect();
        return {top:pos.top + scrollt, right:pos.right + scrollx, bottom:pos.bottom + scrollt, left:pos.left + scrollx }
    },

    /* 添加样式名 */
    addClass:function (c, node) {
        if(!node)return;
        node.className = Vcity._m.hasClass(c,node) ? node.className : node.className + ' ' + c ;
    },

    /* 移除样式名 */
    removeClass:function (c, node) {
        var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g");
        if(!Vcity._m.hasClass(c,node))return;
        node.className = reg.test(node.className) ? node.className.replace(reg, '') : node.className;
    },

    /* 是否含有CLASS */
    hasClass:function (c, node) {
        if(!node || !node.className)return false;
        return node.className.indexOf(c)>-1;
    },

    /* 阻止冒泡 */
    stopPropagation:function (event) {
        event = event || window.event;
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    },
    /* 去除两端空格 */
    trim:function (str) {
        return str.replace(/^\s+|\s+$/g,'');
    }
};

/* 所有城市数据,可以按照格式自行添加（北京|beijing|bj），前16条为热门城市 */

//Vcity.allCity = ['北京|beijing|bj','上海市|shanghai|sh','广州市|guangzhou|gz','深圳市|shenzhen|sz','南京市|nanjing|nj','杭州市|hangzhou|hz','天津市|tianjin|tj','重庆市|chongqing|cq','成都市|chengdu|cd','青岛市|qingdao|qd','苏州市|shuzhou|sz','无锡市|wuxi|wx','常州市|changzhou|cz','温州市|wenzhou|wz','武汉市|wuhan|wh','长沙市|changsha|cs','石家庄市|shijiazhuang|sjz','南昌市|nanchang|nc','三亚市|sanya|sy','合肥市|hefei|hf','郑州市|zhengzhou|zz','保定市|baoding|bd','唐山市|tangshan|ts','秦皇岛市|qinhuangdao|qhd','邯郸市|handan|hd','邢台市|xingtai|xt','张家口市|zhangjiakou|zjk','承德市|chengde|cd','衡水市|hengshui|hs','廊坊市|langfang|lf','沧州市|cangzhou|cz','太原市|taiyuan|ty','大同市|datong|dt','阳泉市|yangquan|yq','长治市|changzhi|cz','晋城市|jincheng|jc','朔州市|shuozhou|sz','晋中市|jinzhong|jz','运城市|yuncheng|yc','忻州市|xinzhou|xz','临汾市|linfen|lf','吕梁市|lvliang|ll','呼和浩特市|huhehaote|hhht','包头市|baotou|bt','乌海市|wuhai|wh','赤峰市|chifeng|cf','通辽市|tongliao|tl','鄂尔多斯市|eerduosi|eeds','呼伦贝尔市|hulunbeier|hlbe','巴彦淖尔市|bayannaoer|byne','乌兰察布市|wulanchabu|wlcb','兴安盟|xinganmeng|xam','锡林郭勒盟|xilinguolemeng|xlglm','阿拉善盟|alashanmeng|alsm','沈阳市|shenyang|sy','大连市|dalian|dl','鞍山市|anshan|as','抚顺市|fushun|fs','本溪市|benxi|bx','丹东市|dandong|dd','锦州市|jinzhou|jz','营口市|yingkou|yk','阜新市|fuxin|fx','辽阳市|liaoyang|ly','盘锦市|panjin|pj','铁岭市|tieling|tl','朝阳市|chaoyang|cy','葫芦岛市|huludao|hld','长春市|changchun|cc','吉林市|jilin|jl','四平市|siping|sp','辽源市|liaoyuan|ly','通化市|tonghua|th','白山市|baishan|bs','松原市|songyuan|sy','白城市|baicheng|bc','延边朝鲜族自治州|ybcxzzzz|ybcxzzzz','哈尔滨市|haerbin|heb','齐齐哈尔市|qiqihaer|qqhe','鸡西市|jixi|jx','鹤岗市|hegang|hg','双鸭山市|shuangyashan|sys','大庆市|daqing|dq','伊春市|yichun|yc','佳木斯市|jiamusi|jms','七台河市|qitaihe|qth','牡丹江市|mudanjiang|mdj','黑河市|heihe|hh','绥化市|suihua|sh','大兴安岭地区|daxinganling|dxaldq','徐州市|xuzhou|xz','南通市|nantong|nt','连云港市|lianyungang|lyg','淮安市|huaian|ha','盐城市|yancheng|yc','扬州市|yangzhou|yz','镇江市|zhenjiang|zj','泰州市|taizhou|tz','宿迁市|suqian|sq','宁波市|ningbo|nb','嘉兴市|jiaxing|jx','湖州市|huzhou|hz','绍兴市|shaoxing|sx','舟山市|zhoushan|zs','衢州市|quzhou|qz','金华市|jinhua|jh','台州市|taizhou|tz','丽水市|lishui|ls','芜湖市|wuhu|wh','蚌埠市|bengbu|bb','淮南市|huainan|hn','马鞍山市|maanshan|mas','淮北市|huaibei|hb','铜陵市|tongling|tl','安庆市|anqing|aq','黄山市|huangshan|hs','滁州市|chuzhou|cz','阜阳市|fuyang|fy','宿州市|suzhou|sz','巢湖市|chaohu|ch','六安市|luan|la','亳州市|bozhou|bz','池州市|chizhou|cz','宣城市|xuancheng|xc','福州市|fuzhou|fz','厦门市|xiamen|xm','莆田市|putian|pt','三明市|sanming|sm','泉州市|quanzhou|qz','漳州市|zhangzhou|zz','南平市|nanping|np','龙岩市|longyan|ly','宁德市|ningde|nd','景德镇市|jingdezhen|jdz','萍乡市|pingxiang|px','九江市|jiujiang|jj','新余市|xinyu|xy','鹰潭市|yingtan|yt','赣州市|ganzhou|gz','吉安市|jian|ja','宜春市|yichun|yc','抚州市|fuzhou|fz','上饶市|shangrao|sr','济南市|jinan|jn','淄博市|zibo|zb','枣庄市|zaozhuang|zz','东营市|dongying|dy','烟台市|yantai|yt','潍坊市|weifang|wf','济宁市|jining|jn','泰安市|taian|ta','威海市|weihai|wh','日照市|rizhao|rz','莱芜市|laiwu|lw','临沂市|linyi|ly','德州市|dezhou|dz','聊城市|liaocheng|lc','滨州市|binzhou|bz','菏泽市|heze|hz','开封市|kaifeng|kf','洛阳市|luoyang|ly','平顶山市|pingdingshan|pds','安阳市|anyang|ay','鹤壁市|hebi|hb','新乡市|xinxiang|xx','焦作市|jiaozuo|jz','濮阳市|puyang|py','许昌市|xuchang|xc','漯河市|luohe|lh','三门峡市|sanmenxia|smx','南阳市|nanyang|ny','商丘市|shangqiu|sq','信阳市|xinyang|xy','周口市|zhoukou|zk','驻马店市|zhumadian|zmd','济源市|jiyuan|jiyuan','黄石市|huangshi|hs','十堰市|shiyan|sy','宜昌市|yichang|yc','襄樊市|xiangfan|xf','鄂州市|ezhou|ez','荆门市|jingmen|jm','孝感市|xiaogan|xg','荆州市|jingzhou|jz','黄冈市|huanggang|hg','咸宁市|xianning|xn','随州市|suizhou|sz','恩施土家族苗族自治州|estjzmzzzz|estjzmzzzz','仙桃市|xiantao|xt','潜江市|qianjiang|qj','天门市|tianmen|tm','神农架林区|shennongjia|snjlq','株洲市|zhuzhou|zz','湘潭市|xiangtan|xt','衡阳市|hengyang|hy','邵阳市|shaoyang|sy','岳阳市|yueyang|yy','常德市|changde|cd','张家界市|zhangjiajie|zjj','益阳市|yiyang|yy','郴州市|chenzhou|cz','永州市|yongzhou|yz','怀化市|huaihua|hh','娄底市|loudi|ld','湘西土家族苗族自治州|xxtjzmzzzz|xxtjzmzzzz','韶关市|shaoguan|sg','珠海市|zhuhai|zh','汕头市|shantou|st','佛山市|foushan|fs','江门市|jiangmen|jm','湛江市|zhanjiang|jz','茂名市|maoming|mm','肇庆市|zhaoqing|zq','惠州市|huizhou|hz','梅州市|meizhou|mz','汕尾市|shanwei|sw','河源市|heyuan|hy','阳江市|yangjiang|yj','清远市|qingyuan|qy','东莞市|dongguan|dg','中山市|zhongshan|zs','潮州市|chaozhou|cz','揭阳市|jieyang|jy','云浮市|yunfu|yf','南宁市|nanning|nn','柳州市|liuzhou|lz','桂林市|guilin|gl','梧州市|wuzhou|wz','北海市|beihai|bh','防城港市|fangchenggang|fcg','钦州市|qinzhou|qz','贵港市|guigang|gg','玉林市|yulin|yl','百色市|baise|bs','贺州市|hezhou|hz','河池市|hechi|hc','来宾市|laibin|lb','崇左市|chongzuo|cz','海口市|haikou|hk','三亚市|sanya|sy','五指山市|wuzhishan|wzs','琼海市|qionghai|qh','儋州市|danzhou|dz','文昌市|wenchang|wc','万宁市|wanning|wn','东方市|dongfang|df','定安县|dingan|da','屯昌县|tunchang|tc','澄迈县|chengmai|cm','临高县|lingao|lg','白沙黎族自治县|bsnzzzx|bsnzzzx','昌江黎族自治县|cjlzzzx|cjlzzzx','乐东黎族自治县|ldlzzzx|ldlzzzx','陵水黎族自治县|lingshui|ls','保亭黎族苗族自治县|btlzmzzzx|btlzmzzzx','琼中黎族苗族自治县|qzlzmzzzx|qzlzmzzzx','西沙群岛|xishaqundao|xsqd','南沙群岛|nanshaqundao|nsqd','中沙群岛的岛礁及其海域|zhongshaqundao|zsqd','自贡市|zigong|zg','攀枝花市|panzhihua|pzh','泸州市|luzhou|lz','德阳市|deyang|dy','绵阳市|mianyang|my','广元市|guangyuan|gy','遂宁市|suining|sn','内江市|neijiang|nj','乐山市|leshan|ls','南充市|nanchong|nc','眉山市|meishan|ms','宜宾市|yibin|yb','广安市|guangan|ga','达州市|dazhou|dz','雅安市|yaan|ya','巴中市|bazhong|bz','资阳市|ziyang|zy','阿坝藏族羌族自治州|abzzqzzzz|abzzqzzzz','甘孜藏族自治州|gzzzzzz|gzzzzzz','凉山彝族自治州|lsyzzzz|lsyzzzz','贵阳市|guiyang|gy','六盘水市|liupanshui|lps','遵义市|zunyi|zy','安顺市|anshun|as','铜仁地区|tongren|tr','黔西南布依族苗族自治州|qxnbyzmzzzz|qxnbyzmzzzz','毕节地区|bijie|bj','黔东南苗族侗族自治州|qdnmzdzzzz|qdnmzdzzzz','黔南布依族苗族自治州|qnbyzmzzzz|qnbyzmzzzz','昆明市|kunming|km','曲靖市|qujing|qj','玉溪市|yuxi|yx','保山市|baoshan|bs','昭通市|zhaotong|zt','丽江市|lijiang|lj','思茅市|simao|sm','临沧市|lincang|lc','楚雄彝族自治州|cxyzzzz|cxyzzzz','红河哈尼族彝族自治州|hhhnzyzzzz|hhhnzyzzzz','文山壮族苗族自治州|wszzmzzzz|wszzmzzzz','西双版纳傣族自治州|xsbndzzzz|xsbndzzzz','大理白族自治州|dlbzzzz|dlbzzzz','德宏傣族景颇族自治州|dhdzjpzzzz|dhdzjpzzzz','怒江傈僳族自治州|njlszzzz|njlszzzz','迪庆藏族自治州|dqzzzzz|dqzzzzz','拉萨市|lasa|ls','昌都地区|changdudiqu|cd','山南地区|shannandiqu|sndq','日喀则地区|rikazediqu|rkzdq','那曲地区|naqudiqu|nqdq','阿里地区|alidiqu|aldq','林芝地区|linzhidiqu|lzdq','西安市|xian|xa','铜川市|tongchuan|tc','宝鸡市|baoji|bj','咸阳市|xianyang|xy','渭南市|weinan|wn','延安市|yanan|ya','汉中市|hanzhong|hz','榆林市|yulin|yl','安康市|ankang|ak','商洛市|shangluo|sl','兰州市|lanzhou|lz','嘉峪关市|jiayuguan|jyg','金昌市|jinchang|jc','白银市|baiyin|by','天水市|tianshui|ts','武威市|wuwei|ww','张掖市|zhangye|zy','平凉市|pingliang|pl','酒泉市|jiuquan|jq','庆阳市|qingyang|qy','定西市|dingxi|dx','陇南市|longnan|ln','临夏回族自治州|lxhzzzz|lxhzzzz','甘南藏族自治州|gnzzzzz|gnzzzzz','西宁市|xining|xn','海东地区|haidongdiqu|hddq','海北藏族自治州|hbzzzzz|hbzzzzz','黄南藏族自治州|hnzzzzz|hnzzzzz','海南藏族自治州|hnzzzzz|hnzzzzz','果洛藏族自治州|glzzzzz|hlzzzzz','玉树藏族自治州|yszzzzz|yszzzzz','海西蒙古族藏族自治州|hxmgzzzzzz|hxmgzzzzzz','银川市|yinchuan|yc','石嘴山市|shizuishan|szs','吴忠市|wuzhong|wz','固原市|guyuan|gy','中卫市|zhongwei|zw','乌鲁木齐市|wulumuqi|wlmq','克拉玛依市|kelamayi|klmy','吐鲁番地区|tulufandiqu|tlfdq','哈密地区|hamidiqu|hmdq','昌吉回族自治州|cjhzzzz|cjhzzzz','博尔塔拉蒙古自治州|betlmgzzz|betlmgzzz','巴音郭楞蒙古自治州|byglmgzzz|byglmgzzz','阿克苏地区|akesudiqu|aksdq','克孜勒苏柯尔克孜自治州|kzlskekzzzz|kzlskekzzzz','喀什地区|kashidiqu|ksdq','和田地区|hetian|ht','伊犁哈萨克自治州|ylhskzzz|ylhskzzz','塔城地区|tachengdiqu|tcdq','阿勒泰地区|aletaidiqu|altdq','石河子市|shihezi|shz','阿拉尔市|alaer|ale','图木舒克市|tumushuke|tmsk','五家渠市|wujiaqu|wjq','台北市|taibei|tb','高雄市|gaoxiong|gx','基隆市|jilong|jl','台中市|taizhong|tz','台南市|tainan|tn','新竹市|xinzhu|xz','嘉义市|jiayi|jy','台北县|taibeixian|tbx','宜兰县|yilanxian|ylx','桃园县|taoyuanxian|tyx','新竹县|xinzhuxian|xzx','苗栗县|miaolixian|mlx','台中县|taizhongxian|tzx','彰化县|zhanghuaxian|zhx','南投县|nantouxian|ntx','云林县|yunlinxian|ylx','嘉义县|jiayixian|jyx','台南县|tainanxian|tnx','高雄县|gaoxiongxian|gxx','屏东县|pingdongxian|pdx','澎湖县|penghuxian|phx','台东县|taidongxian|tdx','花莲县|hualianxian|hlx','中西区|zhongxiqu|zxq','东区|dongqu|dq','九龙城区|jiulongchengqu|jlcq','观塘区|guantangqu|gtq','南区|nanqu|nq','深水埗区|shenshuibuqu|ssbq','黄大仙区|huangdaxianqu|hdxq','湾仔区|wanzaiqu|wzq','油尖旺区|youjianwangqu|yjwq','离岛区|lidaoqu|ldq','葵青区|kuiqingqu|kqq','北区|beiqu|bq','西贡区|xigongqu|xgq','沙田区|shatianqu|stq','屯门区|tunmenqu|tmq','大埔区|dabuqu|dbq','荃湾区|quanwanqu|qwq','元朗区|yuanlangqu|ylq','花地玛堂区|huadimatangqu|hdmtq','圣安多尼堂区|shenganduonitangqu|sadntq','大堂区|datangqu|dtq','望德堂区|wangdetangqu|wdtq','风顺堂区|fengshuntangqu|fstq','嘉模堂区|jiamotangqu|jmtq','圣方济各堂区|shengfangjigetangqu|sfjgtq'];
//Vcity.allCity=['北京|beijing|bj']
Vcity.allCity=['北京|bj|beijing','上海|sh|shanghai','天津|tj|tianjin','重庆|zq|zhongqing','合肥|hf|hefei','毫州|hz|haozhou','芜湖|wh|wuhu','马鞍山|mas|maanshan','池州|cz|chizhou','黄山|hs|huangshan','滁州|cz|chuzhou','安庆|aq|anqing','淮南|hn|huainan','淮北|hb|huaibei','蚌埠|bb|bangbu','巢湖|ch|chaohu','宿州|sz|suzhou','宣城|xc|xuancheng','六安|la|liuan','阜阳|fy|fuyang','铜陵|tl|tongling','明光|mg|mingguang','天长|tz|tianzhang','宁国|ng|ningguo','界首|js|jieshou','桐城|tc|tongcheng','福州|fz|fuzhou','厦门|sm|shamen','泉州|qz|quanzhou','漳州|zz|zhangzhou','南平|np|nanping','三明|sm|sanming','龙岩|ly|longyan','莆田|pt|putian','宁德|nd|ningde','建瓯|jo|jianou','武夷山|wys|wuyishan','长乐|zl|zhangle','福清|fq|fuqing','晋江|jj|jinjiang','南安|na|nanan','福安|fa|fuan','龙海|lh|longhai','邵武|sw|shaowu','石狮|ss|shishi','福鼎|fd|fuding','建阳|jy|jianyang','漳平|zp|zhangping','永安|ya|yongan','广州|gz|guangzhou','增城|zc|zengcheng','从化|ch|conghua','韶关|sg|shaoguan','乐昌|lc|lechang','南雄|nx|nanxiong','深圳|sz|shenzhen','珠海|zh|zhuhai','汕头|st|shantou','澄海|ch|chenghai','佛山|fs|foshan','江门|jm|jiangmen','台山|ts|taishan','开平|kp|kaiping','鹤山|hs|heshan','恩平|ep|enping','湛江|zj|zhanjiang','廉江|lj|lianjiang','雷州|lz|leizhou','吴川|wc|wuchuan','茂名|mm|maoming','高州|gz|gaozhou','化州|hz|huazhou','信宜|xy|xinyi','肇庆|zq|zhaoqing','高要|gy|gaoyao','四会|sh|sihui','惠州|hz|huizhou','梅州|mz|meizhou','兴宁|xn|xingning','汕尾|sw|shanwei','陆丰|lf|lufeng','河源|hy|heyuan','阳江|yj|yangjiang','阳春|yc|yangchun','清远|qy|qingyuan','英德|yd|yingde','连州|lz|lianzhou','东莞|dg|dongguan','中山|zs|zhongshan','潮州|cz|chaozhou','揭阳|jy|jieyang','普宁|pn|puning','云浮|yf|yunfu','罗定|ld|luoding','南宁|nn|nanning','贺州|hz|hezhou','玉林|yl|yulin','桂林|gl|guilin','柳州|lz|liuzhou','梧州|wz|wuzhou','北海|bh|beihai','钦州|qz|qinzhou','百色|bs|baise','防城港|fcg|fangchenggang','贵港|gg|guigang','河池|hc|hechi','崇左|cz|chongzuo','来宾|lb|laibin','东兴|dx|dongxing','桂平|gp|guiping','北流|bl|beiliu','岑溪|cx|cenxi','合山|hs|heshan','凭祥|px|pingxiang','宜州|yz|yizhou','贵阳|gy|guiyang','安顺|as|anshun','遵义|zy|zunyi','六盘水|lps|liupanshui','兴义|xy|xingyi','都匀|dy|douyun','凯里|kl|kaili','毕节|bj|bijie','清镇|qz|qingzhen','铜仁|tr|tongren','赤水|cs|chishui','仁怀|rh|renhuai','福泉|fq|fuquan','海口|hk|haikou','三亚|sy|sanya','万宁|wn|wanning','文昌|wc|wenchang','儋州|dz|danzhou','琼海|qh|qionghai','东方|df|dongfang','五指山|wzs|wuzhishan','武汉|wh|wuhan','荆门|jm|jingmen','咸宁|xn|xianning','襄樊|xf|xiangfan','荆州|jz|jingzhou','黄石|hs|huangshi','宜昌|yc|yichang','随州|sz|suizhou','鄂州|ez|ezhou','孝感|xg|xiaogan','黄冈|hg|huanggang','十堰|sy|shiyan','枣阳|zy|zaoyang','老河口|lhk|laohekou','恩施|es|enshi','仙桃|xt|xiantao','天门|tm|tianmen','钟祥|zx|zhongxiang','潜江|qj|qianjiang','麻城|mc|macheng','洪湖|hh|honghu','汉川|hc|hanchuan','赤壁|cb|chibi','松滋|sz|songzi','丹江口|djk|danjiangkou','武穴|wx|wuxue','广水|gs|guangshui','石首|ss|shishou','大冶|dy|daye','枝江|zj|zhijiang','应城|yc|yingcheng','宜城|yc|yicheng','当阳|dy|dangyang','安陆|al|anlu','宜都|yd|yidou','利川|lc|lichuan','长沙|zs|zhangsha','郴州|cz|chenzhou','益阳|yy|yiyang','娄底|ld|loudi','株洲|zz|zhuzhou','衡阳|hy|hengyang','湘潭|xt|xiangtan','岳阳|yy|yueyang','常德|cd|changde','邵阳|sy|shaoyang','永州|yz|yongzhou','张家界|zjj|zhangjiajie','怀化|hh|huaihua','浏阳|ly|liuyang','醴陵|ll|liling','湘乡|xx|xiangxiang','耒阳|ly|leiyang','沅江|yj|yuanjiang','涟源|ly|lianyuan','常宁|cn|changning','吉首|js|jishou','冷水江|lsj|lengshuijiang','临湘|lx|linxiang','汨罗|ml|miluo','武冈|wg|wugang','韶山|ss|shaoshan','安化|ah|anhua','湘西州|xxz|xiangxizhou','南京|nj|nanjing','无锡|wx|wuxi','常州|cz|changzhou','扬州|yz|yangzhou','徐州|xz|xuzhou','苏州|sz|suzhou','连云港|lyg|lianyungang','盐城|yc|yancheng','淮安|ha|huaian','宿迁|sq|suqian','镇江|zj|zhenjiang','南通|nt|nantong','泰州|tz|taizhou','兴化|xh|xinghua','东台|dt|dongtai','常熟|cs|changshu','江阴|jy|jiangyin','张家港|zjg|zhangjiagang','通州|tz|tongzhou','宜兴|yx|yixing','邳州|pz|pizhou','海门|hm|haimen','大丰|df|dafeng','溧阳|ly|liyang','泰兴|tx|taixing','昆山|ks|kunshan','启东|qd|qidong','江都|jd|jiangdou','丹阳|dy|danyang','吴江|wj|wujiang','靖江|jj|jingjiang','扬中|yz|yangzhong','新沂|xy|xinyi','仪征|yz|yizheng','太仓|tc|taicang','姜堰|jy|jiangyan','高邮|gy|gaoyou','金坛|jt|jintan','句容|jr|jurong','灌南|gn|guannan','南昌|nc|nanchang','赣州|gz|ganzhou','上饶|sr|shangrao','宜春|yc|yichun','景德镇|jdz|jingdezhen','亲余|qy|qinyu','九江|jj|jiujiang','萍乡|px|pingxiang','抚州|fz|fuzhou','鹰潭|yt|yingtan','吉安|ja|jian','丰城|fc|fengcheng','樟树|zs|zhangshu','德兴|dx|dexing','瑞金|rj|ruijin','井冈山|jgs|jinggangshan','高安|ga|gaoan','乐平|lp|leping','南康|nk|nankang','贵溪|gx|guixi','瑞昌|rc|ruichang','东乡|dx|dongxiang','广丰|gf|guangfeng','成都|cd|chengdou','广安|ga|guangan','德阳|dy|deyang','乐山|ls|leshan','巴中|bz|bazhong','内江|nj|neijiang','宜宾|yb|yibin','南充|nc|nanchong','都江堰|djy|doujiangyan','自贡|zg|zigong','泸洲|lz|luzhou','广元|gy|guangyuan','达州|dz|dazhou','资阳|zy|ziyang','绵阳|my|mianyang','眉山|ms|meishan','遂宁|sn|suining','雅安|ya|yaan','阆中|lz|langzhong','攀枝花|pzh|panzhihua','广汉|gh|guanghan','绵竹|mz|mianzhu','万源|wy|wanyuan','华蓥|hy|huaying','江油|jy|jiangyou','西昌|xc|xichang','彭州|pz|pengzhou','简阳|jy|jianyang','崇州|cz|chongzhou','什邡|sf|shenfang','峨眉山|ems|emeishan','邛崃|ql|qionglai','双流|sl|shuangliu','昆明|km|kunming','玉溪|yx|yuxi','大理|dl|dali','曲靖|qj|qujing','昭通|zt|zhaotong','保山|bs|baoshan','丽江|lj|lijiang','临沧|lc|lincang','楚雄|cx|chuxiong','开远|ky|kaiyuan','个旧|gj|gejiu','景洪|jh|jinghong','安宁|an|anning','宣威|xw|xuanwei','杭州|hz|hangzhou','宁波|nb|ningbo','绍兴|sx|shaoxing','温州|wz|wenzhou','台州|tz|taizhou','湖州|hz|huzhou','嘉兴|jx|jiaxing','金华|jh|jinhua','舟山|zs|zhoushan','衢州|qz|quzhou','丽水|ls|lishui','余姚|yy|yuyao','乐清|lq|leqing','临海|lh|linhai','温岭|wl|wenling','永康|yk|yongkang','瑞安|ra|ruian','慈溪|cx|cixi','义乌|yw|yiwu','上虞|sy|shangyu','诸暨|zj|zhuji','海宁|hn|haining','桐乡|tx|tongxiang','兰溪|lx|lanxi','龙泉|lq|longquan','建德|jd|jiande','富德|fd|fude','富阳|fy|fuyang','平湖|ph|pinghu','东阳|dy|dongyang','东阳|dy|dongyang','嵊州|sz|shengzhou','奉化|fh|fenghua','临安|la|linan','江山|js|jiangshan','台北|tb|taibei','台南|tn|tainan','台中|tz|taizhong','高雄|gx|gaoxiong','桃源|ty|taoyuan','兰州|lz|lanzhou','白银|by|baiyin','武威|ww|wuwei','金昌|jc|jinchang','平凉|pl|pingliang','张掖|zy|zhangye','嘉峪关|jyg|jiayuguan','酒泉|jq|jiuquan','庆阳|qy|qingyang','定西|dx|dingxi','陇南|ln|longnan','天水|ts|tianshui','玉门|ym|yumen','临夏|lx|linxia','合作|hz|hezuo','敦煌|dh|dunhuang','甘南州|gnz|gannanzhou','石家庄|sjz|shijiazhuang','保定|bd|baoding','唐山|ts|tangshan','邯郸|hd|handan','邢台|xt|xingtai','沧州|cz|cangzhou','衡水|hs|hengshui','廊坊|lf|langfang','承德|cd|chengde','迁安|qa|qianan','鹿泉|lq|luquan','秦皇岛|qhd|qinhuangdao','南宫|ng|nangong','任丘|rq|renqiu','叶城|yc|yecheng','辛集|xj|xinji','涿州|zz|zhuozhou','定州|dz|dingzhou','晋州|jz|jinzhou','霸州|bz|bazhou','黄骅|hh|huanghua','遵化|zh|zunhua','张家口|zjk|zhangjiakou','沙河|sh|shahe','三河|sh|sanhe','冀州|jz|jizhou','武安|wa|wuan','河间|hj|hejian','深州|sz|shenzhou','新乐|xl|xinle','泊头|bt|botou','安国|ag|anguo','郑州|zz|zhengzhou','洛阳|ly|luoyang','焦作|jz|jiaozuo','商丘|sq|shangqiu','信阳|xy|xinyang','周口|zk|zhoukou','鹤壁|hb|hebi','安阳|ay|anyang','濮阳|py|puyang','驻马店|zmd|zhumadian','南阳|ny|nanyang','开封|kf|kaifeng','漯河|lh|luohe','许昌|xc|xuchang','新乡|xx|xinxiang','济源|jy|jiyuan','灵宝|lb|lingbao','偃师|ys|yanshi','邓州|dz|dengzhou','登封|df|dengfeng','三门峡|smx|sanmenxia','新郑|xz|xinzheng','禹州|yz|yuzhou','巩义|gy|gongyi','永城|yc|yongcheng','长葛|zg|zhangge','义马|ym|yima','林州|lz|linzhou','项城|xc|xiangcheng','汝州|rz|ruzhou','荥阳|yy|yingyang','平顶山|pds|pingdingshan','卫辉|wh|weihui','辉县|hx|huixian','舞钢|wg|wugang','新密|xm|xinmi','孟州|mz|mengzhou','沁阳|qy|qinyang','郏县|jx|jiaxian','哈尔滨|heb|haerbin','伊春|yc|yichun','牡丹江|mdj|mudanjiang','大庆|dq|daqing','鸡西|jx|jixi','鹤岗|hg|hegang','绥化|sh|suihua','齐齐哈尔|qqhe|qiqihaer','黑河|hh|heihe','富锦|fj|fujin','虎林|hl|hulin','密山|ms|mishan','佳木斯|jms|jiamusi','双鸭山|sys|shuangyashan','海林|hl|hailin','铁力|tl|tieli','北安|ba|beian','五大连池|wdlc|wudalianchi','阿城|ac|acheng','尚志|sz|shangzhi','五常|wc|wuchang','安达|ad|anda','七台河|qth|qitaihe','绥芬河|sfh|suifenhe','双城|sc|shuangcheng','海伦|hl|hailun','宁安|na|ningan','讷河|nh|nehe','穆棱|ml|muleng','同江|tj|tongjiang','肇东|zd|zhaodong','长春|zc|zhangchun','吉林|jl|jilin','通化|th|tonghua','白城|bc|baicheng','四平|sp|siping','辽源|ly|liaoyuan','松原|sy|songyuan','白山|bs|baishan','集安|ja|jian','梅河口|mhk|meihekou','双辽|sl|shuangliao','延吉|yj|yanji','九台|jt|jiutai','桦甸|hd|huadian','榆树|ys|yushu','蛟河|jh|jiaohe','磐石|ps|panshi','大安|da|daan','德惠|dh|dehui','洮南|tn|taonan','龙井|lj|longjing','珲春|hc|hunchun','公主岭|gzl|gongzhuling','图们|tm|tumen','舒兰|sl|shulan','和龙|hl|helong','临江|lj|linjiang','敦化|dh|dunhua','沈阳|sy|shenyang','葫芦岛|hld|huludao','大连|dl|dalian','盘锦|pj|panjin','鞍山|as|anshan','铁岭|tl|tieling','本溪|bx|benxi','丹东|dd|dandong','抚顺|fs|fushun','锦州|jz|jinzhou','辽阳|ly|liaoyang','阜新|fx|fuxin','调兵山|dbs|diaobingshan','朝阳|cy|chaoyang','海城|hc|haicheng','北票|bp|beipiao','盖州|gz|gaizhou','凤城|fc|fengcheng','庄河|zh|zhuanghe','凌源|ly|lingyuan','开原|ky|kaiyuan','兴城|xc|xingcheng','新民|xm|xinmin','大石桥|dsq|dashiqiao','东港|dg|donggang','北宁|bn|beining','瓦房店|wfd|wafangdian','普兰店|pld|pulandian','凌海|lh|linghai','灯塔|dt|dengta','营口|yk|yingkou','呼和浩特|hhht|huhehaote','呼伦贝尔|hlbe|hulunbeier','赤峰|cf|chifeng','扎兰屯|zlt|zhalantun','鄂尔多斯|eeds|eerduosi','乌兰察布|wlcb|wulanchabu','巴彦淖尔|byne|bayannaoer','二连浩特|elht|erlianhaote','霍林郭勒|hlgl|huolinguole','包头|bt|baotou','乌海|wh|wuhai','阿尔山|aes|aershan','乌兰浩特|wlht|wulanhaote','锡林浩特|xlht|xilinhaote','根河|gh|genhe','满洲里|mzl|manzhouli','额尔古纳|eegn|eerguna','牙克石|yks|yakeshi','临河|lh|linhe','丰镇|fz|fengzhen','通辽|tl|tongliao','银川|yc|yinchuan','固原|gy|guyuan','石嘴山|szs|shizuishan','青铜峡|qtx|qingtongxia','中卫|zw|zhongwei','吴忠|wz|wuzhong','灵武|lw|lingwu','西宁|xn|xining','格尔木|gem|geermu','德令哈|dlh|delingha','济南|jn|jinan','青岛|qd|qingdao','威海|wh|weihai','潍坊|wf|weifang','菏泽|hz|heze','济宁|jn|jining','莱芜|lw|laiwu','东营|dy|dongying','烟台|yt|yantai','淄博|zb|zibo','枣庄|zz|zaozhuang','泰安|ta|taian','临沂|ly|linyi','日照|rz|rizhao','德州|dz|dezhou','聊城|lc|liaocheng','滨州|bz|binzhou','乐陵|ll|leling','兖州|yz|yanzhou','诸城|zc|zhucheng','邹城|zc|zoucheng','滕州|tz|tengzhou','肥城|fc|feicheng','新泰|xt|xintai','胶州|jz|jiaozhou','胶南|jn|jiaonan','即墨|jm|jimo','龙口|lk|longkou','平度|pd|pingdu','莱西|lx|laixi','太原|ty|taiyuan','大同|dt|datong','阳泉|yq|yangquan','长治|zz|zhangzhi','临汾|lf|linfen','晋中|jz|jinzhong','运城|yc|yuncheng','忻州|xz|xinzhou','朔州|sz|shuozhou','吕梁|ll|lvliang','古交|gj|gujiao','高平|gp|gaoping','永济|yj|yongji','孝义|xy|xiaoyi','侯马|hm|houma','霍州|hz|huozhou','介休|jx|jiexiu','河津|hj|hejin','汾阳|fy|fenyang','原平|yp|yuanping','潞城|lc|lucheng','西安|xa|xian','咸阳|xy|xianyang','榆林|yl|yulin','宝鸡|bj|baoji','铜川|tc|tongchuan','渭南|wn|weinan','汉中|hz|hanzhong','安康|ak|ankang','商洛|sl|shangluo','延安|ya|yanan','韩城|hc|hancheng','兴平|xp|xingping','华阴|hy|huayin','拉萨|ls|lasa','日喀则|rkz|rikaze','乌鲁木齐|wlmq|wulumuqi','石河子|shz|shihezi','喀什|ks|kashen','阿勒泰|alt|aletai','阜康|fk|fukang','库尔勒|kel|kuerle','阿克苏|aks|akesu','阿拉尔|ale|alaer','哈密|hm|hami','克拉玛依|klmy|kelamayi','昌吉|cj|changji','奎屯|kt|kuitun','米泉|mq|miquan','和田|ht|hetian']

/* 正则表达式 筛选中文城市名、拼音、首字母 */

Vcity.regEx = /^([\u4E00-\u9FA5\uf900-\ufa2d]+)\|(\w+)\|(\w)\w*$/i;
Vcity.regExChiese = /([\u4E00-\u9FA5\uf900-\ufa2d]+)/;

/* *
 * 格式化城市数组为对象oCity，按照a-h,i-p,q-z,hot热门城市分组：
 * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{i:[1.2.3],j:[1,2,3]},QRSTUVWXYZ:{}}
 * */
(function () {
    var citys = Vcity.allCity, match, letter,
            regEx = Vcity.regEx,
            reg2 = /^[a-b]$/i, reg3 = /^[c-d]$/i, reg4 = /^[e-g]$/i,reg5 = /^[h]$/i,reg6 = /^[j]$/i,reg7 = /^[k-l]$/i,reg8 =  /^[m-p]$/i,reg9 =  /^[q-r]$/i,reg10 =  /^[s]$/i,reg11 =  /^[t]$/i,reg12 =  /^[w]$/i,reg13 =  /^[x]$/i,reg14 =  /^[y]$/i,reg15 =  /^[z]$/i;
    if (!Vcity.oCity) {
        Vcity.oCity = {hot:{},AB:{},CD:{},EFG:{},H:{},J:{},KL:{},MNP:{},QR:{},S:{},T:{},W:{},X:{},Y:{},Z:{}};
        //console.log(citys.length);
        for (var i = 0, n = citys.length; i < n; i++) {
            match = regEx.exec(citys[i]);
            letter = match[3].toUpperCase();
            if (reg2.test(letter)) {
                if (!Vcity.oCity.AB[letter]) Vcity.oCity.AB[letter] = [];
                Vcity.oCity.AB[letter].push(match[1]);
            } else if (reg3.test(letter)) {
                if (!Vcity.oCity.CD[letter]) Vcity.oCity.CD[letter] = [];
                Vcity.oCity.CD[letter].push(match[1]);
            } else if (reg4.test(letter)) {
                if (!Vcity.oCity.EFG[letter]) Vcity.oCity.EFG[letter] = [];
                Vcity.oCity.EFG[letter].push(match[1]);
            }else if (reg5.test(letter)) {
                if (!Vcity.oCity.H[letter]) Vcity.oCity.H[letter] = [];
                Vcity.oCity.H[letter].push(match[1]);
            }else if (reg6.test(letter)) {
                if (!Vcity.oCity.J[letter]) Vcity.oCity.J[letter] = [];
                Vcity.oCity.J[letter].push(match[1]);
            }else if (reg7.test(letter)) {
                if (!Vcity.oCity.KL[letter]) Vcity.oCity.KL[letter] = [];
                Vcity.oCity.KL[letter].push(match[1]);
            }else if (reg8.test(letter)) {
                if (!Vcity.oCity.MNP[letter]) Vcity.oCity.MNP[letter] = [];
                Vcity.oCity.MNP[letter].push(match[1]);
            }else if (reg9.test(letter)) {
                if (!Vcity.oCity.QR[letter]) Vcity.oCity.QR[letter] = [];
                Vcity.oCity.QR[letter].push(match[1]);
            }else if (reg10.test(letter)) {
                if (!Vcity.oCity.S[letter]) Vcity.oCity.S[letter] = [];
                Vcity.oCity.S[letter].push(match[1]);
            }else if (reg11.test(letter)) {
                if (!Vcity.oCity.T[letter]) Vcity.oCity.T[letter] = [];
                Vcity.oCity.T[letter].push(match[1]);
            }else if (reg12.test(letter)) {
                if (!Vcity.oCity.W[letter]) Vcity.oCity.W[letter] = [];
                Vcity.oCity.W[letter].push(match[1]);
            }else if (reg13.test(letter)) {
                if (!Vcity.oCity.X[letter]) Vcity.oCity.X[letter] = [];
                Vcity.oCity.X[letter].push(match[1]);
            }else if (reg14.test(letter)) {
                if (!Vcity.oCity.Y[letter]) Vcity.oCity.Y[letter] = [];
                Vcity.oCity.Y[letter].push(match[1]);
            }else if (reg15.test(letter)) {
                if (!Vcity.oCity.Z[letter]) Vcity.oCity.Z[letter] = [];
                Vcity.oCity.Z[letter].push(match[1]);
            }

            /* 热门城市 前16条 */
            if(i<20){
                if(!Vcity.oCity.hot['hot']) Vcity.oCity.hot['hot'] = [];
                Vcity.oCity.hot['hot'].push(match[1]);
            }
        }
    }
})();


/* 城市HTML模板 */
Vcity._template = [
    '<p class="tip">直接输入可搜索城市(支持汉字/拼音)</p>',
    '<ul>',
    '<li class="on">热门城市</li>',
    '<li>AB</li>',
    '<li>CD</li>',
    '<li>EFG</li>',
    '<li>H</li>',
    '<li>J</li>',
    '<li>KL</li>',
    '<li>MNP</li>',
    '<li>QR</li>',
    '<li>S</li>',
    '<li>T</li>',
    '<li>W</li>',
    '<li>X</li>',
    '<li>Y</li>',
    '<li>Z</li>',
    '</ul>'
];

/* *
 * 城市控件构造函数
 * @CitySelector
 * */

Vcity.CitySelector = function () {
    this.initialize.apply(this, arguments);
};

Vcity.CitySelector.prototype = {

    constructor:Vcity.CitySelector,

    /* 初始化 */

    initialize :function (options) {
        var input = options.input;
        this.input = Vcity._m.$('#'+ input);
        this.inputEvent();
    },

    /* *
        

    /* *
     * @createWarp
     * 创建城市BOX HTML 框架
     * */

    createWarp:function(){
        var inputPos = Vcity._m.getPos(this.input);
        var div = this.rootDiv = document.createElement('div');
        var that = this;

        // 设置DIV阻止冒泡
        Vcity._m.on(this.rootDiv,'click',function(event){
            Vcity._m.stopPropagation(event);
        });

        // 设置点击文档隐藏弹出的城市选择框
        Vcity._m.on(document, 'click', function (event) {
            event = Vcity._m.getEvent(event);
            var target = Vcity._m.getTarget(event);
            if(target == that.input) return false;
            //console.log(target.className);
            if (that.cityBox)Vcity._m.addClass('hide', that.cityBox);
            if (that.ul)Vcity._m.addClass('hide', that.ul);
            if(that.myIframe)Vcity._m.addClass('hide',that.myIframe);
        });
        div.className = 'citySelector';
        div.style.position = 'absolute';
        div.style.left = inputPos.left + 'px';
        div.style.top = inputPos.bottom + 5 + 'px';
        div.style.zIndex = 999999;

        // 判断是否IE6，如果是IE6需要添加iframe才能遮住SELECT框
        var isIe = (document.all) ? true : false;
        var isIE6 = this.isIE6 = isIe && !window.XMLHttpRequest;
        if(isIE6){
            var myIframe = this.myIframe =  document.createElement('iframe');
            myIframe.frameborder = '0';
            myIframe.src = 'about:blank';
            myIframe.style.position = 'absolute';
            myIframe.style.zIndex = '-1';
            this.rootDiv.appendChild(this.myIframe);
        }

        var childdiv = this.cityBox = document.createElement('div');
        childdiv.className = 'cityBox';
        childdiv.id = 'cityBox';
        childdiv.innerHTML = Vcity._template.join('');
        var hotCity = this.hotCity =  document.createElement('div');
        hotCity.className = 'hotCity';
        childdiv.appendChild(hotCity);
        div.appendChild(childdiv);
        this.createHotCity();
    },

    /* *
     * @createHotCity
     * TAB下面DIV：hot,a-h,i-p,q-z 分类HTML生成，DOM操作
     * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{},QRSTUVWXYZ:{}}
     **/

    createHotCity:function(){
        var odiv,odl,odt,odd,odda=[],str,key,ckey,sortKey,regEx = Vcity.regEx,
                oCity = Vcity.oCity;
        for(key in oCity){
            odiv = this[key] = document.createElement('div');
            // 先设置全部隐藏hide
            odiv.className = key + ' ' + 'cityTab hide';
            sortKey=[];
            for(ckey in oCity[key]){
                sortKey.push(ckey);
                // ckey按照ABCDEDG顺序排序
                sortKey.sort();
            }
            for(var j=0,k = sortKey.length;j<k;j++){
                odl = document.createElement('dl');
                odt = document.createElement('dt');
                odd = document.createElement('dd');
                odt.innerHTML = sortKey[j] == 'hot'?'&nbsp;':sortKey[j];
                odda = [];
                for(var i=0,n=oCity[key][sortKey[j]].length;i<n;i++){
                    str = '<a href="#">' + oCity[key][sortKey[j]][i] + '</a>';
                    odda.push(str);
                }
                odd.innerHTML = odda.join('');
                odl.appendChild(odt);
                odl.appendChild(odd);
                odiv.appendChild(odl);
            }

            // 移除热门城市的隐藏CSS
            Vcity._m.removeClass('hide',this.hot);
            this.hotCity.appendChild(odiv);
        }
        document.body.appendChild(this.rootDiv);
        /* IE6 */
        this.changeIframe();

        this.tabChange();
        this.linkEvent();
    },

    /* *
     *  tab按字母顺序切换
     *  @ tabChange
     * */

    tabChange:function(){
        var lis = Vcity._m.$('li',this.cityBox);
        var divs = Vcity._m.$('div',this.hotCity);
        var that = this;
        for(var i=0,n=lis.length;i<n;i++){
            lis[i].index = i;
            lis[i].onclick = function(){
                for(var j=0;j<n;j++){
                    Vcity._m.removeClass('on',lis[j]);
                    Vcity._m.addClass('hide',divs[j]);
                }
                Vcity._m.addClass('on',this);
                Vcity._m.removeClass('hide',divs[this.index]);
                /* IE6 改变TAB的时候 改变Iframe 大小*/
                that.changeIframe();
            };
        }
    },

    /* *
     * 城市LINK事件
     *  @linkEvent
     * */

    linkEvent:function(){
        var links = Vcity._m.$('a',this.hotCity);
        var that = this;
        for(var i=0,n=links.length;i<n;i++){
            links[i].onclick = function(){
                that.input.value = this.innerHTML;
                Vcity._m.addClass('hide',that.cityBox);
                /* 点击城市名的时候隐藏myIframe */
                Vcity._m.addClass('hide',that.myIframe);
            }
        }
    },

    /* *
     * INPUT城市输入框事件
     * @inputEvent
     * */

    inputEvent:function(){
        var that = this;
        Vcity._m.on(this.input,'click',function(event){
            event = event || window.event;
            if(!that.cityBox){
                that.createWarp();
            }else if(!!that.cityBox && Vcity._m.hasClass('hide',that.cityBox)){
                // slideul 不存在或者 slideul存在但是是隐藏的时候 两者不能共存
                if(!that.ul || (that.ul && Vcity._m.hasClass('hide',that.ul))){
                    Vcity._m.removeClass('hide',that.cityBox);

                    /* IE6 移除iframe 的hide 样式 */
                    //alert('click');
                    Vcity._m.removeClass('hide',that.myIframe);
                    that.changeIframe();
                }
            }
        });
        // Vcity._m.on(this.input,'focus',function(){
        //     that.input.select();
        //     if(that.input.value == '城市名') that.input.value = '';
        // });
        Vcity._m.on(this.input,'blur',function(){
            // if(that.input.value == '') that.input.value = '城市名';
            
            var value = Vcity._m.trim(that.input.value);
            if(value != ''){
                var reg = new RegExp("^" + value + "|\\|" + value, 'gi');
                var flag=0;
                for (var i = 0, n = Vcity.allCity.length; i < n; i++) {
                    if (reg.test(Vcity.allCity[i])) {
                        flag++;
                    }
                }
                if(flag==0){
                    that.input.value= '';
                }else{
                    var lis = Vcity._m.$('li',that.ul);
                    if(typeof lis == 'object' && lis['length'] > 0){
                        var li = lis[0];
                        var bs = li.children;
                        if(bs && bs['length'] > 1){
                            that.input.value = bs[0].innerHTML;
                        }
                    }else{
                        that.input.value = '';
                    }
                }
            }

        });
        Vcity._m.on(this.input,'keyup',function(event){
            event = event || window.event;
            var keycode = event.keyCode;
            Vcity._m.addClass('hide',that.cityBox);
            that.createUl();

            /* 移除iframe 的hide 样式 */
            Vcity._m.removeClass('hide',that.myIframe);

            // 下拉菜单显示的时候捕捉按键事件
            if(that.ul && !Vcity._m.hasClass('hide',that.ul) && !that.isEmpty){
                that.KeyboardEvent(event,keycode);
            }
        });
    },

    /* *
     * 生成下拉选择列表
     * @ createUl
     * */

    createUl:function () {
        //console.log('createUL');
        var str;
        var value = Vcity._m.trim(this.input.value);
        // 当value不等于空的时候执行
        if (value !== '') {
            var reg = new RegExp("^" + value + "|\\|" + value, 'gi');
            // 此处需设置中文输入法也可用onpropertychange
            var searchResult = [];
            for (var i = 0, n = Vcity.allCity.length; i < n; i++) {
                if (reg.test(Vcity.allCity[i])) {
                    var match = Vcity.regEx.exec(Vcity.allCity[i]);
                    if (searchResult.length !== 0) {
                        str = '<li><b class="cityname">' + match[1] + '</b><b class="cityspell">' + match[2] + '</b></li>';
                    } else {
                        str = '<li class="on"><b class="cityname">' + match[1] + '</b><b class="cityspell">' + match[2] + '</b></li>';
                    }
                    searchResult.push(str);
                }
            }
            this.isEmpty = false;
            // 如果搜索数据为空
            if (searchResult.length == 0) {
                this.isEmpty = true;
                str = '<li class="empty">对不起，没有找到 "<em>' + value + '</em>"</li>';
                searchResult.push(str);
            }
            // 如果slideul不存在则添加ul
            if (!this.ul) {
                var ul = this.ul = document.createElement('ul');
                ul.className = 'cityslide mCustomScrollbar';
                this.rootDiv && this.rootDiv.appendChild(ul);
                // 记录按键次数，方向键
                this.count = 0;
            } else if (this.ul && Vcity._m.hasClass('hide', this.ul)) {
                this.count = 0;
                Vcity._m.removeClass('hide', this.ul);
            }
            this.ul.innerHTML = searchResult.join('');

            /* IE6 */
            this.changeIframe();

            // 绑定Li事件
            this.liEvent();
        }else{
            Vcity._m.addClass('hide',this.ul);
            Vcity._m.removeClass('hide',this.cityBox);

            Vcity._m.removeClass('hide',this.myIframe);

            this.changeIframe();
        }
    },

    /* IE6的改变遮罩SELECT 的 IFRAME尺寸大小 */
    changeIframe:function(){
        if(!this.isIE6)return;
        this.myIframe.style.width = this.rootDiv.offsetWidth + 'px';
        this.myIframe.style.height = this.rootDiv.offsetHeight + 'px';
    },

    /* *
     * 特定键盘事件，上、下、Enter键
     * @ KeyboardEvent
     * */

    KeyboardEvent:function(event,keycode){
        var lis = Vcity._m.$('li',this.ul);
        var len = lis.length;
        switch(keycode){
            case 40: //向下箭头↓
                this.count++;
                if(this.count > len-1) this.count = 0;
                for(var i=0;i<len;i++){
                    Vcity._m.removeClass('on',lis[i]);
                }
                Vcity._m.addClass('on',lis[this.count]);
                break;
            case 38: //向上箭头↑
                this.count--;
                if(this.count<0) this.count = len-1;
                for(i=0;i<len;i++){
                    Vcity._m.removeClass('on',lis[i]);
                }
                Vcity._m.addClass('on',lis[this.count]);
                break;
            case 13: // enter键
                this.input.value = Vcity.regExChiese.exec(lis[this.count].innerHTML)[0];
                Vcity._m.addClass('hide',this.ul);
                Vcity._m.addClass('hide',this.ul);
                /* IE6 */
                Vcity._m.addClass('hide',this.myIframe);
                break;
            default:
                break;
        }
    },

    /* *
     * 下拉列表的li事件
     * @ liEvent
     * */

    liEvent:function(){
        var that = this;
        var lis = Vcity._m.$('li',this.ul);
        for(var i = 0,n = lis.length;i < n;i++){
            Vcity._m.on(lis[i],'click',function(event){ 
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                that.input.value = Vcity.regExChiese.exec(target.innerHTML)[0];
                Vcity._m.addClass('hide',that.ul);
                /* IE6 下拉菜单点击事件 */
                Vcity._m.addClass('hide',that.myIframe);
            });
            Vcity._m.on(lis[i],'mouseover',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                Vcity._m.addClass('on',target);
            });
            Vcity._m.on(lis[i],'mouseout',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                Vcity._m.removeClass('on',target);
            })
        }
    }
};