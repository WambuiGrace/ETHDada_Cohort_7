import { ethers, Wallet } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();
import bookStore from "./ABI/BookStore.json" assert { type: "json" };

const createContractInstanceOnEthereum = (contractAddress, contractAbi) => {
  try {
    const alchemyApiKey = process.env.ALCHEMY_API_KEY_SEPOLIA;
    const provider = new ethers.AlchemyProvider("sepolia", alchemyApiKey);
    console.log("provider", provider);

    const privateKey = process.env.WALLET_PRIVATE_KEY;git
    const wallet = new Wallet(privateKey, provider);

    const contract = new ethers.Contract(contractAddress, contractAbi, wallet);
    console.log(contract);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

const contractAddress = "0xFE7475a0A2b98b187492FBD7BD54dfdD04E9008F";
const contractOnETH = createContractInstanceOnEthereum(
  contractAddress,
  bookStore.abi
);

const addBookToContract = async (bookId, title, author, price, stock) => {
  try {
    const txResponse = await contractOnETH.addBook(
      bookId,
      title,
      author,
      price,
      stock
    );
    console.log(txResponse.hash);
    console.log(`https://sepolia.etherscan.io/tx/${txResponse.hash}`);
  } catch (error) {
    console.error(error);
  }
};

const bookDetails = {
  bookId: 1,
  title: "Harry Potter",
  author: "J.K. Rowling",
  price: 10,
  stock: 100,
};

const _bookId = 1;
const getBook = async () => {
  try {
    const books = await contractOnETH.getBooks(_bookId);
    console.log(books);
  } catch (error) {
    console.error(error);
  }
};


(async () => {
})();
