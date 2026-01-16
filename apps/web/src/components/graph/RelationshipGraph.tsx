/**
 * Relationship Graph Component
 *
 * Interactive visualization of character relationships using React Flow
 */

import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface Character {
  id: string;
  canonicalName: {
    zh: string;
    en?: string;
  };
  kingdom: 'WEI' | 'SHU' | 'WU' | 'HAN' | 'OTHER';
}

interface Relationship {
  id: string;
  characterA: Character;
  characterB: Character;
  relationshipType: string;
  relationshipSource: string;
  strength: number;
  description?: {
    zh?: string;
    en?: string;
  };
  isReciprocal: boolean;
}

interface RelationshipGraphProps {
  relationships: Relationship[];
}

// Kingdom colors matching design system
const KINGDOM_COLORS = {
  WEI: '#3B82F6', // Blue
  SHU: '#EF4444', // Red/Vermillion
  WU: '#10B981', // Green
  HAN: '#F59E0B', // Imperial Yellow
  OTHER: '#6B7280', // Gray
};

// Relationship type colors
const RELATIONSHIP_COLORS = {
  SWORN_BROTHER: '#8B5CF6', // Purple
  FAMILY: '#EC4899', // Pink
  SPOUSE: '#F472B6', // Light pink
  PARENT_CHILD: '#A855F7', // Purple variant
  LORD_VASSAL: '#3B82F6', // Blue
  FRIEND: '#10B981', // Green
  RIVAL: '#F59E0B', // Orange
  ENEMY: '#EF4444', // Red
  MENTOR_STUDENT: '#6366F1', // Indigo
};

export function RelationshipGraph({ relationships }: RelationshipGraphProps) {
  // Extract unique characters from relationships
  const characters = useMemo(() => {
    const charMap = new Map<string, Character>();
    relationships.forEach((rel) => {
      charMap.set(rel.characterA.id, rel.characterA);
      charMap.set(rel.characterB.id, rel.characterB);
    });
    return Array.from(charMap.values());
  }, [relationships]);

  // Create nodes from characters
  const initialNodes: Node[] = useMemo(() => {
    return characters.map((char, index) => {
      // Calculate position in a circle layout
      const angle = (index * 2 * Math.PI) / characters.length;
      const radius = 300;
      const x = 500 + radius * Math.cos(angle);
      const y = 400 + radius * Math.sin(angle);

      return {
        id: char.id,
        type: 'default',
        position: { x, y },
        data: {
          label: (
            <div className="text-center">
              <div className="font-zh-serif font-semibold text-sm">
                {char.canonicalName.zh}
              </div>
              {char.canonicalName.en && (
                <div className="text-xs text-gray-500">{char.canonicalName.en}</div>
              )}
            </div>
          ),
        },
        style: {
          background: KINGDOM_COLORS[char.kingdom],
          color: 'white',
          border: '2px solid #fff',
          borderRadius: '50%',
          width: 120,
          height: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          padding: 10,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      };
    });
  }, [characters]);

  // Create edges from relationships
  const initialEdges: Edge[] = useMemo(() => {
    return relationships.map((rel) => ({
      id: rel.id,
      source: rel.characterA.id,
      target: rel.characterB.id,
      type: ConnectionLineType.Bezier,
      animated: rel.strength >= 8, // Animate strong relationships
      style: {
        stroke: RELATIONSHIP_COLORS[rel.relationshipType as keyof typeof RELATIONSHIP_COLORS] || '#999',
        strokeWidth: Math.max(1, rel.strength / 3),
      },
      markerEnd: rel.isReciprocal
        ? undefined
        : {
            type: MarkerType.ArrowClosed,
            color: RELATIONSHIP_COLORS[rel.relationshipType as keyof typeof RELATIONSHIP_COLORS] || '#999',
          },
      label: rel.relationshipType.replace('_', ' '),
      labelStyle: {
        fontSize: 10,
        fill: '#666',
      },
      labelBgStyle: {
        fill: 'white',
        fillOpacity: 0.8,
      },
    }));
  }, [relationships]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('Node clicked:', node.id);
    // Could navigate to character detail page
    // navigate(`/characters/${node.id}`);
  }, []);

  return (
    <div className="w-full h-full bg-rice-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
        attributionPosition="bottom-left"
      >
        <Background color="#e5e7eb" gap={16} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            const char = characters.find((c) => c.id === node.id);
            return char ? KINGDOM_COLORS[char.kingdom] : '#999';
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-xs">
        <h3 className="font-semibold text-sm mb-3 text-ink-black">Legend</h3>

        <div className="space-y-2">
          <div>
            <div className="text-xs font-semibold text-gray-700 mb-1">Kingdoms</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(KINGDOM_COLORS).map(([kingdom, color]) => (
                <div key={kingdom} className="flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-full border border-white"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-gray-600">{kingdom}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-gray-700 mb-1">Relationships</div>
            <div className="grid grid-cols-2 gap-1">
              {Object.entries(RELATIONSHIP_COLORS).slice(0, 6).map(([type, color]) => (
                <div key={type} className="flex items-center gap-1">
                  <div
                    className="w-6 h-0.5"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-gray-600">{type.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
            <p>• Animated lines = Strong relationships (8+)</p>
            <p>• Arrow = One-way relationship</p>
            <p>• Click and drag nodes to rearrange</p>
          </div>
        </div>
      </div>
    </div>
  );
}
