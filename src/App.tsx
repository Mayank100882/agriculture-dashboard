// Import Mantine UI components and hooks for color scheme handling
import { MantineProvider, Container, Group, useMantineColorScheme, useComputedColorScheme, Button, } from '@mantine/core';
import '@mantine/core/styles.css';// Import Mantine styles
import { ProductionTable } from './components/productionTable';// Import custom components
import { ProductionBarChart } from './components/productionBar';
import rawData from './data/data.json';// Import the raw JSON data and data cleaning logic
import { cleanAndAggregateData, type CropDataRaw } from './utils/dataProcessor';
import { FaMoon, FaSun } from 'react-icons/fa';// Import icons for light/dark mode toggle


function App() {
  // Get the function to set color scheme (light/dark)
  const { setColorScheme } = useMantineColorScheme();

  // Automatically determine current color scheme (default is 'light')
  const computedColourScheme = useComputedColorScheme('light');

  // Toggle color scheme between light and dark
  const toggleColorScheme = () => {
    setColorScheme(computedColourScheme === 'dark' ? 'light' : 'dark');
  };

  // Clean and aggregate raw data into formats for the table and chart
  const { yearlyStats, cropAverages } = cleanAndAggregateData(rawData as CropDataRaw[]);

  return (
    // Wrap the entire UI in MantineProvider for theme context
    <MantineProvider>
      <Container size="lg" py="md">
        {/* Top bar with theme toggle button */}
        <Group justify="apart" mb="md">
          <Button size="sm" variant="link" onClick={toggleColorScheme}>
            {computedColourScheme === 'dark' ? <FaSun /> : <FaMoon />}
          </Button>
        </Group>

        {/* Table showing yearly max/min crop production */}
        <ProductionTable data={yearlyStats} />

        {/* Bar chart showing average crop production */}
        <div style={{ marginTop: 40 }}>
          <ProductionBarChart data={cropAverages} />
        </div>
      </Container>
    </MantineProvider>
  );
}

export default App;
