pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum,msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address=>bool) approvals;
    }
    Request[] public request;
    address public manager;
    uint public minimumContribution;
    mapping(address=>bool) public approvers;
    uint public approversCount;

    //Modifier to set the "person should be manager" condition and the name will be restricted()
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }


    //Constructor function to set manager as contract-creator
    //If someone create an instance of this contract then he can set the minimum contribution amount
    function Campaign(uint minimum,address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }    
 
    //A function in which anyone can contribute funds
    //Pushing the person's address into approvers array
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    //A function which can be called by the manager to crate a payment request to someone
    function createRequest(string description,uint value,address recipient) public restricted {
        Request memory newRequest = Request({
            description : description,
            value : value,
            recipient : recipient,
            complete : false,
            approvalCount : 0 
        });

        request.push(newRequest);
    }

    //To Approve a spending request
    function approveRequest(uint requestIndex) public {
        Request storage requests = request[requestIndex];

        require(approvers[msg.sender]);
        // require(!request[requestIndex].approvals[msg.sender]);
        require(!requests.approvals[msg.sender]);
        
        requests.approvals[msg.sender] = true;
        requests.approvalCount++;
    }

    //To finalize the request for spending money
    function finalizeRequest(uint index) public restricted {
        Request storage requests = request[index];

        // require(!request[index].complete);
        require(requests.approvalCount > (approversCount / 2 ));
        require(!requests.complete);
        
        requests.recipient.transfer(requests.value);
        requests.complete = true;
    }
}