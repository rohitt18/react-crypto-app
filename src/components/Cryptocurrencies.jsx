import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptoQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptoQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
    //to search a coin in an array of 100 coins
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setCryptos(filteredData);

  }, [cryptosList, searchTerm])
  
  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
      <div className="search-crypto">
          <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currensy) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currensy.id}>
            <Link to={`/crypto/${currensy.id}`}>
              <Card
                title={`${currensy.rank}. ${currensy.name}`}
                extra={<img className="crypto-image" src={currensy.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currensy.price)}</p>
                <p>Market Cap: {millify(currensy.marketCap)}</p>
                <p>Daily Change: {millify(currensy.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
