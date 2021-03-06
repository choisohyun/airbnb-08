import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  width: 400px;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: ${({ theme }) => theme.large};
  color: ${({ theme }) => theme.subColor};
  .dash {
    font-size: ${({ theme }) => theme.medium};
  }
`;

const PriceWrapper = styled.div`
  width: 150px;
  height: 60px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.subColor};
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  .title {
    font-size: ${({ theme }) => theme.medium};
  }
  .price {
    margin-top: 5px;
    color: ${({ theme }) => theme.mainColor};
    font-weight: bold;
  }
`;

const SelectedRange = () => {
  const {
    priceRangeReducer: { priceRange },
  } = useSelector((state) => state);

  return (
    <Wrapper>
      <PriceWrapper>
        <p className="title">최저 요금</p>
        <p className="price">₩ {priceRange[0]}</p>
      </PriceWrapper>
      <span className="dash">ㅡ</span>
      <PriceWrapper>
        <p className="title">최고 요금</p>
        <p className="price">₩ {priceRange[1] >= 1000000 ? "1000000+" : priceRange[1]}</p>
      </PriceWrapper>
    </Wrapper>
  );
};

export default SelectedRange;
