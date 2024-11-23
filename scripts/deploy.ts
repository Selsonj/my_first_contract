import { address, toNano } from "@ton/core";
import { MainContract } from "../wrappers/MainContract";
import { compile, NetworkProvider } from "@ton/blueprint";

export async function run(provider: NetworkProvider) {
  const myContract = MainContract.createFromConfig(
    {
      number: 0,
      address: address("0QDKohuVL8gEwkLVh8pnHIa54B5ejK7hOOCtJ_1jAWrh4J9g"),
      owner_address: address(
        "0QDKohuVL8gEwkLVh8pnHIa54B5ejK7hOOCtJ_1jAWrh4J9g"
      ),
    },
    await compile("MainContract")
  );

  const openedContract = provider.open(myContract);

  openedContract.sendDeploy(provider.sender(), toNano("0.05"));

  await provider.waitForDeploy(myContract.address);
}