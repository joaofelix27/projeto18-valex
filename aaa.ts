// import dayjs from "dayjs";

// interface transactionType  {
//     price:number,
//     discount:number,
//     createdAt:EpochTimeStamp,
//     approvedAt:EpochTimeStamp
// }
// type renderTransactionFormat = (
//     listElement:HTMLBRElement, 
//     transaction:transactionType
// ) => void

// const  renderTransaction: renderTransactionFormat = (listElement, transaction)=> {
//     const {price,discount,createdAt,approvedAt}=transaction
// 	const discountedPrice = price * (1 - discount);

// 	const itemElement = document.createElement("li");
// 	itemElement.innerHTML = itemElementFunction(price,discountedPrice,createdAt,approvedAt);
	
// 	listElement.appendChild(itemElement);
// }

// function formatPrice (price:number){
//     return (price / 100).toFixed(2).replace('.', ',')
// }
// function formatDiscountPrice (discountedPrice:number){
//     return (discountedPrice / 100).toFixed(2).replace('.', ',')
// }
// function formatDate (createdAt:EpochTimeStamp){
//     return dayjs(createdAt).format('DD/MM/YYYY')
// }
// function itemElementFunction (price:number,discountedPrice:number,createdAt:EpochTimeStamp,approvedAt:EpochTimeStamp){
//     return `
//     Preço: R$ ${formatPrice(price)}<br>
//     Preço com desconto: R$ ${formatDiscountPrice(discountedPrice)}<br>
//     Criado em: ${formatDate(createdAt)}<br>
//     Aprovado em: ${formatDate(approvedAt)}<br>
//     `
// }