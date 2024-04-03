const valueP = document.getElementById("value");

const submit = document.getElementById("submit");

const allImages = ["banana.png", "bar.png", "bell.png", "cherry.png", "citron.png" , "melon.png", "orange.png", "plum.png", "seven.png"]

let value = 4 * allImages.length;
valueP.textContent = value;



class Image{
    constructor(path){
        this.path = path;
    }
}

class Container{
    constructor(container){
        this.container = container
        this.images = []
        this.midImage = ""
        this.fillImagesOnLoad()
        this.displayImages()
    }
    

    // vyplní this.images hodnotami
    fillImagesOnLoad(){
        
        // rnd number of filled images
        let randomNum = randomNumber(8,25);

        for(let i = 0; i < randomNum; i++){
            // rnd for getting random image
            let randomNum = randomNumber(0, allImages.length)            
            this.images.push(new Image(allImages[randomNum]))
        }            
    } 


    async changeImages(imageCopy){         
             
        // tři poslední
        const lastIndex = imageCopy.length
        for(let i = lastIndex - 3; i < lastIndex; i++){
             this.images.push(imageCopy[i])
        }

        for(let i = 0; i < randomNumber(8,25); i++){
            
            let randomNum = randomNumber(0, allImages.length)             
            this.images.push(new Image(allImages[randomNum]))
        } 
    }   

    async moveImages(){
       
       let i = 1;
       while(this.container.scrollTop !== this.container.scrollHeight - this.container.clientHeight){
            
            this.container.scrollTop += i;
            await sleep(30);     
            i++;
       }

       this.midImage = this.getMidImage()

       const copyImages = this.images
       this.images = []       

       this.changeImages(copyImages)
       this.displayImages()
    }

    displayImages(){

        for (let image of this.images) {
            // creating new img tag
            const newImg = document.createElement('img');

            // setting attributes to new img tag
            newImg.setAttribute("src",`images/${image.path}`)
            
            // displaing new img tag in html
            this.container.appendChild(newImg)
        }
    }

    getMidImage(){
        return this.images[this.images.length - 2].path
    }
    
}

function checkWin(){
    if(containerObj1.midImage != ""){
        // whole win
        if(containerObj1.midImage === containerObj2.midImage && containerObj2.midImage === containerObj3.midImage){
            value += 20
        }

        // part win

        if(containerObj1.midImage === containerObj2.midImage || containerObj2.midImage === containerObj3.midImage || containerObj1.midImage === containerObj3.midImage ){
            value += 2
        }
    }
}

const containerObj1 = new Container(document.getElementById("container1"))
const containerObj2 = new Container(document.getElementById("container2"))
const containerObj3 = new Container(document.getElementById("container3"))




submit.addEventListener("click", () => {
    if(value > 0){
        containerObj1.moveImages();
        containerObj2.moveImages();
        containerObj3.moveImages();
        checkWin() 
    }
    
    value > 0 ? value -= 1 : value = "Došli tokeny..."
    valueP.textContent = value;
});


// helper functions

function randomNumber(min,max){
    let randomNum
        do{
             randomNum = Math.floor(Math.random() * max)
        }while(randomNum < min)
    return randomNum;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
