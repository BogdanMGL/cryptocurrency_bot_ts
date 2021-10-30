interface GetListCryptocurrencies {
    data: {
      symbol: string;
      quote: {
        USD: {
          price: number;
        };
      };
    }[];
  }
  interface ResponsList {
    data: GetListCryptocurrencies;
  }

  interface GetСryptocurrency {
    data: {
      [key: string]: {
        symbol: string;
        name: string;
        quote: {
          USD: {
            [key: string]: string | number;
          };
        };
      };
    };
  }

  interface ResponseItem {
    data: GetСryptocurrency;
  }

export {
  GetListCryptocurrencies, ResponsList, GetСryptocurrency, ResponseItem,
};
