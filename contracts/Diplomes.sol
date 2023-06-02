// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Diplomes {
    uint public countDiplome = 0;
    address owner;
    // string value;
    // State public myState;
    struct diplome {
        string idDiplom;
        string FullName;
        string cin;
        string cne;
        string dateNaissance;
        string sector;
        string diplomaType;
        string section;
        string institution;
    }

    // modifier onlyOwner() {
    //     require(msg.sender == owner);
    //     _;
    // }
    mapping(uint => diplome) public diplomes;

    constructor() {
        owner = msg.sender;
    }

    function checkDiplome(string memory _cne) public view returns (bool) {
        bool test = true;
        for (uint i = 1; i <= countDiplome; i++) {
            if (
                keccak256(abi.encodePacked(diplomes[i].cne)) ==
                keccak256(abi.encodePacked(_cne))
            ) {
                test = false;
            }
        }
        return test;
    }

    function addDiplome(
        string memory _id,
        string memory _name,
        string memory _cin,
        string memory _cne,
        string memory _dateNaissance,
        string memory _sector,
        string memory _type,
        string memory _section,
        string memory _insti
    ) public {
        // if (!checkDiplome(_cin)) {
        //     return false;
        // }
        require(checkDiplome(_cne), "diplome already exist");
        countDiplome++;
        diplomes[countDiplome] = diplome(
            _id,
            _name,
            _cin,
            _cne,
            _dateNaissance,
            _sector,
            _type,
            _section,
            _insti
        );
        require(
            keccak256(abi.encodePacked(diplomes[countDiplome].cin)) ==
                keccak256(abi.encodePacked(_cin)),
            "the block doesn't added"
        );
    }

    function searchByid(
        string memory _id
    ) public view returns (diplome memory) {
        for (uint i = 1; i <= countDiplome; i++) {
            if (
                keccak256(abi.encodePacked(diplomes[i].idDiplom)) ==
                keccak256(abi.encodePacked(_id))
            ) {
                return diplomes[i];
            }
        }
    }

    function searchByCin(
        string memory _cin
    ) public view returns (diplome memory) {
        for (uint i = 1; i <= countDiplome; i++) {
            if (
                keccak256(abi.encodePacked(diplomes[i].cin)) ==
                keccak256(abi.encodePacked(_cin))
            ) {
                return diplomes[i];
            }
        }
    }

    function searchByCne(
        string memory _cne
    ) public view returns (diplome memory) {
        for (uint i = 1; i <= countDiplome; i++) {
            if (
                keccak256(abi.encodePacked(diplomes[i].cne)) ==
                keccak256(abi.encodePacked(_cne))
            ) {
                return diplomes[i];
            }
        }
    }

    function searchByName(
        string memory _name
    ) public view returns (diplome[] memory) {
        uint count = 0;
        diplome[] memory twinsDiplome = new diplome[](countDiplome);
        for (uint i = 1; i <= countDiplome; i++) {
            if (
                keccak256(abi.encodePacked(diplomes[i].FullName)) ==
                keccak256(abi.encodePacked(_name))
            ) {
                twinsDiplome[count] = diplomes[i];
                count++;
            }
        }
        assembly {
            mstore(twinsDiplome, count)
        }
        return twinsDiplome;
    }

    function searchBySection(
        string memory _section
    ) public view returns (diplome[] memory) {
        uint count = 0;
        diplome[] memory twinsDiplome = new diplome[](countDiplome);
        for (uint i = 1; i <= countDiplome; i++) {
            if (
                keccak256(abi.encodePacked(diplomes[i].section)) ==
                keccak256(abi.encodePacked(_section))
            ) {
                twinsDiplome[count] = diplomes[i];
                count++;
            }
        }
        assembly {
            mstore(twinsDiplome, count)
        }
        return twinsDiplome;
    }
}
