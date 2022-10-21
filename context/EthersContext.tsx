import { ReactNode, useEffect, useState } from 'react';
import { createContext } from 'react';
import { ethers } from 'ethers';
import { aegisStakingCA, aegisTokenCA, aegisStakingContract, aegisTokenContract } from '@helpers/aegisContract';
import { getStakedBalance, getTeamOdds, getPotentialWinnings } from '@helpers/ethersContextHelper';
import aegisStakingAbi from '@data/aegisStakingAbi.json';
import aegisTokenAbi from '@data/aegisTokenAbi.json';

interface WalletDataProps {
  provider: { send?: Function };
  signer: { getChainId?: Function };
  signerAddress: string;
  signerBalance: string;
  aegisTokenInteractionContract: { [key: string]: Function };
  aegisStakingInteractionContract: { [key: string]: Function };
}

interface TeamDataProps {
  [key: string]: {
    [key: string]: number;
  };
}

export interface EthersContextProps {
  walletData: WalletDataProps;
  teamData: TeamDataProps;
  isLoading: boolean;
  connectWallet: () => void;
  enableStaking: () => void;
  stakeTeam: (poolId: number, amount: number) => void;
  claimPrize: () => void;
  getStakedBalance: () => void;
  getTeamOdds: () => void;
  getPotentialWinnings: () => void;
}

interface EthersContextProviderProps {
  children?: ReactNode;
}

const EthersContext = createContext<Partial<EthersContextProps>>({});

export const EthersContextProvider = ({ children }: EthersContextProviderProps) => {
  const [walletData, setWalletData] = useState<WalletDataProps>();
  const [teamData, setTeamData] = useState<TeamDataProps>();
  const [isLoading, setIsLoading] = useState(true);

  const getAccountBalance = async (address: string) => {
    return ethers.utils.formatUnits(await aegisTokenContract.balanceOf(address));
  };

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    await provider.send('eth_requestAccounts', null as any);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    const signerBalance = await getAccountBalance(signerAddress);

    const aegisTokenInteractionContract = new ethers.Contract(aegisTokenCA, aegisTokenAbi, signer);
    const aegisStakingInteractionContract = new ethers.Contract(aegisStakingCA, aegisStakingAbi, signer);

    sessionStorage.setItem('user', JSON.stringify(signerAddress));

    setWalletData({
      provider,
      signer,
      signerAddress,
      signerBalance,
      aegisTokenInteractionContract,
      aegisStakingInteractionContract
    });
  };

  const enableStaking = async () => {
    await walletData?.provider?.send?.('eth_requestAccounts', []);

    const chainId = await walletData?.signer.getChainId?.();

    if (chainId != 1) {
      // pop up error if network not ethereum
      // ALERT PLEASE SWITCH TO ETHEREUM NETWORK TO CONTINUE
    } else {
      const spenderAddress = aegisStakingCA;
      const amount = '9999999999999999999999999999';
      walletData?.aegisTokenInteractionContract.approve(spenderAddress, amount);
    }
  };

  const stakeTeam = async (poolId: number, amount: number) => {
    await walletData?.provider?.send?.('eth_requestAccounts', []);

    const chainId = await walletData?.signer?.getChainId?.();
    const convertedAmount = ethers.utils.parseUnits(amount.toString(), 18);

    if (chainId != 1) {
      // pop up error if network not ethereum
      // ALERT PLEASE SWITCH TO ETHEREUM NETWORK TO CONTINUE
    } else {
      walletData?.aegisStakingInteractionContract.stake(poolId, convertedAmount);
    }
  };

  const claimPrize = async () => {
    await walletData?.provider?.send?.('eth_requestAccounts', []);
    walletData?.aegisStakingInteractionContract.claimPrize();
  };

  const getTeamData = async () => {
    const { teamABalance, teamBBalance } = await getStakedBalance(aegisStakingContract, walletData?.signerAddress);
    const { teamAOdds, teamBOdds } = await getTeamOdds(aegisStakingContract);
    const { teamAPotentialWinning, teamBPotentialWinning } = getPotentialWinnings({
      teamABalance,
      teamAOdds,
      teamBBalance,
      teamBOdds
    });

    setTeamData({
      a: {
        balance: teamABalance,
        odds: teamAOdds,
        potentialWinning: teamAPotentialWinning
      },
      b: {
        balance: teamBBalance,
        odds: teamBOdds,
        potentialWinning: teamBPotentialWinning
      }
    });
  };

  useEffect(() => {
    const stickyValue = window.sessionStorage.getItem('user');

    if (walletData === undefined && stickyValue !== null) {
      connectWallet();
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (teamData === undefined && walletData !== undefined) {
      getTeamData();
      setIsLoading(false);
    }
  }, [teamData, walletData]);

  useEffect(() => {
    if (isLoading && walletData !== undefined && teamData !== undefined) {
      setIsLoading(false);
    }
  }, [isLoading, walletData, teamData]);

  return (
    <EthersContext.Provider
      value={{
        walletData,
        teamData,
        isLoading,
        connectWallet,
        enableStaking,
        stakeTeam,
        claimPrize,
        getStakedBalance,
        getTeamOdds,
        getPotentialWinnings
      }}>
      {children}
    </EthersContext.Provider>
  );
};

export default EthersContext;
