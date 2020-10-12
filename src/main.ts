import './main.css'
import './iconfont/iconfont.css'

// let a: string = "hello1";

// console.log(a);

let listItem = document.querySelectorAll('#list li');

for(let i=0;i<listItem.length;i++) {
    listItem[i].addEventListener('click',function(){
        let url = this.dataset.url;
        let title = this.dataset.title;
        console.log(title,url)
    })
}