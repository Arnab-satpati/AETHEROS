import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import {
  Cpu,
  HardDrive,
  Network,
  Activity,
  Globe,
  Zap,
  Database,
  Monitor,
  Wifi,
  Server
} from "lucide-react";

// Register Chart.js components
ChartJS.register(
  LineElement, CategoryScale, LinearScale, PointElement, Filler,
  ArcElement, BarElement, Tooltip, Legend
);

// Glass Card Component
const GlassCard = ({ children, className = '', delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`
        backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5
        border border-white/20 rounded-xl shadow-2xl
        hover:bg-white/15 transition-all duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, unit, trend, icon: Icon, color = 'cyan', delay = 0, compact = false }) => {
  const colorClasses = {
    cyan: 'from-cyan-400 to-blue-500',
    green: 'from-green-400 to-emerald-500',
    purple: 'from-purple-400 to-pink-500',
    orange: 'from-orange-400 to-red-500',
    yellow: 'from-yellow-400 to-orange-500'
  };

  return (
    <GlassCard delay={delay} className={`${compact ? 'p-3' : 'p-6'} group hover:scale-105 h-full flex flex-col justify-between`}>
      <div className="flex items-center justify-between mb-2">
        <div className={`${compact ? 'p-1.5' : 'p-3'} rounded-lg bg-gradient-to-r from-white/10 to-white/5`}>
          <Icon className={`${compact ? 'w-3 h-3' : 'w-6 h-6'} text-white`} />
        </div>
        {trend && (
          <div className={`text-xs font-medium ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>

      <div className="mb-2 flex-1">
        <h3 className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-300 uppercase tracking-wide mb-1`}>
          {title}
        </h3>
        <div className="flex items-baseline space-x-1">
          <span className={`${compact ? 'text-lg' : 'text-3xl'} font-bold text-white`}>
            {value}
          </span>
          {unit && (
            <span className={`${compact ? 'text-xs' : 'text-sm'} text-gray-400`}>
              {unit}
            </span>
          )}
        </div>
      </div>

      <div className={`h-0.5 bg-gradient-to-r ${colorClasses[color]} rounded-full opacity-60`} />
    </GlassCard>
  );
};

// Chart Card Component
const ChartCard = ({ title, type = 'line', data, options, delay = 0, className = '' }) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
      },
    },
    scales: type !== 'doughnut' ? {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 10,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 10,
          },
        },
      },
    } : undefined,
    ...options,
  };

  const ChartComponent = {
    line: Line,
    doughnut: Doughnut,
    bar: Bar,
  }[type];

  return (
    <GlassCard delay={delay} className={`p-3 h-full ${className}`}>
      <h3 className="text-xs font-semibold text-white mb-2 uppercase tracking-wide">
        {title}
      </h3>
      <div className="h-full" style={{ height: 'calc(100% - 24px)' }}>
        <ChartComponent data={data} options={defaultOptions} />
      </div>
    </GlassCard>
  );
};

// Terminal Window Component
const TerminalWindow = ({ delay = 0, className = '' }) => {
  const [output, setOutput] = useState([
    '> Initializing quantum neural network...',
    '> Connecting to global data streams...',
    '> Processing real-time metrics...',
    '> System ready for operation.'
  ]);

  const commands = [
    '> Analyzing market patterns...',
    '> Optimizing dashboard performance...',
    '> Synchronizing with satellite feeds...',
    '> Calibrating predictive algorithms...',
    '> Establishing secure connections...',
    '> Loading visualization modules...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setOutput(prev => {
        const newOutput = [...prev.slice(-3), commands[Math.floor(Math.random() * commands.length)]];
        return newOutput;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <GlassCard delay={delay} className={`p-3 h-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wide">
          Terminal
        </h3>
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
        </div>
      </div>

      <div className="bg-black/40 rounded-lg p-2 h-full overflow-hidden" style={{ height: 'calc(100% - 32px)' }}>
        <div className="space-y-1 h-full flex flex-col justify-end">
          {output.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-green-400 text-xs"
            >
              {line}
            </motion.div>
          ))}
          <div className="flex items-center text-green-400 text-xs">
            <span className="mr-1">$</span>
            <span className="animate-pulse">▌</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

// Globe 3D Components
const GlobeGeometry = () => {
  const meshRef = useRef();
  const pointsRef = useRef();

  // ✅ Use uploaded image as Earth texture
  const earthTexture = useLoader(TextureLoader, '/image.png');

  const connectionPoints = [
    { lat: 40.7128, lng: -74.0060, name: 'NYC', color: '#00ff88' },
    { lat: 51.5074, lng: -0.1278, name: 'LON', color: '#0088ff' },
    { lat: 35.6762, lng: 139.6503, name: 'TKY', color: '#ff8800' },
    { lat: -33.8688, lng: 151.2093, name: 'SYD', color: '#ff0088' },
    { lat: 37.7749, lng: -122.4194, name: 'SF', color: '#88ff00' },
  ];

  const latLngToVector3 = (lat, lng, radius = 1) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.005;
    if (pointsRef.current) pointsRef.current.rotation.y += 0.005;
  });

  return (
    <>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <meshStandardMaterial
          map={earthTexture}
          transparent={true}
          opacity={0.95}
          roughness={0.3}
          metalness={0.5}
        />
      </Sphere>

      <group ref={pointsRef}>
        {connectionPoints.map((point, index) => {
          const position = latLngToVector3(point.lat, point.lng, 1.02);
          return (
            <group key={index}>
              <mesh position={position}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial color={point.color} />
              </mesh>
              <Text
                position={[position.x * 1.2, position.y * 1.2, position.z * 1.2]}
                fontSize={0.08}
                color={point.color}
                anchorX="center"
                anchorY="middle"
              >
                {point.name}
              </Text>
            </group>
          );
        })}
      </group>

      {connectionPoints.map((point1, i) =>
        connectionPoints.slice(i + 1).map((point2, j) => {
          const pos1 = latLngToVector3(point1.lat, point1.lng, 1.01);
          const pos2 = latLngToVector3(point2.lat, point2.lng, 1.01);

          return (
            <line key={`${i}-${j}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#00ff88" transparent opacity={0.4} />
            </line>
          );
        })
      )}
    </>
  );
};

const Globe3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 2.5], fov: 60 }}>
      {/* 🌞 Ambient light - general scene brightness */}
      <ambientLight intensity={1.2} />

      {/* 💡 Point light - simulates a light bulb */}
      <pointLight position={[5, 5, 5]} intensity={2.5} color="#ffffff" />

      {/* 🔆 Directional light - acts like sunlight */}
      <directionalLight position={[-3, 2, 1]} intensity={2} color="#ffffff" castShadow />

      {/* ✨ Stars in the background */}
      <Stars radius={300} depth={60} count={1000} factor={7} saturation={0} fade />

      {/* 🌍 The globe itself */}
      <GlobeGeometry />
    </Canvas>
  );
};


// Main EdexUI Component
const EdexUI = () => {
  // State for real-time data
  const [cpuData, setCpuData] = useState([45, 52, 38, 65, 42, 58, 47, 61, 39, 55]);
  const [memoryData, setMemoryData] = useState([]);
  const [networkData, setNetworkData] = useState([65, 45, 78, 92, 34, 67, 89, 23, 56, 81]);
  const [time, setTime] = useState("");

  // Generate sample data
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour12: false,
        timeZone: 'UTC'
      }));

      setCpuData(prev => [...prev.slice(-9), Math.floor(Math.random() * 40) + 30]);
      setNetworkData(prev => [...prev.slice(-9), Math.floor(Math.random() * 100)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Chart configurations
  const lineChartData = {
    labels: cpuData.map((_, i) => i),
    datasets: [{
      data: cpuData,
      borderColor: '#00D9FF',
      backgroundColor: 'rgba(0, 217, 255, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 2,
    }]
  };

  const memoryChartData = {
    labels: ['Used', 'Available', 'Cached'],
    datasets: [{
      data: [65, 25, 10],
      backgroundColor: [
        'rgba(0, 217, 255, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
      ],
      borderWidth: 0,
    }]
  };

  const networkChartData = {
    labels: networkData.map((_, i) => i),
    datasets: [{
      data: networkData,
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderColor: '#10B981',
      borderWidth: 1,
    }]
  };

  return (
    // Added custom scrollbar styles and overflow-y-auto for scrollability
    <div className={`
      h-screen w-screen bg-gradient-to-br from-slate-900 via-[#2b232bb0] to-slate-900 relative
      overflow-y-auto
      custom-scrollbar
    `}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 min-h-full p-6 flex flex-col gap-6"> {/* Increased padding and gap */}

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-shrink-0"
        >
          <GlassCard className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">
                Neural Command Center
              </h1>
            </div>
            <div className="text-xl font-mono text-white">
              {time}
            </div>
          </GlassCard>
        </motion.header>

        {/* Metrics Row */}
        <div className="flex-shrink-0">
          <div className="grid grid-cols-5 gap-4 h-24"> {/* Increased height for metrics row */}
            <MetricCard
              title="CPU"
              value={cpuData[cpuData.length - 1] || 0}
              unit="%"
              trend={5.2}
              icon={Cpu}
              color="cyan"
              delay={0.1}
              compact={false} // Changed to false for larger metric cards
            />
            <MetricCard
              title="Memory"
              value="7.2"
              unit="GB"
              trend={-2.1}
              icon={HardDrive}
              color="green"
              delay={0.2}
              compact={false}
            />
            <MetricCard
              title="Network"
              value="1.2"
              unit="GB/s"
              trend={12.5}
              icon={Network}
              color="purple"
              delay={0.3}
              compact={false}
            />
            <MetricCard
              title="Nodes"
              value="847"
              unit=""
              trend={8.3}
              icon={Server}
              color="orange"
              delay={0.4}
              compact={false}
            />
            <MetricCard
              title="Uptime"
              value="99.9"
              unit="%"
              trend={0.1}
              icon={Activity}
              color="yellow"
              delay={0.5}
              compact={false}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 min-h-0 mt-[68px]">
          <div className="grid grid-cols-4 gap-6 h-full"> {/* Increased gap */}

            {/* Left Column - Charts */}
            <div className="grid grid-rows-2 gap-6 h-full"> {/* Increased gap */}
              <ChartCard
                title="System Performance"
                type="line"
                data={lineChartData}
                delay={0.6}
              />
              <ChartCard
                title="Memory"
                type="doughnut"
                data={memoryChartData}
                delay={0.8}
              />
            </div>

            {/* Center Columns - 3D Globe */}
            <div className="col-span-2 h-full">
              <GlassCard delay={0.7} className="p-4 h-full ml-[1.2rem] flex flex-col">
                <div className="flex items-center justify-between mb-3 flex-shrink-0">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                    Global Network Status
                  </h3>
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-gray-300">5 Nodes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span className="text-gray-300">12ms</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 rounded-lg overflow-hidden bg-black/20 min-h-0">
                  <Globe3D />
                </div>
              </GlassCard>
            </div>

            {/* Right Column */}
            <div className="grid grid-rows-2 gap-6 h-full"> {/* Increased gap */}
              <TerminalWindow delay={0.9} />
              <ChartCard
                title="Traffic"
                type="bar"
                data={networkChartData}
                delay={1.0}
              />
            </div>
          </div>
        </div>

        {/* Footer Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex-shrink-0"
        >
          <GlassCard className="p-3 flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Wifi className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">Connected</span>
              </div>
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">DB: Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Monitor className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">Monitoring: Active</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-300">Status: Optimal</span>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Custom Scrollbar Styles */}
      {/* Changed jsx and global to string attributes to suppress warnings */}
      <style jsx="true" global="true">{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px; /* For vertical scrollbar */
          height: 8px; /* For horizontal scrollbar, though not expected here */
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2); /* Light grayish */
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default EdexUI;