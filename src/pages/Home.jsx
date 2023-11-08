import React, { useState, useEffect } from 'react';
import axios from 'axios';

const placeholderImageURL =
  'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg';

const mccImageMapping = {
  4225: "https://www.adani.com/-/media/Project/Adani/Blog/Growing-apple-red-smiles/blog-banner/Gautam-Adani-IRMA-Speech.jpg",
  8299: "https://imgs.search.brave.com/uxn2uoLhYKZMhPE2h5z-AZvBRsu_4az6OalxnLdIdZM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTE1/MjYyMzIwL3Bob3Rv/L2VsZW1lbnRhcnkt/c2Nob29sLWdpcmwt/YXQtdGhlLWZyb250/LW9mLXRoZS1zY2hv/b2wtYnVzLXF1ZXVl/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz01SWxQbk9VSGpE/TjBtS2UzLWdYd0Yt/aDVwY0lmWWpXdjFz/b2wyVzNydzUwPQ",
  8062: "https://imgs.search.brave.com/VyCdsnmf9eJ4xlZGV4lFeK5QhWJFjiBNukX7l6RG984/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzc4Lzk4LzU2/LzM2MF9GXzI3ODk4/NTYyOV9Td1lQUzJC/ZmtxWVlHSU5jZzBn/QjNLRzdnUXVSdkFJ/RS5qcGc",
  4722: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHjtD1z3RT5ZYBNXUGS3PEzBQXVBl7jLHubw&usqp=CAU",
  5912: "https://imgs.search.brave.com/rj6LxtVfbGOwbSgcZ7l6mVleuNvaRDljEqe9oWOha3U/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJpdGFubmljYS5j/b20vMzAvMTMwODMw/LTA1MC02RDg4MDYw/Qi9UdW1zLWNhbGNp/dW0tY2FyYm9uYXRl/LWluZ3JlZGllbnQu/anBnP3c9MjAwJmg9/MjAwJmM9Y3JvcA",
};

const mccToNameMapping = {
  4225: "AGRICULTURE",
  5912: "PHARMACEUTICAL",
  4722: "TRAVEL",
  8299: "EDUCATION",
  8062: "HEALTH CARE",
};

const Home = () => {
  const [vouchers, setVouchers] = useState([]);
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    // Fetch Vouchers data
    const fetchVoucherData = async () => {
      try {
        const response = await axios.get('https://erupi.vercel.app/api/vouchers?status=Active');
        setVouchers(response.data);
      } catch (error) {
        console.error('Error fetching voucher data:', error);
      }
    };

    fetchVoucherData();

    // Fetch Schemes data
    const fetchSchemesData = async () => {
      try {
        const response = await axios.get('https://erupi.vercel.app/api/schemes');
        setSchemes(response.data);
      } catch (error) {
        console.error('Error fetching schemes data:', error);
      }
    };

    fetchSchemesData();
  }, []);

  const [hoveredScheme, setHoveredScheme] = useState(null);
  return (
    <div>
      {/* E-Rupi section */}
      <div
        style={{
          backgroundColor: '#fff',
          flex: 1,
          padding: 20,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflowX: 'hidden',
        }}
      >
        <div
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <img
            src="https://miro.medium.com/v2/resize:fit:1358/1*9m-WDdL_ji01bGbjEnutEw.gif"
            style={{
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
            }}
            alt="Wallet"
          />
        </div>

        <div
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginTop: '40px',
            marginBottom: '40px',
            textAlign: 'center',
          }}
        >
          E-Rupi
        </div>
        <p style={{ textAlign: 'center' }}>
          Welcome to E-Rupi! We provide convenient digital solutions for various sectors. Explore vouchers and discover our schemes to make the most of our services.
          The users of this seamless one-time payment mechanism will be able to redeem the voucher without a card, digital payments app or internet banking access, at the merchants accepting e-RUPI. e-RUPI would be shared with the beneficiaries for a specific purpose or activity by organizations or Government via SMS or QR code.

          This contactless e-RUPI is easy, safe and secure as it keeps the details of the beneficiaries completely confidential. The entire transaction process through this voucher is relatively faster and at the same time reliable, as the required amount is already stored in the voucher.
        </p>
        <button
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            background: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Login
        </button>
      </div>

      {/* Voucher Section */}
      <div>
  <h2 style={{ fontSize: 34, fontWeight: 'bold', margin: 20 }}>
    Explore Vouchers
  </h2>
  <div style={styles.voucherContainer}>
    {vouchers.map((voucher, index) => (
      <div key={index} style={styles.voucherCard}>
        <div style={styles.voucherImageContainer}>
          <img
            src={mccImageMapping[voucher.mcc] || placeholderImageURL}
            alt="Coupon"
            style={styles.voucherImage}
          />
        </div>
        <div style={styles.voucherDetails}>
          <h3 style={styles.voucherTitle}>
          {voucher.purpose}
          </h3>
          <p style={styles.voucherNumber}>  {mccToNameMapping[voucher.mcc] || 'Unknown'}</p>
        </div>
      </div>
    ))}
  </div>
</div>




      {/* Your Schemes section */}
      <div>
        <h2 style={{ fontSize: 34, fontWeight: 'bold', margin: 20, marginTop:30 }}>
          Schemes for you
        </h2>
        <div style={styles.schemesContainer}>
          {schemes.map((scheme, index) => (
            <a
              key={index}
              href={scheme.link}
              style={{
                ...styles.schemeCard,
                transform: hoveredScheme === index ? 'scale(1.09)' : 'scale(1.0)',
              }}
              target="_blank"
              onMouseEnter={() => setHoveredScheme(index)}
              onMouseLeave={() => setHoveredScheme(null)}
            >
              <div style={styles.schemeImageContainer}>
                <img
                  src={mccImageMapping[scheme.mcc] || placeholderImageURL}
                  alt="Coupon"
                  style={styles.schemeImage}
                />
              </div>
              <div style={styles.schemeDetails}>
                <h3 style={styles.schemeTitle}>{scheme.title}</h3>
                <p style={styles.schemeContent}>{scheme.organization}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};


const styles = {

  voucherContainer: {
    display: 'flex',
    overflowX: 'auto',
    padding: '0 20px',
  },
  voucherCard: {
    width: 240,
    margin: 10,
    borderRadius: 10,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#f4e3b2',
    display: 'flex',
    flexDirection: 'column',
  },
  voucherImageContainer: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voucherImage: {
    width: 220,
    height: 140,
  },
  voucherDetails: {
    padding: 10,
  },
  voucherTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: '10px 0',
    textAlign: 'center',
  },
  voucherNumber: {
    fontSize: 14,
    textAlign: 'center',
  },

  schemesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  schemeCard: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textDecoration: 'none',
    color: 'inherit',
    width: 300,
    transition: 'transform 0.3s',
    overflow: 'hidden',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  schemeImageContainer: {
    flex: 1,
  },
  schemeImage: {
    width: '100%',
    height: 'auto',
    transition: 'transform 0.3s',
  },
  schemeDetails: {
    padding: '10px',
  },
  schemeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: '10px 0',
  },
  schemeContent: {
    fontSize: 14,
  },
};

const hoverStyles = {
  voucherCard: {
    transform: 'scale(1.05)',
  },
  voucherImage: {
    transform: 'scale(1.1)',
  },
  schemeCard: {
    transform: 'scale(1.05)',
  },
  schemeImage: {
    transform: 'scale(1.1)',
  },
};

export default Home;
