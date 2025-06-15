// Interface for raw data as received from the JSON file
export interface CropDataRaw {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": string | number;
}

// Interface for yearly statistics used in the table
export interface YearlyCropStats {
  year: string;
  maxCrop: string;
  minCrop: string;
}

// Interface for crop average production used in the bar chart
export interface CropAverageProduction {
  crop: string;
  averageProduction: number;
}

// Main function to clean and aggregate the raw crop data
export function cleanAndAggregateData(data: CropDataRaw[]) {
  // Object to store crop production data grouped by year
  const yearlyDataMap: Record<string, { crop: string; production: number }[]> = {};

  // Object to store total production and count of entries for each crop
  const cropTotalProduction: Record<string, { total: number; count: number }> = {};

  // Process each entry in the raw data
  data.forEach((entry) => {
    // Clean the year string by removing the prefix
    const year = entry.Year.replace("Financial Year (Apr - Mar), ", "");

    // Extract crop name and production value
    const crop = entry["Crop Name"];
    const rawProd = entry["Crop Production (UOM:t(Tonnes))"];
    const production = parseFloat(rawProd as string) || 0;

    // Add crop data to yearlyDataMap for later max/min calculations
    if (!yearlyDataMap[year]) yearlyDataMap[year] = [];
    yearlyDataMap[year].push({ crop, production });

    // Add production data to cropTotalProduction for average calculations
    if (!cropTotalProduction[crop]) cropTotalProduction[crop] = { total: 0, count: 0 };
    cropTotalProduction[crop].total += production;
    cropTotalProduction[crop].count++;
  });

  // Create array of YearlyCropStats with max and min production crop per year
  const yearlyStats: YearlyCropStats[] = Object.entries(yearlyDataMap).map(
    ([year, crops]) => {
      // Sort crops for the year in descending order of production
      const sorted = crops.sort((a, b) => b.production - a.production);
      return {
        year,
        maxCrop: sorted[0].crop,
        minCrop: sorted[sorted.length - 1].crop,
      };
    }
  );

  // Create array of CropAverageProduction for the chart
  const cropAverages: CropAverageProduction[] = Object.entries(cropTotalProduction).map(
    ([crop, { total, count }]) => ({
      crop,
      averageProduction: parseFloat((total / count).toFixed(2)), // Round to 2 decimal places
    })
  );

  // Return both sets of processed data
  return { yearlyStats, cropAverages };
}
