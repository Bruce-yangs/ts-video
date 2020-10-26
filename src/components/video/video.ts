let styles = require('./viode.css');

///定义接口
interface Ivideo{
    url: string;
    elem: string | HTMLElement; // |代表联合类型 
    width?: string; 
    height?: string; 
    autoplay?: boolean; 
}

interface Icomponent {
    dom:HTMLElement;
    init:()=>void;
    template:()=>void;
    handle:()=>void;
}

function video(options:Ivideo) {
    return new Video(options);
}
class Video implements Icomponent{
    dom;
    constructor(private settings:Ivideo) {
        this.settings = Object.assign({
            width:'100%',
            height:'100%',
            autoplay:false,
        },this.settings)
        this.init();
    }
    init(){
        this.template();
        this.handle();

    }
    template(){
        this.dom = document.createElement('div');
        this.dom.className = styles.video;
        /* this.dom.style.width = this.settings.width;
        this.dom.style.height = this.settings.height; */
        this.dom.style =  {
            width:this.settings.width,
            height:this.settings.height
        };
        this.dom.innerHTML = `
            <video class="${styles['video-content']}" src="${this.settings.url}"></video>
            <div class="${styles['video-controls']}">
                <div class="${styles['video-progress']}">
                    <div class="${styles['video-progress-now']}"></div>
                    <div class="${styles['video-progress-suc']}"></div>
                    <div class="${styles['video-progress-bar']}"></div>
                </div>
                <div class="${styles['video-play']}">
                    <i class="iconfont iconbofang"></i>
                </div>
                <div class="${styles['video-time']}">
                    <span>00:00</span>/ <span>00:10</span>
                </div>
                <div class="${styles['video-full']}">
                    <i class="iconfont iconwebicon311"></i>
                </div>
                <div class="${styles['video-volume']}">
                    <i class="iconfont iconyinliang"></i>
                    <div class="${styles['video-volprogress']}">
                        <div class="${styles['video-volprogress-now']}"></div>
                        <div class="${styles['video-volprogress-bar']}"></div>
                    </div>
                </div>
            </div>
        `;
        ///断言
        if(typeof this.settings.elem === 'object') {
          this.settings.elem.appendChild(this.dom);      
        } else {
           document.querySelector(`${this.settings.elem}`).appendChild(this.dom);      
        }
    }
    handle(){

    }
}

export default video;