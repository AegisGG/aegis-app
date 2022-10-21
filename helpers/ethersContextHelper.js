import { ethers } from 'ethers';

export const getStakedBalance = async (aegisStakingContract, signerAddress) => {
  const teamAStakedBalance = await aegisStakingContract.getUserStakedTokens(signerAddress, 0);
  const teamBStakedBalance = await aegisStakingContract.getUserStakedTokens(signerAddress, 1);

  const formattedteamABalance = Number(ethers.utils.formatUnits(teamAStakedBalance));
  const formattedteamBBalance = Number(ethers.utils.formatUnits(teamBStakedBalance));

  return { teamABalance: formattedteamABalance, teamBBalance: formattedteamBBalance };
};

export const getTeamOdds = async aegisStakingContract => {
  const poolAStakedTokens = Number(ethers.utils.formatUnits(await aegisStakingContract.getPoolAStakedTokens()));
  const poolBStakedTokens = Number(ethers.utils.formatUnits(await aegisStakingContract.getPoolBStakedTokens()));

  const teamAOdds = Number((poolBStakedTokens / poolAStakedTokens + 1).toFixed(2));
  const teamBOdds = Number((poolAStakedTokens / poolBStakedTokens + 1).toFixed(2));

  return { teamAOdds, teamBOdds };
};

export const getPotentialWinnings = ({ teamABalance, teamAOdds, teamBBalance, teamBOdds }) => {
  const teamAPotentialWinning = Number((teamABalance * teamAOdds).toFixed(2));
  const teamBPotentialWinning = Number((teamBBalance * teamBOdds).toFixed(2));

  return { teamAPotentialWinning, teamBPotentialWinning };
};
