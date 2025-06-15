// Import necessary hooks and libraries
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { CropAverageProduction } from '../utils/dataProcessor';

// Define the type of props expected
interface Props {
    data: CropAverageProduction[];
}

// Functional component for rendering a bar chart of average crop production
export const ProductionBarChart = ({ data }: Props) => {
    // Create a reference to the div element where the chart will be rendered
    const chartRef = useRef<HTMLDivElement>(null);

    // useEffect runs once after the component mounts or when `data` changes
    useEffect(() => {
        // Check if the chart container (ref) exists
        if (chartRef.current) {
            // Initialize the chart
            const chart = echarts.init(chartRef.current);

            // Set the chart configuration
            chart.setOption({
                // Chart title
                title: { text: 'Average Production per Crop' },

                // Tooltip on hover
                tooltip: {},

                // Configuration for the x-axis (horizontal, showing crop names)
                xAxis: {
                    type: 'category',
                    data: data.map((d) => d.crop), // List of crop names
                    name: 'Crop', // Axis title
                    nameLocation: 'middle',
                    nameGap: 50,
                    nameTextStyle: {
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#1E90FF', // Blue color
                    },
                    axisLabel: {
                        rotate: 45, // Rotate crop names for better visibility
                        interval: 0, // Show all labels
                    },
                },

                // Configuration for the y-axis (vertical, showing production values)
                yAxis: {
                    type: 'value',
                    name: 'Average Crop Production', // Axis title
                    nameLocation: 'middle',
                    nameGap: 50,
                    nameTextStyle: {
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#1E90FF', // Blue color
                    },
                },

                // Define the bar chart series (data to be shown)
                series: [
                    {
                        type: 'bar',
                        data: data.map((d) => d.averageProduction), // List of values
                        itemStyle: {
                            color: '#3b82f6', // Bar color (blue)
                        },
                    },
                ],
            });

            // Clean up the chart on component unmount to avoid memory leaks
            return () => chart.dispose();
        }
    }, [data]);

    // Render the chart inside a div with defined dimensions
    return <div ref={chartRef} style={{ width: '100%', height: 400 }} />;
};
