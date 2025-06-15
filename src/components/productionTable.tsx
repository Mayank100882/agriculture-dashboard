// Import necessary components and types from Mantine and the app
import { Table, Paper } from '@mantine/core';
import type { YearlyCropStats } from '../utils/dataProcessor';
import './productionTable.css'; // Import custom CSS for table styling

// Define the props expected by this component
interface Props {
    data: YearlyCropStats[]; // An array of crop statistics per year
}

// Functional component to display production data in a styled table
export const ProductionTable = ({ data }: Props) => {
    // Generate table rows from the data array
    const rows = data.map((stat) => (
        <tr key={stat.year}>
            <td>{stat.year}</td>
            <td>{stat.maxCrop}</td>
            <td>{stat.minCrop}</td>
        </tr>
    ));

    return (
        // Wrap table in a Paper component for elevation, padding, and rounded corners
        <Paper shadow="sm" p="md" radius="md" withBorder>
            <div className="table-wrapper">
                {/* Use Mantine's Table component with custom styling */}
                <Table className="custom-table">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Crop with Maximum Production in that Year</th>
                            <th>Crop with Minimum Production in that Year</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>
        </Paper>
    );
};
