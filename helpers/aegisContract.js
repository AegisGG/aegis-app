import { ethers } from 'ethers';
import aegisStakingAbi from '@data/aegisStakingAbi.json';
import aegisTokenAbi from '@data/aegisTokenAbi.json';

const ethProvider = new ethers.providers.getDefaultProvider('mainnet');

export const aegisStakingCA = '0xFeEf664bB59814c5842A3129CD3dCf28f02Fe679';
export const aegisTokenCA = '0x3e4c87bf57d48935d1643A7b8a3383B928B040de';
export const aegisStakingContract = new ethers.Contract(aegisStakingCA, aegisStakingAbi, ethProvider);
export const aegisTokenContract = new ethers.Contract(aegisTokenCA, aegisTokenAbi, ethProvider);
