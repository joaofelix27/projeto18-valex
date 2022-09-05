export interface activateType  {
    cardId:number,cardCVC:string,password:string
  }

  export interface blockType  {
    cardId:number,password:string
  }
  export interface rechargeType  {
    cardId:number,recharge:number
  }

  export interface purchaseType  {
    cardId:number,price:number,password:string,businessId:number
  }
  export interface balanceType  {
    cardId:number
  }

  export interface onlinePurchaseType  {
    number:string,name:string,expirationDate:string,cardCVC:string,price:number,businessId:number
  }
