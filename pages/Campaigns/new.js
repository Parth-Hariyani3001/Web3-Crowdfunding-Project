import React,{Component } from "react";
import Layout from "../../Components/Layout";
import 'semantic-ui-css/semantic.min.css';
import { Button,Form,Input,Message } from "semantic-ui-react";
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";
import { isLocalURL } from "next/dist/shared/lib/router/router";


class CampaignNew extends Component{
    
    state = {
        minimumContribution : '',
        errorMessage : '',
        isLoading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isLoading : true, errorMessage : '' });
        try{
            
            const accounts = await web3.eth.getAccounts(); 
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from : accounts[0]
                })
            isLoading = false
        } catch (err) {
            this.setState({ errorMessage : err.message })
        }

        this.setState({ isLoading : false });
    };
    
    render() {
        return(
            <Layout>
                <h3>Create a Campaign</h3>
                <Form onSubmit={this.onSubmit} error = {!!this.state.errorMessage}>
                    <Form.Field> 
                        <label>Minimum Contribution</label>
                        <Input
                            value={this.state.minimumContribution} 
                            onChange={event => this.setState({ minimumContribution : event.target.value})}
                            label="in Wei" labelPosition="right"/>
                    </Form.Field>

                    <Message error header="Oops!" content={this.state.errorMessage} />

                    <Button className="ui button" type="submit" primary loading={this.state.isLoading}>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;