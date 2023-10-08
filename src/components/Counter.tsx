import { Box } from "@chakra-ui/react";

export const Counter = ({ selectedCount }: { selectedCount: number }) => {
  return <Box mt={5}>The number of selected universities - {selectedCount}</Box>;
};
