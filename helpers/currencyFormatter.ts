export const currencyFormatter = (amount: string) => {
    const formattedAmount = amount?.toString()?.split(',')?.join('')?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedAmount;
}
