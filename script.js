var data=fetch('https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json').then(response=> response.json())

var body = document.getElementById("body");
var Row = () => document.createElement("tr");
var td = () => document.createElement("td");
var btn = () => document.createElement("button");
var first= document.getElementById("first");
var prev = document.getElementById("prev");
var pages = document.getElementById("pages");
var next = document.getElementById("next");
var last = document.getElementById("last");
var cpage = document.getElementById("currentPage");

class Pagination {
    constructor(){
        this.firstIndex=0;

        //creating buttons for pages
        data.then(data =>{
            let tpages=data.length/10;
            for(let i=0 ; i < tpages ; i++)
            {
                var pbtn= btn();
                pbtn.setAttribute(`onclick`,`page.setPage(${i})`);
                pbtn.setAttribute(`class`,`btn`);
                pbtn.innerHTML=i+1;
                pages.append(pbtn);
            }
        }).catch(error => console.log(error));
    }

    button(){
        data.then(data =>{

            if(this.firstIndex < data.length-10 && this.firstIndex >= 0)
            {
                next.style.display = "block";
            }else{
                next.style.display = "none";
            }

            if(this.firstIndex > 0 && this.firstIndex < data.length){
                prev.style.display = "block";
            }else{
                prev.style.display = "none";
            }
        }).catch(error => console.log("error"))
    }

    display(){
        data.then(data =>{
            console.log(data.length);
            cpage.innerHTML=(this.firstIndex/10)+1;


            body.innerHTML=''
            for(let i = this.firstIndex ; i< this.firstIndex+10 ; i++){

                let row = Row();
                // row.setAttribute(`class`,`row`)
                let rowData = [td(),td(),td()]
                rowData[0].innerHTML=data[i].id
                rowData[1].innerHTML=data[i].name
                rowData[2].innerHTML=data[i].email
                row.append(...rowData)
                body.append(row)
            }
         }).catch(error => console.log("error"))
        this.button()
    }

    next(){
        this.firstIndex = this.firstIndex+10;
        this.display();
    }

    prev(){
        this.firstIndex = this.firstIndex-10;
        this.display();
    }

    setPage(num){
        this.firstIndex= num*10;
        this.display();
    }

    lastPage(){
        data.then(data =>{
            this.setPage((this.firstIndex/10)-1);
        }).catch(error => console.log("error"))
    }
    
}

let page =new Pagination()
page.display()

first.addEventListener('click', () =>page.setPage(0));
last.addEventListener('click', () => page.lastPage());
next.addEventListener('click',() =>page.next);
prev.addEventListener('click',() =>page.prev);