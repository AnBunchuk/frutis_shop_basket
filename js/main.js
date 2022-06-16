'use strict'

class Basket {
    constructor() {
        this.sectionSmall = document.querySelector('.small');
        this.sectionBig = document.querySelector('.big');
        this.spanCalc = document.getElementById('calc');
        this.myPicture = ["pic01.png", "pic02.png", "pic03.png", "pic04.png", "pic05.png", "pic06.png", "pic07.png", "pic08.png"];
        this.pictureHost = 'img';
        this.flag = false;
        this.elementMove;
        this.basketDecart = this.sectionBig.getBoundingClientRect();
        this.shelfDecart = this.sectionSmall.getBoundingClientRect();
    }

    // добавляем картинки товаров в магазин
    addPicture() {
        this.myPicture.forEach(v => {
            // let newDiv = document.createElement('div');
            // section.append(newDiv);
            let newImg = document.createElement('img');
            newImg.setAttribute('src', `${this.pictureHost}/${v}`);
            newImg.setAttribute('width', '90%');
            newImg.setAttribute('draggable', 'false')
            // newImg.ondragstart = () => false
            this.sectionSmall.append(newImg);

            this.decart = {};
        })

    }

    // событие нажатие кнопки
    mouseDown() {
        document.addEventListener('mousedown', (event) => {
            this.flag = true;
            this.elementMove = event.target;//присваеем перетягиваемому обьекту картинку на которую нажали
        })
    }
    // событие перетягивания
    mouseMove() {
        document.addEventListener('mousemove', (event) => {

            if (this.flag) {
                // если флаг тру, присваеваем img style обсолютное позиционирование(т.е. убираем из потока)
                this.elementMove.style.position = 'absolute';
                // новые координаты элементу img, чтобы двигался вместе с курсором
                this.elementMove.style.left = event.pageX + 'px';
                this.elementMove.style.top = event.pageY + 'px';
                // чтобы курсор был посередине элемента
                // если оставлять курсор в том месте где нажали, 
                // то доп вычитать координаты первичного положения курсора
                this.elementMove.style.transform = 'translate(-50%, -50%)';
            }
        })
    }
    // действие отжатия кнопки
    mouseUp() {
        document.addEventListener('mouseup', (event) => {
            this.flag = false;
            // координаты области в какой при попадании в которую элемент остается в новом месте
            if (event.pageX > this.basketDecart.left && event.pageX < this.basketDecart.right
                && event.pageY > this.basketDecart.top && event.pageY < this.basketDecart.bottom) {
                // добавляю перетаскиваемый обьект в существующую разметку big
                this.sectionBig.append(this.elementMove)
                // удаляю атрибут style с позиционированием и координатами из img
                this.elementMove.removeAttribute('style')
            }
            // координаты области в какой при попадании в которую элемент остается в новом месте
            if (event.pageX > this.shelfDecart.left && event.pageX < this.shelfDecart.right
                && event.pageY > this.shelfDecart.top && event.pageY < this.shelfDecart.bottom) {
                // добавляю перетаскиваемый обьект в small
                this.sectionSmall.append(this.elementMove)
                // удаляю атрибут style с позиционированием и координатами из img
                this.elementMove.removeAttribute('style')
            } 
            else {
                // если условие не выполнено элемент вернулся в исходное положение
                this.elementMove.removeAttribute('style')
            }
            this.calcBasket()
        })
    }

    // калькулятор товаров в корзине
    calcBasket() {
        let arrImg = this.sectionBig.querySelectorAll('img')
        this.spanCalc.innerText = arrImg.length
    }

    init() {
        this.addPicture()
        this.mouseDown()
        this.mouseMove()
        this.mouseUp()


    }

}






















// делегирование///////////////////////////////////
// sectionSmall[0].addEventListener('click', function (e) {
//     let element = e.target;
//     console.dir(element)
//     if (element.localName == 'img') {
//         console.log(e.target)
//         ++calc
//         sectionBig[0].append(element);// добавляем в большое поле
//         spanCalc.innerText = calc
//     }
// })






