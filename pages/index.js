import React,{ Component } from 'react';
import factory from '../ethereum/factory';   //TO get the instance of the deployed contract
import { Card,Button } from 'semantic-ui-react'; 
import 'semantic-ui-css/semantic.min.css';
import Layout from '../Components/Layout';

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
            <Layout>
                {/* <div>{this.props.campaigns[0]}</div> */}
                <div>
                    <h1>Open Campaigns</h1>
                    <Button 
                        content = "Create Campaign"
                        icon = "add circle"
                        primary
                        floated = "right"
                    />
                    {this.renderCampaings()}
                </div>
            </Layout>
        )
    }
    
}


export default CampaignIndex;