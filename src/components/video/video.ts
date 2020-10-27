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
        let videoContent: HTMLVideoElement = this.dom.querySelector(`.${styles['video-content']}`);
        let videoControls= this.dom.querySelector(`.${styles['video-controls']}`);
        let videoPlay= this.dom.querySelector(`.${styles['video-controls']} i`);
        let videoTimes= this.dom.querySelectorAll(`.${styles['video-time']} span`);
        let videoFull= this.dom.querySelector(`.${styles['video-full']} i`);
        let timer;
        //canpaly -->监听是否加载完毕
        videoContent.addEventListener('canplay',()=>{
            console.log('canplay');
            videoTimes[1].innerHTML = formatTime(videoContent.duration);

        });
        //视频播放事件
        videoContent.addEventListener('play',()=>{
            console.log('play');
            videoPlay.className = 'iconfont iconzanting ';
        });
        //视频暂停事件
        videoContent.addEventListener('pause',()=>{
            console.log('pause');
            videoPlay.className = 'iconfont iconbofang';

        });
        
        //视频暂停事件
        videoContent.addEventListener('click',()=>{
            if(videoContent.paused) {
                videoContent.play();
               timer = setInterval(()=>{
                    playing();
                },1000)
            } else {    
                videoContent.pause();
                clearInterval(timer);
            }
            console.log('xxx');
        });
        //点击icon视频暂停事件
        videoPlay.addEventListener('click',()=>{
            if(videoContent.paused) {
                videoContent.play();
            } else {    
                videoContent.pause();
            }
            console.log('x111xx');
        });
        
        //点击视频全屏事件
        videoFull.addEventListener('click',()=>{
            videoContent.requestFullscreen();
        });

        
        
        //正在播放进度
        function playing() {
            videoTimes[0].innerHTML = formatTime(videoContent.currentTime);
        }

        function formatTime(number:number):string{
             number = Math.round(number);//四舍五入
            let min = Math.floor(number/60);
            let sec = number%60;//余
            return setZero(min) + ':' + setZero(sec);
        }

        function setZero(number:number):string{
           return  number>=10?'' +number:'0'+number;
       }

    }
}

export default video;