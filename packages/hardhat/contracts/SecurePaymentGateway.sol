// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

contract SecurePaymentGateway {
    // Event for logging payments
    event PaymentReceived(address indexed payer, uint256 amount, string message);
    
    // Struct to hold transaction details
    struct Transaction {
        address payer;
        uint256 amount;
        string message;
        uint256 timestamp;
    }

    // Array to store transactions
    Transaction[] public transactions; 

    // Only allow certain addresses to initiate payments (e.g., whitelisted users)
    mapping(address => bool) public authorizedUsers;

    // Owner of the contract
    address public owner;

    // Modifier to check if the sender is an authorized user
    modifier onlyAuthorized() {
        require(authorizedUsers[msg.sender], "Not authorized");
        _;
    }

    // Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    // Constructor to initialize the contract owner
    constructor() {
        owner = msg.sender;
    }

    // Function to authorize a user
    function authorizeUser(address _user) public onlyOwner {
        authorizedUsers[_user] = true;
    }

    // Function to make a payment
    function makePayment(string memory _message) public payable onlyAuthorized {
        require(msg.value > 0, "Payment must be greater than zero");

        // Log the transaction
        transactions.push(Transaction({
            payer: msg.sender,
            amount: msg.value,
            message: _message,
            timestamp: block.timestamp
        }));

        emit PaymentReceived(msg.sender, msg.value, _message);
    }

    // Function to retrieve transaction details
    function getTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }
}
