export type isExpiredType = (
    cardId:any
  ) => Promise<boolean>

  export type getBusinessType = (
    businessdId:number,
    currentCard:any
  ) => Promise<any>