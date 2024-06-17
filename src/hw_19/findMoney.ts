function findMoney(str: string) {
  const money = str.match(/( \d+)+,?\d+[$₽]|\d+[$₽]/g);

  return money && Array.isArray(money) ? money : [];
}

// ['100 00,53$', '500₽']
console.log(
  findMoney(
    `20.10.2020 Федор взял у меня 100 00,53$ и обещался вернуть не поздее 25 числа, но уже через 2 дня, он занял еще 500₽, и всего он должен 999 999 999 999 999 999,999999999999$`,
  ),
);
