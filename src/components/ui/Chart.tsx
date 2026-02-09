import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  ComposedChart,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, RefreshCw, Filter, TrendingUp, TrendingDown, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface ChartProps {
  /** The data to display in the chart */
  data: ChartDataPoint[];
  /** The type of chart to display */
  type?: "area" | "bar" | "line" | "pie" | "radar" | "scatter" | "composed";
  /** The key in the data object for the X-axis */
  xAxisKey?: string;
  /** The key(s) in the data object for the Y-axis */
  yAxisKeys?: string[];
  /** The title of the chart */
  title?: string;
  /** The description of the chart */
  description?: string;
  /** Whether to show the legend */
  showLegend?: boolean;
  /** Whether to show the grid */
  showGrid?: boolean;
  /** Whether to show the tooltip */
  showTooltip?: boolean;
  /** The color palette for the chart */
  colors?: string[];
  /** The height of the chart */
  height?: number;
  /** Whether the chart is loading */
  loading?: boolean;
  /** Callback when data is refreshed */
  onRefresh?: () => void;
  /** Callback when data is exported */
  onExport?: () => void;
  /** Additional class names */
  className?: string;
}

const defaultColors = [
  "#3b82f6", // blue-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#14b8a6", // teal-500
  "#f97316", // orange-500
];

const Chart: React.FC<ChartProps> = ({
  data,
  type = "bar",
  xAxisKey = "name",
  yAxisKeys = ["value"],
  title,
  description,
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  colors = defaultColors,
  height = 300,
  loading = false,
  onRefresh,
  onExport,
  className,
}) => {
  const [chartType, setChartType] = React.useState(type);
  const [timeRange, setTimeRange] = React.useState("monthly");

  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full min-h-[300px]">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Loading chart data...</p>
          </div>
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center h-full min-h-[300px]">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-sm text-muted-foreground">No data available</p>
          </div>
        </div>
      );
    }

    const commonProps = {
      data,
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
    };

    switch (chartType) {
      case "area":
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
            <XAxis dataKey={xAxisKey} stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {yAxisKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.2}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        );

      case "line":
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
            <XAxis dataKey={xAxisKey} stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {yAxisKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        );

      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
          </PieChart>
        );

      case "radar":
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey={xAxisKey} />
            <PolarRadiusAxis />
            {yAxisKeys.map((key, index) => (
              <Radar
                key={key}
                name={key}
                dataKey={key}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.2}
              />
            ))}
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
          </RadarChart>
        );

      case "scatter":
        return (
          <ScatterChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
            <XAxis type="number" dataKey="x" name="X" stroke="#6b7280" fontSize={12} />
            <YAxis type="number" dataKey="y" name="Y" stroke="#6b7280" fontSize={12} />
            {showTooltip && <Tooltip cursor={{ strokeDasharray: "3 3" }} />}
            {showLegend && <Legend />}
            <Scatter name="Data" data={data} fill={colors[0]} />
          </ScatterChart>
        );

      case "composed":
        return (
          <ComposedChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
            <XAxis dataKey={xAxisKey} stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            <Bar dataKey={yAxisKeys[0] || "value"} barSize={20} fill={colors[0]} />
            <Line type="monotone" dataKey={yAxisKeys[1] || "value"} stroke={colors[1]} strokeWidth={2} />
          </ComposedChart>
        );

      default: // bar
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
            <XAxis dataKey={xAxisKey} stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {yAxisKeys.map((key, index) => (
              <Bar key={key} dataKey={key} fill={colors[index % colors.length]} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        );
    }
  };

  const calculateStats = () => {
    if (!data || data.length === 0) return { total: 0, average: 0, trend: 0 };
    
    const values = data.flatMap(d => 
      yAxisKeys.map(key => typeof d[key] === 'number' ? d[key] as number : 0)
    );
    const total = values.reduce((sum, val) => sum + val, 0);
    const average = total / values.length;
    
    // Simple trend calculation (last vs first)
    const firstValue = values[0] || 0;
    const lastValue = values[values.length - 1] || 0;
    const trend = firstValue !== 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0;
    
    return { total, average, trend };
  };

  const stats = calculateStats();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("w-full", className)}
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              {onRefresh && (
                <Button variant="outline" size="icon" onClick={onRefresh} disabled={loading}>
                  <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
                </Button>
              )}
              {onExport && (
                <Button variant="outline" size="icon" onClick={onExport}>
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue={chartType} onValueChange={setChartType}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <TabsList className="grid grid-cols-4 sm:grid-cols-7 w-full sm:w-auto">
                <TabsTrigger value="bar" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Bar</span>
                </TabsTrigger>
                <TabsTrigger value="line" className="flex items-center gap-2">
                  <LineChartIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Line</span>
                </TabsTrigger>
                <TabsTrigger value="area" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Area</span>
                </TabsTrigger>
                <TabsTrigger value="pie" className="flex items-center gap-2">
                  <PieChartIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Pie</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-lg font-semibold">{stats.total.toLocaleString()}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Average</p>
                  <p className="text-lg font-semibold">{stats.average.toFixed(1)}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 col-span-2 sm:col-span-1">
                  <p className="text-xs text-muted-foreground">Trend</p>
                  <div className="flex items-center gap-1">
                    {stats.trend >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <p className={cn("text-lg font-semibold", stats.trend >= 0 ? "text-emerald-500" : "text-red-500")}>
                      {stats.trend >= 0 ? "+" : ""}{stats.trend.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <TabsContent value="bar" className="mt-0">
              <ResponsiveContainer width="100%" height={height}>
                {renderChart()}
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="line" className="mt-0">
              <ResponsiveContainer width="100%" height={height}>
                {renderChart()}
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="area" className="mt-0">
              <ResponsiveContainer width="100%" height={height}>
                {renderChart()}
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="pie" className="mt-0">
              <ResponsiveContainer width="100%" height={height}>
                {renderChart()}
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="radar" className="mt-0">
              <ResponsiveContainer width="100%" height={height}>
                {renderChart()}
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="scatter" className="mt-0">
              <ResponsiveContainer width="100%" height={height}>
                {renderChart()}
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="composed" className="mt-0">
              <ResponsiveContainer width="100%" height={height}>
                {renderChart()}
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Chart;