import React, { Component } from "react";

class NotFound extends Component {
/*  state = { web3: null, accounts: null, contract: null, vin: '', report: '', inputRValue:'', inputWValue:'', brand: '', model: '', immatDate: '' };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleVINContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleVINContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
*/

  render() {
    
    return (
      <p> Not Found </p>
    );
  }
}

export default NotFound;
