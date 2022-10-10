let onlyNumbRegExp = /[0-9]/,
   wordSpaceRegExp = /^[A-Za-z\s]+$/,
   regExp = /[0-9]{4}/

const cardNumber = document.querySelector('#number')
const nameInput = document.querySelector('#name')
const monthInput = document.querySelector('#month')
const yearInput = document.querySelector('#year')
const cvcInput = document.querySelector('#cvc')
let date = new Date()
// const inputObj = {
//    0: "Номер карты",
//    1: "Имя",
//    2: "Месяц",
//    3: "Год",
//    4: "CVC/CVV"
// }

const checkNumbInput = (e, input, lengthNumb, nextInput) => {
   if( e.inputType === "insertText" && !onlyNumbRegExp.test(e.data) || input.value.length > lengthNumb){
      input.value = input.value.slice(0, input.value.length - 1)
      return
  }

  if(input.value.length === lengthNumb) nextInput.focus()
}

cardNumber.oninput = (e) => {
   
   checkNumbInput(e, cardNumber, 19, nameInput)

  if( e.inputType === "deleteContentBackward" && regExp.test(cardNumber.value.slice(-4)) ){
   cardNumber.value = cardNumber.value.slice(0, cardNumber.value.length - 1)
   return
}
   if( regExp.test(cardNumber.value.slice(-4)) && cardNumber.value.length < 19) cardNumber.value += " "

   let cardNumbArr = [...cardNumber.value]
   cardNumbArr = cardNumbArr.filter(elem => elem !== ' ')
   if(cardNumbArr.join('').length > 5){
      let cardInfo = new CardInfo(cardNumbArr.join(''), {
         banksLogosPath: './node_modules/card-info/dist/banks-logos/',
         brandsLogosPath: './node_modules/card-info/dist/brands-logos/'
      })
      document.querySelector('#bank').src = cardInfo.bankLogo
      document.querySelector('#logo').src = cardInfo.brandLogo
      document.querySelector('.card__front').style.backgroundColor = cardInfo.backgroundColor
   }
}

nameInput.oninput = (e) => {
   if( e.inputType === "insertText" && !wordSpaceRegExp.test(e.data)){
      nameInput.value = nameInput.value.slice(0, nameInput.value.length - 1)
      return
  }
  nameInput.value = nameInput.value.toUpperCase()
}

monthInput.oninput = (e) => {
   checkNumbInput(e, monthInput, 2, yearInput)
}

yearInput.oninput = (e) => {
   checkNumbInput(e, yearInput, 2, cvcInput)
}

cvcInput.oninput = (e) => {
   checkNumbInput(e, cvcInput, 3, cvcInput)
}

document.querySelector('#continue').onclick = () => {
   if(nameInput.value.split(' ').length === 2 && cardNumber.value.length === 19 && monthInput.value <= 12 && Number.parseInt(20 + yearInput.value) >= date.getFullYear()){
      document.querySelector('.error').textContent = 'Дальше отправка чека на почту по планам или письмо с ошибкой оплаты'
      document.querySelector('.error').style.display = "block"
   }
   else document.querySelector('.error').style.display = "block"
}


