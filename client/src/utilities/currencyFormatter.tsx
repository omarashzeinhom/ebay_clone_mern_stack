const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "USD", style: "currency"
});

export function currencyFormatter(number: number){
    return CURRENCY_FORMATTER.format(number);

}