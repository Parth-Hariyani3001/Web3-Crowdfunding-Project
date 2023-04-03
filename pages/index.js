import React,{ Component } from 'react';
import factory from '../ethereum/factory'   //TO get the instance of the deployed contract

class CampaignIndex extends Component{

    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaings : campaigns};
    }
    
    render() {
        return(
            <div>{this.props.campaigns[0]}</div>
        )
    }
    
}

export default CampaignIndex;