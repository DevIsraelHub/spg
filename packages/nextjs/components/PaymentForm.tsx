// "use client"

// import { useState } from "react";
// import { ethers } from "ethers";
// import { useScaffoldContract } from "~~/hooks/scaffold-eth"; // Ensure this is set up correctly

// const PaymentForm = () => {
//   const [amount, setAmount] = useState("");
//   const { contract } = useScaffoldContract({
//     contractName: "PaymentGateway", // Replace with your contract name
//     functionName: "makePayment",
//     value: amount,
//   });

//   const handlePayment = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!contract) {
//       console.error("Contract is not loaded.");
//       return;
//     }

//     try {
//       // Convert the amount to Wei
//       const weiAmount = ethers.parseEther(amount);

//       // Call the setGreeting function on the contract
//       const tx = await contract.setGreeting("Payment made!", {
//         value: weiAmount,
//       });

//       await tx.wait(); // Wait for the transaction to be mined
//       console.log("Transaction successful:", tx);
//       alert("Payment successful!");
//     } catch (error) {
//       console.error("Payment failed:", error);
//       alert("Payment failed. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handlePayment} className="flex flex-col gap-4">
//       <input
//         type="text"
//         placeholder="Amount in ETH"
//         value={amount}
//         onChange={e => setAmount(e.target.value)}
//         className="input"
//       />
//       <button type="submit" className="btn btn-primary">
//         Send Payment
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;
