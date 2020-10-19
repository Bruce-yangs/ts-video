// import './popup.css'
//import styles from './popup.css'; // import 引入css 在ts情况下 需要声明文件与相关css 保持名字一直 文件以xxx.css.d.ts结尾
let styles = require('./popup.css');

//接口 interface 概念:可以用来约束一个函数,对象,以及类的结构和类型
interface Ipopup {
    width?: string;
    height?: string;
    title?: string;//标题文案
    pos?: string;//位置
    mask?: boolean;//是否显示遮罩
    content?:(content: HTMLElement)=> void;//显示内容
}
function popup(options:Ipopup){
    return new Popup(options);
}

//定义开发组件的接口
interface Icomponent{
    tempContainer:HTMLElement;//元素类型
    init:()=>void;//初始函数
    template:()=>void;//模板
    handle:()=>void;//事件
}

class Popup implements Icomponent {
    //声明接口 属性
    tempContainer;
    mask;
    constructor(private settings:Ipopup){
        this.settings = Object.assign({//设置默认值
            width: '100%',
            height: '100%',
            title: '',
            pos: 'center',
            mask: true,
            content:()=>{}

        },this.settings);
        this.init();
    };
    init(){
        this.template();
        this.handle();
        this.contentCallback();
    };
    template(){
        this.settings.mask && this.createMask();
        this.tempContainer = document.createElement('div');
        this.tempContainer.style.width = this.settings.width;
        this.tempContainer.style.height = this.settings.height;
        this.tempContainer.className = styles.popup;
        this.tempContainer.innerHTML = `
            <div class=" ${styles['popup-title']}">
                <h3>${this.settings.title}</h3>
                <i class="iconfont iconguanbi"></i>
            </div>
            <div class="popup-content ${styles['popup-content']}">
            
            </div>
        `;
        if(this.settings.pos === 'left'){
            this.tempContainer.className = styles.left;
        }else if(this.settings.pos === 'right'){
            this.tempContainer.className = styles.right;
        } else {
            this.tempContainer.className = styles.center;
        }
        document.body.appendChild(this.tempContainer);
    };
    handle(){
        let closeDom = this.tempContainer.querySelector('.iconguanbi');
        closeDom.addEventListener('click',()=>{
            document.body.removeChild(this.tempContainer);
            this.settings.mask && document.body.removeChild(this.mask);
        });
    };
    createMask(){
        this.mask = document.createElement('div');
        this.mask.className = styles.mask;
        document.body.appendChild(this.mask);
    }
    contentCallback() {
        let content = this.tempContainer.querySelector(`.popup-content`);
        this.settings.content(content);
    }
}

export default popup;