import { Address, zeroAddress } from "viem";
import { useEns } from "@/hooks/useEns.ts";
import { truncateAddress, truncateEns } from "@/utils/format.ts";
import { useFarcasterData } from "@/hooks/useFarcasterData.ts";

export const usePrimaryLabel = ({
 address,
 shouldTruncate = true,
 defaultValue,
}: {
  address: Address | undefined;
  shouldTruncate?: boolean;
  defaultValue?: string;
}) => {
  const { name: ens } = useEns(address || zeroAddress);
  const { data: farcasterData } = useFarcasterData(address || zeroAddress);
  const { name: fname } = farcasterData;

  const formattedEns = ens && shouldTruncate ? truncateEns(ens) : ens;
  const formattedAddress = address && shouldTruncate ? truncateAddress(address) : address;

  return { data: formattedEns || fname || formattedAddress || defaultValue };
}