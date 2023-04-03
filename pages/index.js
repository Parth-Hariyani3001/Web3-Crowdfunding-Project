import React,{ Component } from 'react';
import factory from '../ethereum/factory';   //TO get the instance of the deployed contract
import { Card } from 'semantic-ui-react'; 

class CampaignIndex extends Component{

    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return {campaigns};    //OR {campaigns}
    }
    
    renderCampaings() {
        const items = this.props.campaigns.map(address => {
            return {
                header : address,
                description : <a>View Campaigns</a>,
                fluid : true
            };
        });

        return <Card.Group items={items} />
    }


    render() {
        return(
            // <div>{this.props.campaigns[0]}</div>
            <div>{this.renderCampaings()}</div>
        )
    }
    
}


export default CampaignIndex;