import { Injectable } from '@angular/core';
import { Category, Robot, Part } from '../models/catalog.models';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private categories: Category[] = [
    {
      id: 'industrial',
      name: 'Industrial Robots',
      description: 'Heavy-duty robots designed for manufacturing, welding, and assembly line operations.',
      icon: '🏭',
      robotCount: 3
    },
    {
      id: 'medical',
      name: 'Medical Robots',
      description: 'Precision robots used in surgeries, diagnostics, and patient care.',
      icon: '🏥',
      robotCount: 2
    },
    {
      id: 'service',
      name: 'Service Robots',
      description: 'Robots designed for customer service, hospitality, and everyday assistance.',
      icon: '🤖',
      robotCount: 3
    },
    {
      id: 'exploration',
      name: 'Exploration Robots',
      description: 'Autonomous robots built for space, deep-sea, and hazardous environment exploration.',
      icon: '🚀',
      robotCount: 2
    }
  ];

  private robots: Robot[] = [
    // Industrial
    {
      id: 'ind-001', categoryId: 'industrial', name: 'WeldMaster X9', model: 'WM-X9',
      manufacturer: 'RoboCorp Industries', description: 'High-precision arc welding robot with 6-axis articulation and real-time seam tracking.',
      imageUrl: '/images/robot_industrial_welder_1774606012389.png', partCount: 5, status: 'active'
    },
    {
      id: 'ind-002', categoryId: 'industrial', name: 'AssemblyBot Pro', model: 'AB-PRO',
      manufacturer: 'AutomataTech', description: 'Fast pick-and-place robot for PCB and micro-component assembly.',
      imageUrl: '', partCount: 4, status: 'active'
    },
    {
      id: 'ind-003', categoryId: 'industrial', name: 'PaintStream 5000', model: 'PS-5K',
      manufacturer: 'RoboCorp Industries', description: 'Automotive spray-painting robot with uniform coat distribution.',
      imageUrl: '', partCount: 3, status: 'discontinued'
    },
    // Medical
    {
      id: 'med-001', categoryId: 'medical', name: 'SurgiArm V2', model: 'SA-V2',
      manufacturer: 'MedBot Solutions', description: 'Minimally invasive surgical assistant with sub-millimeter precision.',
      imageUrl: '/images/robot_medical_surgery_1774606046139.png', partCount: 6, status: 'active'
    },
    {
      id: 'med-002', categoryId: 'medical', name: 'DiagnoScan AI', model: 'DS-AI',
      manufacturer: 'MedBot Solutions', description: 'AI-powered diagnostic imaging robot for radiology departments.',
      imageUrl: '', partCount: 4, status: 'prototype'
    },
    // Service
    {
      id: 'srv-001', categoryId: 'service', name: 'GreeterBot', model: 'GB-100',
      manufacturer: 'ServiceDroid Inc.', description: 'Friendly reception and concierge robot with natural language processing.',
      imageUrl: '/images/robot_service_greeter_1774606091060.png', partCount: 3, status: 'active'
    },
    {
      id: 'srv-002', categoryId: 'service', name: 'CleanSweep R3', model: 'CS-R3',
      manufacturer: 'AutomataTech', description: 'Autonomous floor-cleaning robot for large commercial spaces.',
      imageUrl: '', partCount: 4, status: 'active'
    },
    {
      id: 'srv-003', categoryId: 'service', name: 'DeliverDrone X', model: 'DD-X',
      manufacturer: 'ServiceDroid Inc.', description: 'Last-mile delivery drone with obstacle avoidance and GPS navigation.',
      imageUrl: '', partCount: 5, status: 'active'
    },
    // Exploration
    {
      id: 'exp-001', categoryId: 'exploration', name: 'MarsRover Alpha', model: 'MR-A',
      manufacturer: 'SpaceBot Labs', description: 'Terrain-navigating rover designed for Martian surface exploration and sample collection.',
      imageUrl: '/images/robot_exploration_rover_1774606125491.png', partCount: 7, status: 'active'
    },
    {
      id: 'exp-002', categoryId: 'exploration', name: 'DeepDiver 200', model: 'DD-200',
      manufacturer: 'OceanTech Robotics', description: 'Submersible robot rated for 6000m depth with multi-spectral imaging.',
      imageUrl: '', partCount: 5, status: 'prototype'
    }
  ];

  private parts: Part[] = [
    // WeldMaster X9 parts
    { id: 'p-001', robotId: 'ind-001', name: 'Welding Torch Assembly', partNumber: 'WM-TA-01', category: 'End Effector', description: 'MIG/TIG welding torch with auto wire feed mechanism.', price: 1250.00, availability: 'in-stock', weight: '3.2kg', imageUrl: '/images/part_welding_torch_1774606156811.png' },
    { id: 'p-002', robotId: 'ind-001', name: 'Servo Motor (Axis 1-3)', partNumber: 'WM-SM-03', category: 'Actuator', description: 'High-torque brushless servo motor for base rotation axes.', price: 890.00, availability: 'in-stock', weight: '5.1kg' },
    { id: 'p-003', robotId: 'ind-001', name: 'Seam Tracking Sensor', partNumber: 'WM-STS-01', category: 'Sensor', description: 'Laser-based real-time seam tracking module.', price: 2100.00, availability: 'low-stock', weight: '0.8kg' },
    { id: 'p-004', robotId: 'ind-001', name: 'Controller Board v3', partNumber: 'WM-CB-03', category: 'Electronics', description: 'Main processing unit with integrated motion planner.', price: 3400.00, availability: 'in-stock', weight: '1.2kg' },
    { id: 'p-005', robotId: 'ind-001', name: 'Cable Harness Kit', partNumber: 'WM-CHK-01', category: 'Wiring', description: 'Complete internal wiring harness with connectors.', price: 320.00, availability: 'in-stock', weight: '2.0kg' },

    // AssemblyBot Pro parts
    { id: 'p-006', robotId: 'ind-002', name: 'Vacuum Gripper Module', partNumber: 'AB-VGM-01', category: 'End Effector', description: 'Multi-suction cup gripper for delicate component handling.', price: 680.00, availability: 'in-stock', weight: '1.5kg' },
    { id: 'p-007', robotId: 'ind-002', name: 'Vision Camera (Stereo)', partNumber: 'AB-VC-02', category: 'Sensor', description: 'Dual-lens stereo camera for component recognition and alignment.', price: 1540.00, availability: 'in-stock', weight: '0.6kg' },
    { id: 'p-008', robotId: 'ind-002', name: 'Linear Actuator Rail', partNumber: 'AB-LAR-01', category: 'Actuator', description: 'Precision linear rail with stepper motor for X-axis travel.', price: 950.00, availability: 'low-stock', weight: '4.3kg' },
    { id: 'p-009', robotId: 'ind-002', name: 'Pneumatic Valve Block', partNumber: 'AB-PVB-01', category: 'Pneumatics', description: '8-port pneumatic manifold for gripper actuation.', price: 420.00, availability: 'in-stock', weight: '1.8kg' },

    // PaintStream 5000 parts
    { id: 'p-010', robotId: 'ind-003', name: 'Spray Nozzle Head', partNumber: 'PS-SNH-01', category: 'End Effector', description: 'Electrostatic rotary atomizer for uniform paint application.', price: 1800.00, availability: 'out-of-stock', weight: '2.1kg' },
    { id: 'p-011', robotId: 'ind-003', name: 'Paint Flow Regulator', partNumber: 'PS-PFR-01', category: 'Fluid Control', description: 'Digital flow meter and regulator for precise paint volume control.', price: 760.00, availability: 'out-of-stock', weight: '1.4kg' },
    { id: 'p-012', robotId: 'ind-003', name: 'Wrist Joint Assembly', partNumber: 'PS-WJA-01', category: 'Mechanical', description: '3-axis wrist joint with sealed bearings for paint environment.', price: 1100.00, availability: 'out-of-stock', weight: '3.7kg' },

    // SurgiArm V2 parts
    { id: 'p-013', robotId: 'med-001', name: 'Micro Forceps End Effector', partNumber: 'SA-MFE-01', category: 'End Effector', description: 'Titanium micro-forceps with haptic feedback for tissue manipulation.', price: 4200.00, availability: 'in-stock', weight: '0.15kg', imageUrl: '/images/part_micro_forceps_1774606222394.png' },
    { id: 'p-014', robotId: 'med-001', name: 'Sterile Drape Kit', partNumber: 'SA-SDK-01', category: 'Consumable', description: 'Single-use sterile draping system for the entire arm.', price: 85.00, availability: 'in-stock', weight: '0.3kg' },
    { id: 'p-015', robotId: 'med-001', name: 'Piezoelectric Motor', partNumber: 'SA-PEM-01', category: 'Actuator', description: 'Ultra-precise piezo motor for sub-millimeter joint movement.', price: 5600.00, availability: 'low-stock', weight: '0.4kg' },
    { id: 'p-016', robotId: 'med-001', name: 'Endoscope Camera Module', partNumber: 'SA-ECM-01', category: 'Sensor', description: '4K endoscopic camera with LED illumination ring.', price: 3100.00, availability: 'in-stock', weight: '0.2kg' },
    { id: 'p-017', robotId: 'med-001', name: 'Force/Torque Sensor', partNumber: 'SA-FTS-01', category: 'Sensor', description: '6-DOF force/torque sensor for tissue interaction feedback.', price: 2800.00, availability: 'in-stock', weight: '0.1kg' },
    { id: 'p-018', robotId: 'med-001', name: 'Safety Interlock Module', partNumber: 'SA-SIM-01', category: 'Electronics', description: 'Redundant safety system with emergency stop and motion limits.', price: 1950.00, availability: 'in-stock', weight: '0.5kg' },

    // DiagnoScan AI parts
    { id: 'p-019', robotId: 'med-002', name: 'X-Ray Emitter Tube', partNumber: 'DS-XET-01', category: 'Imaging', description: 'Rotating anode X-ray tube with variable kVp settings.', price: 8500.00, availability: 'low-stock', weight: '12.0kg' },
    { id: 'p-020', robotId: 'med-002', name: 'Flat Panel Detector', partNumber: 'DS-FPD-01', category: 'Imaging', description: 'Cesium iodide flat panel digital detector for high-resolution imaging.', price: 12000.00, availability: 'in-stock', weight: '8.5kg' },
    { id: 'p-021', robotId: 'med-002', name: 'AI Processing GPU Card', partNumber: 'DS-GPU-01', category: 'Electronics', description: 'Medical-grade GPU accelerator for real-time AI diagnostic inference.', price: 4500.00, availability: 'in-stock', weight: '0.9kg' },
    { id: 'p-022', robotId: 'med-002', name: 'Gantry Rotation Motor', partNumber: 'DS-GRM-01', category: 'Actuator', description: 'Slip-ring motor for continuous 360° gantry rotation.', price: 3200.00, availability: 'in-stock', weight: '15.0kg' },

    // GreeterBot parts
    { id: 'p-023', robotId: 'srv-001', name: 'LED Expression Display', partNumber: 'GB-LED-01', category: 'Display', description: 'Curved OLED face panel with dynamic emotion expression rendering.', price: 580.00, availability: 'in-stock', weight: '0.7kg' },
    { id: 'p-024', robotId: 'srv-001', name: 'Speaker Array Module', partNumber: 'GB-SAM-01', category: 'Audio', description: '360° directional speaker with noise cancellation microphone array.', price: 340.00, availability: 'in-stock', weight: '0.5kg' },
    { id: 'p-025', robotId: 'srv-001', name: 'Mobility Base (Omni-wheel)', partNumber: 'GB-MB-01', category: 'Mechanical', description: '4-wheel omni-directional drive base with built-in LIDAR.', price: 1200.00, availability: 'low-stock', weight: '8.0kg' },

    // CleanSweep R3 parts
    { id: 'p-026', robotId: 'srv-002', name: 'Main Brush Roller', partNumber: 'CS-MBR-01', category: 'Consumable', description: 'Anti-tangle rubber brush roller for hard floors and carpet.', price: 65.00, availability: 'in-stock', weight: '0.4kg' },
    { id: 'p-027', robotId: 'srv-002', name: 'HEPA Filter Cartridge', partNumber: 'CS-HFC-01', category: 'Consumable', description: 'Hospital-grade HEPA filter for fine dust and allergen capture.', price: 35.00, availability: 'in-stock', weight: '0.1kg' },
    { id: 'p-028', robotId: 'srv-002', name: 'LIDAR Navigation Unit', partNumber: 'CS-LNU-01', category: 'Sensor', description: '360° LIDAR scanner for simultaneous localization and mapping (SLAM).', price: 890.00, availability: 'in-stock', weight: '0.3kg' },
    { id: 'p-029', robotId: 'srv-002', name: 'Battery Pack (Li-Ion)', partNumber: 'CS-BAT-01', category: 'Power', description: '5200mAh lithium-ion battery with fast-charge support.', price: 210.00, availability: 'in-stock', weight: '0.6kg' },

    // DeliverDrone X parts
    { id: 'p-030', robotId: 'srv-003', name: 'Brushless Prop Motor', partNumber: 'DD-BPM-01', category: 'Actuator', description: 'High-efficiency brushless motor rated for 2kg thrust per unit.', price: 145.00, availability: 'in-stock', weight: '0.12kg' },
    { id: 'p-031', robotId: 'srv-003', name: 'Carbon Fiber Propeller', partNumber: 'DD-CFP-01', category: 'Consumable', description: 'Lightweight carbon fiber propeller with low-noise profile.', price: 28.00, availability: 'in-stock', weight: '0.03kg' },
    { id: 'p-032', robotId: 'srv-003', name: 'GPS/RTK Module', partNumber: 'DD-GPS-01', category: 'Sensor', description: 'Dual-frequency GPS with RTK for centimeter-level positioning.', price: 520.00, availability: 'in-stock', weight: '0.08kg' },
    { id: 'p-033', robotId: 'srv-003', name: 'Obstacle Avoidance Array', partNumber: 'DD-OAA-01', category: 'Sensor', description: '6-directional ultrasonic and infrared obstacle detection system.', price: 680.00, availability: 'low-stock', weight: '0.2kg' },
    { id: 'p-034', robotId: 'srv-003', name: 'Payload Release Mechanism', partNumber: 'DD-PRM-01', category: 'Mechanical', description: 'Servo-actuated package clamp with auto-release at delivery point.', price: 190.00, availability: 'in-stock', weight: '0.35kg' },

    // MarsRover Alpha parts
    { id: 'p-035', robotId: 'exp-001', name: 'Rocker-Bogie Suspension', partNumber: 'MR-RBS-01', category: 'Mechanical', description: '6-wheel rocker-bogie suspension for extreme terrain traversal.', price: 18500.00, availability: 'low-stock', weight: '45.0kg' },
    { id: 'p-036', robotId: 'exp-001', name: 'RTG Power Unit', partNumber: 'MR-RTG-01', category: 'Power', description: 'Radioisotope thermoelectric generator for long-duration missions.', price: 125000.00, availability: 'out-of-stock', weight: '40.0kg' },
    { id: 'p-037', robotId: 'exp-001', name: 'Drill & Sample Collector', partNumber: 'MR-DSC-01', category: 'End Effector', description: 'Rotary percussive drill for rock core sampling up to 5cm depth.', price: 22000.00, availability: 'low-stock', weight: '8.0kg' },
    { id: 'p-038', robotId: 'exp-001', name: 'Panoramic Mast Camera', partNumber: 'MR-PMC-01', category: 'Sensor', description: 'Stereoscopic panoramic camera with UV/IR filters on deployable mast.', price: 9800.00, availability: 'in-stock', weight: '3.5kg' },
    { id: 'p-039', robotId: 'exp-001', name: 'Communication Antenna (HGA)', partNumber: 'MR-HGA-01', category: 'Communication', description: 'High-gain X-band antenna for direct-to-Earth communication.', price: 7600.00, availability: 'in-stock', weight: '5.2kg' },
    { id: 'p-040', robotId: 'exp-001', name: 'Thermal Control Louvers', partNumber: 'MR-TCL-01', category: 'Thermal', description: 'Bi-metallic actuated louvers for passive thermal regulation.', price: 4200.00, availability: 'in-stock', weight: '2.8kg' },
    { id: 'p-041', robotId: 'exp-001', name: 'Hazard Avoidance Camera', partNumber: 'MR-HAC-01', category: 'Sensor', description: 'Wide-angle stereo pair cameras for autonomous hazard detection.', price: 6500.00, availability: 'in-stock', weight: '1.2kg' },

    // DeepDiver 200 parts
    { id: 'p-042', robotId: 'exp-002', name: 'Pressure Hull (Ti-Alloy)', partNumber: 'DD2-PH-01', category: 'Structural', description: 'Grade 5 titanium alloy pressure hull rated to 600 bar.', price: 35000.00, availability: 'low-stock', weight: '120.0kg' },
    { id: 'p-043', robotId: 'exp-002', name: 'Thruster Module (4-pack)', partNumber: 'DD2-TM-04', category: 'Actuator', description: 'Magnetically coupled brushless thrusters, saltwater resistant.', price: 4800.00, availability: 'in-stock', weight: '6.0kg' },
    { id: 'p-044', robotId: 'exp-002', name: 'Multi-Spectral Imager', partNumber: 'DD2-MSI-01', category: 'Sensor', description: 'Hyperspectral camera covering 400-2500nm for underwater mapping.', price: 15000.00, availability: 'low-stock', weight: '4.5kg' },
    { id: 'p-045', robotId: 'exp-002', name: 'LED Flood Light Array', partNumber: 'DD2-FLA-01', category: 'Illumination', description: '24000-lumen deep-sea LED array with adjustable color temperature.', price: 2200.00, availability: 'in-stock', weight: '3.0kg' },
    { id: 'p-046', robotId: 'exp-002', name: 'Acoustic Modem', partNumber: 'DD2-AM-01', category: 'Communication', description: 'Underwater acoustic communication modem with 10kbps data rate.', price: 6800.00, availability: 'in-stock', weight: '2.5kg' },
  ];

  getCategories(): Category[] {
    return this.categories;
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories.find(c => c.id === id);
  }

  getRobotsByCategory(categoryId: string): Robot[] {
    return this.robots.filter(r => r.categoryId === categoryId);
  }

  getRobotById(id: string): Robot | undefined {
    return this.robots.find(r => r.id === id);
  }

  getPartsByRobot(robotId: string): Part[] {
    return this.parts.filter(p => p.robotId === robotId);
  }

  getPartById(id: string): Part | undefined {
    return this.parts.find(p => p.id === id);
  }
}
