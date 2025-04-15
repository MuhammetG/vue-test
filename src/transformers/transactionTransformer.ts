export interface Transaction {
  id: number
  date: string
  type: string
  asset: string
  amount: number
  price: number
}

export const transformTransactions = (data: any[]): Transaction[] => {
  return data.map((item, index) => ({
    id: item.id ?? index,
    date: item.date,
    type: item.type,
    asset: item.asset,
    amount: item.amount,
    price: item.price,
  }))
}
