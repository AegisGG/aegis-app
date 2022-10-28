import type { Dispatch, SetStateAction, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import { ethers } from 'ethers';
import {
  aegisStakingCA,
  aegisTokenCA,
  getAccountBalance,
  getStakedBalance,
  getTeamOdds,
  getPotentialWinnings
} from '@helpers/ethersContext';
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

interface Error {
  name?: string;
  message?: string;
  stack?: string;
}

interface EthersError extends Error {
  code?: number | string;
  title?: string;
  message?: string;
}

export interface EthersContextProps {
  walletData: WalletDataProps;
  teamData: TeamDataProps;
  isLoading: boolean;
  error: EthersError | null;
  setError: Dispatch<SetStateAction<EthersError | null>>;
  connectWallet: () => void;
  enableStaking: () => void;
  stakeTeam: (poolId: number, amount: number) => void;
  unstakeTeam: (poolId: number, amount: number) => void;
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
  const [error, setError] = useState<EthersError | null>(null);

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

    setIsLoading(false);
  };

  const enableStaking = async () => {
    await walletData?.provider?.send?.('eth_requestAccounts', []);

    const chainId = await walletData?.signer.getChainId?.();

    if (chainId != 1) {
      setError({ code: 2314, title: 'Network Error', message: 'Please switch to ethereum network to continue' });
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
      setError({ code: 2314, title: 'Network Error', message: 'Please switch to ethereum network to continue' });
    } else {
      walletData?.aegisStakingInteractionContract.stake(poolId, convertedAmount);
    }
  };

  const unstakeTeam = async (poolId: number, amount: number) => {
    await walletData?.provider?.send?.('eth_requestAccounts', []);

    const chainId = await walletData?.signer?.getChainId?.();
    const convertedAmount = ethers.utils.parseUnits(amount.toString(), 18);

    if (chainId != 1) {
      setError({ code: 2314, title: 'Network Error', message: 'Please switch to ethereum network to continue' });
    } else {
      walletData?.aegisStakingInteractionContract.unstake(poolId, convertedAmount);
    }
  };

  const claimPrize = async () => {
    try {
      await walletData?.provider?.send?.('eth_requestAccounts', []);
      walletData?.aegisStakingInteractionContract.claimPrize();
    } catch (error) {
      // Todo: Set Error State
      // const ethersError = error as EthersError;
      // if (ethersError.code === -32603) {
      //   console.log('Error');
      // }
    }
  };

  const getTeamData = async () => {
    const { teamABalance, teamBBalance } = await getStakedBalance(walletData?.signerAddress);
    const { teamAOdds, teamBOdds } = await getTeamOdds();
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

    setIsLoading(false);
  };

  useEffect(() => {
    const stickyValue = window.sessionStorage.getItem('user');

    setIsLoading(true);

    if (walletData === undefined && stickyValue !== null) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);

    if (teamData === undefined && walletData !== undefined) {
      getTeamData();
    }
  }, [teamData]);

  useEffect(() => {
    if (isLoading && walletData === undefined && teamData === undefined) {
      setIsLoading(false);
    }
  }, [isLoading, walletData, teamData]);

  return (
    <EthersContext.Provider
      value={{
        walletData,
        teamData,
        isLoading,
        error,
        setError,
        connectWallet,
        enableStaking,
        stakeTeam,
        unstakeTeam,
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
