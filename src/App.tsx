import { Flex, Input, Button, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CountryTable } from "./components/CountryTable";
import { Counter } from "./components/Counter";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [savedUniversities, setSavedUniversities] = useState<string[]>([]);
  const [selectedCount, setSelectedCount] = useState<number>(0);

  useEffect(() => {
    const savedData = localStorage.getItem("savedUniversities");
    if (savedData) {
      setSavedUniversities(JSON.parse(savedData));
    }

    const tableData = localStorage.getItem("tableData");
    if (tableData) {
      setData(JSON.parse(tableData));
      setShowTable(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedUniversities", JSON.stringify(savedUniversities));

    if (showTable) {
      localStorage.setItem("tableData", JSON.stringify(data));
    } else {
      localStorage.removeItem("tableData");
    }
  }, [savedUniversities, data, showTable]);

  const handeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://universities.hipolabs.com/search?name=middle&country=${inputValue}`);
      const countriesData = await response.json();
      setData(countriesData);
      setShowTable(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleReset = () => {
    setInputValue("");
    setData([]);
    setShowTable(false);
    setSavedUniversities([]);
  };

  const handleCheckboxChange = (index: number) => {
    const selectedUniversity = data[index].name;
    if (savedUniversities.includes(selectedUniversity)) {
      setSavedUniversities(savedUniversities.filter((university) => university !== selectedUniversity));
    } else {
      setSavedUniversities([...savedUniversities, selectedUniversity]);
    }
  };

  useEffect(() => {
    setSelectedCount(savedUniversities.length);
  }, [savedUniversities]);

  return (
    <Flex direction="column" height="100vh" alignItems="center" m={10} gap={5}>
      <Box>
        <Text textAlign="center">There are such counries in our database:</Text>
        <Text textAlign="center" color="blue" fontWeight={600}>
          United Kingdom, United States, Turkey, Jordan, Kuwait
        </Text>
      </Box>
      <Input placeholder="Enter the name of the country" value={inputValue} onChange={handeInputChange} />
      <Button
        onClick={handleSubmit}
        p={6}
        color="white"
        bgColor="green.500"
        _hover={{
          bgColor: "green.700",
        }}
      >
        Відправити
      </Button>
      <Button
        onClick={handleReset}
        p={4}
        color="white"
        bgColor="red.300"
        _hover={{
          bgColor: "red.600",
        }}
      >
        Скинути
      </Button>
      {showTable && (
        <CountryTable data={data} savedUniversities={savedUniversities} onCheckboxChange={handleCheckboxChange} />
      )}
      <Counter selectedCount={selectedCount} />
    </Flex>
  );
}

export default App;
