
//接口 interface 概念:可以用来约束一个函数,对象,以及类的结构和类型
interface Ipopup {
    width?: string;
    height?: string;
    title?: string;//标题文案
    pos?: string;//位置
    mask?: boolean;//是否显示遮罩
    content?:()=>void;//显示内容
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
    };
    template(){
        this.tempContainer = document.createElement('div');
        this.tempContainer.innerHTML = `
            <h1>hello</h1>
        `;
        document.body.appendChild(this.tempContainer);
    };
    handle(){};
}

export default popup;