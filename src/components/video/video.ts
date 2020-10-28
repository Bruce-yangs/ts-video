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
        let videoProgress= this.dom.querySelectorAll(`.${styles['video-progress']} div`);
        let videoVolprogress= this.dom.querySelectorAll(`.${styles['video-volprogress']} div`);
        let timer;

        videoContent.volume = .5;
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

        //点击视频条拖拽播放
        videoProgress[2].addEventListener('mousedown',function(ev:MouseEvent){         
             let downX = ev.pageX;   
             let downL = this.offsetLeft;   
             document.onmousemove=(ev:MouseEvent)=>{
                 //当前拖动的值-按下时的值 +距离+小圆球的宽度 除以父级
                 let scale = (ev.pageX - downX + downL + 8)/this.parentNode.offsetWidth;
                 if(scale<0){
                     scale=0;
                 }else if(scale>1){
                    scale=1;
                 }

                 //设置移动的样式
                 videoProgress[0].style.width = scale*100+'%';
                 videoProgress[1].style.width = scale*100+'%';
                 this.style.left = scale*100+'%';
                 //设置当前拖拽后的播放时间 根据当前进度比例 乘以总时间 得出当前时间
                 videoContent.currentTime = scale*videoContent.duration;
             };
             document.onmouseup = ()=>{
                 document.onmousemove = document.onmouseup = null;
             }
             ev.preventDefault();
        })
        
        videoVolprogress[1].addEventListener('mousedown',function(ev:MouseEvent){         
            let downX = ev.pageX;   
            let downL = this.offsetLeft;   
            document.onmousemove=(ev:MouseEvent)=>{
                //当前拖动的值-按下时的值 +距离+小圆球的宽度 除以父级
                let scale = (ev.pageX - downX + downL + 8)/this.parentNode.offsetWidth;
                if(scale<0){
                    scale=0;
                }else if(scale>1){
                   scale=1;
                }

                //设置移动的样式
                videoVolprogress[0].style.width = scale*100+'%';
                this.style.left = scale*100+'%';
                //设置当前拖拽后的音量
                videoContent.volume = scale;
            };
            document.onmouseup = ()=>{
                document.onmousemove = document.onmouseup = null;
            }
            ev.preventDefault();
       })




        //正在播放进度
        function playing() {
            //当前时间除以总时间 求出比例值
            let scale = videoContent.currentTime/videoContent.duration;
            //videoContent.buffered.end(0) 代表缓冲节点时间  求出scaleSuc缓存时间 比例
            let scaleSuc = videoContent.buffered.end(0)/videoContent.duration;
            videoTimes[0].innerHTML = formatTime(videoContent.currentTime);
            videoProgress[0].style.width = scale*100+'%';
            videoProgress[1].style.width = scaleSuc*100+'%';
            videoProgress[2].style.left = scale*100+'%';
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