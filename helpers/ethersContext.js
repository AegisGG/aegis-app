import { ethers } from 'ethers';
import aegisStakingAbi from '@data/aegisStakingAbi.json';
import aegisTokenAbi from '@data/aegisTokenAbi.json';

const ethProvider = new ethers.providers.getDefaultProvider('https://eth-mainnet.public.blastapi.io');

export const aegisStakingCA = '0xE7d9747404532A1AEFd1Bf9D878aF1E859a51544';
export const aegisTokenCA = '0x3e4c87bf57d48935d1643A7b8a3383B928B040de';
const aegisStakingContract = new ethers.Contract(aegisStakingCA, aegisStakingAbi, ethProvider);
const aegisTokenContract = new ethers.Contract(aegisTokenCA, aegisTokenAbi, ethProvider);

export const getAccountBalance = async address => {
  const userBalance = await aegisTokenContract.balanceOf(address);
  return ethers.utils.formatUnits(userBalance);
};

export const getStakedBalance = async signerAddress => {
  const teamAStakedBalance = await aegisStakingContract.getUserStakedTokens(signerAddress, 0);
  const teamBStakedBalance = await aegisStakingContract.getUserStakedTokens(signerAddress, 1);

  const formattedteamABalance = Number(ethers.utils.formatUnits(teamAStakedBalance));
  const formattedteamBBalance = Number(ethers.utils.formatUnits(teamBStakedBalance));

  return { teamABalance: formattedteamABalance, teamBBalance: formattedteamBBalance };
};

export const getTeamOdds = async () => {
  const aTokens = await aegisStakingContract.getPoolAStakedTokens();
  const poolAStakedTokens = ethers.utils.formatUnits(aTokens);
  const bTokens = await aegisStakingContract.getPoolBStakedTokens();
  const poolBStakedTokens = ethers.utils.formatUnits(bTokens);

  const teamAOdds = Number((poolBStakedTokens / poolAStakedTokens + 1).toFixed(2));
  const teamBOdds = Number((poolAStakedTokens / poolBStakedTokens + 1).toFixed(2));

  return { teamAOdds, teamBOdds };
};

export const getPotentialWinnings = ({ teamABalance, teamAOdds, teamBBalance, teamBOdds }) => {
  const teamAPotentialWinning = Number((teamABalance * teamAOdds).toFixed(2));
  const teamBPotentialWinning = Number((teamBBalance * teamBOdds).toFixed(2));

  return { teamAPotentialWinning, teamBPotentialWinning };
};
