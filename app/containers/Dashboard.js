import React, { Component } from "react";
import { connect } from "react-redux";
import SplitPane from "react-split-pane";
import { Link } from "react-router";
import QRCode from "qrcode";
import axios from "axios";
import numeral from "numeral";
import { resetKey } from "../modules/generateWallet";
import FaArrowUpward from "react-icons/lib/fa/arrow-circle-up";
import { NetworkSwitch } from "../components/NetworkSwitch";
import WalletInfo from "../components/WalletInfo";
import TransactionHistory from "../components/TransactionHistory";
import SelectExchange from "../components/SelectExchange";
import Support from "../components/Support";
import Tokens from "../components/Tokens";
import { initiateGetBalance, intervals } from "../components/NetworkSwitch";
import { sendEvent, clearTransactionEvent } from "../modules/transactions";
import { togglePane } from "../modules/dashboard";
import { version } from "../../package.json";
import { log } from "../util/Logs";
import { Accordion, AccordionItem } from "react-sanfona";

import Logout from "../components/Logout";
import Send from "../components/Send";
import SendRPX from "../components/SendRPX";
import SendDBC from "../components/SendDBC";
import SendQLC from "../components/SendQLC";
import SendHP from "../components/SendHP";
import SendBTC from "../components/SendBTC";
import SendLTC from "../components/SendLTC";
import AssetPortfolio from "../components/AssetPortfolio";
import Dashlogo from "../components/Brand/Dashlogo";
import ReactTooltip from "react-tooltip";
import CountUp, { startAnimation } from "react-countup";
import TopBar from "../components/TopBar";
import NewBitcoin from "../components/NewBitcoin";
import ReceiveBitcoin from "../components/ReceiveBitcoin";
import NewLitecoin from "../components/NewLitecoin";
import ReceiveLitecoin from "../components/ReceiveLitecoin";

const refreshBalance = (dispatch, net, address) => {
  dispatch(sendEvent(true, "Refreshing..."));
  initiateGetBalance(dispatch, net, address).then(response => {
    dispatch(sendEvent(true, "Received latest blockchain information."));
    setTimeout(() => dispatch(clearTransactionEvent()), 1000);
  });
};

const resetGeneratedKey = dispatch => {
  dispatch(resetKey());
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      combinedPrice: 0
    };
  }

  async componentDidMount() {
    // only logging public information here
    await log(this.props.net, "LOGIN", this.props.address, {});
    await initiateGetBalance(
      this.props.dispatch,
      this.props.net,
      this.props.address,
      this.props.btc,
      this.props.price
    );
    resetGeneratedKey(this.props.dispatch);
    await this.getCombinedBalance(this.props.neo, this.props.gas, this.props.btc);
  }

  getCombinedBalance = async (neo, gas, btc) => {
    let neoPrice = await axios.get(
      "https://api.coinmarketcap.com/v1/ticker/neo/"
    );
    let gasPrice = await axios.get(
      "https://api.coinmarketcap.com/v1/ticker/gas/"
    );
    let btcPrice = await axios.get(
      "https://api.coinmarketcap.com/v1/ticker/bitcoin/"
    );
    neoPrice = neoPrice.data[0].price_usd;
    gasPrice = gasPrice.data[0].price_usd;
    btcPrice = btcPrice.data[0].price_usd;

    let value = neoPrice * neo + gasPrice * gas + marketBTCPrice * btc;
    let combinedPrice = Math.round(value * 100) / 100;
    this.setState({ combinedPrice: combinedPrice });
  };

  render = () => {
    let sendPaneClosed;
    if (this.props.sendPane == true) {
      sendPaneClosed = "0%";
    } else {
      if (this.props.confirmPane == false) {
        sendPaneClosed = "21%";
      } else {
        sendPaneClosed = "15%";
      }
    }

    let dash = (
      <div className="">
        <WalletInfo />
      </div>
    );

    if (this.props.location.pathname !== "/dashboard") {
      dash = <div />;
    }

    return (
      <div>
        <div id="mainNav" className="main-nav">
          <div className="navbar navbar-inverse">
            <div className="navbar-header">
              <div
                className="logoContainer fadeInDown"
                onClick={() =>
                  refreshBalance(
                    this.props.dispatch,
                    this.props.net,
                    this.props.address
                  )
                }
              >
                <Dashlogo width={85} />
              </div>

              <div
                id="balance"
                onClick={(event) => {
                  startAnimation(
                  this.totalCountUp
                )
              }}
              >

                <CountUp
                  className="account-balance"
                  end={this.props.combined}
                  duration={2}
                  useEasing={true}
                  useGrouping={true}
                  separator=","
                  decimals={2}
                  decimal="."
                  prefix="$"
                  ref={(countUp) => {
                    this.totalCountUp = countUp;
                  }}
                />

                <span className="bal-usd">USD</span>
                <span className="comb-bal">Available Balance</span>
              </div>

            </div>
            <div className="clearfix" />
            <hr className="dash-hr" />
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li>
                  <Link to={"/dashboard"} activeClassName="active">
                    <div className="glyphicon glyphicon-stats" /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to={"/assetPortfolio"} activeClassName="active">
                    <div className="glyphicon glyphicon-dashboard" /> Portfolio
                  </Link>
                </li>
                <li>
                <div className="margin-10">
                <span className="glyphicon glyphicon-send float-left" /> <Accordion>
                <AccordionItem title="Send" titleClassName="menu-accord-item">
                  <ul className="menu-accord">
                  <li className="menu-accord-li">
                  <Link to={"/send"} >
                     NEO/GAS
                  </Link>
                  </li>
                  <li className="menu-accord-li">
                  <Link to={"/sendBTC"} >
                     Bitcoin (BTC)
                  </Link>
                  </li>
                  <li className="menu-accord-li">
                  <Link to={"/sendLTC"} >
                     Litecoin (LTC)
                  </Link>
                  </li>
                  </ul>
                </AccordionItem>
                  </Accordion>
                  </div>
                </li>

                <li>
                <div className="margin-10">
                <span className="glyphicon glyphicon-qrcode float-left" />
                <Accordion>
                <AccordionItem title="Receive" titleClassName="menu-accord-item">
                  <ul className="menu-accord">
                  <li className="menu-accord-li">
                  <Link to={"/receive"} activeClassName="active">
                     NEO/GAS/NEP5
                  </Link>
                  </li>
                  <li className="menu-accord-li">
                  <Link to={"/receiveBitcoin"} activeClassName="active">
                     Bitcoin (BTC)
                  </Link>
                  </li>
                  <li className="menu-accord-li">
                  <Link to={"/receiveLitecoin"} activeClassName="active">
                     Litecoin (LTC)
                  </Link>
                  </li>
                  </ul>
                </AccordionItem>
                  </Accordion>
                </div>
                </li>


                <li>
                <div className="margin-10">
                <span className="glyphicon glyphicon-list-alt float-left" />
                <Accordion>
                <AccordionItem title="Transactions" titleClassName="menu-accord-item">
                  <ul className="menu-accord">
                  <li className="menu-accord-li">
                  <Link to={"/transactionHistory"} activeClassName="active">
                     NEO/GAS/NEP5
                  </Link>
                  </li>
                  <li className="menu-accord-li">
                  <Link to={"/transactionHistoryBTC"} activeClassName="active">
                     Bitcoin (BTC)
                  </Link>
                  </li>
                  <li className="menu-accord-li">
                  <Link to={"/transactionHistoryLTC"} activeClassName="active">
                     Litecoin (LTC)
                  </Link>
                  </li>
                  </ul>
                </AccordionItem>
                  </Accordion>
                </div>
                </li>

                <li>
                  <Link to={"/ledger"} activeClassName="active">
                    <span className="glyphicon glyphicon-th-large" /> Ledger
                  </Link>
                </li>
                <li>
                  <Link to={"/selectExchange"} activeClassName="active">
                    <span className="glyphicon glyphicon-refresh" /> Exchange
                  </Link>
                </li>
                <li>
                  <Link to={"/settings"} activeClassName="active">
                    <span className="glyphicon glyphicon-lock" /> Settings
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <span className="dashnetwork">Network: {this.props.net}</span>
          <div className="copyright">&copy; Copyright 2018 Morpheus</div>
        </div>
        <div className="main-container">
        <TopBar />
          {this.props.children}
          {dash}
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  sendPane: state.dashboard.sendPane,
  confirmPane: state.dashboard.confirmPane,
  blockHeight: state.metadata.blockHeight,
  net: state.metadata.network,
  address: state.account.address,
  neo: state.wallet.Neo,
  gas: state.wallet.Gas,
  btc: state.wallet.Btc,
  btcLoggedIn: state.account.btcLoggedIn,
	btcPrivKey: state.account.btcPrivKey,
	btcPubAddr: state.account.btcPubAddr,
	btcLoginRedirect: state.account.btcLoginRedirect,
  price: state.wallet.price,
  combined: state.wallet.combined
});

Dashboard = connect(mapStateToProps)(Dashboard);

export default Dashboard;
