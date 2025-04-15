export const transformPortfolio = (data: any) => ({
  portfolioValue: data.portfolioValue ?? 0,
  currency: data.currency ?? 'USD',
})

export const transformPortfolioHistory = (data: any[]) => {
  return data.map((item) => ({
    date: item.date,
    value: item.value,
  }))
}
