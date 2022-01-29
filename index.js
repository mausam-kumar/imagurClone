async function fetchData(text){
    const data = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${text}&per_page=10&client_id=SnzbZhFmgR6MNERoBr_Q7A3xxxo4yrVC9wbLHDlAoXQ`)

    const res = await data.json()
    
    return res
}
function createDiv(url,description){
    let divEle = document.createElement('div')
    let imgEle = document.createElement('img')
    let pEle = document.createElement('p')

    imgEle.src = url
    pEle.innerText = description
    divEle.append(imgEle)
    divEle.append(pEle)

    return divEle
}
async function addPic(text){
    let div = document.querySelector('.image_container')
    div.innerHTML = ""
    var {results} = await fetchData(text)
    
    results.forEach((ele) => {
        var res = createDiv(ele.urls.raw,ele.alt_description)
        div.appendChild(res)

    })
}

function handleSearch(){
    var text = document.querySelector('#search_bar').value
    
    // console.log("mausam")
    addPic(text)
}

const debounce = (func,delay) => {
    let id;
    return function() {
        
        let context = this
        let args = arguments
        clearTimeout(id)
        
        id = setTimeout(() => func.apply(context,args), delay)
        
    }
} 

(
    function pageLoad(){
        document.querySelector('#search_bar').addEventListener('keyup', debounce(handleSearch,700))
        addPic("viral")
    }
)()

function categorySearch(){
    let div = document.querySelector('.image_container')
    div.innerHTML = ""
    var text = event.target.innerText
   
    text===undefined? div.innerHTML = "":addPic(text)
}

