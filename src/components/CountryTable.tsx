import { Table, Thead, Tr, Th, Tbody, Td, Link, Checkbox } from "@chakra-ui/react";

export const CountryTable = ({
  data,
  savedUniversities,
  onCheckboxChange,
}: {
  data: any[];
  savedUniversities: string[];
  onCheckboxChange: (index: number) => void;
}) => {
  if (data.length === 0) {
    return null;
  }

  return (
    <Table variant="simple" mt={5}>
      <Thead>
        <Tr>
          <Th>#</Th>
          <Th>Web pages</Th>
          <Th>Country </Th>
          <Th>Domains</Th>
          <Th>Name</Th>
          <Th>Alpha two code</Th>
          <Th>Add to my list</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((university, index) => (
          <Tr key={index}>
            <Td>{index + 1}</Td>
            <Td>
              <Link href={university.web_page} target="_blank">
                {university.web_pages.length === 1 ? university.web_pages[0] : university.web_pages.join(", ")}
              </Link>
            </Td>
            <Td>{university.country}</Td>
            <Td>{university.domains.length === 1 ? university.domains[0] : university.domains.join(", ")}</Td>
            <Td>{university.name}</Td>
            <Td>{university.alpha_two_code}</Td>
            <Td>
              <Checkbox
                isChecked={savedUniversities.includes(university.name)}
                onChange={() => onCheckboxChange(index)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
