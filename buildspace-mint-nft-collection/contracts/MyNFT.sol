// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.1;
// We need some util functions for strings.
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "hardhat/console.sol";


contract MyNFT is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // This is our SVG code. All we need to change is the word that's displayed. Everything else stays the same.
  // So, we make a baseSvg variable here that all our NFTs can use.
  string baseSvg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><rect width='100%' height='100%' fill='black' /><g transform='matrix(0.2, 0, 0, 0.2, 150, 20)'><g transform='matrix(4.725301111045653,0,0,4.725301111045653,0.0000347689931040783,0.019721259814305742)' fill='white'><path d='M23.11 55.78L1.69 43.41A3.39 3.39 0 0 1 0 40.48V15.75a3.39 3.39 0 0 1 1.69-2.94L23.11.45a3.39 3.39 0 0 1 3.39 0l21.41 12.37a3.39 3.39 0 0 1 1.69 2.94v24.72a3.39 3.39 0 0 1-1.69 2.94L26.5 55.78a3.39 3.39 0 0 1-3.39 0z' /></g><g transform='matrix(1.4299766179970728,0,0,1.4299766179970728,46.931144354411465,26.27012933852235)' fill='black'><path d='M83.9420361,50.0031761 C84.0455988,49.2560782 83.807666,48.4723838 83.2325201,47.8972379 L68.0203173,32.6850351 C67.0506811,31.7153989 65.4688221,31.7109131 64.4959279,32.6838072 C63.5162509,33.6634843 63.5235834,35.2346243 64.4971558,36.2081966 L78.2881642,49.9992051 L64.4995875,63.7877818 C63.5299513,64.757418 63.5254654,66.339277 64.4983596,67.3121712 C65.4780367,68.2918482 67.0491767,68.2845157 68.022749,67.3109433 L83.2349518,52.0987406 C83.8046831,51.5290093 84.0412048,50.7479135 83.9420361,50.0031761 L83.9420361,50.0031761 Z M14.0579639,50.0031761 C13.9544012,49.2560782 14.192334,48.4723838 14.7674799,47.8972379 L29.9796827,32.6850351 C30.9493189,31.7153989 32.5311779,31.7109131 33.5040721,32.6838072 C34.4837491,33.6634843 34.4764166,35.2346243 33.5028442,36.2081966 L19.7118358,49.9992051 L33.5004125,63.7877818 C34.4700487,64.757418 34.4745346,66.339277 33.5016404,67.3121712 C32.5219633,68.2918482 30.9508233,68.2845157 29.977251,67.3109433 L14.7650482,52.0987406 C14.1953169,51.5290093 13.9587952,50.7479135 14.0579639,50.0031761 L14.0579639,50.0031761 Z M54.9901856,27.6944914 C55.3662544,26.661251 56.5053113,26.1272656 57.5505036,26.5076845 C58.5884594,26.8854695 59.1258109,28.0271719 58.7489561,29.062572 L43.0098144,72.3055086 C42.6337456,73.338749 41.4946887,73.8727344 40.4494964,73.4923155 C39.4115406,73.1145305 38.8741891,71.9728281 39.2510439,70.937428 L54.9901856,27.6944914 Z' /></g><g transform='matrix(1.0563401848659797,0,0,1.0563401848659797,40.490173655582424,149.9282436249025)' fill='black'><path d='M16.286 35.7143 l-4.2857 4.2857 l-10.571 0 l0 -6.2857 l7.4286 0 l0 -22.286 l7.4286 0 l0 24.286 z M43.714 11.428999999999998 l4.2857 4.2857 l0 20 l-4.2857 4.2857 l-16.571 0 l-4.2857 -4.2857 l0 -20 l4.2857 -4.2857 l16.571 0 z M40.571 33.7143 l0 -16 l-10.286 0 l0 16 l10.286 0 z M80.28528571428572 15.713999999999999 l0 10 l-4.2857 4.2857 l4.2857 6.5714 l0 3.4286 l-6.8571 0 l-5.9429 -9.7143 l-5.4857 0 l0 9.7143 l-7.4286 0 l0 -28.571 l21.429 0 z M72.85728571428572 24 l0 -6.2857 l-10.857 0 l0 6.2857 l10.857 0 z M104.857 17.714 l-10.571 0 l0 16 l10.857 0 l0 -4.8571 l-6.5714 0 l0 -6.2857 l14 0 l0 13.143 l-4.2857 4.2857 l-17.143 0 l-4.2857 -4.2857 l0 -20 l4.2857 -4.2857 l17.143 0 l4.2857 4.2857 l0 4.2857 l-5.4286 0 z M143.42871428571428 17.714 l-16.857 0 l0 4.8571 l14.571 0 l0 6.2857 l-14.571 0 l0 4.8571 l16.857 0 l0 6.2857 l-20 0 l-4.2857 -4.2857 l0 -24.286 l24.286 0 l0 6.2857 z' /></g></g>";

  // I create three arrays, each with their own theme of random words.
  // Pick some random funny words, names of anime characters, foods you like, whatever! 
  string[] firstWords = [
    "Neurotic", "Narrow", "New", "Named", "Neighbor", 
    "Noisy", "Ninja", "Negative", "Naked", "Noir", 
    "Noob", "Neutral", "Needy", "Naughty", "Naive",
    "Novel", "Natural", "Notable", "Notorious", "Numb",
    "Newbie", "Nervous", "Nice", "Nerdy", "Nightmarish"
  ];
  
  string[] secondWords = [
    "Financial", "Foolproof", "Free", "Former", "Faithful", 
    "Finalized", "Futile", "Fearless", "Fancy", "Failed",
    "Fantastic", "Feared", "Flaming", "Fragile", "Fallen",
    "Forgotten", "Fortunate", "Functional", "Funky", "Furious",
    "Forgiving", "Fast", "Fanatical", "Faithless", "Footloose"
  ];
  string[] thirdWords = [
    "Theorist", "Technocrat", "Tyrant", "Troublemaker", "Trickster",
    "Trophy", "Teacher", "Thinker", "Tiger", "Trash", 
    "Traveler", "Turkey", "Tourist", "Transformer", "Technician",
    "Tactician", "Taskmaster", "Telepath", "Thunder", "Terminator"
  ];

  constructor() ERC721 ("Identify NFT", "JORGE") {
    console.log("This is my NFT contract. Woah!");
  }

  // I create a function to randomly pick a word from each array.
  function pickRandomFirstWord(uint256 tokenId) public view returns (string memory) {
    // I seed the random generator. More on this in the lesson. 
    uint256 rand = random(string(abi.encodePacked("FIRST_WORD", Strings.toString(tokenId))));
    // Squash the # between 0 and the length of the array to avoid going out of bounds.
    rand = rand % firstWords.length;
    return firstWords[rand];
  }

  function pickRandomSecondWord(uint256 tokenId) public view returns (string memory) {
    uint256 rand = random(string(abi.encodePacked("SECOND_WORD", Strings.toString(tokenId))));
    rand = rand % secondWords.length;
    return secondWords[rand];
  }

  function pickRandomThirdWord(uint256 tokenId) public view returns (string memory) {
    uint256 rand = random(string(abi.encodePacked("THIRD_WORD", Strings.toString(tokenId))));
    rand = rand % thirdWords.length;
    return thirdWords[rand];
  }

  function random(string memory input) internal pure returns (uint256) {
      return uint256(keccak256(abi.encodePacked(input)));
  }

  function withdraw() public payable onlyOwner {
    payable(msg.sender).transfer(address(this).balance);
  }

  function mintNFT() public payable {

    require(msg.value >= 1e18, "Check price!");

    uint256 newItemId = _tokenIds.current();

    // We go and randomly grab one word from each of the three arrays.
    string memory first = pickRandomFirstWord(newItemId);
    string memory second = pickRandomSecondWord(newItemId);
    string memory third = pickRandomThirdWord(newItemId);

    string memory combinedWord = string(abi.encodePacked(Strings.toString(newItemId), " - ", first, " ", second, " ", third));

    // I concatenate it all together, and then close the <text> and <svg> tags.
    string memory finalSvg = string(abi.encodePacked(
      baseSvg, 
      "<text x='50%' y='135' fill='white' font-family='monospace' font-size='28px' dominant-baseline='middle' text-anchor='middle'>",
      first, 
      "</text>",
      "<text x='50%' y='175' fill='white' font-family='monospace' font-size='28px' dominant-baseline='middle' text-anchor='middle'>",
      second, 
      "</text>",
      "<text x='50%' y='215' fill='white' font-family='monospace' font-size='28px' dominant-baseline='middle' text-anchor='middle'>",
      third, 
      "</text>",
      "<text x='340' y='340' fill='white' font-family='monospace' font-size='14px' text-anchor='end'>",
      "#",
      Strings.toString(newItemId),
      "</text>",
      "</svg>"
    ));

    console.log("\n--------------------");
    console.log(finalSvg);
    console.log("--------------------\n");

    string memory json = Base64.encode(bytes(string(abi.encodePacked(
      '{"name": "#', 
      combinedWord, 
      '", "description": "A highly descriptive identification of NFT - by Jorge Aguirre", "attributes": [', 
      '{ "trait_type": "First Word", "value": "',
      first,
      '" }, { "trait_type": "Second Word", "value": "',
      second,
      '" }, { "trait_type": "Third Word", "value": "',
      third,
      '" }],',
      ' "image": "data:image/svg+xml;base64,', 
      Base64.encode(bytes(finalSvg)), 
      '"}'
    ))));

    string memory finalTokenUri = string(abi.encodePacked("data:application/json;base64,", json));

    console.log("\n--------------------");
    console.log(finalTokenUri);
    console.log("--------------------\n");

    console.log("\n--------------------");
    console.log(string(abi.encodePacked("https://nftpreview.0xdev.codes/?code=", finalTokenUri)));
    console.log("--------------------\n");

    _safeMint(msg.sender, newItemId);
  
    // We'll be setting the tokenURI later!
    _setTokenURI(newItemId, finalTokenUri);
  
    _tokenIds.increment();
    console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
    payable(owner()).transfer(msg.value);
  }
}