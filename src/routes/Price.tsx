import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinPrice } from "./api";

const PriceInfo = styled.ul``;

const PriceInfos = styled.li`
  color: ${(props) => props.theme.bgColor};
  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    background-color: #f5f6fa;
    border-radius: 15px;
    margin-bottom: 10px;
    color: #4cd137;
    font-weight: 700;
    font-size: 30px;
    span {
      color: black;
    }
  }
`;

interface PriceProps {
  coinId: string;
}

interface priceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<priceData>(["price", coinId], () =>
    fetchCoinPrice(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <PriceInfo>
          <PriceInfos>
            <div>
              <span>가격</span>${data?.quotes.USD.price.toFixed(3)}
            </div>
            <div>
              <span>24h</span>
              {data?.quotes.USD.percent_change_24h}%
            </div>
          </PriceInfos>
        </PriceInfo>
      )}
    </div>
  );
}

export default Price;
