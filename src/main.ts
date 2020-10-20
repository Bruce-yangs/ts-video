import './main.css'
import './iconfont/iconfont.css'
import popup from './components/popup/popup'
import video from './components/video/video'

// let a: string = "hello1";

// console.log(a);

let listItem = document.querySelectorAll('#list li');

for (let i = 0; i < listItem.length; i++) {
    listItem[i].addEventListener('click', function () {
        let url = this.dataset.url;
        let title = this.dataset.title;
        console.log(title, url)

        popup({ width: '880px', height: '556px', title, pos: 'center', mask: true ,content(elem){
            console.log(elem);
            video({url,elem});
        }});
    })
}