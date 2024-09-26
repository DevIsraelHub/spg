// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AIDetectionVerifier {
    struct VerificationResult {
        bytes32 contentHash;
        bool isAIGenerated;
        uint256 timestamp;
    }

    mapping(bytes32 => VerificationResult) public verifications;

    event ContentVerified(bytes32 indexed contentHash, bool isAIGenerated);

    function verifyContent(bytes32 _contentHash, bool _isAIGenerated) external {
        verifications[_contentHash] = VerificationResult({
            contentHash: _contentHash,
            isAIGenerated: _isAIGenerated,
            timestamp: block.timestamp
        });

        emit ContentVerified(_contentHash, _isAIGenerated);
    }

    function getVerificationResult(bytes32 _contentHash) external view returns (bool, uint256) {
        VerificationResult memory result = verifications[_contentHash];
        return (result.isAIGenerated, result.timestamp);
    }
}